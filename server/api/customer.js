const express = require("express");
const router = express.Router();

// utils
const CryptoUtil = require("../utils/CryptoUtil");
const EmailUtil = require("../utils/EmailUtil");
const JwtUtil = require("../utils/JwtUtil");

// daos
const CategoryDAO = require("../models/CategoryDAO");
const ProductDAO = require("../models/ProductDAO");
const CustomerDAO = require("../models/CustomerDAO");
const OrderDAO = require("../models/OrderDAO");

/* ================= CATEGORY ================= */

router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= PRODUCT =================
   IMPORTANT: specific routes (/new, /hot, /search, /search/:keyword)
   MUST stay above the catch-all /products/:id route.
   Do NOT add new routes below /products/:id — they will be shadowed.
*/

router.get("/products/new", async (req, res) => {
  try {
    const products = await ProductDAO.selectTopNew(3);
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/products/hot", async (req, res) => {
  try {
    const products = await ProductDAO.selectTopHot(3);
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/products/category/:cid", async (req, res) => {
  const _cid = req.params.cid;

  try {
    const products = await ProductDAO.selectByCatID(_cid);
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/products/search", async (req, res) => {
  try {
    const products = await ProductDAO.selectAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/products/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const products = await ProductDAO.selectByKeyword(keyword);
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// catch-all — phải đặt CUỐI CÙNG trong nhóm /products/*
router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await ProductDAO.selectByID(_id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= CUSTOMER SIGNUP ================= */

router.post("/signup", async (req, res) => {
  const { username, password, name, phone, email } = req.body;

  try {
    const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);

    if (dbCust) {
      return res.json({ success: false, message: "Exists username or email" });
    }

    const now = new Date().getTime();
    const token = CryptoUtil.md5(now.toString());

    const newCust = {
      username,
      password,
      name,
      phone,
      email,
      active: 0,
      token
    };

    const result = await CustomerDAO.insert(newCust);

    if (result) {
      const send = await EmailUtil.send(email, result._id, token);

      if (send) {
        res.json({ success: true, message: "Please check email" });
      } else {
        res.json({ success: false, message: "Email failure" });
      }
    } else {
      res.json({ success: false, message: "Insert failure" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= CUSTOMER ACTIVE ACCOUNT ================= */

router.post("/active", async (req, res) => {
  const { id, token } = req.body;

  try {
    const result = await CustomerDAO.active(id, token, 1);
    if (!result) {
      return res.json({ success: false, message: "Invalid id or token" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= CUSTOMER LOGIN ================= */

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const customer = await CustomerDAO.selectByUsernameAndPassword(
        username,
        password
      );

      if (customer) {
        if (customer.active === 1) {
          const token = JwtUtil.genToken(username, password);

          res.json({
            success: true,
            message: "Authentication successful",
            token: token,
            customer: customer
          });
        } else {
          res.json({
            success: false,
            message: "Account is deactive"
          });
        }
      } else {
        res.json({
          success: false,
          message: "Incorrect username or password"
        });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.json({
      success: false,
      message: "Please input username and password"
    });
  }
});

/* ================= CHECK TOKEN ================= */

router.get("/token", JwtUtil.checkToken, (req, res) => {
  const token =
    req.headers["x-access-token"] || req.headers["authorization"];

  res.json({
    success: true,
    message: "Token is valid",
    token: token
  });
});

/* ================= UPDATE MY PROFILE ================= */

router.put("/customers/:id", JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;

  const customer = {
    _id: _id,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };

  try {
    const result = await CustomerDAO.update(customer);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= CHECKOUT ================= */

router.post("/checkout", JwtUtil.checkToken, async (req, res) => {
  const now = new Date().getTime();

  const order = {
    cdate: now,
    total: req.body.total,
    status: "PENDING",
    customer: req.body.customer,
    items: req.body.items
  };

  try {
    const result = await OrderDAO.insert(order);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= MY ORDERS ================= */

router.get("/orders/customer/:cid", JwtUtil.checkToken, async (req, res) => {
  const _cid = req.params.cid;

  try {
    const orders = await OrderDAO.selectByCustID(_cid);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
