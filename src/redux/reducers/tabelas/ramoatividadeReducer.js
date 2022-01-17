import * as initial from '../../initials/tabelas/ramoatividade';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  ramoatividadeConsulta: initial.ramoatividadeConsulta,
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_RAMOATIVIDADE_CONSULTA': return { ...state, ramoatividadeConsulta: actions.payload };
    ////// PAGINA
    case '@GET_RAMOATIVIDADE_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_RAMOATIVIDADE': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_RAMOATIVIDADE_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_RAMOATIVIDADE_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_RAMOATIVIDADE_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_RAMOATIVIDADE_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_RAMOATIVIDADE_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_RAMOATIVIDADE_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
