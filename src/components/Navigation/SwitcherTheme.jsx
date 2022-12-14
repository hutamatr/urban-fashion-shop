import { useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const SwitcherTheme = () => {
  const { colorTheme, setTheme } = useDarkMode();
  const [darkTheme, setDarkTheme] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleThemeHandler = (checked) => {
    setTheme(colorTheme);
    setDarkTheme(checked);
  };

  return (
    <>
      <DarkModeSwitch
        checked={darkTheme}
        onChange={toggleThemeHandler}
        size={22}
        sunColor="#FC9601"
        moonColor="#FEFCD7 "
      />
    </>
  );
};

export default SwitcherTheme;
