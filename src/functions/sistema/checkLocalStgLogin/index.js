import store from '../../../redux/store/index';

function resetCache() {
  localStorage.removeItem('GOOGLE_USER_DATA');
  localStorage.removeItem('USUARIO_FICHA');
  localStorage.removeItem('SET_PERMISSION_MODULO');

  localStorage.removeItem('SET_PERMISSION_PAGE_CADASTRO');
  localStorage.removeItem('SET_PERMISSION_PAGE_TABELAS');
  localStorage.removeItem('SET_PERMISSION_PAGE_PROJETO');
  localStorage.removeItem('SET_PERMISSION_PAGE_FINANCEIRO');
  localStorage.removeItem('SET_PERMISSION_PAGE_SISTEMA');
  localStorage.removeItem('SET_PERMISSION_SUBPAGES');
}

function checkLocalStgLogin(props) {
  const { dispatch } = props;

  const GOOGLE_USER_DATA = localStorage.getItem('GOOGLE_USER_DATA');
  const USUARIO_FICHA = localStorage.getItem('USUARIO_FICHA');
  const PERMISSION_MODULO = localStorage.getItem('SET_PERMISSION_MODULO');

  const PERMISSION_PAGE_CADASTRO = localStorage.getItem('SET_PERMISSION_PAGE_CADASTRO');
  const PERMISSION_PAGE_TABELAS = localStorage.getItem('SET_PERMISSION_PAGE_TABELAS');
  const PERMISSION_PAGE_PROJETO = localStorage.getItem('SET_PERMISSION_PAGE_PROJETO');
  const PERMISSION_PAGE_FINANCEIRO = localStorage.getItem('SET_PERMISSION_PAGE_FINANCEIRO');
  const PERMISSION_PAGE_SISTEMA = localStorage.getItem('SET_PERMISSION_PAGE_SISTEMA');
  const PERMISSION_SUBPAGES = localStorage.getItem('SET_PERMISSION_SUBPAGES');

  const cache = JSON.parse(USUARIO_FICHA);

  if (cache !== null) {
    const versao_atual = store.getState().sistema.versao;
    const versao_cache = cache.versao;

    /// VERIFICA VERSAO ATUAL COM O CACHE
    if (versao_atual !== versao_cache) {
      resetCache();
      return false;
    }

    /// ATUALIZA DADOS DO SISTEMA COM O ENCONTRADO NO CACHE
    dispatch({ type: '@SET_GOOGLE_LOGIN_DATA', payload: JSON.parse(GOOGLE_USER_DATA) });
    dispatch({ type: '@GET_USUARIO_FICHA', payload: JSON.parse(USUARIO_FICHA) });
    dispatch({ type: '@SET_PERMISSION_MODULO', payload: JSON.parse(PERMISSION_MODULO) });

    dispatch({ type: '@SET_PERMISSION_PAGE_CADASTRO', payload: JSON.parse(PERMISSION_PAGE_CADASTRO) });
    dispatch({ type: '@SET_PERMISSION_PAGE_TABELAS', payload: JSON.parse(PERMISSION_PAGE_TABELAS) });
    dispatch({ type: '@SET_PERMISSION_PAGE_PROJETO', payload: JSON.parse(PERMISSION_PAGE_PROJETO) });
    dispatch({ type: '@SET_PERMISSION_PAGE_FINANCEIRO', payload: JSON.parse(PERMISSION_PAGE_FINANCEIRO) });
    dispatch({ type: '@SET_PERMISSION_PAGE_SISTEMA', payload: JSON.parse(PERMISSION_PAGE_SISTEMA) });
    dispatch({ type: '@SET_PERMISSION_SUBPAGES', payload: JSON.parse(PERMISSION_SUBPAGES) });

    return true;
  }
  resetCache();
  return false;
}

export default checkLocalStgLogin;
