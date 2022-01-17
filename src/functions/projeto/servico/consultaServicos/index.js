const consultaServicos = (props, idProjeto, idServico) => {
  const page = `/projeto/painel/${idProjeto}/servico/consulta/${idServico}`;
  props.history.push(page);
};

export default consultaServicos;
