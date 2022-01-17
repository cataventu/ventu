const initialState = {
  ficha: {
    des_calculado: 0,
    tad_percentual: 0,
    imp_percentual: 0,
    des_valor: 0,
    tcl_percentual: 0,
    ser_valor: 0,
    tad_valor: 0,
    imp_valor: 0,
    valor_total: 0,
    valor_total_cliente: 0,
    tcl_valor: 0,
    saldo: 0,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_PAINEL_ORCAMENTO_FICHA': return { ...state, ficha: actions.payload };
    case '@RESET_PAINEL_ORCAMENTO_FICHA': return { ...state, ficha: state.ficha };
    default: return state;
  }
}
