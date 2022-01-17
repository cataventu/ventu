const initialState = {
  tableData: { id: 0, contratante_regs: [] },
  fichaData: '',

  flagTableUpdate: false,
  flagDelete: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@GET_CONTRATANTE_PAGINA': return { ...state, tableData: actions.payload };
    case '@GET_CONTRATANTE_FICHA': return { ...state, fichaData: actions.payload };

    case '@RESET_CONTRATANTE_PAGINA': return { ...state, tableData: { id: 0, contratante_regs: [] } };
    case '@RESET_CONTRATANTE_FICHA': return { ...state, fichaData: '' };

    case '@SET_CONTRATANTE_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_CONTRATANTE_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_CONTRATANTE_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_CONTRATANTE_DELETE_FALSE': return { ...state, flagDelete: false };

    default: return state;
  }
}
