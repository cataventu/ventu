const calculaPag_ValorTotal = (dados) => {
  const {
    totalTarifa, tipo_servico, cobrancaTarifa, operacaoServico, rentTarifa,
  } = dados;

  let _totalTarifa = parseFloat(totalTarifa);
  let _tipo_servico = parseInt(tipo_servico, 10);
  let _cobrancaTarifa = parseFloat(cobrancaTarifa);
  let _operacaoServico = parseFloat(operacaoServico);
  let _rentTarifa = parseFloat(rentTarifa);

  if (Number.isNaN(_totalTarifa)) { _totalTarifa = 0; }
  if (Number.isNaN(_tipo_servico)) { _tipo_servico = 0; }
  if (Number.isNaN(_cobrancaTarifa)) { _cobrancaTarifa = 0; }
  if (Number.isNaN(_operacaoServico)) { _operacaoServico = 0; }
  if (Number.isNaN(_rentTarifa)) { _rentTarifa = 0; }

  let ValorTotal = _totalTarifa;

  switch (_tipo_servico) {
    ////// AEREO
    case 1:
      //AGENCIAMENTO
      if (_operacaoServico === 1) {
        //RETER COMISSAO
        if (_cobrancaTarifa === 1) {
          ValorTotal = (_totalTarifa - _rentTarifa).toFixed(2);
        } else {
          ValorTotal = _totalTarifa.toFixed(2);
        }
      }
      ////COMPRA
      if (_operacaoServico === 2) {
        //RETER COMISSAO
        if (_cobrancaTarifa === 1) {
          ValorTotal = (_rentTarifa * (-1)).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      break;
      ////// HOSPEDAGEM
    case 2:
      //AGENCIAMENTO
      if (_operacaoServico === 1) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_totalTarifa - _rentTarifa).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      ////COMPRA
      if (_operacaoServico === 2) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_rentTarifa * (-1)).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      break;
      ////// VEÍCULO - OK
    case 3:
      //AGENCIAMENTO
      if (_operacaoServico === 1) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_totalTarifa - _rentTarifa).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      ////COMPRA
      if (_operacaoServico === 2) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_rentTarifa * (-1)).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      break;
    default:
      //AGENCIAMENTO
      if (_operacaoServico === 1) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_totalTarifa - _rentTarifa).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      ////COMPRA
      if (_operacaoServico === 2) {
        //RETER COMISSAO OU COMISSAO A RECEBER
        if (_cobrancaTarifa === 1 || _cobrancaTarifa === 3) {
          ValorTotal = (_rentTarifa * (-1)).toFixed(2);
        } else {
          ValorTotal = (_totalTarifa).toFixed(2);
        }
      }
      break;
  }
  return ValorTotal;
};

export default calculaPag_ValorTotal;
