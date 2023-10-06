// /pages/api/webhook.js
import { buffer } from "micro";
import { db } from "../../firebase";


const stripe = require("stripe")("whsec_DZuHPHxwsCr85H4gFNbfpW7W9uapyGMN");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "whsec_DZuHPHxwsCr85H4gFNbfpW7W9uapyGMN";

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
    const todaysDate = Math.floor(Date.now() / 1000);
    console.log({todaysDate})

    if (subscriptionId) {
        const usersRef = db.collection("profiles");
        const userRef = usersRef.doc(userId);

        try {
await userRef.set(
  {
    subscribed: true,
    subscriptionId: subscriptionId,
    dateOfSub: todaysDate,
  },
  { merge: true }
);


        } catch (error) {
        console.log("Error updating user:", error);
        }
    }

    return res
      .status(200)
      .json({
        received: true,
        subscriptionId: subscriptionId,
        session: session,
      });
  }

  return res.status(200).json({ received: true });
}

export default handler;