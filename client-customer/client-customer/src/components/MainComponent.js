import React, { Component } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { initializeAllEffects, cleanupEffects } from "../utils/effectsUtils";

import Menu from "./MenuComponent";
import Inform from "./InformComponent";
import Home from "./HomeComponent";
import Product from "./ProductComponent";
import ProductDetail from "./ProductDetailComponent";
import Signup from "./SignupComponent";
import Active from "./ActiveComponent";
import Login from "./LoginComponent";
import Myprofile from "./MyprofileComponent";
import Mycart from "./MycartComponent";
import Myorders from "./MyordersComponent";

import MyContext from "../contexts/MyContext";

// ===== Protected Route =====
function ProtectedRoute({ children }) {
  return (
    <MyContext.Consumer>
      {(context) =>
        context.token ? children : <Navigate to="/login" replace />
      }
    </MyContext.Consumer>
  );
}

// ===== Scroll to top =====
function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

// ===== Loading Component =====
function PageLoader() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h3>Loading...</h3>
    </div>
  );
}

class Main extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    initializeAllEffects();
  }

  componentWillUnmount() {
    cleanupEffects();
  }

  componentDidUpdate(prevProps) {
    // fake loading khi chuyển route
    if (this.props.location !== prevProps.location) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 300);
    }
  }

  render() {
    return (
      <div className="body-customer">
        <Menu />
        <Inform />

        <ScrollToTop />

        <div className="py-4">
          {this.state.loading && <PageLoader />}

          <Routes>
            {/* default */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* main */}
            <Route path="/home" element={<Home />} />

            {/* product */}
            <Route path="/product/category/:cid" element={<Product />} />
            <Route path="/product/search/:keyword" element={<Product />} />
            <Route path="/product/search" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* account */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/active" element={<Active />} />
            <Route path="/login" element={<Login />} />

            {/* protected */}
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute>
                  <Myprofile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mycart"
              element={
                <ProtectedRoute>
                  <Mycart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <Myorders />
                </ProtectedRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default Main;