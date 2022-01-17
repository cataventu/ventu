import api from '../../../../services/api';

async function saveBanner(form, props) {
  const url = '/TsmHOTSITE/BANNER_GRAVA';
  await api.put(url, form, { auth: props.auth });
}

export default saveBanner;
