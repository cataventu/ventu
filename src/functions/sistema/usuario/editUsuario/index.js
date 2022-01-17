const editUsuario = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/sistema/usuario/ficha/${id}`;
  props.history.push(page);
};

export default editUsuario;
