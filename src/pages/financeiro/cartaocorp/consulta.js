///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaCartaoCorp } from '../../../functions/financeiro/cartaocorp';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// MOVIMENTO ///////////////
/////////////////////////////////
function CartaoCorpConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState('');
  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');

  const [descricao, setDescricao] = useState('');
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [validade, setValidade] = useState('');
  const [seguranca, setSeguranca] = useState('');

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaCartaoCorp(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, titular, numero, validade, seguranca, situacao, inc_dhsis, inc_dusuario, alt_dhsis, alt_dusuario,
    } = props.cartaoCorpConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setDescricao(descricao);
      setTitular(titular);
      setNumero(numero);
      setValidade(validade);
      setSeguranca(seguranca);
    }
  }, [props.cartaoCorpConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cart??o Corporativo" />

            <Row className="p-0 m-0">
              <Col sm={7}>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descri????o:</span>
                    <span className="text-muted">{ descricao }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Titular:</span>
                    <span className="text-muted">{ titular }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">N??mero:</span>
                    <span className="text-muted">{ numero }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Validade:</span>
                    <span className="text-muted">{ validade }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Seguran??a:</span>
                    <span className="text-muted">{ seguranca }</span>
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
  cartaoCorpConsulta: state.cartaocorp.cartaoCorpConsulta,
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(CartaoCorpConsulta);
