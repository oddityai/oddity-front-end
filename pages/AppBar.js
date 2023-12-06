import { useEffect, useState } from "react";
import { Nunito } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";

const nunito = Nunito({ subsets: ["latin"] });

export default function ButtonAppBar({ profileData, value, setValue }) {
  const [windowSize, setWindowSize] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pathState, setPath] = useState("");

  const isMobile = windowSize.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsLoading(false);
        setError(null);
      } else {
        setUser(null);
        setIsLoading(false);
        setError("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={nunito.className}
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid rgb(242, 247, 255)",
        width: "100vw",
      }}
    >
      <div
        style={{
          padding: 8,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <Link
          className={nunito.className}
          style={{
            textDecoration: "none",
            padding: 8,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            color: "#0057be",
          }}
          href="/"
        >
          <Image alt="oddity-logo" height={30} width={30} src="/logo.png" />
          <div
            className={nunito.className}
            style={{ fontSize: 18, color: "#0057be", marginLeft: 8 }}
          >
            OddityAI
          </div>
        </Link>
        <div
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {profileData &&
            profileData?.credits >= 0 &&
            !profileData.subscribed && (
              <div
                style={{ textDecoration: "none", marginRight: 8 }}
                onClick={() => setValue(1)}
              >
                <p
                  style={{
                    margin: 0,
                    width: "90px",
                    color: "#0057be",
                    borderRadius: "5px",
                    border: "solid 1px #0057be",
                    textAlign: "center",
                    backgroundColor: "#f2f2f2",
                    boxShadow: "2px 2px 5px gray",
                    cursor: "pointer",
                  }}
                >
                  Credits: {profileData?.credits}
                </p>
              </div>
            )}
          <div style={{ marginRight: 8, textDecoration: "none" }}>
            <Link
              className={nunito.className}
              style={{
                textDecoration: "none",
                padding: 8,
                borderRadius: 4,
                color: "#0057be",
              }}
              href="/"
            >
              Home
            </Link>
          </div>
          <div style={{ marginRight: 8, textDecoration: "none" }}>
            <Link
              className={nunito.className}
              style={{
                textDecoration: "none",
                padding: 8,
                borderRadius: 4,
                color: "#0057be",
              }}
              href="/faq"
            >
              FAQ
            </Link>
          </div>
          {user && (
            <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                className={nunito.className}
                style={{
                  textDecoration: "none",
                  padding: 8,
                  borderRadius: 4,
                  color: "#0057be",
                }}
                href="/App"
              >
                App
              </Link>
            </div>
          )}
          <div style={{ marginRight: 8, textDecoration: "none" }}>
            <Link
              className={nunito.className}
              style={{
                textDecoration: "none",
                padding: 8,
                borderRadius: 4,
                color: "#0057be",
              }}
              href="/contact"
            >
              Contact
            </Link>
          </div>
          {!user && (
            <>
              <div style={{ marginRight: 8, textDecoration: "none" }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: "none",
                    padding: 8,
                    borderRadius: 4,
                    color: "#0057be",
                  }}
                  href="/login"
                >
                  Login
                </Link>
              </div>
              <div style={{ marginRight: 8, textDecoration: "none" }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: "none",
                    padding: 8,
                    borderRadius: 4,
                    color: "#0057be",
                  }}
                  href="/signup"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
          {user && (
            <div
              style={{
                marginRight: 8,
                textDecoration: "none",
              }}
            >
              <Link
                className={nunito.className}
                style={{
                  textDecoration: "none",
                  padding: 8,
                  borderRadius: 4,
                  color: "#0057be",
                }}
                href="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
