import * as initial from '../../../initials/financeiro/relatorios/dremov';

const initialState = {
  loading: true, //tbody relatorio

  relatorioView: false,

  dremovData: initial.dremovData,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@GET_DREMOV_DATA': return { ...state, dremovData: actions.payload };

    ////// RESET
    case '@RESET_DREMOV_DATA': return {
      ...state, dremovData: initial.dremovData, loading: true, relatorioView: false,
    };

    //////// CONSULTA
    case '@SET_DREMOV_LOADING_TRUE': return { ...state, loading: true };
    case '@SET_DREMOV_LOADING_FALSE': return { ...state, loading: false };

    case '@SET_DREMOV_RELATORIO_VIEW_TRUE': return { ...state, relatorioView: true };
    case '@SET_DREMOV_RELATORIO_VIEW_FALSE': return { ...state, relatorioView: false };

    default: return state;
  }
}
