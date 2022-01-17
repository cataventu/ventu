import api from '../../../../services/api';
import { formatData } from '../../../sistema';

///////// CONSULTA////////////////
/////////////////////////////////
export const getTransacaoConsulta = async (props, form) => {
  const {
    transacao, data, id_contas, dt_perini, dt_perfim,
  } = form;

  const dados = {
    transacao: parseInt(transacao, 10),
    data: parseInt(data, 10),
    id_contas: id_contas.replace(',', ''),
    dt_perini: formatData(dt_perini),
    dt_perfim: formatData(dt_perfim),
  };

  async function sync_1(props) {
    const { dispatch } = props;
    await dispatch({ type: '@SET_TRANSACAO_RELATORIO_VIEW_TRUE' });
    await dispatch({ type: '@SET_TRANSACAO_LOADING_TRUE' });
  }

  async function sync_2(props) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmFIN_TRANSACAO/RELATORIO';
    const transacaoConsulta = await api.post(url, dados,
      { auth: props.auth });
      ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_TRANSACAO_DATA', payload: transacaoConsulta.data });
  }

  async function sync_3(props) {
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@SET_TRANSACAO_FILTRO_FLAG_FALSE' });
  }
  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveTransacaoFiltro = async (props, form) => {
  const { dispatch } = props;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('RELATORIO_TRANSACAO_FILTRO', JSON.stringify(form));

  await dispatch({ type: '@RESET_TRANSACAO_DATA' });
  await dispatch({ type: '@SET_TRANSACAO_FILTRO_ATIVO' });

  getTransacaoConsulta(props, form);
};
