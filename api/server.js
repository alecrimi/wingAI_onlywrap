const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Include CORS if needed
const Stripe = require('stripe');
require('dotenv').config({ path: '../.env' });   // To use environment variables from .env file


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors()); // Enable CORS if making requests from another origin

// Route to handle the checkout session creation
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1Puuq5EsJN2nQEizSu0o6biJ',  // Replace with your price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',  // If you want to charge for a one-time payment. Use 'subscription' for recurring payments.
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Proxy route
app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://www.google.com'); // Replace with your URL
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching the external URL');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
// server-side file
const express = require('express');
const app = express();

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  // Assume `req.user` is set after successful authentication
  if (req.user) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// API route that handles the redirect
app.get('/redirect', checkAuth, (req, res) => {
    console.log('Redirect route accessed');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const targetIP = 'http://13.226.184.67'; // replace with your IP
  res.redirect(targetIP);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/