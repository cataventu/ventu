const formatCompleteZeros = (input, digitos) => {
  if (input === undefined) { return; }

  const valorGroup = input.toString().replace(',', '.').split('.');

  if (valorGroup[0] === '') { return '0.00'; }

  let valorFinal;
  if (valorGroup[1] !== undefined) {
    const decimalRange = valorGroup[1].length;
    if (decimalRange < digitos) {
      for (let i = decimalRange; i < digitos; i += 1) {
        valorGroup[1] += '0';
      }
    }
    valorFinal = `${valorGroup[0]}.${valorGroup[1].substring(0, digitos)}`;
  } else {
    let zeros = '.0';
    for (let i = 1; i < digitos; i += 1) {
      zeros += '0';
    }
    valorFinal = valorGroup[0] + zeros;
  }
  return valorFinal;
};

export default formatCompleteZeros;
