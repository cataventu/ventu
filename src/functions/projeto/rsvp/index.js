import api from '../../../services/api';
import { showMSG } from '../../../components';
import { base64, checkValidation } from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editRSVP = async (props, idProjeto, idParticipante) => {
  const page = `/projeto/painel/${idProjeto}/rsvp/ficha/${idParticipante}`;
  props.history.push(page);
};

export const compararRSVP = async (props, idProjeto, idParticipante) => {
  const page = `/projeto/painel/${idProjeto}/rsvp/comparar/${idParticipante}`;
  props.history.push(page);
};

export const consultaRSVP = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/projeto/rsvp/consulta/${id}`;
  props.history.push(page);
};

export const getRsvpPagina = async (props, id) => {
  const { dispatch } = props;
  const url = '/TsmRSVP/PAGINA';
  const data = { id_projeto: id };
  const Pagina = await api.post(url, data, { auth: props.auth });
  dispatch({ type: '@GET_RSVP_PAGINA', payload: Pagina.data });
  dispatch({ type: '@SET_NOMEPROJETO', payload: Pagina.data.projeto });
  dispatch({ type: '@SET_RSVP_FLAG_TRUE' });
};

export const importaExcel = (props) => {
  ////// VARIAVEIS
  const id_projeto = parseInt(props.match.params.id, 10);
  const usuario = props.user.id;
  ////// RECEBE DADOS DO ARQUIVO ANEXO
  base64(document.getElementById('doc-file').files, async (doc) => {
    const data = {
      id_projeto,
      titulo: doc.filename,
      extensao: doc.filetype,
      arquivo: doc.base64,
      usuario,
    };

    showMSG('Aguarde', 'Importando planilha...', 'info', 4000);

    const response = await api.post('/tsmRSVP/IMPORTA', data, { auth: props.auth });

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 3000);
    } else {
      ////// Notificação Sucesso //////
      showMSG('IMPORT', 'RSVP importado com sucesso!', 'success', 2500);
      getRsvpPagina(props, id_projeto);
    }
  });
};

///////// FICHA /////////////////
/////////////////////////////////
export const resetRSVP = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_RSVP_FICHA' });
};

export const saveRSVP = async (props, dados) => {
  if (checkValidation()) {
    let response = '';
    const {
      id, id_projeto, status, alt_usuario, alt_dhsis,
    } = dados;

    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/tsmRSVP/GRAVA';
      response = await api.put(url, dados,
        { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/tsmRSVP/INCLUI';
      response = await api.post(url, dados,
        { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 3000);
    } else {
      ////// Notificação Sucesso //////
      showMSG('RSVP', 'RSVP cadastrado com sucesso!', 'success', 2500);

      ////// CONFIRMA //////
      if (parseInt(status, 10) === 2) {
        ////// Envia requisição API //////
        const url = '/tsmRSVP/CONFIRMA';
        const confirma = await api.put(url, { id, usuario: alt_usuario, alt_dhsis },
          { auth: props.auth });
        if (confirma.data.retorno === 0) {
          showMSG('Error', confirma.data.msgerro, 'error', 3000);
        } else {
          showMSG('Participante', 'Participante gerado com sucesso!', 'success', 2500);
        }
      }

      ////// REDIRECT //////
      const page = `/projeto/painel/${id_projeto}/rsvp`;
      props.history.push(page);
    }
  }
};

export const saveComparar = async (props, id_projeto, id_pfisica) => {
  const { idRSVP } = props.match.params;

  const dados = {
    id: parseInt(idRSVP, 10),
    id_projeto: parseInt(id_projeto, 10),
    id_pfisica,
    usuario: props.user.id,
  };

  const url = '/tsmRSVP/COMPARA_GRAVA';
  const response = await api.put(url, dados, { auth: props.auth });

  if (response.data.retorno === 0) {
    showMSG('Error', response.data.msgerro, 'error', 3000);
  } else {
    showMSG('RSVP', 'Participante associado com sucesso!', 'success', 2500);

    ////// REDIRECT //////
    const page = `/projeto/painel/${id_projeto}/rsvp`;
    props.history.push(page);
  }
};

export const novoCadastroPFviaRSVP = async (props) => {
  const idProjeto = props.match.params.id;
  const { idRSVP } = props.match.params;
  const page = `/cadastro/pessoa-fisica/ficha/0/dados-pessoais/projeto/${idProjeto}/rsvp/${idRSVP}`;
  props.history.push(page);
};
