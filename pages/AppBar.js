import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { useUser } from "@auth0/nextjs-auth0/client";

const nunito = Nunito({ subsets: ["latin"] });

export default function ButtonAppBar() {
  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
  };
  const { user, error, isLoading } = useUser();

  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [pathState, setPath] = useState("");
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const path = () => {
    if (window) {
      return window.location.pathname;
    } else {
      return "";
    }
  };

  useEffect(() => {
    setPath(path());
  }, [path]);
  return (
    <div
      className={nunito.className}
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid rgb(242, 247, 255)",
        width: "100%",
      }}
    >
      {true && (
        <div
          style={{
            padding: 8,
            justifyContent: "space-between",
            display: "flex",
            justifyItems: "center",
            alignContent: "center",
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
              justifyItems: "center",
              alignItems: "center",
              borderRadius: 4,
              color: "#0057be",
            }}
            href="/"
          >
            <img
              style={{ height: 30, marginRight: 8, textDecoration: "none" }}
              src="/logo.png"
            />
            <div
              className={nunito.className}
              style={{ fontSize: 18, color: "#0057be" }}
            >
              {" "}
              OddityAI
            </div>
          </Link>
          <div>
            <div
              style={{
                padding: 16,
                display: "flex",
                justifyItems: "center",
                justifyContent: "space-between",
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
              <div style={{ marginRight: 8, textDecoration: "none" }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: "none",
                    padding: 8,
                    borderRadius: 4,
                    // backgroundColor: pathState === "/home" ? "#f2f2f2" : "",

                    color: "#0057be",
                  }}
                  href="/"
                >
                  {" "}
                  Home
                </Link>
              </div>
              {user?.nickname && (
                <div style={{ marginRight: 8, textDecoration: "none" }}>
                  <Link
                    className={nunito.className}
                    style={{
                      textDecoration: "none",
                      padding: 8,
                      borderRadius: 4,
                      // backgroundColor: pathState === "/app" ? "#f2f2f2" : "",

                      color: "#0057be",
                    }}
                    href="/App"
                  >
                    {" "}
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
              <div style={{ marginRight: 8, textDecoration: "none" }}>
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: "none",
                    padding: 8,
                    borderRadius: 4,
                    // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                    color: "#0057be",
                  }}
                  href="/contact"
                >
                  {" "}
                  Contact
                </Link>
              </div>
              {!user?.nickname && (
                <>
                  <div style={{ marginRight: 8, textDecoration: "none" }}>
                    <Link
                      className={nunito.className}
                      style={{
                        textDecoration: "none",
                        padding: 8,
                        borderRadius: 4,
                        // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                        color: "#0057be",
                      }}
                      href="/api/auth/login"
                    >
                      {" "}
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
                        // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                        color: "#0057be",
                      }}
                      href="/api/auth/signup"
                    >
                      {" "}
                      Signup
                    </Link>
                  </div>
                </>
              )}
              {user?.nickname && (
                <div style={{ marginRight: 8, textDecoration: "none" }}>
                  <Link
                    className={nunito.className}
                    style={{
                      textDecoration: "none",
                      padding: 8,
                      borderRadius: 4,
                      // backgroundColor: pathState === "/contact" ? "#f2f2f2" : "",

                      color: "#0057be",
                    }}
                    href="/api/auth/logout"
                  >
                    {" "}
                    Logout
                  </Link>
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
  );
}
