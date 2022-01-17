import api from '../../../services/api';
import { showMSG } from '../../../components';
import { checkValidation } from '../../sistema';

///////// PAGINA /////////
export const consultaPF = async (props, id) => {
  const page = `/cadastro/pessoa-fisica/consulta/${id}`;
  props.history.push(page);
};

export const editContratante = async (props, idProjeto, idContratante) => {
  const page = `/projeto/painel/${idProjeto}/Contratante/ficha/${idContratante}`;
  props.history.push(page);
};

export const resetContratante = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_CONTRATANTE_PAGINA' });
  dispatch({ type: '@RESET_CONTRATANTE_FICHA' });

  dispatch({ type: '@RESET_AUTOCOMPLETAR_ID_PJURIDICA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_ID_PFISICA' });
};
export const getContratantePagina = async (props, id) => {
  const { dispatch } = props;
  const url = '/TsmCONTRATANTE/PAGINA';
  const data = { id_projeto: id };
  const Pagina = await api.post(url, data, { auth: props.auth });

  dispatch({ type: '@GET_CONTRATANTE_PAGINA', payload: Pagina.data });
  dispatch({ type: '@SET_NOMEPROJETO', payload: Pagina.data.projeto });
  dispatch({ type: '@SET_CONTRATANTE_FLAG_TRUE' });
};

///////// FICHA /////////

export const saveContratante = async (props, dados) => {
  if (checkValidation()) {
    let response = '';
    const { id, id_projeto } = dados;
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmCONTRATANTE/GRAVA';
      response = await api.put(url, dados,
        { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmCONTRATANTE/INCLUI';
      response = await api.post(url, dados,
        { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Projeto', 'Contratante cadastrado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = `/projeto/painel/${id_projeto}/Contratante`;
      props.history.push(page);
    }
  }
};
