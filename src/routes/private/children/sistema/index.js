import BemVindo from '../../../../pages/sistema/bemVindo';

import UsuarioFicha from '../../../../pages/sistema/usuario/ficha';
import UsuarioReplicar from '../../../../pages/sistema/usuario/replicar';

import OcorrenciasFicha from '../../../../pages/sistema/ocorrencias/ficha';
import OcorrenciasConsulta from '../../../../pages/sistema/ocorrencias/consulta';

import FixoFicha from '../../../../pages/sistema/parametros/fixo';

import ConsolidadorFicha from '../../../../pages/sistema/parametros/consolidador';

import GrupoPagina from '../../../../pages/sistema/parametros/grupo/pagina';
import GrupoFicha from '../../../../pages/sistema/parametros/grupo/ficha';
import GrupoConsulta from '../../../../pages/sistema/parametros/grupo/consulta';

import CategoriaPagina from '../../../../pages/sistema/parametros/categoria/pagina';
import CategoriaFicha from '../../../../pages/sistema/parametros/categoria/ficha';

import AlterarSenha from '../../../../pages/sistema/alterarSenha/ficha';

const sistemaPrivateRoutes = [

  {
    path: '/sistema/bem-vindo',
    name: 'Bem Vindo',
    component: BemVindo,
  },
  {
    path: '/sistema/usuario/replicar',
    name: 'Usuários',
    component: UsuarioReplicar,
  },
  {
    path: '/sistema/usuario/ficha',
    name: 'Usuários',
    component: UsuarioFicha,
  },
  {
    path: '/sistema/usuario/ficha/:id',
    name: 'Usuários',
    component: UsuarioFicha,
  },
  {
    path: '/sistema/ocorrencia/ficha/:id',
    name: 'Ocorrências',
    component: OcorrenciasFicha,
  },
  {
    path: '/sistema/ocorrencia/consulta/:id',
    name: 'Ocorrências',
    component: OcorrenciasConsulta,
  },
  {
    path: '/sistema/parametros/fixo/',
    name: 'Fixo',
    component: FixoFicha,
  },
  {
    path: '/sistema/parametros/consolidador/',
    name: 'Consolidador',
    component: ConsolidadorFicha,
  },
  {
    path: '/sistema/parametros/grupo',
    name: 'Grupo',
    component: GrupoPagina,
  },
  {
    path: '/sistema/parametros/grupo/ficha',
    name: 'Grupo',
    component: GrupoFicha,
  },
  {
    path: '/sistema/parametros/grupo/ficha/:id',
    name: 'Grupo',
    component: GrupoFicha,
  },
  {
    path: '/sistema/parametros/grupo/consulta/:id',
    name: 'Grupo',
    component: GrupoConsulta,
  },
  {
    path: '/sistema/parametros/categoria',
    name: 'Categoria',
    component: CategoriaPagina,
  },
  {
    path: '/sistema/parametros/categoria/ficha',
    name: 'Categoria',
    component: CategoriaFicha,
  },
  {
    path: '/sistema/parametros/categoria/ficha/:id',
    name: 'Categoria',
    component: CategoriaFicha,
  },
  {
    path: '/sistema/alterarSenha/ficha',
    name: 'Alterar Senha',
    component: AlterarSenha,
  },
];

export default sistemaPrivateRoutes;
