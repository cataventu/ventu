const editAeroporto = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/aeroporto/ficha/${id}`;
  props.history.push(page);
};

export default editAeroporto;
