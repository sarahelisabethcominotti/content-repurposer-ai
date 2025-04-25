// import { getServerSession } from "next-auth";
// import { authOptions } from "./auth/[...nextauth]";
// import Stripe from "stripe";
// import { supabase } from "@/utils/supabaseClient";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).json({ error: "Unauthorized" });

//   const { email } = session.user;

//   // Get or create user in Supabase
//   let { data: user, error } = await supabase.from("users").select("*").eq("email", email).single();
//   if (!user) {
//     const stripeCustomer = await stripe.customers.create({ email });
//     const { data: newUser } = await supabase
//       .from("users")
//       .insert({ email, stripe_customer_id: stripeCustomer.id })
//       .select("*")
//       .single();
//     user = newUser;
//   }

//   const checkoutSession = await stripe.checkout.sessions.create({
//     customer: user.stripe_customer_id,
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "gbp",
//           product_data: { name: "Premium Plan" },
//           unit_amount: 500, // $10.00
//           recurring: { interval: "month" },
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "subscription",
//     success_url: `${req.headers.origin}/success`,
//     cancel_url: `${req.headers.origin}/cancel`,
//   });

//   res.json({ url: checkoutSession.url });
// }