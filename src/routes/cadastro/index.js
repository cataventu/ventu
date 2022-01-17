import { Users } from 'react-feather';
import { Async } from '../../components';
import PFpagina from '../../pages/cadastro/pessoa-fisica/pagina';
import PJpagina from '../../pages/cadastro/pessoa-juridica/pagina';
import PagesDefault from '../../pages/dashboards/Default';

const Default = Async(() => PagesDefault);

////////////////////////////////
////// CADASTRO ////////////////
const cadastroRoutesPath = '/cadastro';
const cadastroRoutes = {
  path: cadastroRoutesPath,
  name: 'Cadastro',
  header: 'Módulos Principais',
  icon: Users,
  containsHome: true,
  children: [
    { path: `${cadastroRoutesPath}/dashboard`, name: 'Dashboard', component: Default },
    { path: `${cadastroRoutesPath}/pessoa-fisica`, name: 'Pessoa Física', component: PFpagina },
    { path: `${cadastroRoutesPath}/pessoa-juridica`, name: 'Pessoa Jurídica', component: PJpagina },
  ],
};

export default cadastroRoutes;
