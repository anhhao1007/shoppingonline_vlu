import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  // Calculate total quantity of all items in cart
  getTotalQuantity() {
    return this.context.mycart.reduce((total, item) => total + item.quantity, 0);
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="nav-item" role="presentation">
          <Link className="nav-link" to={'/product/category/' + item._id}>
            {item.name}
          </Link>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-dark header-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shop"></i> Shopping Store
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav header-nav me-auto">
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-fill"></i> Home
                </Link>
              </li>
              {cates}
            </ul>

            <form className="header-search d-flex" onSubmit={(e) => this.btnSearchClick(e)}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search products..."
                  value={this.state.txtKeyword}
                  onChange={(e) => {
                    this.setState({ txtKeyword: e.target.value });
                  }}
                />
                <button className="btn btn-outline-secondary" type="submit">
                  <i className="bi bi-search"></i> Search
                </button>
              </div>
            </form>

            <div className="header-right">
              <Link to="/mycart" className="cart-icon">
                <i className="bi bi-cart3"></i>
                <span className="cart-badge">{this.getTotalQuantity()}</span>
              </Link>

              <Link to="/myprofile" className="user-menu">
                <i className="bi bi-person-circle"></i> Account
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    }).catch(() => {
      this.setState({ categories: [] });
    });
  }
}

export default withRouter(Menu);