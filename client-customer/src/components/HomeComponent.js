import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Home extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <div className="product-image">
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                alt={item.name}
              />
            </Link>
            <span className="product-badge">NEW</span>
          </div>
          <div className="product-info">
            <h5 className="product-name">{item.name}</h5>
            <div className="product-price">
              <span className="price-current">${item.price}</span>
            </div>
            <div className="product-actions">
              <Link to={'/product/' + item._id} className="btn btn-view">
                <i className="bi bi-eye"></i> View
              </Link>
              <button className="btn btn-cart" 
                onClick={() => this.addToCart(item)}>
                <i className="bi bi-cart-plus"></i> Cart
              </button>
            </div>
          </div>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <div className="product-image">
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                alt={item.name}
              />
            </Link>
            <span className="product-badge" style={{ backgroundColor: '#f39c12' }}>
              HOT
            </span>
          </div>
          <div className="product-info">
            <h5 className="product-name">{item.name}</h5>
            <div className="product-price">
              <span className="price-current">${item.price}</span>
            </div>
            <div className="product-actions">
              <Link to={'/product/' + item._id} className="btn btn-view">
                <i className="bi bi-eye"></i> View
              </Link>
              <button className="btn btn-cart" 
                onClick={() => this.addToCart(item)}>
                <i className="bi bi-cart-plus"></i> Cart
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="customer-container">
        {/* HERO SECTION */}
        <div className="hero-section">
          <h1><i className="bi bi-lightning-fill"></i> Welcome to Shopping Store</h1>
          <p>Discover amazing products at great prices</p>
        </div>

        {/* NEW PRODUCTS */}
        <div className="products-section">
          <div className="section-header">
            <h2><i className="bi bi-star"></i> NEW PRODUCTS</h2>
            <Link to="/product/search" className="view-more">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="products-grid">
            {newprods}
          </div>
        </div>

        {/* HOT PRODUCTS */}
        {this.state.hotprods.length > 0 && (
          <div className="products-section">
            <div className="section-header">
              <h2><i className="bi bi-fire"></i> HOT PRODUCTS</h2>
              <Link to="/product/search" className="view-more">
                View All <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="products-grid">
              {hotprods}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // event handlers
  addToCart(product) {
    const quantity = parseInt(window.prompt('Enter quantity:', '1')) || 1;
    
    if (quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

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
    alert('Added ' + quantity + ' ' + product.name + ' to cart!');
  }

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;