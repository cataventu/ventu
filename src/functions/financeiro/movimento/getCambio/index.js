import api from '../../../../services/api';
import { formatData } from '../../../sistema';

const getCambio = async (props, id_conta, data) => {
  //CONTA //////
  const urlConta = `/tsmCONTA/FICHA/${id_conta}`;
  let id_moeda = 0;
  let moeda = '';
  let cambio = 0;

  const FichaConta = await api.get(urlConta, { auth: props.auth });

  //// ATUALIZA FORM //////
  if (FichaConta.data !== undefined) {
    id_moeda = FichaConta.data.id_moeda;
    moeda = FichaConta.data.moeda;

    //// MOEDA //////
    const urlMoeda = `/tsmMOEDA/FICHA/${id_moeda}`;
    let bacen = '';

    const FichaMoeda = await api.get(urlMoeda, { auth: props.auth });

    if (FichaMoeda.data !== undefined) {
      bacen = FichaMoeda.data.bacen;

      //// BACEN ////////
      const dados = {
        data: formatData(data),
        bacen,
      };

      const urlBacen = '/TsmCAMBIO/BACEN';
      const FichaBacen = await api.post(urlBacen, dados, { auth: props.auth });

      if (FichaBacen.data !== undefined) {
        cambio = FichaBacen.data.cambio;
      }
    }
  }

  return {
    id_moeda,
    moeda,
    cambio,
  };
};

export default getCambio;
