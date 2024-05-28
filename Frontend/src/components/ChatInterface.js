// src/components/ChatInterface.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const history = useNavigate()

  const sendMessage = async () => {
    console.log(input)
    const storedCustomerId = Cookies.get("cust_id");
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    console.log(`message is sent by customer with id as ${storedCustomerId}`)
    setMessages(newMessages);
    try {
      const response = await fetch('http://localhost:5001/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input , customer_id : storedCustomerId}),
      });
      const data = await response.json();
      console.log(data)
      // setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
      // setMessages([...newMessages, { sender: 'bot', text: data }]);
      setMessages([newMessages, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.log('Error sending message:', error.message);
    }
    setInput('');
  };

  const handleLogout = ()=> {
      Cookies.remove("cust_id");
      
      history("/login");
  }

  return (
    <div className="chat-container">
    <button type = "button" onClick = {handleLogout}>Logout</button>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
