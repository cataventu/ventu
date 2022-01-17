import api from '../../../services/api';
import { showMSG } from '../../../components';
import * as sistema from '../../sistema';

///////// PAGINA ////////////////
/////////////////////////////////
export const editPJuridica = async (props, id, fornecedor) => {
  const { dispatch } = props;
  if (fornecedor) {
    dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_TRUE' });
  } else {
    dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_FALSE' });
  }

  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-juridica/ficha/${id}/dados-comerciais`;
  props.history.push(page);
};

export const consultaPJuridica = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/cadastro/pessoa-juridica/consulta/${id}`;
  props.history.push(page);
};

///////// FILTRO ////////////////
/////////////////////////////////
export const savePJuridicaFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    nome, cnpj, ramoatividade, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PJURIDICA_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (nome !== '' || cnpj !== '' || ramoatividade !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PJURIDICA_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PJURIDICA_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PJURIDICA_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  sistema.toggleFiltro(props, 'tabela-pjuridica-filtro');
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaPJuridica = async (props) => {
  const pesquisa = document.getElementById('pjuridica-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, nome: '', cnpj: '', ramoatividade: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PJURIDICA_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PJURIDICA_FILTRO_FLAG_TRUE' });
};

///////// FICHA /////////////////
///////// DADOS COMERCIAIS ////////
/////////////////////////////////

export const getPJuridicaComercialFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPJURIDICA/COMERCIAL_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PJURIDICA_COMERCIAL_FICHA', payload: Ficha.data });
  }
};

export const savePJuridicaComercial = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    const { dispatch } = props;
    const { fornecedor } = dadosForm;
    let response = '';

    ////// Envia requisição API //////
    const url = '/TsmPJURIDICA/COMERCIAL_GRAVA';
    response = await api.put(url, dadosForm, { auth: props.auth });

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Pessoa Jurídica', 'Cadastro realizado com sucesso!', 'success', 2500);

      fornecedor
        ? await dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_TRUE' })
        : await dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_FALSE' });

      const page = `/cadastro/pessoa-juridica/ficha/${response.data.retorno}/endereco`;
      props.history.push(page);
    }
  }
};

export const resetFieldsPJuridicaComercialFichaData = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PJURIDICA_COMERCIAL_FICHA' });
  dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_FALSE' });
};

///////// RSERVICO /////////////
/////////////////////////////////
export const editRservico = async (props, id_pjuridica, id) => {
  const page = `/cadastro/pjuridica/${id_pjuridica}/ficha/${id}`;
  props.history.push(page);
};

//////// RSERVICO FICHA //////////////////////////////////////

export const resetFieldsPJuridicaRServicoFichaData = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PJURIDICA_RSERVICO_FICHA' });
};

export const getPJuridicaRServicoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRSERVICO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RSERVICO_FICHA', payload: Ficha.data });
  }
};

export const savePJuridicaRServico = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
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
      showMSG('Pessoa Jurídica', 'Novo serviço realizado com sucesso!', 'success', 2500);
    }

    ////// REDIRECT //////
    const page = `/cadastro/pessoa-juridica/ficha/${props.match.params.id}/servico`;
    props.history.push(props.match.params.id);
    props.history.push(page);
  }
};

export const deletePJuridicaRServico = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRSERVICO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Jurídica', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    const data = { id_pjuridica: id, id_pfisica: 0 };
    sistema.getPagina(props, 'TsmRSERVICO/PAGINA', '@GET_RSERVICO_PAGINA', data, '');
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// FICHA /////////////////
///////// OBSERVACAO ////////////
/////////////////////////////////
export const getPJuridicaObservacao = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPJURIDICA/OBSERVACAO_FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });

    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_PJURIDICA_OBSERVACAO_FICHA', payload: Ficha.data });
  }
};

export const resetPJuridicaObservacao = () => {
  document.getElementById('pjuridica-ficha-observacao').value = '';
};

export const savePJuridicaObservacao = async (props, dadosForm) => {
  let response = '';

  ////// EDITAR //////

  ////// Envia requisição API //////
  const url = '/TsmPJURIDICA/OBSERVACAO_GRAVA';
  response = await api.put(url, dadosForm, { auth: props.auth });
  if (response.data.retorno === 0) {
    ////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
    ////// Notificação Sucesso //////
    showMSG('Pessoa Jurídica', 'Cadastro realizado com sucesso!', 'success', 2500);
  }
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getPJuridicaExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PJURIDICA_FILTRO');
  const url = '/TsmPJURIDICA/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  sistema.getDocument(response);
};

