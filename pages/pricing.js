import React, { useEffect, useState, useContext } from "react";
import AppBar from "./AppBar";
import { auth } from "../firebase";
import { Nunito } from "@next/font/google";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";

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
      <h2 style={{textAlign: 'center', margin: '50px 0'}}>Subscribe now and never worry about homework again!</h2>
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

      {profileData?.subscribed ? (
        <div
          style={{
            margin: "16px auto",
            width: "30%",
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            minWidth: 200,
            boxShadow: "5px 5px 10px gray",
          }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>You are subscribed!</h3>
            <hr />
            <h3 className={nunito.className}>$9.99 / Month</h3>
            <hr />
            <h4>
              If you want to cancel your subscription - please email
              support@oddityai.com and include your accounts email address.
            </h4>
            {/* <p className={nunito.className}>Enough for a few months</p> */}
            <p className={nunito.className}>
              We are working on a self-cancel, it will be available soon.
            </p>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "row"], // Column on mobile, row on desktop
            justifyContent: "center",
            alignItems: "center",
            gap: 2, // Spacing between boxes
          }}
        >
          <Box
            sx={{
              width: ["80%", "25%"], // Full width on mobile, 30% on desktop
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              boxShadow: "5px 5px 10px gray",
              padding: 2,
              margin: "auto",
            }}
          >
            <div style={{ padding: 8 }}>
              <h3 className={nunito.className}>Free Trial</h3>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Our GPT-4 powered bots provide accurate answers at half the cost
                of ChatGPT.
              </p>
              <hr />
              <h3 className={nunito.className}>Free</h3>
              <hr />
              <h4>10 credits</h4>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Uses GPT-4
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Image Uploading
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Never expire
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                5 Questions
              </p>
              <form>
                <section>
                  <button
                    disabled
                    style={{ backgroundColor: "silver" }}
                    type="submit"
                    role="link"
                  >
                    Your current plan
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
                      background: #007bff;
                      border-radius: 4px;
                      color: white;
                      border: 0;
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.5s ease;
                      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                    }
                    button:hover {
                      opacity: 0.8;
                    }
                  `}
                </style>
              </form>
            </div>
          </Box>
          <Box
            sx={{
              width: ["80%", "25%"], // Full width on mobile, 30% on desktop
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              boxShadow: "5px 5px 10px gray",
              padding: 2,
              margin: "auto",
            }}
          >
            <div style={{ padding: 8 }}>
              <h3 className={nunito.className}>50 Credits</h3>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Our GPT-4 powered bots provide accurate answers at half the cost
                of ChatGPT.
              </p>
              <hr />
              <h3 className={nunito.className}>$0.99</h3>
              <hr />
              <h4>50 credits</h4>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Uses GPT-4
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                50 Questions or image uploads
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Never expire
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Usable on any current/future AI bots
              </p>
              {profileData?.id ? (
                <form
                  action={`/api/checkout_sessions?user_id=${profileData?.id}`}
                  method="POST"
                >
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
                        background: #007bff;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.5s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </form>
              ) : (
                <>
                  <Link
                    className={nunito.className}
                    style={{
                      textDecoration: "none",
                      padding: 8,
                      borderRadius: 4,
                      color: "#0057be",
                    }}
                    href="/signup"
                  >
                    <section>
                      <button type="submit" role="link">
                        Sign up
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
                          background: #007bff;
                          border-radius: 4px;
                          color: white;
                          border: 0;
                          font-weight: 600;
                          cursor: pointer;
                          transition: all 0.5s ease;
                          box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                        }
                        button:hover {
                          opacity: 0.8;
                        }
                      `}
                    </style>
                  </Link>
                </>
              )}
            </div>
          </Box>
          <Box
            sx={{
              width: ["80%", "25%"], // Full width on mobile, 30% on desktop
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              boxShadow: "5px 5px 10px gray",
              padding: 2,
              margin: "auto",
            }}
          >
            <div style={{ padding: 8 }}>
              <h3 className={nunito.className}>Unlimited Answers</h3>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Our GPT-4 powered bots provide accurate answers at half the cost
                of ChatGPT.
              </p>
              <hr />
              <h3 className={nunito.className}>$9.99/mo</h3>
              <hr />
              <h4>Unlimited Credits</h4>
              {/* <p className={nunito.className} style={{fontSize: 14, margin: 6}}>Enough for a few months</p> */}
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Uses GPT-4
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Unlimited questions.
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Unlimited picture uploads
              </p>
              <p
                className={nunito.className}
                style={{ fontSize: 14, margin: 6 }}
              >
                Usable on any current/future AI bots
              </p>
              {profileData?.id ? (
                <form
                  action={`/api/checkout_session_subscribe?user_id=${profileData?.id}`}
                  method="POST"
                >
                  <section>
                    <button type="submit" role="link">
                      Subscribe Now
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
                        background: #007bff;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.5s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </form>
              ) : (
                <Link
                  className={nunito.className}
                  style={{
                    textDecoration: "none",
                    padding: 8,
                    borderRadius: 4,
                    color: "#0057be",
                  }}
                  href="/signup"
                >
                  <section>
                    <button type="submit" role="link">
                      Sign up
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
                        background: #007bff;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.5s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }
                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                  </style>
                </Link>
              )}
            </div>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PricingPage;
