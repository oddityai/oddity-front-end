import React, { useEffect, useState, useRef } from "react";

import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Favorite } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
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

const nunito = Nunito({ subsets: ["latin"] });

export const storage = firebaseApp?.storage();

const ImageUploadModal = ({ handleChange, children, onSubmit, isLoading }) => {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [file, setFile] = useState({});
  const [bio, setBio] = useState("");
  const [modalOpen, setIsModalOpen] = useState(false);

  function uploadFile(e, type) {
    setIsModalOpen(false);
    if (e.target.files[0]) setFile({ file: e.target.files[0], type: type });
  }

  const generateFirebaseUrl = async () => {
    const path = `/images/${file.file.name}`;
    const ref = storage.ref(path);

    await ref.put(file.file);
    const url = await ref.getDownloadURL();

    handleChange(url, file.type);
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
    onSubmit(null, bio, null, "bio");
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog
        onClose={() => {
          !isLoading && setIsModalOpen(false);
        }}
        scroll="paper"
        open={modalOpen}
      >
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <div
              onClick={() => {
                !isLoading && setIsModalOpen(false);
              }}
              style={{
                display: "flex",
                justifyContent: "flex-end",
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
              <p style={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}>
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
              <img
                src="/x-mark.png"
                style={{ width: "40%", marginLeft: "30%" }}
              />
              <br />
              <br />

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
                Choose Image
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <IconButton
        onClick={() => setIsModalOpen(true)}
        color="gray"
        style={{ height: 50, marginTop: 25 }}
        aria-label="upload picture"
        component="label"
      >
        <ImageIcon />
      </IconButton>
      <>
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
    </>
  );
};

export default ImageUploadModal;
