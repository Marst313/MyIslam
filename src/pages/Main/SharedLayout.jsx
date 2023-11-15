import { Icon } from '@iconify/react';
import { Navbar, Musicbar, BigSidebar } from '../../components';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getSurat, setMusicBar } from '../../features/surat';
import { useEffect, useRef } from 'react';
import { getDoa } from '../../features/doa';
import { getAllCity } from '../../features/jadwalSlice';

const SharedLayout = () => {
  const { isActive, currentSurat } = useSelector((store) => store.surat);

  const dispatch = useDispatch();
  const buttonUpRef = useRef(null);
  const buttonGoToTopRef = useRef(null);

  const handleOpenMusicBar = () => {
    dispatch(setMusicBar(true));
  };
  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(getSurat());
    dispatch(getDoa());
    dispatch(getAllCity());

    const handleScroll = () => {
      if (window.scrollY > 0) {
        buttonGoToTopRef.current.style.transform = 'translateY(0px)';
      } else {
        buttonGoToTopRef.current.style.transform = 'translateY(100px)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 1.25 }} className="container-shared">
      <BigSidebar />
      <Navbar />
      <Musicbar />
      <button type="button" onClick={handleOpenMusicBar} ref={buttonUpRef}>
        <Icon
          icon="material-symbols:keyboard-arrow-up-rounded"
          className={`${!isActive ? 'translate-y-0' : 'translate-y-96'} ${
            Object.values(currentSurat).length > 0 ? 'flex' : 'hidden'
          } transition-all w-10 h-10 fixed bottom-16 right-0 bg-lightBlue bg-opacity-70 backdrop-blur-sm rounded-sm  text-blueDark mr-5  z-10 shadow-custom hover:bg-opacity-50 w `}
        />
      </button>

      <button className="btn-goTop" onClick={handleBackToTopClick} ref={buttonGoToTopRef}>
        <span>Back to Top</span>
      </button>

      <Outlet />
    </motion.div>
  );
};

export default SharedLayout;
