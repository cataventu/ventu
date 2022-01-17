///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, Container, Col, Row, Table, CardBody,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  PageTitle,
} from '../../../../components';
import { getDados, formatDataInput } from '../../../../functions/sistema';
import './style.css';
import {
  DossieTitulo, DossieLabel, DossieLinha, DossieSubTitulo,
} from '../components';
import dossieConsulta from '../../../../functions/projeto/dossie/dossieConsulta';
import dossieAprovado from '../../../../functions/projeto/dossie/dossieAprovado';
import dossieParticipanteTag from '../../../../functions/projeto/dossie/dossieParticipanteTag';
import dossieParticipante_par_nome_completo from '../../../../functions/projeto/dossie/dossieParticipante_par_nome_completo';

import dossieEmergenciaTag from '../../../../functions/projeto/dossie/dossieEmergenciaTag';
import dossieFornecedor from '../../../../functions/projeto/dossie/dossieFornecedor';
import dossieMelhoridade from '../../../../functions/projeto/dossie/dossieMelhoridade';
import dossieAereo from '../../../../functions/projeto/dossie/dossieAereo';
import dossieTM from '../../../../functions/projeto/dossie/dossieTM';
import dossieDespertar from '../../../../functions/projeto/dossie/dossieDespertar';

import consultaDossie from '../../../../functions/projeto/dossie/consultaDossie';

import { dossieAniversario, dossiePassaporte } from '../../../../redux/initials/projeto/dossie';
import moment from 'moment';

import ConsultaFooterDossie from '../../../../components/ConsultaFooterDossie';
import ConsultaHeaderDossie from '../../../../components/ConsultaHeaderDossie';

import * as TC from './tableColumns';

