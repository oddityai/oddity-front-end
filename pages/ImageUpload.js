import React, { useEffect, useState, useRef } from "react";

import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Favorite } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { ModalRoot } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Nunito } from "@next/font/google";
import { firebaseApp } from "../firebase";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";

const nunito = Nunito({ subsets: ["latin"] });

const ImageUploadModal = ({
  subject,
  error,
  isModalOpen,
  isProcessing,
  rawText,
  results,
  input,
  step,
  url,
  handleInputClick,
  setIsModalOpen,
}) => {
  const steps = [
    "Scanning... (Step 1/5)",
    "Extracting text... (Step 2/5)",
    "Identifying questions... (Step 3/5)",
    "Answering... (Step 4/5)",
    "Complete (Step 5/5)",
  ];

  return (
    <>
      <Dialog scroll="paper" open={isModalOpen}>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description">
            <div
              onClick={() => {
                !isProcessing && setIsModalOpen(false);
              }}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                padding: 16,
              }}
            >
              <CloseIcon />
            </div>
            <div
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <br />
              {step === 1 && (
                <img src={url} style={{ width: "80%", marginLeft: "10%" }} />
              )}
              {step === 2 && (
                <p style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                  Picture-to-text complete: <mark>{input}</mark>
                </p>
              )}
              {step === 3 && (
                <p style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                  Questions Identified: {rawText}
                </p>
              )}
              {step === 4 &&
                results.map((result, i) => {
                  return (
                    <p
                      style={{
                        color: "gray",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {i + 1}. {result.result}
                    </p>
                  );
                })}
              {step === 4 && (
                <img src={url} style={{ width: "80%", marginLeft: "10%" }} />
              )}
              {error && (
                <>
                  <p style={{ color: "red", fontSize: 16 }}>{error}</p>
                  <p style={{ color: "red", fontSize: 16 }}>
                    Try: Upload only half a page at a time
                  </p>
                  <p style={{ color: "red", fontSize: 16 }}>
                    Make sure the image is clear, it's technology not magic.
                  </p>
                </>
              )}
              <Button
                style={{
                  zIndex: 10,
                  backgroundColor: "#304FFD",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
                onClick={() => handleInputClick("reply")}
              >
                {steps[step]}
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* <p style={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}>
          Please, only upload ONE question at a time.
        </p>
        <br />
        <img
          src="/check-mark.png"
          style={{ width: "80%", marginLeft: "10%" }}
        />

        <p style={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}>
          Do not try to upload an entire page.
        </p>
        <br />
        <img src="/x-mark.png" style={{ width: "40%", marginLeft: "30%" }} />
        <br />
        <br /> */}
    </>
  );
};

export default ImageUploadModal;
