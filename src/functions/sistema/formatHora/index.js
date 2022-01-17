const formatHora = (text) => {
  let value = text.toString().replace(/[^0-9]+/g, '');
  if (value.length > 2) { value = `${value.substring(0, 2)}:${value.substring(2, 4)}`; }
  return value;
};

export default formatHora;
