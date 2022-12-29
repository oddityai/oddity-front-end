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
import Logo from "../public/logo.png";

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

  return (
    <div>
      <>
        <Head>
          <title>Oddity AI</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div
          style={{
            textAlign: "center",
            padding: "20px 20px",
            color: "#232A31",
            fontFamily: "sans-serif",
          }}
          id="exportthis"
        >
          <title>Student Queries</title>

          <h1 style={{ fontSize: 36, margin: 0, padding: "30 0" }} id="title">
            OddityAI.com
          </h1>
          <p style={{ color: "#6B1B6F" }} id="call-to-action">
            Improve your grades with AI!
          </p>
          <div
            clasName="container"
            style={{ textAlign: "left", margin: "auto", maxWidth: 500 }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 15,
              }}
              id="form-title"
            >
              Ask me your homework questions.
            </p>
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <h2>Thinking...</h2>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="question"
                  value={animalInput}
                  onChange={(e) => setAnimalInput(e.target.value)}
                  placeholder="Ask your question"
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
                <button id="submit-button" type="submit">
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
                      backgroundColor: i === 0 ? "#f0f0f0" : "",
                      width: "70%",
                      border: "1px solid silver",
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ padding: 16 }}>
                      <h3>Question: {answer.input}</h3>
                      <h4>Answer: {answer.result}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
      </>
    </div>
  );
}
