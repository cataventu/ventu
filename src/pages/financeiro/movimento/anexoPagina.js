///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import PaginaAnexo from '../../anexo/pagina';

/////// PFISICA ///////////////
///////////////////////////////
const AnexoPagina = ({ location, match, history }) => (
  <PaginaAnexo
    location={location}
    match={match}
    history={history}
    id_pfisica={0}
    id_pjuridica={0}
    id_projeto={0}
    id_proservico={0}
    id_movimento={match.params.id}
    title="Movimento"
    subtitle="/ Anexo"
  />
);

export default AnexoPagina;
