import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
      showModal: false
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable">
          <td><small>{item._id}</small></td>
          <td><strong>{item.name}</strong></td>
          <td className="text-success"><strong>${item.price}</strong></td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category && item.category.name}</td>

          <td className="text-center">
            <img
              src={'data:image/jpg;base64,' + item.image}
              width="80px"
              height="80px"
              alt="product"
              className="rounded"
            />
          </td>

          <td className="text-center">
            <button
              className="btn btn-sm btn-edit"
              onClick={() => this.editProductClick(item)}
              title="Edit product"
            >
              <i className="bi bi-pencil-square"></i> Edit
            </button>
          </td>
        </tr>
      );
    });

    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        if (index + 1 === this.state.curPage) {
          return (
            <span key={index} className="badge bg-primary mx-1">
              {index + 1}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="badge bg-secondary mx-1"
              style={{ cursor: 'pointer' }}
              onClick={() => this.lnkPageClick(index + 1)}
            >
              {index + 1}
            </span>
          );
        }
      }
    );

    return (
      <div className="admin-container p-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">
                <i className="bi bi-box-seam"></i> Product Management
              </h2>
              <button
                className="btn btn-primary"
                onClick={() => this.btnAddProductClick()}
                title="Add new product"
              >
                <i className="bi bi-plus-circle"></i> Add Product
              </button>
            </div>

            <table className="datatable table">
              <thead>
                <tr>
                  <th><i className="bi bi-hash"></i> ID</th>
                  <th><i className="bi bi-bag"></i> Name</th>
                  <th><i className="bi bi-currency-dollar"></i> Price</th>
                  <th><i className="bi bi-calendar"></i> Date</th>
                  <th><i className="bi bi-tag"></i> Category</th>
                  <th><i className="bi bi-image"></i> Image</th>
                  <th><i className="bi bi-gear"></i> Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods}
              </tbody>
            </table>

            <div className="text-center mb-3">
              {pagination}
            </div>
          </div>
        </div>

        {/* Modal for Add/Edit Product */}
        {this.state.showModal && (
          <div className="modal-overlay" onClick={() => this.closeModal()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {this.state.itemSelected ? '✏️ Edit Product' : '➕ Add New Product'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => this.closeModal()}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ProductDetail
                  item={this.state.itemSelected}
                  curPage={this.state.curPage}
                  updateProducts={this.updateProducts}
                  closeModal={() => this.closeModal()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  // event-handlers
  btnAddProductClick() {
    this.setState({ itemSelected: null, showModal: true });
  }

  editProductClick(item) {
    this.setState({ itemSelected: item, showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false, itemSelected: null });
  }

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    // Removed modal opening here - use Edit button instead
  }

  updateProducts = (products, noPages) => {
    this.setState({ products: products, noPages: noPages });
  };

  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage
      });
    });
  }
}

export default Product;
