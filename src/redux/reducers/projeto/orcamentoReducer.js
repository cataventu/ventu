const initialState = {
  flagDelete: false,

  formServicos: false,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_ORCAMENTO_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_ORCAMENTO_DELETE_FALSE': return { ...state, flagDelete: false };

    case '@SET_ORCAMENTO_FORM_SERVICOS_TRUE': return { ...state, formServicos: true };
    case '@SET_ORCAMENTO_FORM_SERVICOS_FALSE': return { ...state, formServicos: false };

    default: return state;
  }
}
