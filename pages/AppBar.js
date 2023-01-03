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

const nunito = Nunito({ subsets: ["latin"] });

export default function ButtonAppBar() {
  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
  };
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
  return (
    <div
      className={nunito.className}
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid silver",
        width: "100%",
      }}
    >
      <div
        style={{
          margin: 8,
          justifyContent: "space-between",
          display: "flex",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: 30, marginRight: 8, textDecoration: "none" }}
            src="/logo.png"
          />
          <div style={{ fontSize: 18 }}> OddityAI.com</div>
        </div>
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
              <Link style={{ textDecoration: 'none', marginLeft: 8, color: 'black' }} href="/home">
                {" "}
                <div
                  style={{
                    textDecoration: "none",
                    textTransform: 'none',
                    color: "black",
  16                 marginLeft: 8, fontSize: 18,
                  }}
                >
                  Home
                </div>
              </Link>
            </div> */}
            <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "black",
                }}
                href="/home"
              >
                {" "}
                Home
              </Link>
            </div>
            <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "black",
                }}
                href="/"
              >
                {" "}
                App
              </Link>
            </div>
            {/* <div style={{ marginRight: 8, textDecoration: 'none' }}>
              <Link style={{ textDecoration: 'none', marginLeft: 8, color: 'black' }} href="/about">
                {" "}
                <div
                  style={{
                    textDecoration: "none",
                    textTransform: 'none',
                    color: "black",
  16                 marginLeft: 8, fontSize: 18,
                  }}
                >
                  About
                </div>
              </Link>
            </div> */}
            <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "black",
                }}
                href="/contact"
              >
                {" "}
                Contact
              </Link>
            </div>
            {/* <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "black",
                }}
                href="/contact"
              >
                {" "}
                Login
              </Link>
            </div> */}
            {/* <div style={{ marginRight: 8, textDecoration: "none" }}>
              <Link
                style={{
                  textDecoration: "none",
                  marginLeft: 8,
                  color: "black",
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
    </div>
  );
}
