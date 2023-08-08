// pages/api/ip.js
export default function handler(req, res) {
  console.log('Headers:', req.headers)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  res.status(200).json({ ip })
}
