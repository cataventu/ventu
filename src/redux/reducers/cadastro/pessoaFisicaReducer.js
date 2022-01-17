import * as initial from '../../initials/cadastro/pfisica';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false,
  fornecedorFlag: false,

  indexPagination: 0,

  ///DASHBOARD
  dashboardListaData: initial.dashboardListaData,

  ///PAGINA
  tableData: initial.tableData,
  pessoalFichaData: initial.pessoalFichaData,

  /// FICHA PERFIL
  perfilListaData: initial.perfilListaData,
  perfilResumeData: initial.perfilResumeData,

  /// FICHA DADOS PESSOAIS
  fotoFichaData: initial.fotoFichaData,
  fotoFichaFlag: false,

  /// FICHA COMERCIAIS
  comercialFichaData: initial.comercialFichaData,

  /// FICHA RCONTATO
  rcontatoTableData: initial.rcontatoTableData,
  rcontatoFichaData: initial.rcontatoFichaData,

  /// FICHA RPASSAPORTE
  rpassaporteTableData: initial.rpassaporteTableData,
  rpassaporteFichaData: initial.rpassaporteFichaData,

  /// FICHA RVISTO
  rvistoTableData: initial.rvistoTableData,
  rvistoFichaData: initial.rvistoFichaData,

  /// FICHA RCARTAO
  rcartaoTableData: initial.rcartaoTableData,
  rcartaoFichaData: initial.rcartaoFichaData,
  tipocartaoListaData: initial.tipocartaoListaData,

  /// FICHA RENDERECO
  renderecoTableData: initial.renderecoTableData,
  renderecoFichaData: initial.renderecoFichaData,

  /// FICHA RSERVICO
  rservicoTableData: initial.rservicoTableData,
  rservicoFichaData: initial.rservicoFichaData,

  /// FICHA EMERGENCIA
  emergenciaFichaData: initial.emergenciaFichaData,

  /// FICHA FAMILIA
  familiaTableData: initial.familiaTableData,
  familiaFichaData: initial.familiaFichaData,

  /// FICHA OBSERVACAO
  observacaoFichaData: initial.observacaoFichaData,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@GET_PFISICA_PAGINA': return { ...state, tableData: actions.payload };
    case '@SET_INDEX_PAGINATION_PFISICA': return { ...state, indexPagination: actions.payload };

    ////// FILTRO
    case '@SET_PFISICA_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PFISICA_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PFISICA_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PFISICA_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };

    ////// FORNECEDOR FLAG
    case '@SET_PFISICA_FORNECEDOR_FALSE': return { ...state, fornecedorFlag: false };
    case '@SET_PFISICA_FORNECEDOR_TRUE': return { ...state, fornecedorFlag: true };

    ////// DASHBOARD
    case '@GET_PFISICA_DASHBOARD': return { ...state, dashboardListaData: actions.payload };

    ////// FICHA DADOS PESSOAIS
    case '@GET_PFISICA_PESSOAL_FICHA': return { ...state, pessoalFichaData: actions.payload };
    case '@SET_PFISICA_FOTO': return { ...state, fotoFichaData: actions.payload };
    case '@SET_PFISICA_FOTO_FLAG_TRUE': return { ...state, fotoFichaFlag: true };
    case '@SET_PFISICA_FOTO_FLAG_FALSE': return { ...state, fotoFichaFlag: false };

    ////// FICHA COMERCIAIS
    case '@GET_PFISICA_COMERCIAL_FICHA': return { ...state, comercialFichaData: actions.payload };

    //////  PERFIL
    case '@SET_PFISICA_PERFIL_LISTA': return { ...state, perfilListaData: actions.payload };
    case '@SET_PFISICA_PERFIL_RESUMO': return { ...state, perfilResumeData: actions.payload };

    ////// FICHA RCONTATO
    case '@GET_RCONTATO_PAGINA': return { ...state, rcontatoTableData: actions.payload };
    case '@GET_RCONTATO_FICHA': return { ...state, rcontatoFichaData: actions.payload };

    ////// FICHA RPASSAPORTE
    case '@GET_RPASSAPORTE_PAGINA': return { ...state, rpassaporteTableData: actions.payload };
    case '@GET_RPASSAPORTE_FICHA': return { ...state, rpassaporteFichaData: actions.payload };

    ////// FICHA RVISTO
    case '@GET_RVISTO_PAGINA': return { ...state, rvistoTableData: actions.payload };
    case '@GET_RVISTO_FICHA': return { ...state, rvistoFichaData: actions.payload };

    ////// FICHA RCARTAO
    case '@GET_RCARTAO_PAGINA': return { ...state, rcartaoTableData: actions.payload };
    case '@GET_RCARTAO_FICHA': return { ...state, rcartaoFichaData: actions.payload };
    case '@GET_TIPO_CARTAO': return { ...state, tipocartaoListaData: actions.payload };

    ////// FICHA RENDERECO
    case '@GET_RENDERECO_PAGINA': return { ...state, renderecoTableData: actions.payload };
    case '@GET_RENDERECO_FICHA': return { ...state, renderecoFichaData: actions.payload };

    ////// FICHA RSERVICO
    case '@GET_RSERVICO_PAGINA': return { ...state, rservicoTableData: actions.payload };
    case '@GET_RSERVICO_FICHA': return { ...state, rservicoFichaData: actions.payload };

      ////// FICHA EMERGENCIA
    case '@GET_PFISICA_EMERGENCIA_FICHA': return { ...state, emergenciaFichaData: actions.payload };

    ////// FICHA OBSERVACAO
    case '@GET_PFISICA_OBSERVACAO_FICHA': return { ...state, observacaoFichaData: actions.payload };

    ////// FICHA FAMILIA
    case '@GET_PFISICA_FAMILIA_PAGINA': return { ...state, familiaTableData: actions.payload };
    case '@GET_PFISICA_FAMILIA_FICHA': return { ...state, familiaFichaData: actions.payload };

      ////// RESET

    case '@RESET_PFISICA_FOTO': return { ...state, fotoFichaData: initial.fotoFichaData, fotoFichaFlag: false };
    case '@RESET_PFISICA_PESSOAL_FICHA': return { ...state, pessoalFichaData: initial.pessoalFichaData };
    case '@RESET_PFISICA_RCONTATO_FICHA': return { ...state, rcontatoFichaData: initial.rcontatoFichaData };
    case '@RESET_PFISICA_RPASSAPORTE_FICHA': return { ...state, rpassaporteFichaData: initial.rpassaporteFichaData };
    case '@RESET_PFISICA_RVISTO_FICHA': return { ...state, rvistoFichaData: initial.rvistoFichaData };
    case '@RESET_PFISICA_RCARTAO_FICHA': return { ...state, rcartaoFichaData: initial.rcartaoFichaData };
    case '@RESET_PFISICA_PERFIL_RESUMO': return { ...state, perfilResumeData: initial.perfilResumeData };
    case '@RESET_PFISICA_COMERCIAL_FICHA': return { ...state, comercialFichaData: initial.comercialFichaData };
    case '@RESET_PFISICA_EMERGENCIA_FICHA': return { ...state, emergenciaFichaData: initial.emergenciaFichaData };
    case '@RESET_PFISICA_RENDERECO_FICHA': return { ...state, renderecoFichaData: initial.renderecoFichaData };
    case '@RESET_PFISICA_RSERVICO_FICHA': return { ...state, rservicoFichaData: initial.rservicoFichaData };
    case '@RESET_PFISICA_FAMILIA_FICHA': return { ...state, familiaFichaData: initial.familiaFichaData };

    default: return state;
  }
}
