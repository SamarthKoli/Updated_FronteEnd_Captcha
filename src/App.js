import React, { useState } from 'react';

function App() {
  const [mouseMovements, setMouseMovements] = useState(50);
  const [keyboardInputs, setKeyboardInputs] = useState(20);
  const [timeOnPage, setTimeOnPage] = useState(60);
  const [jsEnabled, setJsEnabled] = useState(true);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      mouse_movements: mouseMovements,
      keyboard_inputs: keyboardInputs,
      time_on_page: timeOnPage,
      js_enabled: jsEnabled,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>ML Model Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Mouse Movements:
          <input
            type="number"
            value={mouseMovements}
            onChange={(e) => setMouseMovements(e.target.value)}
          />
        </label>
        <br />
        <label>
          Keyboard Inputs:
          <input
            type="number"
            value={keyboardInputs}
            onChange={(e) => setKeyboardInputs(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time on Page (seconds):
          <input
            type="number"
            value={timeOnPage}
            onChange={(e) => setTimeOnPage(e.target.value)}
          />
        </label>
        <br />
        <label>
          JavaScript Enabled:
          <input
            type="checkbox"
            checked={jsEnabled}
            onChange={(e) => setJsEnabled(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div>
          <h2>Prediction Result</h2>
          <p>Prediction: {result.prediction}</p>
          <p>Probability: {result.probability}</p>
        </div>
      )}
    </div>
  );
}

export default App;
