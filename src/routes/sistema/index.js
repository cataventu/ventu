import { Settings } from 'react-feather';
import UsuarioPagina from '../../pages/sistema/usuario/pagina';
//import Email from "../../pages/sistema/email";
import ChangeLog from '../../pages/sistema/changeLog';
import Ocorrencias from '../../pages/sistema/ocorrencias';
import Parametros from '../../pages/sistema/parametros/categoria/pagina';
import alterarSenha from '../../pages/sistema/alterarSenha/ficha';


//import Blank from "../../pages/misc/Blank";

////////////////////////////////
////// SISTEMA /////////////////
const sistemasRoutesPath = '/sistema';
const sistemasRoutes = {
  path: sistemasRoutesPath,
  name: 'Sistema',
  header: 'Módulo de Gestão',
  icon: Settings,
  containsHome: true,
  children: [
    { path: `${sistemasRoutesPath}/parametros`, name: 'Parâmetro', component: Parametros },
    { path: `${sistemasRoutesPath}/usuario`, name: 'Usuário', component: UsuarioPagina },
    { path: `${sistemasRoutesPath}/ocorrencia`, name: 'Ocorrência', component: Ocorrencias },
    //{ path: sistemasRoutesPath + "/send-email",  name: "Email", component: Email },
    { path: `${sistemasRoutesPath}/change-log`, name: 'Change Log', component: ChangeLog },
    { path: `${sistemasRoutesPath}/alterasenha`, name: 'Altera Senha', component: alterarSenha },
  ],
};

export default sistemasRoutes;
