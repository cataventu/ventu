///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardHeader, Col, Container, Row, CardBody, FormGroup, Input, Label, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { PageTitle, Buttons } from '../../../../../components';
import { getDados } from '../../../../../functions/sistema';
import { saveFechamentoMensalFiltro } from '../../../../../functions/financeiro/movimento/relatorios/fechamentomensal';

function FechamentoMensalConsulta(props) {
  const [contas, setContas] = useState('oculta');
  const [firstLoad, setFirst] = useState(true);

  //////// FILTRO ////////
  const FiltroButtons = [
    <Buttons description="Download Planilha" color="green" onClick={() => saveFechamentoMensalFiltro(props)} title="Salva todas as configurações do filtro" />,
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
          subtitle="/ Fechamento Mensal"
          voltar
          linkTo="/financeiro/movimento"
        />

        <Container id="relatorios-fechamentomensal-filtro" fluid className="p-0">
          <Card className="bg-dark text-white">
            <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
              <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
            </CardHeader>
            <CardBody>
              {/*** CONTAS ***/}
              <Row>
                <Col sm={9} md={9} lg={6} xl={6}>
                  <FormGroup>
                    <Label>Conta</Label>
                    <Input type="select" multiple id="fechamento-mensal-contas" name="fechamento-mensal-contas">
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
                    <Input type="select" id="fechamento-mensal-data" name="fechamento-mensal-data">
                      <option value="0">Selecione...</option>
                      <option value="1">VENCIMENTO</option>
                      <option value="2">PAGAMENTO</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/*** MES ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Mês</Label>
                    <Input type="select" id="fechamento-mensal-mes" name="fechamento-mensal-mes">
                      <option value="0">Selecione...</option>
                      <option value="1">JANEIRO</option>
                      <option value="2">FEVEREIRO</option>
                      <option value="3">MARÇO</option>
                      <option value="4">ABRIL</option>
                      <option value="5">MAIO</option>
                      <option value="6">JUNHO</option>
                      <option value="7">JULHO</option>
                      <option value="8">AGOSTO</option>
                      <option value="9">SETEMBRO</option>
                      <option value="10">OUTUBRO</option>
                      <option value="11">NOVEMBRO</option>
                      <option value="12">DEZEMBRO</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/*** ANO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Ano</Label>
                    <Input type="number" maxLength={4} id="fechamento-mensal-ano" name="fechamento-mensal-ano" />
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
export default connect(() => (mapState))(FechamentoMensalConsulta);
