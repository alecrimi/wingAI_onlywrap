// /api/verify-payment.js
import supabase from './supabaseClient.js';
import Stripe from 'stripe';
const stripekey = process.env.VITE_STRIPE_SECRET_KEY;
const stripe = new Stripe(stripekey);
 
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { sessionId , email,password} = req.body;
      // Retrieve the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Check if the payment was successful
      if (session.payment_status === 'paid') {
        
        // Payment successful, now create the user in Supabase
         
        // Create the user in Supabase (make sure to customize user creation logic as needed)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,  // You can create a temporary password or prompt the user later
        });


        if (error) {
          throw new Error('Error creating user in Supabase: ' + error.message);
        }

        // Optionally, update additional user information (e.g., subscription info, metadata)
        await supabase
          .from('users')
          .upsert([{ id: data.user.id, email: email }]);

        // Return a success response with a redirection URL
        res.status(200).json({
          message: 'User registered successfully',
          user: data.user,
          redirectUrl:  `${req.headers.origin}/`  // Or any other route you want to redirect to
        });

      } else {
        throw new Error('Payment not successful');
      }

    } catch (error) {
      console.error('Payment verification failed:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
