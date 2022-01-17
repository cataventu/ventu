import api from '../../services/api';
import { showMSG } from '../../components';
import { checkValidation, toggleFiltro } from './index';

///////// PAGINA ////////////////
/////////////////////////////////
export const editOcorrencia = async (props, page, id) => {
  let redirect;
  switch (page) {
    case 'OCORRENCIAS':
      redirect = `/sistema/ocorrencia/ficha/${id}`;
      break;
    case 'PFISICA':
      const id_pfisica = props.match.params.id;
      redirect = `/cadastro/pessoa-fisica/ficha/${id_pfisica}/ocorrencias/ficha/${id}`;
      break;
    case 'PJURIDICA':
      const id_pjuridica = props.match.params.id;
      redirect = `/cadastro/pessoa-juridica/ficha/${id_pjuridica}/ocorrencias/ficha/${id}`;
      break;
    case 'PROJETO':
      const id_projeto = props.match.params.id;
      redirect = `/projeto/painel/${id_projeto}/ocorrencias/ficha/${id}`;
      break;
    default:
  }
  props.history.push(redirect);
};
///////// CONSULTA ////////////////
/////////////////////////////////
export const consultaOcorrencia = async (props, page, id) => {
  let redirect;
  switch (page) {
    case 'OCORRENCIAS':
      redirect = `/sistema/ocorrencia/consulta/${id}`;
      break;
    case 'PFISICA':
      const id_pfisica = props.match.params.id;
      redirect = `/cadastro/pessoa-fisica/ficha/${id_pfisica}/ocorrencias/consulta/${id}`;
      break;
    case 'PJURIDICA':
      const id_pjuridica = props.match.params.id;
      redirect = `/cadastro/pessoa-juridica/ficha/${id_pjuridica}/ocorrencias/consulta/${id}`;
      break;
    case 'PROJETO':
      const id_projeto = props.match.params.id;
      redirect = `/projeto/painel/${id_projeto}/ocorrencias/consulta/${id}`;
      break;
    default:
  }
  props.history.push(redirect);
};

export const getOcorrenciaPagina = async (props, data) => {
  const { dispatch } = props;
  const url = '/TsmOCORRENCIA/PAGINA';
  const Pagina = await api.post(url, data, { auth: props.auth });
  dispatch({ type: '@GET_OCORRENCIA_PAGINA', payload: Pagina.data });
  dispatch({ type: '@SET_NOMEPROJETO', payload: Pagina.data.nome });
  dispatch({ type: '@SET_OCORRENCIA_FLAG_TRUE' });
};

///////// FICHA /////////////////
/////////////////////////////////
export const resetFichaOcorrencias = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_AUTOCOMPLETAR' });
  dispatch({ type: '@RESET_OCORRENCIA_FICHA' });
};

export const saveOcorrencia = async (props, dados, page) => {
  const { id_pfisica, id_pjuridica, id_projeto } = dados;

  if (checkValidation()) {
    let response = '';
    const { id } = dados;

    ////// EDITAR //////
    if (parseInt(id, 10) > 0) {
      ////// Envia requisição API //////
      const url = '/tsmOCORRENCIA/GRAVA';
      response = await api.put(url, dados, { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/tsmOCORRENCIA/INCLUI';
      response = await api.post(url, dados, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 3000);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Ocorrência', 'Ocorrência cadastrada com sucesso!', 'success', 2500);

      ////// REDIRECT //////
      let redirect;
      switch (page) {
        case 'OCORRENCIA':
          redirect = '/sistema/ocorrencia/';
          break;
        case 'PROJETO':
          redirect = `/projeto/painel/${id_projeto}/ocorrencias`;
          break;
        case 'PFISICA':
          redirect = `/cadastro/pessoa-fisica/ficha/${id_pfisica}/ocorrencias`;
          break;
        case 'PJURIDICA':
          redirect = `/cadastro/pessoa-juridica/ficha/${id_pjuridica}/ocorrencias`;
          break;
        default:
      }

      props.history.push(redirect);
    }
  }
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveOcorrenciasFiltro = async (props, dados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    nome, status, alt_dhsis_maior, alt_dhsis_menor,
  } = dados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('PROJETO_OCORRENCIAS_FILTRO', JSON.stringify(dados));

  ////// ATIVA FILTRO //////
  if (nome !== '' || status !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_OCORRENCIA_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_OCORRENCIA_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_OCORRENCIA_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  toggleFiltro(props, 'projeto-ocorrencia-filtro');
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaOcorrencia = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmOCORRENCIA/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });

    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_OCORRENCIA_CONSULTA', payload: Ficha });
  }
};
