const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');
const EmailUtil = require('../utils/EmailUtil');

// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');

// ==================== AUTH ====================

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(
      username,
      password
    );

    if (admin) {
      const token = JwtUtil.genToken(username, password);
      return res.json({
        success: true,
        message: 'Authentication successful',
        token
      });
    }

    return res.json({
      success: false,
      message: 'Incorrect username or password'
    });
  }

  res.json({
    success: false,
    message: 'Please input username and password'
  });
});

// check token
router.get('/token', JwtUtil.checkToken, (req, res) => {
  const token =
    req.headers['x-access-token'] || req.headers['authorization'];

  res.json({
    success: true,
    message: 'Token is valid',
    token
  });
});

// ==================== CUSTOMER ====================

// get all customers
router.get('/customers', JwtUtil.checkToken, async (req, res) => {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});

// 🔥 deactivate customer
router.put('/customers/deactive/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const token = req.body.token;

  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});

// activate lại
router.put('/customers/active/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const token = req.body.token;

  const result = await CustomerDAO.active(_id, token, 1);
  res.json(result);
});

// 📧 gửi email kích hoạt
router.get(
  '/customers/sendmail/:id',
  JwtUtil.checkToken,
  async (req, res) => {
    const _id = req.params.id;
    const cust = await CustomerDAO.selectByID(_id);

    if (cust) {
      const send = await EmailUtil.send(
        cust.email,
        cust._id,
        cust.token
      );

      if (send) {
        return res.json({
          success: true,
          message: 'Please check email'
        });
      }

      return res.json({
        success: false,
        message: 'Email failure'
      });
    }

    res.json({
      success: false,
      message: 'Not exists customer'
    });
  }
);

// ==================== ORDER ====================

router.get('/orders', JwtUtil.checkToken, async (req, res) => {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});

router.get(
  '/orders/customer/:cid',
  JwtUtil.checkToken,
  async (req, res) => {
    const _cid = req.params.cid;
    const orders = await OrderDAO.selectByCustID(_cid);
    res.json(orders);
  }
);

router.put('/orders/status/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const newStatus = req.body.status;

  const result = await OrderDAO.update(_id, newStatus);
  res.json(result);
});

// ==================== CATEGORY ====================

router.get('/categories', JwtUtil.checkToken, async (req, res) => {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/categories', JwtUtil.checkToken, async (req, res) => {
  const { name } = req.body;
  const result = await CategoryDAO.insert({ name });
  res.json(result);
});

router.put('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const { name } = req.body;

  const result = await CategoryDAO.update({ _id, name });
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

// ==================== PRODUCT ====================

router.get('/products', JwtUtil.checkToken, async (req, res) => {
  const total = await ProductDAO.selectByCount();
  const sizePage = 4;
  const noPages = Math.ceil(total / sizePage);

  let curPage = parseInt(req.query.page) || 1;
  const skip = (curPage - 1) * sizePage;

  const products = await ProductDAO.selectBySkipLimit(skip, sizePage);

  res.json({
    products,
    noPages,
    curPage,
    totalCount: total
  });
});

router.post('/products', JwtUtil.checkToken, async (req, res) => {
  const { name, price, category: cid, image } = req.body;

  const now = new Date().getTime();
  const category = await CategoryDAO.selectByID(cid);

  const product = {
    name,
    price,
    image,
    cdate: now,
    category
  };

  const result = await ProductDAO.insert(product);
  res.json(result);
});

router.put('/products/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const { name, price, category: cid, image } = req.body;

  const category = await CategoryDAO.selectByID(cid);

  const product = {
    _id,
    name,
    price,
    image,
    category
  };

  const result = await ProductDAO.update(product);
  res.json(result);
});

router.delete('/products/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const result = await ProductDAO.delete(_id);
  res.json(result);
});

module.exports = router;