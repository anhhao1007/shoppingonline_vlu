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
              />
            </Link>
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
              <button className="btn btn-cart" onClick={() => this.addToCart(item)}>
                <i className="bi bi-cart-plus"></i> Cart
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="customer-container">
        <div className="mb-4">
          <h2 className="mb-3">
            <i className="bi bi-bag"></i> Products
          </h2>
          {this.state.products.length === 0 && (
            <div className="alert alert-info">
              <i className="bi bi-info-circle"></i> No products found
            </div>
          )}
        </div>

        <div className="products-grid">
          {prods}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword !== undefined) {
      // Call API even if keyword is empty or undefined
      this.apiGetProductsByKeyword(params.keyword || '');
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    const prevParams = prevProps.params;
    
    if (params.cid && params.cid !== prevParams.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword !== prevParams.keyword && params.keyword !== undefined) {
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
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);