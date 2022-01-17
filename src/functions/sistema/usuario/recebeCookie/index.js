import { getCookie } from '../../index';
import setFieldsUsuarioFiltro from '../setFieldsUsuarioFiltro';

const recebeCookie = async (nome, props) => {
  const cookie = getCookie(nome);
  const { dispatch } = props;

  if (cookie) {
    ////// ATUALIZA CAMPOS //////
    const obj = JSON.parse(cookie);
    setFieldsUsuarioFiltro(obj);

    ////// ATUALIZA FILTRO //////
    await dispatch({ type: '@NEW_USUARIO_FILTRO', payload: JSON.parse(cookie) });

    ////// ATIVA FILTRO //////
    if (obj.nome !== '' || obj.gmail !== '' || obj.situacao !== '' || obj.alt_dhsis_maior !== '' || obj.alt_dhsis_menor !== '') {
      dispatch({ type: '@SET_USUARIO_FILTRO_ATIVO', payload: cookie });
    } else {
      dispatch({ type: '@SET_USUARIO_FILTRO_INATIVO', payload: cookie });
    }
  }
};

export default recebeCookie;
