import React, { useEffect, useState, useContext } from "react";
import AppBar from "./AppBar";
import { auth } from "../firebase";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";
import PricingContent from "./PricingContent";

const nunito = Nunito({ subsets: ["latin"] });

const PricingPage = () => {
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser._delegate);
          if (authUser._delegate) {      
            db.collection("profiles")
        .where("email", "==", authUser?._delegate?.email)
        .onSnapshot((snapshot) => {
          const userData = snapshot.docs.map((doc) => {
            return { ...doc.data(), ...{ id: doc.id } };
          })[0];
          if (userData) {
            console.log("DOING THIS", {userData})
            setProfileData(userData);

          }
        });
      }
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, [auth]);
  return (
    <div className={nunito.className}>
      <AppBar />
      <div
        style={{
          margin: "16px auto",
          width: "30%",
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          minWidth: 200,
          boxShadow: "5px 5px 10px gray",
        }}
      ></div>

      <PricingContent />
    </div>
  );
};

export default PricingPage;
