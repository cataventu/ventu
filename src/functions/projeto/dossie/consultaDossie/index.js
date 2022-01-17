const consultaDossie = (props, idProjeto, form) => {
  const { history, dispatch } = props;
  dispatch({ type: '@GET_DOSSIE_VISIBILITY', payload: form });
  const page = `/projeto/painel/${idProjeto}/dossie/consulta`;
  history.push(page);
};

export default consultaDossie;
