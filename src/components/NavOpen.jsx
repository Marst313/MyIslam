import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../features/user';
import NavLinks from './NavLinks';

const NavOpen = () => {
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <nav className="nav-open">
      <button type="button" onClick={handleCloseSidebar}>
        <Icon icon="ic:round-close" />
      </button>
      <NavLinks />
    </nav>
  );
};

export default NavOpen;
