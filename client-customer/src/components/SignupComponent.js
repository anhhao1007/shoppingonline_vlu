import axios from 'axios';
import React, { Component } from 'react';
import withRouter from "../utils/withRouter";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div className="form-container signup-form">
        <h2>
          <i className="bi bi-person-plus"></i> Create Account
        </h2>

        <form onSubmit={(e) => this.btnSignupClick(e)}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Choose a unique username"
              value={this.state.txtUsername}
              onChange={(e) => {
                this.setState({ txtUsername: e.target.value })
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a strong password"
              value={this.state.txtPassword}
              onChange={(e) => {
                this.setState({ txtPassword: e.target.value })
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              value={this.state.txtName}
              onChange={(e) => {
                this.setState({ txtName: e.target.value })
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              value={this.state.txtPhone}
              onChange={(e) => {
                this.setState({ txtPhone: e.target.value })
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={this.state.txtEmail}
              onChange={(e) => {
                this.setState({ txtEmail: e.target.value })
              }}
            />
          </div>

          <button type="submit" className="btn-submit">
            <i className="bi bi-check-circle"></i> Create Account
          </button>

          <div className="text-center">
            <p className="text-muted">Already have an account? <span 
              className="link-btn" 
              onClick={() => this.props.navigate('/login')}
            >
              Log in here
            </span></p>
          </div>
        </form>
      </div>
    );
  }

  btnSignupClick(e) {

    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;

    if (username && password && name && phone && email) {
      const account = { username, password, name, phone, email };
      this.apiSignup(account);
    }
    else {
      alert('Please input username and password and name and phone and email');
    }

  }

  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    }).catch(() => {
      alert("Cannot connect to server. Please try again later.");
    });
  }

}

export default withRouter(Signup);
