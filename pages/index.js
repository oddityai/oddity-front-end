import { useState, useEffect } from "react";

import App from "./App";
import ReactGA from "react-ga4";
import LogRocket from "logrocket";
import { hotjar } from "react-hotjar";
import Hnujar from "@hotjar/browser";
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const Index = () => {
  useEffect(() => {
    if (window.location.href.includes("oddityai")) {
      // LogRocket.init(process.env.REACT_APP_LOGROCKET_API_KEY);
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY);
      Hotjar.init(3307089, 6);

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
    <>
      <div className={nunito.className}>
        <App />
      </div>
    </>
  );
};

export default Index;
