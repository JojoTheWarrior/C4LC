import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import Typed from "typed.js";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const typedElementRef = useRef(null); // current line being typed
  const typedInstanceRef = useRef(null); // typed.js instance

  const [prevLine, setPrevLine] = useState("");

  const randomStrings = [
    "string 1",
    "iaohgoias",
    "giohoiasdjfiojg",
    "ioagodjfag",
    "gioeawiojfoiadg",
    "giewaoijiadsjg"
  ]

  /* array of elements representing the terminal */
  const [terminal, setTerminal] = useState([
    "Welcome to C4LC, a program to check your work for the Vectors Culminating Activity!",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  ]);

  const addNewLine = (newLineText) => {
    startTyping(newLineText); 
  }

  const startTyping = (newText) => {
    if (typedInstanceRef.current) typedInstanceRef.current.destroy();

    // initialize typed.js
    if (typedElementRef.current){
        console.log(`start typing {newText}`)
        typedInstanceRef.current = new Typed(typedElementRef.current, {
            strings: [newText],
            typeSpeed: 25,
            showCursor: false,
        });
    }
  }

  // start typing when terminal changes
  const buttonClicked = () => {
    addNewLine("hello random char random char");
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (input.trim()) {
        console.log('Submitted Text:', input);
        setTerminal((prevLines) => [...prevLines, input]);
        setSubmitted(true);
        typeSequentially();
      }
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeSequentially = async () => {
    for (let i = 0; i < randomStrings.length; i++){
      addNewLine(randomStrings[i]);
      const typingDuration = randomStrings[i].length * 25 + 1000;
      await delay(typingDuration);
      setTerminal((prevLines) => [...prevLines, randomStrings[i]]);
    }
  }

  return (
    <div className="terminal-container">
        {/* render all previous lines */}
        
        {terminal.map((line) => {
            return <div className="terminal-line">
                <p className="terminal-prompt">$</p>
                <p>{line}</p>
            </div>
        })}

        {
          !submitted ? 
          <div className="terminal-line">
            <p className="terminal-prompt">$</p>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          :

          <>
          </>
        }

        <div className="terminal-line">
            <p className="terminal-prompt">$</p>
            <p ref={typedElementRef}></p>
        </div>

        <button onClick={() => {
          addNewLine(randomStrings[Math.floor(Math.random() * randomStrings.length)])
        }}>
          Add new line
        </button>
    </div>
  );
};

export default Terminal;