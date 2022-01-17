import api from '../../../services/api';
import { showMSG } from '../../../components';
import { checkValidation, formatData } from '../../sistema';

///////// AGRUPAR ///////////////
/////////////////////////////////
export const saveAgrupar = async (props, formDados) => {
  if (checkValidation()) {
    const filhos = document.getElementById('movimento-agrupar-table-data').childNodes[1].rows;
    const arrayFilhos = [];

    const {
      id, dt_ocorrencia, dt_vencimento, status, restrito, pessoa,
      id_pfisica, id_pjuridica, documento, ndocumento, dt_pagamento,
      id_subgrupo, descricao, observacao, alt_dhsis,
    } = formDados;

    const UserID = props.user.id;

    filhos.forEach((row) => {
      const Checked = row.children[0].children[0].checked;
      const id_filho = parseInt(row.children[1].innerText, 10);
      const alt_dhsis = row.children[6].innerText;

      arrayFilhos.push(
        {
          id_pai: id,
          check: Checked,
          id: id_filho,
          inc_usuario: UserID,
          alt_usuario: UserID,
          alt_dhsis,
        },
      );
    });

    const data = {
      id,
      dt_ocorrencia,
      dt_vencimento,

      status,
      restrito,

      pessoa,
      id_pfisica,
      id_pjuridica,

      documento,
      ndocumento,
      dt_pagamento: formatData(dt_pagamento),
      id_subgrupo,

      descricao,
      observacao,

      inc_usuario: UserID,
      alt_usuario: UserID,
      alt_dhsis,
      filho_regs: arrayFilhos,

    };

    ////// Envia requisição API //////
    const url = '/TsmMOVIMENTO/AGRUPAMENTO_GRAVA';
    const response = await api.put(url, data, { auth: props.auth });

    if (response.data.retorno === 0) {
      //////// Notificação falha //////
      showMSG('Error', response.data.msgerro, 'error', 2500);
    } else {
      ////////// Notificação Sucesso //////
      showMSG('Agrupamento', 'Cadastro realizado com sucesso!', 'success', 2500);
      ////////// REDIRECT //////
      const page = '/financeiro/movimento';
      props.history.push(page);
    }
  }
};
