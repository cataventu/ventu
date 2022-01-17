export const filtroData = {
  chave: '',
  nome: '',
  cnpj: '',
  ramoatividade: '',
  situacao: '',
  alt_dhsis_maior: '',
  alt_dhsis_menor: '',
};

export const tableData = [{
  id: '',
  razao_social: '',
  nome_fantasia: '',
  buttons: '',

}];

export const comercialFichaData = {
  id: '',
  razao_social: '',
  nome_fantasia: '',
  estrangeira: false,
  cnpj: '',
  ie: '',
  nif: '',
  duns: '',
  id_ramoatividade: '',
  ramoatividade: '',
  situacao: true,
  alt_dhsis: '',
};
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
  id_municipio: 0,
  municipio: '',
  alt_dhsis: '',
};

export const rcontatoTableData = {
  rcontato_regs: [{
    id: '',
    id_pfisica: 0,
    id_pjuridica: '',
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

export const observacaoFichaData = '';

export const consultaDadosComerciais = [];

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