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

export const storage = firebaseApp?.storage();

const ImageUploadModal = ({
  handleChange,
  children,
  onSubmit,
  isLoading,
  subject,
}) => {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [file, setFile] = useState({});
  const [bio, setBio] = useState("");
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [results, setResults] = useState();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function uploadFile(e, type) {
    if (e.target.files[0]) setFile({ file: e.target.files[0], type: type });
  }

  const generateFirebaseUrl = async () => {
    setStep(0);
    setError("");
    console.log(1);
    const path = `/images/${file.file.name}`;
    const ref = storage.ref(path);
    console.log(2);
    setIsModalOpen(true);
    setIsProcessing(true);
    await ref.put(file.file);
    const url = await ref.getDownloadURL();
    console.log("url: ", url);
    console.log("url: ", btoa(url));
    setUrl(url);
    setStep(1);
    fetch(`https://oddity-api.herokuapp.com/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        console.log({ res });
        const input = res.description;
        console.log(input);
        setInput(input);
        setStep(2);
        try {
          const response = await fetch("/api/page", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              animal: `Extract the questions from this text and return them as an array of strings: ${input}  {}. Return the data in an array of strings as a string so i can json.parse it`,
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
          //   if (response.status !== 200) {
          //     throw (
          //       data.error ||
          //       new Error(`Request failed with status ${response.status}`)
          //     );
          //   }
          const result = JSON.parse(data.result);
          setStep(3);
          setRawText(data.result);
          console.log(3);
          const apiCalls = result.map((endpoint) => {
            return new Promise((resolve, reject) => {
              fetch("/api/page", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  animal: `Answer this question: ${endpoint}. ${
                    subject === "math" && "Use deductive reasoning."
                  }`,
                }),
              })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
            });
          });

          Promise.all(apiCalls)
            .then((results) => {
              console.log({ results });
              setStep(4);
              setResults(results);
            })
            .catch((error) => {
              // handle the error
              console.log({ error });
            });

          setIsProcessing(false);
          console.log({ result });
        } catch (error) {
          setIsProcessing(false);
          setError(
            "Image either unclear or too large. Please make sure you take a good quality picture."
          );
          setStep(1);
          console.log({ error });
        }
      });
    setFile(null);
  };

  useEffect(() => {
    if (file?.file) {
      generateFirebaseUrl(file.type);
    }
  }, [file]);

  const handleInputClick = (type) => {
    inputRef.current.click();
  };

  const handleInputClick2 = (type) => {
    inputRef2.current.click();
  };

  const handleBioClick = () => {
    if (!bio.length) {
      return;
    }
  };

  const steps = [
    "Scanning... (Step 1/5)",
    "Extracting text... (Step 2/5)",
    "Identifying questions... (Step 3/5)",
    "Answering... (Step 4/5)",
    "Complete (Step 5/5)",
  ];

  return (
    <>
      <IconButton
        onClick={() => handleInputClick("reply")}
        color="gray"
        aria-label="upload picture"
        component="label"
      >
        <ImageIcon />
      </IconButton>

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
      <form onSubmit={generateFirebaseUrl}>
        <input
          style={{ display: "hidden", height: 0, width: 0 }}
          ref={inputRef}
          type="file"
          onChange={(e) => uploadFile(e, "reply")}
          accept="image/*"
        />
        <input
          style={{ display: "hidden", height: 0, width: 0 }}
          ref={inputRef2}
          type="file"
          onChange={(e) => uploadFile(e, "first")}
          accept="image/*"
        />
      </form>
    </>
  );
};

export default ImageUploadModal;
