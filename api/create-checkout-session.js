// checkout.js - Updated checkout endpoint
import Stripe from 'stripe';
const stripekey = process.env.VITE_STRIPE_SECRET_KEY;
const stripe = new Stripe(stripekey);

const baseUrl = 'https://wingai2.vercel.app';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { priceType, email, password } = req.body;
      const PRICE_IDS = {
        monthly: 'price_1QjRbREsJN2nQEizPEDnJZKM',
        yearly: 'price_1PuuqdEsJN2nQEiz85KLIKPa',
      };

      const priceId = priceType === 'monthly' ? PRICE_IDS.monthly : PRICE_IDS.yearly;

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, // Redirect to the home page or a generic page
        cancel_url: `${req.headers.origin}/cancel`,
        metadata: {
          email: email,
          password: password,
          //isNewUser: 'true', // Use this metadata to distinguish new users
        },
      });


      
      // Return the session ID to the client
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
