import { MapPin } from 'react-feather';
import Painel from '../../pages/projeto/painel';

////////////////////////////////
////// PROJETO /////////////////
const projetoRoutesPath = '/projeto/painel';
const projetoRoutes = {
  path: projetoRoutesPath,
  name: 'Projeto',
  icon: MapPin,
  containsHome: false,
  component: Painel,
};

export default projetoRoutes;
