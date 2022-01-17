import ProjetoFicha from '../../../../pages/projeto/painel/ficha';
import ProjetoConsulta from '../../../../pages/projeto/painel/consulta/consulta';
import ProjetoAnexoPagina from '../../../../pages/projeto/painel/anexo/pagina';
import ProjetoAnexoFicha from '../../../../pages/projeto/painel/anexo/ficha';
import ProjetoAnexoConsulta from '../../../../pages/projeto/painel/anexo/consulta';

/// SUBCONSULTAS DO PROJETO (LISTAS)
import ProjetoConsultaRSVP from '../../../../pages/projeto/painel/consulta/listaRSVP';
import ProjetoConsultaContratante from '../../../../pages/projeto/painel/consulta/listaContratante';
import ProjetoConsultaParticipantes from '../../../../pages/projeto/painel/consulta/listaParticipantes';
import ProjetoConsultaOcorrencias from '../../../../pages/projeto/painel/consulta/listaOcorrencias';
import ProjetoConsultaMovimentos from '../../../../pages/projeto/painel/consulta/listaMovimentos';
import ProjetoConsultaServicos from '../../../../pages/projeto/painel/consulta/listaServicos';
import ProjetoConsultaServico from '../../../../pages/projeto/servico/consulta';

import RSVPPagina from '../../../../pages/projeto/rsvp';
import RSVPFicha from '../../../../pages/projeto/rsvp/ficha';
import RSVPComparar from '../../../../pages/projeto/rsvp/comparar';

import ContratantePagina from '../../../../pages/projeto/contratante';
import ContratanteFicha from '../../../../pages/projeto/contratante/ficha';

import ParticipantesPagina from '../../../../pages/projeto/participantes';
import ParticipantesFicha from '../../../../pages/projeto/participantes/ficha';

import OcorrenciaPagina from '../../../../pages/projeto/ocorrencia';
import OcorrenciaFicha from '../../../../pages/projeto/ocorrencia/ficha';
//import OcorrenciaConsulta from "../../../../pages/projeto/ocorrencia/consulta";

import ServicosPagina from '../../../../pages/projeto/servico';
import ServicosFicha from '../../../../pages/projeto/servico/ficha';
import ServicoAnexoPagina from '../../../../pages/projeto/servico/anexo/pagina';
import ServicoAnexoFicha from '../../../../pages/projeto/servico/anexo/ficha';
import ServicoAnexoConsulta from '../../../../pages/projeto/servico/anexo/consulta';
//import ServicosConsulta from '../../../../pages/projeto/servico/consulta';

import RoomingListPagina from '../../../../pages/projeto/roominglist';
import RoomingListFicha from '../../../../pages/projeto/roominglist/ficha';
//import RoomingListConsulta from "../../../../pages/projeto/roominglist/consulta";

import TMpagina from '../../../../pages/projeto/tempos-movimentos';
import TMficha from '../../../../pages/projeto/tempos-movimentos/ficha';
import TManexoPagina from '../../../../pages/projeto/tempos-movimentos/anexo/pagina';
import TManexoFicha from '../../../../pages/projeto/tempos-movimentos/anexo/ficha';
import TManexoConsulta from '../../../../pages/projeto/tempos-movimentos/anexo/consulta';

import OrcamentoPagina from '../../../../pages/projeto/orcamento';
import OrcamentoFicha from '../../../../pages/projeto/orcamento/ficha';
import OrcamentoServicoPagina from '../../../../pages/projeto/orcamento/servicos';
import OrcamentoServicoFicha from '../../../../pages/projeto/orcamento/servicos/ficha';

import FinanceiroPagina from '../../../../pages/projeto/financeiro';

import Hotsite from '../../../../pages/projeto/hotsite/ficha';
import HotsiteEditar from '../../../../pages/projeto/hotsite/editar';
//import FinanceiroFicha from "../../../../pages/projeto/financeiro/ficha";

import DossieFicha from '../../../../pages/projeto/dossie/ficha';
import DossieConsulta from '../../../../pages/projeto/dossie/consulta';

