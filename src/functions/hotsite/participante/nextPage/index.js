import checkUrl from '../checkUrl';
import { checkValidation } from '../../../sistema';

const nextPage = (props, form) => {
  if (!checkValidation()) { return; }

  const { history, dispatch } = props;
  const {
    step, page, id_projeto, id_hash, modulos,
  } = form;

  let redirect = false;
  modulos.forEach((item) => {
    const { permissao, acesso } = item;

    const currentPage = parseInt(page, 10);
    const nextPage = parseInt(permissao, 10);

    if (nextPage > currentPage && acesso && !redirect) {
      redirect = true;
      history.push(checkUrl(permissao, id_projeto, id_hash));
    }
  });

  dispatch({ type: '@HOTSITE_PARTICIPANTE_STEP', payload: step + 1 });

  ////// TELA SALVAR
  if (!redirect) { history.push(checkUrl(9, id_projeto, id_hash)); }
};

export default nextPage;
