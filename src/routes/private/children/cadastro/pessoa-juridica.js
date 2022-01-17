import PJConsuta from '../../../../pages/cadastro/pessoa-juridica/consulta/consulta';
import PJDashboardPagina from '../../../../pages/cadastro/pessoa-juridica/dashboard/pagina';


/// SUBCONSULTAS DO PROJETO (LISTAS)
import PJConsultaListaRServico from '../../../../pages/cadastro/pessoa-juridica/consulta/listaRServico';
import PJConsultaListaREndereco from '../../../../pages/cadastro/pessoa-juridica/consulta/listaREndereco';
import PJConsultaListaRContato from '../../../../pages/cadastro/pessoa-juridica/consulta/listaRContato';
import PJConsultaListaOcorrencias from '../../../../pages/cadastro/pessoa-juridica/consulta/listaOcorrencias';

import PJfichaDadosComerciais from '../../../../pages/cadastro/pessoa-juridica/dados-comerciais/ficha';

import PJfichaServicoPagina from '../../../../pages/cadastro/pessoa-juridica/servicos/pagina';
import PJfichaServicoFicha from '../../../../pages/cadastro/pessoa-juridica/servicos/ficha';

import PJfichaContatoPagina from '../../../../pages/cadastro/pessoa-juridica/contatos/pagina';
import PJfichaContatoFicha from '../../../../pages/cadastro/pessoa-juridica/contatos/ficha';

import PJfichaEnderecoPagina from '../../../../pages/cadastro/pessoa-juridica/enderecos/pagina';
import PJfichaEnderecoFicha from '../../../../pages/cadastro/pessoa-juridica/enderecos/ficha';

import PJOcorrenciaPagina from '../../../../pages/cadastro/pessoa-juridica/ocorrencias/pagina';
import PJOcorrenciaFicha from '../../../../pages/cadastro/pessoa-juridica/ocorrencias/ficha';

import PJfichaObservacao from '../../../../pages/cadastro/pessoa-juridica/observacao/ficha';

import PJAnexoPagina from '../../../../pages/cadastro/pessoa-juridica/anexo/pagina';
import PJAnexoFicha from '../../../../pages/cadastro/pessoa-juridica/anexo/ficha';
import PJAnexoConsulta from '../../../../pages/cadastro/pessoa-juridica/anexo/consulta';

const pessoaJuridicaPrivateRoutes = [
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/dados-comerciais',
    name: 'Pessoa Jurídica',
    component: PJfichaDadosComerciais,
  },

  {
    path: '/cadastro/pessoa-juridica/dashboard',
    name: 'Pessoa Jurídica',
    component: PJDashboardPagina,
  },

  {
    path: '/cadastro/pessoa-juridica/ficha/:id/servico',
    name: 'Pessoa Jurídica',
    component: PJfichaServicoPagina,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/servico/ficha',
    name: 'Pessoa Jurídica',
    component: PJfichaServicoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/servico/ficha/:idRServico',
    name: 'Pessoa Jurídica',
    component: PJfichaServicoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/contato',
    name: 'Pessoa Jurídica',
    component: PJfichaContatoPagina,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/contato/ficha',
    name: 'Pessoa Jurídica',
    component: PJfichaContatoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/contato/ficha/:idRContato',
    name: 'Pessoa Jurídica',
    component: PJfichaContatoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/endereco',
    name: 'Pessoa Jurídica',
    component: PJfichaEnderecoPagina,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/endereco/ficha',
    name: 'Pessoa Jurídica',
    component: PJfichaEnderecoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/endereco/ficha/:idREndereco',
    name: 'Pessoa Jurídica',
    component: PJfichaEnderecoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/ocorrencias',
    name: 'Pessoa Jurídica',
    component: PJOcorrenciaPagina,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/ocorrencias/ficha',
    name: 'Pessoa Jurídica',
    component: PJOcorrenciaFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/ocorrencias/ficha/:idOcorrencia',
    name: 'Pessoa Jurídica',
    component: PJOcorrenciaFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/observacao',
    name: 'Pessoa Jurídica',
    component: PJfichaObservacao,
  },
  {
    path: '/cadastro/pessoa-juridica/consulta/:id',
    name: 'Pessoa Jurídica',
    component: PJConsuta,
  },
  {
    path: '/cadastro/pessoa-juridica/consulta/:id/listaRServico',
    name: 'Pessoa Jurídica - Lista Serviço',
    component: PJConsultaListaRServico,
  },

  {
    path: '/cadastro/pessoa-juridica/consulta/:id/listaREndereco',
    name: 'Pessoa Jurídica - Lista Endereço',
    component: PJConsultaListaREndereco,
  },
  {
    path: '/cadastro/pessoa-juridica/consulta/:id/listaRContato',
    name: 'Pessoa Jurídica - Lista Contato',
    component: PJConsultaListaRContato,
  },
  {
    path: '/cadastro/pessoa-juridica/consulta/:id/listaOcorrencias',
    name: 'Pessoa Jurídica - Lista Ocorrências',
    component: PJConsultaListaOcorrencias,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/anexo',
    name: 'Pessoa Jurídica',
    component: PJAnexoPagina,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/anexo/ficha',
    name: 'Pessoa Jurídica',
    component: PJAnexoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/anexo/ficha/:idAnexo',
    name: 'Pessoa Jurídica',
    component: PJAnexoFicha,
  },
  {
    path: '/cadastro/pessoa-juridica/ficha/:id/anexo/consulta/:idAnexo',
    name: 'Pessoa Jurídica',
    component: PJAnexoConsulta,
  },
];

export default pessoaJuridicaPrivateRoutes;
