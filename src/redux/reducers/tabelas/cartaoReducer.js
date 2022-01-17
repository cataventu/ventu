import * as initial from '../../initials/tabelas/cartao';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  tipocartaoListaData: initial.tipocartaoListaData,
  cartaoConsulta: initial.cartaoConsulta,
  indexPagination: 0,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_CARTAO_CONSULTA': return { ...state, cartaoConsulta: actions.payload };
      ////// LISTA
    case '@GET_TIPO_CARTAO': return { ...state, tipocartaoListaData: actions.payload };
    ////// PAGINA
    case '@GET_CARTAO_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_CARTAO': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_CARTAO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_CARTAO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_CARTAO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_CARTAO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_CARTAO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_CARTAO_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
