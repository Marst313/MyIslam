import hero from '../assets/images/hero.png';
import { ButtonDarkMode, LandingDecoration, Title } from '../components';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <motion.main className="p-5 text-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
      <ButtonDarkMode />
      <Title />
      <div className="container-landing bg-gradient-to-t from-blueDark2 to to-lightBlue2">
        <LandingDecoration />
        <img src={hero} alt="hero image" className="hero-img" />
        <h2>بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيْ</h2>
        <Link to="/">
          <button type="button">Get Started</button>
        </Link>
      </div>
    </motion.main>
  );
};

export default Landing;
