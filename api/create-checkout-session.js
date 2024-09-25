// api/create-checkout-session.js
require('dotenv').config(); // Load environment variables

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
 

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'monthly8usd', // 1 month price
            quantity: 1,
          },
        ],
        mode:  'subscription',  
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}`,

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
 