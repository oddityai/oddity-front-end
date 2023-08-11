import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import EmailIcon from '@mui/icons-material/Email'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PercentIcon from '@mui/icons-material/Percent'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ScienceIcon from '@mui/icons-material/Science'
import Button from '@mui/material/Button'
import { Nunito } from '@next/font/google'

const nunito = Nunito({ subsets: ['latin'] })
const Buttons = ({ children, handleClick, handleFeedback }) => {
  return (
    <div
      className={nunito.className}
      style={{
        textAlign: 'left',
        margin: 'auto',
        maxWidth: 600,
      }}
    >
      <div
        style={{
          border: '1px solid white',
          maxWidth: 800,
          borderRadius: 8,
        }}
      >
        <div style={{ padding: 16 }}>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
              <p
                className={nunito.className}
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                English AI
              </p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                Here we can summarize books, write poems/songs or answer
                questions about characters. Each answer is unique so nobody will
                have the same answers as you.
              </p>
              <Button
                onClick={() => handleClick('english')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#304FFD',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <MenuBookIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  English/Language Answers
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p
                className={nunito.className}
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                Prompt AI
              </p>

              <p style={{ fontSize: 12, color: 'gray' }}>
                Enter a prompt for a story or any kind of writing and have our
                Prompt AI write it for you! Be patient, this can take time to
                complete.
              </p>
              <Button
                onClick={() => handleClick('prompt')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#00c3ff',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <CreateIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Prompt Writer
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                History / Social Studies AI
              </p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                This AI can answer any questions about anything that ever
                happened in history. Each answer is unique.
              </p>
              <Button
                onClick={() => handleClick('history')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#e833bb',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <HistoryEduIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  History Answers
                </span>
              </Button>
            </div>

            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Science AI</p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                This Science AI is programmed to answer anything you could ever
                want to know about science.
              </p>
              <Button
                onClick={() => handleClick('science')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#24b557',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <ScienceIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Science Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Math AI (beta)</p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                This AI will try its best to answer math questions. Sometimes a
                calculator is better.
              </p>
              <Button
                onClick={() => handleClick('math')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#a334e3',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <PercentIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Math Answers
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Friendly AI</p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                This is a fun chatbot so you can talk directly to our AI
                him/her-self about anything.
              </p>
              <Button
                onClick={() => handleFeedback('chat')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#b58024',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <PsychologyIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Chat with an AI
                </span>
              </Button>
            </div>
            <div
              style={{ marginTop: 16, padding: 16, backgroundColor: '#f5f5f5' }}
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>Give Feedback</p>
              <p style={{ fontSize: 12, color: 'gray' }}>
                Give this AI feedback so we can improve the app. Want a new
                feature? Find a bug? Tell us about it!
              </p>
              <Button
                onClick={() => handleFeedback('feedback')}
                style={{
                  zIndex: 10,
                  backgroundColor: '#ff4a47',
                  padding: 14,
                  marginBottom: 16,
                  color: 'white',
                  width: '100%',
                }}
              >
                {children || <EmailIcon style={{ color: 'white' }} />}{' '}
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  Talk to the OddityAI Team!
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Buttons
