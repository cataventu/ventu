import * as initial from '../../initials/tabelas/pais';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  paisConsulta: initial.paisConsulta,

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  paisListaData: initial.paisListaData,
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_CONSULTA_PAIS': return { ...state, paisConsulta: actions.payload };
      ////// LISTA
    case '@GET_PAIS_LISTA': return { ...state, paisListaData: actions.payload };
    ////// PAGINA
    case '@GET_PAIS_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_PAIS': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_PAIS_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_PAIS_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PAIS_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PAIS_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PAIS_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_PAIS_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
