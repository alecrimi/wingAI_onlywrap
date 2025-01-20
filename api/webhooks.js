// Place this in /api/webhooks.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const endpointSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET;

// Vercel-specific configuration to ensure raw body parsing
export const config = {
  api: {
    bodyParser: false, // Disable body parsing for this route
  },
};

// Helper to get raw body from the request
const getRawBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Webhook request received', {
      method: req.method,
      headers: req.headers,
      timestamp: new Date().toISOString(),
    });

    // Retrieve raw body
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];

    console.log('Webhook processing:', {
      hasSignature: !!sig,
      bodyLength: rawBody.length,
      secretPresent: !!endpointSecret,
      timestamp: new Date().toISOString(),
    });

    let event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', {
        error: err.message,
        bodyPreview: rawBody.toString().substring(0, 100),
        signatureHeader: sig,
        timestamp: new Date().toISOString(),
      });
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    console.log('✅ Webhook verified successfully:', {
      eventType: event.type,
      eventId: event.id,
      timestamp: new Date().toISOString(),
    });

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.payment_status === 'paid') {
          console.log('💰 Payment successful:', {
            sessionId: session.id,
            amount: session.amount_total,
            customer: session.customer,
            timestamp: new Date().toISOString(),
          });
          // Add your payment success logic here
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', {
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    });

    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
}
