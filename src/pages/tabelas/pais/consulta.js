///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaPais } from '../../../functions/tabelas/pais';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// PAIS ///////////////
//////////////////////////////
function PaisConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  const [pais, setPais] = useState(0);
  const [sigla, setSigla] = useState(0);
  const [nacionalidade, setNacionalidade] = useState(0);
  const [bacen, setBacen] = useState(0);
  const [ddi, setDdi] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaPais(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario,
      inc_dhsis, alt_dusuario, alt_dhsis,
      pais, sigla, nacionalidade, bacen, ddi,
    } = props.paisConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setPais(pais);
      setSigla(sigla);
      setNacionalidade(nacionalidade);
      setBacen(bacen);
      setDdi(ddi);
    }
  }, [props.paisConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Pais" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Pais:</span>
                    <span className="text-muted">{ pais }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Sigla:</span>
                    <span className="text-muted">{ sigla }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nacionalidade:</span>
                    <span className="text-muted">{ nacionalidade }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">BACEN:</span>
                    <span className="text-muted">{ bacen }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">DDI:</span>
                    <span className="text-muted">{ ddi }</span>
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
  paisConsulta: state.pais.paisConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PaisConsulta);
