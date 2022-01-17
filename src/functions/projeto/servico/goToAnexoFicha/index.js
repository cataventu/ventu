const goToAnexoFicha = (props, id_projeto, idServico) => {
  const { history } = props;

  const page = `/projeto/painel/${id_projeto}/servicos/ficha/${idServico}/anexo`;
  history.push(page);
};

export default goToAnexoFicha;
