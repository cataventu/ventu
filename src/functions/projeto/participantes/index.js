import api from '../../../services/api';
import { showMSG } from '../../../components';
import { checkValidation } from '../../sistema';

///////// PAGINA /////////
export const consultaPF = async (props, id) => {
  const page = `/cadastro/pessoa-fisica/consulta/${id}`;
  props.history.push(page);
};

export const editParticipante = async (props, idProjeto, idParticipante) => {
  const page = `/projeto/painel/${idProjeto}/participantes/ficha/${idParticipante}`;
  props.history.push(page);
};

export const resetParticipantes = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PARTICIPANTES_PAGINA' });
  dispatch({ type: '@RESET_PARTICIPANTES_FICHA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_MUNICIPIO' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_ID_MUNICIPIO' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_PJURIDICA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_ID_PFISICA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_RESERVA_PFISICA' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR_RESERVA_ACOMPANHANTE' });
};

export const getParticipantesPagina = async (props, id) => {
  const { dispatch } = props;
  const url = '/TsmPARTICIPANTE/PAGINA';
  const data = { id_projeto: id };
  const Pagina = await api.post(url, data, { auth: props.auth });
  dispatch({ type: '@GET_PARTICIPANTES_PAGINA', payload: Pagina.data });
  dispatch({ type: '@SET_NOMEPROJETO', payload: Pagina.data.projeto });
  dispatch({ type: '@SET_PARTICIPANTES_FLAG_TRUE' });
};

///////// FICHA /////////

export const saveParticipante = async (props, dados) => {
  if (checkValidation()) {
    let response = '';
    const { id, id_projeto } = dados;
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmPARTICIPANTE/GRAVA';
      response = await api.put(url, dados,
        { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmPARTICIPANTE/INCLUI';
      response = await api.post(url, dados,
        { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Projeto', 'Participante cadastrado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = `/projeto/painel/${id_projeto}/participantes`;
      props.history.push(page);
    }
  }
};
