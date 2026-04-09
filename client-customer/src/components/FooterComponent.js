import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="footer">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="footer-grid">
              {/* Brand Section */}
              <div className="footer-section">
                <h3 className="footer-logo">
                  <i className="bi bi-shop"></i> Shopping Store
                </h3>
                <p className="footer-description">
                  Premium mobile phones and electronics at unbeatable prices. Your trusted online shopping destination.
                </p>
                <div className="footer-social">
                  <a href="https://facebook.com" className="social-link" title="Facebook" target="_blank" rel="noreferrer">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://twitter.com" className="social-link" title="Twitter" target="_blank" rel="noreferrer">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://instagram.com" className="social-link" title="Instagram" target="_blank" rel="noreferrer">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" className="social-link" title="LinkedIn" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/product/search">Shop</Link></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#blog">Blog</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div className="footer-section">
                <h4>Categories</h4>
                <ul className="footer-links">
                  <li><a href="#phones">Phones</a></li>
                  <li><a href="#tablets">Tablets</a></li>
                  <li><a href="#accessories">Accessories</a></li>
                  <li><a href="#laptops">Laptops</a></li>
                  <li><a href="#smartwatches">Smart Watches</a></li>
                </ul>
              </div>

              {/* Customer Service */}
              <div className="footer-section">
                <h4>Support</h4>
                <ul className="footer-links">
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#shipping">Shipping Info</a></li>
                  <li><a href="#returns">Returns</a></li>
                  <li><a href="#warranty">Warranty</a></li>
                  <li><a href="#track-order">Track Order</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="footer-section">
                <h4>Newsletter</h4>
                <p className="newsletter-text">Subscribe to get special offers and updates</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
                <div className="footer-badges">
                  <div className="badge">
                    <i className="bi bi-shield-check"></i>
                    <span>Secure Payment</span>
                  </div>
                  <div className="badge">
                    <i className="bi bi-truck"></i>
                    <span>Fast Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="footer-bottom-content">
              <p className="copyright">
                &copy; {currentYear} Shopping Store. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <a href="#privacy">Privacy Policy</a>
                <span className="divider">|</span>
                <a href="#terms">Terms & Conditions</a>
                <span className="divider">|</span>
                <a href="#cookies">Cookie Policy</a>
              </div>
              <div className="payment-methods">
                <i className="bi bi-credit-card"></i>
                <i className="bi bi-paypal"></i>
                <i className="bi bi-google"></i>
                <i className="bi bi-apple"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
