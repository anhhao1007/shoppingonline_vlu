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
        <tr key={item.product._id}>
          <td className="cart-item-cell">
            <div className="cart-item-image">
              <img
                src={"data:image/jpg;base64," + item.product.image}
                alt={item.product.name}
                crossOrigin="anonymous"
              />
            </div>
          </td>
          <td className="cart-item-cell">
            <div className="cart-item-info">
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>{item.product.category?.name || "Accessories"}</p>
              </div>
            </div>
          </td>
          <td className="cart-item-cell">
            <div className="cart-item-price">
              <small className="cart-item-price-label">Price</small>
              <div className="cart-item-price-value">${item.product.price.toFixed(2)}</div>
            </div>
          </td>
          <td className="cart-item-cell">
            <div className="cart-item-quantity">
              <div className="quantity-control">
                <button 
                  className="qty-btn" 
                  onClick={() => this.decreaseQuantity(item.product._id)}
                >
                  −
                </button>
                <input type="text" value={item.quantity} readOnly />
                <button 
                  className="qty-btn" 
                  onClick={() => this.increaseQuantity(item.product._id)}
                >
                  +
                </button>
              </div>
            </div>
          </td>
          <td className="cart-item-cell">
            <div className="cart-item-total">
              <small className="text-muted">Subtotal</small>
              <div className="cart-item-total-value">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </td>
          <td className="cart-item-cell">
            <button
              className="btn-remove"
              onClick={() => this.lnkRemoveClick(item.product._id)}
              title="Remove from cart"
            >
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      );
    });

    const total = CartUtil.getTotal(this.context.mycart);
    const totalQuantity = this.context.mycart.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = 0;
    const tax = total * 0.1;
    const grandTotal = total + shipping + tax;

    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>
            <i className="bi bi-cart3"></i> Shopping Cart
          </h1>
          <p>You have <span className="item-count">{totalQuantity}</span> item(s) in your cart</p>
        </div>

        {this.context.mycart.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              <table className="cart-items-table">
                <thead className="cart-items-thead">
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="cart-items-tbody">
                  {mycart}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <div className="summary-header">
                <h2>Order Summary</h2>
              </div>

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${total.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value text-gold">Free</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Tax (10%)</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className="summary-actions">
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

              <div className="summary-promo">
                <div className="promo-input-group">
                  <input 
                    type="text" 
                    className="promo-input" 
                    placeholder="Promo code"
                  />
                  <button className="btn-apply">Apply</button>
                </div>
              </div>

              <div className="cart-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="bi bi-truck"></i>
                  </div>
                  <p className="benefit-text">Fast Shipping</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <p className="benefit-text">Secure Payment</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="bi bi-arrow-return-left"></i>
                  </div>
                  <p className="benefit-text">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="bi bi-cart-x"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>You haven&apos;t added any products yet. Start shopping now to find amazing deals!</p>
            <button 
              className="btn-shop"
              onClick={() => this.props.navigate("/home")}
            >
              <i className="bi bi-bag-plus"></i> Start Shopping
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
    }).catch(() => {
      alert("Cannot connect to server. Please try again later.");
    });
  }
}

export default withRouter(Mycart);
