import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';
import { saveComparar } from '../../projeto/rsvp';

///////// PAGINA ////////////////
/////////////////////////////////
export const editPFisica = async (props, id, fornecedor) => {
  ////// REDIRECT ////////
  const { dispatch } = props;

  if (fornecedor) {
    dispatch({ type: '@SET_PFISICA_FORNECEDOR_TRUE' });
  } else {
    dispatch({ type: '@SET_PFISICA_FORNECEDOR_FALSE' });
  }

  const page = `/cadastro/pessoa-fisica/ficha/${id}/dados-pessoais`;
  props.history.push(page);
};

export const consultaPFisica = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-fisica/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const savePFisicaFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    nome, cpf, genero, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PFISICA_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (nome !== '' || cpf !== '' || genero !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PFISICA_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PFISICA_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PFISICA_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-pfisica-filtro');
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaPFisica = async (props) => {
  const pesquisa = document.getElementById('pfisica-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, nome_completo: '', cpf: '', genero: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PFISICA_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PFISICA_FILTRO_FLAG_TRUE' });
};

///////// FOTO //////////////////
/////////////////////////////////
export const uploadFoto = () => {
  document.getElementById('image-file').click();
};

export const getFotoData = (id, props) => {
  console.log('getFotoData:',id, props)
  sistema.base64(document.getElementById('image-file').files, async (foto) => {
    const data = {
      id: parseInt(id, 10),
      foto: foto.base64,
      alt_usuario: props.user.id,
      // alt_dhsis: props.fotoFichaData.alt_dhsis,
    };

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@SET_PFISICA_FOTO', payload: data });
    dispatch({ type: '@SET_PFISICA_FOTO_FLAG_TRUE' });
  });
};

