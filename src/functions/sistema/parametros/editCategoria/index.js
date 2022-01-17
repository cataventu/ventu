const editCategoria = (props, id) => {
  const { history } = props;
  const page = `/sistema/parametros/categoria/ficha/${id}`;
  history.push(page);
};

export default editCategoria;
