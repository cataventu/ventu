import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileExcel, faFileWord, faFilePdf, faImages, faFile, faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import api from '../../services/api';
import {
  base64, formatData, formatDataInput, hideModal, checkValidation, getDocument,
} from '../sistema';
import { showMSG } from '../../components';


///////// DOCUMENTO /////////////
/////////////////////////////////
export const upload = () => {
  document.getElementById('doc-file').click();
};

export const setAnexoFixa = (data) => {
  if (data.data !== '') { document.getElementById('anexo-ficha-data').value = formatDataInput(data.data); }
  document.getElementById('anexo-ficha-titulo').value = data.titulo;
  document.getElementById('anexo-ficha-id').value = data.id;
  document.getElementById('anexo-ficha-extensao').value = data.extensao;
  document.getElementById('anexo-ficha-arquivo').value = data.arquivo;
  document.getElementById('anexo-ficha-tamanho').value = data.tamanho;
  document.getElementById('anexo-ficha-id-pessoa-fisica').value = data.id_pfisica;
  document.getElementById('anexo-ficha-id-pessoa-juridica').value = data.id_pjuridica;
  document.getElementById('anexo-ficha-id-movimento').value = data.id_movimento;
  document.getElementById('anexo-ficha-id-projeto').value = data.id_projeto;
  document.getElementById('anexo-ficha-id-servico').value = data.id_proservico;
  document.getElementById('anexo-ficha-alt_dhsis').value = data.alt_dhsis;
};

export const getDocData = (props) => {
  ////// VARIAVEIS
  const id_anexo = parseInt(props.match.params.idAnexo, 10);
  const id_page = parseInt(props.match.params.id, 10);

  const hoje = moment().format('L');
  const alt_dhsis = formatDataInput(hoje);

  const path = props.location.pathname;
  const url = path.split('/');
  const modulo = url[1];
  const page = url[2];

  let id_pfisica = 0;
  let id_pjuridica = 0;
  let id_projeto = 0;
  const id_proservico = 0;
  let id_movimento = 0;

  ////// VERIFICA ID PAGINA
  switch (modulo) {
    case 'cadastro':
      if (page === 'pessoa-fisica') { id_pfisica = id_page; }
      if (page === 'pessoa-juridica') { id_pjuridica = id_page; }
      break;
    case 'financeiro':
      if (page === 'movimento') { id_movimento = id_page; }
      break;
    case 'projeto':
      if (page === 'painel') { id_projeto = id_page; }
      break;
    default:
  }

  ////// RECEBE DADOS DO ARQUIVO ANEXO
  base64(document.getElementById('doc-file').files, async (doc) => {
    const data = {
      id: id_anexo,
      id_pfisica,
      id_pjuridica,
      id_projeto,
      id_proservico,
      id_movimento,
      data: '',
      titulo: doc.filename,
      tamanho: parseInt((doc.size / 1000), 10),
      extensao: doc.filetype,
      arquivo: doc.base64,
      alt_dhsis,
    };

    ////// ATUALIZA CAMPOS DO FORM ////////
    setAnexoFixa(data);
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_ANEXO_FICHA', payload: data });
  });
};

export const renderIcon = (formato, tamanho) => {
  switch (formato) {
    case '.xls': return <FontAwesomeIcon icon={faFileExcel} className={`p-0 m-0 ml-2 cursor ${tamanho} text-green`} />;
    case '.xlsx': return <FontAwesomeIcon icon={faFileExcel} className={`p-0 m-0 ml-2 cursor ${tamanho} text-green`} />;
    case '.doc': return <FontAwesomeIcon icon={faFileWord} className={`p-0 m-0 ml-2 cursor ${tamanho} text-blue`} />;
    case '.docx': return <FontAwesomeIcon icon={faFileWord} className={`p-0 m-0 ml-2 cursor ${tamanho} text-blue`} />;
    case '.ppt': return <FontAwesomeIcon icon={faFilePowerpoint} className={`p-0 m-0 ml-2 cursor ${tamanho} text-orange`} />;
    case '.pptx': return <FontAwesomeIcon icon={faFilePowerpoint} className={`p-0 m-0 ml-2 cursor ${tamanho} text-orange`} />;
    case '.pdf': return <FontAwesomeIcon icon={faFilePdf} className={`p-0 m-0 ml-2 cursor ${tamanho} text-danger`} />;
    case '.png': return <FontAwesomeIcon icon={faImages} className={`p-0 m-0 ml-2 cursor ${tamanho} text-muted`} />;
    case '.jpg': return <FontAwesomeIcon icon={faImages} className={`p-0 m-0 ml-2 cursor ${tamanho} text-muted`} />;
    case '.gif': return <FontAwesomeIcon icon={faImages} className={`p-0 m-0 ml-2 cursor ${tamanho} text-muted`} />;
    default: return <FontAwesomeIcon icon={faFile} className={`p-0 m-0 ml-2 cursor ${tamanho} text-muted`} />;
  }
};

