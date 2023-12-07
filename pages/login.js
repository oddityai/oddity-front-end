import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'
import {
  OAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import AppBar from './AppBar'
import GoogleIcon from '@mui/icons-material/Google'
import AppleIcon from '@mui/icons-material/Apple'
import { Nunito } from '@next/font/google'
import ReactGA from 'react-ga4'
import * as amplitude from "@amplitude/analytics-browser";

const nunito = Nunito({ subsets: ['latin'] })
const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regError, setRegError] = useState(false)
  const [googleError, setGoogleError] = useState('')
  const [hideReset, setHideReset] = useState(true)
  const [passReset, setPassReset] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      // User logged in successfully
      ReactGA.event({
        category: 'User',
        action: 'Logged in email',
      })
            amplitude.track("User logged in");

      router.push('/App')

      // Redirect to protected page
    } catch (error) {
      // Handle errors
      console.log({ error })
      console.error(error)
      ReactGA.event({
        category: 'User',
        action: 'Log in fail',
      })
      amplitude.track("User logged in");

      setRegError(true)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent')
      setPassReset(true)
    } catch (error) {
      console.error('Error sending password reset email:', error)
    }
  }
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      if (user) {
        setIsLoading(true)
        ReactGA.event({
          category: 'User',
          action: 'Logged in google',
        })
        amplitude.track("User logged in");
        router.push('/App')
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      ReactGA.event({
        category: 'User',
        action: 'Login fail email',
      })
      setGoogleError(error)
    }
  }

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com')
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result?.user
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      const idToken = credential.idToken
      if (user) {
        ReactGA.event({
          category: 'User',
          action: 'Logged in apple',
        })
        amplitude.track("User logged in");
        router.push('/App')
      }
      // Update UI based on the signed-in user
    } catch (error) {
      ReactGA.event({
        category: 'User',
        action: 'Login fail apple',
      })
    }
  }

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result.credential) {
          // This means it's a Google sign-in
          const user = result.user
          router.push('/App')
        }
      } catch (error) {
        setGoogleError(error)
      }
    }

    handleRedirectResult()
  }, [])

  return (
    <div
      className={nunito.className}
      style={{ width: '100vw', height: '100vh' }}
    >
      <AppBar />
      {!isLoading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 20,
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f2f2f2',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '350px',
              padding: '15px',
              border: '1px solid gray',
              borderRadius: '.25rem',
              boxShadow: '1px 1px 4px gray',
              backgroundColor: 'white',
            }}
          >
            <Image src='/logo.png' height={50} width={50} alt='Logo' />
            <h1>Login</h1>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label htmlFor='email' style={{ marginBottom: '5px' }}>
                Email:
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />

              <label htmlFor='password' style={{ marginBottom: '5px' }}>
                Password:
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />

              <button
                type='submit'
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  marginTop: '15px',
                }}
              >
                Login
              </button>
            </form>

            <button
              onClick={handleGoogleSignIn}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4285f4',
                color: 'white',
                padding: '10px',
                lineHeight: '1.5',
                border: 'none',
                borderRadius: '4px',
                height: 35,
                marginTop: '15px',
                cursor: 'pointer',
              }}
            >
              <GoogleIcon style={{ marginRight: '10px' }} />
              Login with Google
            </button>

            <button
              onClick={handleAppleSignIn}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: 'black',
                borderRadius: '4px',
                border: 'none',
                height: 35,
                marginTop: '15px',
                cursor: 'pointer',
              }}
            >
              <AppleIcon style={{ marginRight: '10px' }} />
              Login with Apple
            </button>

            {regError && (
              <p style={{ color: 'red', margin: '25px' }}>
                Wrong email or password.
              </p>
            )}

            {!passReset ? (
              <div>
                <p
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => setHideReset(false)}
                >
                  Forgot Password?
                </p>
                <form
                  onSubmit={handleResetPassword}
                  style={{
                    display: hideReset ? 'none' : 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label>Email Address:</label>
                  <input
                    type='email'
                    style={{
                      marginBottom: '15px',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    style={{
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                    type='submit'
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            ) : (
              <p style={{ color: 'red', margin: '25px' }}>
                Password reset email sent successfully!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
