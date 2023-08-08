import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const rootElm = window.document.documentElement;
    rootElm.classList.remove(colorTheme);
    rootElm.classList.add(theme);

    const bodyElm = window.document.body;
    if (colorTheme === 'light') {
      bodyElm.style.backgroundColor = '#3F362F';
    } else {
      bodyElm.style.backgroundColor = '#E6E1DC';
    }

    localStorage.setItem('urban-theme', theme);
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
};

export default useDarkMode;
