import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import EmailIcon from '@mui/icons-material/Email'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PercentIcon from '@mui/icons-material/Percent'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ScienceIcon from '@mui/icons-material/Science'
import Button from '@mui/material/Button'
import { Nunito } from '@next/font/google'
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import BrushIcon from "@mui/icons-material/Brush";

const nunito = Nunito({ subsets: ['latin'] })
const Buttons = ({ children, handleClick, handleFeedback }) => {
  return (
    <div
      className={nunito.className}
      style={{
        textAlign: "left",
        margin: "auto",
        maxWidth: 600,
      }}
    >
      <div
        style={{
          border: "1px solid white",
          maxWidth: 800,
          borderRadius: 8,
        }}
      >
        <div style={{ padding: 16 }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginBottom: 16,
                padding: 16,
                backgroundColor: "#f5f5f5",
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>General Genius</p>
              <p style={{ fontSize: 12, color: "black" }}>
                A GPT 4 enabled broad bot that is educational focused but
                without a target domain.
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
                  General Genius
                </span>
              </Button>
            </div>
            <div style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
              <p
                className={nunito.className}
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                English AI
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Get help with English homework, including book summaries, poem
                and song writing, and character analysis. Unique and
                personalized answers for every student.
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
            {/* <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p
                className={nunito.className}
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                Essay/Book Report AI
              </p>

              <p style={{ fontSize: 12, color: "black" }}>
                Need help writing an essay or a creative story? Just give a
                prompt and this assistant will craft a unique piece for you.
              </p>
              <Button
                onClick={() => handleClick("prompt")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#00c3ff",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <CreateIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Essay Writer
                </span>
              </Button>
            </div> */}
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                History & Social Studies AI
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                This AI provides answers to any history or social studies
                question, offering unique perspectives on past events.
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
              <p style={{ fontSize: 12, color: "black" }}>
                Your go-to resource for all science-related queries, from basic
                concepts to complex theories.
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
              <p style={{ fontSize: 16, fontWeight: 600 }}>Math AI</p>
              <p style={{ fontSize: 12, color: "black" }}>
                Tackles all kinds of math problems, from simple calculations to
                advanced mathematics.{" "}
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
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Engineering & Computer Science
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Offers help with computer science and programming concepts.
                Whether you're learning to code or tackling complex algorithms,
                this AI is your personal coding coach.
              </p>
              <Button
                onClick={() => handleClick("engineering")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#00bcd4",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <EngineeringIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Engineering Answers
                </span>
              </Button>
            </div>{" "}
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Health Science AI</p>
              <p style={{ fontSize: 12, color: "black" }}>
                Your resource for understanding the complexities of health
                sciences. From anatomy to medical research, get reliable and
                informative answers.
              </p>
              <Button
                onClick={() => handleClick("health")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#cddc39",
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {children || <LocalHospitalIcon style={{ color: "white" }} />}{" "}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Health Science Answers
                </span>
              </Button>
            </div>{" "}
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Business & Economics Analyst
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Expert insights into business strategies and economic theories,
                aiding students and entrepreneurs.
              </p>
              <Button
                onClick={() => handleClick("business")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#ff9800", // Orange color
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {/* Icon can be changed */}
                {children || <AttachMoneyIcon style={{ color: "white" }} />}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Business & Economics Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Psychology & Social Science Guide
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Dive into psychological theories and social science concepts
                with detailed explanations.
              </p>
              <Button
                onClick={() => handleClick("psychology")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#673ab7", // Deep purple color
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {/* Icon can be changed */}
                {children || <PsychologyAltIcon style={{ color: "white" }} />}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Psychology & Social Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Law & Political Science Consultant
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Guidance on legal theories and political science, ideal for law
                students and enthusiasts.
              </p>
              <Button
                onClick={() => handleClick("law")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#3f51b5", // Indigo color
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {/* Icon can be changed */}
                {children || <GavelIcon style={{ color: "white" }} />}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Law & Political Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: "#f5f5f5" }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Arts & Design Mentor
              </p>
              <p style={{ fontSize: 12, color: "black" }}>
                Creative inspiration and practical advice for aspiring artists
                and designers in various fields.
              </p>
              <Button
                onClick={() => handleClick("art")}
                style={{
                  zIndex: 10,
                  backgroundColor: "#9c27b0", // Purple color
                  padding: 14,
                  marginBottom: 16,
                  color: "white",
                  width: "100%",
                }}
              >
                {/* Icon can be changed */}
                {children || <BrushIcon style={{ color: "white" }} />}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Art & Design Answers
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Buttons
