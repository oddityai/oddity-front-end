import React, { useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'
import {
  OAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import AppBar from './AppBar'
import GoogleIcon from '@mui/icons-material/Google'
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });


const Signup = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [showAccountExistsError, setShowAccountExistsError] = useState(false);

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
      ReactGA.event({
        category: "User",
        action: "Signed up",
      });  
      router.push('/App')
      // Redirect to protected page
    } catch (error) {
      // Handle errors
      if (
        error.message ===
        "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
      ) {
        setShowAccountExistsError(true);
      }
      console.log({error})
      console.error(error)
    }
  }
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log('User signed in successfully:', user)
      if (user) {
        ReactGA.event({
          category: "User",
          action: "Signed up",
        }); 
        router.push('/App')
      }
      // Update UI based on the signed-in user
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }
  const handleAppleSignup = async () => {
    const provider = new OAuthProvider('apple.com')
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      const idToken = credential.idToken
    ReactGA.event({
      category: "User",
      action: "Signed up",
    }); 
     router.push("/App");

      // Update UI based on the signed-in user
    } catch (error) {
      console.error('Error signing in with Apple:', error)
      console.log('Error code:', error.code)
      console.log('Error message:', error.message)
      console.log('Error email:', error.email)
      console.log('Error credential:', OAuthProvider.credentialFromError(error))
    }
  }

  return (
    <div className={nunito.className}>
      <AppBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 20,
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
            padding: "15px",
            border: "1px solid gray",
            borderRadius: ".25rem",
            boxShadow: "1px 1px 4px gray",
            backgroundColor: "white",
          }}
        >
          <Image src="/logo.png" height={50} width={50} alt="Logo" />

          <h1>Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="email" style={{ marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label htmlFor="password" style={{ marginBottom: "5px" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                style={{ marginRight: "8px" }}
              />
              <span>
                By signing up, you agree to our{" "}
                <a
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open("/terms")}
                >
                  Terms of Service
                </a>
              </span>
            </div>
            {showAccountExistsError &&
            <p style={{ color: "red" }}>
              This email already exists. Try logging in or resetting your password.
            </p>
            }

            <button
              type="submit"
              disabled={!isChecked}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Sign Up
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4285f4",
              color: "white",
              padding: "10px",
              lineHeight: "1.5",
              border: "none",
              borderRadius: "4px",
              height: 35,
              marginBottom: "15px",
              cursor: "pointer",
            }}
          >
            <GoogleIcon style={{ marginRight: "10px" }} />
            Sign up with Google
          </button>

          <button
            onClick={handleAppleSignup}
            style={{
              color: "white",
              backgroundColor: "black",
              padding: "10px",
              borderRadius: "4px",
              height: 35,
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup
