///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro } from '../../../functions/sistema';
import * as functions from '../../../functions/sistema/usuario';

class UsuarioFiltro extends Component {
  componentDidMount() {
    functions.setFieldsUsuarioFiltro(this.props.filtroData);
  }

  render() {
    ///////// ActionButtons /////////
    /////////////////////////////////
    const ActionButtons = [
      <Buttons description="Filtrar" icon="faFilter" color="primary" onClick={() => functions.saveUsuarioFiltro(this.props)} title="Salva todas as configurações do filtro" />,
      <Buttons description="Limpar" icon="faEraser" color="filtro-interno" onClick={() => functions.resetFieldsUsuarioFiltro(this.props)} title="Limpa todas as configurações do filtro" />,
      <Buttons description="Fechar" icon="faTimes" color="filtro-interno" onClick={() => toggleFiltro(this.props, 'tabela-usuario-filtro')} title="Limpa todas as configurações do filtro" />,
    ];

    ///////// RENDER FILTRO /////////
    /////////////////////////////////
    return (
      <Container id="tabela-usuario-filtro" fluid className="p-0 filter oculta">
        <Card className="bg-dark text-white">
          <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
            <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {/*** GMAIL ***/}
              {/*
                      <Col sm={4} md={4} lg={3} xl={3} >
                        <FormGroup>
                          <Label>Gmail</Label>
                          <Input  type="text" id="usuario-filtro-gmail"
                                  name="usuario-filtro-gmail"
                                  placeholder="Digite a informação que procura."
                          />
                        </FormGroup>
                      </Col>
                      */}
              {/*** NOME ***/}
              <Col sm={6} md={5} lg={3} xl={3}>
                <FormGroup>
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    id="usuario-filtro-nome"
                    name="usuario-filtro-nome"
                    maxLength={30}
                  />
                </FormGroup>
              </Col>
              {/*** EMAIL ***/}
              <Col sm={6} md={4} lg={3} xl={3}>
                <FormGroup>
                  <Label>E-mail</Label>
                  <Input
                    type="text"
                    id="usuario-filtro-email"
                    name="usuario-filtro-email"
                  />
                </FormGroup>
              </Col>
              {/*** SITUACAO ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Situação</Label>
                  <Input
                    type="select"
                    id="usuario-filtro-situacao"
                    name="usuario-filtro-situacao"
                  >
                    <option value="">Selecione...</option>
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </Input>
                </FormGroup>
              </Col>
              {/*** ATUALIZACAO MAIOR ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Atualização Maior que</Label>
                  <Input type="date" id="usuario-filtro-data-maior" name="usuario-filtro-data-maior" />
                </FormGroup>
              </Col>
              {/*** ATUALIZACAO MENOR ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Atualização Menor que</Label>
                  <Input type="date" id="usuario-filtro-data-menor" name="usuario-filtro-data-menor" />
                </FormGroup>
              </Col>

              <Col sm={12} className="text-right pt-4">
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
  filtroData: state.usuario.filtroData,

  auth: state.sistema.auth,
  filtroVisibility: state.sistema.filtroVisibility,
});
export default connect(() => (mapState))(UsuarioFiltro);
