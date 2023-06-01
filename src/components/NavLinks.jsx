import { links } from '../utils/links';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <div className="text-center text-lightBlue ">
      {links.map((link) => {
        const { id, icon, text, path } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active-link ' : 'nav-link group';
            }}
          >
            <Icon icon={icon} width="42" className="icon dark:group-hover:text-blueDark group-hover:text-white" />
            <h2 className=" dark:group-hover:text-blueDark group-hover:text-white">{text}</h2>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
