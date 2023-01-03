import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });
const Contact = () => {
  const getWindowSize = () => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div className={nunito.className}>
      <AppBar />
      <div>
        <div
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            fontSize: 18,
          }}
        >
          <div
            style={{
              padding: 16,
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600 }}>
              Thank you for visiting OddityAI!
            </span>
            <br />
            <br />
            We hope that our advanced artificial intelligence has been able to
            assist you with all of your homework needs.
            <br />
            <br />
            If you have any questions, concerns or feedback, we would love to
            hear from you. You can reach us through our Facebook{" "}
            <span
              style={{ color: "#0a99f2", cursor: "pointer" }}
              onClick={() => {
                window.open(
                  "https://www.facebook.com/profile.php?id=100088926106665"
                );
              }}
            >
              here
            </span>{" "}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: windowSize > 500 ? "50%" : "90%",
              maxWidth: 400,
            }}
          >
            <img
              src="/contact.png"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