import { data } from 'jquery';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  //var descricao do perfil - teste
  const [campo_regs, set_campo_regs] = useState([]);
  const [perfis_regs, set_perfis_regs] = useState([]);
  const [despertar_regs, set_despertar_regs] = useState([]);

  // const [aereo_regs, set_aereo_regs] = useState([]);

  const [permissao, set_permissao] = useState('');

  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fuso, setFuso] = useState('');
  const [dt_inicio, set_dt_inicio] = useState('');
  const [dt_termino, set_dt_termino] = useState('');
  const [vagas, set_vagas] = useState('');

  const [tbody, setTbody] = useState([]);
  const [dados, setDados] = useState([]);
  const [dados_perfil, setDados_perfil] = useState([]);

  const [fichaDataProjeto, set_fichaDataProjeto] = useState({});

  const [fichaDossie, set_fichaDossie] = useState({});
  //PARTICIPANTE
  const [num_participante, set_num_participante] = useState('');
  const [num_cliente, set_num_cliente] = useState('');
  const [num_coordenador, set_num_coordenador] = useState('');
  const [num_batedor, set_num_batedor] = useState('');
  const [num_motorista, set_num_motorista] = useState('');
  const [num_interprete, set_num_interprete] = useState('');
  const [num_total, set_num_total] = useState('');

  const [fichaDataAprovado, set_fichaDataAprovado] = useState({});

  /////////////////////////////////

  const [participante_tag, set_Participante_tag] = useState([]);
  const [participante_par, set_Participante_par] = useState([]);
  const [emergencia_tag, set_emergencia_tag] = useState([]);
  const [fornecedor, set_fornecedor] = useState([]);
  const [passaporte, set_passaporte] = useState([]);
  const [despertar, set_despertar] = useState([]);
  const [despertar2, set_despertar2] = useState([]);
  const [despertarHotel, set_despertarHotel] = useState([]);
  const [aniversario, set_aniversario] = useState([]);
  const [melhoridade, set_melhoridade] = useState([]);
  const [cabecalho_aereo, set_cabecalho_aereo] = useState([]);
  const [aereo1, set_aereo1] = useState([]);
  const [aereo2, set_aereo2] = useState([]);
  const [linha_aereo, set_linha_aereo] = useState([]);
  const [perfil, set_perfil] = useState([]);
  const [tempomov, set_tempomov] = useState([]);
  const [rtempomov, set_rtempomov] = useState([]);
  const [anexo_regs, set_anexo_regs] = useState([]);

  const [rcontato, set_rcontato] = useState([]);
  const [rendereco, set_rendereco] = useState([]);

  const [visibilityServicos, set_visibilityServicos] = useState('hide');
  const [visibilityDestaque, set_visibilityDestaque] = useState('hide');
  const [visibilityLocal, set_visibilityLocal] = useState('hide');
  const [visibilityMapa, set_visibilityMapa] = useState('hide');

  useEffect(() => {
    props.dossieTM.servicos
      ? set_visibilityServicos('')
      : set_visibilityServicos('hide');

    props.dossieTM.destaque
      ? set_visibilityDestaque('')
      : set_visibilityDestaque('hide');

    props.dossieTM.local
      ? set_visibilityLocal('')
      : set_visibilityLocal('hide');

    props.dossieTM.imagem
      ? set_visibilityMapa('')
      : set_visibilityMapa('hide');
  }, [props, props.dossieTM.servicos, props.dossieTM.destaque, props.dossieTM.imagem, props.dossieTM.local]);

 
  const tableColumns_pax_tag = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
  ];
  const tableColumns_pax_alpha = [
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
  ];
  const tableColumns_malas = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: '', text: 'Malas', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },

  ];
  const tableColumns_emergencia = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome Completo', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: 'eme_nome', text: 'Contato', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'eme_dparentesco', text: 'Parentesco', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'eme_ntelefone1', text: 'Telefone 1', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'eme_ntelefone2', text: 'Telefone 2', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },

  ];
  const tableColumns_perfil = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'par_nome_completo', text: 'Nome Completo', sort: true, headerClasses: 'tb-col-4 bg-dark text-white',
    },
    {
      dataField: 'observacao', text: 'Descrição', sort: true, headerClasses: 'tb-col-7 bg-dark text-white',
    },

  ];
  const tableColumns_aniversariantes = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome Completo', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: 'aniversario', text: 'Aniversário', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
  ];
  const tableColumns_Idoso = [
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome Completo', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: 'idade', text: 'Idade', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
  ];
  const tableColumns_passaporte = [
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'pais_emissao', text: 'País emissão', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'dt_emissao', text: 'Data emissão', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'dt_validade', text: 'Data validade', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
  ];

  const handleProjeto = useCallback((id) => {
    async function getFichaProjeto(id) {
      const ficha = await dossieConsulta(props, id);
      set_fichaDataProjeto(ficha);
    }
    getFichaProjeto(id);
  }, [props]);

  const handleAprovado = useCallback((id) => {
    async function getFichaAprovado(id) {
      const ficha = await dossieAprovado(props, id);
      set_fichaDataAprovado(ficha);
    }
    getFichaAprovado(id);
  }, [props]);

  const handlePerfil = useCallback((id, campo_regs) => {
    async function getFichaPerfil(id, campo_regs) {
      const perfis = [];
      campo_regs.forEach( async (item) => {
        const res = await getDados(props, `/TsmDOSSIE/PERFIL/${id}/${item.permissao}`, '');
        perfis.push(res)
      });
      set_perfis_regs(perfis)
     
    }
   getFichaPerfil(id, campo_regs);
  }, [props]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const { campo_regs } = props.dossieVisibility;
      
      const perfis = [];
      if (campo_regs.length >= 0) {
        // campo_regs.forEach((item) => {
        //   const res = handlePerfil(id, item.permissao, perfis_regs);
        //   perfis.push(res)
        // });
        // console.log(perfis)
        // set_perfis_regs(perfis)
      
      handlePerfil(id, campo_regs);
      const { despertar_regs } = props.dossieDespertar;
      const despertar = [];
      if (despertar_regs.length >= 0) {

        handleProjeto(id);
        handleAprovado(id);
        getDados(props, `/TsmDOSSIE/PARTICIPANTE/${id}/TAG`, '@GET_DOSSIE_PARTICIPANTE_TAG');
        getDados(props, `/TsmDOSSIE/PARTICIPANTE/${id}/PAR_NOME_COMPLETO`, '@GET_DOSSIE_PARTICIPANTE_PAR_NOME_COMPLETO');
        getDados(props, `/TsmDOSSIE/EMERGENCIA/${id}/TAG`, '@GET_DOSSIE_EMERGENCIA_TAG');
        getDados(props, `/TsmDOSSIE/FORNECEDOR/${id}`, '@GET_DOSSIE_FORNECEDOR');
        getDados(props, `/TsmDOSSIE/PASSAPORTE/${id}`, '@GET_DOSSIE_PASSAPORTE');
        getDados(props, `/TsmDOSSIE/ANIVERSARIO/${id}`, '@GET_DOSSIE_ANIVERSARIO');
        getDados(props, `/TsmDOSSIE/MELHORIDADE/${id}`, '@GET_DOSSIE_MELHORIDADE');
        getDados(props, `/TsmDOSSIE/AEREO/${id}`, '@GET_DOSSIE_AEREO');
        getDados(props, `/TsmDOSSIE/TEMPOMOV/${id}`, '@GET_DOSSIE_TM');
       getDados(props, `/TsmDOSSIE/DESPERTAR/${id}`, '@GET_DOSSIE_DESPERTAR');
      }
    }
  }
    setFirst(false);
  }, [props, firstLoad, handleProjeto, handleAprovado]);

  useEffect(() => {
    const {
      id, codigo, descricao, fuso, dt_inicio, dt_termino, vagas,
    } = fichaDataProjeto;

    const {
      num_participante, num_cliente, num_coordenador, num_batedor, num_interprete, num_motorista,
    } = fichaDataAprovado;

    
    setId(id);
    set_permissao(permissao);
    setCodigo(codigo);
    setDescricao(descricao);
    set_dt_inicio(dt_inicio);
    set_dt_termino(dt_termino);
    set_vagas(vagas);
    setFuso(fuso);

    //### ORCAMENTO

    set_num_participante(num_participante);
    set_num_cliente(num_cliente);
    set_num_coordenador(num_coordenador);
    set_num_batedor(num_batedor);
    set_num_motorista(num_motorista);
    set_num_interprete(num_interprete);

    const _num_total = (num_participante + num_coordenador + num_interprete + num_motorista + num_batedor + num_cliente);
    set_num_total(_num_total);

    //PARTICIPANTES #TAG
    const { participante_regs } = props.dossieParticipante_tag;
    if (participante_regs.length > 0) {
      const _tempParticipanteTag_regs = [];
      participante_regs.forEach((item) => {
        _tempParticipanteTag_regs.push({
          tag: item.tag,
          nome: item.par_nome_completo,
        });
      });
      set_Participante_tag(_tempParticipanteTag_regs);
    }

    //PARTICIPANTES #ALPHA
    //const { participante_regs } = props.dossieParticipante_par_nome_completo;
    if (participante_regs.length > 0) {
      const _tempParticipantePar_regs = [];
      props.dossieParticipante_par_nome_completo.participante_regs.forEach((item) => {
        _tempParticipantePar_regs.push({
          tag: item.tag,
          nome: item.par_nome_completo,
        });
      });
      set_Participante_par(_tempParticipantePar_regs);
    }

    //EMERGENCIA #TAG
    const { emergencia_regs } = props.dossieEmergencia_tag;
    if (emergencia_regs.length > 0) {
      const _tempEmergenciaTag_regs = [];
      emergencia_regs.forEach((item) => {
        _tempEmergenciaTag_regs.push({
          tag: item.tag,
          nome: item.par_nome_completo,
          eme_nome: item.eme_nome,
          eme_dparentesco: item.eme_dparentesco,
          eme_ntelefone1: item.eme_ntelefone1,
          eme_ntelefone2: item.eme_ntelefone2,
        });
      });
      set_emergencia_tag(_tempEmergenciaTag_regs);
    }
    //ANIVERSARIO
    const { aniversario_regs } = props.dossieAniversario;
    if (aniversario_regs.length > 0) {
      const _tempAniversario_regs = [];

      aniversario_regs.forEach((item) => {
        _tempAniversario_regs.push({
          //id: item.id,
          tag: item.tag,
          nome: item.par_nome_completo,
          aniversario: item.aniversario,
        });
      });
      set_aniversario(_tempAniversario_regs);
    }
    // MELHORIDADE
    const { melhoridade_regs } = props.dossieMelhoridade;
    if (melhoridade_regs.length > 0) {
      const _tempmelhoridade_regs = [];
      const tableColumns_despertar = [];
      melhoridade_regs.forEach((item) => {
        _tempmelhoridade_regs.push({
          tag: item.tag,
          nome: item.par_nome_completo,
          idade: item.idade,
        });
      });
      set_melhoridade(_tempmelhoridade_regs);
    }
    //HOSPEDAGEM
    const { despertar_regs } = props.dossieDespertar;
    const _tempdespertar_regs = [];
    if (despertar_regs.length > 0) {
      despertar_regs.forEach((item) => {
        const {
          for_nome_pessoa, data1, data2, data3, rpax_regs,
        } = item;
        rpax_regs.forEach((item) => {
          _tempdespertar_regs.push({
              tag: item.tag,
              nome_completo:item.nome_completo,
              celular: item.celular,
              hos_apto: item.hos_apto,
          });
        });
      });
      set_despertar(_tempdespertar_regs);
      
    }

  //   const { despertar_regs } = props.dossieDespertar;
  //   const _tempdespertar_regs = [];
  //   const _tempdespertar2_regs = [];
  //   if (despertar_regs.length > 0) {
  //    despertar_regs.forEach((item) => {
  //       const {
  //         for_nome_pessoa, data1, data2, data3, rpax_regs,
  //       } = item;
  //       _tempdespertar2_regs.push(
  //         <thead>
  //         <tr>
  //           <th scope="col">TAG</th>
  //           <th scope="col">NOME COMPLETO</th>
  //           <th scope="col">QUARTO</th>
  //           <th scope="col">CELULAR</th>
  //           <th scope="col">{data1}</th>
  //           <th scope="col">{data2}</th>
  //           <th scope="col">{data3}</th>
  //         </tr>
  //       </thead>
  //       );
  //       rpax_regs.forEach((item) => {
  //         _tempdespertar_regs.push(
  //         <tr>
  //           <td>{item.tag}</td>
  //           <td>{item.nome_completo}</td>
  //           <td>{item.celular}</td>
  //           <td></td>
  //           <td></td>
  //           <td></td>
  //           <td></td>
  //         </tr>
       
  //         );
  //       });
  //     });
  //     set_despertar(_tempdespertar_regs);
  //     set_despertar2(_tempdespertar2_regs);
  //  }

    //PERFIL
    const { dtipo, rperfil_regs } = props.dossiePerfil;
    if (rperfil_regs.length > 0) {
      const _temprperfil_regs = [];
      const _temp_dadosrperfil_regs = [];
      _temp_dadosrperfil_regs.push(
        <h6 className="text-dark">
          <b>
            {dtipo}
            {' - '}
            {props.dossiePerfil.descricao}
          </b>
        </h6>,
      );
      rperfil_regs.forEach((item) => {
        _temprperfil_regs.push({
          tag: item.tag,
          nome: item.par_nome_completo,
          observacao: item.observacao,

        });
      });
      setDados_perfil(_temp_dadosrperfil_regs);
      set_perfil(_temprperfil_regs);
    }
    //PASSAPORTE
    const { passaporte_regs } = props.dossiePassaporte;
    const _tempPassaporte_regs = [];
    if (passaporte_regs.length > 0) {
      passaporte_regs.forEach((item) => {
        const {
          id, tag, par_nome_completo, rpassaporte_regs,
        } = item;
        _tempPassaporte_regs.push(
          <h6 className="ml-2 text-info pr-2"> 
                              <b>
                               Tag: {` ${tag.toString().toUpperCase()}` }
                              </b>
                              {' | '}
                              <b>
                               Nome Completo: {` ${par_nome_completo.toString().toUpperCase()}` }
                              </b>
                            </h6>
        );
        rpassaporte_regs.forEach((item) => {
          _tempPassaporte_regs.push({
               numero: item.numero,
               pais_emissao: item.pais_emissao,
               dt_emissao: item.dt_emissao,
               dt_validade: item.dt_validade,
          });
        });
      });
      set_passaporte(_tempPassaporte_regs);
    }

    //VOOS
    const { aereo_regs } = props.dossieAereo;
    const _tempaereo_regs = [];
    const dadosaereo_regs = [];
    const _Cab_aereo_regs = [];
    const _temp_linha_aereo = [];
    if (aereo_regs.length > 0) {
      aereo_regs.forEach((item) => {
        const {
          grupo, dgrupo, num_participante, ritinerario_regs, rpax_regs,
        } = item;
        ritinerario_regs.forEach((item) => {
          dadosaereo_regs.push({
                  cia:item.cia,
                  voo:item.voo,
                  dtemb:item.dtemb,
                  origem:item.origem,
                  destino:item.destino,
                  hremb:item.hremb,
                  hrdes:item.hrdes,
          });
        });
        rpax_regs.forEach((item) => {
          _tempaereo_regs.push({
            nome_reserva: item.nome_reserva,
            nome_completo: item.nome_completo,
           });
        });
      });
      set_aereo1(_tempaereo_regs);
      set_aereo2(dadosaereo_regs);
    }

    //TEMPOS & MOVIMENTOS
    const { tempomov_regs } = props.dossieTM;

    //if (rperfil_regs.length > 0) {
    const _temp_tempomov_regs = [];

    tempomov_regs.forEach((item) => {
      const {
        titulo, dt_inicio, dt_termino, dia_inteiro, link,
        local, descricao, privado, cor, destaque, rtempomov_regs, anexo_regs,
      } = item;
      const _datai = formatDataInput(dt_inicio.substring(0, 10));
      const _dataf = formatDataInput(dt_termino.substring(0, 10));
      const _horai = dt_inicio.substring(11, 16);
      const _horaf = dt_termino.substring(11, 16);
      const newData = moment(_datai).format('LL');
      const dia_semana = moment(_datai).format('dddd');

      let contador = 0;

      _temp_tempomov_regs.push(
      <p className="d-print-pagebreak" />,
      <DossieTitulo titulo="TEMPOS E MOVIMENTOS" />,
        <p>
          {' '}
          <DossieSubTitulo texto={`${dia_semana}, ${newData}`} />
        </p>,
        <div style={{
          backgroundColor: cor,
          width: 16,
          height: 16,
          float: 'left',
        }}
        />,
        <b className="ml-2 text-info pr-2">
          { _horai }
        </b>,
        <b> - </b>,
        <b className="ml-2 text-info pr-2">{ _horaf }</b>,
        <span className="text-dark"><b>{ titulo.toString().toUpperCase() }</b></span>,
      );
      if ( local !== ''){
      _temp_tempomov_regs.push(
        <p className="mt-2 mb-2 text-dark">
          <b className="pr-2">LOCAL:</b>
          { local.toString().toUpperCase() }
        </p>,
      );
      }
      if ( link !== ''){
        _temp_tempomov_regs.push(
          <p className="mt-2 mb-2 text-dark">
            <b className="pr-2">Link:</b>
            { link.toString().toUpperCase() }
          </p>,
        );
        }
      if ( descricao !== ''){
      _temp_tempomov_regs.push(
        <p className="mt-2 mb-2 text-dark" align="justify">
          <b className="pr-2">DESCRIÇÃO:</b>

          { (descricao.toString()).split('\n').map(str => <p className="m-2">{str}</p>) }
        </p>,
      );
      }
      if ( destaque !== ''){
      _temp_tempomov_regs.push(
        <div class="border border-success">
        <p className="mt-2 mb-2 p-2 pl-3 text-dark" align="justify">
         { destaque.toString().split('\n').map(str => <p className="m-2">{str}</p>) } 
        </p>
        </div>,
      
      );
    }


    // while(contador < 1) {
    //   rtempomov_regs.forEach((rtempomov) => {
    //     _temp_tempomov_regs.push(
    //     <div className="m-2">
    //     {' '}
    //    <b className="pr-2 pb-5">SERVIÇOS:</b> 
    //     </div>
    //     );
    //     });
    // contador++;
    //   }
    


     rtempomov_regs.forEach((rtempomov) => {
       
        if ( rtempomov.servico !== ''){  

          while(contador < 1) {
           
              _temp_tempomov_regs.push(
              <div className="m-2">
              {' '}
             <b className="pr-2 pb-5">SERVIÇOS:</b> 
              </div>
              );
             
          contador++;
            }
    

        _temp_tempomov_regs.push(
         
          <ul>
            <li>
              {rtempomov.servico.toString().toUpperCase()}
              {' '}
-
              {' '}
              {rtempomov.for_nome_pessoa.toString().toUpperCase()}
             </li>
          </ul>,
        );

        _temp_tempomov_regs.push(
          <p />,       
        );
        }
      });
      anexo_regs.forEach((anexo) => {
        if (anexo.extensao === '.jpg' || anexo.extensao === '.jpeg' || anexo.extensao === '.gif' || anexo.extensao === '.png') {
          _temp_tempomov_regs.push(
            <br />,
            <p align="center">
              <img
                src={`data:image/jpg;base64, ${anexo.arquivo}`}
                width={545}
              height={345}
              />
              <br />
              {' '}
              <br />
            </p>,
          );
        }
      });
      if (props.dossieVisibility.flag_privado === true){
        if ( privado !== ''){
        _temp_tempomov_regs.push(
        <p className="mt-2 mb-2 text-white d-print-pagebreak" align="justify" >
          ...
        </p>,
        );
        _temp_tempomov_regs.push(
          
          // <div class="card">
          //   <div class="card-body">
          <div class="border border-danger">
              <p className="mt-2 mb-2 text-dark" align="justify">
                <b className="ml-2 pr-2 text-danger">PRIVADO:</b>
                {/* { privado.toString().toUpperCase().split('\n').map(str => <p className="m-2">{str}</p>) }  */}
                { privado.toString().split('\n').map(str => <p className="m-2">{str}</p>) } 
              </p>
          </div>
      
      );
        }
    }
    });

    set_tempomov(_temp_tempomov_regs);

    //FORNECEDOR #TAG
    const { fornecedor_regs } = props.dossieFornecedor;

    //if (fornecedor_regs.length > 0) {
    const _tempDados = [];
    const _DadosRelatorio = [];

    //if (fornecedor_regs.length > 0) {
    fornecedor_regs.forEach((item) => {
      const { for_nome_pessoa, rcontato_regs, rendereco_regs } = item;
      _tempDados.push({
        nome: for_nome_pessoa,
      });
      _DadosRelatorio.push(
        <br />,
        <h6 className="text-dark">
          <b>
            {item.for_nome_pessoa}
          </b>
        </h6>,
      );
      rendereco_regs.forEach((rendereco) => {
        const _endereco = `${rendereco.logradouro} ${rendereco.endereco},  ${rendereco.numero} - ${rendereco.complemento} - ${rendereco.bairro} - ${rendereco.municipio} - ${rendereco.uf} / ${rendereco.pais}`;
        _tempDados.push({
          endereco: _endereco,
        });
        _DadosRelatorio.push(
          <p>
            {_endereco}
          </p>,
        );
      });
      rcontato_regs.forEach((rcontato) => {
        if (rcontato.tipo === 1 || rcontato.tipo === 2) {
          const _tel = `${rcontato.endereco}`;
          _tempDados.push({
            tel: _tel,
          });
          _DadosRelatorio.push(

            <span className="text-info">
              {' '}
              {_tel}
              {' '}
              {' | '}
            </span>,
          );
        }
        if (rcontato.tipo === 3) {
          const _email = `${rcontato.endereco}`;
          _tempDados.push({
            email: _email,
          });
          _DadosRelatorio.push(
            <p>
              <span className="text-info">
                {_email}

              </span>
              {' | '}
            </p>,
            <br />,
          );
        }
      });
     
    });
    _DadosRelatorio.push(

          <p className="col-12 pr-1 d-print-pagebreak" />
     
    );
    set_fornecedor(_tempDados);
    setDados(_DadosRelatorio);
  }, [props, fichaDataProjeto, fichaDataAprovado, dossieParticipanteTag, dossieFornecedor, dossieAniversario, dossiePassaporte, dossieTM, dossieDespertar]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle history={props.history} title="Dossiê" voltar />
        <Card className="p-3">
          {/* <CardBody className="dossie-container"> */}
          <div className="consulta-body">
     
            <ConsultaHeaderDossie titulo="Dossiê" />

            {/*<Row className="border dossie-consulta-container p-2 pt-0"> */}
       
            <Row className="p-0 m-0">
              <Col sm={12}>

            {/*** DADOS PROJETO ***/}
                <>
                  <DossieTitulo titulo="Projeto" />
                  <DossieLinha position="center">
                    <DossieLabel titulo="Id" conteudo={id} />
                    <DossieLabel titulo="Cód" conteudo={codigo} />
                    <DossieLabel titulo="Descrição" conteudo={descricao} />
                  </DossieLinha>
                  <DossieLinha position="center">
                    <DossieLabel titulo="Inicio" conteudo={dt_inicio} />
                    <DossieLabel titulo="Termino" conteudo={dt_termino} />
                    <DossieLabel titulo="Vagas" conteudo={vagas} />
                  </DossieLinha>

                  <DossieLinha position="center">
                    <DossieLabel titulo="Fuso horário" conteudo={fuso} />
                  </DossieLinha>

                </>

            {/*** QTD PARTICIPANTES *  origem orcamento aprovado**/}
              {
                props.dossieVisibility.aprovado
                  ? (
                    <>
                      <DossieTitulo titulo="Aprovado" />
                      <DossieLinha position="center">
                        <DossieLabel titulo="Convidados" conteudo={num_participante} />
                        <DossieLabel titulo="Clientes" conteudo={num_cliente} />
                      </DossieLinha>

                      <DossieLinha position="center">
                        <DossieLabel titulo="Coordenadores" conteudo={num_coordenador} />
                        <DossieLabel titulo="Batedores" conteudo={num_batedor} />
                        <DossieLabel titulo="Motoristas" conteudo={num_motorista} />
                        <DossieLabel titulo="Interpretes" conteudo={num_interprete} />
                      </DossieLinha>
                      <DossieLinha position="center">
                        <DossieLabel titulo="Total" conteudo={num_total} />

                      </DossieLinha>
                    </>
                  )

                  : null
              }

            {/* PARTICIPANTES */}
              {
                props.dossieVisibility.participante
                  ? (
                    <Row className="col-12 pr-1 d-print-pagebreak">
                      <Col sm={12}>
                        <DossieTitulo titulo="Participantes" />
                      </Col>
                      {/*PARTICIPANTES POR TAG */}
                      <Col sm={6} className="col-6 pr-1">
                        <DossieSubTitulo texto="TAG" />
                        <BootstrapTable
                          keyField="id"
                          data={participante_tag}
                          rowClasses="dossie-consulta-table"
                          columns={tableColumns_pax_tag}
                          condensed
                          bootstrap4
                          striped
                          bordered={false}
                        />
                      </Col>

                      {/*PASSAGEIROS POR ALPHA */}
                      <Col sm={6} className="col-6 pr-1">
                        <DossieSubTitulo texto="ALPHA" />
                        <BootstrapTable
                          keyField="id"
                          data={participante_par}
                          rowClasses="dossie-consulta-table"
                          columns={tableColumns_pax_alpha}
                          condensed
                          bootstrap4
                          striped
                          bordered={false}
                        />
                      </Col>

                    </Row>
                  )

                  : null
              }
            {/* VOOS */}
              {
                props.dossieVisibility.voos
                  ? 
                  props.dossieAereo.aereo_regs?.map(aereo => (
                    <Row className="col-12 pr-1 d-print-pagebreak">
                      <Col sm={12} className="col-12 pr-1">
                      <DossieTitulo titulo="VOOS" />
                        <h6 className="ml-2 text-info pr-2"> 
                          <b>
                            GRUPO {` ${aereo.grupo.toString().toUpperCase()}` }
                          </b>
                        </h6>
                        <BootstrapTable
                          keyField="id"
                          data={aereo.ritinerario_regs}
                          rowClasses="dossie-consulta-table"
                          columns={TC.tableColumns_voos}
                          condensed
                          bootstrap4
                          striped
                          bordered={false}
                        />
                      <h6 className="ml-2 text-warning pr-2"> 
                        <b>
                          PASSAGEIROS
                        </b>
                      </h6>
                          <BootstrapTable
                          keyField="id"
                          data={aereo.rpax_regs}
                          rowClasses="dossie-consulta-table"
                          columns={TC.tableColumns_pax_voos}
                          condensed
                          bootstrap4
                          striped
                          bordered={false}
                        />
                      </Col>
                      </Row>
                    ))
                  : null
              }
                   {/*TEMPOS E MOVIMENTOS*/}
            {
              props.dossieVisibility.tm
                ? (
                  <Row className="col-12 pr-1 d-print-pagebreak">
                    <Col sm={12}>
                      {/* <DossieTitulo titulo="TEMPOS E MOVIMENTOS" /> */}
                      <p>
                        { tempomov }
                      </p>
                    </Col>
                  </Row>
                )
                : null
              }
            {/* PERFIL */}
              {
                props.dossieVisibility.perfil
                  ? 
                    perfis_regs?.map(perfil => (
                      <Row className="d-print-pagebreak">
                      <Col sm={12} className="col-12 pr-1">
                          <DossieTitulo titulo={perfil.descricao} />
                          <BootstrapTable
                            keyField="id"
                            condensed
                            bootstrap4
                              data={perfil.rperfil_regs}
                          rowClasses="dossie-consulta-table"
                          columns={tableColumns_perfil}
                            striped
                            bordered={false}
                          />
                        </Col>
                      </Row>
                    )) 
                  : null
                }
            {/* ANIVERSARIO */}
              {
                props.dossieVisibility.aniversariante
                  ? (
                    <Row className="d-print-pagebreak">
                      <Col sm={12} className="col-12 pr-1">
                        <DossieTitulo titulo="ANIVERSARIANTES" />
                        <BootstrapTable
                          keyField="id"
                          data={aniversario}
                          rowClasses="dossie-consulta-table"
                          columns={tableColumns_aniversariantes}
                          condensed
                          bootstrap4
                          striped
                          bordered={false}
                        />
                      </Col>
                    </Row>
                  )
                  : null
              }
            {/*TABELA MELHOR IDADE */}
                {
                  props.dossieVisibility.melhoridade
                    ? (
                      <Row className="d-print-pagebreak">
                        <Col sm={12} className="col-12 pr-1">
                          <DossieTitulo titulo="MELHOR IDADE" />
                          <BootstrapTable
                            keyField="id"
                            data={melhoridade}
                            rowClasses="dossie-consulta-table"
                            columns={tableColumns_Idoso}
                            condensed
                            bootstrap4
                            striped
                            bordered={false}
                          />
                        </Col>
                      </Row>
                    )

                    : null
                }
            {/* CONTROLE DE MALAS */}
                {
                  props.dossieVisibility.malas
                    ? (
                      <Row className="d-print-pagebreak">
                        <Col sm={12} className="col-12 pr-1">
                          <DossieTitulo titulo="CONTROLE DE MALAS" />
                          <Col sm={8} className="col-8 pr-1">
                            <BootstrapTable
                              keyField="id"
                              data={participante_tag}
                              rowClasses="dossie-consulta-table"
                              columns={tableColumns_malas}
                              condensed
                              bootstrap4
                              striped
                              bordered={false}
                            />
                          </Col>
                        </Col>
                      </Row>
                    )
                    : null
                }
            {/* EMERGENCIA */}
                {
                  props.dossieVisibility.emergencia
                    ? (
                      <Row className="d-print-pagebreak">
                        <Col sm={12} className="col-12 pr-1">
                          <DossieTitulo titulo="EMERGÊNCIA" />
                          <BootstrapTable
                            keyField="id"
                            data={emergencia_tag}
                            rowClasses="dossie-consulta-table"
                            columns={tableColumns_emergencia}
                            condensed
                            bootstrap4
                            striped
                            bordered={false}
                          />
                        </Col>
                      </Row>
                    )
                    : null
                }
            {/* DESPERTAR */}
                {
                  props.dossieVisibility.despertar
                    ? (
                     props.dossieDespertar.despertar_regs?.map(despertar => (
                     // despertar_regs?.map(despertar => (
                        <Row className="col-12 pr-1 d-print-pagebreak">
                          <Col sm={12} className="col-12 pr-1">
                          <DossieTitulo titulo="DESPERTAR" />
                            <h6 className="ml-2 text-info pr-2"> 
                              <b>
                               { despertar.for_nome_pessoa }
                              </b>
                            </h6>
                            
                            <BootstrapTable
                              keyField="id"
                              data={despertar.rpax_regs}
                              rowClasses="dossie-consulta-table"
                              columns={[
                                {
                                  dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
                                },
                                {
                                  dataField: 'nome_completo', text: 'Nome Completo', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
                                },
                                {
                                  dataField: 'celular', text: 'Celular', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
                                },
                                {
                                  dataField: 'hos_apto', text: 'Quarto', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
                                },
                                {
                                  dataField: '', text: despertar.data1 , sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
                                },
                                {
                                  dataField: '', text: despertar.data2, sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
                                },
                                {
                                  dataField: '', text: despertar.data3, sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
                                }
                              ]}
                              condensed
                              bootstrap4
                              striped
                              bordered={false}
                            />
                            
                          </Col>
                         </Row>
                      ))  )
                    : null
                }
          
            {/*TITULO PASSAPORTE*/}

          { props.dossieVisibility.passaporte
            ? ( 
            <Row className="col-12 pr-1 d-print-pagebreak">
              <Col sm={12} className="col-12 pr-1">
                <DossieTitulo titulo="PASSAPORTE" />
              </Col>
            </Row>
                    )
                    : null
           }
            {/*PASSAPORTE*/}
           {
             props.dossieVisibility.passaporte
              ? (
               props.dossiePassaporte.passaporte_regs?.map(passaporte => (
                <Row className="col-12">
                  <Col sm={12} className="col-12 pr-1">
                  <h6 className="ml-2 text-info pr-2">  
                        <b>
                          {` ${passaporte.par_nome_completo.toString().toUpperCase()}` }
                        </b>
                        {' | '}
                        <b>
                          Tag: {' '}{` ${passaporte.tag.toString().toUpperCase()}` }
                        </b>
                        
                      </h6> 
                      <BootstrapTable
                        keyField="id"
                        data={passaporte.rpassaporte_regs}
                        rowClasses="dossie-consulta-table"
                        columns={tableColumns_passaporte}
                        condensed
                        bootstrap4
                        striped
                        bordered={false}
                      />
                    </Col>
                  </Row>
                )) 
                      )
                    : null
                }
           
                {/*LISTA FORNECEDOR */}
              {
                props.dossieVisibility.fornecedor
                  ? (
                    <Row className="col-12 pr-1 d-print-pagebreak">
                      <Col sm={12} className="col-12 pr-1 ">
                        <DossieTitulo titulo="FORNECEDOR" />
                        <Col sm={12} className="col-12 pr-1 ">
                          <p>
                            { dados }
                          </p>
                       </Col>
                       </Col>
                    </Row>
                  )
                  : null
              }
             
            </Col>
          </Row>

            {/***********************************/}
            {/**** PRINT ************************/}
            {/***********************************/}
            <ConsultaFooterDossie />
        </div>

        {/* </CardBody> */}
          {/* <ConsultaFooterDossie /> */}
      </Card>
      </Container>

    </>
  );
}
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  dossieVisibility: state.dossie.dossieVisibility,
  nomeProjeto: state.projeto.nomeProjeto,
  dossieParticipante_tag: state.dossie.dossieParticipante_tag,
  participante_regs: state.dossie.dossieParticipante_par_nome_completo,
  dossieParticipante_par_nome_completo: state.dossie.dossieParticipante_par_nome_completo,
  dossieEmergencia_tag: state.dossie.dossieEmergencia_tag,
  dossieFornecedor: state.dossie.dossieFornecedor,
  dossiePassaporte: state.dossie.dossiePassaporte,
  dossieAniversario: state.dossie.dossieAniversario,
  dossieMelhoridade: state.dossie.dossieMelhoridade,
  dossieAereo: state.dossie.dossieAereo,
  descricao: state.dossie.dossiePerfil,
  dossieTM: state.dossie.dossieTM,
  titulo: state.dossie.dossieTM,
  dt_inicio: state.dossie.dossieTM,
  dossieDespertar: state.dossie.dossieDespertar,
  data1: state.dossie.dossieDespertar,
  data2: state.dossie.dossieDespertar,
  data3: state.dossie.dossieDespertar,
  despertar_regs: state.dossie.dossieDespertar,

  dossiePerfil: state.dossie.dossiePerfil,
  campo_regs: state.dossie.dossieFicha,
  permissao: state.dossie.dossieFicha,

  projetoFichaData: state.projeto.projetoFichaData,
  table_participante: state.participantes.tableData,
  orcamentoFichaData: state.projeto.FichaData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ProjetoConsulta);
