// import { buffer } from 'micro';
// import Stripe from 'stripe';
// import { createClient } from '@supabase/supabase-js';

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-10-16',
// });

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).send('Method Not Allowed');
//   }

//   const sig = req.headers['stripe-signature'];
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     const buf = await buffer(req);
//     event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
//   } catch (err) {
//     console.error('Stripe Webhook Error:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   const session = event.data.object;

//   if (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.updated') {
//     const customerId = session.customer;

//     const customer = await stripe.customers.retrieve(customerId);
//     const email = customer.email;

//     if (!email) {
//       return res.status(400).send('No customer email found.');
//     }

//     const { error } = await supabase
//       .from('users')
//       .update({ is_premium: true })
//       .eq('email', email); //make sure this is ok

//     if (error) {
//       console.error('Supabase update error:', error);
//       return res.status(500).send('Supabase update failed');
//     }

//     return res.status(200).json({ received: true });
//   }

//   if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
//     const subscription = event.data.object;
//     const customerId = subscription.customer;

//     const customer = await stripe.customers.retrieve(customerId);
//     const email = customer.email;

//     const { error } = await supabase
//       .from('users')
//       .update({ is_premium: false })
//       .eq('email', email); //make sure this is correct

//     if (error) {
//       console.error('Failed to downgrade user:', error);
//       return res.status(500).send('Downgrade error');
//     }

//     return res.status(200).json({ received: true });
//   }

//   return res.status(200).json({ received: true });
// }
