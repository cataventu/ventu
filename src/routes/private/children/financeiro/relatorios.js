import MovimentoccConsulta from '../../../../pages/financeiro/movimento/relatorios/contato';
import MovimentodreConsulta from '../../../../pages/financeiro/movimento/relatorios/dre';
import MovimentofaConsulta from '../../../../pages/financeiro/movimento/relatorios/fechamentoanual';
import MovimentofmConsulta from '../../../../pages/financeiro/movimento/relatorios/fechamentomensal';
import MovimentofcConsulta from '../../../../pages/financeiro/movimento/relatorios/fluxocaixa';
import MovimentotranConsulta from '../../../../pages/financeiro/movimento/relatorios/transacao';
import MovimentodremovConsulta from '../../../../pages/financeiro/movimento/relatorios/dremov';

const financeiroRelatoriosPrivateRoutes = [
  {
    path: '/financeiro/movimento/relatorios/contato',
    name: 'Movimentocc',
    component: MovimentoccConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/dre',
    name: 'Movimentodre',
    component: MovimentodreConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/dremov/:id',
    name: 'Movimentodremov',
    component: MovimentodremovConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/fechamento-anual',
    name: 'Movimentofa',
    component: MovimentofaConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/fechamento-mensal',
    name: 'Movimentofm',
    component: MovimentofmConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/fluxo-caixa',
    name: 'Movimentofc',
    component: MovimentofcConsulta,
  },
  {
    path: '/financeiro/movimento/relatorios/transacao',
    name: 'Movimentotran',
    component: MovimentotranConsulta,
  },
];

export default financeiroRelatoriosPrivateRoutes;
