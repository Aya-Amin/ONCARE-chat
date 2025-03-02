import React, { useState, useEffect } from "react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { requestFirebaseToken } from "./firebase";
import React, { useState, useEffect } from "react";
import { api } from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyAZlzpiD50A5yT24b6YLpZaXOag79bXGgk",
  authDomain: "chat-frontend-6f2a1.firebaseapp.com",
  projectId: "chat-frontend-6f2a1",
  storageBucket: "chat-frontend-6f2a1.firebasestorage.app",
  messagingSenderId: "728271172715",
  appId: "1:728271172715:web:ce9760c4910c450696ad2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch Messages from Backend
  useEffect(() => {
    axios.get("http://localhost:4000/messages/conversation/1")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Listen for new messages from Firebase
    onMessage(messaging, (payload) => {
      setMessages((prev) => [...prev, payload.data]);
    });

    requestFirebaseToken(); // Get FCM token on app load

    api.get("/messages/conversation/1") // Assuming conversation ID = 1
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  // Send a Message
  const sendMessage = async () => {
    if (message.trim() === "") return;
    
    try {
      await api.post("/messages/send", {
        conversationId: "1",
        senderId: "1",
        content: message,
      });
      setMessages([...messages, { senderId: "1", content: message }]); // Update UI
      setMessage(""); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chat</h2>
      
      <div>
        <h2>Simple Chat with Firebase</h2>
        <p>Firebase setup completed. Ready for real-time messaging!</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 200 }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.senderId}:</b> {msg.content}</p>
        ))}
      </div>

      <div style={{ padding: 20 }}>
      <h2>Chat Messages</h2>
      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 200 }}>
          {messages.map((msg, i) => (
            <p key={i}><b>{msg.senderId}:</b> {msg.content}</p>
          ))}
        </div>
      </div>

      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
      <button onClick={sendMessage}>Send</button>

    </div>
  );
}

export default App;
