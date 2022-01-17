import { combineReducers } from 'redux';

////// SISTEMA
import { reducer as toastr } from 'react-redux-toastr';
import sidebar from './sistema/sidebarReducers';
import layout from './sistema/layoutReducer';
import theme from './sistema/themeReducer';
import sistema from './sistema/sistemaReducer';
import loading from './sistema/loadingReducer';
import usuario from './sistema/usuarioReducer';
import google from './sistema/googleReducer';
import login from './sistema/loginReducer';
import autoCompletar from './sistema/autocompletarReducer';
import parametros from './sistema/parametrosReducer';
import buttonSwitch from './sistema/buttonSwitchReducer';
import painelTotaisOrcamento from './sistema/painelTotaisOrcamentoReducer';

////// ANEXO
import anexo from './anexo/anexoReducer';
import wizard from './wizard/wizardRedurer';

////// CADASTRO
import pFisica from './cadastro/pessoaFisicaReducer';
import pJuridica from './cadastro/pessoaJuridicaReducer';

////// PROJETO
import projeto from './projeto/projetoReducer';
import contratante from './projeto/contratanteReducer';
import participantes from './projeto/participantesReducer';
import rsvp from './projeto/rsvpReducer';
import servicos from './projeto/servicoReducer';
import ocorrencia from './projeto/ocorrenciaReducer';
import roomingList from './projeto/roomingListReducer';
import temposMovimentos from './projeto/tempos-movimentosReducer';
import orcamento from './projeto/orcamentoReducer';
import dossie from './projeto/dossieReducer';

////// HOTSITE
import hotsite_participante from './hotsite/participanteReducer';

////// TABELAS
import profissao from './tabelas/profissaoReducer';
import ramoatividade from './tabelas/ramoatividadeReducer';
import municipio from './tabelas/municipioReducer';
import pais from './tabelas/paisReducer';
import perfil from './tabelas/perfilReducer';
import cartao from './tabelas/cartaoReducer';
import servico from './tabelas/servicoReducer';
import aeroporto from './tabelas/aeroportoReducer';

////// FINANCEIRO
import conta from './financeiro/contaReducer';
import grupo from './financeiro/grupoReducer';
import subgrupo from './financeiro/subgrupoReducer';
import moeda from './financeiro/moedaReducer';
import cambio from './financeiro/cambioReducer';
import cartaocorp from './financeiro/cartaoCorpReducer';
import movimento from './financeiro/movimentoReducer';
import fluxocaixa from './financeiro/relatorios/fluxocaixaReducer';
import contato from './financeiro/relatorios/contatoReducer';
import dre from './financeiro/relatorios/dreReducer';
import dremov from './financeiro/relatorios/dremovReducer';
import transacao from './financeiro/relatorios/transacaoReducer';
import fixo from './financeiro/fixoReducer';

export default combineReducers({
  sidebar,
  layout,
  theme,
  sistema,
  loading,
  usuario,
  google,
  login,
  buttonSwitch,
  painelTotaisOrcamento,

  anexo,
  wizard,

  pFisica,
  pJuridica,

  projeto,
  contratante,
  participantes,
  rsvp,
  ocorrencia,
  servicos,
  roomingList,
  temposMovimentos,
  orcamento,
  dossie,

  hotsite_participante,

  profissao,
  ramoatividade,
  grupo,
  subgrupo,
  conta,
  cartaocorp,
  perfil,
  cartao,
  municipio,
  pais,
  servico,
  aeroporto,
  moeda,
  cambio,
  movimento,
  fluxocaixa,
  contato,
  dre,
  dremov,
  transacao,
  fixo,

  autoCompletar,
  parametros,

  toastr,
});
