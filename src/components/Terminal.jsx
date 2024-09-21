import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';
import Typed from "typed.js";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /* array of elements representing the terminal */
  const [terminal, setTerminal] = useState([
    <p>Welcome to C4LC, a program to check your work for the Vectors Culminating Activity! </p>,
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  ]);

  return (
    <div className="terminal-container">
        {/* render all previous lines */}
        {terminal.map((line) => {
            return <div className="terminal-line">
                <p className="terminal-prompt">$</p>
                {line}
            </div>
        })}
    </div>
  );
};

export default Terminal;