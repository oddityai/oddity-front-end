import { useUser } from '@auth0/nextjs-auth0/client'
import Hotjar from '@hotjar/browser'
import CloseIcon from '@mui/icons-material/Close'
import { Modal, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { Box } from '@mui/system'
import { Nunito } from '@next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import Tesseract from 'tesseract.js'
import { db } from '../firebase'
import AppBar from './AppBar'
import ChatBot from './ChatBot'

import Tabs from './Tabs'

const nunito = Nunito({ subsets: ['latin'] })

const test = []

const TYPES = {
  math: 'Answer this math question for me. You have to be exactly precise. Use chain of thought reasoning and show your work. :',
  history: 'Answer this history question for me: ',
  english: 'Answer this English question for me: ',
  science: 'Answer this science question for me: ',
  prompt:
    'Write a fully descriptive, captivating, well written section about the following prompt, keep it around 300 words unless instructed otherwise in the following: ',
  chat: 'Keep in mind that this is not the area to ask questions about homework, and do not answer any questions about english, math, science, geography, or math, and explain that to have the question answered if asked, they can buy credits at the "Credits" tab, but only mention this if such a question is asked:',
  feedback:
    'Give me a good reply for this piece of feedback as if you are a team and we are a group replying, also keep in mind that this is not the area to ask questions about homework, only to provide feedback to the team, and do not answer any questions about english, math, science, geography, or math, and explain that to have the question answered if asked, they can buy credits at the "Credits" tab and use one of the specially designed bots, but only mention this if such a question is asked, also if ever referring to yourself, we are "OddityAI": ',

  reply:
    'Generate a reply to the following message, also keep in mind that this is not the area to ask questions about homework, and do not answer any questions about english, math, science, geography, or math, and explain that to have the question answered if asked, they can buy credits at the "Credits" tab, but only mention this if such a question is asked: ',
  joke: 'Write a funny joke about the following prompt. It has to be very funny, also keep in mind that this is not the area to ask questions about homework, and do not answer any questions about english, math, science, geography, or math, and explain that to have the question answered if asked, they can buy credits at the "Credits" tab, but only mention this if such a question is asked related to english math science or history. : ',
}

export default function Home() {
  const [animalInput, setAnimalInput] = useState('')
  const [result, setResult] = useState()
  const [answers, setAnswers] = useState([])
  const [isLoadingScreen, setIsLoadingScreen] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const [profileData, setProfileData] = useState({})
  const [subject, setSubject] = useState('math')
  const { user, isLoading } = useUser()
  const router = useRouter()

  const [ipAddress, setIpAddress] = useState('')
  const [creditsToAdd, setCreditsToAdd] = useState(0)
  const [nullRef, setNullRef] = useState(null)
  const [referralCodeState, setReferralCodeState] = useState()
  useEffect(() => {
    async function fetchIpAddress() {
      try {
        const response = await fetch('/api/ip') // Await the fetch Promise
        const data = await response.json() // Await the .json() Promise
        setIpAddress(data.ip)
        // console.log(`IP Address: ${data.ip}`)
      } catch (error) {
        console.error('Error fetching IP: ', error)
      }
    }

    fetchIpAddress()
  }, [])

  useEffect(() => {
    if (user?.nickname && !isLoading) {
      db.collection('profiles')
        .where('username', '==', user?.nickname)
        .onSnapshot((snapshot) => {
          const userData = snapshot.docs.map((doc) => {
            return { ...doc.data(), ...{ id: doc.id } }
          })[0]
          if (userData) {
            setProfileData(userData)
          } else {
            if (sessionStorage.getItem('profileStatus1') === user?.sid) {
              return
            }
            const firstRef = user?.nickname.slice(0, 3).toUpperCase()
            const secondRef = Math.floor(1000 + Math.random() * 9000)
            const refCode = `${firstRef}-${secondRef}`
            setReferralCodeState(refCode)
            const checkIfIpAddressExists = async (ip) => {
              const snapshot = await db
                .collection('profiles')
                .where('IP', '==', ip)
                .get()
              return !snapshot.empty
            }
            // if (ipAddress === '') {
            //   console.log('No IP')
            //   setCreditsToAdd(20)
            //   setNullRef(referralCodeState)
            // } else {
            //   checkIfIpAddressExists(ipAddress).then((ipExists) => {
            //     if (ipExists) {
            //       setCreditsToAdd(0)
            //       setNullRef(null)
            //     } else {
            //       setCreditsToAdd(20)
            //       setNullRef(referralCodeState)
            //     }
            //   })
            // }

            const newUser = {
              username: user?.nickname,
              email: user?.email,
              id: user?.sub.split('|')[1],
              name: user?.name,
              credits: creditsToAdd,
              credits: 20,
              referralCode: refCode,
              usedCodes: [refCode],
              // When using IP to determine deservingness
              // referralCode: nullRef,
              // usedCodes: [nullRef],
              chatHistory: [],
              IP: ipAddress,
            }
            db.collection('profiles').add(newUser)
            setProfileData(newUser)
            sessionStorage.setItem('profileStatus1', user?.sid)
            // console.log('IP Address:', ipAddress)
          }
        })
    }
  }, [user])
  // console.log('IP address used before')
  // const newUser = {
  //   username: user?.nickname,
  //   email: user?.email,
  //   id: user?.sub.split('|')[1],
  //   name: user?.name,
  //   credits: 0,
  //   referralCode: null,
  //   usedCodes: [],
  //   chatHistory: [],
  //   ipAddress: ipAddress,
  // }
  // db.collection('profiles').add(newUser)
  // setProfileData(newUser)
  // sessionStorage.setItem('profileStatus1', user?.sid)

  // const generateReferralCode = (nickname) => {
  //   const firstRef = nickname?.slice(0, 3).toUpperCase()
  //   const secondRef = Math.floor(1000 + Math.random() * 9000)
  //   return `${firstRef}-${secondRef}`
  // }

  // const updateProfileWithReferralCode = async (profileDoc) => {
  //   const nickname = profileDoc.data().username || 'ODT'
  //   const referralCode = generateReferralCode(nickname)
  //   await profileDoc.ref.set(
  //     {
  //       referralCode: referralCode,
  //       usedCodes: [referralCode],
  //     },
  //     { merge: true }
  //   )
  // }

  // const updateProfilesWithReferralCodes = async () => {
  //   try {
  //     // Get all profiles from the 'profiles' collection
  //     const profilesSnapshot = await db.collection('profiles').get()

  //     // Process each profile with the generated referral code
  //     for (const profileDoc of profilesSnapshot.docs) {
  //       await updateProfileWithReferralCode(profileDoc)
  //     }

  //     console.log('Referral codes added successfully!')
  //   } catch (error) {
  //     console.error('Error adding referral codes:', error)
  //   }
  // }

  // const handleAddReferralCodes = async () => {
  //   await updateProfilesWithReferralCodes()
  // }
  useEffect(() => {
    if (router.query.success === 'true' && profileData.id) {
      const usersRef = db.collection('profiles')
      const userRef = usersRef.doc(profileData.id)
      const creditsToAdd = 300

      try {
        userRef.update({
          credits: (profileData.credits || 0) + creditsToAdd,
        })
        console.log('Credits successfully added (300)')
        router.push('/App')
      } catch (error) {
        console.error(`Error adding credits: ${error}`)
      }
    } else if (router.query.success === 'true2' && profileData.id) {
      const usersRef = db.collection('profiles')
      const userRef = usersRef.doc(profileData.id)
      const creditsToAdd = 700

      try {
        userRef.update({
          credits: (profileData.credits || 0) + creditsToAdd,
        })
        console.log('Credits successfully added (700)')
        router.push('/App')
      } catch (error) {
        console.error(`Error adding credits: ${error}`)
      }
    } else if (router.query.success === 'true3' && profileData.id) {
      const usersRef = db.collection('profiles')
      const userRef = usersRef.doc(profileData.id)
      const creditsToAdd = 1800

      try {
        userRef.update({
          credits: (profileData.credits || 0) + creditsToAdd,
        })
        console.log('Credits successfully added (1800)')
        router.push('/App')
      } catch (error) {
        console.error(`Error adding credits: ${error}`)
      }
    }
  }, [router.query.success, profileData.id])

  // useEffect(() => {
  //   if (window.location.href.includes('localhost')) {
  //     if (user?.nickname && !isLoading) {
  //       db.collection('profiles').onSnapshot((snapshot) => {
  //         const userData = snapshot.docs.map((doc) => {
  //           return { ...doc.data(), ...{ id: doc.id } }
  //         })
  //         if (userData) {
  //           const histories = []
  //           userData?.map((ele) => {
  //             if (ele?.chatHistory?.length) {
  //               ele?.chatHistory.map((chat) => {
  //                 if (chat.type === 'feedback') {
  //                   histories.push({
  //                     username: ele?.username,
  //                     chat: chat.input,
  //                     reply: chat.response,
  //                     full: chat,
  //                   })
  //                 }
  //               })
  //               histories.push({
  //                 username: ele?.username,
  //                 length: ele?.chatHistory?.length,
  //                 history: ele?.chatHistory,
  //               })
  //             }
  //           })
  //           console.log({ histories })
  //         }
  //       })
  //     }
  //   }
  // }, [user])

  const handleClick = (subject) => {
    if (profileData.credits > 0) {
      setIsModalOpen(true)
      setSubject(subject)
    } else {
      // alert('You must have credits to continue! Visit the "Credits" tab!')
      handleOpen()
    }
  }
  const handleFeedback = (subject) => {
    setIsModalOpen(true)
    setSubject(subject)
  }

  const useCredit = (amount) => {
    const usersRef = db.collection('profiles')
    const userRef = usersRef.doc(profileData.id)
    if (profileData.credits >= 0) {
      userRef.update({
        credits: profileData.credits - amount || profileData.credits - 1,
      })
    }
  }
  async function onSubmit(event, value, url, tries) {
    const input = value ? value : animalInput
    if (profileData.credits > 0) {
      if (event) {
        event.preventDefault()
      }
      setIsLoadingScreen(true)
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            animal: `${TYPES[subject]}: "${input}"`,
            history: profileData.chatHistory,
          }),
        })
        // const response2 = await fetch("/api/generate", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     animal: `Return the data in JSON format. The key of the json should be an array of one string called 'explanation'.  the value of 'explanation'  should be more 1 detailed reason why the following is true to help me understand like im a 10 year old: ${input}.`,
        //   }),
        // });

        let data = await response.json()
        // let data2 = await response2.json();
        // console.log(data2.result.explanation);
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          )
        } else {
          if (
            subject !== 'feedback' &&
            subject !== 'chat' &&
            subject !== 'joke' &&
            subject !== 'reply'
          ) {
            useCredit()
          }
        }
        // if (response2.status !== 200) {
        //   throw (
        //     data.error ||
        //     new Error(`Request failed with status ${response.status}`)
        //   );
        // }

        setResult(data.result)
        const res = {
          result: data.result,
          input: input,
          // url: url,
          type: subject,
          // explanation: JSON.parse(data2.result).explanation,
        }
        const answersCopy = answers.slice()
        answersCopy.push(res)
        setAnswers(answersCopy)
        setAnimalInput('')
        setResult('')
        setError('')
        setIsLoadingScreen(false)
        const userCopy = profileData.chatHistory.slice()
        userCopy.unshift(res)
        console.log('SAVING', userCopy)
        db.collection('profiles').doc(profileData?.id).update({
          chatHistory: userCopy,
        })
        console.log('end save', profileData?.id)
        Hotjar.event('SUCCESS - User succeeded to submit request.')
        // setAnimalInput("");
      } catch (error) {
        if (!tries && tries < 1) {
          onSubmit(event, value + ' (limit 1606 chars)', url, type, 1)
          return
        }
        // Consider implementing your own error handling logic here
        if (tries > 1) {
          setIsLoadingScreen(false)
          setResult('')
          setError(
            'The response is too large to send. Can you try asking a slightly more specific question?' +
              ' ' +
              error.message
          )
          Hotjar.event('FAILURE - User failed to submit request.')
          console.error(error)
        }

        // alert(error.message);
      }
    } else {
      // alert('You must have credits to continue! Visit the "Credits" tab!')
      handleOpen()
    }
  }

  // async function onSubmit(event, value, url, tries) {
  //   const input = value ? value : animalInput;
  //   if (profileData.credits > 0) {
  //     if (
  //       subject !== 'feedback' &&
  //       subject !== 'chat' &&
  //       subject !== 'joke' &&
  //       subject !== 'reply'
  //     ) {
  //       useCredit();
  //     }
  //     if (event) {
  //       event.preventDefault();
  //     }
  //     setIsLoadingScreen(true);
  //     try {
  //       const response = await fetch('/api/generate', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           animal: `${TYPES[subject]}: "${input}"`,
  //         }),
  //       });

  //       if (response.status !== 200) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }

  //       const reader = response.body.getReader();
  //       let content = '';

  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) {
  //           break;
  //         }
  //         content += new TextDecoder().decode(value);
  //         // Display the content in your UI, e.g., append it to a chat window
  //         console.log(content);
  //       }

  //       const res = {
  //         result: content,
  //         input: input,
  //         type: subject,
  //       };
  //       const answersCopy = answers.slice();
  //       answersCopy.push(res);
  //       setAnswers(answersCopy);
  //       setAnimalInput('');
  //       setResult('');
  //       setError('');
  //       setIsLoadingScreen(false);

  //       // Update the chat history in your Firebase database
  //       const userCopy = profileData.chatHistory.slice();
  //       userCopy.unshift(res);
  //       db.collection('profiles').doc(profileData?.id).update({
  //         chatHistory: userCopy,
  //       });
  //     } catch (error) {
  //       // Handle errors
  //       setIsLoadingScreen(false);
  //       setResult('');
  //       setError('An error occurred while processing your request: ' + error.message);
  //       console.error(error);
  //     }
  //   } else {
  //     // Handle the case where user doesn't have enough credits
  //     handleOpen();
  //   }
  // }

  const shareOnTwitter = () => {
    const url = encodeURIComponent('www.oddityai.com')
    const text = encodeURIComponent(
      'Check out this new AI powered homework bot!'
    )
    const via = 'myusername'
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=Oddity_AI`
    )
  }

  const handleChange = async (url, type) => {
    setIsModalOpen(true)
    setIsLoadingScreen(true)
    const { createWorker } = Tesseract

    const worker = await createWorker()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    await worker.setParameters({
      tessedit_ocr_engine_mode: 0,
      tessedit_pageseg_mode: '1',
      tessedit_create_txt: '1',
      tosp_ignore_big_gaps: '1',
      tessedit_pageseg_mode: '6',
      preserve_interword_spaces: '1',
    })

    const options = {
      tessedit_ocr_engine_mode: 0,
      tessedit_pageseg_mode: '1',
      preserve_interword_spaces: '1',
    }

    const {
      data: { text },
    } = await worker.recognize(url, 'eng', options)
    onSubmit(null, text, url, type)
  }
  const [value, setValue] = useState(0)
  const handleClose = () => {
    setOpen(false)
    setValue(1)
  }

  // useEffect(() => {
  //   // var html = htmlToPdfmake(result);
  //   // var dd = { content: html };
  //   // pdfMake.createPdf(dd).download();

  //   if (document.getElementById("exportthis")) {
  //     html2canvas(document.getElementById("exportthis")).then((canvas) => {
  //       var imgData = canvas.toDataURL("image/png");
  //       var doc = new jsPDF("p", "mm", [150, 210]);
  //       doc.addImage(imgData, "PNG", 1, 1);
  //       doc.save("sample-file.pdf");
  //     });
  //     document.getElementById("exportthis").innerHTML = result;
  //   }
  // }, [result]);

  useEffect(() => {
    if (window.location.href.includes('oddityai')) {
      Hotjar.init(3307089, 6)

      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY)
      window.sessionStorage.setItem('hotjar', 'true')
      // the below i to identify users when i add auth0
      // LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
      //   name: "James Morrison",
      //   email: "jamesmorrison@example.com",
      //   // Add your own custom user variables here, ie:
      //   subscriptionType: "pro",
      // });
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !user?.nickname) {
      window.location.href = '/'
    }
  }, [isLoading, user])

  if (isLoading) {
    return <>Logging in</>
  }
  if (!profileData) {
    return <div>Loading...</div>
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(188, 37, 52, 0.95)',
    border: '2px solid #871420',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    color: 'white',
    textAlign: 'center',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar profileData={profileData} setValue={setValue} value={value} />
      <Head>
        <title>AI Homework Helper | Homework AI</title>
        <meta
          name='description'
          content='Homework AI Is the AI That Does Homework. If You
Are a Student Who Needs Homework Solutions This AI Homework Helper
Is for You. Give This AI Homework App a Try, It’ll Solve & Write Your
Homework'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta
          name='keywords'
          content='student homework app ai, ai that does homework, ai doing
homework, ai homework writer, homework helper ai, homework ai, ai
homework solver, ai for homework, ai  homework, ai homework solutions, ai
homework helper'
        />{' '}
      </Head>{' '}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              You need credits to continue!
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Purchase credits to continue using OddityAI! Only $5 for 100
              credits!
            </Typography>
          </Box>
        </Modal>
        <div
          style={{
            textAlign: 'center',
            padding: '20px 20px',
            color: '#232A31',
            fontFamily: "'ColfaxAI', sans-serif",
          }}
          id='exportthis'
        >
          <Dialog
            onClose={() => {
              setIsModalOpen(false)
              setAnswers([])
            }}
            style={{ width: '100%', height: '100%' }}
            open={isModalOpen}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon
                onClick={() => {
                  setIsModalOpen(false)
                  setAnswers([])
                }}
              />
            </div>
            <div
              className='container'
              style={{
                textAlign: 'left',
                margin: 'auto',
                maxWidth: 500,
                padding: 8,
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontFamily: "'ColfaxAI', sans-serif",
                  marginTop: 15,
                }}
                id='form-title'
              >
                {`OddityAI ${subject} AI`}
              </p>
              <ChatBot
                setAnimalInput={setAnimalInput}
                onSubmit={onSubmit}
                handleChange={handleChange}
                isLoading={isLoadingScreen}
                animalInput={animalInput}
                subject={subject}
                answers={answers}
                error={error}
                profileData={profileData}
                useCredit={useCredit}
              />
            </div>
          </Dialog>
          <Tabs
            profileData={profileData}
            answers={answers}
            handleClick={handleClick}
            handleFeedback={handleFeedback}
            handleClose={handleClose}
            value={value}
            setValue={setValue}
            // handleAddReferralCodes={handleAddReferralCodes}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <br />
        <br />
      </div>
    </div>
  )
}
