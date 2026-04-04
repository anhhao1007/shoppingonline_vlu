import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }

  // ==================== RENDER ====================
  render() {
    const customers = this.state.customers.map((item) => (
      <tr
        key={item._id}
        className="datatable"
        onClick={() => this.trCustomerClick(item)}
      >
        <td>{item._id}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.active}</td>
        <td>
          {item.active === 0 ? (
            <span
              className="link"
              onClick={(e) => {
                e.stopPropagation(); // 🔥 tránh click row
                this.lnkEmailClick(item);
              }}
            >
              EMAIL
            </span>
          ) : (
            <span
              className="link"
              onClick={(e) => {
                e.stopPropagation();
                this.lnkDeactiveClick(item);
              }}
            >
              DEACTIVE
            </span>
          )}
        </td>
      </tr>
    ));

    const orders = this.state.orders.map((item) => (
      <tr
        key={item._id}
        className="datatable"
        onClick={() => this.trOrderClick(item)}
      >
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ));

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>
            <img
              src={'data:image/jpg;base64,' + item.product.image}
              width="70"
              height="70"
              alt=""
            />
          </td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
        </tr>
      ));
    }

    return (
      <div className="admin-container p-4">
        {/* CUSTOMER LIST */}
        <div className="mb-4">
          <h2 className="mb-3">
            <i className="bi bi-people-fill"></i> Customer Management
          </h2>

          <table className="datatable table">
            <thead>
              <tr>
                <th><i className="bi bi-hash"></i> ID</th>
                <th><i className="bi bi-at"></i> Username</th>
                <th><i className="bi bi-key"></i> Password</th>
                <th><i className="bi bi-person-badge"></i> Name</th>
                <th><i className="bi bi-telephone"></i> Phone</th>
                <th><i className="bi bi-envelope"></i> Email</th>
                <th><i className="bi bi-check-circle"></i> Active</th>
                <th><i className="bi bi-gear"></i> Action</th>
              </tr>
            </thead>
            <tbody>
              {customers}
            </tbody>
          </table>
        </div>

        {/* ORDER LIST */}
        {this.state.orders.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-3">
              <i className="bi bi-bag-check"></i> Customer Orders
            </h3>

            <table className="datatable table">
              <thead>
                <tr>
                  <th><i className="bi bi-hash"></i> ID</th>
                  <th><i className="bi bi-calendar"></i> Date</th>
                  <th><i className="bi bi-person"></i> Name</th>
                  <th><i className="bi bi-telephone"></i> Phone</th>
                  <th><i className="bi bi-currency-dollar"></i> Total</th>
                  <th><i className="bi bi-flag"></i> Status</th>
                </tr>
              </thead>
              <tbody>
                {orders}
              </tbody>
            </table>
          </div>
        )}

        {/* ORDER DETAIL */}
        {this.state.order && (
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-text"></i> Order Details
              </h5>
            </div>
            <div className="card-body">
              <table className="datatable table">
                <thead>
                  <tr>
                    <th><i className="bi bi-hash"></i> No.</th>
                    <th><i className="bi bi-hash"></i> Product ID</th>
                    <th><i className="bi bi-bag"></i> Product Name</th>
                    <th><i className="bi bi-image"></i> Image</th>
                    <th><i className="bi bi-currency-dollar"></i> Price</th>
                    <th><i className="bi bi-box"></i> Qty</th>
                    <th><i className="bi bi-calculator"></i> Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== LIFECYCLE ====================
  componentDidMount() {
    this.apiGetCustomers();
  }

  // ==================== EVENT ====================
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item });
  }

  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  // ==================== API ====================
  apiGetCustomers() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/customers', config).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .get('/api/admin/orders/customer/' + cid, config)
      .then((res) => {
        this.setState({ orders: res.data });
      });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token };
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .put('/api/admin/customers/deactive/' + id, body, config)
      .then((res) => {
        if (res.data) {
          this.apiGetCustomers();
        } else {
          alert('SORRY BABY!');
        }
      });
  }

  apiGetCustomerSendmail(id) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .get('/api/admin/customers/sendmail/' + id, config)
      .then((res) => {
        alert(res.data.message);
      });
  }
}

export default Customer;