export const renderFoto = (formato, arquivo) => {
  switch (formato) {
    case '.png': return <FontAwesomeIcon className={`p-0 m-0 ml-2 cursor ${arquivo} text-muted`} />;
    case '.jpg': return <FontAwesomeIcon className={`p-0 m-0 ml-2 cursor ${arquivo} text-muted`} />;
    case '.gif': return <FontAwesomeIcon className={`p-0 m-0 ml-2 cursor ${arquivo} text-muted`} />;
    // default: return <FontAwesomeIcon icon={faFile} className={`p-0 m-0 ml-2 cursor ${arquivo} text-muted`} />;
    // let temp = arquivo;
    let ver;
    ver = `data:image/gif;base64,${arquivo}`;
    return ver;

  }
};

export const calculaTamanho = (arquivo) => {
  if (arquivo > 0) {
    let tamanho;
    let temp = arquivo;
    //let temp = parseInt((arquivo / 1000));
    //tamanho = temp + " kb";

    if (temp.toString().length >= 4) {
      temp /= 1000;
      tamanho = `${temp} mb`;
      return tamanho;
    }
    tamanho = `${temp} kb`;
    return tamanho;
  }
  return false;
};

///////// REDIRECT //////////////
/////////////////////////////////
export const goToAnexoFicha = async (props, id) => {
  const page = `${props.match.path}/ficha/${id}/anexo`;
  props.history.push(page);
};

///////// DOWNLOAD //////////////
/////////////////////////////////
export const downloadAnexo = async (props, id) => {
  console.log(props, id);
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4000);

  ////// Envia requisição API //////
  const url = `/TsmANEXO/FICHA/${id}`;
  const anexo = await api.get(url, { auth: props.auth });
  ////// Download do documento //////
  getDocument(anexo);
  console.log(url, anexo);
};

///////// DOWNLOAD //////////////
/////////////////////////////////


///////// FICHA E PAGINA ////////
/////////////////////////////////
export const resetAnexoFicha = (props) => {
  document.getElementById('anexo-ficha-data').value = '';
  document.getElementById('anexo-ficha-titulo').value = '';
  document.getElementById('anexo-ficha-id').value = '';
  document.getElementById('anexo-ficha-extensao').value = '';
  document.getElementById('anexo-ficha-arquivo').value = '';
  document.getElementById('anexo-ficha-id-pessoa-fisica').value = '';
  document.getElementById('anexo-ficha-id-pessoa-juridica').value = '';
  document.getElementById('anexo-ficha-id-movimento').value = '';
  document.getElementById('anexo-ficha-id-projeto').value = '';
  document.getElementById('anexo-ficha-id-servico').value = '';
  document.getElementById('anexo-ficha-alt_dhsis').value = '';
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_ANEXO_FICHA' });
};

