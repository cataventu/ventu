import api from '../../../services/api';

function getDadosAdicionais(response) {
  const temp = [];
  const dados = response.data;
  dados.forEach((item) => {
    const {
      pessoa, id_pfisica, id_pjuridica, nome_pessoa, gera_pagto,
    } = item;

    let id;
    const descricao = nome_pessoa;
    if (parseInt(pessoa, 10) === 1) { id = id_pfisica; }
    if (parseInt(pessoa, 10) === 2) { id = id_pjuridica; }

    temp.push({
      id,
      descricao,
      dados_adicionais: {
        gera_pagto, id_pfisica, id_pjuridica, pessoa,
      },
    });
  });

  return temp;
}

const autoCompletarV2 = async (props, value, tabela, campo) => {
  let url;

  if (value.length >= 3) {
    switch (tabela) {
      case 'SOLICITANTE': url = `/TsmPFISICA/PESQUISA/${value}`; break;

      case 'TITULAR': url = `/TsmPFISICA/TITULAR_PESQUISA/${campo}/${value}`; break;
      case 'ACOMPANHANTE': url = `/TsmPFISICA/PESQUISA/${value}`; break;

      case 'AEROPORTO_ORIGEM': url = `/TsmAEROPORTO/PESQUISA/${value}`; break;
      case 'AEROPORTO_DESTINO': url = `/TsmAEROPORTO/PESQUISA/${value}`; break;

      case 'PAISEMISSAO': url = `/TsmPAIS/PESQUISA/PAIS/${value}`; break;
      case 'RSERVICO': url = `/TsmSERVICO/PESQUISA/${campo}/${value}`; break;
      case 'PROSERVICO': url = `/TsmPROSERVICO/PESQUISA/${campo}/${value}`; break;

      case 'REPRESENTANTE': url = `/TsmFORNECEDOR/PESQUISA/${campo}/${value}`; break;
      case 'CREDOR': url = `/TsmFORNECEDOR/PESQUISA/${campo}/${value}`; break;

      case 'RFA_PFISICA': url = `/TsmPFISICA/PESQUISA/${value}`; break;
      case 'RFA_PJURIDICA': url = `/TsmPJURIDICA/PESQUISA/${value}`; break;

      case 'RES_MUNICIPIO': url = `/TsmMUNICIPIO/PESQUISA/${value}`; break;
      case 'COM_MUNICIPIO': url = `/TsmMUNICIPIO/PESQUISA/${value}`; break;

      case 'WOO_PFISICA': url = `/TsmPFISICA/PESQUISA/${value}`; break;
      case 'WOO_PJURIDICA': url = `/TsmPJURIDICA/PESQUISA/${value}`; break;

      case 'STEP06_PFISICA': url = `/TsmPFISICA/PESQUISA/${value}`; break;
      case 'STEP06_PJURIDICA': url = `/TsmPJURIDICA/PESQUISA/${value}`; break;

      case 'USUARIO_ORIGEM': url = `/TsmUSUARIO/PESQUISA/${value}`; break;
      case 'USUARIO_DESTINO': url = `/TsmUSUARIO/PESQUISA/${value}`; break;

      ////// busca default //////
      default:
        if (campo !== undefined && campo.length > 0) {
          url = `/Tsm${tabela}/PESQUISA/${campo}/${value}`;
        } else {
          url = `/Tsm${tabela}/PESQUISA/${value}`;
        }
    }

    ////// RECEBE DADOS API ////////
    const response = await api.get(url, { auth: props.auth });
    ////// ATUALIZA STORE ////////
    const { dispatch } = props;

    if (response.data !== undefined) {
      ////// DADOS ADICIONAIS //////
      let saida = [];

      switch (tabela) {
        case 'FORNECEDOR': saida = getDadosAdicionais(response); break;
        case 'REPRESENTANTE': saida = getDadosAdicionais(response); break;
        case 'CREDOR': saida = getDadosAdicionais(response); break;
        case 'CONTRATANTE':

          const dados = response.data;
          dados.forEach((item) => {
            const {
              pessoa, id_pfisica, id_pjuridica, nome_pessoa, padrao,
            } = item;

            let id;
            const descricao = nome_pessoa;
            if (parseInt(pessoa, 10) === 1) { id = id_pfisica; }
            if (parseInt(pessoa, 10) === 2) { id = id_pjuridica; }

            saida.push({
              id,
              descricao,
              dados_adicionais: {
                padrao, id_pfisica, id_pjuridica, pessoa,
              },
            });
          });

          break;
        default: saida = response.data;
      }

      dispatch({ type: `@SET_AUTOCOMPLETAR_${tabela}`, payload: saida });
      return saida;
    }
  }
  return false;
};

export default autoCompletarV2;
