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
  answers,
  profileData,
  handleClose,
  value,
  setValue,
}) {
  const [referralCode, setReferralCode] = React.useState('')
  const [codesArray, setCodesArray] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
          return db.collection('profiles').doc(userId).update({
            credits: updatedCredits,
          })
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
    console.log('userId:', userId)
    console.log('creditsToAdd:', creditsToAdd)
    console.log('referralCode:', referralCode)
    if (codesArray.includes(referralCode)) {
      console.log('Code used already!')
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
            console.log('usedCodesarray:', usedCodesarray)

            // Perform the update operation
            return db.collection('profiles').doc(userId).update({
              credits: updatedCredits,
              usedCodes: usedCodesarray,
            })
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
    console.log(referralCode)
    const exists = await checkReferralCodeExists(referralCode)
    if (exists) {
      console.log(`Referral code ${referralCode} exists in the database.`)

      // Assuming you have access to the currently logged-in user's userId
      const loggedInUserId = profileData.id
      const creditsToAdd = 300

      // Check if referralCode is already used
      if (codesArray.includes(referralCode)) {
        console.log('Code used already!')
      } else {
        try {
          // Adding credits to the logged-in user and updating usedCodesarray
          await addCreditsAndCodesToUser(loggedInUserId, creditsToAdd)
          console.log(`Added ${creditsToAdd} credits to user ${loggedInUserId}`)
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
              const creditsToAdd = 300

              await addCreditsToUser(userWithReferralCode.id, creditsToAdd)
              console.log(
                `Added ${creditsToAdd} credits to user ${userWithReferralCode.id}`
              )
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
        width: '100vw',
        marginLeft: [5, null, 0],
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          className={nunito.className}
          aria-label='basic tabs example'
          variant='fullWidth'
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
            label='Specialized Bots'
            {...a11yProps(0)}
          />
          {/* <Tab
            className={nunito.className}
            label='fun BOTS'
            {...a11yProps(1)}
          /> */}
          <Tab className={nunito.className} label='Credits' {...a11yProps(2)} />

          <Tab
            className={nunito.className}
            label='Chat History'
            {...a11yProps(2)}
          />

          {/* <Tab
            className={nunito.className}
            label='Buy Credits'
            {...a11yProps(4)}
          /> */}
          {/* <Tab label='Oddity Feed' {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Upload a *CLEAR* picture of your homework and our AI will give you a
            list of answers.
          </h3>
          <p style={{ color: 'gray' }}>
            Don't have a picture? Try our
            <span
              style={{ color: 'blue', cursor: 'pointer', margin: '0 4px' }}
              onClick={() => setValue(1)}
            >
              homework-bots
            </span>{' '}
            to ask specific questions.
          </p>
          <p>
            Please make sure the image is clear. The AI needs to be able to read
            the paper. It's not magic, it's technology.
            <br />
            <br />
            Disclaimer: *Just like cheating off the kid next to you, the answers
            are probably right but they might not all be right.
          </p>
          <ImageUpload />
        </>
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose one of our AI bots below and get answers to your homework.
            Each AI is specially designed for each subject.
          </h3>
          <Buttons handleClick={handleClick} handleFeedback={handleFeedback} />
        </>
      </TabPanel>

      {/* <TabPanel value={value} index={1}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Choose a fun/experimental AI bot to play with. Want a new AI bot?
            Suggest one to us using the Feedback bot below.
          </h3>
          <Buttons2 handleFeedback={handleFeedback} />
        </>
      </TabPanel> */}

      <TabPanel value={value} index={1}>
        <h3 className={nunito.className} style={{ fontSize: 18 }}>
          You currently have{' '}
          <bold>({profileData?.credits ? profileData?.credits : '0'})</bold>{' '}
          credits{profileData?.credits != 0 ? ' remaining.' : '.'}
        </h3>
        {/* <h4>
          <a href='#refcode'>Have a referral code?</a>
        </h4> */}

        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        > */}
        <div
          style={{
            margin: '16px auto',
            width: '30%',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            minWidth: 200,
            boxShadow: '5px 5px 10px gray',
          }}
        >
          {/* <div style={{ padding: 8 }}>
              <h3 className={nunito.className}>Free</h3>
              <hr s />
              <h3 className={nunito.className}>Referral / 25 free credits</h3>
              <hr s />
              <h4>Try for free</h4>
              <p className={nunito.className}>
                Get 25 free credits per referral + 25 just for signing up!
              </p>
              <form action='/api/checkout_sessions?user_id=123' method='POST'>
                <section>
                  <button disabled type='submit' role='link'>
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
                      transition: all 0.5s ease;
                      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                    }
                    button:hover {
                      opacity: 0.8;
                    }
                  `}
                </style>
              </form>
            </div> */}
        </div>
        <div
          style={{
            margin: '16px auto',
            width: '30%',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            minWidth: 200,
            boxShadow: '5px 5px 10px gray',
          }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>Starter Pack</h3>
            <hr s />
            <h3 className={nunito.className}>$4.99</h3>
            <hr s />
            <h4>300 credits</h4>
            {/* <p className={nunito.className}>Enough for a few months</p> */}
            <p className={nunito.className}>
              Questions and image uploads cost 1 credit
            </p>
            <p className={nunito.className}>
              Usable on any current/future AI bots
            </p>
            <form action={`/api/checkout_sessions?user_id=123`} method='POST'>
              <section>
                <button type='submit' role='link'>
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
        </div>
        <div
          style={{
            margin: '16px auto',
            width: '30%',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            minWidth: 200,
            boxShadow: '5px 5px 10px gray',
          }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>Standard Pack</h3>
            <hr s />
            <h3 className={nunito.className}>$9.99</h3>
            <hr s />
            <h4>700 credits</h4>
            {/* <p className={nunito.className}>Enough for a few months</p> */}
            <p className={nunito.className}>
              Questions and image uploads cost 1 credit
            </p>
            <p className={nunito.className}>
              Usable on any current/future AI bots
            </p>
            <form action={`/api/checkout_sessions2?user_id=123`} method='POST'>
              <section>
                <button type='submit' role='link'>
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
        </div>
        <div
          style={{
            margin: '16px auto',
            width: '30%',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            minWidth: 200,
            boxShadow: '5px 5px 10px gray',
          }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>Mega Pack</h3>
            <sup style={{ color: 'red', fontSize: '0.8rem' }}>Best Value!</sup>

            <hr s />
            <h3 className={nunito.className}>$19.99</h3>
            <hr s />
            <h4>1800 credits</h4>
            {/* <p className={nunito.className}>Enough for a few months</p> */}
            <p className={nunito.className}>
              Questions and image uploads cost 1 credit
            </p>
            <p className={nunito.className}>
              Usable on any current/future AI bots
            </p>
            <form action={`/api/checkout_sessions3?user_id=123`} method='POST'>
              <section>
                <button type='submit' role='link'>
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
        </div>
        {/* {profileData?.referralCode != null && ( */}
        <div
          style={{
            width: '75%',
            margin: '16px auto',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            minWidth: 200,
            boxShadow: '5px 5px 10px gray',
          }}
        >
          {' '}
          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
            }}
          >
            <div style={{ padding: 8 }}>
              <h2
                className={nunito.className}
                style={{ fontSize: 22, color: '#ff6f00' }}
              >
                Get 300 free credits for inviting your friends!
              </h2>
              <h3 className={nunito.className}>
                If someone signs up using your referral code, you both get 300
                extra credits for free.
              </h3>
              <h3 className={nunito.className}>
                Your referral code is: <br />
                <span style={{ color: '#24b557' }}>
                  {profileData?.referralCode}
                </span>
              </h3>
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              marginTop: 16,
            }}
          >
            <div style={{ padding: 8 }} id='refcode'>
              <h3 className={nunito.className}>
                Have a referral code? <br /> Enter it below to get 300 credits
                instantly!
              </h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TextField
                  style={{
                    width: 150,
                    fontSize: 14,
                    border: 'none',
                    marginLeft: 10,
                    backgroundColor: 'white',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder='Referral code'
                />
                {referralCode != profileData?.referralCode ? (
                  <Button
                    onClick={handleSubmitReferralCode}
                    style={{
                      zIndex: 10,
                      backgroundColor: '#ff4a47',
                      padding: 14,
                      textTransform: 'none',
                      marginLeft: 8,
                      color: 'white',
                      width: 150,
                      height: 50,
                    }}
                  >
                    Get free credits!
                  </Button>
                ) : (
                  <Button
                    style={{
                      zIndex: 10,
                      backgroundColor: '#ff4a47',
                      padding: 14,
                      textTransform: 'none',
                      marginLeft: 8,
                      color: 'white',
                      width: 150,
                      height: 50,
                    }}
                    disabled
                  >
                    Try again!
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        {/* <div
              style={{
                margin: '16px auto',
                width: '30%',
                backgroundColor: '#f5f5f5',
                borderRadius: 8,
                minWidth: 200,
                boxShadow: '5px 5px 10px gray',
              }}
            >
              <div style={{ padding: 8 }}>
                <h3
                  className={nunito.className}
                  style={{
                    scale: '1.5',
                    textDecoration: 'underline',
                  }}
                >
                  Best Deal
                </h3>
                <hr />
                <h3 className={nunito.className}>$30 / 1000 credits</h3>
                <hr />
                <h4>1000 credits</h4>
                <p className={nunito.className}>Enough for a year</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
                <form
                  action='/api/checkout_sessions2?user_id=123'
                  method='POST'
                >
                  <section>
                    <button type='submit' role='link'>
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
            </div> */}
        {/* </div> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Here you can see a history of all your chats with our AI Bots.
          </h3>
          {profileData?.chatHistory?.map((answer) => {
            return (
              <>
                <div style={{ border: '1px solid silver', margin: 8 }}>
                  <div style={{ padding: 8 }}>
                    <div>Question: {answer.input}</div>
                    <br />
                    <div>Answer: {answer.result}</div>
                  </div>
                </div>
                <br />
                <br />
              </>
            )
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
  )
}
