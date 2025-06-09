import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      // Закрываем меню при переходе в мобильный режим
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } 
      // При переходе на десктоп сбрасываем состояние
      else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="nav">
      <button 
        className="hamburger" 
        id="menuBtn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <ul 
        className={`menu ${isOpen ? 'open' : ''}`} 
        id="menu"
      >
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
} 

export default App;