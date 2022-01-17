import * as initial from '../../../initials/financeiro/relatorios/contato';

const initialState = {
  loading: true, //tbody relatorio

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro

  relatorioView: false,

  filtroData: initial.filtroData,
  contatoData: initial.contatoData,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@GET_CONTATO_DATA': return { ...state, contatoData: actions.payload };

    ////// FILTRO
    case '@NEW_CONTATO_FILTRO': return { ...state, filtroData: actions.payload };
    case '@SET_CONTATO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_CONTATO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };

    ////// RESET
    case '@RESET_CONTATO_FILTRO': return { ...state, filtroData: initial.filtroData, filtroAtivo: 0 };
    case '@RESET_CONTATO_DATA': return {
      ...state, contatoData: initial.contatoData, loading: true, relatorioView: false,
    };

    //////// CONSULTA
    case '@SET_CONTATO_LOADING_TRUE': return { ...state, loading: true };
    case '@SET_CONTATO_LOADING_FALSE': return { ...state, loading: false };

    case '@SET_CONTATO_RELATORIO_VIEW_TRUE': return { ...state, relatorioView: true };
    case '@SET_CONTATO_RELATORIO_VIEW_FALSE': return { ...state, relatorioView: false };

    default: return state;
  }
}
