import { noAccent } from '../../index';
import store from '../../../../redux/store';

const { develop } = store.getState().sistema;

export const checkPagePermission = (modulo, name, props) => {
  switch (develop) {
    case true: return true;
    default:
      let exibe;
      const page = noAccent(name).toLowerCase().replace(/-/g, ' ');

      switch (modulo) {
        case 'Cadastro':
          props.visibilityPageCadastro.forEach((item) => {
            const nome = noAccent(item.nome.toLowerCase());
            if (nome.toUpperCase() === page.toUpperCase()) { item.acesso ? exibe = true : exibe = false; }
          });
          break;
        case 'Tabelas':
          props.visibilityPageTabelas.forEach((item) => {
            const nome = noAccent(item.nome).toLowerCase();
            if (nome.toUpperCase() === page.toUpperCase()) {
              item.acesso ? exibe = true : exibe = false;
            }
          });
          break;
        case 'Projeto':
          props.visibilityPageProjeto.forEach((item) => {
            const nome = noAccent(item.nome).toLowerCase();
            if (nome.toUpperCase() === page.toUpperCase()) { item.acesso ? exibe = true : exibe = false; }
          });
          break;
        case 'Financeiro':
          props.visibilityPageFinanceiro.forEach((item) => {
            const nome = noAccent(item.nome).toLowerCase();
            if (nome.toUpperCase() === page.toUpperCase()) { item.acesso ? exibe = true : exibe = false; }
          });
          break;
        case 'Sistema':
          props.visibilityPageSistema.forEach((item) => {
            const nome = noAccent(item.nome).toLowerCase();
            if (nome.toUpperCase() === page.toUpperCase()) { item.acesso ? exibe = true : exibe = false; }
          });
          break;
        default:
      }
      return exibe;
  }
};

export default checkPagePermission;
