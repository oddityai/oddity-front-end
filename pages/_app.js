// pages/_app.js
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "regenerator-runtime/runtime";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
