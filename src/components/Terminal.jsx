import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import Typed from "typed.js";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /* array of elements representing the terminal */
  const [terminal, setTerminal] = useState([]);

  /* displaying solution */
  const [solutions, setSolutions] = useState([]);
  const [showTypedOutput, setShowTypedOutput] = useState(false);

  useEffect(() => {
    if (showTypedOutput) {
      
      const options = {
        strings: solutions, // array of strings for each step in the solution
        typeSpeed: 50,      
        backSpeed: 25,      
        showCursor: true,   // display cursor
        cursorChar: "|",    // customize cursor character
        loop: false         
      };

      // initialize typed.js on the element
      // const typed = new Typed(typedElement.current, options);

      // cleanup typed.js when the component unmounts
      return () => {
        // typed.destroy();
      };
    }
  }, [showTypedOutput, solutions]);

  return (
    <></>
  );
};

export default Terminal;