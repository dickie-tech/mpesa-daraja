const express = require('express');

const router = express.Router();
const { stkPush } = require('../controllers/paymentController');

router.post('/stkpush', stkPush);

// Callback URL - Safaricom will post here
router.post('/callback', (req, res) => {
  console.log('Payment Callback:', req.body);
  // Save result to DB, update user status, etc.
  res.status(200).json({ message: 'Callback received' });
});

module.exports = router;