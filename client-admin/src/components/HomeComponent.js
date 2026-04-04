import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Home extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      totalOrders: 0,
      totalProducts: 0,
      totalCategories: 0,
      totalCustomers: 0,
      isLoading: true
    };
  }

  render() {
    const { totalOrders, totalProducts, totalCategories, totalCustomers, isLoading } = this.state;

    return (
      <div className="admin-container p-4">
        <div className="mb-4">
          <h1 className="mb-3">
            <i className="bi bi-speedometer2"></i> Dashboard
          </h1>
          <p className="text-muted">Welcome to the Admin Dashboard</p>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-bag-check"></i>
              </div>
              <div className="stat-value">{isLoading ? '...' : totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card" style={{ borderLeftColor: '#27ae60' }}>
              <div className="stat-icon" style={{ color: '#27ae60' }}>
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="stat-value" style={{ color: '#27ae60' }}>{isLoading ? '...' : totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card" style={{ borderLeftColor: '#f39c12' }}>
              <div className="stat-icon" style={{ color: '#f39c12' }}>
                <i className="bi bi-tag-fill"></i>
              </div>
              <div className="stat-value" style={{ color: '#f39c12' }}>{isLoading ? '...' : totalCategories}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="stat-card" style={{ borderLeftColor: '#e74c3c' }}>
              <div className="stat-icon" style={{ color: '#e74c3c' }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="stat-value" style={{ color: '#e74c3c' }}>{isLoading ? '...' : totalCustomers}</div>
              <div className="stat-label">Customers</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-info-circle"></i> Welcome to Admin Dashboard
            </h5>
            <p className="card-text">
              This is your central hub for managing all aspects of your e-commerce store. 
              Use the navigation menu above to access different sections like:
            </p>
            <ul>
              <li><strong>Home:</strong> View dashboard and key statistics</li>
              <li><strong>Categories:</strong> Manage product categories</li>
              <li><strong>Products:</strong> Add, edit, and delete products</li>
              <li><strong>Orders:</strong> View and manage customer orders</li>
              <li><strong>Customers:</strong> Manage customer accounts</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    Promise.all([
      axios.get('/api/admin/orders', config),
      axios.get('/api/admin/products?page=1', config),
      axios.get('/api/admin/categories', config),
      axios.get('/api/admin/customers', config)
    ]).then(([ordersRes, productsRes, categoriesRes, customersRes]) => {
      // Handle orders
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const totalOrders = orders.length;

      // Handle products - use totalCount from API
      let totalProducts = 0;
      if (productsRes.data && productsRes.data.totalCount !== undefined) {
        totalProducts = productsRes.data.totalCount;
      } else if (productsRes.data && productsRes.data.products) {
        totalProducts = productsRes.data.products.length;
      }

      // Handle categories
      const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
      const totalCategories = categories.length;

      // Handle customers
      const customers = Array.isArray(customersRes.data) ? customersRes.data : [];
      const totalCustomers = customers.length;

      this.setState({
        totalOrders,
        totalProducts,
        totalCategories,
        totalCustomers,
        isLoading: false
      });
    }).catch((err) => {
      console.error('Error loading dashboard data:', err);
      this.setState({ isLoading: false });
    });
  }
}

export default Home;
