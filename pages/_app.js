// pages/_app.js
import React from 'react'
import 'regenerator-runtime/runtime'
import "./index.css"

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
