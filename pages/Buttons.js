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
import EmailIcon from '@mui/icons-material/Email';
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
            <div style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
              <p
                className={nunito.className}
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                English AI
              </p>
              <p style={{ fontSize: 12, color: "gray" }}>
                Here we can summarize books, write poems/songs or answer
                questions about characters. Each answer is unique so nobody will
                have the same answers as you.
              </p>
              <Button
                onClick={() => handleClick("english")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#304FFD",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <MenuBookIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  English/Language Answers
                </span>
              </Button>
            </div>


            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Friendly AI</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This is a fun chatbot so you can talk directly to our AI
                him/her-self.
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
                History / Social Studies AI
              </p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This AI can answer any questions about anything that ever
                happened in history. Each answer is unique.
              </p>
              <Button
                onClick={() => handleClick("history")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#e833bb",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <HistoryEduIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  History Answers
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Science AI</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This Science AI is programmed to answer anything you could ever
                want to know about science.
              </p>
              <Button
                onClick={() => handleClick("science")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#24b557",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <ScienceIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Science Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Math AI (beta)</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                This AI will try its best to answer math questions. Sometimes a
                calculator is better.
              </p>
              <Button
                onClick={() => handleClick("math")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#a334e3",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <PercentIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Math Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Give Feedback</p>
              <p style={{ fontSize: 12, color: "gray" }}>
                Give this AI feedback so we can improve the app. Want a new feature? Find a bug? Tell us about it!
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
