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
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
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
          </div>
          <div className="product-info">
            <span className="product-category">{item.category?.name || "Product"}</span>
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
              <button className="btn-wishlist" onClick={() => this.addToCart(item)} title="Add to cart">
                <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <section className="featured-products">
        <div className="container-fluid">
          <h2 style={{ marginBottom: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-lg)' }}>
            <i className="bi bi-bag"></i> Explore Products
          </h2>
          {this.state.products.length === 0 && (
            <div style={{ 
              background: '#fff3cd',
              border: '1px solid #ffc107',
              padding: 'var(--spacing-xl)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              color: '#856404'
            }}>
              <i className="bi bi-info-circle"></i> No products found. Try a different search.
            </div>
          )}

          <div className="products-grid">
            {prods}
          </div>
        </div>
      </section>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else {
      this.apiGetProductsByKeyword(params.keyword || '');
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    const prevParams = prevProps.params;

    if (params.cid && params.cid !== prevParams.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (!params.cid && params.keyword !== prevParams.keyword) {
      this.apiGetProductsByKeyword(params.keyword || '');
    }
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
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    }).catch(() => {
      this.setState({ products: [] });
    });
  }

  apiGetProductsByKeyword(keyword) {
    const url = keyword
      ? '/api/customer/products/search/' + keyword
      : '/api/customer/products/search';
    axios.get(url).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    }).catch(() => {
      this.setState({ products: [] });
    });
  }
}

export default withRouter(Product);
