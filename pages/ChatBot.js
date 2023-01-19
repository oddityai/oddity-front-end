import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubble from "./ChatBubble";
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

  console.log({ user });

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
    math: `Hi ${user.given_name}! You can type below, upload a screenshot of the question or use the voice-to-text option to talk to me. I am specially designed to answer math questions. I'm in beta but I will try my best. My other AIs work better.`,
    history: `Hi ${user.given_name}! You can type below, upload a screenshot of the question or use the voice-to-text option to talk to me. I am specially designed to help you with your history homework. Ask me about anything that ever happened!`,
    english: `Hi ${user.given_name}! You can type below, upload a screenshot of the question or use the voice-to-text option to talk to me. I am specially designed to help you with English homework. Ask me to summarize a book or write a song/poem. I can tell you about anything from any book, movie or show!`,
    chat: `I'm a conversational AI. You can type below or use the voice-to-text feature. What do you want to talk about?`,
    science: `Hi ${user.given_name}! You can type below, upload a screenshot of the question or use the voice-to-text option to talk to me. I am specially designed to help with science work. Ask me about anything from atoms and cells to the moon and the stars! `,
    feedback: `Hi ${user.given_name}! You can type below, upload a screenshot of the question or use the voice-to-text option to talk to me. We would love to hear your feedback so we can improve! What kinds of AI bot should we make next?`,
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
                style={{
                  color: "white",
                  fontWeight: "none",
                  padding: 5,
                  margin: 8,
                  fontSize: 15,
                }}
                className={nunito.className}
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
                            style={{
                              color: "white",
                              fontWeight: "none",
                              padding: 5,
                              margin: 8,
                              fontSize: 15,
                            }}
                            className={nunito.className}
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
                                Keep OddityAI free by telling your friends about
                                us!
                              </>
                            )}
                          </p>
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
            {console.log({ isLoading })}
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
              size="100"
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
            <br />
            <UploadButton isLoading={isLoading} handleChange={handleChange} />
            <br />
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
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
