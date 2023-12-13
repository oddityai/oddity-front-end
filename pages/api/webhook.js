// /pages/api/webhook.js
import { buffer } from "micro";
import { db } from "../../firebase";

const stripe = require("stripe")("whsec_iqVWJTnrpwk0meQfW78nvwlNU17J88t8");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "whsec_iqVWJTnrpwk0meQfW78nvwlNU17J88t8";

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
      return res.status(200).json({
        received: true,
        subscriptionId: subscriptionId,
        session: session,
      });
    } else {
      // Assuming you are within an async function
      const usersRef = db.collection("profiles");
      const userRef = usersRef.doc(userId);

      try {
        // Retrieve the current document
        const doc = await userRef.get();
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          // Get the current credits value and add 20
          const currentCredits = doc.data().credits || 0; // Fallback to 0 if undefined
          const newCredits = +currentCredits + 50;

          // Update the subscribed status and credits
          await userRef.set(
            {
              credits: newCredits, // Update the credits
            },
            { merge: true }
          );

          // Send response
          return res.status(200).json({
            updatedCredits: newCredits,
          });
        }
      } catch (error) {
        console.log("Error updating user:", error);
      }
    }
  }

  return res.status(200).json({ received: true });
}

export default handler;
