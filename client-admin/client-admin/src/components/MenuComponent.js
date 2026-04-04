import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark menu-bar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/home">
            <i className="bi bi-speedometer2"></i> Admin Dashboard
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/home">
                  <i className="bi bi-house-fill"></i> Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/category">
                  <i className="bi bi-tag-fill"></i> Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/product">
                  <i className="bi bi-box-seam"></i> Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/order">
                  <i className="bi bi-bag-check"></i> Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/customer">
                  <i className="bi bi-people-fill"></i> Customers
                </Link>
              </li>
            </ul>

            <div className="navbar-text">
              <i className="bi bi-person-circle"></i> <b>{this.context.username}</b>
              <button
                className="btn-logout"
                onClick={this.lnkLogoutClick}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  lnkLogoutClick = (e) => {
    e.preventDefault();
    this.context.setToken('');
    this.context.setUsername('');
  };
}

export default Menu;