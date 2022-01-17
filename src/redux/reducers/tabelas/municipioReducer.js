import * as initial from '../../initials/tabelas/municipio';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  fichaData: initial.fichaData,

  municipioConsulta: initial.municipioConsulta,
  municipioListaData: initial.municipioListaData,
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /////// CONSULTA
    case '@SET_MUNICIPIO_CONSULTA': return { ...state, municipioConsulta: actions.payload };
      ////// LISTA
    case '@GET_MUNICIPIO_LISTA': return { ...state, municipioListaData: actions.payload };
    ////// PAGINA
    case '@GET_MUNICIPIO_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_MUNICIPIO': return { ...state, indexPagination: actions.payload };

    ////// FICHA
    case '@GET_MUNICIPIO_FICHA': return { ...state, fichaData: actions.payload };
    ////// FILTRO
    case '@SET_MUNICIPIO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_MUNICIPIO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_MUNICIPIO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_MUNICIPIO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_MUNICIPIO_FICHA': return { ...state, fichaData: initial.fichaData };
    default: return state;
  }
}
