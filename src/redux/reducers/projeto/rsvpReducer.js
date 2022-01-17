const initialState = {
  tableData: { id: 0, rsvp_regs: [] },
  fichaData: '',
  consulta: '',

  flagTableUpdate: false,
  flagDelete: false,

  tableDataComparar: [{
    id: '', nome: '', email: '', telefone: '', status: '',
  }],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@SET_RSVP_CONSULTA': return { ...state, consulta: actions.payload };

    ////// PAGINA
    case '@GET_RSVP_PAGINA': return { ...state, tableData: actions.payload };
    case '@RESET_RSVP_PAGINA': return { ...state, tableData: { id: 0, rsvp_regs: [] } };

    ////// FICHA
    case '@GET_RSVP_FICHA': return { ...state, fichaData: actions.payload };
    case '@RESET_RSVP_FICHA': return { ...state, fichaData: '' };

    ////// FICHA
    case '@GET_RSVP_COMPARAR': return { ...state, tableDataComparar: actions.payload };
    case '@RESET_RSVP_COMPARAR': return {
      ...state,
      tableDataComparar: [{
        id: '', nome: '', email: '', telefone: '', status: '',
      }],
    };

    ////// FLAG
    case '@SET_RSVP_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_RSVP_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_RSVP_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_RSVP_DELETE_FALSE': return { ...state, flagDelete: false };

    default: return state;
  }
}
