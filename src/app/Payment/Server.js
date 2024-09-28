// const express = require('express');
// const app = express();
// const stripe = require('stripe')('your-secret-key'); // Replace with your Stripe secret key
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// app.post('/create-payment-intent', async (req, res) => {
//     const { amount } = req.body;  // Amount should be passed from the frontend

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount,  // Amount in cents (e.g., $10.00 is 1000)
//             currency: 'zar',
//         });

//         res.send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         return res.status(400).send({
//             error: error.message
//         });
//     }
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// This URL is called by PayFast to verify payment status
app.post('/notify', (req, res) => {
  // Parse PayFast notification data
  const payFastData = req.body;

  // Validate PayFast IPN and handle payment confirmation here
  // This could include updating your database to reflect payment status
  console.log(payFastData);

  res.status(200).send('Payment notification received');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


