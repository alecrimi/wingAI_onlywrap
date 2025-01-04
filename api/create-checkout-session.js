const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log('Received request body:', req.body); // Debug log
      const { priceType } = req.body;
      
      // Define different price IDs for monthly and yearly plans
      const PRICE_IDS = {
        monthly: 'price_1Puuq5EsJN2nQEizSu0o6biJ',  // Your monthly price ID
        yearly: 'price_1PuuqdEsJN2nQEiz85KLIKPa'          // Replace with your yearly price ID
      };

      // Select price ID based on the plan
      const priceId = priceType === 'monthly' ? PRICE_IDS.monthly : PRICE_IDS.yearly;
      
      console.log('Selected price ID:', priceId); // Debug log

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',  // or 'subscription' if it's a recurring charge
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
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