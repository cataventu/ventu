///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';

import { getConsultaFixo } from '../../../functions/financeiro/fixo';
import { formatData, formatSituacao, formatExibeValor } from '../../../functions/sistema';

///////// FIXO ///////////////
/////////////////////////////////
function FixoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(0);
  const [inc_dusuario, setInc_dusuario] = useState(0);
  const [inc_dhsis, setInc_dhsis] = useState(0);
  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);
  const [dtransacao, setDtransacao] = useState(0);
  const [limitado, setLimitado] = useState(false);
  const [limitada, setLimitada] = useState(0);
  const [restrito, setRestrito] = useState(0);
  const [nome_pessoa, setNome_pessoa] = useState(0);
  const [url, setUrl] = useState(0);
  const [lim_perini, setLim_perini] = useState(0);
  const [lim_perfim, setLim_perfim] = useState(0);
  const [dia_vencimento, setDia_vencimento] = useState(0);
  const [id_grupo, setId_grupo] = useState(0);
  const [grupo, setGrupo] = useState(0);
  const [subgrupo, setSubgrupo] = useState(0);
  const [conta, setConta] = useState(0);
  const [moeda, setMoeda] = useState(0);
  const [valor, setValor] = useState(0);
  const [cambio, setCambio] = useState(0);
  const [nforma, setNforma] = useState(0);
  const [dforma, setDforma] = useState(0);
  const [descricao, setDescricao] = useState(0);
  const [cartaocorp, setCartaocorp] = useState(0);
  const [observacao, setObservacao] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaFixo(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, situacao, inc_dusuario, inc_dhsis, alt_dusuario, alt_dhsis,
      dtransacao, limitada, restrito, pessoa, id_pfisica, id_pjuridica,
      nome_pessoa, lim_perini, lim_perfim, dia_vencimento, id_grupo,
      grupo, subgrupo, conta, moeda, valor, cambio, nforma, dforma,
      descricao, cartaocorp, observacao,
    } = props.fixoConsulta;

    if (id > 0) {
      setId(id);
      setSituacao(formatSituacao(situacao));
      setInc_dusuario(inc_dusuario);
      setInc_dhsis(formatData(inc_dhsis));
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));
      setDtransacao(dtransacao);

      /////////////// ocultar linhas limitado

      setLimitada(limitada);
      if (limitada) {
        setLimitada('sim');
        setLimitado('show');
      } else {
        setLimitada('não');
        setLimitado('hide');
      }
      /////////////// criar permissao acesso a consulta de registros restrito!

      setRestrito(restrito);
      if (restrito) { setRestrito('sim'); } else { setRestrito('não'); }

      if (pessoa === 1) { setUrl(`/cadastro/pessoa-fisica/consulta/${id_pfisica}`); }
      if (pessoa === 2) { setUrl(`/cadastro/pessoa-juridica/consulta/${id_pjuridica}`); }

      setNome_pessoa(nome_pessoa);
      setLim_perini(lim_perini);
      setLim_perfim(lim_perfim);

      const mesi = (lim_perini.slice(4, 6));
      const anoi = (lim_perini.slice(0, 4));

      if (limitada) {
        setLim_perini(`${mesi}/${anoi}`);
      } else {
        setLim_perini('');
      }

      const mesf = (lim_perfim.slice(4, 6));
      const anof = (lim_perfim.slice(0, 4));

      if (limitada) {
        setLim_perfim(`${mesf}/${anof}`);
      } else {
        setLim_perfim('');
      }

      setDia_vencimento(dia_vencimento);
      setId_grupo(id_grupo);
      setGrupo(grupo);
      setSubgrupo(subgrupo);
      setConta(conta);
      setMoeda(moeda);
      setValor(formatExibeValor(valor));
      setCambio(cambio);
      setNforma(nforma);
      setDforma(dforma);
      setDescricao(descricao);
      setCartaocorp(cartaocorp);
      setObservacao(observacao);
    }
  }, [props.fixoConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Fixo" />

            <Row className="p-0 m-0">
              <Col sm={7}>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Transação:</span>
                    <span className="text-muted">{ dtransacao }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Restrito:</span>
                    <span className="text-muted">{ restrito }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Contato:</span>
                    <span className="text-muted"><Link className="text-blue" to={url}>{ nome_pessoa }</Link></span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Dia Vencimento:</span>
                    <span className="text-muted">{ dia_vencimento }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Limitada:</span>
                    <span className="text-muted">{ limitada }</span>
                  </Col>
                </Row>
                <Row className={`pl-3 h5 pt-1 text-left ${limitado}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Inicio:</span>
                    <span className="text-muted">{ lim_perini }</span>
                  </Col>
                </Row>

                <Row className={`pl-3 h5 pt-1 text-left ${limitado}`}>
                  <Col sm={12}>
                    <span className="pr-3 text-black">Data Fim:</span>
                    <span className="text-muted">{ lim_perfim }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Grupo:</span>
                    <span>
                      <Link className="text-blue" to={`/financeiro/grupo/consulta/${id_grupo}`}>
                        { grupo }
                      </Link>
                    </span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Subgrupo:</span>
                    <span className="text-muted">{ subgrupo }</span>
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
                    <span className="pr-3 text-black">Moeda:</span>
                    <span className="text-muted">{ moeda }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Valor:</span>
                    <span className="text-muted">{ valor }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Câmbio:</span>
                    <span className="text-muted">{ cambio }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Forma:</span>
                    <span className="text-muted">{ dforma }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Número:</span>
                    <span className="text-muted">{ nforma }</span>
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
                    <span className="pr-3 text-black">Cartão Corporativo:</span>
                    <span className="text-muted">{ cartaocorp }</span>
                  </Col>
                </Row>

                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Observação:</span>
                    <span className="text-muted">{ observacao }</span>
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
  fixoConsulta: state.fixo.fixoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(FixoConsulta);
