const consultaAeroporto = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/tabelas/aeroporto/consulta/${id}`;
  props.history.push(page);
};

export default consultaAeroporto;
