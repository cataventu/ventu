import { setCookie, toggleFiltro } from '../../index';

const saveUsuarioFiltro = async (props) => {
  ////// RESET PESQUISA //////
  /// document.getElementById("usuario-pesquisa").value = "";
  ////// DADOS //////
  const newEmail = document.getElementById('usuario-filtro-email').value;
  const newNome = document.getElementById('usuario-filtro-nome').value;
  ///const newGmail = document.getElementById("usuario-filtro-gmail").value;
  const newSituacao = document.getElementById('usuario-filtro-situacao').value;
  const newAlt_dhsis_maior = document.getElementById('usuario-filtro-data-maior').value.replace(/-/g, '/');
  const newAlt_dhsis_menor = document.getElementById('usuario-filtro-data-menor').value.replace(/-/g, '/');
  ////// ATUALIZA STORE //////
  const newUsuarioFiltroData = {
    chave: '',
    email: newEmail,
    nome: newNome,
    //gmail: newGmail,
    situacao: newSituacao,
    alt_dhsis_maior: newAlt_dhsis_maior,
    alt_dhsis_menor: newAlt_dhsis_menor,
  };
  ////// ATUALIZA COOKIE //////
  setCookie('filtroUsuario', JSON.stringify(newUsuarioFiltroData), 30);
  const { dispatch } = props;
  await dispatch({ type: '@NEW_USUARIO_FILTRO', payload: newUsuarioFiltroData });
  ////// ATIVA FILTRO //////
  if (newEmail !== '' || newNome !== '' || newSituacao !== '' || newAlt_dhsis_maior !== '' || newAlt_dhsis_menor !== '') {
    dispatch({ type: '@SET_USUARIO_FILTRO_ATIVO', payload: newUsuarioFiltroData });
  } else {
    dispatch({ type: '@SET_USUARIO_FILTRO_INATIVO', payload: newUsuarioFiltroData });
  }

  dispatch({ type: '@SET_USUARIO_FILTRO_FLAG_TRUE' });
  toggleFiltro(props, 'tabela-usuario-filtro');
};

export default saveUsuarioFiltro;
