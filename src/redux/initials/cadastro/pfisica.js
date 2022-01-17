////////// PESSOAL //////////////////////////
export const filtroData = {
  chave: '',
  nome: '',
  cpf: '',
  genero: '',
  situacao: '',
  alt_dhsis_maior: '',
  alt_dhsis_menor: '',
};

export const tableData = [{
  id: '',
  nome_completo: '',
  nome_reserva: '',
  buttons: '',
}];

export const pessoalFichaData = {
  id: '',
  nome_completo: '',
  nome_reserva: '',
  nome_cracha: '',

  dt_nascimento: '',

  rg: '',
  cpf: '',
  rne: '',

  genero: 0,
  dgenero: '',
  gen_outros: '',

  nac_id_pais: 0,
  nacionalidade: '',

  pro_id_aeroporto: 0,
  pro_aeroporto: '',

  estado_civil: 0,
  destado_civil: '',

  notificacao: false,
  estrangeira: false,
  situacao: true,
  alt_dhsis: '',
};
export const consultaDadosPessoais = [];

////////// FOTO //////////////////////////
export const fotoFichaData = {
  id: '',
  foto: '',
  alt_usuario: '',
  alt_dhsis: '',
};
////////// COMERCIAL //////////////////////////

export const comercialFichaData = {
  id: 0,
  id_profissao: 0,
  profissao: '',
  id_pjuridica: 0,
  pjuridica: '',
  codempresa: '',
  complemento: '',
  cargo: '',
  area: '',
  alt_usuario: 0,
  alt_dusuario: '',
  alt_dhsis: '',
};

export const consultaDadosComerciais = [];

////////// CONTATO //////////////////////////
export const rcontatoTableData = {
  rcontato_regs: [{
    id: '',
    id_pfisica: '',
    id_pjuridica: 0,
    tipo: 0,
    dtipo: '',
    endereco: '',
    descricao: '',
  }],
};

export const rcontatoFichaData = {
  id: '',
  id_pfisica: 0,
  id_pjuridica: 0,
  tipo: 0,
  dtipo: '',
  endereco: '',
  descricao: '',
  pad_comercial: '',
  pad_financeiro: '',
  alt_dhsis: '',
};
export const consultaDadosRContato = [];
////////// ENDERECO //////////////////////////

export const renderecoTableData = {
  rendereco_regs: [{
    id: '',
    tipo: 0,
    endereco: '',
    cep: '',
    identificacao: '',
  }],
};

export const renderecoFichaData = {
  id: '',
  id_pfisica: 0,
  id_pjuridica: 0,
  tipo: 0,
  identificacao: '',
  cep: '',
  logradouro: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  id_municipio: '',
  municipio: '',
  alt_dhsis: '',
};

export const consultaDadosREndereco = [];

////////// SERVICOS //////////////////////////
export const rservicoTableData = {
  rservico_regs: [{
  //id: "",
  //id_pfisica: "",
  //id_pjuridica:0,
  //tipo:0,
  //dtipo: "",
  //endereco: "",
  //descricao: "",
  }],
};

export const rservicoFichaData = {
  id: 0,
  id_pfisica: 0,
  id_pjuridica: 0,
  nome: '',
  id_servico: 0,
  tipo_servico: 0,
  servico: '',
  cod_ciaaerea: '',
  pag_prazo: 0,
  pag_criterio: 0,
  dpag_criterio: '',
  rec_prazo: 0,
  rec_criterio: 0,
  drec_criterio: '',
  gera_pagto: true,
  observacao: '',
  alt_dhsis: '',
};

export const consultaDadosRServico = [];
////////// FAMILIA //////////////////////////

export const familiaTableData = {
  familia_regs: [{
    id: 0,
    fam_id_pfisica: 0,
    fam_pfisica: '',
    fam_parentesco: 0,
    fam_dparentesco: '',
    fam_par_outros: '',
  }],
};

