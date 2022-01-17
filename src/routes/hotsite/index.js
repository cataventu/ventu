import hotsiteError from '../../pages/hotsite/error';

import hotsitePar_login from '../../pages/hotsite/cliente/login';
import hotsitePar_rsvp from '../../pages/hotsite/cliente/rsvp';

import hotsitePar_nacionalidade from '../../pages/hotsite/participante/login';
import hotsitePar_dadosPessoais from '../../pages/hotsite/participante/dadosPessoais';
import hotsitePar_dadosComerciais from '../../pages/hotsite/participante/dadosComerciais';
import hotsitePar_contatos from '../../pages/hotsite/participante/contato';
import hotsitePar_enderecos from '../../pages/hotsite/participante/endereco';
import hotsitePar_emergencia from '../../pages/hotsite/participante/emergencia';
import hotsitePar_passaporte from '../../pages/hotsite/participante/passaporte';
import hotsitePar_perfil from '../../pages/hotsite/participante/perfil';
import hotsitePar_anexo from '../../pages/hotsite/participante/anexo';
import hotsitePar_salvar from '../../pages/hotsite/participante/salvar';
import hotsitePar_fim from '../../pages/hotsite/participante/fim';

export const contratanteRoutes = [
  {
    path: '/hotsite/contratante/login/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_login,
    children: null,
  },
  {
    path: '/hotsite/contratante/error',
    name: 'Hotsite',
    component: hotsiteError,
    children: null,
  },
  {
    path: '/hotsite/contratante/rsvp/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_rsvp,
    children: null,
  },
];

export const participanteRoutes = [
  {
    path: '/hotsite/participante/login/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_nacionalidade,
    children: null,
  },
  {
    path: '/hotsite/participante/error',
    name: 'Hotsite',
    component: hotsiteError,
    children: null,
  },
  {
    path: '/hotsite/participante/nacionalidade/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_nacionalidade,
    children: null,
  },
  {
    path: '/hotsite/participante/dados-pessoais/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_dadosPessoais,
    children: null,
  },
  {
    path: '/hotsite/participante/dados-comerciais/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_dadosComerciais,
    children: null,
  },
  {
    path: '/hotsite/participante/contatos/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_contatos,
    children: null,
  },
  {
    path: '/hotsite/participante/enderecos/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_enderecos,
    children: null,
  },
  {
    path: '/hotsite/participante/emergencia/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_emergencia,
    children: null,
  },
  {
    path: '/hotsite/participante/passaportes/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_passaporte,
    children: null,
  },
  {
    path: '/hotsite/participante/perfil/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_perfil,
    children: null,
  },
  {
    path: '/hotsite/participante/anexos/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_anexo,
    children: null,
  },
  {
    path: '/hotsite/participante/salvar/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_salvar,
    children: null,
  },
  {
    path: '/hotsite/participante/fim/:id_projeto/:id_hash',
    name: 'Hotsite',
    component: hotsitePar_fim,
    children: null,
  },
];
