import * as initial from '../../initials/sistema';

const initialState = {
  ult_atualizacao: initial.ult_atualizacao,
  versao: initial.versao,
  auth: initial.auth,
  develop: initial.develop,

  modalVisibility: false,
  modalVisibilityFixo: false,
  modalId: '',
  filtroVisibility: false,

  modalCalendarVisibility: false,
  modalCalendarSave: false,

  estadoCivil: initial.tabelas,
  sexo: initial.tabelas,
  parentesco: initial.tabelas,
  tipoRContato: initial.tabelas,
  status_movimento: initial.tabelas,
  tipo_documento: initial.tabelas,
  tipo_forma: initial.tabelas,
  tipo_negociacao: initial.tabelas,
  tipo_negociacao_operador: initial.tabelas,
  transacao: initial.tabelas,
  tipo_servico: initial.tabelas,

  tipo_REnderecoPF: initial.tabelas,
  tipo_REnderecoPJ: initial.tabelas,
  pessoa: initial.tabelas,

  status_projeto: initial.tabelas,
  tipo_projeto: initial.tabelas,

  atuacao_participante: initial.tabelas,
  status_rsvp: initial.tabelas,
  status_ocorrencia: initial.tabelas,

  criterio_pagrec: initial.tabelas,

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    /// FILTRO
    case '@SHOW_MODAL': return { ...state, modalVisibility: true, modalId: actions.payload };
    case '@HIDE_MODAL': return { ...state, modalVisibility: false };
    case '@SHOW_MODAL_FIXO': return { ...state, modalVisibilityFixo: true };
    case '@HIDE_MODAL_FIXO': return { ...state, modalVisibilityFixo: false };
    case '@SHOW_FILTRO': return { ...state, filtroVisibility: true };
    case '@HIDE_FILTRO': return { ...state, filtroVisibility: false };

    case '@SHOW_MODAL_CALENDAR': return { ...state, modalCalendarVisibility: true };
    case '@HIDE_MODAL_CALENDAR': return { ...state, modalCalendarVisibility: false };
    case '@SET_MODAL_CALENDAR_SAVE_TRUE': return { ...state, modalCalendarSave: true };
    case '@SET_MODAL_CALENDAR_SAVE_FALSE': return { ...state, modalCalendarSave: false };

    /// TABELAS
    case '@GET_ESTADO_CIVIL': return { ...state, estadoCivil: actions.payload };
    case '@GET_SEXO': return { ...state, sexo: actions.payload };
    case '@GET_PARENTESCO': return { ...state, parentesco: actions.payload };
    case '@GET_TIPO_RCONTATO': return { ...state, tipoRContato: actions.payload };
    case '@GET_STATUS_MOVIMENTO': return { ...state, status_movimento: actions.payload };
    case '@GET_TIPO_DOCUMENTO': return { ...state, tipo_documento: actions.payload };
    case '@GET_TIPO_FORMA': return { ...state, tipo_forma: actions.payload };
    case '@GET_TIPO_NEGOCIACAO': return { ...state, tipo_negociacao: actions.payload };
    case '@GET_TIPO_NEGOCIACAO_OPERADORES': return { ...state, tipo_negociacao_operador: actions.payload };
    case '@GET_TRANSACAO': return { ...state, transacao: actions.payload };
    case '@GET_TIPO_SERVICO': return { ...state, tipo_servico: actions.payload };
    case '@GET_TIPO_RENDERECO_PF': return { ...state, tipo_REnderecoPF: actions.payload };
    case '@GET_TIPO_RENDERECO_PJ': return { ...state, tipo_REnderecoPJ: actions.payload };
    case '@GET_PESSOA': return { ...state, pessoa: actions.payload };

    case '@GET_STATUS_PROJETO': return { ...state, status_projeto: actions.payload };
    case '@GET_TIPO_PROJETO': return { ...state, tipo_projeto: actions.payload };
    case '@GET_ATUACAO_PARTICIPANTE': return { ...state, atuacao_participante: actions.payload };
    case '@GET_STATUS_RSVP': return { ...state, status_rsvp: actions.payload };
    case '@GET_STATUS_OCORRENCIA': return { ...state, status_ocorrencia: actions.payload };

    case '@GET_CRITERIO_PAGREC': return { ...state, criterio_pagrec: actions.payload };

    default: return state;
  }
}
