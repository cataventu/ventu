import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { getOrcamentoFicha, getROrcamentoPagina } from '..';

const getOrcamentoExcel = async (props, id) => {
  /// ETAPA 1
  const url = `/TsmORCAMENTO/CALCULA/${id}`;
  const response = await api.get(url, { auth: props.auth });
  const { retorno } = response.data;

  if (retorno > 0) {
    showMSG('Orçamento', 'Calculando valores dos serviços.', 'success', 3000);
    /// ETAPA 2 - CARREGA PAGINA
    const { id: id_projeto } = props.match.params;
    const formPagina = { id_projeto, id_orcamento: id };

    /// FICHA ORCAMENTO
    const fichaOrcamento = await getOrcamentoFicha(props, id);

    const {
      tad_percentual, imp_percentual, des_valor, tcl_percentual,
      ser_valor, valor_total, valor_cliente,
    } = fichaOrcamento;

    const vlr_saldo = parseFloat(valor_total) - parseFloat(valor_cliente);

    const ficha = {
      tx_adm: tad_percentual,
      tx_imposto: imp_percentual,
      vlr_desconto: des_valor,
      tx_cliente: tcl_percentual,
      vlr_subtotal: ser_valor,
      vlr_total_cliente: valor_cliente,
      vlr_total: valor_total,
      vlr_saldo,
    };

    /// PAGINA SERVICOS
    const paginaServicos = await getROrcamentoPagina(props, formPagina);
    const { rorcamento_regs } = paginaServicos;

    const retorno = {
      pagina: rorcamento_regs,
      ficha,
    };

    return retorno;
  }
};

export default getOrcamentoExcel;
