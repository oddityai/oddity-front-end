import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Nunito } from '@next/font/google'
import PropTypes from 'prop-types'
import React from 'react'
import Buttons from './Buttons'
import Buttons2 from './Buttons2'

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

export default function BasicTabs({ handleClick, answers, profileData }) {
  const [value, setValue] = React.useState(0)
  const [referralCode, setReferralCode] = React.useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSubmitReferralCode = () => {
    console.log(referralCode)
    setReferralCode('')
  }

  // const handleBuyCredits = async () => {
  //   try {
  //     const response = await fetch('/api/checkout_sessions?user_id=123', {
  //       method: 'POST',
  //     })
  //     const credits = profileData.credits || 0
  //     const updatedCredits = credits + 100
  //     userRef
  //       .set({ credits: updatedCredits }, { merge: true })
  //       .then(() => {
  //         console.log('Credits added successfully')
  //         location.reload()
  //       })
  //       .catch((error) => {
  //         console.error('Error adding credits: ', error)
  //       })
  //     console.log(response)
  //   } catch (error) {
  //     // Handle error
  //     console.error(error)
  //   }
  // }

  return (
    <Box className={nunito.className} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={nunito.className}
          aria-label='basic tabs example'
          variant='scrollable'
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
            label='HOMEWORK BOTS'
            {...a11yProps(0)}
          />
          <Tab
            className={nunito.className}
            label='fun BOTS'
            {...a11yProps(1)}
          />
          <Tab
            className={nunito.className}
            label='Chat History'
            {...a11yProps(2)}
          />

          {/* <Tab
            className={nunito.className}
            label='Free Credits'
            {...a11yProps(2)}
          />
          <Tab
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
      <TabPanel value={value} index={3}>
        <h3 className={nunito.className} style={{ fontSize: 18 }}>
          You currently have <bold>({profileData.credits})</bold> credits
          remaining.
        </h3>
        <div style={{ backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <div style={{ padding: 8 }}>
            <h2
              className={nunito.className}
              style={{ fontSize: 22, color: '#ff6f00' }}
            >
              Get 50 free credits for inviting your friends!
            </h2>
            <h3 className={nunito.className}>
              If someone signs up using your referral code, you both get 50
              extra credits for free.
            </h3>
            <h3 className={nunito.className}>
              Your referral code is:{' '}
              <span style={{ color: '#24b557' }}>TRI-3948</span>
            </h3>
          </div>
        </div>
        <div
          style={{ backgroundColor: '#f5f5f5', borderRadius: 8, marginTop: 16 }}
        >
          <div style={{ padding: 8 }}>
            <h3 className={nunito.className}>
              Have a referral code? <br /> Enter it below to get 25 credits
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
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <>
          <h3 className={nunito.className} style={{ fontSize: 18 }}>
            Make homework a breeze with OddityAI Credits
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
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
                <h3 className={nunito.className}>Starter Pack</h3>
                <hr s />
                <h3 className={nunito.className}>$5 / 100 credits</h3>
                <hr s />
                <h4>100 credits</h4>
                <p className={nunito.className}>Enough for a few months</p>
                <p className={nunito.className}>
                  Usable on any current/future AI bots
                </p>
                <form
                  action={`/api/checkout_sessions?user_id=123`}
                  method='POST'
                >
                  <section>
                    <button
                      type='submit'
                      // onClick={handleBuyCredits}
                      role='link'
                    >
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
          </div>
        </>
      </TabPanel>
    </Box>
  )
}
