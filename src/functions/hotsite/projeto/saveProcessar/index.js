import api from '../../../../services/api';

async function saveProcessar(form, props) {
  const url = '/TsmHOTSITE/PROCESSA';
  await api.put(url, form, { auth: props.auth });
}

export default saveProcessar;
