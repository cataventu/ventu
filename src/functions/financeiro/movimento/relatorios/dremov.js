import api from '../../../../services/api';

///////// PAGINA ////////////////
/////////////////////////////////
export const consultaDremov = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/relatorios/dremov/${id}`;
  props.history.push(page);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaDremov = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmFIN_DRE/RELATORIO_MOV/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_DREMOV_DATA', payload: Ficha });
  }
};
