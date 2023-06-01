import { Icon } from '@iconify/react';
import ButtonDarkMode from './ButtonDarkMode';
import { useDispatch, useSelector } from 'react-redux';
import NavOpen from './NavOpen';
import { openSidebar } from '../features/user';
const Navbar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <nav className="nav">
      <button type="button" onClick={handleOpenSidebar}>
        <Icon icon="solar:hamburger-menu-outline" />
      </button>
      <h1>My Islam</h1>
      <ButtonDarkMode />

      {isSidebarOpen && <NavOpen />}
    </nav>
  );
};

export default Navbar;
