///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaCartao } from '../../../functions/tabelas/tipo_cartao';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// CARTAO ///////////////
//////////////////////////////
function CartaoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);
  const [dtipo, setDtipo] = useState(0);
  const [codigo, setCodigo] = useState(0);
  const [descricao, setDesccricao] = useState(0);

  const [cod, setCod] = useState('hide');

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaCartao(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario,
      inc_dhsis, alt_dusuario, alt_dhsis, tipo,
      dtipo, codigo, descricao,
    } = props.cartaoConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));
      setDtipo(dtipo);
      setCodigo(codigo);
      setDesccricao(descricao);
    }

    setCodigo(codigo);
    if (tipo === 1) {
      setCod('show');
    } else {
      setCod('hide');
    }
  }, [props.cartaoConsulta]);

  ///////// RENDER TABLE //////////
  /////////////////////////////////
  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Tipo Cart??o" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Tipo:</span>
                    <span className="text-muted">{ dtipo }</span>
                  </Col>
                </Row>
                <Row className={`pl-3 h5 pt-1 text-left  ${cod}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">C??digo:</span>
                    <span className="text-muted">{ codigo }</span>
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
  cartaoConsulta: state.cartao.cartaoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(CartaoConsulta);