///////// RCONTATO //////////////
/////////////////////////////////
export const savePJuridicaRContato = async (props, dadosForm) => {
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
      showMSG('Pessoa Jurídica', 'Novo contato realizado com sucesso!', 'success', 2500);
    }

    ////// REDIRECT //////
    const page = `/cadastro/pessoa-juridica/ficha/${props.match.params.id}/contato`;
    props.history.push(props.match.params.id);
    props.history.push(page);
  }
};

export const consultaPJuridicaRContato = async (props) => {
  ////// REDIRECT ////////
  const page = '/cadastro/pessoa-juridica/ficha/:id/dados-comerciais';
  props.history.push(page);
};

export const deletePJuridicaRContato = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRCONTATO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Jurídica', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
    sistema.getPagina(props, 'TsmRCONTATO/PAGINA', '@GET_RCONTATO_PAGINA', data, '');
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

export const getPJuridicaRContatoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRCONTATO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RCONTATO_FICHA', payload: Ficha.data });
  }
};

export const resetFieldsPJuridicaRContatoFichaData = (props) => {
  //
  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  dispatch({ type: '@RESET_PJURIDICA_RCONTATO_FICHA' });
};

///////// RENDERECO /////////////
/////////////////////////////////
export const editRendereco = async (props, id_pjuridica, id) => {
  const page = `/cadastro/pjuridica/${id_pjuridica}/ficha/${id}`;
  props.history.push(page);
};

//////// RENDERECO FICHA //////////////////////////////////////

export const resetFieldsPJuridicaREnderecoFichaData = (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PJURIDICA_RENDERECO_FICHA' });
};

export const getPJuridicaREnderecoFicha = async (props, id) => {
  if (id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmRENDERECO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@GET_RENDERECO_FICHA', payload: Ficha.data });
  }
};

export const savePJuridicaREndereco = async (props, dadosForm) => {
  if (sistema.checkValidation()) {
    let { id } = dadosForm;
    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
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
      showMSG('Pessoa Jurídica', 'Novo endereço realizado com sucesso!', 'success', 2500);
    }

    ////// REDIRECT //////
    const page = `/cadastro/pessoa-juridica/ficha/${props.match.params.id}/endereco`;
    props.history.push(props.match.params.id);
    props.history.push(page);
  }
};

export const deletePJuridicaREndereco = async (props, id) => {
  ////// async 1 - exclui info //////
  async function sync_1(props) {
    ////// RECEBE DADOS API //////
    const url = `/TsmRENDERECO/EXCLUI/${id}`;
    const response = await api.delete(url, { auth: props.auth });
    ////// Notificação //////
    response.status === 200 || response.status === 201
      ? showMSG('Pessoa Jurídica', 'Cadastro excluído com sucesso!', 'success', 2500)
      : showMSG('Error', 'Ops! Algo deu errado.', 'error', 2500);
  }

  ////// async 2 - hideModal //////
  async function sync_2(props) {
    sistema.hideModal(props);
  }

  ////// async 3 - recarrega page //////
  async function sync_3(props) {
    const data = { id_pjuridica: id, id_pfisica: 0 };
    sistema.getPagina(props, 'TsmRENDERECO/PAGINA', '@GET_RENDERECO_PAGINA', data, '');
  }

  /// Ordena a execução dos scripts
  Promise.all([await sync_1(props), await sync_2(props), await sync_3(props)]);
};

///////// CONSULTA //////////////
/////////////////////////////////
export const getConsultaDadosComerciais = async (props, id) => {
  if (id && id > 0) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPJURIDICA/COMERCIAL_FICHA/${id}`;
    const Dados = await api.get(url, { auth: props.auth });
    const Ficha = Dados.data;
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    dispatch({ type: '@SET_CONSULTA_DADOSCOMERCIAIS', payload: Ficha });
  }
};

   ////// DASHBOARD ////////
   export const getPJuridicaDashboard = async (props) => {
    
   
    ////// RECEBE DADOS API ////////
    const url = `/TsmPJURIDICA/DASHBOARD/`;
    const dashboardListaData = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    await dispatch({ type: '@GET_PJURIDICA_DASHBOARD', payload: dashboardListaData.data });

  };