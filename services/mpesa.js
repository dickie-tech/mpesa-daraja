// services/mpesa.js
const axios = require('axios');
require('dotenv').config();

// Check if environment variables are loaded properly
if (!process.env.DARAJA_CONSUMER_KEY || !process.env.DARAJA_CONSUMER_SECRET) {
  console.error('DARAJA_CONSUMER_KEY and DARAJA_CONSUMER_SECRET must be set in the .env file');
  process.exit(1); // Stop the process if keys are missing
}

const getAccessToken = async () => {
  try {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(
      `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
    ).toString('base64');

    const res = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    return res.data.access_token;
  } catch (err) {
    console.error('Error in getting access token:', err.message);
    throw new Error('Failed to get access token');
  }
};

console.log('DARAJA_CONSUMER_KEY:', process.env.DARAJA_CONSUMER_KEY);
console.log('DARAJA_CONSUMER_SECRET:', process.env.DARAJA_CONSUMER_SECRET);


// Make sure you're exporting the function like this:
module.exports = { getAccessToken };
