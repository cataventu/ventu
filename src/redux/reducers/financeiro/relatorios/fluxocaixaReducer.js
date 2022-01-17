import * as initial from '../../../initials/financeiro/relatorios/fluxocaixa';

const initialState = {
  loading: true, //tbody relatorio

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro

  relatorioView: false,
  fluxoCaixaData: initial.fluxoCaixaData,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// CONSULTA
    case '@GET_FLUXOCAIXA_DATA': return { ...state, fluxoCaixaData: actions.payload };

    ////// FILTRO
    case '@SET_FLUXOCAIXA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_FLUXOCAIXA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };

    ////// RESET
    case '@RESET_FLUXOCAIXA_DATA': return {
      ...state, fluxoCaixaData: initial.fluxoCaixaData, loading: true, relatorioView: false,
    };

    ////// CONSULTA
    case '@SET_FLUXOCAIXA_LOADING_TRUE': return { ...state, loading: true };
    case '@SET_FLUXOCAIXA_LOADING_FALSE': return { ...state, loading: false };

    case '@SET_FLUXOCAIXA_RELATORIO_VIEW_TRUE': return { ...state, relatorioView: true };
    case '@SET_FLUXOCAIXA_RELATORIO_VIEW_FALSE': return { ...state, relatorioView: false };

    default: return state;
  }
}