export const familiaFichaData = {
  id: 0,
  nome: '',
  fam_id_pfisica: 0,
  fam_pfisica: '',
  fam_parentesco: 0,
  fam_dparentesco: '',
  fam_par_outros: '',
  fam_endereco: '',
  fam_telefone: '',
  dependente: false,
  alt_dhsis: '',
};
export const consultaDadosFamilia = [];

////////// EMERGENCIA //////////////////////////

export const emergenciaFichaData = {
  id: 0,
  eme_nome: '',
  eme_parentesco: 0,
  eme_dparentesco: '',
  eme_par_outros: '',
  eme_ntelefone1: '',
  eme_dtelefone1: '',
  eme_ntelefone2: '',
  eme_dtelefone2: '',
  eme_observacao: '',
  alt_usuario: 0,
  alt_dusuario: '',
  alt_dhsis: '',
};

export const consultaDadosEmergencia = [];

////////// PASSAPORTE //////////////////////////
export const rpassaporteTableData = {
  rpassaporte_regs: [{
    id: '',
    id_pfisica: '',
    id_pjuridica: 0,
    id_pais: 0,
    pais: '',
    nome: '',
    numero: '',
    id_pais_emissao: 0,
    pais_emissao: '',
    dt_emissao: '',
    dt_validade: '',
  }],
};

export const rpassaporteFichaData = {
  id: '',
  id_pfisica: '',
  id_pjuridica: 0,
  id_pais: 0,
  pais: '',
  nome: '',
  numero: '',
  id_pais_emissao: 0,
  pais_emissao: '',
  dt_emissao: '',
  dt_validade: '',
  alt_dhsis: '',
};
export const consultaDadosPassaporte = [];

////////// VISTO //////////////////////////
export const rvistoTableData = {
  rvisto_regs: [{
    id: '',
    id_pfisica: '',
    id_pjuridica: 0,
    id_pais: 0,
    pais: '',
    tipo: '',
    numero: '',
    id_mun_emissao: 0,
    mun_emissao: '',
    dt_emissao: '',
    dt_validade: '',
  }],
};

export const rvistoFichaData = {
  id: '',
  id_pfisica: '',
  id_pjuridica: 0,
  id_pais: 0,
  pais: '',
  tipo: '',
  numero: '',
  id_mun_emissao: 0,
  mun_emissao: '',
  dt_emissao: '',
  dt_validade: '',
  alt_dhsis: '',
};
export const consultaDadosVisto = [];

////////// CARTAO //////////////////////////

export const rcartaoTableData = {
  rcartao_regs: [{
    id: 0,
    id_pfisica: 0,
    id_pjuridica: 0,
    id_cartao: 0,
    tipo_cartao: '',
    cartao: '',
    titular: '',
    numero: '',
    validade: '',
    seguranca: '',
    senha: '',
  }],
};

export const rcartaoFichaData = {
  id: 0,
  id_pfisica: 0,
  id_pjuridica: 0,
  id_cartao: 0,
  tipo_cartao: '',
  cartao: '',
  titular: '',
  numero: '',
  validade: '',
  seguranca: '',
  senha: '',
  alt_dhsis: '',
};
export const tipocartaoListaData = [{
  id: '',
  descricao: '',
}];
export const consultaDadosCartao = [];

////////// PERFIL //////////////////////////

export const perfilResumeData = [];

export const perfilListaData = {
  id_pfisica: 0,
  pfisica: '',
  perfil_regs: [{
    id: 0,
    check: false,
    id_perfil: 0,
    tipo: 0,
    dtipo: '',
    perfil: '',
    observacao: '',
  }],
};
export const consultaDadosPerfil = [];

////////// OBSERVACAO //////////////////////////
export const observacaoFichaData = '';

export const consultaDadosObservacao = [];


////////// DASHBOARD /////////////////////

export const dashboardListaData = {
    retorno: 0,
    pagina:'',
    serie_regs: [{
        id: 0,
        serie: '',
        grafico: '',
        dado_regs: [{
            id: 0,
            rotulo: '',
            valor: 0,
         },],
    }],
};