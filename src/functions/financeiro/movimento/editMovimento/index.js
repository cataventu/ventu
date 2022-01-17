const editMovimento = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/ficha/${id}`;
  props.history.push(page);
};

export default editMovimento;
