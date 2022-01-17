const initialState = {
  tableData: { id: 0, ocorrencia_regs: [] },
  fichaData: '',
  consulta: '',

  flagTableUpdate: false,
  flagDelete: false,

  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  flagFiltro: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@SET_OCORRENCIA_CONSULTA': return { ...state, consulta: actions.payload };

    ////// PAGINA
    case '@GET_OCORRENCIA_PAGINA': return { ...state, tableData: actions.payload };
    case '@RESET_OCORRENCIA_PAGINA': return { ...state, tableData: { id: 0, ocorrencia_regs: [] } };

    ////// FICHA
    case '@GET_OCORRENCIA_FICHA': return { ...state, fichaData: actions.payload };
    case '@RESET_OCORRENCIA_FICHA': return { ...state, fichaData: '' };

    ////// FLAG
    case '@SET_OCORRENCIA_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_OCORRENCIA_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_OCORRENCIA_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_OCORRENCIA_DELETE_FALSE': return { ...state, flagDelete: false };

    ////// FILTRO
    case '@SET_OCORRENCIA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_OCORRENCIA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_OCORRENCIA_FILTRO_FLAG_FALSE': return { ...state, flagFiltro: false };
    case '@SET_OCORRENCIA_FILTRO_FLAG_TRUE': return { ...state, flagFiltro: true };

    default: return state;
  }
}
