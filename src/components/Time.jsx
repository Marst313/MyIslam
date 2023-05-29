import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/helper';

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="w-20 ">
      <h2 className="lg:text-2xl">{formatTime(currentTime)}</h2>
    </div>
  );
};

export default Time;
