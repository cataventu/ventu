import axios from 'axios';

const mailApi = axios.create({
  baseURL: 'http://localhost:9000',
});

export default mailApi;
