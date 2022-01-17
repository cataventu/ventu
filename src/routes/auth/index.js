// import ResetPassword from '../../pages/sistema/resetSenha';
import Page404 from '../../pages/auth/Page404';
import Page500 from '../../pages/auth/Page500';

////////////////////////////
////// AUTH ////////////////
const authRoutes = {
  path: '/auth',
  name: 'Auth',
  badgeColor: 'secondary',
  badgeText: '12/24',
  children: [
    // { path: '/auth/reset-password', name: 'Reset Password', component: ResetPassword },
    { path: '/auth/404', name: '404 Page', component: Page404 },
    { path: '/auth/500', name: '500 Page', component: Page500 },
  ],
};

export default authRoutes;
