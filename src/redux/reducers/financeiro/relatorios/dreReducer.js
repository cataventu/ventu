import * as initial from '../../../initials/financeiro/relatorios/dre';

const initialState = {
  loading: true, //tbody relatorio

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro

  relatorioView: false,

  filtroData: initial.filtroData,
  dreData: initial.dreData,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@GET_DRE_DATA': return { ...state, dreData: actions.payload };

    ////// FILTRO
    case '@NEW_DRE_FILTRO': return { ...state, filtroData: actions.payload };
    case '@SET_DRE_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_DRE_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };

    ////// RESET
    case '@RESET_DRE_FILTRO': return { ...state, filtroData: initial.filtroData, filtroAtivo: 0 };
    case '@RESET_DRE_DATA': return {
      ...state, dreData: initial.dreData, loading: true, relatorioView: false,
    };

    //////// CONSULTA
    case '@SET_DRE_LOADING_TRUE': return { ...state, loading: true };
    case '@SET_DRE_LOADING_FALSE': return { ...state, loading: false };

    case '@SET_DRE_RELATORIO_VIEW_TRUE': return { ...state, relatorioView: true };
    case '@SET_DRE_RELATORIO_VIEW_FALSE': return { ...state, relatorioView: false };

    default: return state;
  }
}
