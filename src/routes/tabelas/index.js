import { Database } from 'react-feather';
import ProfissaoPagina from '../../pages/tabelas/profissao/pagina';
import RamoAtividadePagina from '../../pages/tabelas/ramoatividade/pagina';
import PaisPagina from '../../pages/tabelas/pais/pagina';
import MunicipioPagina from '../../pages/tabelas/municipio/pagina';
import PerfilPagina from '../../pages/tabelas/perfil/pagina';
import CartaoPagina from '../../pages/tabelas/tipo_cartao/pagina';
import ServicoPagina from '../../pages/tabelas/servico/pagina';
import AeroportoPagina from '../../pages/tabelas/aeroporto/pagina';

////////////////////////////////
////// TABELAS ////////////////
const tabelasPath = '/tabelas';
const tabelasRoutes = {
  path: tabelasPath,
  name: 'Tabelas',
  header: 'Informações Auxiliares',
  icon: Database,
  containsHome: true,
  children: [
    { path: `${tabelasPath}/aeroporto`, name: 'Aeroporto', component: AeroportoPagina },
    { path: `${tabelasPath}/tipo-cartao`, name: 'Tipo Cartão', component: CartaoPagina },
    { path: `${tabelasPath}/municipio`, name: 'Município', component: MunicipioPagina },
    { path: `${tabelasPath}/pais`, name: 'País', component: PaisPagina },
    { path: `${tabelasPath}/perfil`, name: 'Perfil', component: PerfilPagina },
    { path: `${tabelasPath}/profissao`, name: 'Profissão', component: ProfissaoPagina },
    { path: `${tabelasPath}/ramo-atividade`, name: 'Ramo atividade', component: RamoAtividadePagina },
    { path: `${tabelasPath}/servico`, name: 'Serviço', component: ServicoPagina },
  ],
};

export default tabelasRoutes;
