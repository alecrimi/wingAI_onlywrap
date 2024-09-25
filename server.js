// server.js
const express = require('express');
const cors = require('cors'); //const bodyParser = require('body-parser');
const createCheckoutSession = require('./api/create-checkout-session');


const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Update this if you're deploying elsewhere
}));

// Your other middleware and routes here
app.use(express.json());

// API endpoint
app.post('/api/create-checkout-session', createCheckoutSession);

const PORT = process.env.PORT || 5000; // Change port if needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
// server.js
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors()); // Enable CORS for your frontend requests
app.use(express.json()); // Parse JSON bodies

// Route to create a checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { email } = req.body; // Get the user's email from the request body

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email, // Attach the user's email to the checkout session
      line_items: [
        {
          price: 'price_1Puuq5EsJN2nQEizSu0o6biJ', // Replace this with your actual price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'subscription', // Set 'payment' for one-time charges or 'subscription' for recurring payments
      success_url: `${process.env.REACT_APP_CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REACT_APP_CLIENT_URL}/`, // Redirect to initial page if payment is canceled
    });

    // Return the session ID to the client
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/