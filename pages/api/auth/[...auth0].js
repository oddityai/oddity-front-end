import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  signup: handleLogin({
    authorizationParams: { screen_hint: 'signup' },
    scope:
      'openid profile email last_ip read:users read:current_user read:current_user_metadata',
  }),
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: '/App',
      scope:
        'openid profile email last_ip read:users read:current_user read:current_user_metadata',
    })
  },
  async signup(req, res) {
    await handleLogin(req, res, {
      returnTo: '/App',
      authorizationParams: { screen_hint: 'signup' },
    })
  },
})
