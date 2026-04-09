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
    try {
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
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
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
  try {
    const customers = await CustomerDAO.selectAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// deactivate customer — dùng activeByID, không cần activation token từ body
router.put('/customers/deactive/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await CustomerDAO.activeByID(_id, 0);
    if (!result) {
      return res.json({ success: false, message: 'Customer not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// activate customer — dùng activeByID, không cần activation token từ body
router.put('/customers/active/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await CustomerDAO.activeByID(_id, 1);
    if (!result) {
      return res.json({ success: false, message: 'Customer not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// gửi email kích hoạt
router.get(
  '/customers/sendmail/:id',
  JwtUtil.checkToken,
  async (req, res) => {
    const _id = req.params.id;

    try {
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
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== ORDER ====================

router.get('/orders', JwtUtil.checkToken, async (req, res) => {
  try {
    const orders = await OrderDAO.selectAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get(
  '/orders/customer/:cid',
  JwtUtil.checkToken,
  async (req, res) => {
    const _cid = req.params.cid;

    try {
      const orders = await OrderDAO.selectByCustID(_cid);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

router.put('/orders/status/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const newStatus = req.body.status;

  try {
    const result = await OrderDAO.update(_id, newStatus);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CATEGORY ====================

router.get('/categories', JwtUtil.checkToken, async (req, res) => {
  try {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/categories', JwtUtil.checkToken, async (req, res) => {
  const { name } = req.body;

  try {
    const result = await CategoryDAO.insert({ name });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const { name } = req.body;

  try {
    const result = await CategoryDAO.update({ _id, name });
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await CategoryDAO.delete(_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== PRODUCT ====================

router.get('/products', JwtUtil.checkToken, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/products', JwtUtil.checkToken, async (req, res) => {
  const { name, price, category: cid, image } = req.body;

  try {
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
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/products/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const { name, price, category: cid, image } = req.body;

  try {
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
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/products/:id', JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await ProductDAO.delete(_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
