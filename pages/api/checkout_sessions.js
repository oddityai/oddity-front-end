const stripe = require('stripe')(
  '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'
)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1NflLTDeCpRNgE7ANTE5r47F',
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          user_id: `123`,
        },
        success_url: `${req.headers.origin}/App?success=true`,
        cancel_url: `${req.headers.origin}/App?canceled=true`,
        automatic_tax: { enabled: true },
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
