import api from '../../../../services/api';
import { showMSG } from '../../../../components';
import { checkValidation } from '../../../sistema';
import { getOrcamentoPagina } from '..';

const duplicarOrcamento = async (props, id_orcamento) => {
  if (checkValidation()) {
    /// ETAPA 1 - EXECUTA DUPLICA
    const formDuplica = {
      id: id_orcamento,
      usuario: props.user.id,
    };
    const url = '/TsmORCAMENTO/DUPLICA';
    const response = await api.put(url, formDuplica, { auth: props.auth });

    const { retorno, msgerro } = response.data;

    retorno === 0
      ? showMSG('Error', msgerro, 'error', 2500)
      : showMSG('Orçamento', 'Cadastro realizado com sucesso!', 'success', 2500);

    /// ETAPA 2 - CARREGA PAGINA
    const { id } = props.match.params;
    const formPagina = { id_projeto: parseInt(id, 10) };
    const novaPagina = await getOrcamentoPagina(props, formPagina);
    const { orcamento_regs } = novaPagina;
    return orcamento_regs;
  }
};

export default duplicarOrcamento;
