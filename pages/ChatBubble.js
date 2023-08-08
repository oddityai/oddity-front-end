import { useState } from 'react'

import ChatBubbleIcon from '@mui/icons-material/ChatBubble'

const ChatBubble = () => {
  const [chatCount, setChatCount] = useState(0)

  return (
    <div style={{ left: 10, position: 'absolute', bottom: 80, width: 300 }}>
      <div
        style={{
          position: 'absolute',
          left: 10,
          top: 6,
          color: 'white',
          paddingTop: 8,
          fontSize: 13,
          marginTop: -3,
          paddingBottom: 6,
          borderRadius: 4,
          backgroundColor: '#595F69',
        }}
      >
        <span style={{ marginLeft: 5, marginRight: 5 }}>
          {' '}
          Generating response, please be patient...
        </span>
      </div>
      <ChatBubbleIcon style={{ color: '#595F69', height: 41, width: 50 }} />
    </div>
  )
}

export default ChatBubble
