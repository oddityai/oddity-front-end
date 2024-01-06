import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase"; // Make sure this path is correct

const ChatApp = ({ profileData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("publicMessages")
      .orderBy("timestamp")
      .onSnapshot(
        (snapshot) => {
          const loadedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            visible: doc.data().visible || true,
            user: doc.data().user || "Unknown",
            timestamp: doc.data().timestamp?.toDate() || new Date(),
            likes: doc.data().likes || [],
            replies: doc.data().replies || [],
          }));
          setMessages(loadedMessages);
        },
        (error) => {
          console.error("Error fetching messages:", error);
        }
      );

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      await db.collection("publicMessages").add({
        text: input,
        user: profileData.email,
        timestamp: new Date(),
        visible: true,
        likes: [],
        replies: [],
      });
      setInput("");
      scrollToBottom();
    }
  };

  const handleLike = async (messageId, likes) => {
    const messageRef = db.collection("publicMessages").doc(messageId);
    const updatedLikes = likes.includes(profileData.email)
      ? likes.filter((email) => email !== profileData.email)
      : [...likes, profileData.email];

    await messageRef.update({ likes: updatedLikes });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        padding: "10px",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          height: "50vh",
          overflowY: "auto",
          padding: "5px",
          marginBottom: "10px",
        }}
      >
        {messages.filter(((ele) => ele.visible)).map(({ id, text, user, timestamp, likes }) => (
          <div
            key={id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "5px 0",
              flexDirection: user === profileData.email ? "row-reverse" : "row",
            }}
          >
            {/* Avatar circle */}
            <div
              style={{
                height: "35px",
                width: "35px",
                backgroundColor:
                  user === profileData.email ? "#007aff" : "#e5e5ea", // Adjust color to match the bubble
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
                color: user === profileData.email ? "white" : "black", // Adjust text color for contrast
                fontWeight: "bold",
                margin: user === profileData.email ? "0 0 0 10px" : "0 10px",
              }}
            >
              {user && user.charAt(0).toUpperCase()}
            </div>
            {/* Message bubble */}
            <div
              style={{
                background: user === profileData.email ? "#007aff" : "#e5e5ea",
                color: user === profileData.email ? "white" : "black",
                borderRadius: "20px",
                padding: "10px 14px",
                maxWidth: "calc(100% - 60px)", // account for avatar and margins
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
                fontSize: "16px",
                wordBreak: "break-word",
                order: user === profileData.email ? 0 : 1, // Adjust order based on user
              }}
            >
              <p style={{ margin: 0 }}>{text}</p>
              <small
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "12px",
                  color: user === profileData.email ? "#b6d0ff" : "#888",
                }}
              >
                {timestamp.toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </small>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", position: "relative" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            marginRight: "8px",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
