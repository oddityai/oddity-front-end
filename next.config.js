module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_LOGROCKET_API_KEY: process.env.REACT_APP_LOGROCKET_API_KEY,
    REACT_APP_GOOGLE_ANALYTICS_API_KEY:
      process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
