import { useEffect, useState } from 'react'
import { Nunito } from '@next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'firebase/auth'

import { auth } from '../firebase'

const nunito = Nunito({ subsets: ['latin'] })

export default function ButtonAppBar({ profileData, value, setValue }) {
  const getWindowSize = () => {
    if (typeof window !== 'undefined') {
      // Client-side-only code
      const { innerWidth, innerHeight } = window
      return { innerWidth, innerHeight }
    }
  }
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut(auth)
      // User logged out successfully
      console.log('User logged out')
      // Redirect to login page
    } catch (error) {
      // Handle errors
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        setIsLoading(false)
        setError(null)
      } else {
        setUser(null)
        setIsLoading(false)
        setError('User is not logged in')
      }
    })

    return () => unsubscribe()
  }, [])
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
  const [pathState, setPath] = useState('')
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const path = () => {
    if (window) {
      return window.location.pathname
    } else {
      return ''
    }
  }

  useEffect(() => {
    setPath(path())
  }, [path])
  return (
    <div
      className={nunito.className}
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid rgb(242, 247, 255)',
        width: '100%',
      }}
    >
      {true && (
        <div
          style={{
            padding: 8,
            justifyContent: 'space-between',
            display: 'flex',
            justifyItems: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            className={nunito.className}
            style={{
              textDecoration: 'none',
              padding: 8,
              cursor: 'pointer',
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
              borderRadius: 4,
              color: '#0057be',
            }}
            href='/'
          >
            <Image alt='oddity-logo' height={30} width={30} src='/logo.png' />
            <div
              className={nunito.className}
              style={{ fontSize: 18, color: '#0057be', marginLeft: 8 }}
            >
              {' '}
              OddityAI
            </div>
          </Link>
          <div>
            <div
              style={{
                padding: 16,
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* <div style={{ marginRight: 8, textDecoration: 'none' }}>
              <Link className={nunito.className}  style={{ textDecoration: 'none', padding: 8,
              borderRadius: 4, color: 'black' }} href="/">
                {" "}
                <div
                  style={{
                    textDecoration: "none",
                    textTransform: 'none',
                    color: "#0057be",
  16                 padding: 8,
  borderRadius: 4, fontSize: 18,
                  }}
                >
                  Home
                </div>
              </Link>
            </div> */}
              {profileData &&
                profileData?.credits >= 0 &&
                !profileData.subscribed && (
                  <div
                    style={{ textDecoration: 'none', marginRight: 8 }}
                    onClick={() => setValue(1)}
                  >
                    <p
                      style={{
                        margin: 0,
                        width: '90px',
                        color: '#0057be',
                        borderRadius: '5px',
                        border: 'solid 1px #0057be',
                        textAlign: 'center',
                        backgroundColor: '#f2f2f2',
                        boxShadow: '2px 2px 5px gray',
                        cursor: 'pointer',
                      }}
                    >
                      Credits: {profileData?.credits}{' '}
                    </p>
                  </div>
                )}

              <div style={{ marginRight: 8, textDecoration: 'none' }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: 'none',
                    padding: 8,
                    borderRadius: 4,
                    // backgroundColor: pathState === "/home" ? "#f2f2f2" : "",

                    color: '#0057be',
                  }}
                  href='/'
                >
                  {' '}
                  Home
                </Link>
              </div>
              {user && (
                <div style={{ marginRight: 8, textDecoration: 'none' }}>
                  <Link
                    className={nunito.className}
                    style={{
                      textDecoration: 'none',
                      padding: 8,
                      borderRadius: 4,
                      // backgroundColor: pathState === "/app" ? "#f2f2f2" : "",

                      color: '#0057be',
                    }}
                    href='/App'
                  >
                    {' '}
                    App
                  </Link>
                </div>
              )}
              {/* <div style={{ marginRight: 8, textDecoration: 'none' }}>
              <Link className={nunito.className}  style={{ textDecoration: 'none', padding: 8,
              borderRadius: 4, color: 'black' }} href="/about">
                {" "}
                <div
                  style={{
                    textDecoration: "none",
                    textTransform: 'none',
                    color: "#0057be",
  16                 padding: 8,
  borderRadius: 4, fontSize: 18,
                  }}
                >
                  About
                </div>
              </Link>
            </div> */}
              <div style={{ marginRight: 8, textDecoration: 'none' }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: 'none',
                    padding: 8,
                    borderRadius: 4,
                    // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                    color: '#0057be',
                  }}
                  href='/contact'
                >
                  {' '}
                  Contact
                </Link>
              </div>
              {!user && (
                <>
                  <div style={{ marginRight: 8, textDecoration: 'none' }}>
                    <Link
                      className={nunito.className}
                      style={{
                        textDecoration: 'none',
                        padding: 8,
                        borderRadius: 4,
                        // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                        color: '#0057be',
                      }}
                      href='/login'
                    >
                      {' '}
                      Login
                    </Link>
                  </div>
                  <div style={{ marginRight: 8, textDecoration: 'none' }}>
                    <Link
                      className={nunito.className}
                      style={{
                        textDecoration: 'none',
                        padding: 8,
                        borderRadius: 4,
                        // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                        color: '#0057be',
                      }}
                      href='/signup'
                    >
                      {' '}
                      Signup
                    </Link>
                  </div>
                </>
              )}
              {user && (
                <div
                  style={{
                    marginRight: 8,
                    textDecoration: 'none',
                  }}
                >
                  <p
                    className={nunito.className}
                    style={{
                      textDecoration: 'none',
                      padding: 8,
                      borderRadius: 4,
                      // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                      color: '#0057be',
                    }}
                    onClick={handleLogout}
                  >
                    {' '}
                    Logout
                  </p>
                </div>
              )}
              {/* <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link className={nunito.className} 
                style={{
                  textDecoration: "none",
                  padding: 8,
                  borderRadius: 4,
                  color: "#0057be",
                }}
                href="/contact"
              >
                {" "}
                Login
              </Link>
            </div> */}
              {/* <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link className={nunito.className} 
                style={{
                  textDecoration: "none",
                  padding: 8,
                  borderRadius: 4,
                  color: "#0057be",
                }}
                href="/contact"
              >
                {" "}
                Signup
              </Link>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
