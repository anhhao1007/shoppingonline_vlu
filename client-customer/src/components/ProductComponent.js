import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true
    };
  }

  // ================== RENDER ==================
  render() {
    const products = Array.isArray(this.state.products)
      ? this.state.products
      : [];

    const prods = products.map((item) => (
      <div key={item._id} className="product-card">
        <div className="product-image">
          <Link to={'/product/' + item._id}>
            <img
              src={
                item.image
                  ? "data:image/jpg;base64," + item.image
                  : "/no-image.png"
              }
              alt={item.name}
            />
          </Link>
        </div>

        <div className="product-info">
          <span className="product-category">
            {item.category?.name || "Product"}
          </span>

          <h5 className="product-name">{item.name}</h5>

          <div className="product-price">
            <span className="current">${item.price}</span>
          </div>

          <div className="product-actions">
            <Link to={'/product/' + item._id} className="btn-add">
              View
            </Link>

            <button
              className="btn-wishlist"
              onClick={() => this.addToCart(item)}
            >
              Add cart
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <section className="featured-products">
        <div className="container-fluid">
          <h2>Explore Products</h2>

          {this.state.loading && <p>Loading...</p>}

          {!this.state.loading && products.length === 0 && (
            <p>No products found</p>
          )}

          <div className="products-grid">{prods}</div>
        </div>
      </section>
    );
  }

  // ================== LIFECYCLE ==================
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { cid, keyword } = this.props.params;
    const { cid: prevCid, keyword: prevKeyword } = prevProps.params;

    if (cid !== prevCid || keyword !== prevKeyword) {
      this.loadData();
    }
  }

  // ================== LOAD DATA ==================
  loadData() {
    const { cid, keyword } = this.props.params;

    // 👉 sửa URL này nếu backend bạn khác
    let base = "http://localhost:5000/api/products";
    let url = base;

    if (cid && cid !== "undefined") {
      url = `${base}/category/${cid}`;
    } else if (keyword && keyword !== "undefined") {
      url = `${base}/search/${keyword}`;
    }

    this.setState({ loading: true });

    axios
      .get(url)
      .then((res) => {
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        this.setState({
          products: result,
          loading: false
        });
      })
      .catch((err) => {
        console.error("API ERROR:", err.response?.data || err.message);
        this.setState({
          products: [],
          loading: false
        });
      });
  }

  // ================== ADD TO CART ==================
  addToCart(product) {
    const quantity = parseInt(window.prompt('Enter quantity:', '1')) || 1;

    if (quantity <= 0) {
      alert('Invalid quantity');
      return;
    }

    const mycart = [...(this.context?.mycart || [])];

    const index = mycart.findIndex(
      (x) => x.product._id === product._id
    );

    if (index === -1) {
      mycart.push({ product, quantity });
    } else {
      mycart[index].quantity += quantity;
    }

    this.context.setMycart(mycart);
    alert(`Added ${quantity} ${product.name}`);
  }
}

export default withRouter(Product);