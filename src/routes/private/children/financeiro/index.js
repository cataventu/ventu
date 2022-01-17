import MOVDashboardPagina from '../../../../pages/financeiro/movimento/dashboard/pagina';

import GrupoFicha from '../../../../pages/financeiro/grupo/ficha';
import GrupoConsulta from '../../../../pages/financeiro/grupo/consulta';
import SubGrupoFicha from '../../../../pages/financeiro/subgrupo/ficha';
import SubGrupoConsulta from '../../../../pages/financeiro/subgrupo/consulta';
import ContaFicha from '../../../../pages/financeiro/conta/ficha';
import ContaConsulta from '../../../../pages/financeiro/conta/consulta';
import MoedaFicha from '../../../../pages/financeiro/moeda/ficha';
import MoedaConsulta from '../../../../pages/financeiro/moeda/consulta';
import CambioFicha from '../../../../pages/financeiro/cambio/ficha';
import CambioConsulta from '../../../../pages/financeiro/cambio/consulta';
import MovimentoTransferir from '../../../../pages/financeiro/movimento/transferir';
import MovimentoFicha from '../../../../pages/financeiro/movimento/ficha';
import MovimentoAgrupar from '../../../../pages/financeiro/movimento/agrupar';
import MovimentoConsulta from '../../../../pages/financeiro/movimento/consulta';
import MovimentoParcelar from '../../../../pages/financeiro/movimento/parcelar';
import MovimentoAnexoPagina from '../../../../pages/financeiro/movimento/anexoPagina';
import MovimentoAnexoFicha from '../../../../pages/financeiro/movimento/anexoFicha';
import MovimentoAnexoConsulta from '../../../../pages/financeiro/movimento/anexoConsulta';

import FixoFicha from '../../../../pages/financeiro/fixo/ficha';
import FixoConsulta from '../../../../pages/financeiro/fixo/consulta';
import CartaoCoorpFicha from '../../../../pages/financeiro/cartaocorp/ficha';
import CartaoCoorpConsulta from '../../../../pages/financeiro/cartaocorp/consulta';

const financeiroPrivateRoutes = [
  {
    path: '/financeiro/movimento/dashboard',
    name: 'Movimento',
    component: MOVDashboardPagina,
  },
  {
    path: '/financeiro/cartao-corporativo/ficha',
    name: 'Cartao Coorporativo',
    component: CartaoCoorpFicha,
  },
  {
    path: '/financeiro/cartao-corporativo/ficha/:id',
    name: 'Cartao Coorporativo',
    component: CartaoCoorpFicha,
  },
  {
    path: '/financeiro/cartao-corporativo/consulta/:id',
    name: 'Cartao Coorporativo',
    component: CartaoCoorpConsulta,
  },
  {
    path: '/financeiro/conta/ficha',
    name: 'Conta',
    component: ContaFicha,
  },
  {
    path: '/financeiro/conta/ficha/:id',
    name: 'Conta',
    component: ContaFicha,
  },
  {
    path: '/financeiro/conta/consulta/:id',
    name: 'Conta',
    component: ContaConsulta,
  },
  {
    path: '/financeiro/fixo/ficha',
    name: 'Fixo',
    component: FixoFicha,
  },
  {
    path: '/financeiro/fixo/ficha/:id',
    name: 'Fixo',
    component: FixoFicha,
  },
  {
    path: '/financeiro/fixo/consulta/:id',
    name: 'Fixo',
    component: FixoConsulta,
  },

  {
    path: '/financeiro/grupo/ficha',
    name: 'Grupo',
    component: GrupoFicha,
  },
  {
    path: '/financeiro/grupo/ficha/:id',
    name: 'Grupo',
    component: GrupoFicha,
  },
  {
    path: '/financeiro/grupo/consulta/:id',
    name: 'Grupo',
    component: GrupoConsulta,
  },

  {
    path: '/financeiro/moeda/ficha',
    name: 'Moeda',
    component: MoedaFicha,
  },
  {
    path: '/financeiro/moeda/ficha/:id',
    name: 'Moeda',
    component: MoedaFicha,
  },
  {
    path: '/financeiro/moeda/consulta/:id',
    name: 'Moeda',
    component: MoedaConsulta,
  },

  {
    path: '/financeiro/cambio/ficha',
    name: 'Cambio',
    component: CambioFicha,
  },
  {
    path: '/financeiro/cambio/ficha/:id',
    name: 'Cambio',
    component: CambioFicha,
  },
  {
    path: '/financeiro/cambio/consulta/:id',
    name: 'Cambio',
    component: CambioConsulta,
  },
  {
    path: '/financeiro/movimento/transferir',
    name: 'Movimento',
    component: MovimentoTransferir,
  },
  {
    path: '/financeiro/movimento/ficha',
    name: 'Movimento',
    component: MovimentoFicha,
  },
  {
    path: '/financeiro/movimento/ficha/:id',
    name: 'Movimento',
    component: MovimentoFicha,
  },
  {
    path: '/financeiro/movimento/consulta/:id',
    name: 'Movimento',
    component: MovimentoConsulta,
  },
  {
    path: '/financeiro/movimento/agrupar/:id',
    name: 'Movimento',
    component: MovimentoAgrupar,
  },
  {
    path: '/financeiro/movimento/parcelar/:id',
    name: 'Movimento',
    component: MovimentoParcelar,
  },
  {
    path: '/financeiro/movimento/ficha/:id/anexo',
    name: 'Movimento',
    component: MovimentoAnexoPagina,
  },
  {
    path: '/financeiro/movimento/ficha/:id/anexo/ficha',
    name: 'Movimento',
    component: MovimentoAnexoFicha,
  },
  {
    path: '/financeiro/movimento/ficha/:id/anexo/ficha/:idAnexo',
    name: 'Movimento',
    component: MovimentoAnexoFicha,
  },
  {
    path: '/financeiro/movimento/ficha/:id/anexo/consulta/:idAnexo',
    name: 'Movimento',
    component: MovimentoAnexoConsulta,
  },

  {
    path: '/financeiro/subgrupo/ficha',
    name: 'SubGrupo',
    component: SubGrupoFicha,
  },
  {
    path: '/financeiro/subgrupo/ficha/:id',
    name: 'SubGrupo',
    component: SubGrupoFicha,
  },
  {
    path: '/financeiro/subgrupo/consulta/:id',
    name: 'SubGrupo',
    component: SubGrupoConsulta,
  },
];

export default financeiroPrivateRoutes;
