const initialState = {
  tableData: { id: 0, participante_regs: [] },
  fichaData: '',

  flagTableUpdate: false,
  flagDelete: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@GET_PARTICIPANTES_PAGINA': return { ...state, tableData: actions.payload };
    case '@GET_PARTICIPANTES_FICHA': return { ...state, fichaData: actions.payload };

    case '@RESET_PARTICIPANTES_PAGINA': return { ...state, tableData: { id: 0, participante_regs: [] } };
    case '@RESET_PARTICIPANTES_FICHA': return { ...state, fichaData: '' };

    case '@SET_PARTICIPANTES_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_PARTICIPANTES_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_PARTICIPANTES_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_PARTICIPANTES_DELETE_FALSE': return { ...state, flagDelete: false };

    default: return state;
  }
}
