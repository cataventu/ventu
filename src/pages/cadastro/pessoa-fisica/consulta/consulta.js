///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { Link } from 'react-router-dom';
import {
  formatData, formatSituacao, getDados, getPagina, formatHoraDHSIS,
} from '../../../../functions/sistema';
import {
  getAnexoPagina, renderIcon, calculaTamanho, downloadAnexo, consultaAnexo,
} from '../../../../functions/anexo';
import {
  getRContatoPagina, getREnderecoPagina, getRPassaportePagina,
  getRVistoPagina, getRCartaoPagina,
} from '../../../../functions/cadastro/pessoa-fisica/index';
import { getOcorrenciaPagina } from '../../../../functions/sistema/ocorrencias';

function PessoaFisicaConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [exibeDadosComerciais, setExibeDadosComerciais] = useState('hide');
  const [exibeRservico, setExibeRservico] = useState([]);
  const [exibeFamilia, setExibeFamilia] = useState('hide');
  const [exibeEmergencia, setExibeEmergencia] = useState([]);
  const [exibeObservacao, setExibeObservacao] = useState([]);
  const [exibeRcontato, setExibeRcontato] = useState([]);
  const [exibeRendereco, setExibeRendereco] = useState([]);
  const [exibeRpassaporte, setExibeRpassaporte] = useState([]);
  const [exibeRvisto, setExibeRvisto] = useState([]);
  const [exibeRcartao, setExibeRcartao] = useState([]);
  const [exibeRperfil, setExibeRperfil] = useState('hide');

  const [exibeOcorrencias, setExibeOcorrencias] = useState([]);

  const [fornecedor, setFornecedor] = useState(false);
  const [colcodigo, setColCodigo] = useState('hide');

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState('');
  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');

  const [nome_completo, setNome_completo] = useState('');
  const [nome_reserva, setNome_reserva] = useState('');
  const [nome_cracha, setNome_cracha] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [rne, setRne] = useState('');

  const [estrangeira, setEstrangeira] = useState('');
  const [nacional, setNacional] = useState('');
  const [estrangeiro, setEstrangeiro] = useState('');

  const [dgenero, setDgenero] = useState('');
  const [destado_civil, setDestado_civil] = useState('');
  const [dt_nascimento, setDt_nascimento] = useState('');
  const [observacao, setObservacao] = useState('');

  /////// DADOS COMERCIAIS //////////////////////////
  const [pjuridica, setPjuridica] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cargo, setCargo] = useState('');
  const [area, setArea] = useState('');
  const [codempresa, setCodempresa] = useState('');
  const [complemento, setComplemento] = useState('');

  ////// SERVICO /////////////////////////////////////

  const tableColumns_Rservico = [
    {
      dataField: 'servico', text: 'Serviço', sort: true, classes: 'tb-rservico-servico', headerClasses: 'tb-col-4 bg-dark text-white tb-rservico-servico',
    },
    {
      dataField: 'pag_prazo', text: 'Prazo Pagto', sort: true, classes: 'tb-rservico-pag_prazo', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-pag_prazo',
    },
    {
      dataField: 'dpag_criterio', text: 'Critério Pagto', sort: true, classes: 'tb-rservico-dpag_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-dpag-criterio',
    },
    {
      dataField: 'rec_prazo', text: 'Prazo Receb.', sort: true, classes: 'tb-rservico-rec_prazo', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-rec_prazo',
    },
    {
      dataField: 'drec_criterio', text: 'Critério Receb.', sort: true, classes: 'tb-rservico-drec_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-drec_criterio',
    },
  ];
  const [rservico, setRservico] = useState([]);

  ////// RCONTATO /////////////////////////////////////

  const tableColumns_Rcontato = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
  ];

  const [rcontato, setRcontato] = useState([]);

  ////// RENDERECO /////////////////////////////////////

  const tableColumns_Rendereco = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'identificacao', text: 'Identificação', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
    {
      dataField: 'cep', text: 'Cep', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },
  ];
  const [rendereco, setRendereco] = useState([]);

  ///// FAMILIA //////////////////////////////////////////////////
  const [dependente, setDependente] = useState(true);
  const [fam_dparentesco, setFam_dparentesco] = useState('');
  const [fam_pfisica, setFam_pfisica] = useState('');

  ///// EMERGENCIA /////////////////////////////////////////////
  const [eme_nome, setEme_nome] = useState('');
  const [eme_dparentesco, setEme_dparentesco] = useState('');
  const [eme_ntelefone1, setEme_ntelefone1] = useState('');
  const [eme_dtelefone1, setEme_dtelefone1] = useState('');
  const [eme_ntelefone2, setEme_ntelefone2] = useState('');
  const [eme_dtelefone2, setEme_dtelefone2] = useState('');
  const [eme_observacao, setEme_observacao] = useState('');
  const [exibeAnexos, setExibeAnexos] = useState('hide');

  ////// PASSAPORTE //////////////////////////////////////////

  const tableColumns_Rpassaporte = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pais_emissao', text: 'País Emissão', sort: true, headerClasses: 'tb-col-4 sm-4 bg-dark text-white',
    },
    {
      dataField: 'dt_emissao', text: 'Dt Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_validade', text: 'Dt Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rpassaporte, setRpassaporte] = useState([]);

  ////// VISTO  //////////////////////////////////////////

  const tableColumns_Rvisto = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pais', text: 'País Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_emissao', text: 'Dt Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_validade', text: 'Dt Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rvisto, setRvisto] = useState([]);

  ////// CARTAO //////////////////////////////////////////

  const tableColumns_Rcartao = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo_cartao', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-4 bg-dark text-white',
    },
    {
      dataField: 'cartao', text: 'Cartão', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },
    {
      dataField: 'titular', text: 'Titular', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'validade', text: 'Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rcartao, setRcartao] = useState([]);
  //////////// ANEXOS //////////////////////////////////////////

  const tableColumns_anexos = [
    {
      dataField: 'icone', text: 'Tipo', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, headerClasses: 'tb-col-6  sm-2 bg-dark text-white',
    },
    {
      dataField: 'tamanho', text: 'Tamanho', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [listaAnexos, setListaAnexos] = useState([]);

  //////////// PERFIL //////////////////////////////////////////
  const tableColumns_Rperfil = [
    {
      dataField: 'id_perfil', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dtipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-4 bg-dark text-white',
    },
    {
      dataField: 'perfil', text: 'Perfil', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },
    {
      dataField: 'observacao', text: 'Observação', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },

  ];
  const [perfil, setPerfil] = useState([]);
  //////////// OCORRENCIAS //////////////////////////////////////////
  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'projeto', text: 'Projeto', sort: true, headerClasses: 'tb-col-3 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pjuridica', text: 'Fornecedor', sort: true, headerClasses: 'tb-col-3 sm-2 bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dstatus', text: 'Status', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];

  const [ocorrencias, setOcorrencias] = useState([]);

  const rowEvents = {
    //onClick: (e, row, rowIndex) => {
    onClick: (e, row) => {
      //const { id } = props.match.params;
      const id_ocorrencia = row.id;
      const page = `/sistema/ocorrencia/consulta/${id_ocorrencia}`;

      props.history.push(page);
    },
  };

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const data = { id_pfisica: parseInt(id, 10), id_pjuridica: 0 };
      getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${id}`, '@GET_PFISICA_PESSOAL_FICHA');
      getDados(props, `/TsmPFISICA/COMERCIAL_FICHA/${id}`, '@GET_PFISICA_COMERCIAL_FICHA');
      getPagina(props, 'TsmRSERVICO/PAGINA', '@GET_RSERVICO_PAGINA', data, '');
      getRContatoPagina(props, id);
      getREnderecoPagina(props, id);
      getDados(props, `/TsmPFISICA/FAMILIA_FICHA/${id}`, '@GET_PFISICA_FAMILIA_FICHA');
      getDados(props, `/TsmPFISICA/EMERGENCIA_FICHA/${id}`, '@GET_PFISICA_EMERGENCIA_FICHA');
      getRPassaportePagina(props, id);
      getRVistoPagina(props, id);
      getRCartaoPagina(props, id);
      getDados(props, `/TsmRPERFIL/FICHA/${id}`, '@SET_PFISICA_PERFIL_LISTA');
      getOcorrenciaPagina(props, { id_pfisica: id });
      getDados(props, `/TsmPFISICA/OBSERVACAO_FICHA/${id}`, '@GET_PFISICA_OBSERVACAO_FICHA');
      //getDados(props, `/TsmRPERFIL/FICHA/${id}`, '@SET_PFISICA_PERFIL_LISTA');
      getAnexoPagina(props, id, 0, 0, 0, 0);

      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario, fornecedor,
      inc_dhsis, alt_dusuario, alt_dhsis,
      nome_completo, nome_reserva, nome_cracha,
      rg, cpf, rne, nacional, estrangeira,
      dgenero, destado_civil, dt_nascimento,
    } = props.pessoalFichaData;
    const {
      pjuridica, profissao, cargo, area, codempresa, complemento,
    } = props.comercialFichaData;
    const { rservico_regs } = props.rservicoTableData;
    const { rcontato_regs } = props.rcontatoTableData;
    const { rendereco_regs } = props.renderecoTableData;
    const { fam_parentesco, fam_dparentesco, fam_pfisica } = props.familiaFichaData;
    const {
      eme_nome, eme_dparentesco, eme_ntelefone1,
      eme_dtelefone1, eme_ntelefone2, eme_dtelefone2, eme_observacao,
    } = props.emergenciaFichaData;
    const { rpassaporte_regs } = props.rpassaporteTableData;
    const { rvisto_regs } = props.rvistoTableData;
    const { rcartao_regs } = props.rcartaoTableData;
    const { rperfil_regs } = props.perfilListaData;
    const { ocorrencia_regs } = props.tableData;
    const { observacao } = props.observacaoFichaData;
    const { anexo_regs } = props.anexoTableData;
    if (rperfil_regs === undefined) { return; }
    if (id > 0) {
      setId(id);
      //DADOS PESSOAIS
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(inc_dhsis);
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(alt_dhsis);

      setFornecedor(fornecedor);

      setNome_completo(nome_completo);
      setNome_reserva(nome_reserva);
      setNome_cracha(nome_cracha);

      setRg(rg);
      setCpf(cpf);
      setRne(rne);

      setNacional(nacional);
      setEstrangeiro(estrangeiro);
      setEstrangeira(estrangeira);

      setDgenero(dgenero);
      setDestado_civil(destado_civil);
      setDt_nascimento(dt_nascimento);

      //DADOS COMERCIAIS
      setPjuridica(pjuridica);
      setProfissao(profissao);
      setCargo(cargo);
      setArea(area);
      setCodempresa(codempresa);
      setComplemento(complemento);

      //SERVICO
      const _tempRservico = [];
      rservico_regs.forEach((item) => {
        _tempRservico.push({
          servico: item.servico,
          pag_prazo: item.pag_prazo,
          dpag_criterio: item.dpag_criterio,
          rec_prazo: item.rec_prazo,
          drec_criterio: item.drec_criterio,
        });
      });

      setRservico(_tempRservico);

      /// EXIBE/OCULTA TABELA SERVICO
      if (rservico_regs.length > 0) {
        setExibeRservico('show');
      } else {
        setExibeRservico('hide');
      }
      //RCONTATO
      const _tempRcontato = [];

      rcontato_regs.forEach((item) => {
        _tempRcontato.push({
          id: item.id,
          tipo: item.dtipo,
          endereco: item.endereco,
          descricao: item.descricao,
        });
      });

      setRcontato(_tempRcontato);

      /// EXIBE/OCULTA TABELA RCONTATO
      if (rcontato_regs.length > 0) {
        setExibeRcontato('show');
      } else {
        setExibeRcontato('hide');
      }

      //RENDERECO
      const _tempRendereco = [];
      rendereco_regs.forEach((item) => {
        _tempRendereco.push({
          id: item.id,
          tipo: item.dtipo,
          endereco: item.endereco,
          cep: item.cep,
          identificacao: item.identificacao,
        });
      });

      setRendereco(_tempRendereco);

      /// EXIBE/OCULTA TABELA RENDERECO
      if (rendereco_regs.length > 0) {
        setExibeRendereco('show');
      } else {
        setExibeRendereco('hide');
      }

      //FAMILIA
      setDependente(dependente);
      setFam_dparentesco(fam_dparentesco);
      setFam_pfisica(fam_pfisica);

      //EMERGENCIA
      setEme_nome(eme_nome);
      setEme_dparentesco(eme_dparentesco);
      setEme_ntelefone1(eme_ntelefone1);
      setEme_dtelefone1(eme_dtelefone1);
      setEme_ntelefone2(eme_ntelefone2);
      setEme_dtelefone2(eme_dtelefone2);
      setEme_observacao(eme_observacao);

      //// RPASSAPORTE
      const _tempRpassaporte = [];

      rpassaporte_regs.forEach((item) => {
        _tempRpassaporte.push({
          id: item.id,
          pais_emissao: item.pais_emissao,
          dt_emissao: item.dt_emissao,
          dt_validade: item.dt_validade,
          numero: item.numero,
        });
      });

      setRpassaporte(_tempRpassaporte);

      /// EXIBE/OCULTA TABELA  PASSAPORTE
      if (rpassaporte_regs.length > 0) {
        setExibeRpassaporte('show');
      } else {
        setExibeRpassaporte('hide');
      }

      //VISTO
      const _tempRvisto = [];

      rvisto_regs.forEach((item) => {
        _tempRvisto.push({
          id: item.id,
          pais: item.pais,
          dt_emissao: item.dt_emissao,
          dt_validade: item.dt_validade,
          tipo: item.tipo,
          numero: item.numero,

        });
      });

      setRvisto(_tempRvisto);

      /// EXIBE/OCULTA TABELA VISTO
      if (rvisto_regs.length > 0) {
        setExibeRvisto('show');
      } else {
        setExibeRvisto('hide');
      }

      //CARTAO
      const _tempRcartao = [];

      rcartao_regs.forEach((item) => {
        _tempRcartao.push({
          id: item.id,
          tipo_cartao: item.tipo_cartao,
          cartao: item.cartao,
          titular: item.titular,
          numero: item.numero,
          validade: item.validade,
        });
      });

      setRcartao(_tempRcartao);

      /// EXIBE/OCULTA TABELA CARTOES
      if (rcartao_regs.length > 0) {
        setExibeRcartao('show');
      } else {
        setExibeRcartao('hide');
      }

      //PERFIL
      /// EXIBE/OCULTA TABELA PERFIL

      const _tempPerfil = [];
      rperfil_regs.forEach((item) => {
        if (item.check === true) {
          _tempPerfil.push({
            id_perfil: item.id_perfil,
            dtipo: item.dtipo,
            perfil: item.perfil,
            observacao: item.observacao,
          });
          setExibeRperfil('show');
        }
      });
      setPerfil(_tempPerfil);

      //OCORRENCIA
      const _tempOcorrencia = [];
      ocorrencia_regs.forEach((item) => {
        _tempOcorrencia.push({
          id: item.id,
          projeto: item.projeto,
          pjuridica: item.pjuridica,
          data: (item.data.substring(0, 10)),
          dstatus: item.dstatus,

        });
      });

      setOcorrencias(_tempOcorrencia);

      /// EXIBE/OCULTA TABELA OCORRENCIAS
      if (ocorrencia_regs.length > 0) {
        setExibeOcorrencias('show');
      } else {
        setExibeOcorrencias('hide');
      }

      //ANEXO
      const _tempAnexo = [];
      if (anexo_regs.length > 0) {
        anexo_regs.forEach((item) => {
          const _icone = (
            <span onClick={() => downloadAnexo(props, item.id)}>
              {' '}
              { renderIcon(item.extensao, 'h3') }
            </span>
          );
          const _link = (
           
                <Link to={`/cadastro/pessoa-fisica/ficha/${id}/anexo/consulta/${item.id}`}>
                  {item.titulo}
                  </Link>
        
            );

          if (item.id_pfisica === id) {
            _tempAnexo.push({
              icone: _icone,
              data: item.data,
              documento: _link,
              tamanho: calculaTamanho(item.tamanho),
            });
          }
        });

        setListaAnexos(_tempAnexo);
      }

      //FORNECEDOR

      setFornecedor(fornecedor);
      if (fornecedor === true) {
        setColCodigo('show');
        setFornecedor('SIM');
      } else {
        setColCodigo('hide');
      }

      //OBSERVACAO
      setObservacao(observacao);

      if (estrangeira === 'true') {
        setEstrangeira('SIM');
        setEstrangeiro('show');
        setNacional('hide');
      } else {
        setEstrangeira('NÃO');
        setEstrangeiro('hide');
        setNacional('Show');
      }

      /// EXIBE/OCULTA TABELA DADOS COMERCIAIS
      if (pjuridica !== '' || profissao !== '' || cargo !== '' || area !== '') {
        setExibeDadosComerciais('show');
      } else {
        setExibeDadosComerciais('hide');
      }

      /// EXIBE/OCULTA TABELA FAMILIA
      if (dependente === true && fam_parentesco > 0) {
        setExibeFamilia('show');
      } else {
        setExibeFamilia('hide');
      }

      /// EXIBE/OCULTA TABELA EMERGENCIA
      if (eme_nome !== '') {
        setExibeEmergencia('show');
      } else {
        setExibeEmergencia('hide');
      }

      /// EXIBE/OCULTA TABELA OBSERVACAO
      if (observacao !== '') {
        setExibeObservacao('show');
      } else {
        setExibeObservacao('hide');
      }

      /// EXIBE/OCULTA TABELA ANEXOS
      if (anexo_regs.length > 0) {
        setExibeAnexos('show');
      } else {
        setExibeAnexos('hide');
      }
    }
  }, [dependente, estrangeiro, props, props.anexoTableData]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Pessoa Física" />
            {/*DADOS PESSOAIS */}
            {/*LINHA 1 DADOS PESSOAIS */}
            {/*<Row className="p-0 m-0"> */}
            <Row className="pl-3 h5 pt-1 text-left">
              {/*COLUNA 1 */}
              <Col sm={7}>
                <span className="pr-3 text-info">DADOS PESSOAIS</span>
                {' '}
                <hr />
                {/*FORNECEDOR */}
                <Row className={`pl-3 h5 pt-1 text-left ${colcodigo}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Fornecedor:</span>
                    <span className="text-muted">{fornecedor}</span>
                  </Col>
                </Row>

                {/*ESTRANGEIRA */}
                <Row className={`pl-3 h5 pt-1 text-left ${estrangeiro}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Estrangeira:</span>
                    <span className="text-muted">{estrangeira}</span>
                  </Col>
                </Row>
                {/*NOME COMPLETO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nome Completo:</span>
                    <span className="text-muted">{ nome_completo }</span>
                  </Col>
                </Row>
                {/*NOME RESERVA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nome Reserva:</span>
                    <span className="text-muted">{ nome_reserva }</span>
                  </Col>
                </Row>
                {/*APELIDO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Apelido:</span>
                    <span className="text-muted">{ nome_cracha }</span>
                  </Col>
                </Row>

                {/*</Row> */}
                {/*LINHA 2 DADOS PESSOAIS */}
                {/*<Row className="pl-3 h5 pt-1 text-left "> */}
                {/*<Col sm={12}> */}
                {/*RG */}
                <Row className={`pl-3 h5 pt-1 text-left ${nacional}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">RG:</span>
                    <span className="text-muted">{ rg }</span>
                  </Col>
                </Row>
                {/*CPF */}
                <Row className={`pl-3 h5 pt-1 text-left ${nacional}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">CPF:</span>
                    <span className="text-muted">{ cpf }</span>
                  </Col>
                </Row>
                {/*RNE */}
                <Row className={`pl-3 h5 pt-1 text-left ${estrangeiro}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">RNE:</span>
                    <span className="text-muted">{ rne }</span>
                  </Col>
                </Row>
                {/*DT NASC */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Nascimento:</span>
                    <span className="text-muted">{ dt_nascimento }</span>
                  </Col>
                </Row>
                {/*GENERO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Gênero:</span>
                    <span className="text-muted">{ dgenero }</span>
                  </Col>
                </Row>
                {/*ESTADO CIVIL */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Estado Civil:</span>
                    <span className="text-muted">{ destado_civil }</span>
                  </Col>
                </Row>
              </Col>

              {/*COLUNA 2 */}
              <Col sm={5}>
                {/*ID */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ id }</span>
                    </small>
                  </Col>
                </Row>
                {/*SITUACAO */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Situação:</span>
                      <span className="text-muted">{ situacao }</span>
                    </small>
                  </Col>
                </Row>
                {/*INCLUSAO */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Inclusão:</span>
                      <span className="text-muted">
                        { inc_dusuario }
                        {' '}
-
                        {' '}
                        {formatData(inc_dhsis) }
                        {' '}
                        { formatHoraDHSIS(inc_dhsis) }
                      </span>
                    </small>
                  </Col>
                </Row>
                {/*ATUALIZACAO */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Atualização:</span>
                      <span className="text-muted">
                        { alt_dusuario }
                        {' '}
-
                        {' '}
                        {formatData(alt_dhsis) }
                        {' '}
                        { formatHoraDHSIS(alt_dhsis) }
                      </span>
                    </small>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/*DADOS COMERCIAIS     */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeDadosComerciais}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">DADOS COMERCIAIS</span>
                {' '}
                <hr />
                {/*EMPRESA            */}
                <Row className="pl-3 h5 pt-1 text-left ">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Empresa:</span>
                    <span className="text-muted">{ pjuridica }</span>
                  </Col>
                </Row>
                {/*PROFISSAO    */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Profissão:</span>
                    <span className="text-muted">{ profissao }</span>
                  </Col>
                </Row>
                {/*CARGO   */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Cargo:</span>
                    <span className="text-muted">{ cargo }</span>
                  </Col>
                </Row>
                {/*AREA  */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Àrea:</span>
                    <span className="text-muted">{ area }</span>
                  </Col>
                </Row>
                {/*COD EMPRESA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Código Empresa:</span>
                    <span className="text-muted">{ codempresa }</span>
                  </Col>
                </Row>
                {/*COMPLEMENTO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Complemento:</span>
                    <span className="text-muted">{ complemento }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/*TABELA SERVICO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRservico}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">SERVIÇO</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rservico}
                  table-striped
                  columns={tableColumns_Rservico}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*TABELA CONTATOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRcontato}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">CONTATO</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rcontato}
                  table-striped
                  columns={tableColumns_Rcontato}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {' '}
            {/*TABELA RENDERECO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRendereco}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">ENDEREÇO</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rendereco}
                  table-striped
                  columns={tableColumns_Rendereco}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*FAMILIA */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeFamilia}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">FAMÍLIA</span>
                {' '}
                <hr />
                {/*PARENTESCO */}
                <Row className="pl-3 h5 pt-1 text-left ">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Grau de Parentesco:</span>
                    <span className="text-muted">{ fam_dparentesco }</span>
                  </Col>
                </Row>

                {/*DEPENDENTE */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Dependente de:</span>
                    <span className="text-muted">{ fam_pfisica }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/*EMERGENCIA */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeEmergencia}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">EMERGÊNCIA</span>

                {' '}
                <hr />
                {/*NOME */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nome:</span>
                    <span className="text-muted">{ eme_nome }</span>
                  </Col>
                </Row>
                {/*PARENTESCO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Parentesco:</span>
                    <span className="text-muted">{ eme_dparentesco }</span>
                  </Col>
                </Row>
                {/*TEL 1 */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Telefone 1:</span>
                    <span className="text-muted">{ eme_ntelefone1 }</span>
                  </Col>
                </Row>
                {/*DESC TEL 1 */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descrição 1:</span>
                    <span className="text-muted">{ eme_dtelefone1 }</span>
                  </Col>
                </Row>
                {/*TEL 2 */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Telefone 2:</span>
                    <span className="text-muted">{ eme_ntelefone2 }</span>
                  </Col>
                </Row>
                {/*DESC TEL 2 */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descrição 2:</span>
                    <span className="text-muted">{ eme_dtelefone2 }</span>
                  </Col>
                </Row>
                {/*OBSERVACAO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Observação:</span>
                    <span className="text-muted">{ eme_observacao }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/*TABELA RPASSAPORTE */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRpassaporte}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">PASSAPORTE</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rpassaporte}
                  table-striped
                  columns={tableColumns_Rpassaporte}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*TABELA RVISTO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRvisto}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">VISTO</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rvisto}
                  table-striped
                  columns={tableColumns_Rvisto}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*TABELA CARTAO */}
            <Row className={`pl-3 h6 pt-1 text-left ${exibeRcartao}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">CARTÃO</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rcartao}
                  table-striped
                  columns={tableColumns_Rcartao}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*TABELA PERFIL */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRperfil}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">PERFIL</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={perfil}
                  table-striped
                  columns={tableColumns_Rperfil}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*TABELA OCORRENCIAS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeOcorrencias}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">OCORRÊNCIAS</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  rowEvents={rowEvents}
                  data={ocorrencias}
                  table-striped
                  columns={tableColumns}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>

            {/*OCORRENCIAS */}
            {/*<Row className="pl-3 h4 pt-1 text-left ">
              {/*TABELA OCORRENCIAS */}
            {/*<span className="pr-3 text-info">OCORRÊNCIAS</span>
              {' '}
              <hr />

              <Table size="sm" striped className="mb-3">
                <thead>
                  <tr>
                    <th width={90} className="h5 bg-dark text-white ">Id</th>
                    <th width="auto" className="h5 bg-dark text-white ">Projeto</th>
                    <th width="auto" className="h5 bg-dark text-white ">Fornecedor</th>
                    <th width={90} className="h5 bg-dark text-white text-left">Data</th>
                    <th width={90} className="h5 bg-dark text-white text-left">Status</th>
                  </tr>
                </thead>
                { ocorrencias }
              </Table>
            </Row> */}
            {' '}

            {/*OBSERVACAO   */}
            <Row className={`pl-3 h5 pt-3 text-left ${exibeObservacao}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">OBSERVAÇÃO</span>
                {' '}
                <hr />
                <br />
                <span className="text-muted">{ observacao }</span>
              </Col>
            </Row>
            {/*ANEXOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeAnexos}`}>
              {/*<Row className="pl-3 h6 pt-1 text-left "> */}
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info">ANEXOS</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={listaAnexos}
                  table-striped
                  columns={tableColumns_anexos}
                  bootstrap4
                  bordered={false}
                />

              </Col>
            </Row>
            <ConsultaFooter />
          </div>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  pessoalFichaData: state.pFisica.pessoalFichaData,
  comercialFichaData: state.pFisica.comercialFichaData,
  rservicoTableData: state.pFisica.rservicoTableData,
  rcontatoTableData: state.pFisica.rcontatoTableData,
  renderecoTableData: state.pFisica.renderecoTableData,

  familiaFichaData: state.pFisica.familiaFichaData,
  emergenciaFichaData: state.pFisica.emergenciaFichaData,
  rpassaporteTableData: state.pFisica.rpassaporteTableData,
  rvistoTableData: state.pFisica.rvistoTableData,
  rcartaoTableData: state.pFisica.rcartaoTableData,
  perfilListaData: state.pFisica.perfilListaData,
  tableData: state.ocorrencia.tableData,
  observacaoFichaData: state.pFisica.observacaoFichaData,
  anexoTableData: state.anexo.anexoTableData,
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaConsulta);
