import moment from 'moment';
import api from '../../../../services/api';
import { formatData } from '../../../sistema';
import { showMSG } from '../../../../components';

async function save(url, form, props) {

  const res = await api.put(url, form, { auth: props.auth });
  return res.data.retorno;
}

async function save_Hotsite(id_pfisica, props) {
  //console.log('2 - Save dados contato');

  const hotsite = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));

  const step_2 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_DADOS_COMERCIAIS'));
  const step_3 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_CONTATO'));
  const step_4 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_ENDERECO'));
  const step_5 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_EMERGENCIA'));
  const step_6 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_PASSAPORTE'));
  const step_7 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_PERFIL'));
  const step_8 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_ANEXO'));

  const { modulo_regs } = hotsite;

  ////// SALVA ETAPA POR ETAPA
  modulo_regs.forEach((modulo) => {
    switch (modulo.permissao) {
      case 2:
        if (modulo.acesso) {
          //console.log('save step_2');
          //console.log(step_2);

          const {
            area,
            cargo,
            codempresa,
            complemento,
            id_pjuridica,
            id_profissao,
            pjuridica,
            profissao,
          } = step_2;

          const form = {
            id: id_pfisica,
            area,
            cargo,
            codempresa,
            complemento,
            id_pjuridica,
            id_profissao,
            pjuridica,
            profissao,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const url = '/TsmPFISICA/COMERCIAL_GRAVA';
          save(url, form, props);
        }
        break;
        /// contato
      case 3:
        if (modulo.acesso) {
          //console.log('save step_3');
          //console.log(step_3);

          const {
            celular,
            email,
            facebook,
            fone,
            id_celular,
            id_email,
            id_facebook,
            id_fone,
            id_instagram,
            id_twitter,
            instagram,
            descricao_fone,
            descricao_celular,
            descricao_email,
            descricao_facebook,
            descricao_instagram,
            descricao_twitter,
            twitter,
          } = step_3;

          const form_1 = {
            id: id_fone,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 1,
            endereco: fone,
            descricao: descricao_fone,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const form_2 = {
            id: id_celular,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 2,
            endereco: celular,
            descricao: descricao_celular,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const form_3 = {
            id: id_email,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 3,
            endereco: email,
            descricao: descricao_email,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const form_4 = {
            id: id_facebook,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 4,
            endereco: facebook,
            descricao: descricao_facebook,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const form_5 = {
            id: id_instagram,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 5,
            endereco: instagram,
            descricao: descricao_instagram,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const form_6 = {
            id: id_twitter,
            id_pfisica,
            id_pjuridica: 0,
            tipo: 6,
            endereco: twitter,
            descricao: descricao_twitter,
            inc_usuario: 0,
            alt_usuario: 0,
          };

          const url = '/TsmRCONTATO/GRAVA';
          save(url, form_1, props);
          save(url, form_2, props);
          save(url, form_3, props);
          save(url, form_4, props);
          save(url, form_5, props);
          save(url, form_6, props);
        }
        break;
        /// endereco
      case 4:
        if (modulo.acesso) {
          //console.log('save step_4');
          //console.log(step_4);

          const { endereco_com, endereco_res } = step_4;

          const form_1 = {
            id: endereco_com.com_id_endereco,
            id_pfisica,
            id_pjuridica: '',
            bairro: endereco_com.com_bairro,
            cep: endereco_com.com_cep,
            complemento: endereco_com.com_complemento,
            dtipo: endereco_com.com_dtipo,
            endereco: endereco_com.com_endereco,
            // id_endereco: endereco_com.com_id_endereco,
            id_municipio: endereco_com.com_id_municipio,
            identificacao: endereco_com.com_identificacao,
            logradouro: endereco_com.com_logradouro,
            municipio: endereco_com.com_municipio,
            numero: endereco_com.com_numero,
            tipo: 1,
            // tipo: endereco_com.com_tipo,
          
          };

          const form_2 = {
            id: endereco_res.res_id_endereco,
            id_pfisica,
            id_pjuridica: '',
            bairro: endereco_res.res_bairro,
            cep: endereco_res.res_cep,
            complemento: endereco_res.res_complemento,
            dtipo: endereco_res.res_dtipo,
            endereco: endereco_res.res_endereco,
            id_endereco: endereco_res.res_id_endereco,
            id_municipio: endereco_res.res_id_municipio,
            identificacao: endereco_res.res_identificacao,
            logradouro: endereco_res.res_logradouro,
            municipio: endereco_res.res_municipio,
            numero: endereco_res.res_numero,
            tipo: 2,
            // tipo: endereco_res.res_tipo,
          };

          const url = '/TsmRENDERECO/GRAVA';
          save(url, form_1, props);
          save(url, form_2, props);
        }
        break;
        /// emergencia
      case 5:
        if (modulo.acesso) {
          //console.log('save step_5');
          //console.log(step_5);

          const {
            eme_dparentesco,
            eme_dtelefone1,
            eme_dtelefone2,
            eme_nome,
            eme_ntelefone1,
            eme_ntelefone2,
            eme_observacao,
            eme_par_outros,
            eme_parentesco,
          } = step_5;

          const form = {
            id: id_pfisica,
            eme_dparentesco,
            eme_dtelefone1,
            eme_dtelefone2,
            eme_nome,
            eme_ntelefone1,
            eme_ntelefone2,
            eme_observacao,
            eme_par_outros,
            eme_parentesco,
          };

          const url = '/TsmPFISICA/EMERGENCIA_GRAVA';
          save(url, form, props);
        }
        break;
        /// passaporte
      case 6:
        if (modulo.acesso) {
          //console.log('save step_6');
          //console.log(step_6);

          const {
            dt_emissao,
            dt_validade,
            id_pais,
            id_pais_emissao,
            id_passaporte,
            nome_passaporte,
            numero,
            padrao,
            pais,
            pais_emissao,
          } = step_6;

          const form = {
            id: id_passaporte,
            id_pfisica,
            id_pais,
            id_pais_emissao,
            dt_emissao: formatData(dt_emissao),
            dt_validade: formatData(dt_validade),
            nome_passaporte,
            numero,
            padrao,
            pais,
            pais_emissao,
          };

          const url = '/TsmRPASSAPORTE/GRAVA';
          save(url, form, props);
        }
        break;
        /// perfil
      case 7:
        if (modulo.acesso) {
          // console.log('save step_7');
          // console.log(step_7, form);

          const {  
              // id_pfisica,
              rperfil_regs,               
           } = step_7;

          const form = {
            id_pfisica,
            rperfil_regs,
          };

          const url = '/TsmRPERFIL/HOTSITE_GRAVA';
          save(url, form, props);
       
        }
        break;
        /// anexo
      case 8:
        if (modulo.acesso) {
          //console.log('save step_8');
          //console.log(step_8);
          const {
            file_foto, file_rg, file_cpf, file_pass, file_visto,
          } = step_8;
          const anexos = [file_foto, file_rg, file_cpf, file_pass, file_visto];
          const titulos = ['', 'FOTO_RG_HOTSITE.jpg', 'FOTO_CPF_HOTSITE.jpg', 'FOTO_PASSAPORTE_HOTSITE.jpg', 'FOTO_VISTO_HOTSITE.jpg'];

          ////// EXECUTA OS 4 SAVES P/ CADA TIPO DE FOTO
          for (let x = 0; x < 5; x += 1) {
            if (anexos[x] === undefined) { return; }

            const element = anexos[x];
            const {
              id, tamanho, arquivo, extensao,
            } = element;

            ////// SE ALGUM DOC FOI ANEXADO
            if (tamanho > 0) {
              let data; let
                url;
              ////// CASO FOTO PESSOAL
              if (x === 0) {
                data = {
                  id: parseInt(id_pfisica, 10),
                  foto: arquivo,
                };
                url = '/TsmPFISICA/FOTO_GRAVA';
                ////// ANEXOS RESTANTES
              } else {
                data = {
                  id,
                  id_pfisica: parseInt(id_pfisica, 10),
                  id_pjuridica: 0,
                  id_projeto: 0,
                  id_proservico: 0,
                  id_movimento: 0,
                  data: moment(Date.now()).format('L'),
                  titulo: titulos[x],
                  extensao: '.jpg',
                  tamanho,
                  arquivo,
                  hotsite: x,
                };
                url = '/TsmANEXO/GRAVA';
              }
              save(url, data, props);
            }
          }
        }
        break;
      default: break;
    }
  });
}

async function save_rsvp(id_rsvp, id_projeto, id_pfisica, props) {
  //console.log('3 - Create RSVP');

  const step_1 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_DADOS_PESSOAIS'));
  const step_3 = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_CONTATO'));

  ////// ATUALIZA RSVP
  const { nome_completo } = step_1;
  const { email, celular } = step_3;

  const form = {
    id: id_rsvp,
    id_projeto,
    status: 1,
    nome_completo,
    email,
    telefone: celular,
    id_pfisica,
    hotsite: true,
    //usuario: 0,
    inc_usuario: 0,
    alt_usuario: 0,
  };

  const urlRSVP = '/TsmRSVP/GRAVA';
  const id_retorno = await save(urlRSVP, form, props);

  //console.log('4 - Associa RSVP');
  const dados = {
    id: id_retorno,
    id_projeto,
    id_pfisica,
    usuario: 0,
    inc_usuario: 0,
    alt_usuario: 0,
  };

  const urlAssociar = '/tsmRSVP/COMPARA_GRAVA';
  await save(urlAssociar, dados, props);
  //console.log(associar);

  showMSG('Parabéns', 'Cadastro realizado com sucesso.', 'success', 4000);
}

const saveHotsite = (id_pfisica, props) => {
  const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));
  const { id_projeto, id_rsvp } = userData;

  Promise.all([
    ////// SALVA ETAPAS SEGUINTES
    save_Hotsite(id_pfisica, props),
    ////// SAVE RSVP
    save_rsvp(id_rsvp, id_projeto, id_pfisica, props),
  ]);
};

export default saveHotsite;
