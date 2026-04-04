import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      expandedOrder: null
    };
  }

  render() {
    if (this.context.token === '')
      return (<Navigate replace to='/login' />);

    const orders = this.state.orders.map((item) => {
      const isExpanded = this.state.expandedOrder === item._id;
      const statusColor = item.status === 'PENDING' ? 'warning' : 
                         item.status === 'APPROVED' ? 'success' : 'danger';

      const items = item.items.map((product, index) => (
        <div key={product.product._id} className="order-item">
          <div className="row align-items-center py-3 border-bottom">
            <div className="col-md-2">
              <img
                src={"data:image/jpg;base64," + product.product.image}
                alt={product.product.name}
                className="order-item-image"
              />
            </div>
            <div className="col-md-4">
              <h6>{product.product.name}</h6>
              <small className="text-muted">{product.product.category.name}</small>
            </div>
            <div className="col-md-2">
              <span className="order-price">${product.product.price.toFixed(2)}</span>
            </div>
            <div className="col-md-2">
              <span>Qty: <strong>{product.quantity}</strong></span>
            </div>
            <div className="col-md-2 text-end">
              <span className="order-amount">${(product.product.price * product.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      ));

      return (
        <div key={item._id} className="order-card mb-3">
          <div 
            className="order-header"
            onClick={() => this.toggleOrder(item._id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="row align-items-center">
              <div className="col-md-3">
                <div>
                  <strong>Order ID</strong>
                  <div className="order-id">{item._id.slice(-8)}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div>
                  <strong>Date</strong>
                  <div className="order-date">
                    {new Date(item.cdate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div>
                  <strong>Amount</strong>
                  <div className="order-total">${item.total.toFixed(2)}</div>
                </div>
              </div>
              <div className="col-md-2">
                <span className={`badge bg-${statusColor}`}>
                  {item.status}
                </span>
              </div>
              <div className="col-md-2 text-end">
                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="order-details">
              <div className="details-header">
                <h6><i className="bi bi-list-check"></i> Order Items</h6>
              </div>
              {items}
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="customer-container">
        <div className="orders-header">
          <h2><i className="bi bi-bag-check"></i> My Orders</h2>
          <p className="text-muted">{this.state.orders.length} order(s)</p>
        </div>

        {this.state.orders.length > 0 ? (
          <div className="orders-list">
            {orders}
          </div>
        ) : (
          <div className="empty-orders">
            <i className="bi bi-inbox"></i>
            <h4>No orders yet</h4>
            <p>You haven't placed any orders. Start shopping now!</p>
          </div>
        )}
      </div>
    );
  }

  toggleOrder(orderId) {
    this.setState({
      expandedOrder: this.state.expandedOrder === orderId ? null : orderId
    });
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  apiGetOrdersByCustID(cid) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    }).catch((err) => {
      console.error('Error fetching orders:', err);
    });
  }
}

export default Myorders;