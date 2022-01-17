import * as initial from '../../initials/tabelas/aeroporto';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados

  aeroportoListaData: initial.aeroportoListaData,
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// LISTA
    case '@GET_AEROPORTO_LISTA': return { ...state, aeroportoListaData: actions.payload };
    case '@SET_INDEX_PAGINATION_AEROPORTO': return { ...state, indexPagination: actions.payload };

    ////// FILTRO
    case '@SET_AEROPORTO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_AEROPORTO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_AEROPORTO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_AEROPORTO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    default: return state;
  }
}
