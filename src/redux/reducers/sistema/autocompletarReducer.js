const initial = undefined;

const initialState = {
  autoCompletarEnter: false,
  autoCompletarCursor: 0,
  autoCompletarScroll: 0,
  autoCompletarVazio: initial,

  autoCompletarSolicitante: initial,
  autoCompletarId_Solicitante: 0,
  autoCompletarSolicitanteEnter: false,
  autoCompletarSolicitanteCursor: 0,
  autoCompletarSolicitanteScroll: 0,

  autoCompletarId_Grupo: 0,
  autoCompletarGrupo: initial,
  autoCompletarGrupoEnter: false,
  autoCompletarGrupoCursor: 0,
  autoCompletarGrupoScroll: 0,

  autoCompletarId_Municipio: 0,
  autoCompletarMunicipio: initial,
  autoCompletarMunicipioEnter: false,
  autoCompletarMunicipioCursor: 0,
  autoCompletarMunicipioScroll: 0,

  autoCompletarId_RES_Municipio: 0,
  autoCompletarRES_Municipio: initial,
  autoCompletarRES_MunicipioEnter: false,
  autoCompletarRES_MunicipioCursor: 0,
  autoCompletarRES_MunicipioScroll: 0,

  autoCompletarId_COM_Municipio: 0,
  autoCompletarCOM_Municipio: initial,
  autoCompletarCOM_MunicipioEnter: false,
  autoCompletarCOM_MunicipioCursor: 0,
  autoCompletarCOM_MunicipioScroll: 0,

  autoCompletarAcompanhante: initial,
  autoCompletarId_Acompanhante: 0,
  autoCompletarAcompanhanteEnter: false,
  autoCompletarAcompanhanteCursor: 0,
  autoCompletarAcompanhanteScroll: 0,

  autoCompletarId_Pais: 0,
  autoCompletarPais: initial,
  autoCompletarPaisEnter: false,
  autoCompletarPaisCursor: 0,
  autoCompletarPaisScroll: 0,

  autoCompletarId_PaisEmissao: 0,
  autoCompletarPaisEmissao: initial,
  autoCompletarPaisEmissaoEnter: false,
  autoCompletarPaisEmissaoCursor: 0,
  autoCompletarPaisEmissaoScroll: 0,

  autoCompletarId_Moeda: 0,
  autoCompletarMoeda: initial,
  autoCompletarMoedaEnter: false,
  autoCompletarMoedaCursor: 0,
  autoCompletarMoedaScroll: 0,

  autoCompletarId_SubGrupo: 0,
  autoCompletarSubGrupo: initial,
  autoCompletarSubGrupoEnter: false,
  autoCompletarSubGrupoCursor: 0,
  autoCompletarSubGrupoScroll: 0,

  autoCompletarId_Profissao: 0,
  autoCompletarProfissao: initial,
  autoCompletarProfissaoEnter: false,
  autoCompletarProfissaoCursor: 0,
  autoCompletarProfissaoScroll: 0,

  autoCompletarId_Pfisica: 0,
  autoCompletarPfisica: initial,
  autoCompletarPfisicaEnter: false,
  autoCompletarPfisicaCursor: 0,
  autoCompletarPfisicaScroll: 0,

  autoCompletarId_Pjuridica: 0,
  autoCompletarPjuridica: initial,
  autoCompletarPjuridicaEnter: false,
  autoCompletarPjuridicaCursor: 0,
  autoCompletarPjuridicaScroll: 0,

  autoCompletarId_Servico: 0,
  autoCompletarServico: initial,
  autoCompletarServicoEnter: false,
  autoCompletarServicoCursor: 0,
  autoCompletarServicoScroll: 0,

  /////////// PARAMETROS > CONSOLIDADOR //////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  autoCompletarRfa_Id_Pfisica: 0,
  autoCompletarRfa_Pfisica: initial,
  autoCompletarRfa_PfisicaEnter: false,
  autoCompletarRfa_PfisicaCursor: 0,
  autoCompletarRfa_PfisicaScroll: 0,

  autoCompletarWoo_Id_Pfisica: 0,
  autoCompletarWoo_Pfisica: initial,
  autoCompletarWoo_PfisicaEnter: false,
  autoCompletarWoo_PfisicaCursor: 0,
  autoCompletarWoo_PfisicaScroll: 0,

  autoCompletarRfa_Id_Pjuridica: 0,
  autoCompletarRfa_Pjuridica: initial,
  autoCompletarRfa_PjuridicaEnter: false,
  autoCompletarRfa_PjuridicaCursor: 0,
  autoCompletarRfa_PjuridicaScroll: 0,

  autoCompletarWoo_Id_Pjuridica: 0,
  autoCompletarWoo_Pjuridica: initial,
  autoCompletarWoo_PjuridicaEnter: false,
  autoCompletarWoo_PjuridicaCursor: 0,
  autoCompletarWoo_PjuridicaScroll: 0,

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  autoCompletarId_Projeto: 0,
  autoCompletarProjeto: initial,
  autoCompletarProjetoEnter: false,
  autoCompletarProjetoCursor: 0,
  autoCompletarProjetoScroll: 0,

  autoCompletarId_Usuario: 0,
  autoCompletarUsuario: initial,
  autoCompletarUsuarioEnter: false,
  autoCompletarUsuarioCursor: 0,
  autoCompletarUsuarioScroll: 0,

  autoCompletarId_UsuarioOrigem: 0,
  autoCompletarUsuarioOrigem: initial,
  autoCompletarUsuarioOrigemEnter: false,
  autoCompletarUsuarioOrigemCursor: 0,
  autoCompletarUsuarioOrigemScroll: 0,

  autoCompletarId_UsuarioDestino: 0,
  autoCompletarUsuarioDestino: initial,
  autoCompletarUsuarioDestinoEnter: false,
  autoCompletarUsuarioDestinoCursor: 0,
  autoCompletarUsuarioDestinoScroll: 0,

  autoCompletarId_CartaoCorp: 0,
  autoCompletarCartaoCorp: initial,
  autoCompletarCartaoCorpEnter: false,
  autoCompletarCartaoCorpCursor: 0,
  autoCompletarCartaoCorpScroll: 0,

  autoCompletarId_Titular: 0,
  autoCompletarTitular: initial,
  autoCompletarTitularEnter: false,
  autoCompletarTitularCursor: 0,
  autoCompletarTitularScroll: 0,

  autoCompletarId_TipoCartao: 0,
  autoCompletarTipoCartao: initial,
  autoCompletarTipoCartaoEnter: false,
  autoCompletarTipoCartaoCursor: 0,
  autoCompletarTipoCartaoScroll: 0,

  autoCompletarId_Ramoatividade: 0,
  autoCompletarRamoatividade: initial,
  autoCompletarRamoatividadeEnter: false,
  autoCompletarRamoatividadeCursor: 0,
  autoCompletarRamoatividadeScroll: 0,

  autoCompletarId_Aeroporto: 0,
  autoCompletarAeroporto: initial,
  autoCompletarAeroportoEnter: false,
  autoCompletarAeroportoCursor: 0,
  autoCompletarAeroportoScroll: 0,

  autoCompletarId_Aeroporto_Origem: 0,
  autoCompletarAeroporto_Origem: initial,
  autoCompletarAeroporto_OrigemEnter: false,
  autoCompletarAeroporto_OrigemCursor: 0,
  autoCompletarAeroporto_OrigemScroll: 0,

  autoCompletarId_Aeroporto_Destino: 0,
  autoCompletarAeroporto_Destino: initial,
  autoCompletarAeroporto_DestinoEnter: false,
  autoCompletarAeroporto_DestinoCursor: 0,
  autoCompletarAeroporto_DestinoScroll: 0,

  autoCompletarId_RServico: 0,
  autoCompletarRServico: initial,
  autoCompletarRServicoEnter: false,
  autoCompletarRServicoCursor: 0,
  autoCompletarRServicoScroll: 0,

  autoCompletarId_Proservico: 0,
  autoCompletarProservico: initial,
  autoCompletarProservicoEnter: false,
  autoCompletarProservicoCursor: 0,
  autoCompletarProservicoScroll: 0,

  autoCompletarId_Fornecedor: 0,
  autoCompletarFornecedor: initial,
  autoCompletarFornecedorEnter: false,
  autoCompletarFornecedorCursor: 0,
  autoCompletarFornecedorScroll: 0,
  autoCompletarFornecedorDadosAdicionais: {},

  autoCompletarId_Contratante: 0,
  autoCompletarContratante: initial,
  autoCompletarContratanteEnter: false,
  autoCompletarContratanteCursor: 0,
  autoCompletarContratanteScroll: 0,
  autoCompletarContratanteDadosAdicionais: {},

  autoCompletarId_Credor: 0,
  autoCompletarCredor: initial,
  autoCompletarCredorEnter: false,
  autoCompletarCredorCursor: 0,
  autoCompletarCredorScroll: 0,
  autoCompletarCredorDadosAdicionais: {},

  autoCompletarId_Representante: 0,
  autoCompletarRepresentante: initial,
  autoCompletarRepresentanteEnter: false,
  autoCompletarRepresentanteCursor: 0,
  autoCompletarRepresentanteScroll: 0,
  autoCompletarRepresentanteDadosAdicionais: {},

  autoCompletarNomeReservaPFisica: '',
  autoCompletarNomeReservaAcompanhante: '',
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case '@SET_AUTOCOMPLETAR_SOLICITANTE': return { ...state, autoCompletarSolicitante: actions.payload };
    case '@SET_AUTOCOMPLETAR_ID_SOLICITANTE': return { ...state, autoCompletarId_Solicitante: actions.payload };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_SCROLL': return { ...state, autoCompletarSolicitanteScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_CURSOR': return { ...state, autoCompletarSolicitanteCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_ENTER_TRUE': return { ...state, autoCompletarSolicitanteEnter: true };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_ENTER_FALSE': return { ...state, autoCompletarSolicitanteEnter: false };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_CURSOR_MAIS': return {
      ...state,
      autoCompletarSolicitanteCursor: state.autoCompletarSolicitanteCursor + 1,
      autoCompletarSolicitanteScroll: state.autoCompletarSolicitanteScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_SOLICITANTE_CURSOR_MENOS': return {
      ...state,
      autoCompletarSolicitanteCursor: state.autoCompletarSolicitanteCursor - 1,
      autoCompletarSolicitanteScroll: state.autoCompletarSolicitanteScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_PROSERVICO': return { ...state, autoCompletarProservico: actions.payload };
    case '@SET_AUTOCOMPLETAR_ID_PROSERVICO': return { ...state, autoCompletarId_Proservico: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_SCROLL': return { ...state, autoCompletarProservicoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_CURSOR': return { ...state, autoCompletarProservicoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_ENTER_TRUE': return { ...state, autoCompletarProservicoEnter: true };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_ENTER_FALSE': return { ...state, autoCompletarProservicoEnter: false };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_CURSOR_MAIS': return {
      ...state,
      autoCompletarProservicoCursor: state.autoCompletarProservicoCursor + 1,
      autoCompletarProservicoScroll: state.autoCompletarProservicoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PROSERVICO_CURSOR_MENOS': return {
      ...state,
      autoCompletarProservicoCursor: state.autoCompletarProservicoCursor - 1,
      autoCompletarProservicoScroll: state.autoCompletarProservicoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_SERVICO': return { ...state, autoCompletarServico: actions.payload };
    case '@SET_AUTOCOMPLETAR_ID_SERVICO': return { ...state, autoCompletaId_Servico: actions.payload };
    case '@SET_AUTOCOMPLETAR_SERVICO_SCROLL': return { ...state, autoCompletarServicoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_SERVICO_CURSOR': return { ...state, autoCompletarServicoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_SERVICO_ENTER_TRUE': return { ...state, autoCompletarServicoEnter: true };
    case '@SET_AUTOCOMPLETAR_SERVICO_ENTER_FALSE': return { ...state, autoCompletarServicoEnter: false };
    case '@SET_AUTOCOMPLETAR_SERVICO_CURSOR_MAIS': return {
      ...state,
      autoCompletarServicoCursor: state.autoCompletarServicoCursor + 1,
      autoCompletarServicoScroll: state.autoCompletarServicoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_SERVICO_CURSOR_MENOS': return {
      ...state,
      autoCompletarGrupoCursor: state.autoCompletarGrupoCursor - 1,
      autoCompletarGrupoScroll: state.autoCompletarGrupoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_GRUPO': return { ...state, autoCompletarGrupo: actions.payload };
    case '@SET_AUTOCOMPLETAR_ID_GRUPO': return { ...state, autoCompletaId_Grupo: actions.payload };
    case '@SET_AUTOCOMPLETAR_GRUPO_SCROLL': return { ...state, autoCompletarGrupoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_GRUPO_CURSOR': return { ...state, autoCompletarGrupoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_GRUPO_ENTER_TRUE': return { ...state, autoCompletarGrupoEnter: true };
    case '@SET_AUTOCOMPLETAR_GRUPO_ENTER_FALSE': return { ...state, autoCompletarGrupoEnter: false };
    case '@SET_AUTOCOMPLETAR_GRUPO_CURSOR_MAIS': return {
      ...state,
      autoCompletarGrupoCursor: state.autoCompletarGrupoCursor + 1,
      autoCompletarGrupoScroll: state.autoCompletarGrupoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_GRUPO_CURSOR_MENOS': return {
      ...state,
      autoCompletarGrupoCursor: state.autoCompletarGrupoCursor - 1,
      autoCompletarGrupoScroll: state.autoCompletarGrupoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_SUBGRUPO': return { ...state, autoCompletarSubGrupo: actions.payload };
    case '@SET_AUTOCOMPLETAR_ID_SUBGRUPO': return { ...state, autoCompletarId_SubGrupo: actions.payload };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_SCROLL': return { ...state, autoCompletarSubGrupoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_CURSOR': return { ...state, autoCompletarSubGrupoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_ENTER_TRUE': return { ...state, autoCompletarSubGrupoEnter: true };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_ENTER_FALSE': return { ...state, autoCompletarSubGrupoEnter: false };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_CURSOR_MAIS': return {
      ...state,
      autoCompletarSubGrupoCursor: state.autoCompletarSubGrupoCursor + 1,
      autoCompletarSubGrupoScroll: state.autoCompletarSubGrupoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_SUBGRUPO_CURSOR_MENOS': return {
      ...state,
      autoCompletarSubGrupoCursor: state.autoCompletarSubGrupoCursor - 1,
      autoCompletarSubGrupoScroll: state.autoCompletarSubGrupoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_MUNICIPIO': return { ...state, autoCompletarId_Municipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO': return { ...state, autoCompletarMunicipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_SCROLL': return { ...state, autoCompletarMunicipioScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_CURSOR': return { ...state, autoCompletarMunicipioCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_ENTER_TRUE': return { ...state, autoCompletarMunicipioEnter: true };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_ENTER_FALSE': return { ...state, autoCompletarMunicipioEnter: false };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_CURSOR_MAIS': return {
      ...state,
      autoCompletarMunicipioCursor: state.autoCompletarMunicipioCursor + 1,
      autoCompletarMunicipioScroll: state.autoCompletarMunicipioScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_MUNICIPIO_CURSOR_MENOS': return {
      ...state,
      autoCompletarMunicipioCursor: state.autoCompletarMunicipioCursor - 1,
      autoCompletarMunicipioScroll: state.autoCompletarMunicipioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_RES_MUNICIPIO': return { ...state, autoCompletarId_RES_Municipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO': return { ...state, autoCompletarRES_Municipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_SCROLL': return { ...state, autoCompletarRES_MunicipioScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_CURSOR': return { ...state, autoCompletarRES_MunicipioCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_ENTER_TRUE': return { ...state, autoCompletarRES_MunicipioEnter: true };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_ENTER_FALSE': return { ...state, autoCompletarRES_MunicipioEnter: false };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_CURSOR_MAIS': return {
      ...state,
      autoCompletarRES_MunicipioCursor: state.autoCompletarRES_MunicipioCursor + 1,
      autoCompletarRES_MunicipioScroll: state.autoCompletarRES_MunicipioScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_RES_MUNICIPIO_CURSOR_MENOS': return {
      ...state,
      autoCompletarRES_MunicipioCursor: state.autoCompletarRES_MunicipioCursor - 1,
      autoCompletarRES_MunicipioScroll: state.autoCompletarRES_MunicipioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_COM_MUNICIPIO': return { ...state, autoCompletarId_COM_Municipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO': return { ...state, autoCompletarCOM_Municipio: actions.payload };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_SCROLL': return { ...state, autoCompletarCOM_MunicipioScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_CURSOR': return { ...state, autoCompletarCOM_MunicipioCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_ENTER_TRUE': return { ...state, autoCompletarCOM_MunicipioEnter: true };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_ENTER_FALSE': return { ...state, autoCompletarCOM_MunicipioEnter: false };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_CURSOR_MAIS': return {
      ...state,
      autoCompletarCOM_MunicipioCursor: state.autoCompletarCOM_MunicipioCursor + 1,
      autoCompletarCOM_MunicipioScroll: state.autoCompletarCOM_MunicipioScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_COM_MUNICIPIO_CURSOR_MENOS': return {
      ...state,
      autoCompletarCOM_MunicipioCursor: state.autoCompletarCOM_MunicipioCursor - 1,
      autoCompletarCOM_MunicipioScroll: state.autoCompletarCOM_MunicipioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_MOEDA': return { ...state, autoCompletarId_Moeda: actions.payload };
    case '@SET_AUTOCOMPLETAR_MOEDA': return { ...state, autoCompletarMoeda: actions.payload };
    case '@SET_AUTOCOMPLETAR_MOEDA_SCROLL': return { ...state, autoCompletarMoedaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_MOEDA_CURSOR': return { ...state, autoCompletarMoedaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_MOEDA_ENTER_TRUE': return { ...state, autoCompletarMoedaEnter: true };
    case '@SET_AUTOCOMPLETAR_MOEDA_ENTER_FALSE': return { ...state, autoCompletarMoedaEnter: false };
    case '@SET_AUTOCOMPLETAR_MOEDA_CURSOR_MAIS': return {
      ...state,
      autoCompletarMoedaCursor: state.autoCompletarMoedaCursor + 1,
      autoCompletarMoedaScroll: state.autoCompletarMoedaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_MOEDA_CURSOR_MENOS': return {
      ...state,
      autoCompletarMoedaCursor: state.autoCompletarMoedaCursor - 1,
      autoCompletarMoedaScroll: state.autoCompletarMoedaScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_PFISICA': return { ...state, autoCompletarId_Pfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_PFISICA': return { ...state, autoCompletarPfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_PFISICA_SCROLL': return { ...state, autoCompletarPfisicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PFISICA_CURSOR': return { ...state, autoCompletarPfisicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PFISICA_ENTER_TRUE': return { ...state, autoCompletarPfisicaEnter: true };
    case '@SET_AUTOCOMPLETAR_PFISICA_ENTER_FALSE': return { ...state, autoCompletarPfisicaEnter: false };
    case '@SET_AUTOCOMPLETAR_PFISICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarPfisicaCursor: state.autoCompletarPfisicaCursor + 1,
      autoCompletarPfisicaScroll: state.autoCompletarPfisicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PFISICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarPfisicaCursor: state.autoCompletarPfisicaCursor - 1,
      autoCompletarPfisicaScroll: state.autoCompletarPfisicaScroll - 28,
    };

      /////////// PARAMETROS > CONSOLIDADOR //////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////

    case '@SET_AUTOCOMPLETAR_ID_RFA_PFISICA': return { ...state, autoCompletarRfa_Id_Pfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA': return { ...state, autoCompletarRfa_Pfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_SCROLL': return { ...state, autoCompletarRfa_PfisicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_CURSOR': return { ...state, autoCompletarRfa_PfisicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_ENTER_TRUE': return { ...state, autoCompletarRfa_PfisicaEnter: true };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_ENTER_FALSE': return { ...state, autoCompletarRfa_PfisicaEnter: false };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarRfa_PfisicaCursor: state.autoCompletarRfa_PfisicaCursor + 1,
      autoCompletarRfa_PfisicaScroll: state.autoCompletarRfa_PfisicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_RFA_PFISICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarRfa_PfisicaCursor: state.autoCompletarRfa_PfisicaCursor - 1,
      autoCompletarRfa_PfisicaScroll: state.autoCompletarRfa_PfisicaScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_WOO_PFISICA': return { ...state, autoCompletarWoo_Id_Pfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA': return { ...state, autoCompletarWoo_Pfisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_SCROLL': return { ...state, autoCompletarWoo_PfisicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_CURSOR': return { ...state, autoCompletarWoo_PfisicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_ENTER_TRUE': return { ...state, autoCompletarWoo_PfisicaEnter: true };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_ENTER_FALSE': return { ...state, autoCompletarWoo_PfisicaEnter: false };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarWoo_PfisicaCursor: state.autoCompletarWoo_PfisicaCursor + 1,
      autoCompletarWoo_PfisicaScroll: state.autoCompletarWoo_PfisicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_WOO_PFISICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarWoo_PfisicaCursor: state.autoCompletarWoo_PfisicaCursor - 1,
      autoCompletarWoo_PfisicaScroll: state.autoCompletarWoo_PfisicaScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_RFA_PJURIDICA': return { ...state, autoCompletarRfa_Id_Pjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA': return { ...state, autoCompletarRfa_Pjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_SCROLL': return { ...state, autoCompletarRfa_PjuridicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_CURSOR': return { ...state, autoCompletarRfa_PjuridicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_ENTER_TRUE': return { ...state, autoCompletarRfa_PjuridicaEnter: true };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_ENTER_FALSE': return { ...state, autoCompletarRfa_PjuridicaEnter: false };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarRfa_PjuridicaCursor: state.autoCompletarRfa_PjuridicaCursor + 1,
      autoCompletarRfa_PjuridicaScroll: state.autoCompletarRfa_PjuridicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_RFA_PJURIDICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarRfa_PjuridicaCursor: state.autoCompletarRfa_PjuridicaCursor - 1,
      autoCompletarRfa_PjuridicaScroll: state.autoCompletarRfa_PjuridicaScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_WOO_PJURIDICA': return { ...state, autoCompletarWoo_Id_Pjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA': return { ...state, autoCompletarWoo_Pjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_SCROLL': return { ...state, autoCompletarWoo_PjuridicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_CURSOR': return { ...state, autoCompletarWoo_PjuridicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_ENTER_TRUE': return { ...state, autoCompletarWoo_PjuridicaEnter: true };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_ENTER_FALSE': return { ...state, autoCompletarWoo_PjuridicaEnter: false };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarWoo_PjuridicaCursor: state.autoCompletarWoo_PjuridicaCursor + 1,
      autoCompletarWoo_PjuridicaScroll: state.autoCompletarWoo_PjuridicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_WOO_PJURIDICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarWoo_PjuridicaCursor: state.autoCompletarWoo_PjuridicaCursor - 1,
      autoCompletarWoo_PjuridicaScroll: state.autoCompletarWoo_PjuridicaScroll - 28,
    };

      ////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////

    case '@SET_AUTOCOMPLETAR_ID_PROJETO': return { ...state, autoCompletarId_Projeto: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROJETO': return { ...state, autoCompletarProjeto: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROJETO_SCROLL': return { ...state, autoCompletarProjetoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROJETO_CURSOR': return { ...state, autoCompletarProjetoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROJETO_ENTER_TRUE': return { ...state, autoCompletarProjetoEnter: true };
    case '@SET_AUTOCOMPLETAR_PROJETO_ENTER_FALSE': return { ...state, autoCompletarProjetoEnter: false };
    case '@SET_AUTOCOMPLETAR_PROJETO_CURSOR_MAIS': return {
      ...state,
      autoCompletarProjetoCursor: state.autoCompletarProjetoCursor + 1,
      autoCompletarProjetoScroll: state.autoCompletarProjetoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PROJETO_CURSOR_MENOS': return {
      ...state,
      autoCompletarProjetoCursor: state.autoCompletarProjetoCursor - 1,
      autoCompletarProjetoScroll: state.autoCompletarProjetoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_ACOMPANHANTE': return { ...state, autoCompletarId_Acompanhante: actions.payload };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE': return { ...state, autoCompletarAcompanhante: actions.payload };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_SCROLL': return { ...state, autoCompletarAcompanhanteScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_CURSOR': return { ...state, autoCompletarAcompanhanteCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_ENTER_TRUE': return { ...state, autoCompletarAcompanhanteEnter: true };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_ENTER_FALSE': return { ...state, autoCompletarAcompanhanteEnter: false };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_CURSOR_MAIS': return {
      ...state,
      autoCompletarAcompanhanteCursor: state.autoCompletarAcompanhanteCursor + 1,
      autoCompletarAcompanhanteScroll: state.autoCompletarAcompanhanteScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_ACOMPANHANTE_CURSOR_MENOS': return {
      ...state,
      autoCompletarAcompanhanteCursor: state.autoCompletarAcompanhanteCursor - 1,
      autoCompletarAcompanhanteScroll: state.autoCompletarAcompanhanteScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_PAIS': return { ...state, autoCompletarId_Pais: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAIS': return { ...state, autoCompletarPais: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAIS_SCROLL': return { ...state, autoCompletarPaisScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAIS_CURSOR': return { ...state, autoCompletarPaisCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAIS_ENTER_TRUE': return { ...state, autoCompletarPaisEnter: true };
    case '@SET_AUTOCOMPLETAR_PAIS_ENTER_FALSE': return { ...state, autoCompletarPaisEnter: false };
    case '@SET_AUTOCOMPLETAR_PAIS_CURSOR_MAIS': return {
      ...state,
      autoCompletarPaisCursor: state.autoCompletarPaisCursor + 1,
      autoCompletarPaisScroll: state.autoCompletarPaisScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PAIS_CURSOR_MENOS': return {
      ...state,
      autoCompletarPaisCursor: state.autoCompletarPaisCursor - 1,
      autoCompletarPaisScroll: state.autoCompletarPaisScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_PAISEMISSAO': return { ...state, autoCompletarId_PaisEmissao: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO': return { ...state, autoCompletarPaisEmissao: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_SCROLL': return { ...state, autoCompletarPaisEmissaoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_CURSOR': return { ...state, autoCompletarPaisEmissaoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_ENTER_TRUE': return { ...state, autoCompletarPaisEmissaoEnter: true };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_ENTER_FALSE': return { ...state, autoCompletarPaisEmissaoEnter: false };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_CURSOR_MAIS': return {
      ...state,
      autoCompletarPaisEmissaoCursor: state.autoCompletarPaisEmissaoCursor + 1,
      autoCompletarPaisEmissaoScroll: state.autoCompletarPaisEmissaoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PAISEMISSAO_CURSOR_MENOS': return {
      ...state,
      autoCompletarPaisEmissaoCursor: state.autoCompletarPaisEmissaoCursor - 1,
      autoCompletarPaisEmissaoScroll: state.autoCompletarPaisEmissaoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_PJURIDICA': return { ...state, autoCompletarId_Pjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_PJURIDICA': return { ...state, autoCompletarPjuridica: actions.payload };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_SCROLL': return { ...state, autoCompletarPjuridicaScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_CURSOR': return { ...state, autoCompletarPjuridicaCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_ENTER_TRUE': return { ...state, autoCompletarPjuridicaEnter: true };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_ENTER_FALSE': return { ...state, autoCompletarPjuridicaEnter: false };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_CURSOR_MAIS': return {
      ...state,
      autoCompletarPjuridicaCursor: state.autoCompletarPjuridicaCursor + 1,
      autoCompletarPjuridicaScroll: state.autoCompletarPjuridicaScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PJURIDICA_CURSOR_MENOS': return {
      ...state,
      autoCompletarPjuridicaCursor: state.autoCompletarPjuridicaCursor - 1,
      autoCompletarPjuridicaScroll: state.autoCompletarPjuridicaScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_USUARIO': return { ...state, autoCompletarId_Usuario: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO': return { ...state, autoCompletarUsuario: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_SCROLL': return { ...state, autoCompletarUsuarioScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_CURSOR': return { ...state, autoCompletarUsuarioCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_ENTER_TRUE': return { ...state, autoCompletarUsuarioEnter: true };
    case '@SET_AUTOCOMPLETAR_USUARIO_ENTER_FALSE': return { ...state, autoCompletarUsuarioEnter: false };
    case '@SET_AUTOCOMPLETAR_USUARIO_CURSOR_MAIS': return {
      ...state,
      autoCompletarUsuarioCursor: state.autoCompletarUsuarioCursor + 1,
      autoCompletarUsuarioScroll: state.autoCompletarUsuarioScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_USUARIO_CURSOR_MENOS': return {
      ...state,
      autoCompletarUsuarioCursor: state.autoCompletarUsuarioCursor - 1,
      autoCompletarUsuarioScroll: state.autoCompletarUsuarioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_USUARIO_ORIGEM': return { ...state, autoCompletarId_UsuarioOrigem: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM': return { ...state, autoCompletarUsuarioOrigem: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_SCROLL': return { ...state, autoCompletarUsuarioOrigemScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_CURSOR': return { ...state, autoCompletarUsuarioOrigemCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_ENTER_TRUE': return { ...state, autoCompletarUsuarioOrigemEnter: true };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_ENTER_FALSE': return { ...state, autoCompletarUsuarioOrigemEnter: false };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_CURSOR_MAIS': return {
      ...state,
      autoCompletarUsuarioOrigemCursor: state.autoCompletarUsuarioOrigemCursor + 1,
      autoCompletarUsuarioOrigemScroll: state.autoCompletarUsuarioOrigemScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_USUARIO_ORIGEM_CURSOR_MENOS': return {
      ...state,
      autoCompletarUsuarioCursor: state.autoCompletarUsuarioCursor - 1,
      autoCompletarUsuarioScroll: state.autoCompletarUsuarioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_USUARIO_DESTINO': return { ...state, autoCompletarId_UsuarioDestino: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO': return { ...state, autoCompletarUsuarioDestino: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_SCROLL': return { ...state, autoCompletarUsuarioDestinoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_CURSOR': return { ...state, autoCompletarUsuarioDestinoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_ENTER_TRUE': return { ...state, autoCompletarUsuarioDestinoEnter: true };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_ENTER_FALSE': return { ...state, autoCompletarUsuarioDestinoEnter: false };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_CURSOR_MAIS': return {
      ...state,
      autoCompletarUsuarioDestinoCursor: state.autoCompletarUsuarioDestinoCursor + 1,
      autoCompletarUsuarioDestinoScroll: state.autoCompletarUsuarioDestinoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_USUARIO_DESTINO_CURSOR_MENOS': return {
      ...state,
      autoCompletarUsuarioCursor: state.autoCompletarUsuarioCursor - 1,
      autoCompletarUsuarioScroll: state.autoCompletarUsuarioScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_CARTAOCORP': return { ...state, autoCompletarId_CartaoCorp: actions.payload };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP': return { ...state, autoCompletarCartaoCorp: actions.payload };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_SCROLL': return { ...state, autoCompletarCartaoCorpScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_CURSOR': return { ...state, autoCompletarCartaoCorpCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_ENTER_TRUE': return { ...state, autoCompletarCartaoCorpEnter: true };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_ENTER_FALSE': return { ...state, autoCompletarCartaoCorpEnter: false };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_CURSOR_MAIS': return {
      ...state,
      autoCompletarCartaoCorpCursor: state.autoCompletarCartaoCorpCursor + 1,
      autoCompletarCartaoCorpScroll: state.autoCompletarCartaoCorpScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_CARTAOCORP_CURSOR_MENOS': return {
      ...state,
      autoCompletarCartaoCorpCursor: state.autoCompletarCartaoCorpCursor - 1,
      autoCompletarCartaoCorpScroll: state.autoCompletarCartaoCorpScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_PROFISSAO': return { ...state, autoCompletarId_Profissao: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROFISSAO': return { ...state, autoCompletarProfissao: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_SCROLL': return { ...state, autoCompletarProfissaoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_CURSOR': return { ...state, autoCompletarProfissaoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_ENTER_TRUE': return { ...state, autoCompletarProfissaoEnter: true };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_ENTER_FALSE': return { ...state, autoCompletarProfissaoEnter: false };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_CURSOR_MAIS': return {
      ...state,
      autoCompletarProfissaoCursor: state.autoCompletarProfissaoCursor + 1,
      autoCompletarScroll: state.autoCompletarScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_PROFISSAO_CURSOR_MENOS': return {
      ...state,
      autoCompletarProfissaoCursor: state.autoCompletarProfissaoCursor - 1,
      autoCompletarScroll: state.autoCompletarScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_TITULAR': return { ...state, autoCompletarId_Titular: actions.payload };
    case '@SET_AUTOCOMPLETAR_TITULAR': return { ...state, autoCompletarTitular: actions.payload };
    case '@SET_AUTOCOMPLETAR_TITULAR_SCROLL': return { ...state, autoCompletarTitularScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_TITULAR_CURSOR': return { ...state, autoCompletarTitularCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_TITULAR_ENTER_TRUE': return { ...state, autoCompletarTitularEnter: true };
    case '@SET_AUTOCOMPLETAR_TITULAR_ENTER_FALSE': return { ...state, autoCompletarTitularEnter: false };
    case '@SET_AUTOCOMPLETAR_TITULAR_CURSOR_MAIS': return {
      ...state,
      autoCompletarTitularCursor: state.autoCompletarTitularCursor + 1,
      autoCompletarTitularScroll: state.autoCompletarTitularScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_TITULAR_CURSOR_MENOS': return {
      ...state,
      autoCompletarTitularCursor: state.autoCompletarTitularCursor - 1,
      autoCompletarTitularScroll: state.autoCompletarTitularScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_TIPOCARTAO': return { ...state, autoCompletarId_TipoCartao: actions.payload };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO': return { ...state, autoCompletarTipoCartao: actions.payload };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_SCROLL': return { ...state, autoCompletarTipoCartaoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_CURSOR': return { ...state, autoCompletarTipoCartaoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_ENTER_TRUE': return { ...state, autoCompletarTipoCartaoEnter: true };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_ENTER_FALSE': return { ...state, autoCompletarTipoCartaoEnter: false };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_CURSOR_MAIS': return {
      ...state,
      autoCompletarTipoCartaoCursor: state.autoCompletarTipoCartaoCursor + 1,
      autoCompletarTipoCartaoScroll: state.autoCompletarTipoCartaoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_TIPOCARTAO_CURSOR_MENOS': return {
      ...state,
      autoCompletarTipoCartaoCursor: state.autoCompletarTipoCartaoCursor - 1,
      autoCompletarTipoCartaoScroll: state.autoCompletarTipoCartaoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_RAMOATIVIDADE': return { ...state, autoCompletarId_Ramoatividade: actions.payload };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE': return { ...state, autoCompletarRamoatividade: actions.payload };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_SCROLL': return { ...state, autoCompletarRamoatividadeScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_CURSOR': return { ...state, autoCompletarRamoatividadeCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_ENTER_TRUE': return { ...state, autoCompletarRamoatividadeEnter: true };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_ENTER_FALSE': return { ...state, autoCompletarRamoatividadeEnter: false };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_CURSOR_MAIS': return {
      ...state,
      autoCompletarRamoatividadeCursor: state.autoCompletarRamoatividadeCursor + 1,
      autoCompletarRamoatividadeScroll: state.autoCompletarRamoatividadeScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_RAMOATIVIDADE_CURSOR_MENOS': return {
      ...state,
      autoCompletarRamoatividadeCursor: state.autoCompletarRamoatividadeCursor - 1,
      autoCompletarRamoatividadeScroll: state.autoCompletarRamoatividadeScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_AEROPORTO': return { ...state, autoCompletarId_Aeroporto: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO': return { ...state, autoCompletarAeroporto: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_SCROLL': return { ...state, autoCompletarAeroportoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_CURSOR': return { ...state, autoCompletarAeroportoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ENTER_TRUE': return { ...state, autoCompletarAeroportoEnter: true };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ENTER_FALSE': return { ...state, autoCompletarAeroportoEnter: false };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_CURSOR_MAIS': return {
      ...state,
      autoCompletarAeroportoCursor: state.autoCompletarAeroportoCursor + 1,
      autoCompletarAeroportoScroll: state.autoCompletarAeroportoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_CURSOR_MENOS': return {
      ...state,
      autoCompletarAeroportoCursor: state.autoCompletarAeroportoCursor - 1,
      autoCompletarAeroportoScroll: state.autoCompletarAeroportoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_AEROPORTO_ORIGEM': return { ...state, autoCompletarId_Aeroporto_Origem: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM': return { ...state, autoCompletarAeroporto_Origem: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_SCROLL': return { ...state, autoCompletarAeroporto_OrigemScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_CURSOR': return { ...state, autoCompletarAeroporto_OrigemCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_ENTER_TRUE': return { ...state, autoCompletarAeroporto_OrigemEnter: true };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_ENTER_FALSE': return { ...state, autoCompletarAeroporto_OrigemEnter: false };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_CURSOR_MAIS': return {
      ...state,
      autoCompletarAeroporto_OrigemCursor: state.autoCompletarAeroporto_OrigemCursor + 1,
      autoCompletarAeroporto_OrigemScroll: state.autoCompletarAeroporto_OrigemScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_ORIGEM_CURSOR_MENOS': return {
      ...state,
      autoCompletarAeroporto_OrigemCursor: state.autoCompletarAeroporto_OrigemCursor - 1,
      autoCompletarAeroporto_OrigemScroll: state.autoCompletarAeroporto_OrigemScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_AEROPORTO_DESTINO': return { ...state, autoCompletarId_Aeroporto_Destino: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO': return { ...state, autoCompletarAeroporto_Destino: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_SCROLL': return { ...state, autoCompletarAeroporto_DestinoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_CURSOR': return { ...state, autoCompletarAeroporto_DestinoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_ENTER_TRUE': return { ...state, autoCompletarAeroporto_DestinoEnter: true };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_ENTER_FALSE': return { ...state, autoCompletarAeroporto_DestinoEnter: false };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_CURSOR_MAIS': return {
      ...state,
      autoCompletarAeroporto_DestinoCursor: state.autoCompletarAeroporto_DestinoCursor + 1,
      autoCompletarAeroporto_DestinoScroll: state.autoCompletarAeroporto_DestinoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_AEROPORTO_DESTINO_CURSOR_MENOS': return {
      ...state,
      autoCompletarAeroporto_DestinoCursor: state.autoCompletarAeroporto_DestinoCursor - 1,
      autoCompletarAeroporto_DestinoScroll: state.autoCompletarAeroporto_DestinoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_RSERVICO': return { ...state, autoCompletarId_RServico: actions.payload };
    case '@SET_AUTOCOMPLETAR_RSERVICO': return { ...state, autoCompletarRServico: actions.payload };
    case '@SET_AUTOCOMPLETAR_RSERVICO_SCROLL': return { ...state, autoCompletarRServicoScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_RSERVICO_CURSOR': return { ...state, autoCompletarRServicoCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_RSERVICO_ENTER_TRUE': return { ...state, autoCompletarRServicoEnter: true };
    case '@SET_AUTOCOMPLETAR_RSERVICO_ENTER_FALSE': return { ...state, autoCompletarRServicoEnter: false };
    case '@SET_AUTOCOMPLETAR_RSERVICO_CURSOR_MAIS': return {
      ...state,
      autoCompletarRServicoCursor: state.autoCompletarRServicoCursor + 1,
      autoCompletarRServicoScroll: state.autoCompletarRServicoScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_RSERVICO_CURSOR_MENOS': return {
      ...state,
      autoCompletarRServicoCursor: state.autoCompletarRServicoCursor - 1,
      autoCompletarRServicoScroll: state.autoCompletarRServicoScroll - 28,
    };

    case '@SET_AUTOCOMPLETAR_ID_FORNECEDOR': return { ...state, autoCompletarId_Fornecedor: actions.payload };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR': return { ...state, autoCompletarFornecedor: actions.payload };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_SCROLL': return { ...state, autoCompletarFornecedorScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_CURSOR': return { ...state, autoCompletarFornecedorCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_ENTER_TRUE': return { ...state, autoCompletarFornecedorEnter: true };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_ENTER_FALSE': return { ...state, autoCompletarFornecedorEnter: false };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_CURSOR_MAIS': return {
      ...state,
      autoCompletarFornecedorCursor: state.autoCompletarFornecedorCursor + 1,
      autoCompletarFornecedorScroll: state.autoCompletarFornecedorScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_CURSOR_MENOS': return {
      ...state,
      autoCompletarFornecedorCursor: state.autoCompletarFornecedorCursor - 1,
      autoCompletarFornecedorScroll: state.autoCompletarFornecedorScroll - 28,
    };
    case '@SET_AUTOCOMPLETAR_FORNECEDOR_DADOS_ADICIONAIS': return { ...state, autoCompletarFornecedorDadosAdicionais: actions.payload };

    case '@SET_AUTOCOMPLETAR_ID_CONTRATANTE': return { ...state, autoCompletarId_Contratante: actions.payload };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE': return { ...state, autoCompletarContratante: actions.payload };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_SCROLL': return { ...state, autoCompletarContratanteScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_CURSOR': return { ...state, autoCompletarContratanteCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_ENTER_TRUE': return { ...state, autoCompletarContratanteEnter: true };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_ENTER_FALSE': return { ...state, autoCompletarContratanteEnter: false };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_CURSOR_MAIS': return {
      ...state,
      autoCompletarContratanteCursor: state.autoCompletarContratanteCursor + 1,
      autoCompletarContratanteScroll: state.autoCompletarContratanteScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_CURSOR_MENOS': return {
      ...state,
      autoCompletarContratanteCursor: state.autoCompletarContratanteCursor - 1,
      autoCompletarContratanteScroll: state.autoCompletarContratanteScroll - 28,
    };
    case '@SET_AUTOCOMPLETAR_CONTRATANTE_DADOS_ADICIONAIS': return { ...state, autoCompletarContratanteDadosAdicionais: actions.payload };

    case '@SET_AUTOCOMPLETAR_ID_CREDOR': return { ...state, autoCompletarId_Credor: actions.payload };
    case '@SET_AUTOCOMPLETAR_CREDOR': return { ...state, autoCompletarCredor: actions.payload };
    case '@SET_AUTOCOMPLETAR_CREDOR_SCROLL': return { ...state, autoCompletarCredorScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_CREDOR_CURSOR': return { ...state, autoCompletarCredorCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_CREDOR_ENTER_TRUE': return { ...state, autoCompletarCredorEnter: true };
    case '@SET_AUTOCOMPLETAR_CREDOR_ENTER_FALSE': return { ...state, autoCompletarCredorEnter: false };
    case '@SET_AUTOCOMPLETAR_CREDOR_CURSOR_MAIS': return {
      ...state,
      autoCompletarCredorCursor: state.autoCompletarCredorCursor + 1,
      autoCompletarCredorScroll: state.autoCompletarCredorScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_CREDOR_CURSOR_MENOS': return {
      ...state,
      autoCompletarCredorCursor: state.autoCompletarCredorCursor - 1,
      autoCompletarCredorScroll: state.autoCompletarCredorScroll - 28,
    };
    case '@SET_AUTOCOMPLETAR_CREDOR_DADOS_ADICIONAIS': return { ...state, autoCompletarCredorDadosAdicionais: actions.payload };

    case '@SET_AUTOCOMPLETAR_ID_REPRESENTANTE': return { ...state, autoCompletarId_Representante: actions.payload };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE': return { ...state, autoCompletarRepresentante: actions.payload };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_SCROLL': return { ...state, autoCompletarRepresentanteScroll: actions.payload };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_CURSOR': return { ...state, autoCompletarRepresentanteCursor: actions.payload };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_ENTER_TRUE': return { ...state, autoCompletarRepresentanteEnter: true };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_ENTER_FALSE': return { ...state, autoCompletarRepresentanteEnter: false };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_CURSOR_MAIS': return {
      ...state,
      autoCompletarRepresentanteCursor: state.autoCompletarRepresentanteCursor + 1,
      autoCompletarRepresentanteScroll: state.autoCompletarRepresentanteScroll + 28,
    };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_CURSOR_MENOS': return {
      ...state,
      autoCompletarRepresentanteCursor: state.autoCompletarRepresentanteCursor - 1,
      autoCompletarRepresentanteScroll: state.autoCompletarRepresentanteScroll - 28,
    };
    case '@SET_AUTOCOMPLETAR_REPRESENTANTE_DADOS_ADICIONAIS': return { ...state, autoCompletarRepresentanteDadosAdicionais: actions.payload };

      ////// NOME RESERVA ////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////

    case '@SET_AUTOCOMPLETAR_RESERVA_PFISICA': return { ...state, autoCompletarNomeReservaPFisica: actions.payload };
    case '@SET_AUTOCOMPLETAR_RESERVA_ACOMPANHANTE': return { ...state, autoCompletarNomeReservaAcompanhante: actions.payload };

      ////// RESET ///////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////

    case '@RESET_AUTOCOMPLETAR': return (state = initialState);

    default: return state;
  }
}
