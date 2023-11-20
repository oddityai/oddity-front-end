import React, { useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Image from 'next/image'
import AppBar from './AppBar'
import GoogleIcon from '@mui/icons-material/Google'

const Signup = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await user.updateProfile({
        displayName: name,
      })
      // User signed up successfully
      console.log('User signed up')
      router.push('/App')
      // Redirect to protected page
    } catch (error) {
      // Handle errors
      console.error(error)
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
    }
  }

  return (
    <div>
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

          <h1>Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              style={{ marginBottom: 15 }}
            />

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
              Sign Up
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
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
