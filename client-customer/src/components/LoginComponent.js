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
      <div className="form-container">
        <h2>
          <i className="bi bi-box-arrow-in-right"></i> Customer Login
        </h2>

        <form onSubmit={(e) => this.btnLoginClick(e)}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
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
            <label className="form-label" htmlFor="password">Password</label>
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
            <i className="bi bi-check-circle"></i> Login
          </button>

          <div className="text-center mt-3">
            <p className="text-muted">Don't have an account? <span 
              className="link-btn" 
              onClick={() => this.props.navigate('/signup')}
            >
              Sign up now
            </span></p>
          </div>
        </form>
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
    });
  }
}

export default withRouter(Login);