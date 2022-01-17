///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, Col, Container, Row, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getMovimentoFicha } from '../../../functions/financeiro/movimento';
import {
  formatData, formatConsultaRestrito, getDados, formatExibeValor,
} from '../../../functions/sistema';
import {
  getAnexoPagina, renderIcon, calculaTamanho, downloadAnexo,
} from '../../../functions/anexo';

///////// MOVIMENTO ///////////////
/////////////////////////////////
function MovimentoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);

  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');
  const [nome_pessoa, setNome_pessoa] = useState('');
  const [url, setUrl] = useState('');
  const [dstatus, setDstatus] = useState('');
  const [dtransacao, setDtransacao] = useState('');
  const [restrito, setRestrito] = useState('');
  const [ddocumento, setDdocumento] = useState('');
  const [ndocumento, setNdocumento] = useState('');
  const [dt_ocorrencia, setDt_ocorrencia] = useState('');
  const [dt_vencimento, setDt_vencimento] = useState('');
  const [dt_pagamento, setDt_pagamento] = useState('');

  const [id_projeto, setId_projeto] = useState(0);
  const [projeto, setProjeto] = useState('');
  const [colProjeto, setColProjeto] = useState('hide');

  const [id_proservico, setId_proservico] = useState(0);
  const [proservico, setProservico] = useState('');
  const [colProservico, setColProservico] = useState('hide');

  const [id_grupo, setId_grupo] = useState('');
  const [grupo, setGrupo] = useState('');
  const [subgrupo, setSubgrupo] = useState('');
  const [conta, setConta] = useState('');
  const [moeda, setMoeda] = useState('');
  const [valor_original, setValor_original] = useState('');
  const [cambio, setCambio] = useState('');
  const [dtipo_negociacao, setDtipo_negociacao] = useState('');
  const [valor_negociacao, setValor_negociacao] = useState('');
  const [valor_pago, setValor_pago] = useState('');
  const [dforma, setDforma] = useState('');
  const [nforma, setNforma] = useState('');
  const [cartaocorp, setCartaoCorp] = useState('');
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');

  //const [origem, setOrigem] = useState(0);
  const [exibeAnexos, setExibeAnexos] = useState('hide');
  const [tabelaAgrupados, setTabelaAgrupados] = useState('hide');
  const [id_parcelamento, setId_parcelamento] = useState(0);
  const [tabelaParcelados, setTabelaParcelados] = useState('hide');
  const [pai_do_parcelado, setPai_do_parcelado] = useState('hide');

  const [agrupamento, setAgrupamento] = useState([]);
  const [tabela_parcela_regs, setTabela_parcela_regs] = useState([]);

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

  const handleLink = useCallback((props, id) => {
    setTabelaAgrupados('hide');
    setPai_do_parcelado('hide');
    setTabelaParcelados('hide');
    setId_parcelamento(0);
    getMovimentoFicha(props, id);
    getAnexoPagina(props, id);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getMovimentoFicha(props, id);
      getDados(props, `/TsmMOVIMENTO/AGRUPAMENTO_PAGINA/${id}`, '@GET_MOVIMENTO_AGRUPAR');
      getDados(props, `/TsmMOVIMENTO/PARCELAMENTO_FICHA/${id}`, '@GET_PARCELAMENTO_FICHA');
      getAnexoPagina(props, 0, 0, 0, 0, id);
      setFirst(false);
    }
  }, [props, firstLoad]);
  /// FICHA DATA
  useEffect(() => {
    const {
      id, inc_dusuario, pai,
      inc_dhsis, alt_dusuario, alt_dhsis,
      pessoa, id_pfisica, id_pjuridica, nome_pessoa,
      status, dstatus, dtransacao, restrito,
      ddocumento, ndocumento,
      dt_ocorrencia, dt_vencimento, dt_pagamento,
      id_projeto, projeto, id_proservico, proservico,
      id_grupo, grupo, subgrupo, valor_negociacao,
      conta, moeda, valor_original, cambio,
      dtipo_negociacao, valor_pago, cartaocorp,
      dforma, nforma, descricao, observacao, origem,
      id_parcelamento, parcela_regs, filho_regs,
    } = props.fichaData;

    const { anexo_regs } = props.anexoTableData;

    if (id > 0) {
      setId(id);

      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      if (pessoa === 1) { setUrl(`/cadastro/pessoa-fisica/consulta/${id_pfisica}`); }
      if (pessoa === 2) { setUrl(`/cadastro/pessoa-juridica/consulta/${id_pjuridica}`); }

      setNome_pessoa(nome_pessoa);

      setDstatus(dstatus);
      setDtransacao(dtransacao);
      setRestrito(formatConsultaRestrito(restrito));
      setDdocumento(ddocumento);
      setNdocumento(ndocumento);
      setDt_ocorrencia(dt_ocorrencia);
      setDt_vencimento(dt_vencimento);
      setDt_pagamento(dt_pagamento);
      setId_projeto(id_projeto);
      setProjeto(projeto);

      setId_proservico(id_proservico);
      setProservico(proservico);

      setId_grupo(id_grupo);
      setGrupo(grupo);
      setSubgrupo(subgrupo);
      setConta(conta);
      setMoeda(moeda);
      setValor_original(valor_original);
      setCambio(cambio);
      setDtipo_negociacao(dtipo_negociacao);
      setValor_pago(valor_pago);
      setValor_negociacao(valor_negociacao);
      setDforma(dforma);
      setNforma(nforma);
      setDescricao(descricao);
      setObservacao(observacao);
      setCartaoCorp(cartaocorp);

      setId_parcelamento(id_parcelamento);

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
          if (item.id_movimento === id) {
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

      //},[props]);

      //AGRUPADOS
      if (pai === true) {
        const _tempfilho_regs = [];
        filho_regs.forEach((item) => {
          const link_movimento = `/financeiro/movimento/consulta/${item.id}`;
          if (item.check) {
            _tempfilho_regs.push(
              <tr>
                <td>
                  <Link
                    className="text-blue"
                    to={link_movimento}
                    onClick={() => handleLink(props, item.id)}
                  >
                    { item.id }
                  </Link>
                </td>
                <td>{ item.documento }</td>
                <td>{ item.nome_pessoa }</td>
                <td>{ item.dt_vencimento }</td>
                {/*<td>{ item.descricao }</td> */}

                <td className="text-right ">{ formatExibeValor(item.valor_pago) }</td>
              </tr>,
            );
          }
        });
        setAgrupamento(_tempfilho_regs);
      }

      //PARCELADOS
      if (status === 4) {
        const _tempparcela_regs = [];
        parcela_regs.forEach((item) => {
          const link_movimento = `/financeiro/movimento/consulta/${item.id_parcela}`;
          _tempparcela_regs.push(
            <tr>
              <td>
                <Link
                  className="text-blue"
                  to={link_movimento}
                  onClick={() => handleLink(props, item.id_parcela)}
                >
                  { item.id_parcela }
                </Link>
              </td>
              <td>{ item.parcela }</td>
              <td>{ item.dt_vencimento }</td>
              <td className="text-right ">{ formatExibeValor(item.valor_original) }</td>
            </tr>,
          );
        });
        setTabela_parcela_regs(_tempparcela_regs);
      }

      /// EXIBE/OCULTA CAMPO PROJETO
      if (id_projeto > 0) {
        setColProjeto('show');
      } else {
        setColProjeto('hide');
      }

      /// EXIBE/OCULTA CAMPO PROSERVICO
      if (id_proservico > 0) {
        setColProservico('show');
      } else {
        setColProservico('hide');
      }

      /// EXIBE/OCULTA TABELA AGRUPADO
      if (origem === 3) {
        setTabelaAgrupados('show');
      } else {
        setTabelaAgrupados('hide');
      }

      /// EXIBE/OCULTA TABELA PARCELADO
      if (status === 4 && id_parcelamento === 0) {
        setTabelaParcelados('show');
      } else {
        setTabelaParcelados('hide');
      }

      //EXIBE/OCULTA LINHA ID_PAI PARA PARCELA
      if (parseInt(id_parcelamento, 10) > 0) {
        setPai_do_parcelado('show');
      } else {
        setPai_do_parcelado('hide');
      }
    }
  }, [props, props.fichaData, props.anexoTableData, handleLink]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Movimento" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                {/*PAI DO PARCELADO */}
                <Row className={`pl-3 h5 pt-1 text-left ${pai_do_parcelado}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Movimento Parcelado de:</span>
                    <span className="text-muted">
                      <Link
                        className="text-blue"
                        onClick={() => handleLink(props, id_parcelamento)}
                        to={`/financeiro/movimento/consulta/${id_parcelamento}`}
                      >
                        { id_parcelamento }
                      </Link>
                    </span>
                  </Col>
                </Row>
                {/*STATUS   */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Status:</span>
                    <span className="text-muted">{ dstatus }</span>
                  </Col>
                </Row>
                {/*TRANSACAO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Transação:</span>
                    <span className="text-muted">{ dtransacao }</span>
                  </Col>
                </Row>
                {/*RESTRITO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Restrito:</span>
                    <span className="text-muted">{ restrito }</span>
                  </Col>
                </Row>
                {/*CONTATO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Contato:</span>
                    <span className="text-muted"><Link className="text-blue" to={url}>{ nome_pessoa }</Link></span>
                  </Col>
                </Row>
                {/*DOCUMENTO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Documento:</span>
                    <span className="text-muted">{ ddocumento }</span>
                  </Col>
                </Row>
                {/*NDOCUMENTO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nº Doc:</span>
                    <span className="text-muted">{ ndocumento }</span>
                  </Col>
                </Row>
                {/*DT OCORRENCIA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Ocorrência:</span>
                    <span className="text-muted">{ dt_ocorrencia }</span>
                  </Col>
                </Row>
                {/*DT VENCIMENTO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Vencimento:</span>
                    <span className="text-muted">{ dt_pagamento }</span>
                  </Col>
                </Row>
                {/*DT PAGAMENTO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Pagamento:</span>
                    <span className="text-muted">{ dt_vencimento }</span>
                  </Col>
                </Row>
                {/*PROJETO */}
                <Row className={`pl-3 h5 pt-1 text-left ${colProjeto}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Projeto:</span>
                    <span className="text-muted">
                      <Link className="text-blue" to={`/projeto/painel/consulta/${id_projeto}`}>
                        { projeto }
                      </Link>
                    </span>
                  </Col>
                </Row>
                {/*SERVICO */}
                <Row className={`pl-3 h5 pt-1 text-left ${colProservico}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Serviço:</span>
                    <span className="text-muted">
                      <Link className="text-blue" to={`/projeto/painel/${id_projeto}/servico/consulta/${id_proservico}`}>
                        { proservico }
                      </Link>
                    </span>
                  </Col>
                </Row>
                {/*GRUPO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Grupo:</span>
                    <span>
                      <Link className="text-blue" to={`/financeiro/grupo/consulta/${id_grupo}`}>
                        { grupo }
                      </Link>
                    </span>
                  </Col>
                </Row>
                {/*SUBGRUPO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Subgrupo:</span>
                    <span className="text-muted">{ subgrupo }</span>
                  </Col>
                </Row>
                {/*CONTA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Conta:</span>
                    <span className="text-muted">{ conta }</span>
                  </Col>
                </Row>
                {/*MOEDA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Moeda:</span>
                    <span className="text-muted">{ moeda }</span>
                  </Col>
                </Row>
                {/*VALOR */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Valor:</span>
                    <span className="text-muted">{formatExibeValor(valor_original) }</span>
                  </Col>
                </Row>
                {/*CAMBIO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Câmbio:</span>
                    <span className="text-muted">{ cambio }</span>
                  </Col>
                </Row>
                {/*TIPO NEGOCIACAO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Tipo Negociação:</span>
                    <span className="text-muted">{ dtipo_negociacao }</span>
                  </Col>
                </Row>
                {/*VALOR NEGOCIACAO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Valor Negociação:</span>
                    <span className="text-muted">{ formatExibeValor(valor_negociacao) }</span>
                  </Col>
                </Row>
                {/*VALOR PAGO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Valor Pago:</span>
                    <span className="text-muted">{ formatExibeValor(valor_pago) }</span>
                  </Col>
                </Row>
                {/*FORMA */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Forma:</span>
                    <span className="text-muted">{ dforma }</span>
                  </Col>
                </Row>
                {/*NUMERO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Número:</span>
                    <span className="text-muted">{ nforma }</span>
                  </Col>
                </Row>
                {/*CARTAO COORPORATIVO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Cartão Corporativo:</span>
                    <span className="text-muted">{ cartaocorp }</span>
                  </Col>
                </Row>
                {/*DESCRICAO */}
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descrição:</span>
                    <span className="text-muted">{ descricao }</span>
                  </Col>
                </Row>

              </Col>
              {/*ID */}
              <Col sm={5}>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ id }</span>
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
                        { inc_dhsis }
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
                        { alt_dhsis }
                      </span>
                    </small>
                  </Col>
                </Row>

              </Col>
            </Row>
            {/*OBSERVACAO */}
            <Row className="pl-4 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Observação:</span>
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
            {/*MOVIMENTOS AGRUPADOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${tabelaAgrupados}`}>
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info">MOVIMENTOS AGRUPADOS</span>
                {' '}
                <hr />
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th width={100} className="h5 bg-dark text-white">Movimento</th>
                      <th width={100} className="h5 bg-dark text-white">Documento</th>
                      <th width="auto" className="h5 bg-dark text-white">Contato</th>
                      <th width={120} className="h5 bg-dark text-white">Data Vencimento</th>
                      <th width={150} className="h5 bg-dark text-white text-right">Valor</th>
                    </tr>
                  </thead>
                  { agrupamento }
                </Table>
              </Col>
            </Row>
            {/*PARCELAS */}
            <Row className={`pl-3 h5 pt-1 text-left ${tabelaParcelados}`}>
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info">MOVIMENTOS PARCELADOS</span>
                {' '}
                <hr />
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th width={100} className="h5 bg-dark text-white">Movimento</th>
                      <th width={100} className="h5 bg-dark text-white">Parcela</th>
                      <th width={120} className="h5 bg-dark text-white">Data Vencimento</th>
                      <th width={150} className="h5 bg-dark text-white text-right">Valor</th>
                    </tr>
                  </thead>
                  { tabela_parcela_regs }
                </Table>
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
  tableData: state.movimento.tableData,
  tableDataAgrupar: state.movimento.tableDataAgrupar,
  anexoFichaData: state.anexo.anexoFichaData,
  anexoTableData: state.anexo.anexoTableData,
  fichaData: state.movimento.fichaData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(MovimentoConsulta);
