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
    <Box className={nunito.className} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SmartToyIcon />
          </IconButton>
          <Typography
            className={nunito.className}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            OddityAI.com
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
