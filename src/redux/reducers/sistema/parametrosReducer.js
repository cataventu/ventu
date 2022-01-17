import * as initial from '../../initials/sistema/parametros';

const initialState = {

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false,

  fixoFichaData: initial.fixoFichaData,
  grupoFichaData: initial.grupoFichaData,
  consolidadorFichaData: initial.consolidadorFichaData,

  tableData: initial.tableData,
  grupoConsulta: initial.grupoConsulta,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// FICHA
    case '@GET_PARAMETRO_FIXO_FICHA': return { ...state, fixoFichaData: actions.payload };
    case '@GET_PARAMETRO_GRUPO_FICHA': return { ...state, grupoFichaData: actions.payload };
    case '@GET_PARAMETRO_CONSOLIDADOR_FICHA': return { ...state, consolidadorFichaData: actions.payload };
      /////// CONSULTA
    case '@SET_PARAMETRO_GRUPO_CONSULTA': return { ...state, grupoConsulta: actions.payload };
    ////// PAGINA

    case '@RESET_PARAMETRO_GRUPO_FICHA': return { ...state, grupoFichaData: initial.grupoFichaData };
    case '@GET_PARAMETRO_GRUPO_PAGINA': return { ...state, tableData: actions.payload };
    ////// FILTRO
    case '@SET_PARAMETRO_GRUPO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PARAMETRO_GRUPO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PARAMETRO_GRUPO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PARAMETRO_GRUPO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    default: return state;
  }
}
