import api from '../../services/api';
import mailApi from '../../services/mailApi';
import { showMSG } from '../../components';
import { hideSidebar } from '../../redux/actions/sidebarActions';
import autoCompletarV2 from './autoCompletarV2';
import formatExibeValor from './formatExibeValor';
import formatHora from './formatHora';
import formatHoraDHSIS from './formatHoraDHSIS';
import formatDecimal from './formatDecimal';
import formatCompleteZeros from './formatCompleteZeros';
import checkLocalStgLogin from './checkLocalStgLogin';
import calculaValorPercentual from './calculaValorPercentual';
import getCurrentDate from './getCurrentDate';
import AlterarSenha from './alterarSenha';
import autoClickPagination from './autoClickPagination';

export {
  autoCompletarV2,
  autoClickPagination,
  checkLocalStgLogin,
  formatExibeValor,
  formatHora,
  formatHoraDHSIS,
  formatDecimal,
  formatCompleteZeros,
  calculaValorPercentual,
  getCurrentDate,
  AlterarSenha,

};

///////// SYSTEM /////////
export async function setCookie(name, value, days) {
  ////// async 1 //////
  async function sync_1(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  ////// async 2 //////
  async function sync_2(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires};`;
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(name), await sync_2(name, value, days)]);
}

export function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const checkValidation = () => {
  resetValidation();

  const fields = document.getElementsByClassName('required');

  let emptyFields = 0;

  for (let x = 0; x < fields.length; x += 1) {
    if (fields[x].value === '' || fields[x].value === '0') {
      fields[x].className += ' validation-error';
      emptyFields += 1;
    }
  }

  if (emptyFields > 0) {
    showMSG('Error', 'Favor preencher campos obrigatórios', 'error', 2500);
    return false;
  } return true;
};

export const resetValidation = () => {
  const fields = document.getElementsByClassName('required');

  for (let x = 0; x < fields.length; x += 1) {
    fields[x].classList.remove('validation-error');
  }
};

///////// GOTO 2 //////////////
/////////////////////////////////
export const goToPage = async (props, id) => {
  const page = `${props.location.pathname}/ficha/${id}`;
  props.history.push(page);
};

export const goToConsult = async (props, id) => {
  const page = `${props.location.pathname}/consulta/${id}`;
  props.history.push(page);
};

///////// FORMATAÇÃO GERAL /////////
export const upperCaseFirst = (text) => {
  const newText = text.charAt(0).toUpperCase() + text.slice(1);
  return newText;
};

export const formatInputCambio = (input) => {
  const value = input.value.replace(/[^0-9]+/g, '');
  let decimal;
  let newNumber;
  const element = input;

  if (value.length === 2) {
    newNumber = value.substring(0, 1);
    decimal = value.substring(1, 2);
    element.value = `${newNumber}.${decimal}`;
  } else if (value.length >= 5) {
    newNumber = value.substring(0, 1);
    decimal = value.substring(1, 5);
    element.value = `${newNumber}.${decimal}`;
  }
};

export const formatDia = (target) => {
  const input = target;
  const newValue = input.value.replace(/[^0-9]+/g, '');
  input.value = newValue.slice(0, 2);
};

export const formatMesLabel = (value) => {
  switch (value) {
    case 1: return 'JANEIRO';
    case 2: return 'FEVEREIRO';
    case 3: return 'MARÇO';
    case 4: return 'ABRIL';
    case 5: return 'MAIO';
    case 6: return 'JUNHO';
    case 7: return 'JULHO';
    case 8: return 'AGOSTO';
    case 9: return 'SETEMBRO';
    case 10: return 'OUTUBRO';
    case 11: return 'NOVEMBRO';
    case 12: return 'DEZEMBRO';
    default: return null;
  }
};

export const formatAno = (target) => {
  const input = target;
  const newValue = input.value.replace(/[^0-9]+/g, '');
  input.value = newValue.slice(0, 4);
};

//Os campos de percentual são ###.##0,000 (9,3)

export const formatExibePercentual = (number) => {
  if (number !== undefined && number !== '') {
    const value = number.toString().split('.');
    if (value[1] === undefined) { value[1] = '000'; }
    return `${value[0]}.${value[1]}`;
  }
  return 0;
};

//Os de índice são 0,0000 (5,4)

export const formatExibeIndice = (number) => {
  if (number !== undefined && number !== '') {
    const value = number.toString().split('.');
    if (value[1] === undefined) { value[1] = '0000'; }
    return `${value[0]}.${value[1]}`;
  }
  return 0;
};

//Os demais, ###.###.##0,00 (11,2), exceto o incentivo base que é ##0,00 (5,2)
export const limitChar = (text, number) => {
  if (text.length > number) {
    return `${text.substring(0, number)} ...`;
  }
  return text;
};

export const noAccent = (text) => {
  let newText = text;
  newText = newText.replace(/Á/g, 'A').replace(/á/g, 'a');
  newText = newText.replace(/É/g, 'E').replace(/é/g, 'e');
  newText = newText.replace(/Í/g, 'I').replace(/í/g, 'i');
  newText = newText.replace(/Ó/g, 'O').replace(/ó/g, 'o');
  newText = newText.replace(/Ú/g, 'U').replace(/ú/g, 'u');
  newText = newText.replace(/Á/g, 'A').replace(/á/g, 'a');
  newText = newText.replace(/É/g, 'E').replace(/é/g, 'e');
  newText = newText.replace(/Í/g, 'I').replace(/í/g, 'i');
  newText = newText.replace(/Ó/g, 'O').replace(/ó/g, 'o');
  newText = newText.replace(/Ú/g, 'U').replace(/ú/g, 'u');

  newText = newText.replace(/Ã/g, 'A').replace(/ã/g, 'a');
  newText = newText.replace(/Õ/g, 'O').replace(/õ/g, 'o');

  newText = newText.replace(/Â/g, 'A').replace(/â/g, 'a');
  newText = newText.replace(/Ê/g, 'E').replace(/ê/g, 'e');
  newText = newText.replace(/Î/g, 'I').replace(/î/g, 'i');
  newText = newText.replace(/Ô/g, 'O').replace(/ô/g, 'o');
  newText = newText.replace(/Û/g, 'U').replace(/û/g, 'u');

  newText = newText.replace(/Ç/g, 'C').replace(/ç/g, 'c');
  return newText;
};

export const formatValidade = (value) => {
  let newValue = value.replace(/[^0-9]+/g, '');

  let parte1;
  let parte2;

  //if (newValue.length >= 4) {
  parte1 = newValue.slice(0, 2);
  parte2 = newValue.slice(2, 5);
  newValue = `${parte1}/${parte2}`;
  //} else if (newValue.length <= 3) {
  //parte1 = newValue.slice(0, 1);
  //parte2 = newValue.slice(1, 3);
  //newValue = `0${parte1}/${parte2}`;
  //}
  return newValue;
};

export const formatData = (data) => {
  if (data !== undefined) {
    if (data.length > 0) {
      const Dia = data.substring(8, 10);
      const Mes = data.substring(5, 7);
      const Ano = data.substring(0, 4);
      const newData = `${Dia}/${Mes}/${Ano}`;
      return newData;
    }
  }
  return '';
};

export const formatDataInput = (data) => {
  if (data !== undefined && data.length > 0) {
    let Dia = data.substring(0, 2);
    let Mes = data.substring(3, 5);
    const Ano = data.substring(6, 10);

    if (Dia.length === 1) { Dia = `0${Dia}`; }
    if (Mes.length === 1) { Mes = `0${Mes}`; }

    const newData = `${Ano}-${Mes}-${Dia}`;

    return newData;
  }
  return '';
};

export const formatSituacao = (texto) => {
  if (texto === true) {
    return 'Ativo';
  }
  return 'Inativo';
};

export const formatPadrao = (texto) => {
  if (texto === true) {
    return 'SIM';
  }
  return 'NÃO';
};
export const formatPta = (texto) => {
  if (texto === true) {
    return 'SIM';
  }
  return 'NÃO';
};

export const format = (idTipo, campo) => {
  const tipo = document.getElementById(idTipo).value;
  if (tipo === '1' || tipo === '2') { formatCelular(campo); }
};

export const formatNomeReserva = (value) => {
  const array = value.split(' ');
  let reserva = `${array[array.length - 1]}/${array[0]}`;
  if (array[array.length - 1] === '') {
    reserva = `${array[array.length - 2]}/${array[0]}`;
  }

  if (reserva !== 'undefined/') {
    return reserva;
  }

  return false;
};

export const formatCelular = (idCampo) => {
  const texto = document.getElementById(idCampo).value;
  let newTelefone = texto.replace(/[^0-9]+/g, '');
  let pais;
  let ddd;
  let parte1;
  let parte2;
  ////// ETAPA 01 //////
  if (newTelefone.length > 2 && newTelefone.length <= 4) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    newTelefone = `${pais} ${ddd}`;
    ////// ETAPA 02 //////
  } else if (newTelefone.length >= 5 && newTelefone.length <= 8) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 10);
    newTelefone = `${pais} ${ddd} ${parte1}`;
    ////// ETAPA 03 //////
  } else if (newTelefone.length >= 9 && newTelefone.length <= 12) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 8);
    parte2 = newTelefone.slice(8, 14);
    newTelefone = `${pais} ${ddd} ${parte1}-${parte2}`;
    ////// ETAPA 04 //////
  } else if (newTelefone.length > 12) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 9);
    parte2 = newTelefone.slice(9, 13);
    newTelefone = `${pais} ${ddd} ${parte1}-${parte2}`;
  }
  document.getElementById(idCampo).value = newTelefone;
};

export const newFormatCelular = (value) => {
  const texto = value;
  let newTelefone = texto.replace(/[^0-9]+/g, '');
  let pais;
  let ddd;
  let parte1;
  let parte2;
  ////// ETAPA 01 //////
  if (newTelefone.length > 2 && newTelefone.length <= 4) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    newTelefone = `${pais} ${ddd}`;
    ////// ETAPA 02 //////
  } else if (newTelefone.length >= 5 && newTelefone.length <= 8) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 10);
    newTelefone = `${pais} ${ddd} ${parte1}`;
    ////// ETAPA 03 //////
  } else if (newTelefone.length >= 9 && newTelefone.length <= 12) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 8);
    parte2 = newTelefone.slice(8, 14);
    newTelefone = `${pais} ${ddd} ${parte1}-${parte2}`;
    ////// ETAPA 04 //////
  } else if (newTelefone.length > 12) {
    pais = newTelefone.slice(0, 2);
    ddd = newTelefone.slice(2, 4);
    parte1 = newTelefone.slice(4, 9);
    parte2 = newTelefone.slice(9, 13);
    newTelefone = `${pais} ${ddd} ${parte1}-${parte2}`;
  }
  return newTelefone;
};

export const formatConsultaRestrito = (value) => {
  switch (value) {
    case true: return 'SIM';
    case false: return 'NÃO';
    default: return null;
  }
};

//export const formatCEP = input => {
export const formatCEP = (value) => {
  //let newValue = input.value.replace(/[^0-9]+/g,"");
  let newValue = value.replace(/[^0-9]+/g, '');

  let parte1;
  let parte2;

  if (newValue.length >= 6) {
    parte1 = newValue.slice(0, 5);
    parte2 = newValue.slice(5, 9);
    newValue = `${parte1}-${parte2}`;
  }

  //input.value = newValue;
  return newValue;
};

export const formatRG = (value) => {
  //let input = target;
  //let newValue = input.value.replace(/[^0-9]+/g,"").replace(".","");
  let newValue = value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/]/gi, '');
  let parte1;
  let parte2;
  let parte3;
  let parte4;
  ////// ETAPA 01 //////
  if (newValue.length <= 2) {
    parte1 = newValue.slice(0, 2);
    newValue = `${parte1}`;
    ////// ETAPA 02 //////
  } else if (newValue.length <= 5) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    newValue = `${parte1}.${parte2}`;
    ////// ETAPA 03 //////
  } else if (newValue.length <= 8) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    parte3 = newValue.slice(5, 8);
    newValue = `${parte1}.${parte2}.${parte3}`;
    ////// ETAPA 04 //////
  } else if (newValue.length >= 9) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    parte3 = newValue.slice(5, 8);
    parte4 = newValue.slice(8, 9);
    newValue = `${parte1}.${parte2}.${parte3}-${parte4}`;
  }
  return newValue.toUpperCase();
};

export const formatCPF = (value) => {
  //let input = target;
  //let newValue = input.value.replace(/[^0-9]+/g,"").replace(".","");
  let newValue = value.replace(/[^0-9]+/g, '').replace('.', '');
  let parte1;
  let parte2;
  let parte3;
  let parte4;
  ////// ETAPA 01 //////
  if (newValue.length <= 3) {
    parte1 = newValue.slice(0, 3);
    newValue = `${parte1}`;
    ////// ETAPA 02 //////
  } else if (newValue.length <= 6) {
    parte1 = newValue.slice(0, 3);
    parte2 = newValue.slice(3, 6);
    newValue = `${parte1}.${parte2}`;
    ////// ETAPA 03 //////
  } else if (newValue.length <= 9) {
    parte1 = newValue.slice(0, 3);
    parte2 = newValue.slice(3, 6);
    parte3 = newValue.slice(6, 9);
    newValue = `${parte1}.${parte2}.${parte3}`;
    ////// ETAPA 04 //////
  } else if (newValue.length >= 10) {
    parte1 = newValue.slice(0, 3);
    parte2 = newValue.slice(3, 6);
    parte3 = newValue.slice(6, 9);
    parte4 = newValue.slice(9, 11);
    newValue = `${parte1}.${parte2}.${parte3}-${parte4}`;
  }
  //input.value = newValue;
  return newValue;
};

export const formatCNPJ = (value) => {
  //let input = target;
  //let newValue = input.value.replace(/[^0-9]+/g,"").replace(".","");
  let newValue = value.replace(/[^0-9]+/g, '').replace('.', '');
  let parte1;
  let parte2;
  let parte3;
  let parte4;
  let parte5;
  ////// ETAPA 01 //////
  if (newValue.length <= 2) {
    parte1 = newValue.slice(0, 2);
    newValue = `${parte1}`;
    ////// ETAPA 02 //////
  } else if (newValue.length <= 5) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    newValue = `${parte1}.${parte2}`;
    ////// ETAPA 03 //////
  } else if (newValue.length <= 8) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    parte3 = newValue.slice(5, 8);
    newValue = `${parte1}.${parte2}.${parte3}`;
    ////// ETAPA 04 //////
  } else if (newValue.length <= 12) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    parte3 = newValue.slice(5, 8);
    parte4 = newValue.slice(8, 12);
    newValue = `${parte1}.${parte2}.${parte3}/${parte4}`;
  } else if (newValue.length <= 14) {
    parte1 = newValue.slice(0, 2);
    parte2 = newValue.slice(2, 5);
    parte3 = newValue.slice(5, 8);
    parte4 = newValue.slice(8, 12);
    parte5 = newValue.slice(12, 14);
    newValue = `${parte1}.${parte2}.${parte3}/${parte4}-${parte5}`;
  }
  /// input.value = newValue;
  return newValue;
};

///////// CHECK UNCHECK /////////
export const checkOne = (id, name) => {
  /// check on and uncheck others
  const list = document.getElementsByName(name);
  for (let i = 0; i < list.length; i += 1) {
    list[i].checked = false;
  }
  document.getElementById(id).checked = true;
};

///////// BASE64 image /////////
export function base64(file, callback) {
  const coolFile = {};
  function readerOnload(e) {
    const base64 = btoa(e.target.result);
    coolFile.base64 = base64;
    callback(coolFile);
  }

  const reader = new FileReader();
  reader.onload = readerOnload;

  const newFile = file[0];
  /// return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
  /// https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
  /// coolFile.filetype = newFile.type; /// OLD
  coolFile.size = newFile.size;
  coolFile.filename = newFile.name;

  let fname = coolFile.filename;
  //------ danilo
  //fname = fname.slice((fname.lastIndexOf('.') - 1 > 0) + 2);
  //teste
  //fname = fname.substring(fname.length - 3);
  fname = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1].split('.');
  fname = fname[0].length > 0 ? fname[1] : '';
  coolFile.filetype = `.${fname}`;
  reader.readAsBinaryString(newFile);
}

export const sendMail = async () => {
  const _para = document.getElementById('email-ficha-para').value;
  const _cc = document.getElementById('email-ficha-cc').value;
  const _bcc = document.getElementById('email-ficha-cco').value;
  const _subject = document.getElementById('email-ficha-assunto').value;
  const _text = document.getElementById('email-ficha-body').value;
  const _html = document.getElementsByClassName('ql-editor')[0].innerHTML;

  const data = {
    to: _para,
    cc: _cc,
    bcc: _bcc,
    subject: _subject,
    text: _text,
    html: _html,
  };

  ////// RECEBE DADOS API ////////
  const url = '/send-message';

  showMSG('Mensagem Enviada', 'Email enviado com sucesso!', 'success', 2500);
  await mailApi.post(url, data);
};

///////// MODAL /////////
export const showModal = (props, id) => {
  const { dispatch } = props;
  dispatch({ type: '@SHOW_MODAL', payload: id });
};

export const hideModal = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@HIDE_MODAL' });
};

export const showModalFixo = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@SHOW_MODAL_FIXO' });
};

export const hideModalFixo = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@HIDE_MODAL_FIXO' });
};

export const toggleFiltro = (props, id) => {
  document.getElementById(id).classList.toggle('oculta');
};

///////// DOWNLOAD DOCUMENTO /////////
export const getDocument = (response) => {
  const type = response.data.extensao.replace('.', '');
  const download = response.data.titulo + response.data.extensao;
  const href = `data:application/${type};base64,${response.data.arquivo}`;

  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('download', download);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

///////// FUNCOES GENERICAS /////////
export const getCurrentDay = (id) => {
  const date = new Date();

  let dia = String(date.getDate());
  let mes = String(date.getMonth() + 1);
  const ano = String(date.getFullYear());

  if (mes.length === 1) { mes = `0${mes}`; }
  if (dia.length === 1) { dia = `0${dia}`; }

  document.getElementById(id).value = `${ano}-${mes}-${dia}`;
  return `${ano}-${mes}-${dia}`;
};

export const getDados = async (props, url, action) => {
  const Info = await api.get(url, { auth: props.auth });
  if (Info.data !== undefined) {
    const { dispatch } = props;
    dispatch({ type: action, payload: Info.data });
    return Info.data;
  }
  return false;
};

export const getPagina = async (props, url, action, filtro, actionflag) => {
  const { dispatch } = props;
  await dispatch({ type: actionflag });
  const Pagina = await api.post(url, filtro, { auth: props.auth });

  if (Pagina !== undefined) {
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: action, payload: Pagina.data });
    return Pagina.data;
  }

  return false;
};

export const deleteRegistro = async (props, url, actionflag) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const response = await api.delete(url + props.modalId, { auth: props.auth });

    ////// Notificação //////
    response.data.retorno > 0
      ? showMSG('Sucesso!', 'Cadastro excluído!', 'success', 2000)
      : showMSG('Error', response.data.msgerro, 'error', 2000);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    const { dispatch } = props;
    dispatch({ type: actionflag });
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getExcel = async (props, url, data) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 12000);

  ////// Envia requisição API //////
  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

///////// HANDLE SIDEBAR /////////
export const handleSidebar = (dispatch, sidebar) => {
  if (sidebar.isOpen) { dispatch(hideSidebar()); }
};
