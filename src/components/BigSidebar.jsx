import React from 'react';
import { useSelector } from 'react-redux';
import NavLinks from './NavLinks';
import { Icon } from '@iconify/react';
import { closeSidebar } from '../features/user';
import { useDispatch } from 'react-redux';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <aside className={`${isSidebarOpen ? 'lg:translate-x-0 ' : 'lg:-translate-x-full'} container-sidebar `}>
      <button type="button" onClick={handleCloseSidebar}>
        <Icon icon="ic:round-close" />
      </button>
      <NavLinks />
    </aside>
  );
};

export default BigSidebar;
