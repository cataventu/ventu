import React from 'react';

function DossieLinha({ children, position }) {
  return (
    <>
      <p className={`text-${position} pt-1 pb-1`}>
        { children }
      </p>
    </>
  );
}
export default DossieLinha;
