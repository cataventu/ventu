const editROrcamento = (props, id) => {
  const { history } = props;
  const { id: id_projeto, idOrcamento } = props.match.params;
  const page = `/projeto/painel/${id_projeto}/orcamento/ficha/${idOrcamento}/servico/ficha/${id}`;
  history.push(page);
};

export default editROrcamento;
