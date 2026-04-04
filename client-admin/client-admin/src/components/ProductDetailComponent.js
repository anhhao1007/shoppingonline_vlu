import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: ''
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="product-detail-form">
        <div className="form-card">
          <div className="form-header">
            <h2 className="form-title">
              <i className="fas fa-box"></i> Product Details
            </h2>
            <p className="form-subtitle">
              {this.state.txtID ? 'Edit product information' : 'Add new product to inventory'}
            </p>
          </div>

          <div className="form-content-single">
            {/* Form Fields */}
            <div className="form-fields">
              <form>
                {/* ID Field */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-hashtag"></i> Product ID
                  </label>
                  <input
                    type="text"
                    value={this.state.txtID}
                    readOnly={true}
                    className="form-control form-control-readonly"
                    placeholder="Auto-generated"
                  />
                  <small className="form-help">Auto-generated when creating new product</small>
                </div>

                {/* Name Field */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-tag"></i> Product Name *
                  </label>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => this.setState({ txtName: e.target.value })}
                    className="form-control"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Price Field */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-dollar-sign"></i> Price ($) *
                  </label>
                  <input
                    type="number"
                    value={this.state.txtPrice}
                    onChange={(e) => this.setState({ txtPrice: e.target.value })}
                    className="form-control"
                    placeholder="Enter price in dollars"
                    min="0"
                    required
                  />
                </div>

                {/* Category Field */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-list"></i> Category *
                  </label>
                  <select
                    value={this.state.cmbCategory}
                    onChange={(e) =>
                      this.setState({ cmbCategory: e.target.value })
                    }
                    className="form-control form-select"
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {cates}
                  </select>
                </div>

                {/* Image Upload Field */}
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-image"></i> Product Image *
                  </label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(e) => this.previewImage(e)}
                      className="file-input"
                      id="file-upload"
                    />
                    <label className="file-upload-label" htmlFor="file-upload">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Click to upload or drag image here</span>
                      <small>JPEG, PNG, GIF up to 5MB</small>
                    </label>
                  </div>
                </div>

                {/* Image Preview Below Upload */}
                {this.state.imgProduct && (
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-eye"></i> Image Preview
                    </label>
                    <div className="image-preview-inline">
                      <img
                        src={this.state.imgProduct}
                        alt="Product preview"
                        className="preview-img"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="form-actions">
                  {/* Add New Button - Only shown when adding new product */}
                  {!this.props.item && (
                    <button
                      type="submit"
                      className="btn btn-add"
                      onClick={(e) => this.btnAddClick(e)}
                      title="Create new product"
                    >
                      <i className="fas fa-plus"></i> Add New
                    </button>
                  )}

                  {/* Update Button - Only shown when editing */}
                  {this.props.item && (
                    <button
                      type="submit"
                      className="btn btn-edit"
                      onClick={(e) => this.btnUpdateClick(e)}
                      title="Update product"
                    >
                      <i className="fas fa-edit"></i> Update
                    </button>
                  )}

                  {/* Delete Button - Only shown when editing */}
                  {this.props.item && (
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={(e) => this.btnDeleteClick(e)}
                      title="Delete product"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidMount() {
    this.apiGetCategories();
    // If item was passed initially, populate the form
    if (this.props.item != null) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }

  componentDidUpdate(prevProps) {
    // When item changes (different product selected for editing)
    if (this.props.item !== prevProps.item) {
      if (this.props.item != null) {
        this.setState({
          txtID: this.props.item._id,
          txtName: this.props.item.name,
          txtPrice: this.props.item.price,
          cmbCategory: this.props.item.category._id,
          imgProduct: 'data:image/jpg;base64,' + this.props.item.image
        });
      } else {
        // Resetting form when creating new product
        this.setState({
          txtID: '',
          txtName: '',
          txtPrice: 0,
          cmbCategory: '',
          imgProduct: ''
        });
      }
    }
  }

  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );

    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('⚠ Please fill in all required fields: Name, Price, Category, and Image');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );

    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('⚠ Please fill in all required fields: ID, Name, Price, Category, and Image');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('🗑 Are you sure you want to delete this product? This action cannot be undone.')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('⚠ Please select a product to delete');
      }
    }
  }

  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('✓ Product created successfully!');
        this.apiGetProducts();
        if (this.props.closeModal) this.props.closeModal();
      } else {
        alert('✗ Failed to create product. Please try again.');
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('✓ Product updated successfully!');
        this.apiGetProducts();
        if (this.props.closeModal) this.props.closeModal();
      } else {
        alert('✗ Failed to update product. Please try again.');
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('✓ Product deleted successfully!');
        this.apiGetProducts();
        if (this.props.closeModal) this.props.closeModal();
      } else {
        alert('✗ Failed to delete product. Please try again.');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios
      .get('/api/admin/products?page=' + this.props.curPage, config)
      .then((res) => {
        const result = res.data;
        if (result.products.length !== 0) {
          this.props.updateProducts(result.products, result.noPages);
        } else {
          axios
            .get(
              '/api/admin/products?page=' + (this.props.curPage - 1),
              config
            )
            .then((res) => {
              const result = res.data;
              this.props.updateProducts(result.products, result.noPages);
            });
        }
      });
  }
}

export default ProductDetail;
