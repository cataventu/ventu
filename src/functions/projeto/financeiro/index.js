import api from '../../../services/api';

///////// PAGINA ////////////////
/////////////////////////////////

export const editFinanceiro = (props, id) => {
  const page = `/financeiro/movimento/ficha/${id}`;
  props.history.push(page);
};

export const consultaFinanceiro = (props, id) => {
  ////// REDIRECT ////////
  const page = `/financeiro/movimento/consulta/${id}`;
  props.history.push(page);
};

export const getFinanceiroPagina = async (props, id, id_proservico) => {
  const { dispatch } = props;
  const url = '/TsmMOVIMENTO/PAGINA';
  const data = { id_projeto: id, id_proservico };

  const Pagina = await api.post(url, data, { auth: props.auth });
  dispatch({ type: '@GET_MOVIMENTO_PAGINA', payload: Pagina.data });
};

/////////// FICHA /////////////////
///////////////////////////////////
//export const getFinaceiroFicha = async (props, id) => {

//if ( id ) {
//////// RECEBE DADOS API ////////
//const url = '/TsmMOVIMENTO/FICHA/' + id;

//const data =  { id_projeto: id }

//const financeiroFicha = await api.get( url, data, { auth: props.auth });
//////// ATUALIZA STORE ////////
//const { dispatch } = props;
//dispatch({ type: '@GET_MOVIMENTO_FICHA', payload: financeiroFicha.data });
//}
//}

//export const saveMovimento  = async (props, dadosForm) => {
//if ( sistema.checkValidation() ) {

//let { id } = dadosForm;
//if ( id === "" || isNaN(id) ) { id = "0" }

//let response = ""
//////// EDITAR //////
//if (id !== "0") {

/////////// Envia requisição API //////
//const url = '/TsmMOVIMENTO/GRAVA';
//response = await api.put(url, dadosForm,
//{ auth: props.auth });
/////////// NOVO REGISTRO //////
//} else {
//////// Envia requisição API //////
//const url = '/TsmMOVIMENTO/INCLUI';
//response = await api.post(url, dadosForm,
//{ auth: props.auth });
//}

//if (response.data.retorno === 0) {
////   //////// Notificação falha //////
//showMSG("Error", response.data.msgerro, "error", 2500);
//} else {
//////// Notificação Sucesso //////
//showMSG("Movimento", "Cadastro realizado com sucesso!", "success", 2500);
////   ////////// REDIRECT //////
//const page = "/financeiro/movimento";
//props.history.push(page);
//}
//}

//}

//export const resetFieldsMovimentoFicha = props => {
//const { dispatch } = props;
//dispatch({ type: '@RESET_MOVIMENTO_FICHA' });
//dispatch({ type: '@RESET_AUTOCOMPLETAR' });
//}
