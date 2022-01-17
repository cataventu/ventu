///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import PaginaAnexo from '../../../anexo/pagina';

///////// PROJETO ///////////////
/////////////////////////////////
const AnexoPagina = ({ location, match, history }) => (
  <PaginaAnexo
    location={location}
    match={match}
    history={history}
    id_pfisica={0}
    id_pjuridica={0}
    id_projeto={match.params.id}
    id_proservico={0}
    id_movimento={0}
    title="Projeto"
    subtitle="/ Anexo"
  />
);
export default AnexoPagina;
