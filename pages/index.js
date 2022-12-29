import Head from "next/head";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { jsPDF } from "jspdf";
import Loader from "../public/Loader.gif";
import Loader2 from "../public/Loader.svg";
import LogRocket from "logrocket";
import AppBar from "./AppBar";
import App from "next/app";
import TextField from "@mui/material/TextField";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const test = [];

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      const res = {
        result: data.result,
        input: animalInput,
      };
      const answersCopy = answers.slice();
      answersCopy.unshift(res);
      setAnswers(answersCopy);
      setAnimalInput("");
      setResult("");
      setIsLoading(false);
      // setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent("www.oddityai.com");
    const text = encodeURIComponent(
      "Check out this new AI powered homework bot!"
    );
    const via = "myusername";
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=Oddity_AI`
    );
  };

  // useEffect(() => {
  //   // var html = htmlToPdfmake(result);
  //   // var dd = { content: html };
  //   // pdfMake.createPdf(dd).download();

  //   if (document.getElementById("exportthis")) {
  //     html2canvas(document.getElementById("exportthis")).then((canvas) => {
  //       var imgData = canvas.toDataURL("image/png");
  //       var doc = new jsPDF("p", "mm", [150, 210]);
  //       doc.addImage(imgData, "PNG", 1, 1);
  //       doc.save("sample-file.pdf");
  //     });
  //     document.getElementById("exportthis").innerHTML = result;
  //   }
  // }, [result]);

  useEffect(() => {
    if (window.location.href.includes("oddityai")) {
      LogRocket.init("nzb3qh/oddity-ai");

      // the below i to identify users when i add auth0

      // LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
      //   name: "James Morrison",
      //   email: "jamesmorrison@example.com",

      //   // Add your own custom user variables here, ie:
      //   subscriptionType: "pro",
      // });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar />
      <div>
        <Head>
          <title>Oddity AI</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div
          style={{
            textAlign: "center",
            padding: "20px 20px",
            color: "#232A31",
            fontFamily: "'ColfaxAI', sans-serif",
          }}
          id="exportthis"
        >
          <title>Student Queries</title>

          <div
            className="container"
            style={{ textAlign: "left", margin: "auto", maxWidth: 500 }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.87)",
                fontFamily: "'ColfaxAI', sans-serif",
                marginTop: 15,
              }}
              id="form-title"
            >
              Get quick and accurate homework help from our AI tutor – just type
              your question into the chat box and receive reliable answers and
              helpful explanations in real-time.
            </p>
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <h2>Thinking...</h2>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <TextField
                  type="text"
                  name="question"
                  value={animalInput}
                  onChange={(e) => setAnimalInput(e.target.value)}
                  placeholder={
                    answers.length
                      ? "Ask another question. It's free!"
                      : "Ask your question"
                  }
                  size="100"
                  required=""
                  style={{
                    width: "100%",
                    fontSize: 14,
                    padding: "15px 0",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  id="input-question"
                />
                <br />

                <button
                  style={{
                    fontWeight: 500,
                    color: "white",
                    borderRadius: 42,
                    border: "none",
                    height: 42,
                    backgroundColor: animalInput.length ? "#0a99f2" : "silver",
                    width: 206,
                    fontFamily: "'ColfaxAI', sans-serif",
                  }}
                  id="submit-button"
                  type="submit"
                  disabled={!animalInput.length}
                >
                  Get Answer
                </button>
              </form>
            )}
          </div>
          {Boolean(answers.length) && (
            <div>
              {answers.map((answer, i) => {
                return (
                  <div
                    id={i}
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      marginTop: 24,
                      backgroundColor: i === 0 ? "#F5F5F5" : "",
                      width: "70%",
                      borderRadius: 12,
                      boxShadow:
                        "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <div style={{ padding: 8 }}>
                      <h3>Q: {answer.input}</h3>
                      <h4>A: {answer.result}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* <button
            onClick={shareOnTwitter}
            style={{
              fontWeight: 500,
              color: "white",
              borderRadius: 42,
              border: "none",
              height: 42,
              backgroundColor: "#0a99f2",
              width: 206,
              fontFamily: "'ColfaxAI', sans-serif",
            }}
            id="submit-button"
          >
            Share us on twitter!
          </button> */}
        </div>
        {/* {result && <div id="exportthis"></div>}
      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Super fast AI Resume Builder</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />

          <input type="submit" value="Generate names" />
        </form>
      </main> */}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <a
          href="https://twitter.com/Oddity_AI"
          target="_blank"
          className="twitter-button"
        >
          <i className="fab fa-twitter"></i> Follow us on Twitter
        </a>
        <br />
        <br />
        <a
          href="https://www.facebook.com/profile.php?id=100088926106665"
          target="_blank"
          className="facebook-button"
        >
          <i className="fab fa-facebook-f"></i> Follow us on Facebook
        </a>
        <br />
        <br />
        {/* <a
          href="https://discord.gg/yourserver"
          target="_blank"
          className="discord-button"
        >
          <i className="fab fa-discord"></i> Join our Discord server
        </a> */}
      </div>
    </div>
  );
}
