import * as initial from '../../initials/sistema/login';

const initialState = {
  loginUserData: initial.loginUserData,
  alterarSenhaFichaData: initial.alterarSenhaFichaData,
 
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@GET_LOGIN_DATA': return { ...state, loginUserData: actions.payload };
    // case '@RESET_LOGIN_DATA': return { ...state, loginUserData: initial.loginUserData };
    case '@GET_RESET_LOGIN': return { ...state, alterarSenhaFichaData: actions.payload };
    default: return state;
  }
}
