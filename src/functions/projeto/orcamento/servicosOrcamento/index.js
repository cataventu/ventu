const servicosOrcamento = (props, id) => {
  const { history } = props;
  const { id: id_projeto } = props.match.params;
  const page = `/projeto/painel/${id_projeto}/orcamento/ficha/${id}/servico`;
  history.push(page);
};

export default servicosOrcamento;
