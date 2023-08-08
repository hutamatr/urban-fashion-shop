import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import useDarkMode from '@hooks/useDarkMode';

export default function SwitcherTheme() {
  const { colorTheme, setTheme } = useDarkMode();
  const [darkTheme, setDarkTheme] = useState(colorTheme === 'light');

  const toggleThemeHandler = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkTheme(checked);
  };

  return (
    <>
      <DarkModeSwitch
        checked={darkTheme}
        onChange={toggleThemeHandler}
        size={22}
        sunColor='#FC9601'
        moonColor='#FEFCD7 '
      />
    </>
  );
}
