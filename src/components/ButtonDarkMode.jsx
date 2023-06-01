import React, { useEffect, useRef, useState } from 'react';

const ButtonDarkMode = () => {
  const buttonRef = useRef(null);
  const [lightMode, setLightMode] = useState(localStorage.theme);

  const handleOnChange = (e) => {
    setLightMode(!lightMode);
    const html = document.querySelector('html');

    if (!buttonRef.current.checked) {
      localStorage.theme = 'dark';
      html.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      html.classList.remove('dark');
    }
  };

  useEffect(() => {
    const html = document.querySelector('html');

    if (localStorage.theme === 'dark' || !buttonRef.current.checked) {
      setLightMode(false);
      localStorage.theme = 'dark';
      html.classList.add('dark');
    } else {
      setLightMode(true);
      localStorage.theme = 'light';
      html.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex justify-end ">
      <label className="switch ">
        <input type="checkbox" ref={buttonRef} onChange={handleOnChange} checked={lightMode} />
        <span className="slider bg-blueDark"></span>
      </label>
    </div>
  );
};

export default ButtonDarkMode;
