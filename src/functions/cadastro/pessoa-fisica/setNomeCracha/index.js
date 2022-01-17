const setNomeCracha = (value) => {
  const nome = value;
  const array = nome.split(' ');
  return array[0];
};

export default setNomeCracha;
