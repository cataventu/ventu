import api from '../../../../services/api';
import { getDados, getPagina, getCurrentDate } from '../../../sistema';
import { showMSG } from '../../../../components';

const duplicarMovimento = async (props, id_movimento) => {
  /// 1 - pegar a ficha do movimento a ser duplicado
  const url_1 = `/TsmMOVIMENTO/FICHA/${id_movimento}`;
  const ficha = await getDados(props, url_1, '');

  const {
    cambio,
    cartaocorp,
    conta,
    descricao,
    documento,
    forma,
    grupo,
    id_cartaocorp,
    id_conta,
    id_grupo,
    id_moeda,
    id_parcelamento,
    id_pfisica,
    id_pjuridica,
    id_projeto,
    id_proservico,
    id_subgrupo,
    ndocumento,
    nforma,
    observacao,
    origem,
    pessoa,
    projeto,
    proservico,
    restrito,
    subgrupo,
    status,
    tipo_negociacao,
    transacao,
    valor_negociacao,
    valor_original,
    valor_pago,
  } = ficha;

  /// Bloquear movimentos indevidos
  if (status === 4 || origem === 3) {
    showMSG('Bloqueado!', 'Não é permitido duplicar movimentos AGRUPADOS ou PARCELADOS.', 'error', 4000);
    return;
  }

  const dataAtual = getCurrentDate();

  const newFicha = {
    id: 0,
    alt_usuario: props.user.id,
    inc_usuario: props.user.id,
    cambio,
    cartaocorp,
    conta,
    descricao,
    documento,
    dt_ocorrencia: dataAtual,
    dt_pagamento: dataAtual,
    dt_vencimento: dataAtual,
    forma,
    grupo,
    id_cartaocorp,
    id_conta,
    id_grupo,
    id_moeda,
    id_parcelamento,
    id_pfisica,
    id_pjuridica,
    id_projeto,
    id_proservico,
    id_subgrupo,
    ndocumento,
    nforma,
    observacao,
    origem,
    pessoa,
    projeto,
    proservico,
    restrito,
    status: 1,
    subgrupo,
    tipo_negociacao,
    transacao,
    valor_negociacao,
    valor_original,
    valor_pago,
  };

  /// 2 - criar novo movimento
  const url_2 = '/TsmMOVIMENTO/INCLUI';
  const duplicado = await api.post(url_2, newFicha, { auth: props.auth });
  const { retorno, msgerro } = duplicado.data;

  /// 3 - recarrega pagina
  const url_3 = '/TsmMOVIMENTO/PAGINA/';
  const action = '@GET_MOVIMENTO_PAGINA';
  const filtro = JSON.parse(localStorage.getItem('TABELAS_MOVIMENTO_FILTRO'));
  const flag = '@SET_MOVIMENTO_FILTRO_FLAG_FALSE';
  getPagina(props, url_3, action, filtro, flag);

  /// 4 - msg sucesso
  retorno > 0
    ? showMSG('MOVIMENTO', 'Registro duplicado com sucesso.', 'success', 2500)
    : showMSG('MOVIMENTO', msgerro, 'error', 2500);
};

export default duplicarMovimento;