export const saveFotoData = async (id, props) => {
  console.log('saveFotoData:',id, props)
  if (props.fotoFichaFlag) {
    ////// RECEBE DADOS API ////////
    const data = {
      id: parseInt(id, 10),
      foto: props.fotoFichaData.foto,
      alt_usuario: props.user.id,
      alt_dhsis: props.fotoFichaData.alt_dhsis,
    };

    const url = '/TsmPFISICA/FOTO_GRAVA';
    await api.put(url, data, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_PFISICA_FOTO_FLAG_FALSE' });
  }
};

export const getPFisicaFoto = async (props, id) => {
  console.log('getPFisicaFoto:',id, props)
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/FOTO_FICHA/${id}`;
    const Foto = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@SET_PFISICA_FOTO', payload: Foto.data });
  }
};

///////// FICHA /////////////////
///////// DADOS PESSOAIS ////////
/////////////////////////////////

export const getPFisicaPessoalFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/PESSOAL_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PFISICA_PESSOAL_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaPessoalFichaData = (props) => {
  //////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_PESSOAL_FICHA' });
  dispatch({ type: '@RESET_PFISICA_FOTO' });
};

export const savePFisicaPessoal = async (props, dadosForm) => {
  console.log('savePFisicaPessoal:', props, dadosForm)
  const id_RSVP = props.match.params.idRSVP;
  const id_PROJETO = props.match.params.idProjeto;
  const { dispatch } = props;

  if (sistema.checkValidation()) {
    const { fornecedor, estrangeira, cpf } = dadosForm;

    if (!estrangeira && cpf === '') {
      document.getElementById('pfisica-ficha-cpf').className += ' validation-error';
    }

    let response = '';

    ////// Envia requisição API //////
    const url = '/TsmPFISICA/PESSOAL_GRAVA';
    response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////

    ////// save FOTO
    if (props.fotoFichaFlag) {
      saveFotoData(response.data.retorno, props);
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física', 'Cadastro realizado com sucesso!', 'success', 2500);

      ////// CASO FORNECEDOR
      fornecedor
        ? await dispatch({ type: '@SET_PFISICA_FORNECEDOR_TRUE' })
        : await dispatch({ type: '@SET_PFISICA_FORNECEDOR_FALSE' });

      ////// REDIRECT //////
      if (id_RSVP === undefined && id_PROJETO === undefined) {
        const page = `/cadastro/pessoa-fisica/ficha/${response.data.retorno}/dados-comerciais`;
        props.history.push(page);
        ////// CASO CADASTRO ORIGEM SEJA RSVP
      } else if (id_RSVP !== undefined && id_PROJETO !== undefined) {
        ///RSVP Compara
        const id_PFisica = response.data.retorno;
        saveComparar(props, id_PROJETO, id_PFisica);
      }
    }
  }
};

export const getRSVPFichaPF = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRSVP/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// NOME RESERVA ////////
    const array = Ficha.data.nome_completo.split(' ');
    let reserva = `${array[array.length - 1]}/${array[0]}`;
    if (array[array.length - 1] === '') {
      reserva = `${array[array.length - 2]}/${array[0]}`;
    }

    document.getElementById('pfisica-ficha-nome-completo').value = Ficha.data.nome_completo;
    document.getElementById('pfisica-ficha-nome-reserva').value = reserva;
    document.getElementById('pfisica-ficha-nome-cracha').value = Ficha.data.nome_completo;
  }
};

///////// FICHA /////////////////
///////// OBSERVACAO ////////////
/////////////////////////////////
export const getPFisicaObservacao = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/OBSERVACAO_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PFISICA_OBSERVACAO_FICHA', payload: Ficha.data });
  }
};

export const savePFisicaObservacao = async (props, dadosForm) => {
  let response = '';

  ////// Envia requisição API //////
  const url = '/TsmPFISICA/OBSERVACAO_GRAVA';
  response = await api.put(url, dadosForm, { auth: props.auth });
  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Pessoa Física', 'Cadastro realizado com sucesso!', 'success', 2500);
  }
};

///////// DADOS COMERCIAIS //////
/////////////////////////////////
export const getPFisicaComercialFicha = async (props, id) => {
  if (id > 0) {
    const { dispatch } = props;
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/COMERCIAL_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    dispatch({ type: '@GET_PFISICA_COMERCIAL_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaComercialFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_COMERCIAL_FICHA' });
  dispatch({ type: '@SET_PFISICA_FORNECEDOR_FALSE' });
  dispatch({ type: '@RESET_AUTOCOMPLETAR' });
};

export const savePFisicaComercial = async (props, dadosForm) => {
  let response = '';
  ////// Envia requisição API //////
  const { fornecedor } = dadosForm;
  const url = '/TsmPFISICA/COMERCIAL_GRAVA';
  response = await api.put(url, dadosForm, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Pessoa Física - Comercial', 'Cadastro realizado com sucesso!', 'success', 2500);

    if (fornecedor) {
      const page = `/cadastro/pessoa-fisica/ficha/${response.data.retorno}/servico`;
      props.history.push(page);
    } else {
      const page = `/cadastro/pessoa-fisica/ficha/${response.data.retorno}/contato`;
      props.history.push(page);
    }
  }
};

///////// EMERGENCIA ////////////
/////////////////////////////////
export const getPFisicaEmergenciaFicha = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/EMERGENCIA_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PFISICA_EMERGENCIA_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaEmergenciaFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_EMERGENCIA_FICHA' });
};

export const savePFisicaEmergencia = async (props, dadosForm) => {
  let response = '';

  ////// Envia requisição API //////
  const url = '/TsmPFISICA/EMERGENCIA_GRAVA';
  response = await api.put(url, dadosForm, { auth: props.auth });
  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Pessoa Física - Emergência', 'Cadastro realizado com sucesso!', 'success', 2500);
    const page = `/cadastro/pessoa-fisica/ficha/${response.data.retorno}/passaporte`;
    props.history.push(page);
  }
};
///////// PERFIL ////////////////
/////////////////////////////////
export const savePFisicaPerfil = async (props, id) => {
  const data = {
    id_pfisica: id,
    rperfil_regs: props.perfilResumeData,
  };
  const url = '/TsmRPERFIL/GRAVA';
  const response = await api.put(url, data, { auth: props.auth });

  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Pessoa Física', 'Cadastro realizado com sucesso!', 'success', 2500);
  }
};

export const setPFisicaPerfilResumo = async (props, data) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@SET_PFISICA_PERFIL_RESUMO', payload: data });
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getPFisicaExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PFISICA_FILTRO');
  const url = '/TsmPFISICA/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });
  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// RCONTATO //////////////
/////////////////////////////////
export const getRContatoPagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRCONTATO/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RCONTATO_PAGINA', payload: Pagina.data });
};

export const savePFisicaRContato = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmRCONTATO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRCONTATO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física', 'Novo contato realizado com sucesso!', 'success', 2500);

      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/contato`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const consultaPFisicaRContato = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-fisica/ficha/${id}/dados-pessoais`;
  props.history.push(page);
};

export const deletePFisicaRContato = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRCONTATO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getRContatoPagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getPFisicaRContatoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRCONTATO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RCONTATO_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaRContatoFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RCONTATO_FICHA' });
};

///////// RPASSAPORTE //////////////
/////////////////////////////////
export const getRPassaportePagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRPASSAPORTE/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RPASSAPORTE_PAGINA', payload: Pagina.data });
};

export const savePFisicaRPassaporte = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmRPASSAPORTE/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });

    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRPASSAPORTE/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física - Passaporte', 'Novo passaporte realizado com sucesso!', 'success', 2500);

      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/passaporte`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const consultaPFisicaRPassaporte = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-fisica/ficha/${id}/dados-pessoais`;
  props.history.push(page);
};

export const deletePFisicaRPassaporte = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRPASSAPORTE/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getRPassaportePagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getPFisicaRPassaporteFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRPASSAPORTE/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RPASSAPORTE_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaRPassaporteFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RPASSAPORTE_FICHA' });
};

///////// RVISTO //////////////
/////////////////////////////////
export const getRVistoPagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRVISTO/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RVISTO_PAGINA', payload: Pagina.data });
};

export const savePFisicaRVisto = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmRVISTO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRVISTO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física - Visto', 'Novo visto realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/visto`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const consultaPFisicaRVisto = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-fisica/ficha/${id}/visto`;
  props.history.push(page);
};

export const deletePFisicaRVisto = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRVISTO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física - Visto', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getRVistoPagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getPFisicaRVistoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRVISTO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RVISTO_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaRVistoFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RVISTO_FICHA' });
};

///////// RCARTAO //////////////
/////////////////////////////////
export const getRCartaoPagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRCARTAO/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RCARTAO_PAGINA', payload: Pagina.data });
};

export const savePFisicaRCartao = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmRCARTAO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRCARTAO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física - Cartão', 'Novo cartão realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/cartao`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const consultaPFisicaRCartao = async (props, id) => {
  ////// REDIRECT ////////
  const page = `'/cadastro/pessoa-fisica/ficha/${id}/cartao`;
  props.history.push(page);
};

export const deletePFisicaRCartao = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRCARTAO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física - Cartão', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getRCartaoPagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getPFisicaRCartaoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRCARTAO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RCARTAO_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPFisicaRCartaoFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RCARTAO_FICHA' });
};

