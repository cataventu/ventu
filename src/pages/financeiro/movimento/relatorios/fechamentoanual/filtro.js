///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../../../components';
import { toggleFiltro, getDados } from '../../../../../functions/sistema';
import { saveFechamentoAnualFiltro } from '../../../../../functions/financeiro/movimento/relatorios/fechamentoanual';

///////// FILTRO FECHAMENTO MESNAL //////////
/////////////////////////////////
class FechamentoAnualFiltro extends Component {
  async componentDidMount() {
    /// RESET
    //resetFieldsFechamentoAnualFiltro(this.props);
    /// RECEBE DADOS
    await getDados(this.props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
    /// RECEBE COOKIE
    //await recebeCookie('relatorioFechamentoAnual', this.props);
  }

  render() {
    ///////// ActionButtons /////////
    /////////////////////////////////
    const ActionButtons = [
      <Buttons description="Filtrar" color="primary" onClick={() => saveFechamentoAnualFiltro(this.props)} title="Salva todas as configurações do filtro" />,
      <Buttons description="Limpar" color="filtro-interno" onClick={() => console.log(this.props)} title="Limpa todas as configurações do filtro" />,
      <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(this.props, 'relatorios-FechamentoAnual-filtro')} title="Limpa todas as configurações do filtro" />,
    ];

    const conta = [];
    this.props.contaListaData.forEach((item) => {
      conta.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });

    return (
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
                    {conta}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {/*** DATAS ***/}
            <Row>
              {/*** MES ***/}
              <Col sm={3} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Mês</Label>
                  <Input type="select" id="fechamento-anual-mes" name="fechamento-anual-mes">
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
                  <Input type="number" maxLength={4} id="fechamento-anual-ano" name="fechamento-anual-ano" />
                </FormGroup>
              </Col>
            </Row>
            {/*** BUTTONS ***/}
            <Row>
              <Col sm={12} md={12} lg={12} className="text-right pt-4">
                { ActionButtons }
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  contaListaData: state.conta.contaListaData,

  filtroData: state.fechamentoanual.filtroData,

  auth: state.sistema.auth,

  filtroVisibility: state.sistema.filtroVisibility,
});
export default connect(() => (mapState))(FechamentoAnualFiltro);
