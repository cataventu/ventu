import * as initial from '../../initials/tabelas/perfil';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  perfilListaData: initial.perfilListaData,
  perfilConsulta: initial.perfilConsulta,
  indexPagination: 0,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_CONSULTA_PERFIL': return { ...state, perfilConsulta: actions.payload };
      ////// LISTA
    case '@GET_TIPO_PERFIL_LISTA': return { ...state, perfilListaData: actions.payload };
    ////// PAGINA
    case '@GET_PERFIL_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_PERFIL': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_PERFIL_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_PERFIL_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PERFIL_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PERFIL_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PERFIL_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_PERFIL_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
