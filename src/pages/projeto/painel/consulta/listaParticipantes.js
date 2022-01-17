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
import { getParticipantesPagina } from '../../../../functions/projeto/participantes';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tabelaParticipantes, setTabelaParticipantes] = useState([]);
  const [participante, setParticipante] = useState([]);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'tag', text: 'Tag', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'tb-col-5 bg-dark text-white',
    },
    {
      dataField: 'check_in', text: 'Check In', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'check_out', text: 'Check Out', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getParticipantesPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { participante_regs } = props.table_participante;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
    }

    const _tempParticipante = [];
    participante_regs.forEach((item) => {
      _tempParticipante.push({
        id: item.id,
        tag: item.tag,
        nome: item.par_nome_completo,
        check_in: item.check_in,
        check_out: item.check_out,
      });
    });

    setParticipante(_tempParticipante);

    if (participante_regs.length > 0) {
      setTabelaParticipantes('show');
    } else {
      setTabelaParticipantes('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / Participantes" />

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

            {/*PARTICIPANTES */}
            <Row className={`pl-3 h5 pt-1 text-left ${tabelaParticipantes}`}>
              <Col sm={12}>
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={participante}
                  table-striped
                  columns={tableColumns}
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
  table_participante: state.participantes.tableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

});
export default connect(() => (mapState))(ProjetoConsulta);
