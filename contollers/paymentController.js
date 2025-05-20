const axios = require('axios');
const moment = require('moment');
const { getAccessToken } = require('../services/mpesa');
const asyncHandler = require('express-async-handler');

// Wrapping the async function call
const logAccessToken = async () => {
  try {
    const token = await getAccessToken();
    console.log("Access Token:", token); // This will log the actual access token
  } catch (err) {
    console.error("Error fetching token:", err.message);
  }
};

// Call the function to log the token when the file is executed
logAccessToken();

// Now you can define the stkPush function
const stkPush = async (req, res) => {
  const { phone, amount } = req.body;

  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    `${process.env.DARAJA_SHORTCODE}${process.env.DARAJA_PASSKEY}${timestamp}`
  ).toString('base64');

  try {
    const token = await getAccessToken(); // Getting token here
    console.log("Access Token:", token); // Log the token

    const data = {
      BusinessShortCode: process.env.DARAJA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.DARAJA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: 'AgriDigi',
      TransactionDesc: 'Platform payment',
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json({ message: 'STK Push initiated', response: response.data });
  } catch (err) {
    console.error('Error in STK Push:', err);
    res.status(500).json({ error: err.response?.data || err.message });
  }
};

module.exports = { stkPush };
