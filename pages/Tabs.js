import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Buttons from "./Buttons";
import Buttons2 from "./Buttons2";
import { Nunito } from "@next/font/google";
import { loadStripe } from "@stripe/stripe-js";

const nunito = Nunito({ subsets: ["latin"] });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ handleClick, answers, profileData }) {
  const [value, setValue] = React.useState(0);
  const [referralCode, setReferralCode] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitReferralCode = () => {
    console.log(referralCode);
    setReferralCode("");
  };

  return (
    <Box className={nunito.className} sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          className={nunito.className}
          aria-label="basic tabs example"
        >
          <Tab
            className={nunito.className}
            label="HOMEWORK BOTS"
            {...a11yProps(0)}
          />
          <Tab
            className={nunito.className}
            label="fun BOTS"
            {...a11yProps(1)}
          />
          <Tab
            className={nunito.className}
            label="Chat History"
            {...a11yProps(2)}
          />

          {/* <Tab
            className={nunito.className}
            label="Free Credits"
            {...a11yProps(2)}
          />
          <Tab
            className={nunito.className}
            label="Buy Credits"
            {...a11yProps(4)}
          /> */}
          {/* <Tab label="Oddity Feed" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>
          <Buttons handleClick={handleClick} />
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose a fun/experimental AI bot to play with. Want a new AI bot?
            Suggest one to us using the Feedback bot below.
          </h3>
          <Buttons2 handleClick={handleClick} />
        </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Here you can see a history of all your chats with our AI Bots.
          </h3>
          {profileData?.chatHistory?.map((answer) => {
            return (
              <>
                <div style={{ border: "1px solid silver", margin: 8 }}>
                  <div style={{ padding: 8 }}>
                    <div>Question: {answer.input}</div>
                    <br />
                    <div>Answer: {answer.result}</div>
                  </div>
                </div>
                <br />
                <br />
              </>
            );
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h3 className={nunito.className} style={{ fontSize: 18 }}>
          You currently have <bold>(25)</bold> credits remaining.
        </h3>
        <div style={{ backgroundColor: "#f5f5f5", borderRadius: 8 }}>
          <div style={{ padding: 8 }}>
            <h2
              className={nunito.className}
              style={{ fontSize: 22, color: "#ff6f00" }}
            >
              Get 50 free credits for inviting your friends!
            </h2>
            <h3 className={nunito.className}>
              If someone signs up using your referral code, you both get 50
              extra credits for free.
            </h3>
            <h3 className={nunito.className}>
              Your referral code is:{" "}
              <span style={{ color: "#24b557" }}>TRI-3948</span>
            </h3>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#f5f5f5", borderRadius: 8, marginTop: 16 }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>
              Have a referral code? <br /> Enter it below to get 25 credits
              instantly!
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                style={{
                  width: 150,
                  fontSize: 14,
                  border: "none",
                  marginLeft: 10,
                  backgroundColor: "white",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Referral code"
              />
              <Button
                onClick={handleSubmitReferralCode}
                style={{
                  zIndex: 10,
                  backgroundColor: "#ff4a47",
                  padding: 14,
                  textTransform: "none",
                  marginLeft: 8,
                  color: "white",
                  width: 150,
                  height: 50,
                }}
              >
                Get free credits!
              </Button>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Make homework a breeze with OddityAI Credits
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                margin: "16px 0px",
                width: "30%",
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                minWidth: 200,
              }}
            >
              <div style={{ padding: 8 }}>
                <h3 className={nunito.className}>Free</h3>
                <hr s />
                <h3 className={nunito.className}>Referral / 25 free credits</h3>
                <hr s />
                <h4>Try for free</h4>
                <p className={nunito.className}>
                  Get 25 free credits per referral
                </p>
                <p className={nunito.className}>
                  Get 25 free credits for signing up
                </p>
                {/* <form action="/api/checkout_sessions?user_id=123" method="POST">
                  <section>
                    <button disabled type="submit" role="link">
                      Free
                    </button>
                  </section>
                  <style jsx>
                    {`
                      section {
                        display: flex;
                        flex-direction: column;
                        border-radius: 6px;
                        justify-content: space-between;
                      }
                      button {
                        margin-top: 8px;
                        height: 36px;
                        hover: none;
                        cursor: none;
                        background: gray;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </form> */}
              </div>
            </div>
            <div
              style={{
                margin: "16px 0px",
                width: "30%",
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                minWidth: 200,
              }}
            >
              <div style={{ padding: 8 }}>
                <h3 className={nunito.className}>Starter Pack</h3>
                <hr s />
                <h3 className={nunito.className}>$10 / 200 credits</h3>
                <hr s />
                <h4>200 credits</h4>
                <p className={nunito.className}>Enough for a few months</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
                {/* <form action="/api/checkout_sessions?user_id=123" method="POST">
                  <section>
                    <button type="submit" role="link">
                      Buy Now
                    </button>
                  </section>
                  <style jsx>
                    {`
                      section {
                        display: flex;
                        flex-direction: column;
                        border-radius: 6px;
                        justify-content: space-between;
                      }
                      button {
                        margin-top: 8px;
                        height: 36px;
                        background: #556cd6;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </form> */}
              </div>
            </div>
            <div
              style={{
                margin: "16px 0px",
                width: "30%",
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                minWidth: 200,
              }}
            >
              <div style={{ padding: 8 }}>
                <h3 className={nunito.className}>Best Deal</h3>
                <hr />
                <h3 className={nunito.className}>$30 / 1000 credits</h3>
                <hr />
                <h4>1000 credits</h4>
                <p className={nunito.className}>Enough for a year</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
                {/* <form action="/api/checkout_sessions?user_id=123" method="POST">
                  <section>
                    <button type="submit" role="link">
                      Buy Now
                    </button>
                  </section>
                  <style jsx>
                    {`
                      section {
                        display: flex;
                        flex-direction: column;
                        border-radius: 6px;
                        justify-content: space-between;
                      }
                      button {
                        margin-top: 8px;
                        height: 36px;
                        background: #556cd6;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </form> */}
              </div>
            </div>
          </div>
        </>
      </TabPanel>
    </Box>
  );
}