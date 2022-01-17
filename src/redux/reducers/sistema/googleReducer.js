import * as initial from '../../initials/sistema/google';

const initialState = {
  gmailClientID: initial.gmailClientID,
  gmailClientSecret: initial.gmailClientSecret,

  googleUserData: initial.googleUserData,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_GOOGLE_LOGIN_DATA': return { ...state, googleUserData: actions.payload };
    case '@RESET_GOOGLE_LOGIN_DATA': return { ...state, googleUserData: initial.googleUserData };

    default: return state;
  }
}
