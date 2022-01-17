import * as initial from '../../initials/tabelas/servico';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  servicoListaData: initial.servicoListaData,
  servicoConsulta: initial.servicoConsulta,
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_SERVICO_CONSULTA': return { ...state, servicoConsulta: actions.payload };
      ////// LISTA
    case '@GET_TIPO_SERVICO_LISTA': return { ...state, servicoListaData: actions.payload };
    ////// PAGINA
    case '@GET_SERVICO_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_SERVICO': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_SERVICO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_SERVICO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_SERVICO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_SERVICO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_SERVICO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_SERVICO_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
