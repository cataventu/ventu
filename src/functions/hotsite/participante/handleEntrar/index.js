import api from '../../../../services/api';
import { showMSG } from '../../../../components';

async function handleEntrar(form, props) {
  const url = '/TsmHOTSITE/LOGON';
  const { history, dispatch } = props;
  const {
    id_hash, id_projeto, cpf, passaporte,
  } = form;

  if (cpf === '' && passaporte === '') {
    showMSG('Documento vazio', 'Favor tentar novamente.', 'error', 4000);
    return;
  }

  const user = await api.post(url, form, { auth: props.auth });

  const {
    retorno, msgerro, id_pfisica, id_rsvp,
  } = user.data;

  dispatch({ type: '@HOTSITE_PARTICIPANTE_ID_PFISICA', payload: parseInt(id_pfisica, 10) });

  const data = {
    cpf,
    id_pfisica,
    passaporte,
    id_projeto,
    id_rsvp,
  };

  if (retorno === 0) {
    showMSG(msgerro, 'Favor tentar novamente.', 'error', 4000);
    return;
  }

  localStorage.setItem('HOTSITE_PARTICIPANTE_USER_DATA', JSON.stringify(data));
  history.push(`/hotsite/participante/dados-pessoais/${id_projeto}/${id_hash}`);
}

export default handleEntrar;
