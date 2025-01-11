import Stripe from 'stripe';  // Use `import` instead of `require`
const stripekey =  process.env.VITE_STRIPE_SECRET_KEY;
const stripe = Stripe(stripekey);  // Use `new Stripe()` for initialization

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      console.log('Received request body:', req.body); // Debug log
      const { priceType , email} = req.body;
      
      // Define different price IDs for monthly and yearly plans
      const PRICE_IDS = {
        monthly: 'price_1Puuq5EsJN2nQEizSu0o6biJ',  // Your monthly price ID
        yearly: 'price_1PuuqdEsJN2nQEiz85KLIKPa'          // yearly price ID
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
        
        mode: 'subscription',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        customer_email: email, // Pre-fill customer email
        metadata: {
          email: email // Store email in metadata for reference
        }
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