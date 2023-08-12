import requestIp from 'request-ip'

export default function handler(req, res) {
  // Use request-ip middleware to get the client's IP address
  const clientIp = requestIp.getClientIp(req)

  res.status(200).json({ ip: clientIp })
}
