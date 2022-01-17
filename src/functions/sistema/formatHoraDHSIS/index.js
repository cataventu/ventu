const formatHoraDHSIS = (text) => {
  let value = text.toString().replace(/[^0-9]+/g, '');
  if (value.length > 2) { value = `${value.substring(8, 10)}:${value.substring(10, 12)}:${value.substring(12, 14)}`; }
  return value;
};

export default formatHoraDHSIS;
