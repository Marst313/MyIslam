import { motion } from 'framer-motion';
import React, { useState } from 'react';

const OneTafsir = ({ ayat, teks }) => {
  const [readMore, setReadMore] = useState(false);

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <motion.li variants={item} transition={{ type: 'spring', stiffness: 100 }} className="container-one_tafsir">
      <h1>{ayat.toLocaleString('ar-EG')}</h1>
      {readMore ? (
        <p>
          {teks} <span onClick={() => setReadMore(false)}>...Lebih Sedikit</span>
        </p>
      ) : (
        <p>
          {`${teks.substr(0, 300)} `}
          <span onClick={() => setReadMore(true)}>Baca Selengkapnya...</span>
        </p>
      )}
    </motion.li>
  );
};

export default OneTafsir;
