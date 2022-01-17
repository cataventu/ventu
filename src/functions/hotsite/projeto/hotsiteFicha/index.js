import api from '../../../../services/api';

async function hotsiteFicha(props, tipo) {
  const { history } = props;
  const { id_projeto, id_hash } = props.match.params;

  if (id_hash === 'undefined' || id_projeto === 'undefined') {
    switch (tipo) {
      case 1: history.push('/hotsite/contratante/error'); break;
      case 2: history.push('/hotsite/participante/error'); break;
      default: break;
    }
  }

  const url = `/TsmHOTSITE/FICHA/${id_projeto}`;
  const res = await api.get(url, { auth: props.auth });
  const { contratante, participante, senha } = res.data;

  switch (tipo) {
    case 1:
      if (contratante !== id_hash) { history.push('/hotsite/contratante/error'); }
      break;
    case 2:
      if (participante !== id_hash) { history.push('/hotsite/participante/error'); }
      break;
    default: break;
  }
  return senha.toUpperCase();
}

export default hotsiteFicha;
