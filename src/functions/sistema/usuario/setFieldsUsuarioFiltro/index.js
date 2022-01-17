const setFieldsUsuarioFiltro = (data) => {
  if (data.email !== undefined){
    document.getElementById('usuario-filtro-email').value = data.email;
  }
  document.getElementById('usuario-filtro-nome').value = data.nome;
  ///document.getElementById("usuario-filtro-gmail").value = data.gmail;
  document.getElementById('usuario-filtro-situacao').value = data.situacao;
  document.getElementById('usuario-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('usuario-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export default setFieldsUsuarioFiltro;
