import Blank from '../../pages/misc/Blank';

import pessoaFisicaPrivateRoutes from './children/cadastro/pessoa-fisica';
import pessoaJuridicaPrivateRoutes from './children/cadastro/pessoa-juridica';
import projetoPrivateRoutes from './children/projeto';
import tabelasPrivateRoutes from './children/tabelas';
import financeiroPrivateRoutes from './children/financeiro';
import financeiroRelatoriosPrivateRoutes from './children/financeiro/relatorios';
import sistemaPrivateRoutes from './children/sistema';
//import parametrosPrivateRoutes from './children/sistema/parametros';

const childrens = [];

childrens.push({ path: '/private/blank', name: 'Blank Page', component: Blank });

pessoaFisicaPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

pessoaJuridicaPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

projetoPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

tabelasPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

financeiroPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

financeiroRelatoriosPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

sistemaPrivateRoutes.forEach((item) => {
  childrens.push(item);
});

const privateRoutes = {
  path: '/private',
  name: 'Private',
  children: childrens,
};

export default privateRoutes;
