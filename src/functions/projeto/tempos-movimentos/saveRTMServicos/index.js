import api from '../../../../services/api';

const saveTM = async (props, form) => {
  const url = '/TsmTEMPOMOV/RTEMPOMOV_GRAVA';
  await api.put(url, form, { auth: props.auth });
};

export default saveTM;
