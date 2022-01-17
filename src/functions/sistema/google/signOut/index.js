const signOut = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_GOOGLE_LOGIN_DATA' });

  localStorage.removeItem('GOOGLE_USER_DATA');
  localStorage.removeItem('USUARIO_FICHA');
  localStorage.removeItem('SET_PERMISSION_MODULO');
  localStorage.removeItem('SET_PERMISSION_PAGE_CADASTRO');
  localStorage.removeItem('SET_PERMISSION_PAGE_TABELAS');
  localStorage.removeItem('SET_PERMISSION_PAGE_PROJETO');
  localStorage.removeItem('SET_PERMISSION_PAGE_FINANCEIRO');
  localStorage.removeItem('SET_PERMISSION_PAGE_SISTEMA');
  localStorage.removeItem('SET_PERMISSION_SUBPAGES');

  props.history.push('/');
};

export default signOut;
