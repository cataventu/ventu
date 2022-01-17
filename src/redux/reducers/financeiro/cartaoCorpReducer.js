import * as initial from '../../initials/financeiro/cartaocorp';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,
  cartaoCorpConsulta: initial.fichaData,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@SET_INDEX_PAGINATION_CARTAOCORP': return { ...state, indexPagination: actions.payload };
    case '@GET_CARTAOCORP_PAGINA': return { ...state, tableData: actions.payload };
    case '@RESET_CARTAOCORP_PAGINA': return { ...state, tableData: initial.tableData };
    ////// FICHA
    case '@GET_CARTAOCORP_FICHA': return { ...state, fichaData: actions.payload };
    case '@RESET_CARTAOCORP_FICHA': return { ...state, fichaData: initial.fichaData };
    ////// CONSULTA
    case '@SET_CARTAOCORP_CONSULTA': return { ...state, cartaoCorpConsulta: actions.payload };
    case '@RESET_CARTAOCORP_CONSULTA': return { ...state, cartaoCorpConsulta: initial.fichaData };
    ////// FILTRO
    case '@SET_CARTAOCORP_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_CARTAOCORP_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_CARTAOCORP_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_CARTAOCORP_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    default: return state;
  }
}
