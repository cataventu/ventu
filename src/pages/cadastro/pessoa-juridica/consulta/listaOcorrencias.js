///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row, Table,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getOcorrenciaPagina } from '../../../../functions/sistema/ocorrencias';

function PessoaJuridicaListaOcorrenciasConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getOcorrenciaPagina(props, { id_pjuridica: id });
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, razao_social, nome_fantasia } = props.consultaDadosComerciais;
    const { ocorrencia_regs } = props.tableData;

    setId(id);
    setRazao_social(razao_social);
    setNome_fantasia(nome_fantasia);

    const _tempOcorrencia = [];
    ocorrencia_regs.forEach((item) => {
      const { id_projeto } = item;
      const { id_pfisica } = item;

      _tempOcorrencia.push(
        <tr>
          <td className="text-blue">
            <Link to={`/sistema/ocorrencia/consulta/${item.id}`}>
              {' '}
              {item.id}
              {' '}
            </Link>
          </td>
          <td>
            <Link to={`/projeto/painel/consulta/${id_projeto}`}>{item.projeto}</Link>
          </td>
          <td>
            <Link to={`/cadastro/pessoa-fisica/consulta/${id_pfisica}`}>{item.pfisica}</Link>
          </td>
          <td>{(item.data.substring(0, 10))}</td>
          <td>{item.dstatus}</td>
        </tr>,
      );
    });
    setOcorrencias(_tempOcorrencia);
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Ocorrência" />

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </Col>
            </Row>

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Razão Social:</span>
                <span className="text-muted">{ razao_social }</span>
              </Col>
            </Row>
            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Nome Fantasia:</span>
                <span className="text-muted">{ nome_fantasia }</span>
              </Col>
            </Row>

            {/*TABELA OCORRENCIAS */}
            <Table size="sm" striped className="mb-3">
              <thead>
                <tr>
                  <th width={90} className="h5 bg-dark text-white ">ID</th>
                  <th width="auto" className="h5 bg-dark text-white ">Projeto</th>
                  <th width="auto" className="h5 bg-dark text-white ">Cliente</th>
                  <th width={90} className="h5 bg-dark text-white text-left">Data</th>
                  <th width={90} className="h5 bg-dark text-white text-left">Status</th>
                </tr>
              </thead>
              { ocorrencias }
            </Table>

            <ConsultaFooter />
          </div>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  consultaDadosComerciais: state.pJuridica.consultaDadosComerciais,
  tableData: state.ocorrencia.tableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaJuridicaListaOcorrenciasConsulta);
