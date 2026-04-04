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
      <div className="border-bottom">

        {/* LEFT SIDE */}
        <div className="float-left">
          {this.context.token === "" ? (
            <div>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/signup">Sign-up</Link> |{" "}
              <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |{" "}
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Logout
              </Link>{" "}
              | <Link to="/myprofile">My profile</Link> |{" "}
              <Link to="/myorders">My orders</Link>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="float-right">
          <Link to="/mycart">My cart</Link> have{" "}
          <b>{this.getTotalQuantity()}</b> item(s)
        </div>

        <div className="float-clear" />
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