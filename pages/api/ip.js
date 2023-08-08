export default function handler(req, res) {
  // console.log('Headers:', req.headers)

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  // Since x-forwarded-for can contain a comma-separated list of IPs (if passed through multiple proxies),
  // we'll split it and take the first non-empty value.
  const firstIp = ip.split(',')[0].trim()

  res.status(200).json({ ip: firstIp })
}
