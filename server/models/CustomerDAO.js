require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const CustomerDAO = {
  // ==================== GET ====================

  // Get all customers
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  // Get customer by ID
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  },

  // Check username OR email exists
  async selectByUsernameOrEmail(username, email) {
    const query = {
      $or: [{ username }, { email }]
    };

    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // ==================== INSERT ====================

  // Insert new customer
  async insert(customer) {
    customer._id = new mongoose.Types.ObjectId();

    const result = await Models.Customer.create(customer);
    return result;
  },

  // ==================== UPDATE ====================

  // Activate / Deactivate account (dùng cho customer tự kích hoạt qua email token)
  async active(_id, token, active) {
    const query = { _id, token };
    const newValues = { active };

    const result = await Models.Customer.findOneAndUpdate(
      query,
      newValues,
      { new: true }
    );

    return result;
  },

  // Activate / Deactivate account by ID only (dùng cho admin)
  async activeByID(_id, active) {
    const result = await Models.Customer.findByIdAndUpdate(
      _id,
      { active },
      { new: true }
    );

    return result;
  },

  // Update customer profile
  async update(customer) {
    const newValues = {
      username: customer.username,
      password: customer.password,
      name: customer.name,
      phone: customer.phone,
      email: customer.email
    };

    const result = await Models.Customer.findByIdAndUpdate(
      customer._id,
      newValues,
      { new: true }
    );

    return result;
  },

  // ==================== AUTH ====================

  // Login
  async selectByUsernameAndPassword(username, password) {
    const query = { username, password };

    const customer = await Models.Customer.findOne(query);
    return customer;
  }
};

module.exports = CustomerDAO;