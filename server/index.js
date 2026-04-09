// CLI: npm install express body-parser cors --save
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// APIs
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.use('/api/admin', require('./api/admin.js'));
// apis
app.use('/api/customer', require('./api/customer.js'));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
