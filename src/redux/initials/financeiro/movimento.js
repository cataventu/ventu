export const filtroData = {
  chave: '',
  descricao: '',
  situacao: '',
  alt_dhsis_maior: '',
  alt_dhsis_menor: '',
};

export const tableData = [{
  id: '0',
  status: '0',
  dstatus: '',
  restrito: false,
  pessoa: '0',
  dpessoa: '',
  id_pfisica: '0',
  id_pjuridica: '0',
  nome_pessoa: '',
  nome_pessoa2: '',
  documento: '0',
  ddocumento: '',
  ndocumento: '',
  dt_ocorrencia: '',
  dt_vencimento: '',
  dt_pagamento: '',
  id_grupo: '0',
  grupo: '',
  id_subgrupo: '0',
  subgrupo: '',
  id_conta: '0',
  forma: '0',
  descricao: '',
  observacao: '',
  agrupamento: false,
  inc_usuario: '0',
  inc_dusuario: '',
  inc_dhsis: '',
  alt_usuario: '0',
  alt_dusuario: '',
  alt_dhsis: '',
  filho_regs: [],
  buttons: '',
}];

export const tableDataAgrupar = {

  id: '0',
  status: '0',
  dstatus: '',
  restrito: false,
  pessoa: '0',
  dpessoa: '',
  id_pfisica: '0',
  id_pjuridica: '0',
  nome_pessoa: '',
  nome_pessoa2: '',
  documento: '0',
  ddocumento: '',
  ndocumento: '',
  dt_ocorrencia: '',
  dt_vencimento: '',
  dt_pagamento: '',
  id_grupo: '0',
  grupo: '',
  id_subgrupo: '0',
  subgrupo: '',
  id_conta: '0',
  forma: '0',
  descricao: '',
  observacao: '',
  inc_usuario: '0',
  inc_dusuario: '',
  inc_dhsis: '',
  alt_usuario: '0',
  alt_dusuario: '',
  alt_dhsis: '',
  filho_regs: [
    {
      id_pai: 0,
      check: false,
      id: 0,
      transacao: 0,
      pessoa: 0,
      dpessoa: '',
      id_pfisica: 0,
      id_pjuridica: 0,
      nome_pessoa: '',
      documento: '',
      dt_vencimento: '',
      valor_pago: '',
      moeda: '',
      descricao: '',
      alt_usuario: 0,
      alt_dhsis: '',
    },
  ],
};

export const fichaData = {
  id: '0',
  status: '0',
  dstatus: '',
  transacao: '0',
  dtransacao: '',
  restrito: '',

  pessoa: '0',
  dpessoa: '',
  id_pfisica: '0',
  id_pjuridica: '0',
  nome_pessoa: '',
  nome_pessoa2: '',

  documento: '',
  ddocumento: '',
  ndocumento: '',
  dt_ocorrencia: '',
  dt_vencimento: '',
  dt_pagamento: '',

  id_projeto: '0',
  projeto: '',

  id_proservico: '0',
  proservico: '',

  id_grupo: '0',
  grupo: '',
  id_subgrupo: '0',
  subgrupo: '',

  id_moeda: '0',
  moeda: '',

  id_conta: '0',
  conta: '',

  valor_original: '',
  cambio: '',
  tipo_negociacao: '0',
  dtipo_negociacao: '',
  valor_negociacao: '',
  valor_pago: '',

  forma: '0',
  dforma: '',
  nforma: '',

  descricao: '',
  observacao: '',
  origem: '0',
  dorigem: '',

  id_parcelamento: 0,
  parcela_regs: [],
  alt_dhsis: '',

};
//original
//export const parcelamentoFicha= {
//id: 0,
//descricao: "",
//dt_vencimento: "",
//filho_regs: [],
//nome_pessoa: "",
//subgrupo: "",
//valor_original: 0,
//};

/// modificado em 11/06/2020 >> requer todos os dados para alimentar na gravaçao - problema de retorno sem nome_pessoa | id_pf/pj
export const parcelamentoFicha = {
  id: 0,
  status: 0,
  dstatus: '',
  transacao: 0,
  dtransacao: '',
  restrito: 0,
  pessoa: 0,
  dpessoa: '',
  id_pfisica: 0,
  id_pjuridica: 0,
  nome_pessoa: '',
  nome_pessoa2: '',
  documento: 0,
  ddocumento: '',
  ndocumento: '',
  dt_ocorrencia: '',
  dt_vencimento: '',
  dt_pagamento: '',
  id_projeto: 0,
  projeto: '',
  id_grupo: 0,
  grupo: '',
  id_subgrupo: 0,
  subgrupo: '',
  id_moeda: 0,
  moeda: '',
  id_conta: 0,
  conta: '',
  valor_original: '',
  cambio: 0,
  tipo_negociacao: 0,
  dtipo_negociacao: '',
  valor_negociacao: 0,
  valor_pago: '',
  forma: 0,
  dforma: '',
  nforma: '',
  id_cartaocorp: 0,
  cartaocorp: '',
  descricao: '',
  observacao: '',
  origem: 0,
  dorigem: '',
  id_parcelamento: 0,
  alt_dhsis: '',
  filho_regs: [
    //id_pai: 0,
    //parcela: "",
    //dt_vencimento: "",
    //valor_original: "",

  ],
};

export const statusMovimentoListaData = [];
export const transacaoListaData = [];
export const tipoDocumentoListaData = [];
export const tipoNegociacaoListaData = [];
export const tipoFormaListaData = [];

export const movimentoConsulta = [];

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