import React from 'react';

const ButtonDarkMode = () => {
  return (
    <div className="flex justify-end ">
      <label className="switch ">
        <input type="checkbox" />
        <span className="slider bg-blueDark"></span>
      </label>
    </div>
  );
};

export default ButtonDarkMode;
