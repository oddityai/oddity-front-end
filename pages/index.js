import { useState, useEffect } from "react";

import App from "./App";
import ReactGA from "react-ga4";
import LogRocket from "logrocket";
import { hotjar } from "react-hotjar";

const Index = () => {
  useEffect(() => {
    hotjar.initialize("3307089", "6");
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

  return <App />;
};

export default Index;
