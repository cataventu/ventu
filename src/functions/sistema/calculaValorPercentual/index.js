const calculaValorPercentual = (valor, percentual) => {
  const valorFinal = ((parseFloat(valor) * parseFloat(percentual)) / 100);
  return valorFinal;
};

export default calculaValorPercentual;
