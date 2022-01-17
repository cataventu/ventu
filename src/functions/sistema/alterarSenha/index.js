import api from '../../../services/api';
import store from '../../../redux/store/index';
import * as sistema from '../../sistema';
import { showMSG } from '../../../components';
import { loginUserData, alterarSenhaFichaData } from '../../../redux/initials/sistema/login';

//////////////////////////////////////
/// Atualiza Permissões do usuário ///
async function userFicha(props, _id, salvar) {
  /// console.log("Sync 2 - id");
  ////// RECEBE DADOS API ////////
  const url = `/TsmUSUARIO/FICHA/${_id}`;
  const usuarioFicha = await api.get(url, { auth: props.auth });

  const visibilityModulo = [
    { nome: 'Cadastro', acesso: usuarioFicha.data.modulo_regs[0].acesso },
    { nome: 'Tabelas', acesso: usuarioFicha.data.modulo_regs[1].acesso },
    { nome: 'Projeto', acesso: usuarioFicha.data.modulo_regs[2].acesso },
    { nome: 'Financeiro', acesso: usuarioFicha.data.modulo_regs[3].acesso },
    { nome: 'Sistema', acesso: usuarioFicha.data.modulo_regs[4].acesso },
  ];

  ////// Permissões Cadastro /////////
  ////////////////////////////////////
  const visibilityPageCadastro = [];
  visibilityPageCadastro.push({ nome: 'Dashboard', acesso: false });

  usuarioFicha.data.modulo_regs[0].pagina_regs.forEach((item) => {
    const permissao = {
      nome: item.descricao,
      acesso: item.acesso,
      funcoes: item.funcao_regs,
    };
    visibilityPageCadastro.push(permissao);
  });

  ////// Permissões Tabelas //////////
  ////////////////////////////////////
  const visibilityPageTabelas = [];
  visibilityPageTabelas.push({ nome: 'Dashboard', acesso: false });

  usuarioFicha.data.modulo_regs[1].pagina_regs.forEach((item) => {
    const permissao = {
      nome: item.descricao,
      acesso: item.acesso,
      funcoes: item.funcao_regs,
    };
    visibilityPageTabelas.push(permissao);
  });

  ////// Permissões Projeto //////////
  ////////////////////////////////////
  const visibilityPageProjeto = [];
  visibilityPageProjeto.push({ nome: 'Dashboard', acesso: false });

  usuarioFicha.data.modulo_regs[2].pagina_regs.forEach((item) => {
    const permissao = {
      nome: item.descricao,
      acesso: item.acesso,
      funcoes: item.funcao_regs,
    };
    visibilityPageProjeto.push(permissao);
  });

  ////// Permissões Financeiro ///////
  ////////////////////////////////////
  const visibilityPageFinanceiro = [];
  visibilityPageFinanceiro.push({ nome: 'Dashboard', acesso: false });

  usuarioFicha.data.modulo_regs[3].pagina_regs.forEach((item) => {
    const permissao = {
      nome: item.descricao,
      acesso: item.acesso,
      funcoes: item.funcao_regs,
    };
    visibilityPageFinanceiro.push(permissao);
  });

  ////// Permissões Sistema //////////
  ////////////////////////////////////
  const visibilityPageSistema = [];
  visibilityPageSistema.push({ nome: 'Dashboard', acesso: false });
  visibilityPageSistema.push({ nome: 'Bem vindo', acesso: true });
  visibilityPageSistema.push({ nome: 'Change log', acesso: true });
  visibilityPageSistema.push({ nome: 'Email', acesso: false });

  usuarioFicha.data.modulo_regs[4].pagina_regs.forEach((item) => {
    const permissao = {
      nome: item.descricao,
      acesso: item.acesso,
      funcoes: item.funcao_regs,
    };
    visibilityPageSistema.push(permissao);
  });

  ////// Permissões SubPage //////////
  ////////////////////////////////////

  const visibilitySubPages = [];

  const arrayPermissoes = [
    visibilityPageCadastro,
    visibilityPageTabelas,
    visibilityPageProjeto,
    visibilityPageFinanceiro,
    visibilityPageSistema,
  ];

  /// varre todas as arrays de permissoes
  arrayPermissoes.forEach((array) => {
    /// varre uma array de permissão
    array.forEach((item) => {
      let nome = '';
      const subpages = [];
      let flagSubPage = false;

      /// caso tenha o item funções
      if (item.funcoes) {
        nome = item.nome;

        /// varre todas as funções
        item.funcoes.forEach((funcao) => {
          /// caso tenha subpage
          if (funcao.descricao.slice(0, 1) === '>') {
            flagSubPage = true;
            subpages.push({ nome: funcao.descricao, acesso: funcao.acesso });
          }
        });

        /// caso tenha subpage no final de todo processamento
        if (flagSubPage) {
          visibilitySubPages.push({ nome, subpages });
        }
      }
    });
  });

  ////////////////////////////////////
  ////// LOCAL STORAGE ///////////////

  const {
    alt_dhsis,
    alt_dusuario,
    alt_usuario,
    celular,
    email,
    id,
    inc_dhsis,
    inc_dusuario,
    inc_usuario,
    modulo_regs,
    nome,
    senha_email,
    situacao,
  } = usuarioFicha.data;

  const userFicha = {
    versao: store.getState().sistema.versao,
    alt_dhsis,
    alt_dusuario,
    alt_usuario,
    celular,
    email,
    id,
    inc_dhsis,
    inc_dusuario,
    inc_usuario,
    modulo_regs,
    nome,
    senha_email,
    situacao,
  };

  if (salvar) {
    //localStorage.setItem('USUARIO_FICHA', JSON.stringify(usuarioFicha.data));
    localStorage.setItem('USUARIO_FICHA', JSON.stringify(userFicha));
    localStorage.setItem('SET_PERMISSION_MODULO', JSON.stringify(visibilityModulo));

    localStorage.setItem('SET_PERMISSION_PAGE_CADASTRO', JSON.stringify(visibilityPageCadastro));
    localStorage.setItem('SET_PERMISSION_PAGE_TABELAS', JSON.stringify(visibilityPageTabelas));
    localStorage.setItem('SET_PERMISSION_PAGE_PROJETO', JSON.stringify(visibilityPageProjeto));
    localStorage.setItem('SET_PERMISSION_PAGE_FINANCEIRO', JSON.stringify(visibilityPageFinanceiro));
    localStorage.setItem('SET_PERMISSION_PAGE_SISTEMA', JSON.stringify(visibilityPageSistema));
    localStorage.setItem('SET_PERMISSION_SUBPAGES', JSON.stringify(visibilitySubPages));
  } else {
    localStorage.removeItem('USUARIO_FICHA');
    localStorage.removeItem('SET_PERMISSION_MODULO');

    localStorage.removeItem('SET_PERMISSION_PAGE_CADASTRO');
    localStorage.removeItem('SET_PERMISSION_PAGE_TABELAS');
    localStorage.removeItem('SET_PERMISSION_PAGE_PROJETO');
    localStorage.removeItem('SET_PERMISSION_PAGE_FINANCEIRO');
    localStorage.removeItem('SET_PERMISSION_PAGE_SISTEMA');
    localStorage.removeItem('SET_PERMISSION_SUBPAGES');
  }

  ////// ATUALIZA STORE ////////
  const { dispatch } = props;
  await dispatch({ type: '@GET_USUARIO_FICHA', payload: usuarioFicha.data });
  await dispatch({ type: '@SET_PERMISSION_MODULO', payload: visibilityModulo });

  await dispatch({ type: '@SET_PERMISSION_PAGE_CADASTRO', payload: visibilityPageCadastro });
  await dispatch({ type: '@SET_PERMISSION_PAGE_TABELAS', payload: visibilityPageTabelas });
  await dispatch({ type: '@SET_PERMISSION_PAGE_PROJETO', payload: visibilityPageProjeto });
  await dispatch({ type: '@SET_PERMISSION_PAGE_FINANCEIRO', payload: visibilityPageFinanceiro });
  await dispatch({ type: '@SET_PERMISSION_PAGE_SISTEMA', payload: visibilityPageSistema });
  await dispatch({ type: '@SET_PERMISSION_SUBPAGES', payload: visibilitySubPages });
}

