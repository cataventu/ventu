const formatDecimal = (input, digitos) => {
  const value = input.toString().replace(/[^0-9]+/g, '').replace('.', '');
  let decimal;
  let newNumber;
  let newValue;
  if (value.length > 2) {
    decimal = value.substring(value.length - digitos, value.length);
    newNumber = value.substring(0, value.length - digitos);
    newValue = `${newNumber}.${decimal}`;
    return newValue;
  }
  return value;
};

export default formatDecimal;
