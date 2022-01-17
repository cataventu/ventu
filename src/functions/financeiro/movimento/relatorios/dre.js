import api from '../../../../services/api';
import { getCookie, setCookie } from '../../../sistema';

///////// CONSULTA////////////////
/////////////////////////////////
export const getDreConsulta = async (props, dados) => {
  async function sync_1(props) {
    const { dispatch } = props;
    await dispatch({ type: '@SET_DRE_RELATORIO_VIEW_TRUE' });
    await dispatch({ type: '@SET_DRE_LOADING_TRUE' });
  }

  async function sync_2(props) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmFIN_DRE/RELATORIO';
    const dreConsulta = await api.post(url, dados, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_DRE_DATA', payload: dreConsulta.data });
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props)]);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveDreFiltro = async (props) => {
  const { dispatch } = props;

  ////// DADOS //////
  const inputData = document.getElementById('dre-filtro-data');
  const newAno = parseInt(document.getElementById('dre-filtro-ano').value, 10);

  let newData;

  inputData.forEach((item) => {
    if (item.selected) { newData = parseInt(item.value, 10); }
  });
  ////// ATUALIZA STORE //////

  const newDreFiltroData = {
    data: newData,
    ano: newAno,
  };

  await dispatch({ type: '@NEW_DRE_FILTRO', payload: newDreFiltroData });
  setCookie('relatorioDRE', JSON.stringify(newDreFiltroData), 30);

  await dispatch({ type: '@RESET_DRE_DATA' });
  await dispatch({ type: '@SET_DRE_FILTRO_ATIVO' });

  getDreConsulta(props, newDreFiltroData);
};

export const setFieldsDreFiltro = (data) => {
  const inputData = document.getElementById('dre-filtro-data');
  inputData.forEach((item) => {
    const field = item;
    if (parseInt(item.value, 10) === parseInt(data.data, 10)) { field.selected = true; }
  });
  document.getElementById('dre-filtro-ano').value = data.ano;
};

export const resetFieldsDreFiltro = () => {
  document.getElementById('dre-filtro-data').value = 0;
  document.getElementById('dre-filtro-ano').value = '';
};

///////// COOKIE ////////////////
/////////////////////////////////
export const recebeCookie = async (nome, props) => {
  const cookie = getCookie(nome);
  const { dispatch } = props;
  if (cookie) {
    ////// ATUALIZA CAMPOS //////
    const obj = JSON.parse(cookie);

    setFieldsDreFiltro(obj);
    await dispatch({ type: '@NEW_DRE_FILTRO', payload: obj });
  }
};
