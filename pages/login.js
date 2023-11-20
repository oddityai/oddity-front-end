import React, { useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Image from 'next/image'
import AppBar from './AppBar'
import GoogleIcon from '@mui/icons-material/Google'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regError, setRegError] = useState('')
  const [googleError, setGoogleError] = useState('')

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
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed in successfully:', user)
      router.push('/App')
      // Update UI based on the signed-in user
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setGoogleError(error)
    }
  }
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
          <Image src='/logo.png' height={50} width={50} />
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
        </div>
      </div>
    </div>
  )
}

export default Login
