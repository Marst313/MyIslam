import { Icon } from '@iconify/react';
import number from '../assets/images/number.svg';
import React, { useState } from 'react';

const OneDoa = ({ title, arabic, latin, translation, index }) => {
  const [open, setIsOpen] = useState(false);
  let left = 'left-[3.5rem]';
  if (index + 1 > 9) left = 'left-[3.3rem]';

  return (
    <article key={index}>
      <div className="container-one_doa">
        <img src={number} alt="container-number" />
        <h1 className={`absolute ${left} top-[3.2rem] text-sm `}>{index + 1}</h1>

        <div>
          <h2>{title}</h2>
          <div className={`${open ? ' translate-y-0 opacity-100' : 'h-10 opacity-0 -translate-y-[100%]'} `}>
            <h3>{arabic}</h3>
            <p>{latin}</p>
            <p>{translation}</p>
          </div>
        </div>
        <button type="button" onClick={() => setIsOpen(!open)}>
          <Icon icon="iconamoon:arrow-up-2-light" className={`${open ? 'opacity-100' : 'opacity-0'}`} />
          <Icon icon="iconamoon:arrow-down-2-light" className={`${open ? 'opacity-0' : 'opacity-100'} `} />
        </button>
      </div>
      <hr />
    </article>
  );
};

export default OneDoa;
