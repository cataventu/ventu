import * as initial from '../../initials/financeiro/fixo';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  fixoConsulta: initial.fixoConsulta,

  paramFixoFicha: '',

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_FIXO_CONSULTA': return { ...state, fixoConsulta: actions.payload };
    ////// PAGINA
    case '@GET_FIXO_PAGINA': return { ...state, tableData: actions.payload };
    ////// PARAM
    case '@GET_PARAM_FIXO_FICHA': return { ...state, paramFixoFicha: actions.payload };
    ////// FICHA
    case '@GET_FIXO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO

    case '@SET_FIXO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_FIXO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_FIXO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_FIXO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_FIXO_FICHA': return { ...state, fichaData: initial.fichaData };

    default: return state;
  }
}
