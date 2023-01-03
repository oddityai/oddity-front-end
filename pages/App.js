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
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import ReactGA from "react-ga4";
import ChatBot from "./ChatBot";
import Buttons from "./Buttons";
import Dialog from "@mui/material/Dialog";
import { Nunito } from "@next/font/google";
import Hotjar from "@hotjar/browser";

const nunito = Nunito({ subsets: ["latin"] });
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const test = [];

const TYPES = {
  math: "Answer this math question for me. You have to be exactly precise. :",
  history: "",
  english: "",
  science: "",
  chat: "",
};

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("math");

  const handleClick = (subject) => {
    setIsModalOpen(true);
    setSubject(subject);
  };

  async function onSubmit(event, value, url, tries) {
    const input = value ? value : animalInput;

    if (event) {
      event.preventDefault();
    }
    setIsLoading(true);
    console.log({ thing: TYPES[subject], input: input });
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animal: `${TYPES[subject]}: "${input}"`,
        }),
      });
      // const response2 = await fetch("/api/generate", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     animal: `Return the data in JSON format. The key of the json should be an array of one string called 'explanation'.  the value of 'explanation'  should be more 1 detailed reason why the following is true to help me understand like im a 10 year old: ${input}.`,
      //   }),
      // });

      let data = await response.json();
      // let data2 = await response2.json();
      // console.log(data2.result.explanation);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      // if (response2.status !== 200) {
      //   throw (
      //     data.error ||
      //     new Error(`Request failed with status ${response.status}`)
      //   );
      // }

      setResult(data.result);
      const res = {
        result: data.result,
        input: input,
        // explanation: JSON.parse(data2.result).explanation,
      };
      const answersCopy = answers.slice();
      answersCopy.push(res);
      setAnswers(answersCopy);
      setAnimalInput("");
      setResult("");
      setError("");
      setIsLoading(false);
      Hotjar.event("SUCCESS - User succeeded to submit request.");
      // setAnimalInput("");
    } catch (error) {
      if (!tries && tries < 1) {
        onSubmit(event, value + " (limit 1606 chars)", url, type, 1);
        return;
      }
      // Consider implementing your own error handling logic here
      setIsLoading(false);
      setResult("");
      setError(
        "The response is too large to send. Can you try asking a slightly more specific question?" +
          " " +
          error.message
      );
      Hotjar.event("FAILURE - User failed to submit request.");

      console.error(error);
      // alert(error.message);
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
      LogRocket.init(process.env.REACT_APP_LOGROCKET_API_KEY);
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
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

          <Dialog
            onClose={() => {
              setIsModalOpen(false);
              setAnswers([]);
            }}
            open={isModalOpen}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CloseIcon
                onClick={() => {
                  setIsModalOpen(false);
                  setAnswers([]);
                }}
              />
            </div>
            <div
              className="container"
              style={{
                textAlign: "left",
                margin: "auto",
                maxWidth: 500,
                padding: 8,
              }}
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
                {`OddityAI ${subject} AI`}
              </p>
              <ChatBot
                setAnimalInput={setAnimalInput}
                onSubmit={onSubmit}
                isLoading={isLoading}
                animalInput={animalInput}
                subject={subject}
                answers={answers}
                error={error}
              />
            </div>
          </Dialog>
          <h2 className={nunito.className} style={{ fontSize: 22 }}>
            Use AI to get straight A's in class
          </h2>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>

          <Buttons handleClick={handleClick} />

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
        {/* <a
          className="twitter-button"
          style={{
            color: "#0a99f2",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            ReactGA.event({
              category: "User clicked on Twitter Page",
              errorMessage: "none",
            });
            window.open("https://twitter.com/Oddity_AI");
          }}
        >
          <i className="fab fa-twitter"></i> Follow us on Twitter{" "}
          <TwitterIcon style={{ marginLeft: 8 }} />
        </a> */}
        {/* <br />
        <br /> */}

        <br />
        <br />
      </div>
    </div>
  );
}
