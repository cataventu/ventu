import * as initial from '../../initials/financeiro/moeda';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  moedaListaData: initial.moedaListaData,
  moedaConsulta: initial.moedaConsulta,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@SET_MOEDA_CONSULTA': return { ...state, moedaConsulta: actions.payload };
      ////// LISTA
    case '@GET_MOEDA_LISTA': return { ...state, moedaListaData: actions.payload };
    ////// PAGINA
    case '@GET_MOEDA_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_MOEDA': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_MOEDA_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_MOEDA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_MOEDA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_MOEDA_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_MOEDA_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_MOEDA_FICHA': return { ...state, fichaData: initial.fichaData };

    default: return state;
  }
}
