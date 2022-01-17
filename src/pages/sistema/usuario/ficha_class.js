///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Checkbox, PageTitle, SaveButton } from '../../../components';

//import AutoCompletar from '../../../components';
//import { resetFieldsUsuarioFicha, getUsuarioFicha, setUsuarioFichaData, saveUsuario,
//permissionListModulos, permissionListFunctions, saveReplicar } from "../../../functions/sistema/usuario";
//import { upperCaseAll, formatCelular, autoCompletar } from "../../../functions/sistema";
import {
  resetFieldsUsuarioFicha, getUsuarioFicha, setUsuarioFichaData, saveUsuario, permissionListModulos, permissionListFunctions,
} from '../../../functions/sistema/usuario';
import { formatCelular } from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
class UsuarioFicha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      Tab1: 'bg-primary text-white border',
      Tab2: 'bg-white border',
    };
  }

  async componentDidMount() {
    /// RESET
    resetFieldsUsuarioFicha(this.props);
    /// AJUSTA FOCUS E SITUACAO PADRÃO
    document.getElementById('usuario-ficha-nome').focus();
    document.getElementById('usuario-ficha-situacao').checked = true;
    /// RECEBE DADOS
    await getUsuarioFicha(this.props, this.props.match.params.id);
    setUsuarioFichaData(this.props.fichaData);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }

    switch (tab) {
      case '1':
        this.setState({ Tab1: 'bg-primary text-white border' });
        this.setState({ Tab2: 'bg-white border' });
        break;
      case '2':
        this.setState({ Tab1: 'bg-white border' });
        this.setState({ Tab2: 'bg-primary text-white border' });
        break;
      default:
    }
  }

  render() {
    return (
      <Container fluid className="p-0">
        <PageTitle history={this.props.history} title="Usuário" subtitle="/ Cadastrar" voltar />
        <Row>
          <Col lg="12">
            {/****** NAVIGATION ******/}
            {/************************/}
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={this.state.Tab1}
                  onClick={() => { this.toggle('1'); }}
                >
                  Dados
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.Tab2}
                  onClick={() => { this.toggle('2'); }}
                >
                  Permissões
                </NavLink>
              </NavItem>
              {/*<NavItem>
                  <NavLink
                    className={this.state.Tab3}
                    onClick={() => { this.toggle("3"); }}
                  >
                  Replicar permissões
                  </NavLink>
                </NavItem> */}
            </Nav>
            {/****** CONTEÚDO ********/}
            {/************************/}
            <Card>
              <CardBody className="pb-0 m-0 pl-3 pr-3 pt-0">

                <TabContent activeTab={this.state.activeTab}>
                  {/****** TAB 01 **********/}
                  {/************************/}
                  <TabPane tabId="1">
                    <Row className="pt-3">
                      {/*** ID ***/}
                      <Col sm={2} md={2} lg={1} xl={1}>
                        <FormGroup>
                          <Label>Id</Label>
                          <Input
                            type="text"
                            disabled
                            id="usuario-ficha-id"
                            name="usuario-ficha-id"
                          />
                        </FormGroup>
                      </Col>
                      {/*** NOME ***/}
                      <Col sm={5} md={3} lg={3} xl={3}>
                        <FormGroup>
                          <Label>Nome</Label>
                          <Input
                            type="text"
                            className="required"

                            maxLength={30}
                            id="usuario-ficha-nome"
                            name="usuario-ficha-nome"
                          />
                        </FormGroup>
                      </Col>
                      {/*** E-MAIL ***/}
                      <Col sm={5} md={3} lg={3} xl={3}>
                        <FormGroup>
                          <Label>E-mail</Label>
                          <Input
                            type="text"
                            className="email"
                            maxLength={60}
                            id="usuario-ficha-email"
                            name="usuario-ficha-email"
                          />
                        </FormGroup>
                      </Col>
                      {/*** CELULAR ***/}
                      <Col sm={4} md={3} lg={3} xl={3}>
                        <FormGroup>
                          <Label>Celular</Label>
                          <Input
                            type="text"
                            onChange={() => formatCelular('usuario-ficha-celular')}
                            maxLength={16}
                            id="usuario-ficha-celular"
                            name="usuario-ficha-celular"
                          />
                        </FormGroup>
                      </Col>
                      {/*** SITUACAO ***/}
                      <Col sm={8} md={1} lg={1} xl={1}>
                        <FormGroup className="text-right">
                          <Label>Situação</Label>
                          <Checkbox info="Ativo" id="usuario-ficha-situacao" name="usuario-ficha-situacao" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  {/****** TAB 02 **********/}
                  {/************************/}
                  <TabPane tabId="2">
                    <Row className="pb-1 border-dark-2">
                      {/*** COL 01 - MODULOS ***/}
                      <Col sm={6} className="p-0 m-0 border-dark-right-2">
                        { permissionListModulos(this.props) }
                      </Col>

                      {/*** COL 02 - FUNCOES ***/}
                      <Col sm={6}>
                        <div className="row p-2 pl-3 bg-dark text-white">Funções</div>
                        { permissionListFunctions(this.props) }
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

                <Row className="pb-3">
                  <Col>
                    <SaveButton save={() => saveUsuario(this.props)} />
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.usuario.fichaData,
  filtroData: state.usuario.filtroData,

  userLastContainerSelect: state.usuario.userLastContainerSelect,
  userLastLineSelect: state.usuario.userLastLineSelect,

  autoCompletarCursor: state.autoCompletar.autoCompletarCursor,
  autoCompletarVazio: state.autoCompletar.autoCompletarVazio,

  autoCompletarId_Usuario: state.autoCompletar.autoCompletarId_Usuario,
  autoCompletarUsuario: state.autoCompletar.autoCompletarUsuario,

  //visibilityPageSistema:  state.usuario.visibilityPageSistema,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(UsuarioFicha);
