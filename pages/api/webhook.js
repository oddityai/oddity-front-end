// /pages/api/webhook.js
import { buffer } from "micro";
const stripe = require("stripe")("whsec_DZuHPHxwsCr85H4gFNbfpW7W9uapyGMN");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

const endpointSecret =
  "whsec_7f14bfc5f7a62f64661e77b3ac5e1a8daac17f4d7b5e1f720fd93ad0d1239750";

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

if (event.type === "checkout.session.completed") {
  const session = event.data.object;
  const subscriptionId = session.subscription;
  const userId = session.metadata.user_id;

  const usersRef = db.collection("profiles");
  const userRef = usersRef.doc(userId);

  try {
    await userRef.update({
      subscribed: true,
      subscriptionId: subscriptionId,
    });

    console.log(`User subscribed. subscriptionId: ${subscriptionId}`);
  } catch (error) {
    console.log("Error updating user:", error);
  }

  return res
    .status(200)
    .json({ received: true, subscriptionId: subscriptionId, session: session });
}


  return res.status(200).json({ received: true, session: session });
}

export default handler;
