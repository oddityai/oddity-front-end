import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase"; // Make sure this path is correct
import InputLabel from "@mui/material/InputLabel";
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EssayWriter = ({ profileData }) => {
  const [animalInput, setAnimalInput] = useState("");
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const [grade, setGrade] = useState("College");
  const [previousWork, setPreviousWork] = useState("");
  const [pages, setPages] = useState('1 Page');
  const [essayContent, setEssayContent] = useState("");
  const [subject, setSubject] = useState("");
  const [classUsed, setClassUsed] = useState("");
const [showCopiedMessage, setShowCopiedMessage] = useState(false);
const [generatedPushed, setGeneratedPushed] = useState(false);
  const [knownFacts, setKnownFacts] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");


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
    socket.onmessage = (event) => {
      handleSendMessage(event);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      clearInterval(pingInterval);
    };

    return () => {
      socket.close();
      clearInterval(pingInterval);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(essayContent)
      .then(() => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 1000); // Message disappears after 1 second
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSendMessage = (event) => {
    if (event.data === '{"type":"pong"}') {
      return;
    }
    setGeneratedPushed(false)
    setEssayContent((prev) => {
      return prev + event.data;
    });
    // setIsLoadingScreen(true);
    // setResult((prev) => {
    //   // Retrieve the latest profile data from Firestore
    //   db.collection("profiles")
    //     .doc(profileData?.id)
    //     .get()
    //     .then((doc) => {
    //       if (doc.exists) {
    //         console.log("HERE", profileData, doc);
    //         const latestProfileData = doc.data();
    //         const updatedChatHistory = latestProfileData.chatHistory
    //           ? [...latestProfileData.chatHistory]
    //           : [];
    //         // Update the first element's result with new data
    //         if (updatedChatHistory.length > 0) {
    //           updatedChatHistory[0].result = prev + event.data;
    //         }

    //         // Update Firestore with the new chat history
    //         db.collection("profiles").doc(profileData?.id).update({
    //           chatHistory: updatedChatHistory,
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching latest data: ", error);
    //     });
    // setIsLoadingScreen(false);
    //   // Return the updated result
    //   return prev + event.data;
    // });
  };

  const useCredit = (amount) => {
    const usersRef = db.collection("profiles");
    const userRef = usersRef.doc(profileData.id);
    if (profileData.credits >= 0 && !profileData?.subscribed) {
      userRef.update(
        {
          credits: profileData.credits - amount || profileData.credits - 2,
        },
        { merge: true }
      );
    }
  };

  const refreshBot = () => {
    setGeneratedPushed(false)
    setEssayContent("");
  };

  async function onSubmit(event, value, url, tries) {
    if (generatedPushed) return
    const input = value ? value : animalInput;
    if (profileData.credits > 0 || profileData?.subscribed) {
      if (event) {
        event.preventDefault();
      }
      useCredit();
      // setIsLoadingScreen(true);
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
            action: "Wrote an essay",
          });
          amplitude.track("Wrote an essay", undefined, {
            user_id: profileData?.email,
          });
        }
        // const res = {
        //   result: "",
        //   input: input,
        //   time: new Date().toLocaleString(),
        //   type: subject,
        //   // explanation: JSON.parse(data2.result).explanation,
        // };

        // const question = {
        //   content: "",
        //   role: "assistant",
        // };
        // const resp = {
        //   content: animalInput,
        //   role: "user",
        // };
        // const answersCopy = answers.slice();
        // answersCopy.push(res);

        // if (answersCopy.length > 1) {
        //   answersCopy[answers.length - 1].result = result;
        // }

        // const messageHistoryUpdate = <s,>.slice();

        // messageHistoryUpdate.push(resp);
        // messageHistoryUpdate.push(question);

        // setMessageHistory(messageHistoryUpdate);

        // const userCopy = profileData.chatHistory.slice();
        // userCopy.unshift(res);
        // const docRef = db.collection("profiles").doc(profileData?.id);
        //     console.log("click 4");

        // docRef
        //   .update({ chatHistory: userCopy }, { merge: true })
        //   .then(() => {
        //     console.log("Document successfully updated!");
        //   })
        //   .catch((error) => {
        //     console.error("Error updating document: ", error);
        //   });

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
        console.log(
          `Write me an essay that is ${pages} long about ${subject}. Make it for a ${grade} essay.  Make sure you use proper grammar and spelling. Make sure you write in my own writing style, so it looks like something id write, but use proper grammar as if you were trying to get a 100% on this paper. ${specialInstructions}.`
        );
        setGeneratedPushed(true)
        ws.send(
          JSON.stringify({
            animal: `I am in the ${grade}. Write me an essay that is ${pages} long about ${subject}. Make the first paragraph a convincing hook that 
            will make the reader interested, make the last paragraph gripping and powerful. ${
              Boolean(knownFacts.length) &&
              `Make sure you write in my own writing style, so it looks like 
            something id write, but use proper grammar as if you were trying to get a 100% on this paper.  Here is a sample of my own writing to follow the sample:`
            }  ${specialInstructions}.`,
            history: [],
            url: url,
            model: getModel(),
          })
        );
        setAnimalInput("");
        // setResult("");
        // setIsLoadingScreen(false);

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
          // setResult("");
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


  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          1. What subject should this essay be about? (required)
          <Typography
            variant="caption"
            style={{ display: "block", marginBottom: "10px" }}
          >
            Give the AI a prompt for what you need to write about.
          </Typography>
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          2. What class is this for? (required)
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "10px" }}
        >
          Eg. English / History / etc.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          onChange={(e) => setClassUsed(e.target.value)}
          value={classUsed}
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          3. Copy/paste a previous essay you have written so AI can sound more
          like you. (optional)
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "10px" }}
        >
          This is important so that the essay will be written in your own
          writing style. The AI will make sure to use proper grammar and
          spelling.
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          onChange={(e) => setPreviousWork(e.target.value)}
          value={previousWork}
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          4. Tell me what you know about this subject so I can make sure to
          include it in the essay. (optional)
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "10px" }}
        >
          You can add facts you already know, or think you know (it will be fact
          checked), to be included in the essay.
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          onChange={(e) => setKnownFacts(e.target.value)}
          value={knownFacts}
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
          5. Special instructions (optional)
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "10px" }}
        >
          This is where you can customize the prompt however you like. Like if
          you need a certain writing style, language, citations or anything
          else.
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          onChange={(e) => setSpecialInstructions(e.target.value)}
          value={specialInstructions}
          style={{ marginBottom: "20px" }}
        />

        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel variant="standard" htmlFor="grade-native">
            6. What grade are you in?
          </InputLabel>
          <NativeSelect
            defaultValue={"College"}
            onChange={(e) => setGrade(e.target.value)}
            inputProps={{
              name: "grade",
              id: "grade-native",
            }}
          >
            <option value={"College"}>College</option>
            <option value={"12th Grade"}>12th Grade</option>
            <option value={"11th Grade"}>11th Grade</option>
            <option value={"10th Grade"}>10th Grade</option>
            <option value={"9th Grade"}>9th Grade</option>
            <option value={"8th Grade"}>8th Grade</option>
            <option value={"7th Grade"}>7th Grade</option>
            <option value={"6th Grade"}>6th Grade</option>
            <option value={"5th Grade"}>5th Grade</option>
            <option value={"4th Grade"}>4th Grade</option>
            <option value={"3rd Grade"}>3rd Grade</option>
          </NativeSelect>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel variant="standard" htmlFor="pages-native">
            7. How many pages do you need?
          </InputLabel>
          <NativeSelect
            defaultValue={"1 Page"}
            onChange={(e) => setPages(e.target.value)}
            inputProps={{
              name: "pages",
              id: "pages-native",
            }}
          >
            <option value={"1 Page"}>1 Page</option>
            <option value={"2 Pages"}>2 Pages</option>
            <option value={"3 Pages"}>3 Pages</option>
          </NativeSelect>
        </FormControl>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {Boolean(essayContent?.length) ? (
            <Button
              onClick={refreshBot}
              variant="contained"
              color="secondary"
              style={{ fontWeight: "bold" }}
            >
              Start Over
            </Button>
          ) : (
            <Button
              onClick={(e) => onSubmit(e)}
              variant="contained"
              color="primary"
              disabled={generatedPushed}
              style={{ fontWeight: "bold" }}
            >
              Generate Essay
            </Button>
          )}
        </div>
      </div>
      {!Boolean(essayContent.length) && generatedPushed && (
        <h1>Generating essay...</h1>
      )}
      {Boolean(essayContent.length) && (
        <>
          <h3>Your essay will show below:</h3>
          <div
            style={{
              height: "50vh",
              overflowY: "auto",
              padding: "5px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body1">{essayContent}</Typography>
          </div>
          <Button
            onClick={refreshBot}
            variant="contained"
            color="secondary"
            style={{ fontWeight: "bold" }}
          >
            Start Over
          </Button>
          <Button
            variant="contained"
            onClick={copyToClipboard}
            color="primary"
            style={{ fontWeight: "bold", marginLeft: 16 }}
          >
            Copy
          </Button>
          {showCopiedMessage && (
            <div
              style={{
                bottom: "10px",
                backgroundColor: "black",
                color: "white",
                marginTop: 8,
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Copied to clipboard!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EssayWriter;
