// api/create-checkout-session.js

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1Puuq5EsJN2nQEizSu0o6biJ', // Replace with your price ID
            quantity: 1,
          },
        ],
        mode: 'payment',  // or 'subscription' if it's a recurring charge
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,

       // mode: 'subscription',
       // success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
       // cancel_url: `${process.env.APP_URL}/cancel`,
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};


/*
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price:  'price_1Puuq5EsJN2nQEizSu0o6biJ', // Replace with your price ID
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.APP_URL}/cancel`,
      });

      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
*/