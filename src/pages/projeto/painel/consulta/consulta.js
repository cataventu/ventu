///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getProjetoFicha } from '../../../../functions/projeto';
import { formatData, formatHoraDHSIS } from '../../../../functions/sistema';
import {
  getAnexoPagina, renderIcon, calculaTamanho, downloadAnexo,
} from '../../../../functions/anexo';

function ProjetoConsulta(props) {
  const [id_projeto, setId_projeto] = useState(0);
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [dstatus, setDstatus] = useState('');
  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [DTipo, setDtipo] = useState('');
  const [vagas, setVagas] = useState('');
  const [dt_inicio, setDt_inicio] = useState('');
  const [dt_termino, setDt_termino] = useState('');
  const [res_nome_pessoa, setRes_nome_pessoa] = useState('');
  const [sol_nome_pessoa, setSol_nome_pessoa] = useState('');

  const [exibeAnexos, setExibeAnexos] = useState('hide');

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

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);
      getProjetoFicha(props, id);
      getAnexoPagina(props, 0, 0, id, 0, 0);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, dstatus, inc_dusuario, inc_dhsis, alt_dusuario, alt_dhsis,
      codigo, descricao, dtipo, vagas, dt_inicio, dt_termino,
      res_nome_pessoa, sol_nome_pessoa,
    } = props.projetoFichaData;

    const { anexo_regs } = props.anexoTableData;

    setId(id);
    setDstatus(dstatus);
    setInc_dusuario(inc_dusuario);
    setInc_dhsis(inc_dhsis);
    setAlt_dusuario(alt_dusuario);
    setAlt_dhsis(alt_dhsis);
    setDtipo(dtipo);
    setCodigo(codigo);
    setDescricao(descricao);
    setVagas(vagas);
    setDt_inicio(dt_inicio);
    setDt_termino(dt_termino);
    setRes_nome_pessoa(res_nome_pessoa);
    setSol_nome_pessoa(sol_nome_pessoa);

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
         <Link to={`/projeto/painel/ficha/${id}/anexo/consulta/${item.id}`}>
            {item.titulo}
          </Link>
        );
        if (item.id_projeto === id) {
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
    /// EXIBE/OCULTA TABELA ANEXOS
    if (anexo_regs.length > 0) {
      setExibeAnexos('show');
    } else {
      setExibeAnexos('hide');
    }
  }, [props, props.anexoTableData]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto" />

            <Row className="p-0 m-0">
              <Col sm={7}>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Código:</span>
                    <span className="text-muted">{ codigo }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Projeto:</span>
                    <span className="text-muted">{ descricao }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Tipo:</span>
                    <span className="text-muted">{ DTipo }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Vagas:</span>
                    <span className="text-muted">{ vagas }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Início:</span>
                    <span className="text-muted">{ dt_inicio }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Término:</span>
                    <span className="text-muted">{ dt_termino }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Responsável:</span>
                    <span className="text-muted">{ res_nome_pessoa }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Solicitante:</span>
                    <span className="text-muted">{ sol_nome_pessoa }</span>
                  </Col>
                </Row>

              </Col>
              <Col sm={5}>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ id }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Status:</span>
                      <span className="text-muted">{ dstatus }</span>
                    </small>
                  </Col>
                </Row>

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
                        {/*{' '}
                        { (inc_dhsis) } */}

                      </span>
                    </small>
                  </Col>
                </Row>
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
            {/*CONTRATANTE */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaContratante`}>Contratante</Link></span>
              </Col>
            </Row>

            {/*RSVP */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaRSVP`}>RSVP</Link></span>
              </Col>
            </Row>

            {/*PARTICIPANTES */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaParticipantes`}>Participantes</Link></span>
              </Col>
            </Row>

            {/*SERVICOS */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaServicos`}>Serviços</Link></span>
              </Col>
            </Row>

            {/*TABELA OCORRENCIAS */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaOcorrencias`}>Ocorrências</Link></span>
              </Col>
            </Row>

            {/*FINANCEIRO */}
            <Row className="pl-3 h4 pt-1 text-left ">
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info"><Link to={`/projeto/painel/consulta/${id_projeto}/listaMovimentos`}>Movimentos</Link></span>
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
  nomeProjeto: state.projeto.nomeProjeto,
  projetoFichaData: state.projeto.projetoFichaData,
  anexoTableData: state.anexo.anexoTableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ProjetoConsulta);