const projetoPrivateRoutes = [
  /// CONSULTA
  {
    path: '/projeto/painel/consulta/:id',
    name: 'Projeto',
    component: ProjetoConsulta,
  },
  /// CONSULTA RSVP
  {
    path: '/projeto/painel/consulta/:id/listaRSVP',
    name: 'Projeto',
    component: ProjetoConsultaRSVP,
  },

  /// CONSULTA CONTRATANTE
  {
    path: '/projeto/painel/consulta/:id/listaContratante',
    name: 'Projeto',
    component: ProjetoConsultaContratante,
  },

  /// CONSULTA PARTICIPANTES
  {
    path: '/projeto/painel/consulta/:id/listaParticipantes',
    name: 'Projeto',
    component: ProjetoConsultaParticipantes,
  },

  /// CONSULTA OCORRENCIAS
  {
    path: '/projeto/painel/consulta/:id/listaOcorrencias',
    name: 'Projeto',
    component: ProjetoConsultaOcorrencias,
  },

  /// CONSULTA MOVIMENTOS
  {
    path: '/projeto/painel/consulta/:id/listaMovimentos',
    name: 'Projeto',
    component: ProjetoConsultaMovimentos,
  },

  /// CONSULTA SERVICOS
  {
    path: '/projeto/painel/consulta/:id/listaServicos',
    name: 'Projeto',
    component: ProjetoConsultaServicos,
  },
  /// CONSULTA O SERVICO
  {
    path: '/projeto/painel/:id/servico/consulta/:idServico',
    name: 'Projeto',
    component: ProjetoConsultaServico,
  },

  /// FICHA
  {
    path: '/projeto/painel/:id/ficha',
    name: 'Projeto',
    component: ProjetoFicha,
  },

  /// ANEXOS DO PROJETO
  {
    path: '/projeto/painel/ficha/:id/anexo',
    name: 'Projeto',
    component: ProjetoAnexoPagina,
  },
  {
    path: '/projeto/painel/ficha/:id/anexo/ficha',
    name: 'Projeto',
    component: ProjetoAnexoFicha,
  },
  {
    path: '/projeto/painel/ficha/:id/anexo/ficha/:idAnexo',
    name: 'Projeto',
    component: ProjetoAnexoFicha,
  },
  {
    path: '/projeto/painel/ficha/:id/anexo/consulta/:idAnexo',
    name: 'Projeto',
    component: ProjetoAnexoConsulta,
  },
  /// ORÇAMENTO

  /// RSVP
  {
    path: '/projeto/painel/:id/RSVP',
    name: 'RSVP',
    component: RSVPPagina,
  },
  {
    path: '/projeto/painel/:id/RSVP/ficha/:idRSVP',
    name: 'RSVP',
    component: RSVPFicha,
  },
  {
    path: '/projeto/painel/:id/RSVP/comparar/:idRSVP',
    name: 'RSVP',
    component: RSVPComparar,
  },
  ///  CONTRATANTE

  {
    path: '/projeto/painel/:id/contratante',
    name: 'Contratante',
    component: ContratantePagina,
  },
  {
    path: '/projeto/painel/:id/contratante/ficha/:idContratante',
    name: 'Contratante',
    component: ContratanteFicha,
  },

  /// PARTICIPANTES
  //{
  //path: "/projeto/painel/:id/financeiro",
  //name: "Participantes",
  //component: FinanceiroPagina
  //},
  {
    path: '/projeto/painel/:id/participantes',
    name: 'Participantes',
    component: ParticipantesPagina,
  },
  {
    path: '/projeto/painel/:id/participantes/ficha/:idParticipante',
    name: 'Participantes',
    component: ParticipantesFicha,
  },
  /// SERVIÇOS
  {
    path: '/projeto/painel/:id/servicos',
    name: 'Serviço',
    component: ServicosPagina,
  },
  {
    path: '/projeto/painel/:id/servicos/ficha/:idServico',
    name: 'Serviço',
    component: ServicosFicha,
  },
  {
    path: '/projeto/painel/:id/servicos/ficha/:idServico/anexo',
    name: 'Serviço',
    component: ServicoAnexoPagina,
  },
  {
    path: '/projeto/painel/:id/servicos/ficha/:idServico/anexo/ficha',
    name: 'Serviço',
    component: ServicoAnexoFicha,
  },
  {
    path: '/projeto/painel/:id/servicos/ficha/:idServico/anexo/ficha/:idAnexo',
    name: 'Serviço',
    component: ServicoAnexoFicha,
  },
  {
    path: '/projeto/painel/:id/servicos/ficha/:idServico/anexo/consulta/:idAnexo',
    name: 'Serviço',
    component: ServicoAnexoConsulta,
  },
  /*
  {
    path: '/projeto/painel/:id/servicos/consulta/:idServico',
    name: 'Serviço',
    component: ServicosConsulta,
  },
  */
  /// TEMPOS E MOVIMENTOS

  /// OCORRENCIAS
  {
    path: '/projeto/painel/:id/ocorrencias',
    name: 'Ocorrências',
    component: OcorrenciaPagina,
  },
  {
    path: '/projeto/painel/:id/ocorrencias/ficha/:idOcorrencia',
    name: 'Ocorrências',
    component: OcorrenciaFicha,
  },
  //{
  //path: "/projeto/painel/:id/ocorrencias/consulta/:idOcorrencia",
  //name: "Ocorrências",
  //component: OcorrenciaConsulta
  //},
  /// ROOMING LIST
  {
    path: '/projeto/painel/:id/rooming-list',
    name: 'Rooming List',
    component: RoomingListPagina,
  },
  {
    path: '/projeto/painel/:id/rooming-list/ficha/:idRoomingList',
    name: 'Rooming List',
    component: RoomingListFicha,
  },
  /*
   {
      path: "/projeto/painel/:id/rooming-list/consulta/:idRoomingList",
      name: "Rooming List",
      component: RoomingListConsulta
   },
   */
  {
    path: '/projeto/painel/:id/tempos-movimentos',
    name: 'Tempos Movimentos',
    component: TMpagina,
  },
  {
    path: '/projeto/painel/:id/tempos-movimentos/ficha/:idTempoMov',
    name: 'Tempos Movimentos',
    component: TMficha,
  },
  {
    path: '/projeto/painel/:id/tempos-movimentos/ficha/:idTempoMov/anexo',
    name: 'Tempos Movimentos',
    component: TManexoPagina,
  },
  {
    path: '/projeto/painel/:id/tempos-movimentos/ficha/:idTempoMov/anexo/ficha',
    name: 'Tempos Movimentos',
    component: TManexoFicha,
  },
  {
    path: '/projeto/painel/:id/tempos-movimentos/ficha/:idTempoMov/anexo/ficha/:idTempoMovAnexo',
    name: 'Tempos Movimentos',
    component: TManexoFicha,
  },
  {
    path: '/projeto/painel/:id/tempos-movimentos/ficha/:idTempoMov/anexo/consulta/:idTempoMovAnexo',
    name: 'Tempos Movimentos',
    component: TManexoConsulta,
  },
  /// ORCAMENTO
  {
    path: '/projeto/painel/:id/orcamento',
    name: 'Orcamento',
    component: OrcamentoPagina,
  },
  {
    path: '/projeto/painel/:id/orcamento/ficha/:idOrcamento',
    name: 'Orcamento',
    component: OrcamentoFicha,
  },
  {
    path: '/projeto/painel/:id/orcamento/ficha/:idOrcamento/servico',
    name: 'Orcamento',
    component: OrcamentoServicoPagina,
  },
  {
    path: '/projeto/painel/:id/orcamento/ficha/:idOrcamento/servico/ficha/:idServico',
    name: 'Orcamento',
    component: OrcamentoServicoFicha,
  },
  /// FINANCEIRO
  {
    path: '/projeto/painel/:id/financeiro',
    name: 'Financeiro',
    component: FinanceiroPagina,
  },
  /// HOTSITE
  {
    path: '/projeto/painel/:id/hotsite/ficha',
    name: 'Hotsite',
    component: Hotsite,
  },
  {
    path: '/projeto/painel/:id/hotsite/editar',
    name: 'Hotsite',
    component: HotsiteEditar,
  },
  /// DOSSIE
  {
    path: '/projeto/painel/:id/dossie/ficha',
    name: 'Dossie',
    component: DossieFicha,
  },
  {
    path: '/projeto/painel/:id/dossie/consulta',
    name: 'Dossie',
    component: DossieConsulta,
  },
];

export default projetoPrivateRoutes;
