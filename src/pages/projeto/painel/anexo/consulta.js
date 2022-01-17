///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import ConsultaAnexo from '../../../anexo/consulta';

///////// PFISICA ///////////////
/////////////////////////////////
const AnexoConsulta = ({ location, match, history }) => (
  <ConsultaAnexo
    location={location}
    match={match}
    history={history}
    id={match.params.idAnexo}
    id_pfisica={0}
    id_pjuridica={0}
    id_projeto={match.params.id}
    id_proservico={0}
    id_movimento={0}
    title="Projeto"
    subtitle="/ Anexo"
  />
);

export default AnexoConsulta;