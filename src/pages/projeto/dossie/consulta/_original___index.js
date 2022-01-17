///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { PageTitle, TabsProjeto } from '../../../../components';
import {
  DadosProjeto, Passageiros, TemposMov, Contatos, Malas, Emergencia, Passaportes,
} from '../cards';
import './style.css';

import form from '../form';
import { id } from 'date-fns/locale';

function Dossie(props) {
  return (
    <>
      <Container fluid className="p-0 d-print-none">

        <PageTitle
          history={props.history}
          title="Projeto"
          voltar
          linkTo={`/projeto/painel/${id}/dossie/ficha`}
        />

        <TabsProjeto ativo={12} props={props} />

        <Row className="">
          <Col sm={12}>
            <Card>
              <CardBody className="dossie-container">
                <Row className="border dossie-consulta-container p-2 pt-0">
                  <Col sm={12}>
                    {/*** DADOS PROJETO ***/}
                    <DadosProjeto dados={form} />

                    {/*** PASSAGEIROS TAG ***/}
                    <Passageiros dados={form} subtitulo="TAG" />

                    {/*** PASSAGEIROS ALPHA ***/}
                    <Passageiros dados={form} subtitulo="ALFABÉTICA" />

                    {/*** GROUP SPECS ***/}
                    {/*
                    <GroupSpecs dados={form} />
                    */}

                    {/*** TEMPOS E MOVIMENTOS ***/}
                    <TemposMov dados={form} />

                    {/*** CONTATOS ***/}
                    <Contatos dados={form} />

                    {/*** MALAS ***/}
                    <Malas dados={form} />

                    {/*** EMERGENCIA ***/}
                    <Emergencia dados={form} />

                    {/*** PASSAPORTES ***/}
                    <Passaportes dados={form} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/***********************************/}
      {/**** PRINT ************************/}
      {/***********************************/}
      <Row className="dossie-consulta-container p-2 pt-0 d-none d-print-block">
        {/*** DADOS PROJETO ***/}
        <Col sm={12}>
          <DadosProjeto dados={form} />
        </Col>

        {/*** PASSAGEIROS TAG ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Passageiros dados={form} subtitulo="TAG" />
        </Col>

        {/*** PASSAGEIROS ALPHA ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Passageiros dados={form} subtitulo="ALFABÉTICA" />
        </Col>

        {/*** GROUP SPECS ***/}
        {/*
          <Col sm={12} className="d-print-pagebreak">
            <GroupSpecs dados={form} />
          </Col>
        */}

        {/*** TEMPOS E MOVIMENTOS ***/}
        <Col sm={12} className="d-print-pagebreak">
          <TemposMov dados={form} />
        </Col>

        {/*** CONTATOS ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Contatos dados={form} />
        </Col>

        {/*** MALAS ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Malas dados={form} />
        </Col>

        {/*** EMERGENCIA ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Emergencia dados={form} />
        </Col>

        {/*** PASSAPORTES ***/}
        <Col sm={12} className="d-print-pagebreak">
          <Passaportes dados={form} />
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Dossie);
