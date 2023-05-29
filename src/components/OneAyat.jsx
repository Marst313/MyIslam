import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import React from 'react';

const OneAyat = ({ teksArab, nomorAyat, teksLatin, teksIndonesia }) => {
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };
  return (
    <motion.li variants={item} transition={{ type: 'spring', stiffness: 100 }} className="container-one_ayat">
      <div>
        <button type="button">
          <Icon icon="material-symbols:bookmark-outline" />
        </button>
        <div>
          <h2>{nomorAyat.toLocaleString('ar-EG')}</h2>
        </div>
        <p>{teksArab}</p>
      </div>
      <div>
        <h3>{teksLatin}</h3>
        <p>{teksIndonesia}</p>
      </div>
    </motion.li>
  );
};

export default OneAyat;
