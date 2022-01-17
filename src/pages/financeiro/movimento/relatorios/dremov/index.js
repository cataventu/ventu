///////// IMPORTS ///////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageTitle, ConsultaFooter } from '../../../../../components';
import { getConsultaDremov } from '../../../../../functions/financeiro/movimento/relatorios/dremov';
import { formatExibeValor } from '../../../../../functions/sistema';

///////// DREMOV ///////////////
/////////////////////////////////
function DremovConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  //const [id, setId] = useState(0);
  const [dremov, setDremov] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaDremov(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const _tempArray = [];
    const { relatorio_mov_regs } = props.dremovData;

    relatorio_mov_regs.forEach((dado) => {
      let id;
      let valor;
      let class_red;
      class_red = 'text-right';

      dado.id === 0 ? id = '' : id = dado.id;
      dado.id === 0 ? valor = '' : valor = dado.valor;
      valor.toString().substring(0, 1) === '-' ? class_red = 'text-danger' : class_red = '';

      _tempArray.push(
        <tr>
          <td><Link to={`/financeiro/movimento/consulta/${id}`}>{id}</Link></td>
          <td>{dado.data}</td>
          <td>{dado.nome_pessoa}</td>
          <td>{dado.forma}</td>
          <td className={`text-right ${class_red}`}>{formatExibeValor(valor)}</td>
        </tr>,
      );
    });

    setDremov(_tempArray);
  }, [props, props.dremovData]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          title="Consulta"
          subtitle="/ DRE"
          voltar
        />
        <Card className="p-3">
          {/*<Row>
                {/* COLUNA ESQUERDA */}
          {/*<Col sm={4} className="text-left">
                        <Row className="h5 pt-1 text-left">
                        <Col sm={12} className="text-left">
                          <span className="pr-3 text-black">{  props.dremovData.titulo1}</span>
                        </Col>
                      </Row>
                      <Row className="h5 pt-1 text-left">
                        <Col sm={12} className="text-left">
                          <span className="pr-3 text-black">{  props.dremovData.titulo4}</span>
                        </Col>
                      </Row>
                </Col> */}
          {/*COLUNA DIREITA */}
          {/*<Col sm={8} className="text-right">
                      <Row className="h5 pt-1 text-left">
                        <Col sm={12} className="text-right">
                          <span className="pr-3 text-black">{ props.dremovData.titulo2 }</span>
                        </Col>
                      </Row>

                      <Row className="h5 pt-1 text-left">
                        <Col sm={12} className="text-right">
                        <span className="pr-3 text-black">{  props.dremovData.titulo3 }</span>
                        </Col>
                      </Row>
                </Col>
            </Row> */}
          <Row className="h5 pt-1 text-center">
            <Col sm={12}>
              <span className="pr-3 text-black">{ props.dremovData.titulo1 }</span>
            </Col>
          </Row>
          <Row className="h5 pt-1 text-center">
            <Col sm={12}>
              <span className="pr-3 text-black">{ props.dremovData.titulo2 }</span>
            </Col>
          </Row>
          <Row className="h5 pt-1 text-center">
            <Col sm={12}>
              <span className="pr-3 text-black">{ props.dremovData.titulo3 }</span>
            </Col>
          </Row>
          <Row className="h5 pt-1 text-center">
            <Col sm={12}>
              <span className="pr-3 text-black">{ props.dremovData.titulo4 }</span>
            </Col>
          </Row>
          <Row className="h5 pt-1 text-center">
            <Col sm={12}>
              <span className="pr-3 text-black">{ props.dremovData.titulo5 }</span>
            </Col>
          </Row>
          <Table size="sm" striped className="mb-3">
            <thead>
              <tr>
                <th width={150} className="h5 bg-dark text-white ">Movimento</th>
                <th width={150} className="h5 bg-dark text-white">Dt Ocorrência</th>
                <th width="auto" className="h5 bg-dark text-white text-left">Contato</th>
                <th width={90} className="h5 bg-dark text-white">Forma</th>
                <th width={150} className="h5 bg-dark text-white text-right">Valor</th>
              </tr>
            </thead>
            {dremov}
          </Table>

          <ConsultaFooter />
          {/*</div> */}
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,

  dremovData: state.dremov.dremovData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(DremovConsulta);
