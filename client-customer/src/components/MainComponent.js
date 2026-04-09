import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Footer from "./FooterComponent";

class Main extends Component {
  componentDidMount() {
    // Initialize all animations and effects
    setTimeout(() => {
      initializeAllEffects();
    }, 100);
  }

  componentWillUnmount() {
    // Cleanup effects
    cleanupEffects();
  }

  render() {
    return (
      <div className="body-customer">
        <Menu />
        <Inform />

        <div className="py-4">
          <Routes>
            {/* default route */}
            <Route path="/" element={<Navigate replace to="/home" />} />

            {/* main pages */}
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
            <Route path="/myprofile" element={<Myprofile />} />

            {/* cart */}
            <Route path="/mycart" element={<Mycart />} />

            {/* orders */}
            <Route path="/myorders" element={<Myorders />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
