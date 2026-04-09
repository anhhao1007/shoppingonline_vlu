import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      item: null 
    };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <tr
        key={item._id}
        className="datatable"
        onClick={() => this.trItemClick(item)}
      >
        <td><small>{item._id}</small></td>
        <td><strong>{item.name}</strong></td>
      </tr>
    ));

    return (
      <div className="admin-container p-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-4">
              <h2 className="mb-3">
                <i className="bi bi-tag-fill"></i> Category Management
              </h2>
            </div>

            <table className="datatable table">
              <thead>
                <tr>
                  <th><i className="bi bi-hash"></i> ID</th>
                  <th><i className="bi bi-tag"></i> Name</th>
                </tr>
              </thead>
              <tbody>
                {cates}
              </tbody>
            </table>
          </div>

          <div className="col-lg-4">
            <CategoryDetail
              item={this.state.item}
              updateCategories={this.updateCategories}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ item: item });
  }

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  // apis
  apiGetCategories() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;
