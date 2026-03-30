import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="border-bottom">
        {/* LEFT MENU */}
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/admin/home">Home</Link>
            </li>

            <li className="menu">
              <Link to="/admin/category">Category</Link>
            </li>

            <li className="menu">
              <Link to="/admin/product">Product</Link>
            </li>

            <li className="menu">
              <Link to="/admin/order">Order</Link>
            </li>

            {/* Customer menu */}
            <li className="menu">
              <Link to="/admin/customer">Customer</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT MENU */}
        <div className="float-right">
          Hello <b>{this.context.username}</b> |{' '}
          <Link to="/admin/home" onClick={this.lnkLogoutClick}>
            Logout
          </Link>
        </div>

        <div className="float-clear" />
      </div>
    );
  }

  lnkLogoutClick = (e) => {
    e.preventDefault();
    this.context.setToken('');
    this.context.setUsername('');
  };
}

export default Menu;