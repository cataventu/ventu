///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import FichaAnexo from '../../../anexo/ficha';

///////// PFISICA ///////////////
/////////////////////////////////
const AnexoFicha = ({ location, match, history }) => (
  <FichaAnexo
    location={location}
    match={match}
    history={history}
    id_pfisica={match.params.id}
    id_pjuridica={0}
    id_projeto={0}
    id_proservico={0}
    id_movimento={0}
    title="Pessoa Física"
    subtitle="/ Anexo"
  />
);

export default AnexoFicha;
