import * as initial from '../../initials/financeiro/movimento';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  ///DASHBOARD
  dashboardListaData: initial.dashboardListaData,

  tableData: initial.tableData,
  tableDataAgrupar: initial.tableDataAgrupar,
  fichaData: initial.fichaData,

  flagTableUpdate: false,
  flagDelete: false,

  movimentoConsulta: initial.movimentoConsulta,
  parcelamentoFicha: initial.parcelamentoFicha,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@SET_INDEX_PAGINATION_MOVIMENTO': return { ...state, indexPagination: actions.payload };
    case '@GET_MOVIMENTO_PAGINA': return { ...state, tableData: actions.payload };
    case '@GET_MOVIMENTO_AGRUPAR': return { ...state, tableDataAgrupar: actions.payload };
    ////// FICHA
    case '@GET_MOVIMENTO_FICHA': return { ...state, fichaData: actions.payload };
    case '@GET_PARCELAMENTO_FICHA': return { ...state, parcelamentoFicha: actions.payload };
    ////// FILTRO
    case '@SET_MOVIMENTO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_MOVIMENTO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_MOVIMENTO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_MOVIMENTO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    ////// DASHBOARD
    case '@GET_MOVIMENTO_DASHBOARD': return { ...state, dashboardListaData: actions.payload };

    ////// RESET
    case '@RESET_MOVIMENTO_FICHA': return { ...state, fichaData: initial.fichaData };
    case '@RESET_MOVIMENTO_AGRUPAR': return { ...state, tableDataAgrupar: initial.tableDataAgrupar };
    case '@RESET_PARCELAMENTO_FICHA': return { ...state, parcelamentoFicha: initial.parcelamentoFicha };

    ////// FLAG
    case '@SET_MOVIMENTO_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_MOVIMENTO_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_MOVIMENTO_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_MOVIMENTO_DELETE_FALSE': return { ...state, flagDelete: false };

    default: return state;
  }
}
