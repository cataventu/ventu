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
import { getServicoPagina } from '../../../../functions/projeto/servico';
import { formatExibeValor } from '../../../../functions/sistema';
//import servico from '../../servico';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tabelaServicos, setTabelaServicos] = useState([]);

  const tableColumns_servico = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'doperacao', text: 'Operacao', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'servico', text: 'Serviço', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'dstatus', text: 'Status', sort: true, headerClasses: 'tb-col-2 bg-dark text-white',
    },
    {
      dataField: 'valor_total', text: 'Valor Total', sort: true, headerClasses: 'tb-col-2 bg-dark text-white text-right', classes: 'text-right',
    },
    {
      dataField: 'moeda', text: 'Moeda', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },

  ];

  const [servico, setServico] = useState([]);

  const rowEvents = {
    //onClick: (e, row, rowIndex) => {
    onClick: (e, row) => {
      const { id } = props.match.params;
      const idServico = row.id;
      const page = `/projeto/painel/${id}/servico/consulta/${idServico}`;

      props.history.push(page);
    },
  };

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getServicoPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { proservico_regs } = props.table_servico;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
    }

    const _tempServico = [];
    proservico_regs.forEach((item) => {
      _tempServico.push({
        id: (item.id === 0 ? '' : item.id),
        servico: item.servico,
        doperacao: item.doperacao,
        moeda: item.moeda,
        valor_total: formatExibeValor(item.valor_total),
        dstatus: item.dstatus,
      });
    });

    setServico(_tempServico);

    /// EXIBE/OCULTA TABELA
    if (proservico_regs.length > 0) {
      setTabelaServicos('show');
    } else {
      setTabelaServicos('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / Serviços" />

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

            <Row className={`pl-3 h5 pt-1 text-left ${tabelaServicos}`}>
              <Col sm={12}>
                <BootstrapTable
                  class="sm"
                  rowEvents={rowEvents}
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={servico}
                  table-striped
                  columns={tableColumns_servico}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>

            {/*<Row className={"pl-3 h5 pt-1 text-left " + tabelaServicos }>
                  <Col sm={12}>
                  <Table size="sm" striped className="mb-3">
                      <thead>
                          <tr>
                            <th width={100} className="h5 bg-dark text-white">Id</th>
                            <th width={100} className="h5 bg-dark text-white">Serviço</th>
                            <th width={'auto'} className="h5 bg-dark text-white">Operação</th>
                            <th width={120} className="h5 bg-dark text-white">Moeda</th>
                            <th width={150} className="h5 bg-dark text-white text-right">Valor Total</th>
                            <th width={150} className="h5 bg-dark text-white text-right">Status</th>
                          </tr>
                        </thead>
                        { tableData }
                      </Table>
                  </Col>
                </Row>  */}

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

  table_servico: state.servicos.tableData,
  projetoFichaData: state.projeto.projetoFichaData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ProjetoConsulta);
