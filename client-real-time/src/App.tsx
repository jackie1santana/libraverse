import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Notifications } from './Components/Notifications/Notifications';
import { LiveChat } from './Components/LiveChat/LiveChat';
import { SupportChat } from './Components/SupportChat/SupportChat';

function App() {
  const [status, setStatus] = useState(0);

  const fruits: string[] = ['Apple', 'Banana', 'Orange'];
  fruits.forEach(fruit => {
    console.log(fruit);
  });

  return (
    <Router>
      <div>
        <Notifications setStatus={setStatus} />
        {/* Correctly use Routes here */}
        <Routes>
          <Route path="/chat" element={<LiveChat />} />
          <Route path="/support/chat" element={<SupportChat />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
