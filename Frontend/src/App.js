// src/App.js
import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import Login from './components/loginPage/index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = "/login" element = {<Login/>} />
        <Route exact path = "/" element = {<ChatInterface/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
