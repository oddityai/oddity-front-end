const stripe = require("stripe")(
  "sk_test_51MLI86DeCpRNgE7AVsEbYP6fqgUZtDe8QBeGZuGYsEmuKaiUoG519yjOZvrkUH0z6yBuoYrFneeqBf5ln988VQIZ00Dv5R8bI0"
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1Nu7vjDeCpRNgE7AmTOtrpYK",
            quantity: 1,
          },
        ],
        mode: "subscription",
        metadata: {
          user_id: `123`,
        },
        success_url: `${req.headers.origin}/App?success=true4`,
        cancel_url: `${req.headers.origin}/App?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
