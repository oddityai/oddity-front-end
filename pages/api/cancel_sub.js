const stripe = require("stripe")(
  "sk_test_51MLI86DeCpRNgE7AVsEbYP6fqgUZtDe8QBeGZuGYsEmuKaiUoG519yjOZvrkUH0z6yBuoYrFneeqBf5ln988VQIZ00Dv5R8bI0"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const sub_id = req.query.sub_id; // Get this from the client or your database
      
      const canceledSubscription = await stripe.subscriptions.del(sub_id);
      
      res.status(200).json({ success: true, subscription: canceledSubscription });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}





