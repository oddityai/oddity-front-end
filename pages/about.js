import { useEffect, useState } from "react";

import AppBar from "./AppBar";
import { Nunito } from "@next/font/google";
import { Html, Head, Main, NextScript } from "next/document";

const nunito = Nunito({ subsets: ["latin"] });
const About = () => {
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
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={nunito.className}>
      <Head>
        <title>AI Homework Helper | Homework AI</title>
        <meta
          name="description"
          content="Homework AI Is the AI That Does Homework. If You
Are a Student Who Needs Homework Solutions This AI Homework Helper
Is for You. Give This AI Homework App a Try, It’ll Solve & Write Your
Homework"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="student homework app ai, ai that does homework, ai doing
homework, ai homework writer, homework helper ai, homework ai, ai
homework solver, ai for homework, ai  homework, ai homework solutions, ai
homework helper"
        />{" "}
      </Head>
      <AppBar />
      <div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            fontSize: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              width: "50%",
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600 }}>Thank you for visiti</span>
            <br />
            <br />
            We hope that our advanced artificial intelligence has been able to
            assist you with all of your homework needs.
            <br />
            <br />
            If you have any questions, concerns or feedback, we would love to
            hear from you. You can reach us through our Twitter{" "}
            <span
              style={{ color: "#0a99f2", cursor: "pointer" }}
              onClick={() => {
                window.open("https://twitter.com/oddity_ai");
              }}
            >
              here
            </span>{" "}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "50%",
              maxWidth: 400,
            }}
          >
            <img
              src="/contact.png"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
