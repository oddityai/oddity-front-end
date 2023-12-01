import { Nunito } from '@next/font/google'
import { useEffect, useState } from 'react'
import AppBar from './AppBar'

import Hotjar from '@hotjar/browser'
import ReactGA from 'react-ga4'

const nunito = Nunito({ subsets: ['latin'] })
const Contact = () => {
  const getWindowSize = () => {
    if (typeof window !== 'undefined') {
      // Client-side-only code
      const { innerWidth, innerHeight } = window
      return { innerWidth, innerHeight }
    }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (window.location.href.includes('oddityai')) {
      Hotjar.init(3307089, 6)
      if (!window.location.href.includes('local')) {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
      }
      window.sessionStorage.setItem('hotjar', 'true')
      // the below i to identify users when i add auth0
      // LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
      //   name: "James Morrison",
      //   email: "jamesmorrison@example.com",
      //   // Add your own custom user variables here, ie:
      //   subscriptionType: "pro",
      // });
    }
  }, [])

  return (
    <div className={nunito.className}>
      <AppBar />

      <div>
        <div
          style={{
            padding: 16,
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? '50%' : '90%',
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600 }}>
              Thank you for visiting OddityAI!
            </span>
            <br />
            <br />
            We hope that our advanced artificial intelligence has been able to
            assist you with all of your homework needs.
            <br />
            <br />
            If you have any questions, concerns or feedback, we would love to
            hear from you. You can reach us through our 𝕏 page{' '}
            <br />
            <br />
            We are an Amazon Affiliate and may from time to time recommend products from Amazon.
            <span
              style={{ color: '#0a99f2', cursor: 'pointer' }}
              onClick={() => {
                window.open('https://twitter.com/oddity_ai')
              }}
            >
              here
            </span>{' '}
            , or by emailing us{' '}
            <a
              href='mailto:support@oddityai.com'
              style={{
                color: '#0a99f2',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              here
            </a>{' '}
            (support@oddityai.com)
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: windowSize > 500 ? '50%' : '90%',
              maxWidth: 400,
            }}
          >
            <img
              src='/contact.png'
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact
