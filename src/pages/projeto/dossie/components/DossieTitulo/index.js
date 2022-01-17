import React from 'react';

function DossieTitulo({ titulo }) {
  return (
    <>
      <h4 className="text-roxo-ventu mt-4">
        { titulo.toString().toUpperCase() }
      </h4>
      <hr className="mt-2 bg-roxo-ventu" />
    </>
  );
}
export default DossieTitulo;
