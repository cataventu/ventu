import api from '../../../../services/api';

async function getFichaHotsite(id_projeto, props) {
  const url_ficha = `/TsmHOTSITE/CONFIGURA_FICHA/${id_projeto}`;
  const ficha = await api.get(url_ficha, { auth: props.auth });
  localStorage.setItem('HOTSITE_PARTICIPANTE_FICHA', JSON.stringify(ficha.data));
}

export default getFichaHotsite;
