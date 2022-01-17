import * as initial from '../../../initials/financeiro/relatorios/transacao';

const initialState = {
  loading: true, //tbody relatorio

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false,

  relatorioView: false,

  transacaoData: initial.transacaoData,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@GET_TRANSACAO_DATA': return { ...state, transacaoData: actions.payload };

    ////// FILTRO
    case '@SET_TRANSACAO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_TRANSACAO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };

    ////// RESET
    case '@RESET_TRANSACAO_DATA': return {
      ...state, transacaoData: initial.transacaoData, loading: true, relatorioView: false,
    };

    //////// CONSULTA
    case '@SET_TRANSACAO_LOADING_TRUE': return { ...state, loading: true };
    case '@SET_TRANSACAO_LOADING_FALSE': return { ...state, loading: false };

    case '@SET_TRANSACAO_RELATORIO_VIEW_TRUE': return { ...state, relatorioView: true };
    case '@SET_TRANSACAO_RELATORIO_VIEW_FALSE': return { ...state, relatorioView: false };
    default: return state;
  }
}
