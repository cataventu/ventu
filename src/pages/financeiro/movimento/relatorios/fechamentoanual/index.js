///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardHeader, Col, Container, Row, CardBody, FormGroup, Input, Label, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, Buttons } from '../../../../../components';
import { getDados } from '../../../../../functions/sistema';
import { saveFechamentoAnualFiltro } from '../../../../../functions/financeiro/movimento/relatorios/fechamentoanual';

function FechamentoAnualConsulta(props) {
  const [contas, setContas] = useState('oculta');
  const [firstLoad, setFirst] = useState(true);

  //////// FILTRO ////////
  const FiltroButtons = [
    <Buttons description="Download Planilha" color="green" onClick={() => saveFechamentoAnualFiltro(props)} title="Salva todas as configurações do filtro" />,
  ];

  useEffect(() => {
    const arrayContas = [];
    props.contaListaData.forEach((item) => {
      arrayContas.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setContas(arrayContas);
  }, [props.contaListaData]);

  useEffect(() => {
    if (firstLoad) {
      getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
      setFirst(false);
    }
  }, [props, firstLoad]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          title="Relatórios"
          subtitle="/ Fechamento Anual"
          voltar
          linkTo="/financeiro/movimento"
        />

        <Container id="relatorios-FechamentoAnual-filtro" fluid className="p-0">
          <Card className="bg-dark text-white">
            <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
              <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
            </CardHeader>
            <CardBody>
              {/*** CONTAS ***/}
              <Row>
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Conta</Label>
                    <Input type="select" multiple id="fechamento-anual-contas" name="fechamento-anual-contas">
                      { contas }
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                {/*** DATA ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data</Label>
                    <Input type="select" id="fechamento-anual-data" name="fechamento-anual-data">
                      <option value="0">Selecione...</option>
                      <option value="1">VENCIMENTO</option>
                      <option value="2">PAGAMENTO</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/*** ANO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Ano</Label>
                    <Input type="number" maxLength={4} id="fechamento-anual-ano" name="fechamento-anual-ano" />
                  </FormGroup>
                </Col>
              </Row>
              {/*** BUTTONS ***/}
              <Row>
                <Col sm={12} md={12} lg={12} className="text-right pt-4">
                  { FiltroButtons }
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>

      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  contaListaData: state.conta.contaListaData,
  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(FechamentoAnualConsulta);
