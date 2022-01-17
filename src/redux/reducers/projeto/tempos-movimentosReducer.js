const initialState = {
  flagDelete: false,

  fileAnexo: {
    titulo: '',
    tamanho: '',
    extensao: '',
    arquivo: '',
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_TEMPOMOV_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_TEMPOMOV_DELETE_FALSE': return { ...state, flagDelete: false };

    case '@SET_TEMPOMOV_ANEXO_FILE': return { ...state, fileAnexo: actions.payload };
    case '@RESET_TEMPOMOV_ANEXO_FILE': return {
      ...state,
      fileAnexo: {
        titulo: '', tamanho: '', extensao: '', arquivo: '',
      },
    };

    default: return state;
  }
}
