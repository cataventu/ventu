import * as initial from '../../initials/projeto/dossie';

const initialState = {
  //filtroColor: ['filtro-inativo', 'filtro-ativo'],
  //filtroAtivo: 0, //usado na cor do botão filtro
  //filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()
  dossieVisibility: {
    aprovado: false,
    participante: false,
    voos: false,
    perfil: false,
    campo_regs: [{
      permissao: '',
    }],
    aniversariante: false,
    melhoridade: false,
    emergencia: false,
    hospedagem: false,
    passaporte: false,
    tm: false,
    flag_privado: false,
    fornecedor: false,

  },
  dossieConsulta: initial.dossieConsulta,
  dossieFicha: initial.dossieFicha,
  //dossieAprovado: initial.dossieAprovado,
  dossieParticipante_tag: initial.dossieParticipante_tag,
  dossieParticipante_par_nome_completo: initial.dossieParticipante_par_nome_completo,
  dossieEmergencia_tag: initial.dossieEmergencia_tag,
  dossieFornecedor: initial.dossieFornecedor,
  dossieAniversario: initial.dossieAniversario,
  dossiePassaporte: initial.dossiePassaporte,
  dossieMelhoridade: initial.dossieMelhoridade,
  dossieAereo: initial.dossieAereo,

  dossiePerfil: initial.dossiePerfil,
  campo_regs: initial.dossieFicha,
  permissao: initial.dossieFicha,

  dossieTM: initial.dossieTM,
  dossieDespertar: initial.dossieDespertar,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@GET_DOSSIE_CONSULTA': return { ...state, dossieConsulta: actions.payload };
    ////// PAGINA
    //case '@GET_DOSSIE_PAGINA': return { ...state, tableData: actions.payload };
    //// FICHA
    case '@GET_DOSSIE_FICHA': return { ...state, dossieFicha: actions.payload };
    //case '@GET_DOSSIE_APROVADO': return { ...state, dossieAprovado: actions.payload };
    case '@GET_DOSSIE_PARTICIPANTE_TAG': return { ...state, dossieParticipante_tag: actions.payload };
    case '@GET_DOSSIE_PARTICIPANTE_PAR_NOME_COMPLETO': return { ...state, dossieParticipante_par_nome_completo: actions.payload };
    case '@GET_DOSSIE_EMERGENCIA_TAG': return { ...state, dossieEmergencia_tag: actions.payload };
    case '@GET_DOSSIE_FORNECEDOR': return { ...state, dossieFornecedor: actions.payload };
    case '@GET_DOSSIE_ANIVERSARIO': return { ...state, dossieAniversario: actions.payload };
    case '@GET_DOSSIE_MELHORIDADE': return { ...state, dossieMelhoridade: actions.payload };
    case '@GET_DOSSIE_PASSAPORTE': return { ...state, dossiePassaporte: actions.payload };
    case '@GET_DOSSIE_AEREO': return { ...state, dossieAereo: actions.payload };
    case '@GET_DOSSIE_PERFIL': return { ...state, dossiePerfil: actions.payload };
    case '@GET_DOSSIE_TM': return { ...state, dossieTM: actions.payload };
    case '@GET_DOSSIE_DESPERTAR': return { ...state, dossieDespertar: actions.payload };

    case '@GET_DOSSIE_VISIBILITY': return { ...state, dossieVisibility: actions.payload };
    default: return state;
  }
}
