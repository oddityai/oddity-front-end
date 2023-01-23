import React, { useEffect, useState, useRef } from "react";

import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import firebase from "firebase/compat/app";
// import "firebase/compat/storage";
import { Favorite } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { ModalRoot } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PercentIcon from "@mui/icons-material/Percent";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ScienceIcon from "@mui/icons-material/Science";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Nunito } from "@next/font/google";
import EmailIcon from "@mui/icons-material/Email";
import MoodIcon from "@mui/icons-material/Mood";

const nunito = Nunito({ subsets: ["latin"] });
const Buttons = ({ children, handleClick }) => {
  return (
    <div
      className={nunito.className}
      style={{ textAlign: "left", margin: "auto", maxWidth: 500 }}
    >
      <div
        style={{
          border: "1px solid white",
          maxWidth: 800,
          borderRadius: 8,
        }}
      >
        <div style={{ padding: 16 }}>
          <form>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Friendly AI</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This is a fun chatbot so you can talk directly to our AI
                him/her-self about anything.
              </p>
              <Button
                onClick={() => handleClick("chat")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#b58024",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <PsychologyIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Chat with an AI
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Joke writer ai (new)
              </p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This AI will write fresh jokes for you about anything you want!
                Just give me a prompt.
              </p>
              <Button
                onClick={() => handleClick("joke")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#00c3ff",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <MoodIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Generate funny jokes
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Message Replyer (new)
              </p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This AI will help you reply to social media posts, messages or
                even texts!
              </p>
              <Button
                onClick={() => handleClick("reply")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#ff6f00",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <PsychologyIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Generate message replies
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Give Feedback</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                Give this AI feedback so we can improve the app. Want a new AI
                bot? Find a bug? Tell us about it!
              </p>
              <Button
                onClick={() => handleClick("feedback")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#ff4a47",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <EmailIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Talk the to OddityAI Team!
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
