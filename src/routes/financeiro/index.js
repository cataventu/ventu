import { DollarSign } from 'react-feather';
import { Async } from '../../components';
import MovimentoPagina from '../../pages/financeiro/movimento/pagina';
import FixoPagina from '../../pages/financeiro/fixo/pagina';
import MoedaPagina from '../../pages/financeiro/moeda/pagina';
import CambioPagina from '../../pages/financeiro/cambio/pagina';
import GrupoPagina from '../../pages/financeiro/grupo/pagina';
import SubGrupoPagina from '../../pages/financeiro/subgrupo/pagina';
import ContaPagina from '../../pages/financeiro/conta/pagina';
import CartaoCorpPagina from '../../pages/financeiro/cartaocorp/pagina';
import PagesDefault from '../../pages/dashboards/Default';

const Default = Async(() => PagesDefault);

////////////////////////////////
////// FINANCEIRO //////////////
const financeiroRoutesPath = '/financeiro';
const financeiroRoutes = {
  path: financeiroRoutesPath,
  name: 'Financeiro',
  icon: DollarSign,
  containsHome: true,
  children: [
    { path: `${financeiroRoutesPath}/dashboard`, name: 'Dashboard', component: Default },
    { path: `${financeiroRoutesPath}/conta`, name: 'Conta', component: ContaPagina },
    { path: `${financeiroRoutesPath}/fixo`, name: 'Fixo', component: FixoPagina },
    { path: `${financeiroRoutesPath}/grupo`, name: 'Grupo', component: GrupoPagina },
    { path: `${financeiroRoutesPath}/moeda`, name: 'Moeda', component: MoedaPagina },
    { path: `${financeiroRoutesPath}/cambio`, name: 'Cambio', component: CambioPagina },
    { path: `${financeiroRoutesPath}/movimento`, name: 'Movimento', component: MovimentoPagina },
    { path: `${financeiroRoutesPath}/subgrupo`, name: 'Subgrupo', component: SubGrupoPagina },
    { path: `${financeiroRoutesPath}/cartao-corporativo`, name: 'Cartao Corporativo', component: CartaoCorpPagina },
  ],
};

export default financeiroRoutes;
