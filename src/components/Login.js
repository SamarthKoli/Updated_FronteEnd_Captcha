import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/Login.css';
import aadhar_logo from '../assets/images/aadhar_logo.png';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

const Login = () => {
  const [aadharNumber, setAadharNumber] = useState(''); // Stores the input Aadhar number
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const [mouseMovementCount, setMouseMovementCount] = useState(0); // Tracks mouse movement
  const [keystrokeCount, setKeystrokeCount] = useState(0); // Tracks keystrokes
  const [startTime, setStartTime] = useState(Date.now()); // Start time to measure time on page
  const [isBotActive, setIsBotActive] = useState(false); // To trigger bot simulation

  const slideSubmitRef = useRef(null); // Ref for the slide container
  const slideThumbRef = useRef(null); // Ref for the slide thumb button

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Tracks mouse movement
  const handleMouseMove = () => {
    setMouseMovementCount(prevCount => prevCount + 1);
  };

  // Tracks keystrokes
  const handleKeyDown = () => {
    setKeystrokeCount(prevCount => prevCount + 1);
  };

  // Handles Aadhar number input change and enables slide button if valid
  const handleInputChange = (e) => {
    const value = e.target.value;
    setAadharNumber(value);
    if (/^\d{12}$/.test(value)) {
      slideSubmitRef.current.style.pointerEvents = 'auto';
      slideSubmitRef.current.style.opacity = '1';
      setErrorMessage('');
    } else {
      slideSubmitRef.current.style.pointerEvents = 'none';
      slideSubmitRef.current.style.opacity = '0.5';
      setErrorMessage('Aadhar number must be exactly 12 digits.');
    }
  };

  // Handles the slide submit button's mouse down event for sliding
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const thumbWidth = slideThumbRef.current.offsetWidth;
    const containerWidth = slideSubmitRef.current.offsetWidth;

    const onMouseMove = (e) => {
      let newX = e.clientX - startX;
      if (newX < 0) newX = 0;
      if (newX > containerWidth - thumbWidth) newX = containerWidth - thumbWidth;
      slideThumbRef.current.style.left = newX + 'px';
      if (newX === containerWidth - thumbWidth) {
        slideSubmitRef.current.classList.add('active');
      } else {
        slideSubmitRef.current.classList.remove('active');
      }
    };

    const onMouseUp = async () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (slideSubmitRef.current.classList.contains('active')) {
        await submitForm();
      } else {
        slideThumbRef.current.style.left = '0px'; // Reset thumb if not fully slid
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Handles form submission after slide complete
  const submitForm = async (customAadharNumber = null) => {
    const endTime = Date.now();
    const timeOnPage = Math.floor((endTime - startTime) / 1000);

    // Use the custom Aadhar number if provided (from bot), otherwise use the state
    const aadharToSubmit = customAadharNumber || aadharNumber;

    // Gather user data
    const userData = {
      mouseMovementCount,
      keystrokeCount,
      timeOnPage,
      js_enabled: 1,
      aadharNumber: aadharToSubmit,  // Include Aadhar number in the request body
    };

    console.log('User Interaction Data:', JSON.stringify(userData, null, 2));

    if (/^\d{12}$/.test(aadharToSubmit)) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/predict/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const { probability } = result;

        // Navigation based on probability result
        if (probability <= 0.4) {
          navigate('/success');
        } else if (probability > 0.4 && probability <= 0.6) {
          navigate('/active-captcha');
        } else {
        //   navigate('/active-captcha');
           
          resetInteractionData();
          alert('bot dectected')
        }

      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrorMessage('Please enter a valid 12-digit Aadhar number.');
    }
  };

  // Resets interaction data on failure or retry
  const resetInteractionData = () => {
    setKeystrokeCount(0);
    setMouseMovementCount(0);
    setStartTime(Date.now());
  };

  // Simulates bot activity by filling the form and sliding the button
  const triggerBot = async () => {
    setIsBotActive(true);

    const randomAadharNumber = '123456789012'; // Mock Aadhar number

    // Simulate setting the Aadhar number directly (avoid relying on delayed state updates)
    setAadharNumber(randomAadharNumber);

    setMouseMovementCount(50);
    setKeystrokeCount(40);

    // Wait a moment to ensure state is updated
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate sliding the button
    setTimeout(async () => {
      if (slideSubmitRef.current && slideThumbRef.current) {
        const containerWidth = slideSubmitRef.current.offsetWidth;
        const thumbWidth = slideThumbRef.current.offsetWidth;
        slideThumbRef.current.style.left = (containerWidth - thumbWidth) + 'px';
        slideSubmitRef.current.classList.add('active');

        // Pass the mock Aadhar number to the submit function directly
        await submitForm(randomAadharNumber);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <Header />
      <img src={aadhar_logo} alt="Logo" />
      <h1>Aadhar Portal</h1>
      <form id="aadhar-form">
        <input 
          type="text" 
          id="aadhar-number" 
          name="aadhar-number" 
          placeholder="Enter Aadhar Number" 
          value={aadharNumber} 
          onChange={handleInputChange} 
          required 
        />
        <div className="error-message">{errorMessage}</div>
        <div 
          className="slide-submit" 
          ref={slideSubmitRef} 
          style={{ pointerEvents: 'none', opacity: '0.5' }}
        >
          <div className="slide-submit-text">Slide To Submit</div>
          <div 
            className="slide-submit-thumb" 
            ref={slideThumbRef} 
            onMouseDown={handleMouseDown}
          />
        </div>
      </form>
      <button onClick={triggerBot} disabled={isBotActive} className="bot-button">
        Trigger Bot
      </button>
      <Footer />
    </div>
  );
};

export default Login;
