const Razorpay = require("razorpay");
require("dotenv").config();

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const paymentIntegration = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

module.exports = paymentIntegration;