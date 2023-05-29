import React from 'react';
import { typesLink } from '../utils/links';
import { useDispatch, useSelector } from 'react-redux';
import { changeType } from '../features/surat';

const Heading = () => {
  const { types } = useSelector((store) => store.surat);
  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(changeType(name));
  };

  return (
    <div className="container-heading">
      {typesLink.map((type) => {
        const { name, id, path } = type;

        return (
          <button key={id} className={types === name ? 'bg-cyan  text-blueDark rounded-sm shadow-custom' : ''} onClick={() => handleClick(name)}>
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default Heading;
