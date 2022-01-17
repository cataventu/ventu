import api from '../../../../services/api';
import { getDados } from '../../../sistema';
import getServicoPagina from '../getServicoPagina';
import { showMSG } from '../../../../components';

const duplicarServico = async (props, id) => {
/// 1 - pegar a ficha do serviço a ser duplicado
  const url_1 = `/TsmPROSERVICO/FICHA/${id}`;
  const ficha = await getDados(props, url_1, '');

  const {

    id_projeto,

    ////// STEP 01 - SERVICO
    //status,
    operacao,
    tipo_servico,
    id_servico,

    ////// STEP 02 - FORNECEDOR
    descricao,
    for_pessoa,
    for_id_pfisica,
    for_id_pjuridica,
    for_gera_pagto,

    especificacao,
    hos_tipo,
    hos_apto,

    cnf_data,
    cnf_numero,
    cnf_contato,

    ////// STEP 03 - BILHETE
    rbilhete_regs,

    ////// STEP 04 - TARIFA
    rep_pessoa,
    rep_id_pfisica,
    rep_id_pjuridica,

    rep_nome_pessoa,
    rep_nome_pessoa2,

    cedente,

    cobranca,
    id_moeda,
    cambio,
    em_moeda,

    dt_inicio,
    dt_termino,
    quantidade,
    regime,

    //taxa_aeroportuaria: taxa_aeroportuaria,
    //taxa_embarque: taxa_embarque,

    extra,
    seguro,
    taxa_seguro,

    valor,
    tax_percentual,
    tax_valor,

    tre_percentual,
    tre_valor,
    tre_indice,

    com_percentual,
    com_valor,
    com_indice,

    inc_percentual,
    inc_valor,
    inc_base,

    imp_percentual,
    imp_valor,
    rentabilidade,

    valor_total,
    valor_totalsimp,
    ///////////////////////////
    rec_valortotal,
    pag_valortotal,

    ////// STEP 05 - RECEBIMENTO
    rconrecto_regs,
    ////// STEP 06 - PAGAMENTO
    rconpagto_regs,
    ////// STEP 07 - PAX
    rpax_regs,
    ////// STEP 08 - ITINERARIO
    ritinerario_regs,
    ////// STEP 09 - CAPA BILHETE
    capa_bilhete,
    ////// STEP 10 - OBSERVACAO
    observacao,

  } = ficha;

  const newFicha = {
    id: 0,
    id_projeto,

    ////// STEP 01 - SERVICO
    status: 1,
    operacao,
    tipo_servico,
    id_servico,

    ////// STEP 02 - FORNECEDOR
    descricao,
    for_pessoa,
    for_id_pfisica,
    for_id_pjuridica,
    for_gera_pagto,

    especificacao,
    hos_tipo,
    hos_apto,

    cnf_data,
    cnf_numero,
    cnf_contato,

    ////// STEP 03 - BILHETE
    rbilhete_regs,

    ////// STEP 04 - TARIFA
    rep_pessoa,
    rep_id_pfisica,
    rep_id_pjuridica,

    rep_nome_pessoa,
    rep_nome_pessoa2,

    cedente,

    cobranca,
    id_moeda,
    cambio,
    em_moeda,

    dt_inicio,
    dt_termino,
    quantidade,
    regime,

    //taxa_aeroportuaria: taxa_aeroportuaria,
    //taxa_embarque: taxa_embarque,

    extra,
    seguro,
    taxa_seguro,

    valor,
    tax_percentual,
    tax_valor,

    tre_percentual,
    tre_valor,
    tre_indice,

    com_percentual,
    com_valor,
    com_indice,

    inc_percentual,
    inc_valor,
    inc_base,

    imp_percentual,
    imp_valor,
    rentabilidade,

    valor_total,
    valor_totalsimp,

    rec_valortotal,
    pag_valortotal,

    ////// STEP 05 - RECEBIMENTO
    rconrecto_regs,
    ////// STEP 06 - PAGAMENTO
    rconpagto_regs,
    ////// STEP 07 - PAX
    rpax_regs,
    ////// STEP 08 - ITINERARIO
    ritinerario_regs,
    ////// STEP 09 - CAPA BILHETE
    capa_bilhete,
    ////// STEP 10 - OBSERVACAO
    observacao,

    inc_usuario: props.user.id,
    alt_usuario: props.user.id,

  };

  /// 2 - criar novo movimento
  const url_2 = '/TsmPROSERVICO/INCLUI';
  const duplicado = await api.post(url_2, newFicha, { auth: props.auth });
  const { retorno, msgerro } = duplicado.data;

  /// 3 - recarrega pagina
  const { id: idProjeto } = props.match.params;
  await getServicoPagina(props, idProjeto);
  const { dispatch } = props;

  dispatch({ type: '@SET_PROSERVICO_FLAG_TRUE' });
  dispatch({ type: '@SET_PROSERVICO_DELETE_FALSE' });
  //props.history.push(url_3);

  /// 4 - msg sucesso
  retorno > 0
    ? showMSG('SERVIÇO', 'Registro duplicado com sucesso.', 'success', 2500)
    : showMSG('SERVIÇO', msgerro, 'error', 2500);

  //if (retorno > 0) {
  //const page = `/projeto/painel/${id_projeto}/servicos`;
  //props.history.push(page);
  //}
};
export default duplicarServico;
