import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Inform extends Component {
  static contextType = MyContext;

  // Calculate total quantity of all items in cart
  getTotalQuantity() {
    return this.context.mycart.reduce((total, item) => total + item.quantity, 0);
  }

  render() {
    return (
      <div className="inform-bar">
        <div className="container-fluid">
          {/* LEFT SIDE - AUTH LINKS */}
          <div className="inform-left">
            {this.context.token === "" ? (
              <>
                <Link to="/login">
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Link>
                <span>|</span>
                <Link to="/signup">
                  <i className="bi bi-person-plus"></i> Sign-up
                </Link>
                <span>|</span>
                <Link to="/active">
                  <i className="bi bi-shield-check"></i> Activate
                </Link>
              </>
            ) : (
              <>
                <div className="customer-greeting">
                  <i className="bi bi-person-circle"></i>
                  Hello <span className="customer-name">{this.context.customer.name}</span>
                </div>
                <span>|</span>
                <Link to="/myprofile">
                  <i className="bi bi-gear"></i> My profile
                </Link>
                <span>|</span>
                <Link to="/myorders">
                  <i className="bi bi-bag-check"></i> My orders
                </Link>
                <span>|</span>
                <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </>
            )}
          </div>

          {/* RIGHT SIDE - CART */}
          <div className="inform-right">
            <Link to="/mycart">
              <i className="bi bi-cart3"></i> My cart
            </Link>
            have <b>{this.getTotalQuantity()}</b> item(s)
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // event-handlers
  // =========================
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]); // clear cart when logout
  }
}

export default Inform;
