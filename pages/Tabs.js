import { useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { Nunito } from '@next/font/google'
import PropTypes from 'prop-types'
import React from 'react'
import { db } from '../firebase'
import Buttons from './Buttons'
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";

const nunito = Nunito({ subsets: ['latin'] })

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs({
  handleClick,
  handleFeedback,
  handleChange,
  answers,
  profileData,
  handleClose,
  value,
  setValue,
}) {
  const [referralCode, setReferralCode] = React.useState('')
  const [codesArray, setCodesArray] = React.useState([])



  useEffect(() => {
    fetch(`/api/check_sub_status?sub_id=${profileData?.subscriptionId}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log({ res })
      })
  }, [])

  function checkReferralCodeExists(referralCode) {
    return db
      .collection('profiles')
      .where('referralCode', '==', referralCode)
      .get()
      .then((querySnapshot) => {
        // If there are any documents with the given referral code, return true; otherwise, return false
        return !querySnapshot.empty
      })
      .catch((error) => {
        console.error('Error checking referral code:', error)
        return false
      })
  }

  function addCreditsToUser(userId, creditsToAdd) {
    return db
      .collection('profiles')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentCredits = doc.data().credits || 0
          const updatedCredits = currentCredits + creditsToAdd
          // if (codesArray.includes(referralCode)) {
          //   console.log('Code used already!')
          // } else {
          return db.collection('profiles').doc(userId).update(
            {
              credits: updatedCredits,
            },
            { merge: true }
          )
          // }
        } else {
          throw new Error('User not found')
        }
      })
      .catch((error) => {
        console.error('Error adding credits to user:', error)
      })
  }
  function addCreditsAndCodesToUser(userId, creditsToAdd) {
    if (codesArray.includes(referralCode)) {
    } else {
      return db
        .collection('profiles')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const currentCredits = doc.data().credits || 0
            const updatedCredits = currentCredits + creditsToAdd

            // Fetch the current usedCodes array or initialize it as an empty array
            const usedCodesarray = doc.data().usedCodes || []

            // Add the new referralCode to the usedCodes array
            usedCodesarray.push(referralCode)
            setCodesArray(usedCodesarray)

            // Perform the update operation
            return db.collection('profiles').doc(userId).update(
              {
                credits: updatedCredits,
                usedCodes: usedCodesarray,
              },
              { merge: true }
            )
          } else {
            throw new Error('User not found')
          }
        })
        .catch((error) => {
          console.error('Error adding credits to user:', error)
          // Rethrow the error to propagate it to the calling code.
          throw error
        })
    }
  }

  function findUserByReferralCode(code) {
    return db
      .collection('profiles')
      .where('referralCode', '==', code)
      .get()
      .then((querySnapshot) => {
        // Assuming there is only one user with the given referral code
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0]
        } else {
          return null // Return null if user not found with the referral code
        }
      })
      .catch((error) => {
        console.error('Error finding user by referral code:', error)
        return null
      })
  }
  async function handleSubmitReferralCode() {
    const exists = await checkReferralCodeExists(referralCode)
    if (exists) {

      // Assuming you have access to the currently logged-in user's userId
      const loggedInUserId = profileData.id
      const creditsToAdd = 100

      // Check if referralCode is already used
      if (codesArray.includes(referralCode)) {
        ReactGA.event({
          category: "User",
          action: "Used existing referral code",
        });

      } else {
        try {
          // Adding credits to the logged-in user and updating usedCodesarray
          await addCreditsAndCodesToUser(loggedInUserId, creditsToAdd)
          ReactGA.event({
            category: "User",
            action: "Successfully used referral code",
          });
                              amplitude.track("Used referral code");

        } catch (error) {
          console.error('Error adding credits to logged-in user:', error)
        }
      }

      // Finding and adding credits to the user with the existing referral code
      try {
        const userWithReferralCode = await findUserByReferralCode(referralCode)

        if (userWithReferralCode) {
          // Process the user data (Optional - for debugging purposes)
          // console.log("User found with referral code:", userWithReferralCode.data());

          // Adding credits to the user found by referral code
          if (!codesArray.includes(referralCode)) {
            try {
              const creditsToAdd = 100

              await addCreditsToUser(userWithReferralCode.id, creditsToAdd)

            } catch (error) {
              console.error(
                'Error adding credits to user with referral code:',
                error
              )
            }
          }
        } else {
          console.log(`User with referral code ${referralCode} not found.`)
        }
      } catch (error) {
        console.error('Error finding user by referral code:', error)
      }
    } else {
      console.log(
        `Referral code ${referralCode} does not exist in the database.`
      )
    }
    setReferralCode('')
  }

  return (
    <Box
      className={nunito.className}
      sx={{
        width: "100vw",
        marginLeft: [5, null, 0],
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          className={nunito.className}
          aria-label="basic tabs example"
          variant="fullWidth"
          scrollButtons
          allowScrollButtonsMobile
        >
          {/* <Tab
            className={nunito.className}
            label="WORKSHEET UPLOAD"
            {...a11yProps(0)}
          /> */}
          <Tab
            className={nunito.className}
            label="Specialized Bots"
            {...a11yProps(0)}
          />
          {/* <Tab
            className={nunito.className}
            label='fun BOTS'
            {...a11yProps(1)}
          /> */}
          <Tab
            className={nunito.className}
            label="Subscribe / Credits"
            {...a11yProps(2)}
          />

          <Tab
            className={nunito.className}
            label="Chat History"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>
          <Buttons handleClick={handleClick} handleFeedback={handleFeedback} />
        </>
      </TabPanel>

      <TabPanel value={value} index={1}>
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
                width: ["100%", "30%"], // Full width on mobile, 30% on desktop
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                boxShadow: "5px 5px 10px gray",
                padding: 2,
                margin: "auto",
              }}
            >
              <div style={{ padding: 8 }}>
                <h2 className={nunito.className}>50 GPT-4 Credits</h2>
                <p className={nunito.className}>
                  Our GPT-4 powered bots are specially designed to get the
                  correct answers at only 50% the cost.
                </p>
                <hr />
                <h3 className={nunito.className}>$0.99</h3>
                <hr />
                <h4>50 credits</h4>
                <p className={nunito.className}>GPT-4</p>
                <p className={nunito.className}>
                  50 Questions or image uploads
                </p>
                <p className={nunito.className}>Never expire</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
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
                        background: #556cd6;
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
                width: ["100%", "30%"], // Full width on mobile, 30% on desktop
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                boxShadow: "5px 5px 10px gray",
                padding: 2,
                margin: "auto",
              }}
            >
              <div style={{ padding: 8 }}>
                <h2 className={nunito.className}>Unlimited GPT-4 Answers</h2>
                <p className={nunito.className}>
                  Our GPT-4 powered bots are specially designed to get the
                  correct answers at only 50% the cost.
                </p>
                <hr />
                <h3 className={nunito.className}>$9.99/mo</h3>
                <hr />
                <h4>30 Day Subscription</h4>
                {/* <p className={nunito.className}>Enough for a few months</p> */}
                <p className={nunito.className}>GPT-4</p>
                <p className={nunito.className}>Unlimited questions.</p>
                <p className={nunito.className}>Unlimited picture uploads</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
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
                        background: #556cd6;
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
          </Box>
        )}
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

      <TabPanel value={value} index={4}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Make homework a breeze with OddityAI Credits
          </h3>
        </>
      </TabPanel>
    </Box>
  );
}
