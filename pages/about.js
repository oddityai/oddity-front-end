import AppBar from "./AppBar";
import { Nunito } from "@next/font/google";

import LogRocket from "logrocket";
import LogRocket from "logrocket";

const nunito = Nunito({ subsets: ["latin"] });
const About = () => {
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (window.location.href.includes("oddityai")) {
      LogRocket.init(process.env.REACT_APP_LOGROCKET_API_KEY);
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
      // the below i to identify users when i add auth0
      // LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
      //   name: "James Morrison",
      //   email: "jamesmorrison@example.com",
      //   // Add your own custom user variables here, ie:
      //   subscriptionType: "pro",
      // });
    }
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
              width: "50%",
              maxWidth: 400,
            }}
          >
            <span style={{ fontWeight: 600 }}>Thank you for visiti</span>
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
              width: "50%",
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
export default About;
