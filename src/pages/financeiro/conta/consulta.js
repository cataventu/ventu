///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import { getConsultaConta } from '../../../functions/financeiro/conta';
import { formatData, formatSituacao, formatPadrao } from '../../../functions/sistema';

///////// CONTA ///////////////
//////////////////////////////
function ContaConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);

  const [padrao, setPadrao] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  const [descricao, setDescricao] = useState(0);
  const [moeda, setMoeda] = useState(0);
  const [dtipo, setDtipo] = useState(0);
  const [banco_numero, setBanco_numero] = useState(0);
  const [banco_nome, setBanco_nome] = useState(0);
  const [agencia, setAgencia] = useState(0);
  const [agencia_dv, setAgencia_dv] = useState(0);
  const [conta, setConta] = useState(0);
  const [conta_dv, setConta_dv] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaConta(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario, padrao,
      inc_dhsis, alt_dusuario, alt_dhsis,
      descricao, moeda, dtipo, banco_numero, banco_nome, agencia, agencia_dv, conta, conta_dv,
    } = props.contaConsulta;

    if (id > 0) {
      setId(id);
      setPadrao(formatPadrao(padrao));
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));

      setDescricao(descricao);
      setMoeda(moeda);
      setDtipo(dtipo);
      setBanco_numero(banco_numero);
      setBanco_nome(banco_nome);
      setAgencia(agencia);
      setAgencia_dv(agencia_dv);
      setConta(conta);
      setConta_dv(conta_dv);
    }
  }, [props.contaConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Conta" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Padrão:</span>
                    <span className="text-muted">{ padrao }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Descrição:</span>
                    <span className="text-muted">{ descricao }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Moeda:</span>
                    <span className="text-muted">{ moeda }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Tipo:</span>
                    <span className="text-muted">{ dtipo }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Banco:</span>
                    <span className="text-muted">{ banco_nome }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Banco Nº:</span>
                    <span className="text-muted">{ banco_numero }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Agência:</span>
                    <span className="text-muted">{ agencia }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Agência DV:</span>
                    <span className="text-muted">{ agencia_dv }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Conta:</span>
                    <span className="text-muted">{ conta }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Conta DV:</span>
                    <span className="text-muted">{ conta_dv }</span>
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
  contaConsulta: state.conta.contaConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(ContaConsulta);
