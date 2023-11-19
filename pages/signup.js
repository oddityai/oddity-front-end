import React, { useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'

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

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
