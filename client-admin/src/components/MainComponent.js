import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';

class Main extends Component {
  static contextType = MyContext;

  render() {
    // Nếu đã login
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Menu />

          <Routes>
            {/* Redirect mặc định */}
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/home" />}
            />

            {/* Pages */}
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/order" element={<Order />} />
            <Route path="/admin/customer" element={<Customer />} />

            {/* Sai đường dẫn */}
            <Route
              path="*"
              element={<Navigate replace to="/admin/home" />}
            />
          </Routes>
        </div>
      );
    }

    // Nếu chưa login
    return <div />;
  }
}

export default Main;