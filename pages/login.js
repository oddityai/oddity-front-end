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

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regError, setRegError] = useState('')
  const [googleError, setGoogleError] = useState('')
  const [hideReset, setHideReset] = useState(true)
  const [passReset, setPassReset] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      // User logged in successfully
      console.log('User logged in')
      router.push('/App')

      // Redirect to protected page
    } catch (error) {
      // Handle errors
      console.error(error)
      setRegError(error)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithRedirect(auth, provider)
      const user = result.user
      console.log('User signed in successfully:', user)
      setUser(user)
      router.push('/App')
      // Update UI based on the signed-in user
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setGoogleError(error)
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
  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com')
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      const idToken = credential.idToken
      console.log('User signed in successfully:', user)
      // Update UI based on the signed-in user
    } catch (error) {
      console.error('Error signing in with Apple:', error)
      console.log('Error code:', error.code)
      console.log('Error message:', error.message)
      console.log('Error email:', error.email)
      console.log('Error credential:', OAuthProvider.credentialFromError(error))
    }
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result)
        if (credential) {
          const accessToken = credential.accessToken
          const idToken = credential.idToken
        }
        const user = result.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error)
      })
  }, [])

  useEffect(() => {
    user && router.push('/App')
  }, [])
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AppBar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 0',
            border: '1px solid gray',
            borderRadius: '.25rem',
            boxShadow: '1px 1px 4px gray',
            fontFamily: 'Arial',
          }}
        >
          <Image src='/logo.png' height={50} width={50} alt='Oddity AI' />
          <h1>Login</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{ marginBottom: 15 }}
            />

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{ marginBottom: 15 }}
            />

            <button
              type='submit'
              style={{ marginBottom: 15, fontSize: '1.2rem' }}
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
              padding: '0.25rem 1rem',
              lineHeight: 1.75,
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            <GoogleIcon color='blue' style={{ marginRight: 10 }} />
            Login with Google
          </button>
          <button onClick={handleAppleSignIn}>Sign in with Apple</button>

          {regError && (
            <p style={{ color: 'red', margin: 25 }}>
              Error logging in. If problems persist, reach out{' '}
              <a
                href='mailto:oddityaico@gmail.com'
                style={{
                  color: '#0a99f2',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                here
              </a>{' '}
              with your account information.
            </p>
          )}
          {googleError && (
            <p style={{ color: 'red' }}>Error logging in with Google.</p>
          )}
          {!passReset ? (
            <>
              {' '}
              <p
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => setHideReset(false)}
              >
                Reset Password
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type='submit'>Reset Password</button>
              </form>
            </>
          ) : (
            <p style={{ color: 'red', margin: 25 }}>
              Password reset email sent successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
