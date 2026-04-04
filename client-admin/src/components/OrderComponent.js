import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  // ================= RENDER =================
  render() {
    const orders = this.state.orders.map((item) => (
      <tr
        key={item._id}
        className="datatable"
        onClick={() => this.trItemClick(item)}
      >
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
        <td>
          {item.status === 'PENDING' ? (
            <div>
              <span
                className="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkApproveClick(item._id);
                }}
              >
                APPROVE
              </span>{' '}
              ||{' '}
              <span
                className="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkCancelClick(item._id);
                }}
              >
                CANCEL
              </span>
            </div>
          ) : (
            <div />
          )}
        </td>
      </tr>
    ));

    let items = [];
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64," + item.product.image}
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
        {/* ORDER LIST */}
        <div className="mb-4">
          <h2 className="mb-3">
            <i className="bi bi-bag-check"></i> Order Management
          </h2>

          <table className="datatable table">
            <thead>
              <tr>
                <th><i className="bi bi-hash"></i> ID</th>
                <th><i className="bi bi-calendar"></i> Date</th>
                <th><i className="bi bi-person"></i> Customer</th>
                <th><i className="bi bi-telephone"></i> Phone</th>
                <th><i className="bi bi-currency-dollar"></i> Total</th>
                <th><i className="bi bi-flag"></i> Status</th>
                <th><i className="bi bi-gear"></i> Action</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>

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

  // ================= LIFECYCLE =================
  componentDidMount() {
    this.apiGetOrders();
  }

  // ================= EVENTS =================
  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  // ================= API =================
  apiGetOrders() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/orders', config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios
      .put('/api/admin/orders/status/' + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetOrders(); // reload
        } else {
          alert('SORRY BABY!');
        }
      });
  }
}

export default Order;