"use client";

import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [ mounted, setMounted ] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted){
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <MdLightMode
          className="text-xl cursor-pointer hover:text-amber-500"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsFillMoonFill
          className="text-xl cursor-pointer hover:text-amber-500"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
};

export default DarkModeSwitch;