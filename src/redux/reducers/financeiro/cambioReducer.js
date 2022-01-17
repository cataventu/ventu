import * as initial from '../../initials/financeiro/cambio';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  cambioListaData: initial.cambioListaData,
  cambioConsulta: initial.cambioConsulta,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@SET_CAMBIO_CONSULTA': return { ...state, cambioConsulta: actions.payload };
      ////// LISTA
    case '@GET_CAMBIO_LISTA': return { ...state, cambioListaData: actions.payload };
    ////// PAGINA
    case '@SET_INDEX_PAGINATION_CAMBIO': return { ...state, indexPagination: actions.payload };
    case '@GET_CAMBIO_PAGINA': return { ...state, tableData: actions.payload };
    ////// FICHA
    case '@GET_CAMBIO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_CAMBIO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_CAMBIO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_CAMBIO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_CAMBIO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_CAMBIO_FICHA': return { ...state, fichaData: initial.fichaData };

    default: return state;
  }
}
