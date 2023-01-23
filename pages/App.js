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
import { useUser } from "@auth0/nextjs-auth0/client";
import { db } from "../firebase";
import Tesseract from "tesseract.js";
import { loadStripe } from "@stripe/stripe-js";

import Tabs from "./Tabs";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const nunito = Nunito({ subsets: ["latin"] });
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const test = [];

const TYPES = {
  math: "Answer this math question for me. You have to be exactly precise. Use chain of thought reasoning and show your work. :",
  history: "Answer this history question for me: ",
  english: "Answer this English question for me: ",
  science: "Answer this science question for me: ",
  chat: "Reply to this as if you are a friendly ai friend: ",
  feedback:
    "Give me a good reply for this piece of feedback as if you are a team and we are a group replying: ",

  reply: "Generate a reply to the following message: ",
};

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({});
  const [subject, setSubject] = useState("math");
  const { user, isLoading } = useUser();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  useEffect(() => {
    if (user?.nickname && !isLoading) {
      db.collection("profiles")
        .where("username", "==", user?.nickname)
        .onSnapshot((snapshot) => {
          const userData = snapshot.docs.map((doc) => {
            return { ...doc.data(), ...{ id: doc.id } };
          })[0];
          if (userData) {
            setProfileData(userData);
          } else {
            if (sessionStorage.getItem("profileStatus1") === user?.sid) {
              return;
            }
            const newUser = {
              username: user?.nickname,
              email: user?.email,
              id: user?.sub.split("|")[1],
              name: user?.name,
              chatHistory: [],
            };
            db.collection("profiles").add(newUser);
            setProfileData(newUser);
            sessionStorage.setItem("profileStatus1", user?.sid);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (user?.nickname && !isLoading) {
      db.collection("profiles").onSnapshot((snapshot) => {
        const userData = snapshot.docs.map((doc) => {
          return { ...doc.data(), ...{ id: doc.id } };
        });
        if (userData) {
          const histories = [];
          userData?.map((ele) => {
            return ele?.chatHistory?.map((chat) => {
              if (chat.type === "math") {
                histories.push({ chat, ele });
              }
            });
          });
          console.log({ histories });
        }
      });
    }
  }, [user]);

  const handleClick = (subject) => {
    setIsModalOpen(true);
    setSubject(subject);
  };

  async function onSubmit(event, value, url, tries) {
    const input = value ? value : animalInput;

    if (event) {
      event.preventDefault();
    }
    setIsLoadingScreen(true);
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
        url: url,
        type: subject,
        // explanation: JSON.parse(data2.result).explanation,
      };
      const answersCopy = answers.slice();
      answersCopy.push(res);
      setAnswers(answersCopy);
      setAnimalInput("");
      setResult("");
      setError("");
      setIsLoadingScreen(false);
      const userCopy = profileData.chatHistory;
      userCopy.unshift(res);
      db.collection("profiles").doc(profileData?.id).update({
        chatHistory: userCopy,
      });
      Hotjar.event("SUCCESS - User succeeded to submit request.");
      // setAnimalInput("");
    } catch (error) {
      if (!tries && tries < 1) {
        onSubmit(event, value + " (limit 1606 chars)", url, type, 1);
        return;
      }
      // Consider implementing your own error handling logic here
      if (tries > 1) {
        setIsLoadingScreen(false);
        setResult("");
        setError(
          "The response is too large to send. Can you try asking a slightly more specific question?" +
            " " +
            error.message
        );
        Hotjar.event("FAILURE - User failed to submit request.");
        console.error(error);
      }

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

  const handleChange = async (url, type) => {
    setIsModalOpen(true);
    setIsLoadingScreen(true);
    const { createWorker } = Tesseract;

    const worker = await createWorker();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    await worker.setParameters({
      // tessedit_ocr_engine_mode: 0,
      // tessedit_pageseg_mode: "1",
      // tessedit_create_txt: "1",
      // tosp_ignore_big_gaps: "1",
      // tessedit_pageseg_mode: "6",
      // preserve_interword_spaces: "1",
      // tessedit_char_whitelist:
      //   "abcdefghijklmnopqrstuvwxyzABCEDEFGHIJKLMNOPQRSTUVWXYZ ",
    });

    const options = {
      // tessedit_ocr_engine_mode: 0,
      // tessedit_pageseg_mode: "1",
      // preserve_interword_spaces: "1",
    };

    const {
      data: { text },
    } = await worker.recognize(url, "eng", options);
    onSubmit(null, text, url, type);
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
    if (!isLoading && !user?.nickname) {
      window.location.href = "/";
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <>Logging in</>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar />
      {/* <form action="/api/checkout_sessions?user_id=123" method="POST">
        <section>
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 112px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form> */}
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
            style={{ width: "100%", height: "100%" }}
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
                handleChange={handleChange}
                isLoading={isLoadingScreen}
                animalInput={animalInput}
                subject={subject}
                answers={answers}
                error={error}
              />
            </div>
          </Dialog>

          <Tabs
            profileData={profileData}
            answers={answers}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <br />
        <br />
      </div>
    </div>
  );
}
