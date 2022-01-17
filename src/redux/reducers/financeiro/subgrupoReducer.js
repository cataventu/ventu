import * as initial from '../../initials/financeiro/subgrupo';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,
  subgrupoConsulta: initial.subgrupoConsulta,
  subgrupoListaData: initial.subgrupoListaData,

  indexPagination: 0,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////////  LISTA
    case '@GET_SUBGRUPO_LISTA': return { ...state, subgrupoListaData: actions.payload };
      /////// CONSULTA
    case '@SET_SUBGRUPO_CONSULTA': return { ...state, subgrupoConsulta: actions.payload };
    ////// PAGINA
    case '@GET_SUBGRUPO_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_SUBGRUPO': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_SUBGRUPO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_SUBGRUPO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_SUBGRUPO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_SUBGRUPO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_SUBGRUPO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_SUBGRUPO_FICHA': return { ...state, fichaData: initial.fichaData };

    default: return state;
  }
}
