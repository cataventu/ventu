///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';

import { getConsultaAeroporto } from '../../../functions/tabelas/aeroporto';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// AEROPORTO ///////////////
/////////////////////////////////
function AeroportoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  const [codigo, setCodigo] = useState(0);
  const [nome, setNome] = useState(0);
  const [id_municipio, setId_municipio] = useState(0);
  const [municipio, setMunicipio] = useState(0);

  /// GET CONSULTA
  const handleConsulta = useCallback(() => {
    async function getConsulta() {
      const id_consulta = props.match.params.id;
      const response = await getConsultaAeroporto(props, id_consulta);

      const {
        id, situacao, inc_dusuario, inc_dhsis, alt_dusuario,
        alt_dhsis, codigo, nome, id_municipio, municipio,
      } = response;

      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setCodigo(codigo);
      setNome(nome);
      setId_municipio(id_municipio);
      setMunicipio(municipio);
    }

    getConsulta();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      handleConsulta();
      setFirst(false);
    }
  }, [firstLoad, handleConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Aeroporto" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Código:</span>
                    <span className="text-muted">{ codigo }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Nome:</span>
                    <span className="text-muted">{ nome }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Municipio:</span>
                    <span className="text-muted">
                      <Link className="text-blue" to={`/tabelas/municipio/consulta/${id_municipio}`}>
                        { municipio }
                      </Link>
                    </span>
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
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(AeroportoConsulta);
