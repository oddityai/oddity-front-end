import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import { Nunito } from "@next/font/google";
import Button from "@mui/material/Button";
import Link from "next/link";

import LogRocket from "logrocket";
import Hotjar from "@hotjar/browser";
import ReactGA from "react-ga4";
import { useUser } from "@auth0/nextjs-auth0/client";
import { loadStripe } from "@stripe/stripe-js";
import { Html, Head, Main, NextScript } from "next/document";

const nunito = Nunito({ subsets: ["latin"] });
const Contact = () => {
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

  useEffect(() => {
    if (window.location.href.includes("oddityai")) {
      Hotjar.init(3307089, 6);

      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
      window.sessionStorage.setItem("hotjar", "true");
      // the below i to identify users when i add auth0
      // LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
      //   name: "James Morrison",
      //   email: "jamesmorrison@example.com",
      //   // Add your own custom user variables here, ie:
      //   subscriptionType: "pro",
      // });
    }
  }, []);
  useEffect(() => {
    if (user?.nickname) {
      console.log("Identifying", user?.nickname);
      Hotjar.identify(user?.sid, {
        userId: user?.sub,
        username: user?.nickname,
        email: user?.email,
        picture: user?.picture,
      });
    }
  }, [isLoading, user]);

  return (
    <div className={nunito.className}>
      <AppBar />

      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>

      <div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",

            fontSize: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              position: "relative",
              backgroundColor: "white",
              borderRadius: 12,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <img
              alt="ai-homework-helper"
              name="ai-homework-helper"
              src="/landing-robot.png"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <h1 style={{ fontWeight: 600, fontSize: 24 }}>
              AI Homework Helper- The AI That Does Homework
            </h1>
            <br />
            <br />
            <h2
              style={{
                fontSize: 18,
                fontWeight: "none !important",
              }}
            >
              Upload a worksheet or use homework AI helper that are specially
              designed to provide you with all your homework solutions.
            </h2>
            <br />
            <br />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              Let our homework AI helper help you with your homework.{" "}
            </h2>{" "}
            <h3 style={{ textAlign: "center", fontSize: 18 }}>
              We have a number of AI homework solvers that are specially
              designed to help you with all your homework subjects.
            </h3>{" "}
            <Link style={{ textDecoration: "none" }} href="/api/auth/signup">
              <Button
                style={{
                  zIndex: 10,
                  backgroundColor: "#304FFD",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  maxWidth: 225,
                  minWidth: 150,
                  width: "80%",
                  textTransform: "none",
                  height: 50,
                }}
              >
                Try it free!
              </Button>
            </Link>
          </div>
        </div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "#f2f7ff",

            fontSize: 18,
          }}
        >
          <Link href="/App">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                position: "relative",
                border: "1px solid silver",
                backgroundColor: "white",
                borderRadius: 12,
                width: windowSize > 500 ? "50%" : "90%",
                maxWidth: 400,
              }}
            >
              <img
                alt="ai-for-homework"
                name="ai-for-homework"
                src="/final-step.png"
                style={{ maxHeight: "100%", maxWidth: "100%", margin: 16 }}
              />
            </div>
          </Link>
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 24 }}>
              Upload a picture and get answers in seconds!
            </span>
            <br />
            <br />
            Just take a clear picture of your homework paper and our high
            powered AI will read your homework and provide you with all the
            answers for free.
            <br />
            <br />
          </div>
        </div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "#f2f7ff",

            fontSize: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 24 }}>
              Let our AI bots help you with your homework.
            </span>
            <br />
            <br />
            We have a number of AI bots that are specially designed to help you
            with all your homework subjects.
            <br />
            <br />
          </div>
          <Link href="/App">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                position: "relative",
                border: "1px solid silver",
                backgroundColor: "white",
                borderRadius: 12,
                width: windowSize > 500 ? "50%" : "90%",
                maxWidth: 400,
              }}
            >
              <img
                alt="ai-homework"
                name="ai-homework"
                src="/buttons-page.png"
                style={{ maxHeight: "100%", maxWidth: "100%", margin: 16 }}
              />
            </div>
          </Link>
        </div>

        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",

            fontSize: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              position: "relative",
              border: "1px solid silver",
              backgroundColor: "white",
              borderRadius: 12,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <img
              name="ai-homework-solutions"
              alt="ai-homework-solutions"
              src="/history-page1.png"
              style={{ maxHeight: "100%", maxWidth: "100%", margin: 16 }}
            />
          </div>
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 24 }}>History Answers</p>
            <br />
            <br />
            <h2 style={{ fontSize: 18, fontWeight: "none" }}>
              From ancient civilizations to modern politics, our AI homework
              helper is here to assist you with any topic you may be struggling
              with.{" "}
            </h2>

            <br />
          </div>
        </div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",

            fontSize: 18,
            backgroundColor: "#f2f7ff",
          }}
        >
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 24 }}>English Help</p>
            <br />
            <br />
            <h2 style={{ fontWeight: "none", fontSize: 18 }}>
              From grammar to literature analysis, our AI is here to assist you
              with any task you may be struggling with.
            </h2>
            <br />
            <br />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              position: "relative",
              border: "1px solid silver",
              backgroundColor: "white",
              borderRadius: 12,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <img
              name="ai-homework-writer"
              alt="ai-homework-writer"
              src="/english-page-1.png"
              style={{ maxHeight: "100%", maxWidth: "100%", margin: 16 }}
            />
          </div>
        </div>

        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",

            fontSize: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
              position: "relative",
              border: "1px solid silver",
              backgroundColor: "white",
              borderRadius: 12,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <img
              name="homework-ai"
              alt="homework-ai"
              src="/science-page-1.png"
              style={{ maxHeight: "100%", maxWidth: "100%", margin: 16 }}
            />
          </div>
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 24 }}>Science Answers</p>
            <br />
            <br />
            <h2 style={{ fontSize: 18, fontWeight: "none" }}>
              From biology to chemistry to physics, our homework AI is equipped
              to assist you with any topic you may be struggling with. Need help
              understanding a complex scientific concept? Want to know how to
              complete a lab report? Our AI that does homework is here to
              provide you with accurate and reliable answers.
            </h2>
            <br />
            <br />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#f2f7ff", margin: "16px 0" }}>
        <div
          style={{
            margin: 16,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ width: "50%" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>
              Use our homework AI and never do homework again! It's free!
            </h2>{" "}
          </div>
          <Link
            style={{ textDecoration: "none", width: "50%" }}
            href="/api/auth/signup"
          >
            <Button
              style={{
                backgroundColor: "#304FFD",
                padding: 14,
                color: "white",
                minWidth: 150,
                width: "80%",
                maxWidth: 225,
                textTransform: "none",
                height: 50,
              }}
            >
              Try it free!
            </Button>
          </Link>
        </div>
        <div
          style={{
            margin: 16,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <div style={{ width: "80%" }}>
            <h2 style={{ fontSize: 24 }}>AI that does homework</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h2 style={{ width: "50%", margin: 24, fontSize: 18 }}>
                {" "}
                Are you looking for an AI that does homework? Look no further,
                Oddity AI is here to provide all of your AI homework solutions.
                Using this AI homework Helper
              </h2>
              <p
                style={{
                  width: "50%",
                  margin: 24,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Oddity AI is the groundbreaking new artificial intelligence that
                students have been dreaming of for years. This AI homework
                helper has revolutionized the way people approach their
                schoolwork, making it easier than ever to get work done quickly
                and efficiently. With Oddity AI, users can ask questions
                directly to the AI and receive instant answers in seconds. The
                AI not only gives accurate answers but also provides detailed
                explanations of how each answer was reached so users can gain a
                deeper understanding of their schoolwork.
              </p>
            </div>
          </div>
        </div>
        <div></div>
        <div
          style={{
            margin: 16,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ width: "50%" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>
              Homework AI - Oddity AI is the homework AI that does homework for
              you.
            </h2>{" "}
          </div>
          <Link
            style={{ textDecoration: "none", width: "50%" }}
            href="/api/auth/signup"
          >
            <Button
              style={{
                backgroundColor: "#304FFD",
                padding: 14,
                color: "white",
                minWidth: 150,
                width: "80%",
                maxWidth: 225,
                textTransform: "none",
                height: 50,
              }}
            >
              Try it free!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Contact;
