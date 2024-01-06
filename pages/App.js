import CloseIcon from "@mui/icons-material/Close";
import { Modal, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Nunito } from "@next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { db } from "../firebase";
import AppBar from "./AppBar";
import ChatBot from "./ChatBot";
import { auth } from "../firebase";

import Tabs from "./Tabs";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import * as amplitude from "@amplitude/analytics-browser";
import { identify, Identify } from "@amplitude/analytics-node";

const nunito = Nunito({ subsets: ["latin"] });

const test = [];

const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // This is the unique fingerprint
};

const TYPES = {
  math: "Quickly solve this math problem. Keep your response meaningful but as short as possible.: ",
  history: "In a few sentences, explain this history topic. Keep your response meaningful but as short as possible.: ",
  english: "Summarize this English topic in a short paragraph. Keep your response meaningful but as short as possible.: ",
  science: "Briefly explain this science concept or question. Keep your response meaningful but as short as possible.: ",
  prompt: "Write a concise essay (about 300 words) on this topic. Cite sources at the very bottom.: ",
  chat: "Quickly provide expert insight on this query. Keep your response meaningful but as short as possible.: ",
  feedback:
    "Give a brief reply to this feedback. Use our specialized bots for academic questions. Keep your response meaningful but as short as possible.: ",
  reply:
    "Write a short response to this message. Direct academic queries to our specialized bots. Keep your response meaningful but as short as possible.: ",
  joke: "Tell a quick joke about this topic. For academic queries, use our bots. Keep your response meaningful but as short as possible.: ",
  art: "In a few sentences, discuss this art-related topic. Keep your response meaningful but as short as possible.: ",
  law: "Explain this legal query in a concise manner. Keep your response meaningful but as short as possible.: ",
  psychology: "Briefly describe this psychology topic. Keep your response meaningful but as short as possible.: ",
  business: "Quickly summarize this business or economics concept. Keep your response meaningful but as short as possible.: ",
  health: "In a short explanation, answer this health science question. Keep your response meaningful but as short as possible.: ",
  engineering:
    "Provide a quick explanation or solution for this engineering problem. Keep your response meaningful but as short as possible.: ",
};



