import PFDashboardPagina from '../../../../pages/cadastro/pessoa-fisica/dashboard/pagina';

import PFAnexoPagina from '../../../../pages/cadastro/pessoa-fisica/anexo/pagina';
import PFAnexoFicha from '../../../../pages/cadastro/pessoa-fisica/anexo/ficha';
import PFAnexoConsulta from '../../../../pages/cadastro/pessoa-fisica/anexo/consulta';

////// consulta
import PFConsuta from '../../../../pages/cadastro/pessoa-fisica/consulta/consulta';
import PFConsultaListaRContato from '../../../../pages/cadastro/pessoa-fisica/consulta/listaRContato';
import PFConsultaListaREndereco from '../../../../pages/cadastro/pessoa-fisica/consulta/listaREndereco';
import PFConsultaListaRServico from '../../../../pages/cadastro/pessoa-fisica/consulta/listaRServico';
import PFConsultaListaPassaporte from '../../../../pages/cadastro/pessoa-fisica/consulta/listaPassaporte';
import PFConsultaListaVisto from '../../../../pages/cadastro/pessoa-fisica/consulta/listaVisto';
import PFConsultaListaCartao from '../../../../pages/cadastro/pessoa-fisica/consulta/listaCartao';
import PFConsultaListaPerfil from '../../../../pages/cadastro/pessoa-fisica/consulta/listaPerfil';
import PFConsultaListaOcorrencias from '../../../../pages/cadastro/pessoa-fisica/consulta/listaOcorrencias';

import PFfichaDadosPessoais from '../../../../pages/cadastro/pessoa-fisica/dados-pessoais/ficha';
import PFfichaDadosComerciais from '../../../../pages/cadastro/pessoa-fisica/dados-comerciais/ficha';

import PFfichaContatoPagina from '../../../../pages/cadastro/pessoa-fisica/contatos/pagina';
import PFfichaContatoFicha from '../../../../pages/cadastro/pessoa-fisica/contatos/ficha';

import PFfichaEnderecoPagina from '../../../../pages/cadastro/pessoa-fisica/enderecos/pagina';
import PFfichaEnderecoFicha from '../../../../pages/cadastro/pessoa-fisica/enderecos/ficha';

import PFfichaServicoPagina from '../../../../pages/cadastro/pessoa-fisica/servicos/pagina';
import PFfichaServicoFicha from '../../../../pages/cadastro/pessoa-fisica/servicos/ficha';

import PFfichaFamilia from '../../../../pages/cadastro/pessoa-fisica/familia/ficha';

import PFfichaEmergencia from '../../../../pages/cadastro/pessoa-fisica/emergencia/ficha';

import PFfichaPassaportePagina from '../../../../pages/cadastro/pessoa-fisica/passaportes/pagina';
import PFfichaPassaporteFicha from '../../../../pages/cadastro/pessoa-fisica/passaportes/ficha';

import PFfichaVistoPagina from '../../../../pages/cadastro/pessoa-fisica/vistos/pagina';
import PFfichaVistoFicha from '../../../../pages/cadastro/pessoa-fisica/vistos/ficha';

import PFfichaCartaoPagina from '../../../../pages/cadastro/pessoa-fisica/cartoes/pagina';
import PFfichaCartaoFicha from '../../../../pages/cadastro/pessoa-fisica/cartoes/ficha';

import PFfichaPerfil from '../../../../pages/cadastro/pessoa-fisica/perfil/ficha';

import PFOcorrenciaPagina from '../../../../pages/cadastro/pessoa-fisica/ocorrencias/pagina';
import PFOcorrenciaFicha from '../../../../pages/cadastro/pessoa-fisica/ocorrencias/ficha';

import PFfichaObservacao from '../../../../pages/cadastro/pessoa-fisica/observacao/ficha';

