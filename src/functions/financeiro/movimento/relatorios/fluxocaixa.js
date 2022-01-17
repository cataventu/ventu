import api from '../../../../services/api';

///////// CONSULTA////////////////
/////////////////////////////////
export const getFluxoCaixaConsulta = async (props, dados) => {
  async function sync_1(props) {
    const { dispatch } = props;
    await dispatch({ type: '@SET_FLUXOCAIXA_RELATORIO_VIEW_TRUE' });
    await dispatch({ type: '@SET_FLUXOCAIXA_LOADING_TRUE' });
  }

  async function sync_2(props) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmFIN_FLUCAIXA/RELATORIO';
    const fluxocaixaConsulta = await api.post(url, dados,
      { auth: props.auth });
      ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_FLUXOCAIXA_DATA', payload: fluxocaixaConsulta.data });
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props)]);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveFluxoCaixaFiltro = async (props, formDados) => {
  const { dispatch } = props;
  localStorage.setItem('RELATORIO_FLUXOCAIXA_FILTRO', JSON.stringify(formDados));

  await dispatch({ type: '@RESET_FLUXOCAIXA_DATA' });
  await dispatch({ type: '@SET_FLUXOCAIXA_FILTRO_ATIVO' });

  getFluxoCaixaConsulta(props, formDados);
};
