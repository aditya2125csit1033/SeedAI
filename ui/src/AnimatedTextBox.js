import React, { useState, useEffect } from 'react';
import './AnimatedTextBox.css';

// Define sentences
const sentences = [
  "Autism is a neurodevelopmental condition that affects communication, social interaction, and behavior.",
  "Early detection and intervention can significantly improve outcomes for children and individuals with autism.",
  "Our mission is to empower families and caregivers by providing an accurate and accessible autism screening solution.",
  "We leverage advanced technology to identify developmental patterns and signs of autism at the earliest stage.",
  "Join us in creating a world where every child receives the support they need to thrive."
];

function AnimatedTextBox() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); 
  const [isTyping, setIsTyping] = useState(true); 
  const [letterIndex, setLetterIndex] = useState(0); 
  
  useEffect(() => {
    const sentence = sentences[currentSentenceIndex];
    let interval;

    const typeText = () => {
      if (isTyping) {
        if (letterIndex < sentence.length) {
          setDisplayedText((prev) => prev + sentence[letterIndex]);
          setLetterIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsTyping(false); 
          }, 4000); 
        }
      } else {
        if (letterIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, prev.length - 1));
          setLetterIndex((prev) => prev - 1);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length); 
            setIsTyping(true); 
            setLetterIndex(0); 
            setDisplayedText(''); 
          }, 1000); 
        }
      }
    };

   
    interval = setInterval(typeText, isTyping ? 30 : 22);

    return () => clearInterval(interval); 
  }, [isTyping, letterIndex, currentSentenceIndex]); 

  return (
    <div className="text-box">
      <p>{displayedText}</p>
    </div>
  );
}

export default AnimatedTextBox;
