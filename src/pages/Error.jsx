import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ msg }) => {
  return (
    <div className="w-full flex-center gap-10 flex-col">
      <h1>Error</h1>
      <p className="text-white max-w-xs text-center font-semibold">{msg || 'Something went wrong '}</p>
      <Link to="/" className="bg-cyan px-10 py-1 font-semibold rounded-sm hover:scale-105 transition-all hover:bg-opacity-80">
        Back to home{' '}
      </Link>
    </div>
  );
};

export default Error;
