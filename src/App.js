import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Success from './components/Success';
import Error from './components/Error';

function App() {
  return (
    <>
    <Router>
      
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/success' element={<Success />} />
        <Route exact path='/active-captcha' element={<Error />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
