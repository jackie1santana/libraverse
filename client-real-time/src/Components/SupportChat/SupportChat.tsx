import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '../../state/hooks'
import { decrement, increment } from './LiveChatSlice'

// Connect to Socket.IO server
const socket = io.connect('http://localhost:8000');

export const SupportChat = () => {
  const liveChatState = useAppSelector((state) => state.liveChat.value)
  const dispatch = useAppDispatch()

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  console.log('redux works', liveChatState);
  useEffect(() => {
    // Listen for 'chat message' events from the server
    socket.on('chat message', (msg) => {
      // Append the received message to the messages state
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      // Emit 'chat message' event to the server with sender and text
      socket.emit('chat message', { sender: "Help Desk", text: inputMessage });
      setInputMessage(''); // Clear input field after sending
    }
  };

  return (
    <div>
      <h2>Help Desk Support Chat</h2>
      <div id="chat-box">
        {/* Display each message in the chat box */}
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
