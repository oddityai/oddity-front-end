import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubble from "./ChatBubble";
import { Nunito } from "@next/font/google";
const nunito = Nunito({ subsets: ["latin"] });

const ChatBot = ({
  error,
  animalInput,
  setAnimalInput,
  onSubmit,
  answers,
  subject,
  isLoading,
}) => {
  useEffect(() => {
    var objDiv = document.getElementById("test1");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [answers]);

  const TYPES = {
    math: "I am specially designed to answer math questions. I'm in beta but I will try my best. My other AIs work better.",
    history:
      "I am specially designed to help you with your history homework. Ask me about anything that ever happened!",
    english:
      "I am specially designed to help you with English homework. Ask me to summarize a book or write a song/poem. I can tell you about anything from any book, movie or show!",
    chat: "I'm a conversational AI. What do you want to talk about?",
    science:
      "I am specially designed to help with science work. Ask me about anything from atoms and cells to the moon and the stars! ",
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
        <div id="test1" style={{ height: "45vh", overflowY: "scroll" }}>
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
        <form onSubmit={onSubmit}>
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
                backgroundColor: animalInput?.length ? "#0a99f2" : "silver",
                width: 120,
                fontFamily: "'ColfaxAI', sans-serif",
              }}
              id="submit-button"
              type="submit"
              disabled={!animalInput?.length}
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
