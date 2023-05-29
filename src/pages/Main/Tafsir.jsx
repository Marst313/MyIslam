import React, { useEffect, useState } from 'react';
import { SearchBar, Heading, Loading, OpenSuratHeading } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getTafsir } from '../../features/surat';
import OneTafsir from '../../components/OneTafsir';
import { motion } from 'framer-motion';

const Tafsir = () => {
  const { tafsir, openSurat } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTafsir(openSurat.nomor));
  }, []);

  return (
    <main className="flex-col flex-center ">
      <OpenSuratHeading {...openSurat} />
      <motion.ul initial="hidden" animate="visible" className="flex flex-col text-white p-5  leading-normal mb-20">
        {tafsir?.tafsir?.map((item) => {
          return <OneTafsir key={item.ayat} {...item} />;
        })}
      </motion.ul>
    </main>
  );
};

export default Tafsir;
