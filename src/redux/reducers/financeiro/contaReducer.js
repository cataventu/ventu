import * as initial from '../../initials/financeiro/conta';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,
  contaConsulta: initial.contaConsulta,
  contaListaData: initial.contaListaData,
  tipocontaListaData: initial.tipocontaListaData,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// LISTA

    case '@GET_CONTA_LISTA': return { ...state, contaListaData: actions.payload };
    case '@GET_TIPO_CONTA': return { ...state, tipocontaListaData: actions.payload };
    ////// CONSULTA
    case '@SET_CONTA_CONSULTA': return { ...state, contaConsulta: actions.payload };
    ////// PAGINA
    case '@GET_CONTA_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_CONTA': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_CONTA_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_CONTA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_CONTA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_CONTA_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_CONTA_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_CONTA_FICHA': return { ...state, fichaData: initial.fichaData };
    case '@RESET_CONTA_LISTA': return { ...state, contaListaData: initial.contaListaData };

    default: return state;
  }
}
