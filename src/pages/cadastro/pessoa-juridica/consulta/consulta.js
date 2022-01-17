///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getOcorrenciaPagina } from '../../../../functions/sistema/ocorrencias';
import { getConsultaDadosComerciais } from '../../../../functions/cadastro/pessoa-juridica';
import {
  formatData, formatHoraDHSIS, formatSituacao, getDados, getPagina,
} from '../../../../functions/sistema';
import {
  getAnexoPagina, renderIcon, calculaTamanho, downloadAnexo,
} from '../../../../functions/anexo';

function PessoaJuridicaConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [exibeObservacao, setExibeObservacao] = useState([]);

  ///////// DADOS COMERCIAIS //////////////////////////
  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState('');
  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');

  const [fornecedor, setFornecedor] = useState(false);

  const [colcodigo, setColCodigo] = useState('hide');

  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');
  const [nacional, setNacional] = useState('');
  const [estrangeiro, setEstrangeiro] = useState('');
  const [estrangeira, setEstrangeira] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ie, setIe] = useState('');
  const [nif, setNif] = useState('');
  const [duns, setDuns] = useState('');
  const [ramoatividade, setRamoatividade] = useState('');

  const [observacao, setObservacao] = useState('');
  const [exibeAnexos, setExibeAnexos] = useState('hide');
  const [exibeRendereco, setExibeRendereco] = useState([]);
  const [exibeRservico, setExibeRservico] = useState([]);
  const [exibeRcontato, setExibeRcontato] = useState([]);
  //const [ocorrencias, setOcorrencias] = useState([]);
  const [exibeOcorrencias, setExibeOcorrencias] = useState([]);

  ///////// ENDERECO //////////////////////////

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
      dataField: 'endereco', text: 'Endereco', sort: true, headerClasses: 'tb-col-5 sm-3 bg-dark text-white',
    },
    {
      dataField: 'cep', text: 'Cep', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },

  ];

  const [rendereco, setRendereco] = useState([]);

  ////// SERVICO /////////////////////////////////////

  const tableColumns_Rservico = [
    {
      dataField: 'servico', text: 'Serviço', sort: true, classes: 'tb-rservico-servico', headerClasses: 'tb-col-4 bg-dark text-white tb-rservico-servico',
    },
    {
      dataField: 'pag_prazo', text: 'Prazo Pagto', sort: true, classes: 'tb-rservico-pag_prazo', headerClasses: 'tb-col-1 bg-dark text-white tb-rservico-pag_prazo',
    },
    {
      dataField: 'dpag_criterio', text: 'Critério Pagto', sort: true, classes: 'tb-rservico-dpag_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-dpag-criterio',
    },
    {
      dataField: 'rec_prazo', text: 'Prazo Receb.', sort: true, classes: 'tb-rservico-rec_prazo', headerClasses: 'tb-col-1 bg-dark text-white tb-rservico-rec_prazo',
    },
    {
      dataField: 'drec_criterio', text: 'Critério Receb.', sort: true, classes: 'tb-rservico-drec_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-drec_criterio',
    },
  ];
  const [rservico, setRservico] = useState([]);

  ////// CONTATO /////////////////////////////////////
  const tableColumns_Rcontato = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, headerClasses: 'tb-col-5 sm-3 bg-dark text-white',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
  ];

  const [rcontato, setRcontato] = useState([]);

  ////// ANEXO //////////////////////////////////////////

  const tableColumns_Ocorrencias = [
    {
      dataField: 'id', text: 'ID', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'projeto', text: 'Projeto', sort: true, headerClasses: 'tb-col-3 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pfisica', text: 'Cliente', sort: true, headerClasses: 'tb-col-3  sm-2 bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dstatus', text: 'Status', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];

  const [listaOcorrencias, setListaOcorrencias] = useState([]);

  const rowEvents = {
    //onClick: (e, row, rowIndex) => {
    onClick: (e, row) => {
      const { id } = props.match.params;
      const id_ocorrencia = row.id;
      const page = `/sistema/ocorrencia/consulta/${id_ocorrencia}`;

      props.history.push(page);
    },
  };

  ////// ANEXO //////////////////////////////////////////

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

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaDadosComerciais(props, id);
      const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
      getPagina(props, 'TsmRENDERECO/PAGINA', '@GET_RENDERECO_PAGINA', data, '');
      getPagina(props, 'TsmRSERVICO/PAGINA', '@GET_RSERVICO_PAGINA', data, '');
      getPagina(props, 'TsmRCONTATO/PAGINA', '@GET_RCONTATO_PAGINA', data, '');
      getDados(props, `/TsmPJURIDICA/OBSERVACAO_FICHA/${id}`, '@GET_PJURIDICA_OBSERVACAO_FICHA');
      getOcorrenciaPagina(props, { id_pjuridica: id });
      getAnexoPagina(props, 0, id, 0, 0, 0);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario,
      inc_dhsis, alt_dusuario, alt_dhsis, fornecedor,
      razao_social, nome_fantasia, nacional, estrangeiro, estrangeira,
      cnpj, ie, nif, duns, ramoatividade,
    } = props.consultaDadosComerciais;
    const { rservico_regs } = props.rservicoTableData;
    const { rendereco_regs } = props.renderecoTableData;
    const { rcontato_regs } = props.rcontatoTableData;
    const { ocorrencia_regs } = props.tableData;
    const { observacao } = props.observacaoFichaData;
    const { anexo_regs } = props.anexoTableData;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(inc_dhsis);
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(alt_dhsis);

      setFornecedor(fornecedor);

      setRazao_social(razao_social);
      setNome_fantasia(nome_fantasia);
      setNacional(nacional);
      setEstrangeiro(estrangeiro);
      setEstrangeira(estrangeira);
      setCnpj(cnpj);
      setIe(ie);
      setNif(nif);
      setDuns(duns);
      setRamoatividade(ramoatividade);
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

    /// EXIBE/OCULTA TABELA RENDERECO
    if (rservico_regs.length > 0) {
      setExibeRservico('show');
    } else {
      setExibeRservico('hide');
    }

    //ESTRANGEIRA
    if (estrangeira) {
      setEstrangeira('SIM');
      setEstrangeiro('show');
      setNacional('hide');
    } else {
      setEstrangeira('NÃO');
      setEstrangeiro('hide');
      setNacional('Show');
    }
    //FORNECEDOR

    setFornecedor(fornecedor);
    if (fornecedor === true) {
      setColCodigo('show');
      setFornecedor('SIM');
    } else {
      setColCodigo('hide');
    }

    const _tempOcorrencias = [];
    ocorrencia_regs.forEach((item) => {
      _tempOcorrencias.push({
        id: item.id,
        projeto: item.projeto,
        pfisica: item.pfisica,
        data: item.data,
        dstatus: item.dstatus,
      });
    });

    setListaOcorrencias(_tempOcorrencias);

    /// EXIBE/OCULTA TABELA OCORRENCIAS
    if (ocorrencia_regs.length > 0) {
      setExibeOcorrencias('show');
    } else {
      setExibeOcorrencias('hide');
    }

    //OBSERVACAO

    setObservacao(observacao);

    /// EXIBE/OCULTA TABELA OBSERVACAO
    if (observacao !== '') {
      setExibeObservacao('show');
    } else {
      setExibeObservacao('hide');
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
           
          <Link to={`/cadastro/pessoa-juridica/ficha/${id}/anexo/consulta/${item.id}`}>
            {item.titulo}
            </Link>
  
      );
        if (item.id_pjuridica === id) {
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

    //EXIBE/OCULTA TABELA ANEXOS
    if (anexo_regs.length > 0) {
      setExibeAnexos('show');
    } else {
      setExibeAnexos('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Pessoa Jurídica" />
            {/*DADOS COMERCIAIS     */}
            <Row className="pl-3 h5 pt-1 text-left">

              {/*COLUNA 1  */}
              <Col sm={7}>
                <span className="pr-3 text-info">DADOS COMERCIAIS</span>
                {' '}
                <hr />
                {/*FORNECEDOR */}
                <Row className={`pl-3 h5 pt-1 text-left ${colcodigo}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Fornecedor:</span>
                    <span className="text-muted">{fornecedor}</span>
                  </Col>
                </Row>

                {/*** ESTRANGEIRA ***/}
                <Row className="pl-3 h5 pt-1 text-left ">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Estrangeira:</span>
                    <span className="text-muted">{ estrangeira}</span>
                  </Col>
                </Row>
                {/*** RAZAO SOCIAL ***/}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Razão Social:</span>
                    <span className="text-muted">{ razao_social }</span>
                  </Col>
                </Row>
                {/*** NOME FANTASIA ***/}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nome Fantasia:</span>
                    <span className="text-muted">{ nome_fantasia }</span>
                  </Col>
                </Row>
                {/*** CNPJ ***/}
                <Row className={`pl-3 h5 pt-1 text-left ${nacional}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">CNPJ:</span>
                    <span className="text-muted">{ cnpj }</span>
                  </Col>
                </Row>
                {/*** IE ***/}
                <Row className={`pl-3 h5 pt-1 text-left ${nacional}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Inscrição Estadual:</span>
                    <span className="text-muted">{ ie }</span>
                  </Col>
                </Row>
                {/*** NIF ***/}
                <Row className={`pl-3 h5 pt-1 text-left ${estrangeiro}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">NIF:</span>
                    <span className="text-muted">{ nif }</span>
                  </Col>
                </Row>
                {/*** DUNS ***/}
                <Row className={`pl-3 h5 pt-1 text-left ${estrangeiro}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">DUNS:</span>
                    <span className="text-muted">{ duns }</span>
                  </Col>
                </Row>
                {/*** RAMO ATIVIDADE ***/}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Ramo Atividade:</span>
                    <span className="text-muted">{ ramoatividade }</span>
                  </Col>
                </Row>
              </Col>

              {/*COLUNA 2 */}
              <Col sm={5}>
                {/*** ID ***/}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ id }</span>
                    </small>
                  </Col>
                </Row>
                {/*** SITUAÇÃO ***/}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Situação:</span>
                      <span className="text-muted">{ situacao }</span>
                    </small>
                  </Col>
                </Row>
                {/*** INCLUSAO ***/}
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
                {/*** ALTERAÇÃO ***/}
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
            {/*CONTATO */}
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
            {/*TABELA OCORRENCIAS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeOcorrencias}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">OCORRÊNCIAS</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  rowEvents={rowEvents}
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={listaOcorrencias}
                  table-striped
                  columns={tableColumns_Ocorrencias}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>
            {/*OBSERVACAO   */}
            <Row className={`pl-3 h5 pt-3 text-left ${exibeObservacao}`}>
              <Col sm={12}>
                <span className="pr-3 text-info">OBSERVAÇÃO</span>
                {' '}
                <hr />
                <span className="pr-3 text-black">observacao:</span>
                <span className="text-muted">{ observacao }</span>
              </Col>
            </Row>
            {/*ANEXOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeAnexos}`}>
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
  consultaDadosComerciais: state.pJuridica.consultaDadosComerciais,
  rservicoTableData: state.pFisica.rservicoTableData,
  renderecoTableData: state.pJuridica.renderecoTableData,
  rcontatoTableData: state.pJuridica.rcontatoTableData,
  observacaoFichaData: state.pJuridica.observacaoFichaData,
  tableData: state.ocorrencia.tableData,
  anexoTableData: state.anexo.anexoTableData,
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaJuridicaConsulta);
