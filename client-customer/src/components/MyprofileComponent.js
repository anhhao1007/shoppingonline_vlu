import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      isLoading: false,
      message: ""
    };
  }

  render() {
    if (this.context.token === "") {
      return <Navigate replace to="/login" />;
    }

    return (
      <div className="customer-container">
        <div className="profile-header">
          <h2><i className="bi bi-person-circle"></i> My Profile</h2>
          <p className="text-muted">Update your account information</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-card">
              <form onSubmit={(e) => this.btnUpdateClick(e)}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-at"></i> Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.txtUsername}
                        onChange={(e) => {
                          this.setState({ txtUsername: e.target.value });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-key"></i> Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.txtPassword}
                        onChange={(e) => {
                          this.setState({ txtPassword: e.target.value });
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-person-badge"></i> Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.txtName}
                        onChange={(e) => {
                          this.setState({ txtName: e.target.value });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-telephone"></i> Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        value={this.state.txtPhone}
                        onChange={(e) => {
                          this.setState({ txtPhone: e.target.value });
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-envelope"></i> Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={this.state.txtEmail}
                        onChange={(e) => {
                          this.setState({ txtEmail: e.target.value });
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {this.state.message && (
                  <div className="alert alert-info mb-3">
                    {this.state.message}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-update"
                    disabled={this.state.isLoading}
                  >
                    <i className="bi bi-check-circle"></i> {this.state.isLoading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;

    if (username && password && name && phone && email) {
      this.setState({ isLoading: true });
      const customer = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };

      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Please fill in all fields");
    }
  }

  apiPutCustomer(id, customer) {
    const config = {
      headers: { "x-access-token": this.context.token },
    };

    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      this.setState({ isLoading: false });
      const result = res.data;

      if (result) {
        this.setState({ message: "Profile updated successfully!" });
        this.context.setCustomer(result);
        setTimeout(() => {
          this.setState({ message: "" });
        }, 3000);
      } else {
        alert("Update failed. Please try again.");
      }
    }).catch(() => {
      this.setState({ isLoading: false });
      alert("Error updating profile");
    });
  }
}

export default Myprofile;