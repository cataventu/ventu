import { fichaProServico } from '../../initials/projeto/projeto';

const initial = fichaProServico;

const initialState = {
  tableData: { id: 0, proservico_regs: [] },
  fichaData: initial.fichaData,

  fichaDataConsolidador: initial.fichaData,

  flagFichaConsolidador_Step01: false,
  flagFichaConsolidador_Step02: false,
  flagFichaConsolidador_Step03: false,
  flagFichaConsolidador_Step04: false,
  flagFichaConsolidador_Step05: false,
  flagFichaConsolidador_Step06: false,
  flagFichaConsolidador_Step07: false,
  flagFichaConsolidador_Step08: false,
  flagFichaConsolidador_Step09: false,
  flagFichaConsolidador_Step10: false,

  flagTableUpdate: false,
  flagDelete: false,

  tipo_hospedagem: 0,

  /// step 1
  statusServico: 0,
  operacaoServico: 0,
  tipo_servico: 0,
  Id_servico: 0,

  /// step 3
  cedente: 0,
  rentTarifa: 0,
  cobrancaTarifa: 0,

  pag_valortotal: 0,
  rec_valortotal: 0,

  Bilhete_ShowForm: false,
  Recebimento_ShowForm: false,
  Pagamento_ShowForm: false,
  Pax_ShowForm: false,
  Itinerario_ShowForm: false,
  alt_dhsis: '',

  fileAnexo: {
    titulo: '', tamanho: '', extensao: '', arquivo: '', alt_dhsis: '',
  },
  indexPagination: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    ////// PAGINA
    case '@GET_PROSERVICO_PAGINA': return { ...state, tableData: actions.payload };
    case '@RESET_PROSERVICO_PAGINA': return { ...state, tableData: { id: 0, proservico_regs: [] } };
    case '@SET_INDEX_PAGINATION_PROSERVICO': return { ...state, indexPagination: actions.payload };

    case '@SET_PROSERVICO_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_PROSERVICO_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    case '@SET_PROSERVICO_DELETE_TRUE': return { ...state, flagDelete: true };
    case '@SET_PROSERVICO_DELETE_FALSE': return { ...state, flagDelete: false };

    case '@SET_PROSERVICO_TIPO_HOSPEDAGEM': return { ...state, tipo_hospedagem: actions.payload };

    case '@SET_PROSERVICO_STATUS': return { ...state, statusServico: actions.payload };
    case '@SET_PROSERVICO_OPERACAO': return { ...state, operacaoServico: actions.payload };
    case '@SET_PROSERVICO_TIPO_SERVICO': return { ...state, tipo_servico: actions.payload };
    case '@SET_PROSERVICO_ID_SERVICO': return { ...state, Id_servico: actions.payload };

    case '@SET_PROSERVICO_CEDENTE': return { ...state, cedente: actions.payload };
    case '@SET_PROSERVICO_RENT_TARIFA': return { ...state, rentTarifa: actions.payload };
    case '@SET_PROSERVICO_COBRANCA_TARIFA': return { ...state, cobrancaTarifa: actions.payload };

    case '@SET_PROSERVICO_TOTAL_PGMT': return { ...state, pag_valortotal: actions.payload };
    case '@SET_PROSERVICO_TOTAL_RECEB': return { ...state, rec_valortotal: actions.payload };

    ////// FICHA
    case '@SET_PROSERVICO_FICHA': return { ...state, fichaData: actions.payload };
    case '@RESET_PROSERVICO_FICHA': return {
      ...state,
      fichaData: initial.fichaData,
      fichaDataConsolidador: initial.fichaData,

      operacaoServico: 0,
      tipo_servico: 0,
      Id_servico: 0,

      pag_valortotal: 0,
      rec_valortotal: 0,

      tipo_hospedagem: 0,
      rentTarifa: 0,
      cobrancaTarifa: 0,

      Bilhete_ShowForm: false,
      Recebimento_ShowForm: false,
      Pagamento_ShowForm: false,
      Pax_ShowForm: false,
      Itinerario_ShowForm: false,
    };

    ////// FICHA CONSOLIDADOR
    case '@SET_PROSERVICO_FICHA_CONSOLIDADOR': return { ...state, fichaDataConsolidador: actions.payload };

    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_TRUE': return {
      ...state,
      flagFichaConsolidador_Step01: true,
      flagFichaConsolidador_Step02: true,
      flagFichaConsolidador_Step03: true,
      flagFichaConsolidador_Step04: true,
      flagFichaConsolidador_Step05: true,
      flagFichaConsolidador_Step06: true,
      flagFichaConsolidador_Step07: true,
      flagFichaConsolidador_Step08: true,
      flagFichaConsolidador_Step09: true,
      flagFichaConsolidador_Step10: true,
    };

    case '@RESET_PROSERVICO_FLAG_CONSOLIDADOR': return {
      ...state,
      flagFichaConsolidador_Step01: false,
      flagFichaConsolidador_Step02: false,
      flagFichaConsolidador_Step03: false,
      flagFichaConsolidador_Step04: false,
      flagFichaConsolidador_Step05: false,
      flagFichaConsolidador_Step06: false,
      flagFichaConsolidador_Step07: false,
      flagFichaConsolidador_Step08: false,
      flagFichaConsolidador_Step09: false,
      flagFichaConsolidador_Step10: false,
    };

    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_01_FALSE': return { ...state, flagFichaConsolidador_Step01: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_02_FALSE': return { ...state, flagFichaConsolidador_Step02: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_03_FALSE': return { ...state, flagFichaConsolidador_Step03: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_04_FALSE': return { ...state, flagFichaConsolidador_Step04: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_05_FALSE': return { ...state, flagFichaConsolidador_Step05: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_06_FALSE': return { ...state, flagFichaConsolidador_Step06: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_07_FALSE': return { ...state, flagFichaConsolidador_Step07: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_08_FALSE': return { ...state, flagFichaConsolidador_Step08: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_09_FALSE': return { ...state, flagFichaConsolidador_Step09: false };
    case '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_10_FALSE': return { ...state, flagFichaConsolidador_Step10: false };

      ////// STEPS /////////////////////////////
      //////////////////////////////////////////

    ////// STEP 3 - BILHETE
    case '@SET_FICHA_BILHETE_FORM_TRUE': return { ...state, Bilhete_ShowForm: true };
    case '@SET_FICHA_BILHETE_FORM_FALSE': return { ...state, Bilhete_ShowForm: false };

    ////// STEP 5 - RECEBIMENTO
    case '@SET_FICHA_RECEBIMENTO_FORM_TRUE': return { ...state, Recebimento_ShowForm: true };
    case '@SET_FICHA_RECEBIMENTO_FORM_FALSE': return { ...state, Recebimento_ShowForm: false };

    ////// STEP 6 - PAGAMENTO
    case '@SET_FICHA_PAGAMENTO_FORM_TRUE': return { ...state, Pagamento_ShowForm: true };
    case '@SET_FICHA_PAGAMENTO_FORM_FALSE': return { ...state, Pagamento_ShowForm: false };

    ////// STEP 7 - PAX
    case '@SET_FICHA_PAX_FORM_TRUE': return { ...state, Pax_ShowForm: true };
    case '@SET_FICHA_PAX_FORM_FALSE': return { ...state, Pax_ShowForm: false };

    ////// STEP 8 - ITINERARIO
    case '@SET_FICHA_ITINERARIO_FORM_TRUE': return { ...state, Itinerario_ShowForm: true };
    case '@SET_FICHA_ITINERARIO_FORM_FALSE': return { ...state, Itinerario_ShowForm: false };

    ////// FLAG
    case '@SET_OCORRENCIA_FLAG_TRUE': return { ...state, flagTableUpdate: true };
    case '@SET_OCORRENCIA_FLAG_FALSE': return { ...state, flagTableUpdate: false };

    ///// ANEXO
    case '@SET_PROSERVICO_ANEXO_FILE': return { ...state, fileAnexo: actions.payload };
    case '@RESET_PROSERVICO_ANEXO_FILE': return {
      ...state,
      fileAnexo: {
        titulo: '', tamanho: '', extensao: '', arquivo: '',
      },
    };

    default: return state;
  }
}
