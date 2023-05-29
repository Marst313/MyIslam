import hero from '../assets/images/hero.png';
import { ButtonDarkMode, LandingDecoration, Title } from '../components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { endApp, startApp } from '../features/user';

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(endApp());
  }, []);

  const handleApp = () => {
    dispatch(startApp());
  };

  return (
    <motion.main className="p-5 text-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
      <ButtonDarkMode />
      <Title />
      <div className="container-landing bg-gradient-to-t from-blueDark2 to to-lightBlue2">
        <LandingDecoration />
        <img src={hero} alt="hero image" className="hero-img" />
        <h2>بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيْ</h2>
        <Link to="/">
          <button onClick={handleApp} type="button">
            Get Started
          </button>
        </Link>
      </div>
    </motion.main>
  );
};

export default Landing;
