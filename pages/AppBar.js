import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function ButtonAppBar() {
  return (
    <div
      className={nunito.className}
      style={{
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <div
        style={{
          padding: 16,
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img style={{ height: 30, marginRight: 8 }} src="/logo.png" />
          <div>OddityAI.com</div>
        </div>
      </div>
    </div>
  );
}
