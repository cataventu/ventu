const editServicos = (props, idProjeto, idServico) => {
  const page = `/projeto/painel/${idProjeto}/servicos/ficha/${idServico}`;
  props.history.push(page);
};

export default editServicos;
