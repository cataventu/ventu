const formatExibeValor = (number) => {
  if (number !== undefined && number !== '') {
    const value = number.toString().replace(',', '.').split('.');
    if (value[1] === undefined) { value[1] = '00'; }
    if (value[1].length === 1) { value[1] += '0'; }
    value[0] = `${value[0].split(/(?=(?:...)*$)/).join('.')}`;
    return value.join(',');
  }
  return false;
};

export default formatExibeValor;
