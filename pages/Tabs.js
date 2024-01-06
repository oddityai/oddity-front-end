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
import TutorButtons from './TutorButtons'
import PricingContent from './PricingContent'
import PublicChat from './PublicChat'
import EssayWriter from './EssayWriter'
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
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            ".MuiTab-root": {
              // Default styles for larger screens
              fontSize: "1rem", // Default font size
              padding: "12px 24px", // Default padding
              "@media (max-width: 600px)": {
                // Styles for mobile screens
                fontSize: "0.8rem", // Smaller font size for mobile
                padding: "6px 12px", // Reduced padding for mobile
              },
            },
            ".MuiTabs-indicator": {
              // Customizing the indicator
              backgroundColor: "primary.main",
              height: "4px",
            },
          }}
        >
          <Tab value={0} label="Homework answer Bots" {...a11yProps(0)} />
          <Tab value={6} label="24/7 AI Tutor" {...a11yProps(4)} />
          <Tab value={5} label="Essay Writer" {...a11yProps(5)} />
          <Tab value={4} label="Public Chat (beta)" {...a11yProps(1)} />
          <Tab value={1} label="Subscription / Credits" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>{" "}
          <h3 className={nunito.className} style={{ fontSize: 12 }}>
            This bot is meant to help you find the correct answers for your
            homework so you can make sure you get the right answer.
          </h3>
          <Buttons handleClick={handleClick} handleFeedback={handleFeedback} />
        </>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PricingContent />
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
        <h3 className={nunito.className} style={{ fontSize: 13 }}>
          Here you can chat publicly with all other OddityAI users. Feel free to
          leave feedback, request new features, report bugs or whatever you want
          to talk about.
        </h3>
        <PublicChat profileData={profileData} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h3
          className={nunito.className}
          style={{ fontSize: 13, maxWidth: "70%", marginLeft: "15%" }}
        >
          The Essay Writer will generate a new custom essay with every use.
          Nobody will have the say essay as you. Using the essay writer costs 2
          credits. This essay generator is meant to give you an outline and get
          started on your essay. You should edit it and make it your own.
        </h3>
        <EssayWriter profileData={profileData} />
      </TabPanel>

      <TabPanel value={value} index={6}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of 24/7 Tutor AI bots below and get answers to your
            homework. Each Tutor Bot is specially designed for each subject.
          </h3>{" "}
          <h3 className={nunito.className} style={{ fontSize: 12 }}>
            This Tutor bot is here to help explain topics and help you
            understand your subjects better. It is not meant to give answers
            like the Homework Helper bot.
          </h3>
          <TutorButtons handleClick={handleClick} handleFeedback={handleFeedback} />
        </>
      </TabPanel>
    </Box>
  );
}
