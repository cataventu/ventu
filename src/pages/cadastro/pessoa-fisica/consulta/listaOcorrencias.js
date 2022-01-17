///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Col, Container, Row, Table,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getOcorrenciaPagina } from '../../../../functions/sistema/ocorrencias';

function PessoaFisicaListaOcorrenciasConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getOcorrenciaPagina(props, { id_pfisica: id });
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { ocorrencia_regs } = props.tableData;

    setId(id);
    setNome_completo(nome_completo);

    const _tempOcorrencia = [];
    ocorrencia_regs.forEach((item) => {
      const { id_projeto } = item;
      const { id_pjuridica } = item;

      _tempOcorrencia.push(
        <tr>
          <td>
            <Link to={`/sistema/ocorrencia/consulta/${item.id}`}>
              {' '}
              {item.id}
              {' '}
            </Link>
          </td>
          <td><Link to={`/projeto/painel/consulta/${id_projeto}`}>{item.projeto}</Link></td>
          <td><Link to={`/cadastro/pessoa-juridica/consulta/${id_pjuridica}`}>{item.pjuridica}</Link></td>
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
                <span className="pr-3 text-black">Nome Completo:</span>
                <span className="text-muted">{ nome_completo }</span>
              </Col>
            </Row>

            {/*TABELA OCORRENCIAS */}
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
  pessoalFichaData: state.pFisica.pessoalFichaData,
  tableData: state.ocorrencia.tableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaOcorrenciasConsulta);
