import { useState, useEffect } from 'react';

const Switcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Проверка сохранённого состояния темы в localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    }
  }, []);

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newMode = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newMode); // Сохраняем выбранный режим
    document.documentElement.classList.toggle('dark', !isDarkMode); // Переключаем класс на root элемент
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
    >
      {isDarkMode ? 'Светлый режим' : 'Тёмный режим'}
    </button>
  );
};

export default Switcher;
