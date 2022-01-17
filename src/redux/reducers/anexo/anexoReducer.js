import * as initial from '../../initials/anexo';

const initialState = {
  anexoNome: '',
  anexoTableData: initial.anexoTableData,
  anexoFichaData: initial.anexoFichaData,
  anexoConsulta: initial.anexoConsulta,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@GET_ANEXO_NOME': return { ...state, anexoNome: actions.payload };
    case '@GET_ANEXO_PAGINA': return { ...state, anexoTableData: actions.payload };
    case '@GET_ANEXO_FICHA': return { ...state, anexoFichaData: actions.payload };
    /////// CONSULTA
    case '@SET_ANEXO_CONSULTA': return { ...state, anexoConsulta: actions.payload };
    case '@RESET_ANEXO_FILE': return {
      ...state,
      fileAnexo: {
        titulo: '', tamanho: '', extensao: '', arquivo: '',
      },
    };
    ////// RESET
    case '@RESET_ANEXO_NOME': return { ...state, anexoNome: '' };
    case '@RESET_ANEXO_PAGINA': return { ...state, anexoTableData: initial.anexoTableData };
    case '@RESET_ANEXO_FICHA': return { ...state, anexoFichaData: initial.anexoFichaData };

    default: return state;
  }
}
