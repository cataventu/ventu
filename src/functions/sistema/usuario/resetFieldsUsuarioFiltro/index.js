export const resetFieldsUsuarioFiltro = (props) => {
  document.getElementById('usuario-filtro-email').value = '';
  document.getElementById('usuario-filtro-nome').value = '';
  ///document.getElementById("usuario-filtro-gmail").value = "";
  document.getElementById('usuario-filtro-situacao').value = '';
  document.getElementById('usuario-filtro-data-maior').value = '';
  document.getElementById('usuario-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_USUARIO_FILTRO' });
};

export default resetFieldsUsuarioFiltro;
