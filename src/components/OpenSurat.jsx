import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOneSurat } from '../features/surat';
import { Loading, OneAyat, OpenSuratHeading } from './';
import { motion } from 'framer-motion';
import Tafsir from '../pages/Main/Tafsir';

const OpenSurat = () => {
  const { id } = useParams();
  const { openSurat, isLoading, types } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    dispatch(getOneSurat(id));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (types === 'Tafsir') return <Tafsir />;

  return (
    <section className="mb-32 relative">
      <OpenSuratHeading {...openSurat} />
      <motion.ul initial="hidden" animate="visible" variants={list}>
        {openSurat.ayat?.map((surat) => {
          return <OneAyat key={surat.nomorAyat} {...surat} />;
        })}
      </motion.ul>
    </section>
  );
};

export default OpenSurat;
