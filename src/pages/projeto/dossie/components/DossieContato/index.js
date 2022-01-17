import React from 'react';

function DossieContato({
  pjuridica, endereco, email, telefone, obs,
}) {
  return (
    <>
      <h6 className="text-dark">
        <b>{ pjuridica }</b>
      </h6>
      <p>{ endereco }</p>
      <p>
        <span className="text-info">{ email }</span>
        {' | '}
      </p>
      <p>
        { telefone }
        {' | '}
      </p>
      <p className="pt-1 text-muted">
        { obs }
      </p>
    </>
  );
}
export default DossieContato;
