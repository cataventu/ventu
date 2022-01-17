import { noAccent } from '../../index';
import store from '../../../../redux/store';

const { develop } = store.getState().sistema;

const checkFunctionsPermission = (props, action) => {
  switch (develop) {
    case true: return 'show';
    default:
      let exibe = 'hide';
      const url = props.location.pathname.split('/');
      const modulo = noAccent(url[1]).toLowerCase();
      const page = noAccent(url[2]).toLowerCase().replace(/-/g, ' ');

      switch (modulo) {
        case 'cadastro':
          props.visibilityPageCadastro.forEach((item) => {
            if (action === undefined) { return; }
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.funcoes.forEach((funcao) => {
                if (action.toUpperCase() === funcao.descricao.toUpperCase()) {
                  if (funcao.acesso) { exibe = 'show'; }
                }
              });
            }
          });
          break;
        case 'tabelas':
          props.visibilityPageTabelas.forEach((item) => {
            if (action === undefined) { return; }
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.funcoes.forEach((funcao) => {
                if (action.toUpperCase() === funcao.descricao.toUpperCase()) {
                  if (funcao.acesso) { exibe = 'show'; }
                }
              });
            }
          });
          break;
        case 'projeto':
          props.visibilityPageProjeto.forEach((item) => {
            if (action === undefined) { return; }
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.funcoes.forEach((funcao) => {
                if (action.toUpperCase() === funcao.descricao.toUpperCase()) {
                  if (funcao.acesso) { exibe = 'show'; }
                }
              });
            }
          });
          break;
        case 'financeiro':
          props.visibilityPageFinanceiro.forEach((item) => {
            if (action === undefined) { return; }
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.funcoes.forEach((funcao) => {
                if (action.toUpperCase() === funcao.descricao.toUpperCase()) {
                  if (funcao.acesso) { exibe = 'show'; }
                }
              });
            }
          });
          break;
        case 'sistema':
          props.visibilityPageSistema.forEach((item) => {
            if (action === undefined) { return; }
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.funcoes.forEach((funcao) => {
                if (action.toUpperCase() === funcao.descricao.toUpperCase()) {
                  if (funcao.acesso) { exibe = 'show'; }
                }
              });
            }
          });
          break;
        default:
      }
      return exibe;
  }
};

export default checkFunctionsPermission;
