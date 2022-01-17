import store from '../../../../redux/store/index';
import { showMSG } from '../../../../components';
import * as sistema from '../..';
 
 const saveLoginInativo = async (props, dadosForm, salvar) => {

  const email = '';
  const senha_email = '';
  const logon_google = true;

    
  if (email === '' || senha_email === ''){
    ////// Notificação erro //////
    
    showMSG('Login Google', 'Login Temporariamente indisponível', 'error', 2500);
  } else{
    showMSG('Login Google', 'Login Temporariamente indisponível', 'error', 2500);

  }        

};

export default saveLoginInativo;