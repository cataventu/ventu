import * as initial from '../../initials/financeiro/grupo';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  tipogrupoListaData: initial.tipogrupoListaData,
  grupoListaData: initial.grupoListaData,

  grupoConsulta: initial.grupoConsulta,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_GRUPO_CONSULTA': return { ...state, grupoConsulta: actions.payload };
      ////// LISTA
    case '@GET_TIPO_GRUPO': return { ...state, tipogrupoListaData: actions.payload };
      ////// LISTA
    case '@GET_GRUPO_LISTA': return { ...state, grupoListaData: actions.payload };
    ////// PAGINA
    case '@GET_GRUPO_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_GRUPO': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_GRUPO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_GRUPO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_GRUPO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_GRUPO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_GRUPO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_GRUPO_FICHA': return { ...state, fichaData: initial.fichaData };

    default: return state;
  }
}
