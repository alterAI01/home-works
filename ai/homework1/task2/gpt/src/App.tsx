// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Сброс состояния isOpen при переключении на «десктоп» (ширина >768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="nav">
      <button
        className="hamburger"
        id="menuBtn"
        onClick={() => setIsOpen(prev => !prev)}
      >
        Menu
      </button>
      <ul className={`menu${isOpen ? ' open' : ''}`} id="menu">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default App;
