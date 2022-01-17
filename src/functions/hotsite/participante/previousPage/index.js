import checkUrl from '../checkUrl';

const previousPage = (props, form) => {
  const { history, dispatch } = props;
  const {
    step, page, id_projeto, id_hash, modulos,
  } = form;

  let redirect = false;
  let previousPage = parseInt(page, 10) - 1;

  function varreModulos(previousPage) {
    modulos.forEach((item) => {
      const { permissao, acesso } = item;
      if (permissao === previousPage && acesso && !redirect) {
        redirect = true;
        history.push(checkUrl(previousPage, id_projeto, id_hash));
      }
    });
  }

  while (previousPage > 0) {
    varreModulos(previousPage);
    previousPage -= 1;
  }

  dispatch({ type: '@HOTSITE_PARTICIPANTE_STEP', payload: step - 1 });

  ////// TELA LOGIN
  if (!redirect) { history.push(checkUrl(0, id_projeto, id_hash)); }
};

export default previousPage;
