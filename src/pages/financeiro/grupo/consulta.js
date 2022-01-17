///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaGrupo } from '../../../functions/financeiro/grupo';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// GRUPO ///////////////
//////////////////////////////
function GrupoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);
  const [dtipo, setDtipo] = useState(0);
  const [descricao, setDescricao] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaGrupo(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dhsis, alt_dhsis, dtipo, descricao,
    } = props.grupoConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dhsis(formatData(alt_dhsis));
      setDtipo(dtipo);
      setDescricao(descricao);
    }
  }, [props.grupoConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Grupo" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Tipo:</span>
                    <span className="text-muted">{ dtipo }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descrição:</span>
                    <span className="text-muted">{ descricao }</span>
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
                      <span className="pr-3 text-black">Situação:</span>
                      <span className="text-muted">{ situacao }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Inclusão:</span>
                      <span className="text-muted">{ inc_dhsis }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Atualização:</span>
                      <span className="text-muted">{ alt_dhsis }</span>
                    </small>
                  </Col>
                </Row>
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
  grupoConsulta: state.grupo.grupoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(GrupoConsulta);
