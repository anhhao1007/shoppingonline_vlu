import React, { Component } from "react";
import axios from "axios";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import withRouter from "../utils/withRouter";

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <div key={item.product._id} className="cart-item-card">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img
                src={"data:image/jpg;base64," + item.product.image}
                alt={item.product.name}
                className="cart-item-image"
              />
            </div>
            <div className="col-md-3">
              <h6 className="cart-item-name">{item.product.name}</h6>
              <small className="text-muted">{item.product.category.name}</small>
            </div>
            <div className="col-md-2">
              <div className="cart-price">${item.product.price.toFixed(2)}</div>
            </div>
            <div className="col-md-2">
              <div className="quantity-control">
                <button 
                  className="qty-btn" 
                  onClick={() => this.decreaseQuantity(item.product._id)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => this.increaseQuantity(item.product._id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-2">
              <div className="cart-subtotal">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
            <div className="col-md-1 text-center">
              <button
                className="btn-remove"
                onClick={() => this.lnkRemoveClick(item.product._id)}
                title="Remove from cart"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });

    const total = CartUtil.getTotal(this.context.mycart);

    // Calculate total quantity
    const totalQuantity = this.context.mycart.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className="customer-container">
        <div className="cart-header">
          <h2><i className="bi bi-cart3"></i> Shopping Cart</h2>
          <p className="text-muted">{totalQuantity} item(s)</p>
        </div>

        {this.context.mycart.length > 0 ? (
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-items">
                {mycart}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-summary">
                <h5><i className="bi bi-receipt"></i> Order Summary</h5>
                
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn-checkout"
                  onClick={() => this.lnkCheckoutClick()}
                  disabled={this.context.mycart.length === 0}
                >
                  <i className="bi bi-credit-card"></i> Proceed to Checkout
                </button>

                <button
                  className="btn-continue"
                  onClick={() => this.props.navigate("/home")}
                >
                  <i className="bi bi-arrow-left"></i> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <h4>Your cart is empty</h4>
            <p>Add some products to get started!</p>
            <button 
              className="btn-primary"
              onClick={() => this.props.navigate("/home")}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    );
  }

  increaseQuantity(id) {
    const mycart = [...this.context.mycart];
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      mycart[index].quantity += 1;
      this.context.setMycart(mycart);
    }
  }

  decreaseQuantity(id) {
    const mycart = [...this.context.mycart];
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      if (mycart[index].quantity > 1) {
        mycart[index].quantity -= 1;
      } else {
        mycart.splice(index, 1);
      }
      this.context.setMycart(mycart);
    }
  }

  lnkRemoveClick(id) {
    const mycart = [...this.context.mycart];
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  lnkCheckoutClick() {
    if (window.confirm("Are you sure you want to proceed with checkout?")) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;

        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate("/login");
        }
      } else {
        alert("Your cart is empty");
      }
    }
  }

  apiCheckout(total, items, customer) {
    const body = {
      total: total,
      items: items,
      customer: customer
    };

    const config = {
      headers: {
        "x-access-token": this.context.token
      }
    };

    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Order placed successfully!");
        this.context.setMycart([]);
        this.props.navigate("/myorders");
      } else {
        alert("Checkout failed. Please try again.");
      }
    });
  }
}

export default withRouter(Mycart);