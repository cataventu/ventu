const editOrcamento = (props, id) => {
  const { history } = props;
  const { id: id_projeto } = props.match.params;
  const page = `/projeto/painel/${id_projeto}/orcamento/ficha/${id}`;
  history.push(page);
};

export default editOrcamento;
