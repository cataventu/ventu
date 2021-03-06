///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaSubGrupo } from '../../../functions/financeiro/subgrupo';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// SUBGRUPO ///////////////
/////////////////////////////////
function SubGrupoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  const [id_grupo, setId_grupo] = useState(0);
  const [grupo, setGrupo] = useState(0);
  const [descricao, setDescricao] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaSubGrupo(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario,
      inc_dhsis, alt_dusuario, alt_dhsis,
      id_grupo, grupo, descricao,
    } = props.subgrupoConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setId_grupo(id_grupo);
      setGrupo(grupo);
      setDescricao(descricao);
    }
  }, [props.subgrupoConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="SubGrupo" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Grupo:</span>
                    <span className="text-muted">
                      <Link className="text-blue" to={`/financeiro/grupo/consulta/${id_grupo}`}>
                        { grupo }
                      </Link>
                    </span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descri????o:</span>
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
                      <span className="pr-3 text-black">Situa????o:</span>
                      <span className="text-muted">{ situacao }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Inclus??o:</span>
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
                      <span className="pr-3 text-black">Atualiza????o:</span>
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
  subgrupoConsulta: state.subgrupo.subgrupoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(SubGrupoConsulta);
