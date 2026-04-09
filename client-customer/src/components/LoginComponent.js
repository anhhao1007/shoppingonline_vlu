import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);

    this.state = {
      txtUsername: "hao",
      txtPassword: "123",
    };
  }

  render() {
    return (
      <div className="auth-container">
        <div className="form-wrapper">
          <div className="form-header">
            <i className="bi bi-box-arrow-in-right"></i>
            <h2>Welcome Back</h2>
          </div>

          <div className="form-body">
            <p className="form-subtitle">
              Sign in to your account to continue shopping
            </p>

            <form onSubmit={(e) => this.btnLoginClick(e)}>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  <i className="bi bi-person"></i> Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={this.state.txtUsername}
                  onChange={(e) => {
                    this.setState({ txtUsername: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  <i className="bi bi-lock"></i> Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={this.state.txtPassword}
                  onChange={(e) => {
                    this.setState({ txtPassword: e.target.value });
                  }}
                />
              </div>

              <button type="submit" className="btn-submit">
                <i className="bi bi-check-circle"></i> Sign In
              </button>
            </form>

            <div className="text-center">
              <p className="text-muted">
                Don&apos;t have an account? <span 
                  className="link-btn" 
                  onClick={() => this.props.navigate('/signup')}
                >
                  Create one
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  btnLoginClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username: username, password: password };

      this.apiLogin(account);
    } else {
      alert("Please input username and password");
    }
  }

  apiLogin(account) {
    axios.post("/api/customer/login", account).then((res) => {
      const result = res.data;

      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);

        this.props.navigate("/home");
      } else {
        alert(result.message);
      }
    }).catch(() => {
      alert("Cannot connect to server. Please try again later.");
    });
  }
}

export default withRouter(Login);
