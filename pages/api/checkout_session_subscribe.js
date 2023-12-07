import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";

const stripe = require("stripe")(
  "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"
);

export default async function handler(req, res) {
  ReactGA.initialize("G-EYH3FLZ9FN");
  const userId = req.query.user_id;
  if (req.method === "POST") {
    try {
      ReactGA.event({
        category: "User",
        action: "User subscribed for $9.99",
        undefined,
      });
      amplitude.track("User subscribed ($9.99)", undefined, {
        user_id: userId,
      });

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1Ny9dADeCpRNgE7ADQNEHPBZ",
            quantity: 1,
          },
        ],
        mode: "subscription",
        metadata: {
          user_id: userId,
        },
        success_url: `${req.headers.origin}/App?success=true4`,
        cancel_url: `${req.headers.origin}/App?canceled=true`,
        automatic_tax: { enabled: true },
      });

      res.redirect(303, session.url);
    } catch (err) {
      ReactGA.event({
        category: "User",
        action: "FAILED - user subscription",
      });
      amplitude.track("Subscription failed ($9.99)", undefined, {
        user_id: userId
      });

      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