//////////////////////////////////////
/// REDIRECT /////////////////////////
async function redirect(props, id) {
  /// console.log("Sync 3 - redirect");
  if (id > 0) {
    const page = '/sistema/bem-vindo';
    await props.history.push(page);
  }
}

const resetLogin = async (props) => {
  const id = props.user.id;
  
  const antiga = document.getElementById('antiga').value;
  const nova1 = document.getElementById('nova1').value;
  const nova2 = document.getElementById('nova2').value;

  let response = '';

  if (sistema.checkValidation()) {

  if (id === 0 || antiga === '' || nova1 === '' || nova2 === ''){
   ////// Notificação falha //////
   showMSG('Error', response.data.msgerro, 'error', 2500);
  } else {
        
  if (id !== 0 && antiga !== '' && nova1 !== '' && nova2 !== ''){
  const { dispatch } = props;
 
   
   ////// USER FICHA ////////
   await userFicha(props, id);
 
  const dadosForm = {
    id,
    antiga,
    nova1,
    nova2,
  }   
    
    console.log('dadosform empacotando: ', dadosForm)
    // const { dispatch } = props;
    let response = '';
    const url2 = `/TsmUSUARIO/ALTERA_SENHA/`;
    response = await api.put(url2, dadosForm, { auth: props.auth });
    if (response.data.retorno === 0) {
      
    //////// Notificação falha //////
    showMSG('Error', response.data.msgerro, 'error', 2500);
  
    } else {
      ////// Notificação Sucesso //////
      showMSG('Senha', 'Senha alterada com sucesso!', 'success', 2500);
      ////// REDIRECT //////
      await redirect(props, id);
    }
 
 }

}
  
  }
   
};
export default resetLogin;