const pessoaFisicaPrivateRoutes = [
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/dados-pessoais',
    name: 'Pessoa F??sica',
    component: PFfichaDadosPessoais,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/dados-pessoais/projeto/:idProjeto/rsvp/:idRSVP',
    name: 'Pessoa F??sica',
    component: PFfichaDadosPessoais,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/dados-comerciais',
    name: 'Pessoa F??sica',
    component: PFfichaDadosComerciais,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/contato',
    name: 'Pessoa F??sica',
    component: PFfichaContatoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/contato/ficha',
    name: 'Pessoa F??sica',
    component: PFfichaContatoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/contato/ficha/:idRContato',
    name: 'Pessoa F??sica',
    component: PFfichaContatoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/passaporte',
    name: 'Passaporte',
    component: PFfichaPassaportePagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/passaporte/ficha',
    name: 'Passaporte',
    component: PFfichaPassaporteFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/passaporte/ficha/:idRPassaporte',
    name: 'Passaporte',
    component: PFfichaPassaporteFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/visto',
    name: 'Visto',
    component: PFfichaVistoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/visto/ficha',
    name: 'Visto',
    component: PFfichaVistoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/visto/ficha/:idRVisto',
    name: 'Visto',
    component: PFfichaVistoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/cartao',
    name: 'Cart??o',
    component: PFfichaCartaoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/cartao/ficha',
    name: 'Cart??o',
    component: PFfichaCartaoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/cartao/ficha/:idRCartao',
    name: 'Cart??o',
    component: PFfichaCartaoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/endereco',
    name: 'Pessoa F??sica',
    component: PFfichaEnderecoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/endereco/ficha',
    name: 'Pessoa F??sica',
    component: PFfichaEnderecoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/endereco/ficha/:idREndereco',
    name: 'Pessoa F??sica',
    component: PFfichaEnderecoFicha,
  },

  {
    path: '/cadastro/pessoa-fisica/ficha/:id/servico',
    name: 'Pessoa F??sica',
    component: PFfichaServicoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/servico/ficha',
    name: 'Pessoa F??sica',
    component: PFfichaServicoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/servico/ficha/:idRServico',
    name: 'Pessoa F??sica',
    component: PFfichaServicoFicha,
  },

  {
    path: '/cadastro/pessoa-fisica/dashboard',
    name: 'Pessoa F??sica',
    component: PFDashboardPagina,
  },

  {
    path: '/cadastro/pessoa-fisica/ficha/:id/anexo',
    name: 'Pessoa F??sica',
    component: PFAnexoPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/anexo/ficha',
    name: 'Pessoa F??sica',
    component: PFAnexoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/anexo/ficha/:idAnexo',
    name: 'Pessoa F??sica',
    component: PFAnexoFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/anexo/consulta/:idAnexo',
    name: 'Pessoa F??sica',
    component: PFAnexoConsulta,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/familia',
    name: 'Pessoa F??sica',
    component: PFfichaFamilia,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/emergencia',
    name: 'Pessoa F??sica',
    component: PFfichaEmergencia,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/perfil',
    name: 'Pessoa F??sica',
    component: PFfichaPerfil,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/ocorrencias',
    name: 'Pessoa Jur??dica',
    component: PFOcorrenciaPagina,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/ocorrencias/ficha',
    name: 'Pessoa Jur??dica',
    component: PFOcorrenciaFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/ocorrencias/ficha/:idOcorrencia',
    name: 'Pessoa Jur??dica',
    component: PFOcorrenciaFicha,
  },
  {
    path: '/cadastro/pessoa-fisica/ficha/:id/observacao',
    name: 'Pessoa F??sica',
    component: PFfichaObservacao,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id',
    name: 'Pessoa F??sica',
    component: PFConsuta,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaRContato',
    name: 'Pessoa F??sica - Lista Contato',
    component: PFConsultaListaRContato,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaREndereco',
    name: 'Pessoa F??sica - Lista Endere??o',
    component: PFConsultaListaREndereco,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaRServico',
    name: 'Pessoa F??sica - Lista Servi??o',
    component: PFConsultaListaRServico,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaPassaporte',
    name: 'Pessoa F??sica - Lista Passaporte',
    component: PFConsultaListaPassaporte,
  },

  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaVisto',
    name: 'Pessoa F??sica - Lista Visto',
    component: PFConsultaListaVisto,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaCartao',
    name: 'Pessoa F??sica - Lista Cart??o',
    component: PFConsultaListaCartao,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaPerfil',
    name: 'Pessoa F??sica - Lista Perfil',
    component: PFConsultaListaPerfil,
  },
  {
    path: '/cadastro/pessoa-fisica/consulta/:id/listaOcorrencias',
    name: 'Pessoa F??sica - Lista Ocorr??ncias',
    component: PFConsultaListaOcorrencias,
  },
];

export default pessoaFisicaPrivateRoutes;
