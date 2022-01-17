import ProfissaoFicha from '../../../../pages/tabelas/profissao/ficha';
import ProfissaoConsulta from '../../../../pages/tabelas/profissao/consulta';
import RamoAtividadeFicha from '../../../../pages/tabelas/ramoatividade/ficha';
import RamoAtividadeConsulta from '../../../../pages/tabelas/ramoatividade/consulta';
import PaisFicha from '../../../../pages/tabelas/pais/ficha';
import PaisConsulta from '../../../../pages/tabelas/pais/consulta';
import MunicipioFicha from '../../../../pages/tabelas/municipio/ficha';
import MunicipioConsulta from '../../../../pages/tabelas/municipio/consulta';
import PerfilFicha from '../../../../pages/tabelas/perfil/ficha';
import PerfilConsulta from '../../../../pages/tabelas/perfil/consulta';
import CartaoFicha from '../../../../pages/tabelas/tipo_cartao/ficha';
import CartaoConsulta from '../../../../pages/tabelas/tipo_cartao/consulta';
import ServicoFicha from '../../../../pages/tabelas/servico/ficha';
import ServicoConsulta from '../../../../pages/tabelas/servico/consulta';
import AeroportoFicha from '../../../../pages/tabelas/aeroporto/ficha';
import AeroportoConsulta from '../../../../pages/tabelas/aeroporto/consulta';

const tabelasPrivateRoutes = [
  {
    path: '/tabelas/aeroporto/ficha',
    name: 'Aeroporto',
    component: AeroportoFicha,
  },
  {
    path: '/tabelas/aeroporto/ficha/:id',
    name: 'Aeroporto',
    component: AeroportoFicha,
  },
  {
    path: '/tabelas/aeroporto/consulta/:id',
    name: 'Aeroporto',
    component: AeroportoConsulta,
  },

  {
    path: '/tabelas/municipio/ficha',
    name: 'Municipio',
    component: MunicipioFicha,
  },
  {
    path: '/tabelas/municipio/ficha/:id',
    name: 'Municipio',
    component: MunicipioFicha,
  },
  {
    path: '/tabelas/municipio/consulta/:id',
    name: 'Municipio',
    component: MunicipioConsulta,
  },

  {
    path: '/tabelas/pais/ficha',
    name: 'Pais',
    component: PaisFicha,
  },
  {
    path: '/tabelas/pais/ficha/:id',
    name: 'Pais',
    component: PaisFicha,
  },
  {
    path: '/tabelas/pais/consulta/:id',
    name: 'Pais',
    component: PaisConsulta,
  },

  {
    path: '/tabelas/perfil/ficha',
    name: 'Perfil',
    component: PerfilFicha,
  },
  {
    path: '/tabelas/perfil/ficha/:id',
    name: 'Perfil',
    component: PerfilFicha,
  },
  {
    path: '/tabelas/perfil/consulta/:id',
    name: 'Perfil',
    component: PerfilConsulta,
  },

  {
    path: '/tabelas/tipo-cartao/ficha',
    name: 'Cartão',
    component: CartaoFicha,
  },
  {
    path: '/tabelas/tipo-cartao/ficha/:id',
    name: 'Cartão',
    component: CartaoFicha,
  },
  {
    path: '/tabelas/tipo-cartao/consulta/:id',
    name: 'Cartão',
    component: CartaoConsulta,
  },

  {
    path: '/tabelas/profissao/ficha',
    name: 'Profissão',
    component: ProfissaoFicha,
  },
  {
    path: '/tabelas/profissao/ficha/:id',
    name: 'Profissão',
    component: ProfissaoFicha,
  },
  {
    path: '/tabelas/profissao/consulta/:id',
    name: 'Profissao',
    component: ProfissaoConsulta,
  },

  {
    path: '/tabelas/ramo-atividade/ficha',
    name: 'RamoAtividade',
    component: RamoAtividadeFicha,
  },
  {
    path: '/tabelas/ramo-atividade/ficha/:id',
    name: 'RamoAtividade',
    component: RamoAtividadeFicha,
  },
  {
    path: '/tabelas/ramo-atividade/consulta/:id',
    name: 'RamoAtividade',
    component: RamoAtividadeConsulta,
  },

  {
    path: '/tabelas/servico/ficha',
    name: 'Servico',
    component: ServicoFicha,
  },
  {
    path: '/tabelas/servico/ficha/:id',
    name: 'Servico',
    component: ServicoFicha,
  },
  {
    path: '/tabelas/servico/consulta/:id',
    name: 'Servico',
    component: ServicoConsulta,
  },
];

export default tabelasPrivateRoutes;
