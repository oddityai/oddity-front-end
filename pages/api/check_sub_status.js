const stripe = require('stripe')(
  'sk_test_51MLI86DeCpRNgE7AVsEbYP6fqgUZtDe8QBeGZuGYsEmuKaiUoG519yjOZvrkUH0z6yBuoYrFneeqBf5ln988VQIZ00Dv5R8bI0'
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const sub_id = req.query.sub_id

    try {
      const subscriptionId = sub_id
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      if (
        subscription.status === 'active' ||
        subscription.status === 'trialing'
      ) {
        const nextBillingDate = subscription.current_period_end
        return res.status(200).json({ status: 'subscribed', nextBillingDate })
      } else {
        return res.status(200).json({ status: 'not_subscribed' })
      }
    } catch (err) {
      return res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