///////// RENDERECO /////////////
/////////////////////////////////
export const getREnderecoPagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRENDERECO/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RENDERECO_PAGINA', payload: Pagina.data });
};

export const resetFieldsPFisicaREnderecoFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RENDERECO_FICHA' });
};

export const getPFisicaREnderecoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRENDERECO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RENDERECO_FICHA', payload: Ficha.data });
  }
};

export const savePFisicaREndereco = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== 0) {
      ////// Envia requisição API //////
      const url = '/TsmRENDERECO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmRENDERECO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física', 'Novo endereço realizado com sucesso!', 'success', 2500);

      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/endereco`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const deletePFisicaREndereco = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRENDERECO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getREnderecoPagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// RSERVICO /////////////
/////////////////////////////////
export const getRServicoPagina = async (props, id) => {
  ////// RECEBE DADOS API ////////
  const url = '/TsmRSERVICO/PAGINA';
  const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };

  const Pagina = await api.post(url, data, { auth: props.auth });

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_RSERVICO_PAGINA', payload: Pagina.data });
};

export const resetFieldsPFisicaRServicoFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_RSERVICO_FICHA' });
};

export const getPFisicaRServicoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRSERVICO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RSERVICO_FICHA', payload: Ficha.data });
  }
};

export const savePFisicaRServico = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== 0) {
    ////// Envia requisição API //////
      const url = '/TsmRSERVICO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
      ////// NOVO REGISTRO //////
    } else {
    ////// Envia requisição API //////
      const url = '/TsmRSERVICO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física', 'Novo serviço realizado com sucesso!', 'success', 2500);

      ////// REDIRECT //////
      const page = `/cadastro/pessoa-fisica/ficha/${props.match.params.id}/servico`;
      props.history.push(props.match.params.id);
      props.history.push(page);
    }
  }
};

export const deletePFisicaRServico = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRSERVICO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Física', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    await getRServicoPagina(props, props.match.params.id);
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// FAMILIA ///////////////
/////////////////////////////////
export const getPFisicaFamiliaFicha = async (props, id) => {
  if (id > 0) {
    //if ( id && id > 0 ) {

    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/FAMILIA_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PFISICA_FAMILIA_FICHA', payload: Ficha.data });
  }
};

export const getPFisicaFamiliaPagina = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = '/TsmPFISICA/FAMILIA_PAGINA/';
    const data = {
      id_pfisica: id,
      id_pjuridica: 0,
    };
    const Ficha = await api.post(url, data, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PFISICA_FAMILIA_PAGINA', payload: Ficha.data });
  }
};

export const resetPFisicaFamiliaFichaData = (props) => {
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PFISICA_FAMILIA_FICHA' });
};

export const savePFisicaFamilia = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let response = '';
    const url = '/TsmPFISICA/FAMILIA_GRAVA';
    response = await api.put(url, dadosForm, { auth: props.auth });
    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Física', 'Cadastro realizado com sucesso!', 'success', 2500);
      const page = `/cadastro/pessoa-fisica/ficha/${response.data.retorno}/emergencia`;
      props.history.push(page);
    }
  }
};

/////////// PERFIL //////////////
/////////////////////////////////
export const getPerfilLista = async (props, id) => {

  ////// RECEBE DADOS API ////////
  const url = `/TsmRPERFIL/FICHA/${id}`;
  const perfilListaData = await api.get(url, { auth: props.auth });
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@SET_PFISICA_PERFIL_LISTA', payload: perfilListaData.data });
};

   ////// DASHBOARD ////////
   export const getPFisicaDashboard = async (props) => {
    
   
    ////// RECEBE DADOS API ////////
    const url = `/TsmPFISICA/DASHBOARD/`;
    const dashboardListaData = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_PFISICA_DASHBOARD', payload: dashboardListaData.data });
    console.log( dashboardListaData.data)
  };