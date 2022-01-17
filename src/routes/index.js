////// Auth
import { Home } from 'react-feather';
import BemVindo from '../pages/sistema/bemVindo';
import SignIn from '../pages/auth/SignIn';
// import resetSenha from '../pages/sistema/alterarSenha/ficha';

import cadastroRoutes from './cadastro';
import financeiroRoutes from './financeiro';
import projetoRoutes from './projeto';
import tabelasRoutes from './tabelas';
import privateRoutes from './private';
import sistemasRoutes from './sistema';
import authRoutes from './auth';

////// Home Page
const landingRoutes = {
  path: '/', name: 'Home Page', component: SignIn, children: null,
};

const homeRoutes = {
  path: '/sistema/bem-vindo',
  name: 'Home',
  header: '',
  icon: Home,
  containsHome: false,
  component: BemVindo,
};

////// DASHBOARD
export const dashboard = [
  cadastroRoutes,
  financeiroRoutes,
  projetoRoutes,
  tabelasRoutes,
  authRoutes,
  privateRoutes,
  sistemasRoutes,
];

//Landing specific routes
export const landing = [landingRoutes];

//Auth specific routes
export const page = [
  authRoutes,
];

//All routes in sidebar menu
export default [
  homeRoutes,
  cadastroRoutes,
  financeiroRoutes,
  projetoRoutes,
  tabelasRoutes,
  sistemasRoutes,
];
