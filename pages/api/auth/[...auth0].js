import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  signup: handleLogin({
    authorizationParams: { screen_hint: "signup" },
  }),
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: "/app",
    });
  },
  async signup(req, res) {
    await handleLogin(req, res, {
      returnTo: "/app",
      authorizationParams: { screen_hint: "signup" },
    });
  },
});