export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [error, setError] = useState("");
  const [ws, setWs] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [profileData, setProfileData] = useState({});
  const [subject, setSubject] = useState("math");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser._delegate);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const router = useRouter();

    const handleTabChange = (event, newValue) => {
             setIsModalOpen(false);
             setAnswers([]);
                   setValue(newValue);
    };

  async function updateUserProfile() {
    try {
      const fingerprint = await getFingerprint();
      const profilesRef = db.collection("profiles");

      // Query for profiles with the same IP
      const querySnapshot = await profilesRef
        .where("IP", "==", fingerprint)
        .get();

      if (querySnapshot.size > 1) {
        // Update the user's profile if there are multiple profiles with the same IP
        const usersRef = db
          .collection("profiles")
          .where("email", "==", user.email);

        const usersSnapshot = await usersRef.get();
        usersSnapshot.forEach((doc) => {
          doc.ref.update(
            {
              credits: 0,
              duplicate: true,
            },
            { merge: true }
          );
        });
      } else {
        console.log("No action taken: Single profile found with the IP.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }

  // function generateRandomID() {
  //   let id = ''
  //   for (let i = 0; i < 20; i++) {
  //     id += Math.floor(Math.random() * 10)
  //   }
  //   return id
  // }
  useEffect(() => {
    if (user && !isLoading) {
      db.collection("profiles")
        .where("email", "==", user.email)
        .onSnapshot((snapshot) => {
          const userData = snapshot.docs.map((doc) => {
            return { ...doc.data(), ...{ id: doc.id } };
          })[0];
          if (userData) {
            setProfileData(userData);
            ReactGA.set({ userId: userData?.nickname });
            const identifyObj = new Identify();
            identify(identifyObj, {
              user_id: userData?.email,
            });
          } else {
            if (sessionStorage.getItem("profileStatus1") === user?.sid) {
              return;
            }
            const identifyObj = new Identify();
            identify(identifyObj, {
              user_id: user.email,
            });
            const firstRef = user.email.slice(0, 3).toUpperCase();
            const secondRef = Math.floor(1000 + Math.random() * 9000);
            const refCode = `${firstRef}-${secondRef}`;

            getFingerprint().then((fingerprint) => {
              const newUser = {
                username: user.email,
                email: user?.email,
                id: user?.uid,
                name: user?.email,
                credits: 10,
                acceptedTerms: true,
                subscribed: false,
                subscriptionId: "",
                dateOfSub: "",
                referralCode: refCode,
                usedCodes: [refCode],
                chatHistory: [],
                IP: fingerprint,
              };
              db.collection("profiles").add(newUser);
              setProfileData(newUser);
              updateUserProfile();
              sessionStorage.setItem("profileStatus1", user?.sid);
            });
          }
        });
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (router.query.success === "true" && profileData.id) {
      const usersRef = db.collection("profiles");
      const userRef = usersRef.doc(profileData.id);
      const creditsToAdd = 250;

      try {
        userRef.update(
          {
            credits: (profileData.credits || 0) + creditsToAdd,
          },
          { merge: true }
        );
        router.push("/App");
      } catch (error) {
        console.error(`Error adding credits: ${error}`);
      }
    } else if (router.query.success === "true2" && profileData.id) {
      const usersRef = db.collection("profiles");
      const userRef = usersRef.doc(profileData.id);
      const creditsToAdd = 5500;

      try {
        userRef.update(
          {
            credits: (profileData.credits || 0) + creditsToAdd,
          },
          { merge: true }
        );
        router.push("/App");
      } catch (error) {
        console.error(`Error adding credits: ${error}`);
      }
    } else if (router.query.success === "true4" && profileData.id) {
      const usersRef = db.collection("profiles");
      const userRef = usersRef.doc(profileData.id);
      try {
        router.push("/App");
      } catch (error) {
        console.error(`Error adding credits: ${error}`);
      }
    }
    // else if (router.query.success === 'true3' && profileData.id) {
    //   const usersRef = db.collection('profiles')
    //   const userRef = usersRef.doc(profileData.id)
    //   const creditsToAdd = 1800

    //   try {
    //     userRef.update({
    //       credits: (profileData.credits || 0) + creditsToAdd,
    //     })
    //     console.log('Credits successfully added (1800)')
    //     router.push('/App')
    //   } catch (error) {
    //     console.error(`Error adding credits: ${error}`)
    //   }
    // }
  }, [router.query.success, profileData.id]);
  // useEffect(() => {
  //   if (window.location.href.includes('localhost')) {
  //     if (user?.nickname && !isLoading) {
  //       db.collection('profiles').onSnapshot((snapshot) => {
  //         const userData = snapshot.docs.map((doc) => {
  //           return { ...doc.data(), ...{ id: doc.id } }
  //         })
  //         if (userData) {
  //           const histories = []
  //           userData?.map((ele) => {
  //             if (ele?.usedCodes?.length) {
  //                 histories.push({
  //                   username: ele?.username,
  //                   user: ele,
  //                 });
  //               // histories.push({
  //               //   username: ele?.username,
  //               //   length: ele?.chatHistory?.length,
  //               //   history: ele?.chatHistory,
  //               // })
  //             }
  //           })
  //           console.log({ histories })
  //         }
  //       })
  //     }
  //   }
  // }, [user])

  const handleClick = (subject) => {
    ReactGA.event({
      category: "User",
      action: `Opened ${subject} bot`,
    });
    amplitude.track("Opened chat bot", undefined, {
      user_id: profileData?.email,
    });

    if (profileData.credits > 0 || profileData?.subscribed) {
      setIsModalOpen(true);
      setSubject(subject);
    } else {
      // alert('You must have credits to continue! Visit the "Credits" tab!')
      handleOpen();
    }
  };
  const handleFeedback = (subject) => {
    setIsModalOpen(true);
    setSubject(subject);
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://oddityai-api-04782150cdc6.herokuapp.com/"
      // "ws://localhost:3001/"
    );
    setWs(socket);
    let pingInterval;
    socket.onopen = () => {
      console.log("WebSocket Connected");
      pingInterval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000); // send ping every 30 seconds
    };
    socket.onmessage = (event) => {handleSendMessage(event)};

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      clearInterval(pingInterval);
    };

    return () => {
      socket.close();
      clearInterval(pingInterval);
    };
  }, []);

  const handleSendMessage = (event) => {
    if (event.data === '{"type":"pong"}') {
      return;
    }
    setIsLoadingScreen(true);
    setResult((prev) => {
      // Retrieve the latest profile data from Firestore
      db.collection("profiles")
        .doc(profileData?.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("HERE", profileData, doc);
            const latestProfileData = doc.data();
            const updatedChatHistory = latestProfileData.chatHistory
              ? [...latestProfileData.chatHistory]
              : [];
            // Update the first element's result with new data
            if (updatedChatHistory.length > 0) {
              updatedChatHistory[0].result = prev + event.data;
            }

            // Update Firestore with the new chat history
            db.collection("profiles").doc(profileData?.id).update({
              chatHistory: updatedChatHistory,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching latest data: ", error);
        });
setIsLoadingScreen(false)
      // Return the updated result
      return prev + event.data;
    });
  }

  const useCredit = (amount) => {
    const usersRef = db.collection("profiles");
    const userRef = usersRef.doc(profileData.id);
    if (profileData.credits >= 0 && !profileData?.subscribed) {
      userRef.update(
        {
          credits: profileData.credits - amount || profileData.credits - 1,
        },
        { merge: true }
      );
    }
  };
  async function onSubmit(event, value, url, tries) {
    const input = value ? value : animalInput;
    if (profileData.credits > 0 || profileData?.subscribed) {
      if (event) {
        event.preventDefault();
      }
      useCredit()
    setIsLoadingScreen(true);
      try {

        if (url) {
        ReactGA.event({
          category: "User",
          action: "Uploaded an image",
        });
        amplitude.track("Uploaded an image", undefined, {
          user_id: profileData?.email,
        });

        } else {
                  ReactGA.event({
                    category: "User",
                    action: "Asked a question",
                  });
                  amplitude.track("Asked a question", undefined, {
                    user_id: profileData?.email,
                  });
        }
        const res = {
          result: "",
          input: input,
          time: new Date().toLocaleString(),
          type: subject,
          // explanation: JSON.parse(data2.result).explanation,
        };

        const question = {
          content: "",
          role: "assistant",
        };
        const resp = {
          content: animalInput,
          role: "user",
        };
        const answersCopy = answers.slice();
        answersCopy.push(res);

        if (answersCopy.length > 1) {
          answersCopy[answers.length - 1].result = result;
        }

        const messageHistoryUpdate = messageHistory.slice();

        messageHistoryUpdate.push(resp);
        messageHistoryUpdate.push(question);

        setMessageHistory(messageHistoryUpdate);

        const userCopy = profileData.chatHistory.slice();
        userCopy.unshift(res);
        const docRef = db.collection("profiles").doc(profileData?.id);

        docRef
          .update({ chatHistory: userCopy }, { merge: true })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });

        const getModel = () => {
          if (
            profileData?.subscribed ||
            (profileData?.credits > 4 && profileData?.credits < 100)
          ) {
            return "gpt-4-1106-preview";
          } else {
            return "gpt-4-1106-preview";
          }
        };
        ws.send(
          JSON.stringify({
            animal: url
              ? 'Think about this step by step. First, read all the questions in this image. Second, answer each one in an ordered list in this format (state the question then the answer) "1. {QUESTION}: {ANSWER}". Dont explain too much just give answers. Dont explain anything else just give answers.'
              : `${TYPES[subject]} ${animalInput}`,
            history: messageHistoryUpdate,
            url: url,
            model: getModel(),
          })
        );
        setAnswers(answersCopy);
        setAnimalInput("");
        setResult("");
        setError("");
          setIsLoadingScreen(false);

        // setAnimalInput("");
      } catch (error) {
        ReactGA.event({
          category: "User",
          action: "Question failed",
        });
        amplitude.track("Question failed", undefined, {
          user_id: profileData?.email,
        });

        if (!tries && tries < 1) {
          onSubmit(event, value + " (limit 1606 chars)", url, type, 1);
          return;
        }
        // Consider implementing your own error handling logic here
        if (tries > 1) {

          setResult("");
          setError(
            "The response is too large to send. Can you try asking a slightly more specific question?" +
              " " +
              error.message
          );
          console.error(error);
        }

        // alert(error.message);
      }
    } else {
      // alert('You must have credits to continue! Visit the "Credits" tab!')
      handleOpen();
    }
  }

  // async function onSubmit(event, value, url, tries) {
  //   const input = value ? value : animalInput;
  //   if (profileData.credits > 0) {
  //     if (
  //       subject !== 'feedback' &&
  //       subject !== 'chat' &&
  //       subject !== 'joke' &&
  //       subject !== 'reply'
  //     ) {
  //       useCredit();
  //     }
  //     if (event) {
  //       event.preventDefault();
  //     }
  //     setIsLoadingScreen(true);
  //     try {
  //       const response = await fetch('/api/generate', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           animal: `${TYPES[subject]}: "${input}"`,
  //         }),
  //       });

  //       if (response.status !== 200) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }

  //       const reader = response.body.getReader();
  //       let content = '';

  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) {
  //           break;
  //         }
  //         content += new TextDecoder().decode(value);
  //         // Display the content in your UI, e.g., append it to a chat window
  //         console.log(content);
  //       }

  //       const res = {
  //         result: content,
  //         input: input,
  //         type: subject,
  //       };
  //       const answersCopy = answers.slice();
  //       answersCopy.push(res);
  //       setAnswers(answersCopy);
  //       setAnimalInput('');
  //       setResult('');
  //       setError('');
  //       setIsLoadingScreen(false);

  //       // Update the chat history in your Firebase database
  //       const userCopy = profileData.chatHistory.slice();
  //       userCopy.unshift(res);
  //       db.collection('profiles').doc(profileData?.id).update({
  //         chatHistory: userCopy,
  //       });
  //     } catch (error) {
  //       // Handle errors
  //       setIsLoadingScreen(false);
  //       setResult('');
  //       setError('An error occurred while processing your request: ' + error.message);
  //       console.error(error);
  //     }
  //   } else {
  //     // Handle the case where user doesn't have enough credits
  //     handleOpen();
  //   }
  // }

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

    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    await worker.setParameters({
      tessedit_ocr_engine_mode: 0,
      tessedit_pageseg_mode: "1",
      tessedit_create_txt: "1",
      tosp_ignore_big_gaps: "1",
      tessedit_pageseg_mode: "6",
      preserve_interword_spaces: "1",
    });

    const options = {
      tessedit_ocr_engine_mode: 0,
      tessedit_pageseg_mode: "1",
      preserve_interword_spaces: "1",
    };

    const {
      data: { text },
    } = await worker.recognize(url, "eng", options);
    onSubmit(null, text, url, type);
  };
  const [value, setValue] = useState(0);
  const handleClose = () => {
    setOpen(false);
    router.push("/pricing");
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
      if (!window.location.href.includes("local")) {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
      }
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
    if (!isLoading && !user) {
      window.location.href = "/";
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <>Logging in</>;
  }
  if (!profileData) {
    return <div>Loading...</div>;
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(188, 37, 52, 0.95)",
    border: "2px solid #871420",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    color: "white",
    textAlign: "center",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar profileData={profileData} setValue={setValue} value={value} />
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
      </Head>{" "}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, position: "relative" }}>
            <Button
              onClick={handleClose}
              sx={{ position: "absolute", top: 0, right: 0, fontWeight: 'bold', color: 'white' }}
            >
              X
            </Button>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You are out of credits!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Get more for as little as $0.99 now.
            </Typography>
          </Box>
        </Modal>
        <div
          style={{
            textAlign: "center",
            padding: "20px 20px",
            color: "#232A31",
            fontFamily: "'ColfaxAI', sans-serif",
          }}
          id="exportthis"
        >
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                        Answers left: {profileData?.credits}
                      </p>
                    </div>
                  )}
              </div>
              <ChatBot
                setAnimalInput={setAnimalInput}
                setIsLoadingScreen={setIsLoadingScreen}
                onSubmit={onSubmit}
                streamedResult={result}
                ws={ws}
                handleTabChange={handleTabChange}
                handleChange={handleChange}
                isLoading={isLoadingScreen}
                animalInput={animalInput}
                subject={subject}
                answers={answers}
                error={error}
                profileData={profileData}
                useCredit={useCredit}
              />
            </div>
          </Dialog>
          <Tabs
            profileData={profileData}
            answers={answers}
            handleChange={handleTabChange}
            handleClick={handleClick}
            handleFeedback={handleFeedback}
            handleClose={handleClose}
            value={value}
            setValue={setValue}
            // handleAddReferralCodes={handleAddReferralCodes}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
      </div>
    </div>
  );
}
