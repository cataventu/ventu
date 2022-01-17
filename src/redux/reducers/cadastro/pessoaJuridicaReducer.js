import * as initial from '../../initials/cadastro/pjuridica';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()
  fornecedorFlag: false,

  ///DASHBOARD
  dashboardListaData: initial.dashboardListaData,

  ///PAGINA
  tableData: initial.tableData,

  /// FICHA DADOS COMERCIAIS
  comercialFichaData: initial.comercialFichaData,

  /// FICHA RSERVICO
  rservicoTableData: initial.rservicoTableData,
  rservicoFichaData: initial.rservicoFichaData,

  /// FICHA RENDERECO
  renderecoTableData: initial.renderecoTableData,
  renderecoFichaData: initial.renderecoFichaData,

  /// FICHA RCONTATO
  rcontatoTableData: initial.rcontatoTableData,
  rcontatoFichaData: initial.rcontatoFichaData,

  /// FICHA OBSERVACAO
  observacaoFichaData: initial.observacaoFichaData,

  /// CONSULTA DADOS COMERCIAIS
  consultaDadosComerciais: initial.consultaDadosComerciais,

  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@GET_PJURIDICA_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_PJURIDICA': return { ...state, indexPagination: actions.payload };

      ////// FILTRO

    case '@SET_PJURIDICA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PJURIDICA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PJURIDICA_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PJURIDICA_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    ////// DASHBOARD
    case '@GET_PJURIDICA_DASHBOARD': return { ...state, dashboardListaData: actions.payload };

    ////// FICHA COMERCIAIS
    case '@GET_PJURIDICA_COMERCIAL_FICHA': return { ...state, comercialFichaData: actions.payload };

      ////// FICHA RSERVICO
    case '@GET_RSERVICO_PAGINA': return { ...state, rservicoTableData: actions.payload };
    case '@GET_RSERVICO_FICHA': return { ...state, rservicoFichaData: actions.payload };

    ////// FICHA RENDERECO
    case '@GET_RENDERECO_PAGINA': return { ...state, renderecoTableData: actions.payload };
    case '@GET_RENDERECO_FICHA': return { ...state, renderecoFichaData: actions.payload };

    ////// FICHA RCONTATO
    case '@GET_RCONTATO_PAGINA': return { ...state, rcontatoTableData: actions.payload };
    case '@GET_RCONTATO_FICHA': return { ...state, rcontatoFichaData: actions.payload };

    ////// FICHA OBSERVACAO
    case '@GET_PJURIDICA_OBSERVACAO_FICHA': return { ...state, observacaoFichaData: actions.payload };

    ////// FORNECEDOR FLAG
    case '@SET_PJURIDICA_FORNECEDOR_FALSE': return { ...state, fornecedorFlag: false };
    case '@SET_PJURIDICA_FORNECEDOR_TRUE': return { ...state, fornecedorFlag: true };

    ////// RESET
    case '@RESET_PJURIDICA_COMERCIAL_FICHA': return { ...state, comercialFichaData: initial.comercialFichaData };
    case '@RESET_PJURIDICA_RENDERECO_FICHA': return { ...state, renderecoFichaData: initial.renderecoFichaData };
    case '@RESET_PJURIDICA_RCONTATO_FICHA': return { ...state, rcontatoFichaData: initial.rcontatoFichaData };
    case '@RESET_PJURIDICA_RSERVICO_FICHA': return { ...state, rservicoFichaData: initial.rservicoFichaData };

    ////// CONSULTA
    case '@SET_CONSULTA_DADOSCOMERCIAIS': return { ...state, consultaDadosComerciais: actions.payload };

    default: return state;
  }
}
