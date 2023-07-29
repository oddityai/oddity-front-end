import { useUser } from '@auth0/nextjs-auth0/client'
import Hotjar from '@hotjar/browser'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
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
  chat: '',
  feedback:
    'Give me a good reply for this piece of feedback as if you are a team and we are a group replying: ',

  reply: 'Generate a reply to the following message: ',
  joke: 'Write a funny joke about the following prompt. It has to be very funny. : ',
}

export default function Home() {
  const [animalInput, setAnimalInput] = useState('')
  const [result, setResult] = useState()
  const [answers, setAnswers] = useState([])
  const [isLoadingScreen, setIsLoadingScreen] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [profileData, setProfileData] = useState({})
  const [subject, setSubject] = useState('math')
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    // if (query.get("success")) {
    //   console.log("Order placed! You will receive an email confirmation.");
    // }
    // if (query.get("canceled")) {
    //   console.log(
    //     "Order canceled -- continue to shop around and checkout when you’re ready."
    //   );
    // }
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
            const newUser = {
              username: user?.nickname,
              email: user?.email,
              id: user?.sub.split('|')[1],
              name: user?.name,
              credits: '20',
              chatHistory: [],
            }
            db.collection('profiles').add(newUser)
            setProfileData(newUser)
            sessionStorage.setItem('profileStatus1', user?.sid)
          }
        })
    }
  }, [user])

  useEffect(() => {
    if (router.query.success === 'true' && profileData.id) {
      const usersRef = db.collection('profiles')
      const userRef = usersRef.doc(profileData.id)

      try {
        userRef.update({
          credits: (profileData.credits || 0) + 100,
        })
        console.log('Credits successfully added (100)')
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
  //               // histories.push({
  //               //   username: ele?.username,
  //               //   length: ele?.chatHistory?.length,
  //               //   history: ele?.chatHistory,
  //               // });
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
      alert('You must have credits to continue! Visit the "Credits" tab!')
    }
  }
  const handleFeedback = (subject) => {
    setIsModalOpen(true)
    setSubject(subject)
  }

  const useCredit = () => {
    const usersRef = db.collection('profiles')
    const userRef = usersRef.doc(profileData.id)
    if (profileData.credits >= 0) {
      userRef.update({
        credits: profileData.credits - 1,
      })
    }
  }
  async function onSubmit(event, value, url, tries) {
    const input = value ? value : animalInput
    if (
      subject !== 'feedback' &&
      subject !== 'chat' &&
      subject !== 'joke' &&
      subject !== 'reply'
    ) {
      useCredit()
    }
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
  }

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
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar />
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
