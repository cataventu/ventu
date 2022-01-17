///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getProjetoFicha } from '../../../../functions/projeto';
import { getRsvpPagina } from '../../../../functions/projeto/rsvp';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tabelaRSVP, setTabelaRSVP] = useState([]);

  const tableColumns_rsvp = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-4 bg-dark text-white',
    },
    {
      dataField: 'email', text: 'Email', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'telefone', text: 'Telefone', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'status', text: 'Status', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
  ];

  const [rsvp, setRsvp] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getRsvpPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { rsvp_regs } = props.table_rsvp;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
    }

    const _tempRsvp = [];
    rsvp_regs.forEach((item) => {
      _tempRsvp.push({
        id: item.id,
        nome: item.nome_completo,
        email: item.email,
        telefone: item.telefone,
        status: item.dstatus,
      });
    });

    setRsvp(_tempRsvp);

    /// EXIBE/OCULTA TABELA RSVP
    if (rsvp_regs.length > 0) {
      setTabelaRSVP('show');
    } else {
      setTabelaRSVP('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / RSVP" />

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </Col>
            </Row>

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

            <Row className={`pl-3 h5 pt-1 text-left ${tabelaRSVP}`}>
              <Col sm={12}>
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rsvp}
                  table-striped
                  columns={tableColumns_rsvp}
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
  table_rsvp: state.rsvp.tableData,
  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ProjetoConsulta);
