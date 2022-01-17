import React from 'react';

function DossieSubTitulo({ texto }) {
  return (
    <>
      <h5 className="pb-2 text-info">
        { texto.toString().toUpperCase() }
      </h5>
    </>
  );
}
export default DossieSubTitulo;