export const getAnexoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmANEXO/FICHA/${id}`;
    const anexo = await api.get(url, { auth: props.auth });
    if (anexo !== undefined) {
      ////// ATUALIZA STORE ////////
      const { dispatch } = props;
      await dispatch({ type: '@GET_ANEXO_FICHA', payload: anexo.data });
    }
  }
};

export const getAnexoPagina = async (props, id_pfisica, id_pjuridica, id_projeto, id_proservico, id_movimento) => {
  if (id_pfisica > 0 || id_pjuridica > 0 || id_projeto > 0 || id_proservico > 0 || id_movimento > 0) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmANEXO/PAGINA/';

    const data = {
      id: 0,
      id_pfisica,
      id_pjuridica,
      id_projeto,
      id_proservico,
      id_movimento,
      data: '',
      titulo: '',
      extensao: '',
      arquivo: '',
    };

    const Pagina = await api.post(url, data, { auth: props.auth });

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_ANEXO_PAGINA', payload: Pagina.data });
    dispatch({ type: '@GET_ANEXO_NOME', payload: Pagina.data.nome });
  }
};

// export const getConsultaAnexo = async (props, id) => {
//   ////// REDIRECT ////////
//   const page = `${props.match.url}/consulta/${id}`;
//   // const page = `/anexo/consulta/${id}`;
//   props.history.push(page);
// };

export const getConsultaAnexo = async (props, id) => {
   if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmANEXO/FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_ANEXO_CONSULTA', payload: Ficha });
  }
};

///////// CRUD //////////////////
/////////////////////////////////

export const consultaAnexo = (props, id) => {
  console.log(props,id)
  const page = `${props.match.url}/consulta/${id}`;
  props.history.push(page);
};

export const editAnexo = (props, id) => {
  const page = `${props.match.url}/ficha/${id}`;
  props.history.push(page);
};

export const saveAnexo = async (props) => {
  if (checkValidation()) {
    const {
      id, id_pfisica, id_pjuridica, id_projeto,
      id_proservico, id_movimento, extensao,
      tamanho, arquivo, alt_dhsis,
    } = props.anexoFichaData;

    const newData = document.getElementById('anexo-ficha-data').value;
    const newTitulo = document.getElementById('anexo-ficha-titulo').value;
    const UserID = props.user.id;
    const hoje = moment().format('L');
    const Alt_DHSIS = formatDataInput(hoje);

    const data = {
      id,
      id_pfisica,
      id_pjuridica,
      id_projeto,
      id_proservico,
      id_movimento,
      data: formatData(newData),
      titulo: newTitulo,
      extensao,
      tamanho,
      arquivo,
      inc_usuario: UserID,
      alt_usuario: UserID,
      alt_dhsis: Alt_DHSIS,
    };
    let response;

    if (tamanho > 5000) {
      showMSG('Error', 'Tamanho excede a 5000 Kb', 'error', 2500);
    } else {
      showMSG('Enviando', 'Aguarde o upload do arquivo', 'info', 3000);

      ////// Envia requisição API //////
      const url = '/TsmANEXO/GRAVA';
      response = await api.put(url, data, { auth: props.auth });

      if (response.data.retorno === 0) {
        ////// Notificação falha //////
        showMSG('Error', response.data.msgerro, 'error', 2500);
      } else {
        ////// Notificação Sucesso //////
        showMSG('Anexo', 'Arquivo enviado com sucesso!', 'success', 2500);

        ////// VARIAVEIS DA PAGINA
        const path = props.location.pathname;
        const id_page = parseInt(props.match.params.id, 10);

        const url = path.split('/');
        const modulo = url[1];
        const page = url[2];
        let redirect;

        ////// VERIFICA REDIRECT
        switch (modulo) {
          case 'cadastro':
            if (page === 'pessoa-fisica') { redirect = `/cadastro/pessoa-fisica/ficha/${id_page}/anexo`; }
            if (page === 'pessoa-juridica') { redirect = `/cadastro/pessoa-juridica/ficha/${id_page}/anexo`; }
            break;
          case 'financeiro':
            if (page === 'movimento') { redirect = `/financeiro/movimento/ficha/${id_page}/anexo`; }
            break;
          case 'projeto':
            if (page === 'painel') { redirect = `/projeto/painel/ficha/${id_page}/anexo`; }
            break;
          default:
        }
        ////// REDIRECT
        props.history.push(redirect);
      }
    }
  }
};


export const deleteAnexo = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmANEXO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });

    const { status, data } = response;

    ////// Notificação //////
    status === 200 || status === 201
      ? showMSG('Anexo', 'Arquivo excluído com sucesso!', 'success', 2500)
      : showMSG('Error', data.msgerro, 'error', 2500);
    return data;
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    ////// VARIAVEIS DA PAGINA
    const id = parseInt(props.match.params.id, 10);
    const path = props.location.pathname;
    const url = path.split('/');
    const modulo = url[1];
    const page = url[2];
    ////// VERIFICA REDIRECT
    switch (modulo) {
      case 'cadastro':
        if (page === 'pessoa-fisica') { getAnexoPagina(props, id, 0, 0, 0, 0); }
        if (page === 'pessoa-juridica') { getAnexoPagina(props, 0, id, 0, 0, 0); }
        break;
      case 'financeiro':
        if (page === 'movimento') { getAnexoPagina(props, 0, 0, 0, 0, id); }
        break;
      case 'projeto':
        if (page === 'projeto') { getAnexoPagina(props, 0, 0, 0, id, 0); }
        break;
      default:
    }
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};
