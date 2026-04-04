import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
    };
  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="login-modal modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-shield-lock"></i> Admin Login
                </h5>
              </div>
              <div className="modal-body">
                <form className="login-form">
                  <h2><i className="bi bi-door-closed"></i> Login</h2>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={this.state.txtUsername}
                      onChange={(e) =>
                        this.setState({ txtUsername: e.target.value })
                      }
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
                      onChange={(e) =>
                        this.setState({ txtPassword: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-login"
                    onClick={(e) => this.btnLoginClick(e)}
                  >
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div />;
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;

      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
