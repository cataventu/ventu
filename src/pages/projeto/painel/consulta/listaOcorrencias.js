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
import { getOcorrenciaPagina } from '../../../../functions/sistema/ocorrencias';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [exibeOcorrencias, setExibeOcorrencias] = useState([]);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pfisica', text: 'Participante', sort: true, headerClasses: 'tb-col-3 sm-2 bg-dark text-white',
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

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getOcorrenciaPagina(props, { id_projeto: id });
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { ocorrencia_regs } = props.tableData_ocorrencia;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
    }

    //OCORRENCIA
    const _tempOcorrencia = [];
    ocorrencia_regs.forEach((item) => {
      _tempOcorrencia.push({
        id: item.id,
        pfisica: item.pfisica,
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
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / Ocorrências" />

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

            {/*TABELA OCORRENCIAS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeOcorrencias}`}>
              <Col sm={12}>
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={ocorrencias}
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
  tableData_ocorrencia: state.ocorrencia.tableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ProjetoConsulta);
