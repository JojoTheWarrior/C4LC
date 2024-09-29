import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import axios from 'axios';
import Typed from "typed.js";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [firstType, setFirstType] = useState(false);

  const typedElementRef = useRef(null); // current line being typed
  const typedInstanceRef = useRef(null); // typed.js instance

  const [prevLine, setPrevLine] = useState("");

  const [allLines, setAllLines] = useState([]); // what we get back from backend

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
    "Type in your student number below:"
  ]);

  const addNewLine = (newLineText) => {
    startTyping(newLineText); 
  }

  const startTyping = (newText) => {
    if (typedInstanceRef.current) typedInstanceRef.current.destroy();

    // initialize typed.js
    if (typedElementRef.current){
        console.log(`start typing ${newText}`)
        typedInstanceRef.current = new Typed(typedElementRef.current, {
            strings: [newText],
            typeSpeed: 7,
            showCursor: false,
        });
    }
  }

  // start typing when terminal changes
  const buttonClicked = () => {
    addNewLine("hello random char random char");
  }

  useEffect(() => {
    console.log('allLines updated', allLines);
    if (allLines.length == 0){
      console.log('initla load');
      return;
    } 
    console.log('started typing');
    if (!firstType){
      setFirstType(true);
      typeSequentially();
    }
  }, [allLines]);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !submitted) {
      event.preventDefault();
      if (input.trim()) {
        console.log('Submitted Text:', input);
        setTerminal((prevLines) => [...prevLines, input]);
        setSubmitted(true);

        // makes the request
        try {
          const response = await axios.post('https://c4lc-backend-761604726507.us-east1.run.app/calculate', {
            studentNum: input,
          });
          const data = response.data;

          data.forEach((item, index) => {
            setAllLines((prevLines) => {
              return [...prevLines, `Step ${index + (index==14 ? 2 : 1)}: ${item}`];
            });
          });
        } catch (error){
          console.log('error from server:', error);
        }
      }
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeSequentially = async () => {
    console.log(allLines);
    for (let i = 0; i < allLines.length; i++){
      addNewLine(allLines[i]);
      const typingDuration = allLines[i].length * 10 + 500;
      await delay(typingDuration);
      setTerminal((prevLines) => [...prevLines, allLines[i]]);
    }
    startTyping("Done!");
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
    </div>
  );
};

export default Terminal;