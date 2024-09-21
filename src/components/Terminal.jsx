import React, { useState } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit input to 9 digits
    if (/^\d*$/.test(value) && value.length <= 9) {
      setInput(value);
    }
  };

  // form takes in 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 9) {
      setSubmitted(true);
      console.log("Submitted Password: ", input);
    }
  };

  return (
    <div className="terminal-container">
      <form onSubmit={handleSubmit}>
        <div className="terminal">

            {/* Input 9-digit student number */}
            <span className="terminal-prompt">$ </span>
            <input
                type="text"
                className="terminal-input"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter 9-digit code"
                autoFocus
            />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {submitted && <p>Password Submitted: {input}</p>}
    </div>
  );
};

export default Terminal;