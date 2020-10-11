/* eslint-disable no-undef */
import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "openid profile",
  redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/api/callback`,
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_DOMAIN,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 10000,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000
  }
});
