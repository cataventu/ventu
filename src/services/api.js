import axios from 'axios';
import { WS_ATIVO } from '../redux/initials/sistema';

const api = axios.create({
  baseURL: WS_ATIVO,
});

export default api;
