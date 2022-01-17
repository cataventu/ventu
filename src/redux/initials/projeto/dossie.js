export const dossieConsulta = [];

export const dossieFicha = {
  aprovado: false,
  participante: false,
  voos: false,
  malas: false,
  perfil: false,
  campo_regs: [{
    permissao: '',
  },
  ],
  aniversariante: false,
  melhoridade: false,
  emergencia: false,
  hospedagem: false,
  passaporte: false,
  tm: false,
  fornecedor: false,
};

export const dossieParticipante_tag = {
  participante_regs: [],
};
export const dossieParticipante_par_nome_completo = {
  participante_regs: [],
};
export const dossieEmergencia_tag = {
  emergencia_regs: [],
};
export const dossieFornecedor = {
  fornecedor_regs: [{
    tipo_servico: 0,
    dtipo_servico: '',
    for_pessoa: 0,
    for_dpessoa: '',
    for_id_pfisica: 0,
    for_id_pjuridica: 0,
    for_nome_pessoa: '',
    for_nome_pessoa2: '',
    rcontato_regs: [
      {
        id: 0,
        tipo: 0,
        dtipo: '',
        endereco: '',
        descricao: '',
        pad_comercial: false,
        pad_financeiro: false,
      },
    ],
    rendereco_regs: [
      {
        id: 0,
        tipo: 0,
        dtipo: '',
        identificacao: '',
        cep: '',
        logradouro: '',
        endereco: '',
        numero: 0,
        complemento: '',
        bairro: '',
        id_municipio: 0,
        municipio: '',
        uf: '',
        pais: '',
      },
    ],
  }],
};
export const dossiePassaporte = {
  passaporte_regs: [],
  id: 0,
  id_participante: 0,
  par_nome_completo: '',
  par_nome_reserva: '',
  tag: 0,
  rpassaporte_regs: [
    {
      id: 0,
      id_pais: 0,
      pais: '',
      nome_passaporte: '',
      numero: '',
      id_pais_emissao: 0,
      pais_emissao: '',
      dt_emissao: '',
      dt_validade: '',
      padrao: true,
    },
  ],
};
export const dossieAniversario = {
  aniversario_regs: [
    {
      id_participante: 0,
      par_nome_completo: '',
      par_nome_reserva: '',
      tag: 0,
      aniversario: '',
    },
  ],
};
export const dossieMelhoridade = {
  melhoridade_regs: [
    {
      id_participante: 0,
      par_nome_completo: '',
      par_nome_reserva: '',
      tag: 0,
      idade: 0,
    },
  ],
};

export const dossieAereo = {
  aereo_regs: [{
    grupo: 0,
    dgrupo: '',
    num_participante: 0,
    ritinerario_regs: [
      {
        id: 0,
        sequencia: 0,
        cia: '',
        voo: 0,
        dtemb: '',
        hremb: '',
        origem: '',
        dtdes: '',
        hrdes: '',
        destino: '',
      },
    ],
    rpax_regs: [
      {
        id_pfisica: 0,
        nome_completo: '',
        nome_reserva: '',
      },
    ],
  }],
};
export const dossiePerfil = {
  id: 0,
  tipo: 0,
  dtipo: '',
  descricao: '',
  rperfil_regs: [
    {
      id: 0,
      id_participante: 0,
      par_nome_completo: '',
      par_nome_reserva: '',
      tag: 0,
      observacao: '',
    },
  ],
};
export const dossieTM = {
  tempomov_regs: [{
    id: 0,
    titulo: '',
    dt_inicio: '',
    dt_termino: '',
    dia_inteiro: false,
    local: '',
    descricao: '',
    id_categoria: 0,
    categoria: '',
    cor: '',
    destaque: '',
    privado: '',
    link: '',
    rtempomov_regs: [
      {
        id: 0,
        id_proservico: 0,
        tipo_servico: 0,
        dtipo_servico: '',
        servico: '',
        for_nome_pessoa: '',
        cnf_numero: '',
        moeda: '',
        valor_total: 0,
      },
    ],
    anexo_regs: [
      {
        id: 0,
        data: '',
        titulo: '',
        extensao: '',
        arquivo: '',
      },
    ],
  }],
};
export const dossieDespertar = {
  despertar_regs: [{
    for_pessoa: 0,
    for_id_pfisica: 0,
    for_id_pjuridica: 0,
    for_nome_pessoa: '',
    num_participante: 0,
    data1: '',
    data2: '',
    data3: '',
    rpax_regs: [
      {
        id_pfisica: 0,
        nome_completo: '',
        nome_reserva: '',
        tipo: 0,
        dtipo: '',
        tag: '',
        hos_tipo: 0,
        hos_dtipo: '',
        hos_apto: '',
        hos_wakeup: '',
        dt_inicio: '',
        dt_termino: '',
        celular: '',
      },
    ],
  }],
};
