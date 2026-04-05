import axios from "axios";
import React, { Component } from "react";

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
      isLoading: false
    };
  }

  render() {
    return (
      <div className="form-container active-form">
        <h2>
          <i className="bi bi-shield-check"></i> Activate Account
        </h2>

        <p className="form-subtitle">
          Please enter your ID and the activation token sent to your email to activate your account.
        </p>

        <form onSubmit={(e) => this.btnActiveClick(e)}>
          <div className="form-group">
            <label className="form-label" htmlFor="id">Account ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              placeholder="Enter your account ID"
              value={this.state.txtID}
              onChange={(e) => {
                this.setState({ txtID: e.target.value });
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="token">Activation Token</label>
            <input
              type="text"
              className="form-control"
              id="token"
              placeholder="Enter the token from your email"
              value={this.state.txtToken}
              onChange={(e) => {
                this.setState({ txtToken: e.target.value });
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={this.state.isLoading}
          >
            <i className="bi bi-check-circle"></i> {this.state.isLoading ? 'Activating...' : 'Activate Account'}
          </button>

          <div className="text-center">
            <p className="text-muted text-sm">
              Didn't receive the token? Check your spam folder or contact support.
            </p>
          </div>
        </form>
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();

    const id = this.state.txtID;
    const token = this.state.txtToken;

    if (id && token) {
      this.setState({ isLoading: true });
      this.apiActive(id, token);
    } else {
      alert("Please enter both ID and activation token");
    }
  }

  apiActive(id, token) {
    const body = { id: id, token: token };

    axios.post("/api/customer/active", body).then((res) => {
      const result = res.data;
      this.setState({ isLoading: false });

      if (result.success) {
        alert("Account activated successfully! You can now log in.");
        this.setState({ txtID: "", txtToken: "" });
      } else {
        alert(result.message || "Activation failed. Please check your ID and token.");
      }
    }).catch((error) => {
      this.setState({ isLoading: false });
      alert("An error occurred. Please try again.");
    });
  }
}

export default Active;
