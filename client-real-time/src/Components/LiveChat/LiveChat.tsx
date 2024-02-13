import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '../../state/hooks'
import { decrement, increment } from './LiveChatSlice'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
// Connect to Socket.IO server
const socket = io.connect('http://localhost:8000');

export const LiveChat = () => {
  const liveChatState = useAppSelector((state) => state.liveChat.value)
  const dispatch = useAppDispatch()

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

 

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
      socket.emit('chat message', { sender: "John", text: inputMessage });
      setInputMessage(''); // Clear input field after sending
    }
  };

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <div>
      <h2>John's Live Chat</h2>
      <div id="chat-box">
        {/* Display each message in the chat box */}
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg?.sender}:</strong> {msg?.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>

       <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};
