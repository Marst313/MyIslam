import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Description = ({ deskripsi, setOpenDesc }) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('button')) setOpenDesc(false);
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <motion.div className="container-description">
      <h1> Deskripsi</h1>
      <p>{deskripsi}</p>

      <button type="button" onClick={() => setOpenDesc(false)}>
        <Icon icon="ic:round-close" />
      </button>
    </motion.div>
  );
};

export default Description;
