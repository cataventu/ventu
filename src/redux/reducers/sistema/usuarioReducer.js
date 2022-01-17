import * as initial from '../../initials/sistema/usuario';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  userID: 0,
  tableData: initial.tableData,
  fichaData: initial.fichaData,
  filtroData: initial.filtroData,

  userModuloActiveTabFunctions: '',
  userLastLineSelect: '',
  userLastContainerSelect: '',

  visibilityModulo: initial.visibilityModulo,
  visibilityPageCadastro: initial.visibilityPageCadastro,
  visibilityPageTabelas: initial.visibilityPageTabelas,
  visibilityPageProjeto: initial.visibilityPageProjeto,
  visibilityPageFinanceiro: initial.visibilityPageFinanceiro,
  visibilityPageSistema: initial.visibilityPageSistema,
  visibilitySubPages: initial.visibilitySubPages,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@GET_USUARIO_PAGINA': return { ...state, tableData: actions.payload };
    ////// FICHA
    case '@GET_USUARIO_ID': return { ...state, userID: actions.payload };
    case '@GET_USUARIO_FICHA': return { ...state, fichaData: actions.payload };
    case '@SET_USUARIO_LAST_SELECT_LINE': return { ...state, userLastLineSelect: actions.payload };
    case '@SET_USUARIO_LAST_SELECT_CONTAINER': return { ...state, userLastContainerSelect: actions.payload };
    ////// FILTRO
    case '@SET_USUARIO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_USUARIO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_USUARIO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_USUARIO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    case '@NEW_USUARIO_FILTRO': return { ...state, filtroData: actions.payload };
    case '@RESET_USUARIO_FILTRO': return { ...state, filtroData: initial.filtroData, filtroAtivo: 0 };

    ////// RESET
    case '@RESET_USUARIO_FICHA': return { ...state, fichaData: initial.fichaData };
    ////// PERMISSIONS
    case '@SET_PERMISSION_MODULO': return { ...state, visibilityModulo: actions.payload };
    case '@SET_PERMISSION_PAGE_CADASTRO': return { ...state, visibilityPageCadastro: actions.payload };
    case '@SET_PERMISSION_PAGE_TABELAS': return { ...state, visibilityPageTabelas: actions.payload };
    case '@SET_PERMISSION_PAGE_PROJETO': return { ...state, visibilityPageProjeto: actions.payload };
    case '@SET_PERMISSION_PAGE_FINANCEIRO': return { ...state, visibilityPageFinanceiro: actions.payload };
    case '@SET_PERMISSION_PAGE_SISTEMA': return { ...state, visibilityPageSistema: actions.payload };
    case '@SET_PERMISSION_SUBPAGES': return { ...state, visibilitySubPages: actions.payload };
    default: return state;
  }
}
