const atualizaStore = async (fichaData) => {
  const {
    num_participante,
    num_pagante,
    num_cliente,
    num_coordenador,
    num_batedor,
    num_motorista,
    num_interprete,
    des_calculado,
    tad_percentual,
    imp_percentual,
    des_valor,
    tcl_percentual,
    ser_valor,
    valor_total,
    saldo,
  } = fichaData;

  const ficha = {
    num_participante,
    num_pagante,
    num_cliente,
    num_coordenador,
    num_batedor,
    num_motorista,
    num_interprete,
    des_calculado,
    tad_percentual,
    imp_percentual,
    des_valor,
    tcl_percentual,
    ser_valor,
    valor_total,
    saldo,
  };
  localStorage.setItem('PROJETO_ORCAMENTO_FICHA', JSON.stringify(ficha));
};

export default atualizaStore;
