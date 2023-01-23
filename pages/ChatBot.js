import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubble from "./ChatBubble";
import ImageIcon from "@mui/icons-material/Image";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CachedIcon from "@mui/icons-material/Cached";

import Alert from "@mui/material/Alert";
import { Nunito } from "@next/font/google";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicNoneIcon from "@mui/icons-material/MicNone";
import IconButton from "@mui/material/IconButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import UploadButton from "./UploadButton";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
const startListening = () =>
  SpeechRecognition.startListening({ continuous: true });
const nunito = Nunito({ subsets: ["latin"] });
const appId = "c6a6bc4f-0a1c-46ba-ad66-3322fbcaf51d";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const ChatBot = ({
  error,
  animalInput,
  setAnimalInput,
  onSubmit,
  answers,
  subject,
  isLoading,
  handleChange,
}) => {
  const { user } = useUser();

  const [modalOpen, setIsModalOpen] = useState(false);
  const [showClipboardCopy, setShowClipboardCopy] = useState(false);

  useEffect(() => {
    if (showClipboardCopy) {
      setTimeout(() => {
        setShowClipboardCopy(false);
      }, 2000);
    }
  }, [showClipboardCopy]);

  useEffect(() => {
    var objDiv = document.getElementById("test1");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [answers]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = (e) => {
    e.preventDefault();

    SpeechRecognition.startListening();
  };
  const stopListening = (e) => {
    e.preventDefault();
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    setAnimalInput(transcript);
  }, [transcript]);

  const TYPES = {
    math: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! I am specially designed to answer math questions. I'm in beta but I will try my best. My other AIs work better.`,
    history: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! I am specially designed to help you with your history homework. Ask me about anything that ever happened!`,
    english: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! I am specially designed to help you with English homework. Ask me to summarize a book or write a song/poem. I can tell you about anything from any book, movie or show!`,
    chat: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! I'm a conversational AI. What do you want to talk about?`,
    science: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! I am specially designed to help with science work. Ask me about anything from atoms and cells to the moon and the stars! `,
    feedback: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! We would love to hear your feedback so we can improve! What kinds of AI bot should we make next?`,
    reply: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! Type or paste a message in the chat and I will give you a way to reply to it.`,
    joke: `Hi ${
      user?.given_name ? user?.given_name : ""
    }! Tell me what you want me to make a joke about.`,
  };

  const fallbackCopyTextToClipboard = (text) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  return (
    <div
      style={{
        border: "1px solid silver",
        height: "55vh",
        overflowX: "hidden",

        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div id="test1" style={{ height: "40vh", overflowY: "scroll" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 12,
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <div
              style={{
                backgroundColor: "#304FFD",
                borderRadius: "100%",
                padding: 10,
                margin: 8,
                height: 25,
                alignItems: "center",
                alignContent: "center",
                justifyItems: "center",
                justifyContent: "center",
                width: 25,
              }}
            >
              <SmartToyIcon style={{ color: "white" }} />
            </div>
            <div
              style={{
                backgroundColor: "#304FFD",
                borderRadius: 16,
                marginLeft: 16,
                maxWidth: "80%",
                width: "auto",
              }}
            >
              <p
                className={nunito.className}
                style={{
                  color: "white",
                  fontWeight: "none",
                  padding: 5,
                  margin: 8,
                  fontSize: 15,
                }}
              >
                {TYPES[subject]}
              </p>
            </div>
          </div>
          {Boolean(answers?.length) && (
            <div>
              {answers?.map((answer, i) => {
                return (
                  <div
                    id={i}
                    style={{
                      marginLeft: "5%",
                      marginRight: "5%",
                    }}
                  >
                    <div style={{ padding: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "right",
                          justifyContent: "right",
                          justifyItems: "right",
                          alignItems: "right",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#E8E9EB",
                            borderRadius: 16,
                            marginRight: 16,
                            maxWidth: "80%",
                            width: "auto",
                          }}
                        >
                          {answer.url ? (
                            <img style={{ width: "80%" }} src={answer.url} />
                          ) : (
                            <p
                              className={nunito.className}
                              style={{
                                color: "black",
                                fontWeight: "none",
                                padding: 5,
                                margin: 8,
                                fontSize: 15,
                              }}
                            >
                              {answer.input}
                            </p>
                          )}
                        </div>
                        <div
                          style={{
                            backgroundColor: "#E8E9EB",
                            borderRadius: "100%",
                            padding: 10,
                            height: 25,
                            alignItems: "center",
                            alignContent: "center",
                            justifyItems: "center",
                            justifyContent: "center",
                            width: 25,
                          }}
                        >
                          <p
                            className={nunito.className}
                            style={{
                              color: "black",
                              fontSize: 12,
                              marginRight: 3,
                              marginTop: 6,
                              fontWeight: "bold",
                            }}
                          >
                            YOU
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 12,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#304FFD",
                            borderRadius: "100%",
                            padding: 10,
                            height: 25,
                            alignItems: "center",
                            alignContent: "center",
                            justifyItems: "center",
                            justifyContent: "center",
                            width: 25,
                          }}
                        >
                          <SmartToyIcon style={{ color: "white" }} />
                        </div>
                        <div
                          style={{
                            backgroundColor: "#304FFD",
                            borderRadius: 16,
                            marginLeft: 16,
                            maxWidth: "80%",
                            width: "auto",
                          }}
                        >
                          <p
                            className={nunito.className}
                            style={{
                              color: "white",
                              fontWeight: "none",
                              padding: 5,
                              margin: 8,
                              fontSize: 15,
                            }}
                          >
                            {answer.result}
                            {(i === 2 ||
                              i === 6 ||
                              i === 12 ||
                              i === 25 ||
                              i === 50) && (
                              <>
                                <br />
                                <br />
                                Please help Oddity by telling your friends by
                                telling them about us!
                              </>
                            )}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              margin: 16,
                            }}
                          >
                            {showClipboardCopy && (
                              <Alert
                                className={nunito.className}
                                severity="success"
                              >
                                Copied to clipboard!
                              </Alert>
                            )}
                            <IconButton
                              onClick={() => {
                                copyToClipboard(answer.result);
                                setShowClipboardCopy(true);
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <ContentCopyIcon
                                  style={{ color: "white", height: 20 }}
                                />
                                <p
                                  className={nunito.className}
                                  style={{
                                    color: "white",
                                    fontSize: 12,
                                    marginTop: 4,
                                  }}
                                >
                                  Copy
                                </p>
                              </div>
                            </IconButton>

                            <IconButton
                              onClick={() =>
                                onSubmit(
                                  null,
                                  answer.input,
                                  answer.url,
                                  answer.type
                                )
                              }
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginLeft: 16,
                                  flexDirection: "column",
                                }}
                              >
                                <CachedIcon
                                  style={{ color: "white", height: 20 }}
                                />
                                <p
                                  className={nunito.className}
                                  style={{
                                    color: "white",
                                    fontSize: 12,
                                    marginTop: 4,
                                  }}
                                >
                                  Redo
                                </p>
                              </div>{" "}
                            </IconButton>
                          </div>
                        </div>
                      </div>
                      {/* <div style={{ display: "flex", flexDirection: "column" }}>
                          <h5>Additional questions you can ask are:</h5>
                          <div
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => {
                              onSubmit(null, answer.explanation[0]);
                            }}
                          >
                            {answer.explanation[0]}
                          </div>
                          <br />
                          <div
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => {
                              onSubmit(null, answer.explanation[1]);
                            }}
                          >
                            {answer.explanation[1]}
                          </div>
                        </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            onSubmit(e);
            resetTranscript();
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              position: "relative",
            }}
          >
            {Boolean(isLoading) && <ChatBubble />}
            <TextField
              value={animalInput}
              multiline
              onKeyDown={(e) => {
                if (event.which === 13) {
                  onSubmit(e);
                }
              }}
              onChange={(e) => setAnimalInput(e.target.value)}
              placeholder={
                answers?.length
                  ? "Ask another question. It's free!"
                  : "Ask your question"
              }
              style={{
                width: "100%",
                fontSize: 14,
                border: "none",
                marginLeft: 10,
                padding: "15px 0",
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            {listening ? (
              <IconButton
                onClick={stopListening}
                color="primary"
                style={{ height: 50, marginTop: 25 }}
                aria-label="upload picture"
                component="label"
              >
                <KeyboardVoiceIcon style={{ color: "blue" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={startListening}
                color="gray"
                style={{ height: 50, marginTop: 25 }}
                aria-label="upload picture"
                component="label"
              >
                <MicNoneIcon />
              </IconButton>
            )}
            {/* <IconButton
              onClick={() => setIsModalOpen(true)}
              color="gray"
              style={{ height: 50, marginTop: 25 }}
              aria-label="upload picture"
              component="label"
            >
              <ImageIcon />
            </IconButton> */}

            <button
              style={{
                fontWeight: 500,
                color: "white",
                borderRadius: 42,
                border: "none",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
                height: 40,
                backgroundColor:
                  !animalInput?.length || isLoading ? "silver" : "#0a99f2",
                width: 120,
                fontFamily: "'ColfaxAI', sans-serif",
              }}
              id="submit-button"
              type="submit"
              disabled={!animalInput?.length || isLoading}
            >
              Send
            </button>
          </div>
          {/* <p className={nunito.className}  style={{ textAlign: "center", color: "red" }}>{error}</p> */}
        </form>
        <UploadButton
          modalOpen={modalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ChatBot;
