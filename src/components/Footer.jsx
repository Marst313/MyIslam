import { Icon } from '@iconify/react';
import React from 'react';
import { footerLinks } from '../utils/links';

const Footer = () => {
  return (
    <footer>
      <div>
        <span>
          © {new Date().getFullYear()}{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            I Nyoman Dharma
          </a>
          . All Rights Reserved.
        </span>
        <div>
          {footerLinks.map((link) => {
            return (
              <a href={link.link} target="_blank" key={link.id}>
                <Icon icon={link.logo} />
                <span className="sr-only">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
