import api from '../../../../services/api';
import { showMSG } from '../../../../components';

async function save(form, props) {
  const url = '/TsmHOTSITE/CONFIGURA_GRAVA';
  const res = await api.put(url, form, { auth: props.auth });
  const { history } = props;
  const { id } = props.match.params;
  const { retorno, msgerro } = res.data;
  if (retorno > 0) {
    showMSG('Hotsite', 'Formulário gravado com sucesso!', 'success', 2500);
    history.push(`/projeto/painel/${id}/hotsite/ficha`);
  } else {
    showMSG(msgerro, 'Favor tentar novamente', 'error', 2500);
  }
}

const configuraGrava = (form, props) => {
  save(form, props);
};

export default configuraGrava;
