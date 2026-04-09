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
      txtQuantity: 1,
      loading: true,
      error: null
    };
  }

  render() {
    const prod = this.state.product;

    if (this.state.loading) {
      return (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-3xl)',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          margin: 'var(--spacing-2xl)'
        }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            <i className="bi bi-hourglass-split"></i> Loading product details...
          </p>
        </div>
      );
    }

    if (this.state.error || prod == null) {
      return (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-3xl)',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          margin: 'var(--spacing-2xl)'
        }}>
          <p style={{ color: 'red' }}>
            <i className="bi bi-exclamation-circle"></i> {this.state.error || 'Product not found.'}
          </p>
        </div>
      );
    }

    if (prod != null) {
      return (
        <section className="product-detail">
          <div className="product-detail-container">
            {/* Image Section */}
            <div className="product-detail-image">
              <img
                src={"data:image/jpg;base64," + prod.image}
                alt={prod.name}
                crossOrigin="anonymous"
              />
              <div className="product-detail-gallery">
                <img
                  src={"data:image/jpg;base64," + prod.image}
                  alt={prod.name}
                  className="active"
                  crossOrigin="anonymous"
                />
                <img
                  src={"data:image/jpg;base64," + prod.image}
                  alt={prod.name}
                  style={{ opacity: 0.6 }}
                  crossOrigin="anonymous"
                />
                <img
                  src={"data:image/jpg;base64," + prod.image}
                  alt={prod.name}
                  style={{ opacity: 0.6 }}
                  crossOrigin="anonymous"
                />
                <img
                  src={"data:image/jpg;base64," + prod.image}
                  alt={prod.name}
                  style={{ opacity: 0.6 }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="product-detail-info">
              <h1>{prod.name}</h1>

              <div className="product-detail-rating">
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                </div>
                <span className="count">(247 reviews)</span>
              </div>

              <div className="product-detail-price">
                <div className="current">${prod.price}</div>
                <div className="original" style={{ display: 'none' }}>$599</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)', marginTop: 'var(--spacing-sm)' }}>
                  <i className="bi bi-lightning-charge"></i> Flash Sale ends in 2:30
                </div>
              </div>

              <div className="product-detail-description">
                <h3>Description</h3>
                <p>
                  Experience premium smartphone technology with this flagship device. Features latest processor,
                  stunning display, and professional-grade camera system. Perfect for photography, gaming, and everyday use.
                </p>
              </div>

              <div className="product-detail-specs">
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{prod.category?.name || "Electronics"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Brand</span>
                  <span className="spec-value">Premium Brand</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Stock Status</span>
                  <span className="spec-value" style={{ color: 'var(--primary-green)' }}>
                    <i className="bi bi-check-circle"></i> In Stock
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Warranty</span>
                  <span className="spec-value">12 Months</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="product-detail-quantity">
                <div>
                  <label style={{ fontWeight: 'var(--font-semibold)', display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                    Select Quantity:
                  </label>
                  <div className="quantity-control">
                    <button
                      type="button"
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
                        this.setState({ txtQuantity: Math.max(1, parseInt(e.target.value) || 1) })
                      }
                    />
                    <button
                      type="button"
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
              </div>

              <div className="product-detail-actions">
                <button
                  className="btn-add-cart"
                  onClick={(e) => this.btnAdd2CartClick(e)}
                  title="Add this product to your cart"
                >
                  <i className="bi bi-bag-check"></i> Add to Cart
                </button>
                <button
                  className="btn-wishlist"
                  title="Add to wishlist"
                >
                  <i className="bi bi-heart"></i> Wishlist
                </button>
              </div>

              <div style={{
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-lg)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--primary-accent)'
              }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
                  <i className="bi bi-truck"></i> Free shipping on orders over $100
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  componentDidUpdate(prevProps) {
    const id = this.props.params.id;
    if (id !== prevProps.params.id) {
      this.setState({ product: null, loading: true, error: null, txtQuantity: 1 });
      this.apiGetProduct(id);
    }
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
      if (result) {
        this.setState({ product: result, loading: false, error: null });
      } else {
        this.setState({ product: null, loading: false, error: 'Product not found.' });
      }
    }).catch(() => {
      this.setState({ product: null, loading: false, error: 'Could not load product. Please try again.' });
    });
  }
}

export default withRouter(ProductDetail);
