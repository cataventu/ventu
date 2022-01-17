import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, saveLogin, saveLoginInativo } from '../../functions/sistema/google';
import { showMSG, SaveButton, Login } from '../../components';
import { checkLocalStgLogin} from '../../functions/sistema';
import Logo from '../../assets/img/ventu/Cataventu_vertical.png';
import './style.css';
import LoginGoogleInativo from '../../components/LoginGoogleInativo';

///////// SIGN IN ///////////////
/////////////////////////////////
function SignIn(props) {
  const [firstLoad, setFirst] = useState(true);
  const [salvar, setSalvar] = useState(false);

  const [email, setEmail] = useState('');
  const [senha_email, set_senha_email] = useState('');
  
  const [form, setForm] = useState({});
  
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      const response = checkLocalStgLogin(props);
      if (response) { setTimeout(() => props.history.push('/sistema/bem-vindo'), 600); }
    }
  }, [props, firstLoad]);

  useEffect(() => {
    setForm({
      email,
      senha_email,
    });
  }, [email, senha_email]);

  return (
    <>
      <div><img src={Logo} className="logo-login" alt="Logo Ventu" /></div>
      <div className="card-login">
        <div className="text-right">
          <h1 className="text-roxo-ventu">Bem-Vindo!</h1>
          <p className="p-0 m-0 pl-4 text-roxo-ventu">Faça o login para continuar.</p>
        </div>
        <div className="text-right">

          {/* <p className="p-0 m-0 mt-5 h5 text-roxo-ventu">
            <FormGroup>
              <input
                type="checkbox"
                id="salvar-login"
                checked={salvar}
                onChange={(e) => setSalvar(e.target.checked)}
                className="mr-2"
              />
              <Label className="noselect" htmlFor="salvar-login">Salvar Login</Label>
            </FormGroup>
          </p>

          <GoogleLogin
            clientId={props.gmailClientID}
            buttonText="Login pelo google"
            onSuccess={(response) => signIn(response, props, salvar)}
            onFailure={() => showMSG('Error', 'Falha na comunicação. Tente novamente.', 'error', 3000)}
            isSignedIn={false}
            className="mt-3 bg-roxo-ventu text-light"
          /> */}

          <div className="card col-12 col-lg-12 login-card mt-4 mb-0 ">
          <p className="p-0 m-0 mt-3 h5 text-roxo-ventu">
            <FormGroup>
              <input
                type="checkbox"
                id="salvar-login"
                checked={salvar}
                onChange={(e) => setSalvar(e.target.checked)}
                className="mr-2"
              />
              <Label className="noselect" htmlFor="salvar-login">Salvar Login</Label>
            </FormGroup>
          </p>

          {/* <GoogleLogin
            clientId={props.gmailClientID}
            buttonText="Login pelo google"
            // onSuccess={(response) => signIn(response, props, salvar)}
            onSuccess={() => signIn()}
            onFailure={() => showMSG('Error', 'Login Temporariamente Indisponível.', 'error', 3000)}
            isSignedIn={false}
            className="mt-3 mb-5 bg-roxo-ventu text-light"
          />
          <a id="google-button" class="btn btn-block btn-social btn-google bg-roxo-ventu text-light">
            <i class="fa fa-google mt-4"></i> Login pelo google
          </a> */}
          <div className="p-0 m-0 mt-2 mb-2 h5 text-roxo-ventu text-right">
            <LoginGoogleInativo save={() => saveLoginInativo(props, form)} />
          </div>

          <p align="center">< hr /></p>
          <FormGroup>
                <div className="p-0 m-0 mt-2 h5 text-roxo-ventu text-left">
                <label>E-mail</label>
                <input type="email" 
                       className="form-control text-lowercase" 
                       id="email" 
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       maxLength={60}
                       placeholder="DIGITE SEU E-MAIL"
                />
              
                </div>
                <div className="p-0 m-0 mt-2 h5 text-roxo-ventu text-left">
                    <label>Senha</label>
                    <input type="password" 
                        className="form-control text-lowercase" 
                        id="senha_email" 
                        name="senha_email"
                        value={senha_email}
                        onChange={(e) => set_senha_email(e.target.value)}
                        maxLength={30}
                        placeholder="digite sua senha"
                    />
                </div>
                <div className="p-0 m-0 mt-2 mb-5 h5 text-roxo-ventu text-right">
                <Login save={() => saveLogin(props, form)} />
               
                </div>
                {/* <Link className="text-blue" to={`/auth/reset-password`}>
                <Label className="p-0 m-0 mt-0 h5 text-roxo-ventu text-left" htmlFor="redefinir-login">Redefinir senha</Label>
                </Link> */}
                </FormGroup>
               
        </div>

          <p className="p-0 m-0 mt-4 pl-4 text-roxo-ventu">
Versão
            {' '}
            {props.versao}
          </p>
        </div>
      </div>
      <div className="bg-login" />
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  loginUserData: state.login.loginUserData,  
  googleUserData: state.google.googleUserData,
  gmailClientID: state.google.gmailClientID,
  userID: state.usuario.userID,
  versao: state.sistema.versao,
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(SignIn);
