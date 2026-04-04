import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class ProductDetail extends Component {
  static contextType = MyContext; // access global state

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;

    if (prod != null) {
      return (
        <div className="product-detail-container">
          <div className="product-detail-wrapper">
            {/* Image Section */}
            <div className="product-detail-image">
              <img
                src={"data:image/jpg;base64," + prod.image}
                alt={prod.name}
                className="detail-image"
              />
            </div>

            {/* Info Section */}
            <div className="product-detail-info">
              <div className="detail-header">
                <h1 className="detail-title">{prod.name}</h1>
                <p className="detail-id">Product ID: {prod._id}</p>
              </div>

              <div className="detail-price-section">
                <div className="price-display">
                  <span className="currency">₫</span>
                  <span className="price-value">{prod.price.toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div className="detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{prod.category.name}</span>
                </div>
              </div>

              <div className="detail-divider"></div>

              {/* Quantity & Add to Cart */}
              <div className="detail-actions">
                <div className="quantity-selector">
                  <label className="qty-label">Quantity:</label>
                  <div className="qty-controls">
                    <button
                      type="button"
                      className="qty-btn-dec"
                      onClick={() =>
                        this.setState({
                          txtQuantity: Math.max(1, parseInt(this.state.txtQuantity) - 1)
                        })
                      }
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={this.state.txtQuantity}
                      onChange={(e) =>
                        this.setState({ txtQuantity: e.target.value })
                      }
                      className="qty-input"
                    />
                    <button
                      type="button"
                      className="qty-btn-inc"
                      onClick={() =>
                        this.setState({
                          txtQuantity: Math.min(99, parseInt(this.state.txtQuantity) + 1)
                        })
                      }
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn-add-to-cart"
                  onClick={(e) => this.btnAdd2CartClick(e)}
                  title="Add this product to your cart"
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>

              <div className="detail-note">
                <p><i className="fas fa-info-circle"></i> Free shipping on orders over 200.000₫</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="loading-state">
        <p>Loading product details...</p>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // =========================
  // ADD TO CART
  // =========================
  btnAdd2CartClick(e) {
    e.preventDefault();

    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);

    if (quantity) {
      const mycart = [...this.context.mycart];

      const index = mycart.findIndex(
        (x) => x.product._id === product._id
      );

      if (index === -1) {
        const newItem = {
          product: product,
          quantity: quantity
        };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);

      alert("✓ Product added to cart successfully!");
    } else {
      alert("⚠ Please enter a valid quantity (minimum 1)");
    }
  }

  // =========================
  // API
  // =========================
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);