import './App.css';
import React, { useState } from 'react'; // useEffect пока не нужен для этой задачи

function App() {
  // Состояние для отслеживания, открыто ли меню
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      {/* При клике на кнопку вызываем toggleMenu */}
      <button className="hamburger" id="menuBtn" onClick={toggleMenu}>
        Menu
      </button>
      {/* Динамически добавляем класс 'open', если isOpen === true */}
      <ul className={`menu ${isOpen ? 'open' : ''}`} id="menu">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default App;
