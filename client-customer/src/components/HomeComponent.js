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
                crossOrigin="anonymous"
              />
            </Link>
            <span className="product-badge">NEW</span>
          </div>
          <div className="product-info">
            <span className="product-category">New Arrival</span>
            <h5 className="product-name">{item.name}</h5>
            <div className="product-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
            </div>
            <div className="product-price">
              <span className="current">${item.price}</span>
            </div>
            <div className="product-actions">
              <Link to={'/product/' + item._id} className="btn-add">
                <i className="bi bi-bag-plus"></i> View
              </Link>
              <button className="btn-wishlist" 
                onClick={() => this.addToCart(item)} title="Add to cart">
                <i className="bi bi-heart"></i>
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
                crossOrigin="anonymous"
              />
            </Link>
            <span className="product-badge" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c9a017 100%)' }}>
              HOT
            </span>
          </div>
          <div className="product-info">
            <span className="product-category">Popular</span>
            <h5 className="product-name">{item.name}</h5>
            <div className="product-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <div className="product-price">
              <span className="current">${item.price}</span>
            </div>
            <div className="product-actions">
              <Link to={'/product/' + item._id} className="btn-add">
                <i className="bi bi-bag-plus"></i> View
              </Link>
              <button className="btn-wishlist" 
                onClick={() => this.addToCart(item)} title="Add to cart">
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {/* HERO SECTION */}
        <section className="home-hero">
          <div className="home-hero-content">
            <h1><span className="gold">Premium</span> Mobile Phones</h1>
            <p>Discover the latest and greatest smartphones at unbeatable prices</p>
            <Link to="/product/search" className="btn-primary">
              <i className="bi bi-lightning-fill"></i> Shop Now
            </Link>
          </div>
        </section>

        {/* NEW PRODUCTS */}
        <section className="featured-products">
          <div className="container-fluid">
            <h2>
              <i className="bi bi-star"></i> New Arrivals
            </h2>
            <div className="products-grid">
              {newprods}
            </div>
          </div>
        </section>

        {/* HOT PRODUCTS */}
        {this.state.hotprods.length > 0 && (
          <section className="featured-products" style={{ background: '#1a1a2e' }}>
            <div className="container-fluid">
              <h2 style={{ color: '#d4af37', marginBottom: 'var(--spacing-3xl)' }}>
                <i className="bi bi-fire"></i> Trending Now
              </h2>
              <div className="products-grid">
                {hotprods}
              </div>
            </div>
          </section>
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
    }).catch(() => {
      this.setState({ newprods: [] });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    }).catch(() => {
      this.setState({ hotprods: [] });
    });
  }
}

export default Home;
