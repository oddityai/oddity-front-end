import { db } from "../../firebase";

const stripe = require("stripe")(
  "sk_test_51MLI86DeCpRNgE7AVsEbYP6fqgUZtDe8QBeGZuGYsEmuKaiUoG519yjOZvrkUH0z6yBuoYrFneeqBf5ln988VQIZ00Dv5R8bI0"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const sub_id = req.query.sub_id; // Get this from the client or your database
      const userId = req.query.userId; // Get this from the client or your database
      const canceledSubscription = await stripe.subscriptions.del(sub_id);

      res.redirect(303, "https://oddityai.com/App");
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
          res.redirect(303, "https://oddityai.com/App");

  } else {
    res.status(405).end("Method Not Allowed");
  }
}
