import api from '../../../../services/api';
import {
  formatData, getCookie, setCookie, formatDataInput,
} from '../../../sistema';

///////// CONSULTA ////////////////
/////////////////////////////////
export const getContatoConsulta = async (props, dados) => {
  async function sync_1(props) {
    const { dispatch } = props;
    await dispatch({ type: '@SET_CONTATO_RELATORIO_VIEW_TRUE' });
    await dispatch({ type: '@SET_CONTATO_LOADING_TRUE' });
  }

  async function sync_2(props) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmFIN_CONTATO/RELATORIO';

    const contatoConsulta = await api.post(url, dados,
      { auth: props.auth });

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_CONTATO_DATA', payload: contatoConsulta.data });
  }

  async function sync_3(props) {
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@SET_CONTATO_FILTRO_FLAG_FALSE' });
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveContatoFiltro = async (props) => {
  const { dispatch } = props;

  ////// DADOS //////
  let id_pfisica;
  let id_pjuridica;
  let nome_pessoa;

  const newPessoa = document.getElementById('pessoa').value;
  switch (parseInt(newPessoa, 10)) {
    case 1:
      id_pfisica = props.autoCompletarId_Pfisica;
      nome_pessoa = props.autoCompletarPfisica;
      id_pjuridica = 0;
      break;
    case 2:
      id_pfisica = 0;
      id_pjuridica = props.autoCompletarId_Pjuridica;
      nome_pessoa = props.autoCompletarPjuridica;
      break;
    default:
  }

  const newDt_perini = formatData(document.getElementById('contato-filtro-dt-perini').value.replace(/-/g, '/'));
  const newDt_perfim = formatData(document.getElementById('contato-filtro-dt-perfim').value.replace(/-/g, '/'));

  ////// ATUALIZA STORE //////
  const newContatoFiltroData = {
 
    pessoa: newPessoa,
    nome: nome_pessoa,
    id_pfisica,
    id_pjuridica,

    dt_perini: newDt_perini,
    dt_perfim: newDt_perfim,
  };

  await dispatch({ type: '@NEW_CONTATO_FILTRO', payload: newContatoFiltroData });
  setCookie('relatorioCONTATO', JSON.stringify(newContatoFiltroData), 30);
console.log(newContatoFiltroData)
  await dispatch({ type: '@RESET_CONTATO_DATA' });
  await dispatch({ type: '@SET_CONTATO_FILTRO_ATIVO' });

  getContatoConsulta(props, newContatoFiltroData);
};

export const setFieldsContatoFiltro = (data) => {
  document.getElementById('contato-filtro-dt-perini').value = formatDataInput(data.dt_perini);
  document.getElementById('contato-filtro-dt-perfim').value = formatDataInput(data.dt_perfim);
};

export const resetFieldsContatoFiltro = () => {
  document.getElementById('contato-filtro-pessoa').value = 0;
  document.getElementById('contato-filtro-dt-perini').value = '';
  document.getElementById('contato-filtro-dt-perfim').value = '';
};

///////// COOKIE ////////////////
/////////////////////////////////
export const recebeCookie = async (nome, props) => {
  const cookie = getCookie(nome);
  const { dispatch } = props;
  if (cookie) {
    ////// ATUALIZA CAMPOS //////
    const obj = JSON.parse(cookie);

    setFieldsContatoFiltro(obj);
    await dispatch({ type: '@NEW_CONTATO_FILTRO', payload: obj });
  }
};
