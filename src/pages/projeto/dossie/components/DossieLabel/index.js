import React from 'react';
import './style.css';

function DossieLabel({ titulo, conteudo }) {
  return (
    <>
      <strong className="text-dark dossie-label-title">
        {`${titulo}: `}
      </strong>
      <span className="pl-2 pr-3 text-muted dossie-label-content">
        { conteudo }
      </span>
    </>
  );
}
export default DossieLabel;
