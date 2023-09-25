const stripe = require('stripe')(
  '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'
)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const subscriptionId = req.body.subscriptionId; // This ID comes from Stripe when a subscription is made - we store it in Firebase and it comes from Firebase

    try {
      const canceledSubscription = await stripe.subscriptions.del(
        subscriptionId
      );
      res
        .status(200)
        .json({ success: true, subscription: canceledSubscription });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
