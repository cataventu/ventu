import api from '../../services/api';
import { showMSG } from '../../components';
import { toggleFiltro, getDocument, checkValidation } from '../sistema';

///////// PAGINA ////////////////
/////////////////////////////////

export const editProjeto = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/projeto/projeto/ficha/${id}`;

  props.history.push(page);
};

export const consultaProjeto = async (props, id) => {
  ////// REDIRECT ////////
  const page = `/projeto/projeto/consulta/${id}`;
  props.history.push(page);
};

export const resetNomeProjeto = async (props) => {
  const { dispatch } = props;
  /// dispatch({ type: '@SET_SWITCH_CHECKED_FALSE' });
  dispatch({ type: '@RESET_PROJETO_FICHA' });
  dispatch({ type: '@RESET_PARTICIPANTES_NOMEPROJETO' });
  dispatch({ type: '@RESET_RSVP_COMPARAR' });
  dispatch({ type: '@RESET_RSVP_FICHA' });
  dispatch({ type: '@RESET_RSVP_PAGINA' });
  dispatch({ type: '@RESET_OCORRENCIA_FICHA' });
  dispatch({ type: '@RESET_OCORRENCIA_PAGINA' });
  dispatch({ type: '@RESET_ROOMINGLIST_FICHA' });
};

///////// FILTRO ////////////////
/////////////////////////////////
export const saveProjetoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    descricao, tipo, dt_inicio_menor, dt_inicio_maior, dt_termino_menor, dt_termino_maior, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_PROJETO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (descricao !== '' || tipo !== '' || dt_inicio_menor !== '' || dt_inicio_maior !== '' || dt_termino_menor !== '' || dt_termino_maior !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_PROJETO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_PROJETO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_PROJETO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  toggleFiltro(props, 'tabela-projeto-filtro');
};
export const setFieldsProjetoFiltro = (data) => {
  document.getElementById('projeto-filtro-projeto').value = data.descricao;
  document.getElementById('projeto-filtro-tipo').value = data.tipo;
  document.getElementById('projeto-filtro-dt_inicio_menor').value = data.dt_inicio_menor.replace(/[/]/g, '-');
  document.getElementById('projeto-filtro-dt_inicio_maior').value = data.dt_inicio_maior.replace(/[/]/g, '-');
  document.getElementById('projeto-filtro-dt_termino_menor').value = data.dt_termino_menor.replace(/[/]/g, '-');
  document.getElementById('projeto-filtro-dt_termino_maior').value = data.dt_termino_maior.replace(/[/]/g, '-');
  document.getElementById('projeto-filtro-data-maior').value = data.alt_dhsis_maior.replace(/[/]/g, '-');
  document.getElementById('projeto-filtro-data-menor').value = data.alt_dhsis_menor.replace(/[/]/g, '-');
};

export const resetFieldsProjetoFiltro = async (props) => {
  document.getElementById('projeto-filtro-projeto').value = '';
  document.getElementById('projeto-filtro-tipo').value = '';
  document.getElementById('projeto-filtro-dt_inicio_menor').value = '';
  document.getElementById('projeto-filtro-dt_inicio_maior').value = '';
  document.getElementById('projeto-filtro-dt_termino_menor').value = '';
  document.getElementById('projeto-filtro-dt_termino_maior').value = '';
  document.getElementById('projeto-filtro-data-maior').value = '';
  document.getElementById('projeto-filtro-data-menor').value = '';

  const { dispatch } = props;
  dispatch({ type: '@RESET_PROJETO_FILTRO' });

  await saveProjetoFiltro(props, false);
};

///////// PESQUISA //////////////
/////////////////////////////////
export const pesquisaProjeto = async (props) => {
  const pesquisa = document.getElementById('projeto-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, codigo: '', descricao: '', tipo: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_PROJETO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_PROJETO_FILTRO_FLAG_TRUE' });
};

////////////// FICHA HOOKS ///////09/06/2020/////////////////
export const getProjetoFicha = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmPROJETO/FICHA/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    const { codigo, descricao } = Ficha.data;
    console.log(Ficha.data);
    const nome_projeto = `${codigo} - ${descricao}`;
    dispatch({ type: '@GET_PROJETO_FICHA', payload: Ficha.data });
    dispatch({ type: '@SET_NOMEPROJETO', payload: nome_projeto });
    return Ficha.data;
  }
  return false;
};

export const saveProjeto = async (props, dadosForm) => {
  if (checkValidation()) {
    let { id } = dadosForm;

    if (id === '' || Number.isNaN(id)) { id = '0'; }

    let response = '';
    ////// EDITAR //////
    if (id !== '0') {
      ////// Envia requisição API //////
      const url = '/TsmPROJETO/GRAVA';
      response = await api.put(url, dadosForm, { auth: props.auth });
    ////// NOVO REGISTRO //////
    } else {
      ////// Envia requisição API //////
      const url = '/TsmPROJETO/INCLUI';
      response = await api.post(url, dadosForm, { auth: props.auth });
    }

    if (response.data.retorno === 0) {
      ////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////// Notificação Sucesso //////
      showMSG('Projeto', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      //const page = "/projeto/painel";
      if (id === '0') {
        const page = `/projeto/painel/${response.data.retorno}/rsvp`;
        props.history.push(page);
      }
    }
  }
};

///////// EXCEL /////////////////
/////////////////////////////////
export const getProjetoExcel = async (props) => {
  ////// Notificação ao usuário //////
  showMSG('Aguarde', 'Baixando arquivo.', 'info', 4750);

  ////// Envia requisição API //////
  const data = localStorage.getItem('TABELAS_PROJETO_FILTRO');

  const url = '/TsmPROJETO/EXCEL';

  const response = await api.post(url, data, { auth: props.auth });

  ////// Download do documento //////
  getDocument(response);
};

export const dossieConsulta = async (props, id) => {
  if (id) {
    ////// RECEBE DADOS API ////////
    const url = `/TsmDOSSIE/PROJETO/${id}`;
    const Ficha = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;
    const { id, codigo, descricao } = Ficha.data;
    //console.log(Ficha.data);
    //const nome_projeto = `${codigo} - ${descricao}`;
    dispatch({ type: '@GET_DOSSIE_CONSULTA', payload: Ficha.data });
    //dispatch({ type: '@SET_NOMEPROJETO', payload: nome_projeto });
    return Ficha.data;
  }
  return false;
};
