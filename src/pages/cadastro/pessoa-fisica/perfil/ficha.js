///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card, CustomInput, CardBody, Table, Col, Input, Row, Container,
} from 'reactstrap';
//import { getDay, getMonth, getYear } from 'date-fns';
import {
  CheckboxPerfil, PageTitle, SaveButton, MenuPFisica, CardHeaderName,
} from '../../../../components';
import * as functions from '../../../../functions/cadastro/pessoa-fisica';

class FichaPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(this.props.match.params.id, 10),
      lista: [],
      resumo: [],
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await functions.getPerfilLista(this.props, id);
    this.setListaPerfil();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  ///////// KeyPress //////////////
  /////////////////////////////////
  handleKeyDown = (e) => {
    const keyPressed = e.key;
    if (keyPressed === 'Enter') { functions.savePFisicaPerfil(this.props, this.state.id); }
  }

  atualizaResumo = async (input) => {
    let data;
    switch (input.type) {
      ////// CASE TEXT - ATUALIZAÇÃO DA OBSERVAÇÃO
      //////////////////////////////
      case 'text':
        data = [];
        const newInfo = { id_perfil: input.id.replace('info-', ''), observacao: input.value };
        this.props.perfilResumeData.forEach((item) => {
          if (parseInt(item.id_perfil, 10) === parseInt(newInfo.id_perfil, 10)) {
            data.push({
              id: item.id,
              id_perfil: item.id_perfil,
              tipo: item.tipo,
              perfil: item.perfil,
              observacao: newInfo.observacao,
              inc_usuario: item.inc_usuario,
              inc_dhsis: item.inc_dhsis,
              alt_usuario: item.alt_usuario,
              alt_dhsis: item.alt_dhsis,
            });
          } else {
            data.push(item);
          }
        });
        break;

      ////// CASE CHECKBOX
      //////////////////////////////
      case 'checkbox':

        const value = input.value.split('-');
        const { id } = input;
        const tipo = value[0];
        const perfil = value[1];
        const observacao = document.getElementById(`info-${id}`).value;

        ////// CASO SEJA UM NOVO REGISTRO
        switch (input.checked) {
          case true:
            data = this.props.perfilResumeData;
            const new_dhsis = new Date();
            //new_dhsis = `${getYear(new_dhsis)}-${getMonth(new_dhsis)}-${getDay(new_dhsis)}T00:00:00.000Z`;
            const newData = {
              id: 0,
              id_perfil: parseInt(id, 10),
              tipo,
              perfil,
              observacao,
              inc_usuario: this.props.user.id,
              inc_dhsis: new_dhsis,

              alt_usuario: this.props.user.id,
              alt_dhsis: new_dhsis,
            };
            data.push(newData);
            break;

          ////// CASO ESTEJA DESMARCANDO UM REGISTRO
          case false:
            data = [];
            const deletar = { id_perfil: id };
            const filtroMarcador = document.getElementById('perfil-switch').value;
            if (filtroMarcador === 'off') { document.getElementById(`perfil-group-${deletar.id}`).classList.add('hide'); }

            this.props.perfilResumeData.forEach((item) => {
              if (parseInt(item.id_perfil, 10) !== parseInt(deletar.id_perfil, 10)) {
                data.push(item);
              }
            });
            break;
          default: return null;
        }

        break;
      default:
    }

    ////// ATUALIZA RESUMO
    await functions.setPFisicaPerfilResumo(this.props, data);

    ////// RECEBE NOVOS DADOS
    const newResumo = data;
    this.setState({ resumo: newResumo });
  }

  selecionaMarcados = (item) => {
    const perfil = item;
    const elements = document.getElementsByName('perfil-checkbox');
    switch (item.value) {
      case 'on':
        perfil.value = 'off';

        elements.forEach((item) => {
          const marcado = document.getElementById(item.id).checked;
          if (!marcado) {
            document.getElementById(`perfil-group-${item.id}`).classList.add('hide');
          }
        });
        break;
      case 'off':
        perfil.value = 'on';

        elements.forEach((item) => {
          document.getElementById(`perfil-group-${item.id}`).classList.remove('hide');
        });
        break;
      default:
    }
  }

  filtraTipos = (tipo) => {
    const elements = document.getElementsByName('perfil-checkbox');
    const marcados = document.getElementById('perfil-switch').value;

    elements.forEach((item) => {
      document.getElementById(`perfil-group-${item.id}`).classList.remove('hide');
    });

    if (tipo !== '0') {
      elements.forEach((item) => {
        const value = item.value.split('-');
        const t = value[0];

        switch (marcados) {
          case 'on':
            if (t !== tipo) {
              document.getElementById(`perfil-group-${item.id}`).classList.add('hide');
            }
            break;
          case 'off':
            const check = document.getElementById(item.id).checked;

            if (t === tipo && check === true) {
              document.getElementById(`perfil-group-${item.id}`).classList.remove('hide');
            } else {
              document.getElementById(`perfil-group-${item.id}`).classList.add('hide');
            }

            break;
          default: return null;
        }
      });
    }
  }

  setListaPerfil = () => {
    const newLista = [];
    const newResumo = [];

    this.props.perfilListaData.rperfil_regs.forEach((item) => {
      newLista.push(<CheckboxPerfil
        id={item.id_perfil}
        check={item.check}
        tipo={item.dtipo}
        perfil={item.perfil}
        observacao={item.observacao}
        onChange={(e) => this.atualizaResumo(e.target)}

      />);
      if (item.check) {
        newResumo.push({
          id: item.id,
          id_perfil: item.id_perfil,
          tipo: item.dtipo,
          perfil: item.perfil,
          observacao: item.observacao,
          inc_usuario: item.inc_usuario,
          inc_dhsis: item.inc_dhsis,
          alt_usuario: item.alt_usuario,
        });
      }
    });
    this.setState({ lista: newLista });
    this.setState({ resumo: newResumo });
    functions.setPFisicaPerfilResumo(this.props, newResumo);
  }

  render() {
    return (
      <Container fluid className="p-0">
        <PageTitle
          history={this.props.history}
          title="Pessoa Física"
          subtitle="/ Perfil"
          voltar
          linkTo="/cadastro/pessoa-fisica"
        />
        <Row>
          {/*** MENU ***/}
          <Col sm={3} md={3} lg={2} xl={2}>
            <MenuPFisica {...this.props} item_10="active" />
          </Col>
          {/*** BODY ***/}
          <Col sm={9} md={9} lg={10} xl={10} className="p-0">
            {/*** PAINEL PERFIL ***/}
            <div className="pl-1 perfil-column-lista">
              <Card className="perfil-ficha">
                <CardBody className="p-0">
                  <Row>
                    <Col className="col-12 card-header-name-perfil">
                      {/*** CARD HEADER ***/}
                      <CardHeaderName {...this.props} titulo={this.props.perfilListaData.nome} />
                    </Col>

                    <Col md={12} lg={4} className=""><h3 className="text-dark  pt-3 pl-3">Lista de Perfis</h3></Col>
                    <Col md={12} lg={8} className="pt-3">

                      <Row className="col-6 float-right pr-4">
                        <Col>
                          <Input onChange={(e) => this.filtraTipos(e.target.value)} type="select" bsSize="sm">
                            <option value="0">Tipo do perfil</option>
                            <option value="ACOMODAÇÃO">ACOMODAÇÃO</option>
                            <option value="GENÉRICO">GENÉRICO</option>
                            <option value="ALIMENTAR">ALIMENTAR</option>
                            <option value="VESTUÁRIO">VESTUÁRIO</option>
                            <option value="0">TODOS</option>
                          </Input>
                        </Col>
                      </Row>

                      <Row className="perfil-switch float-right p-0 m-0">
                        <Col className="perfil-switch-label">Exibir todos</Col>
                        <CustomInput className="perfil-switch-button" onChange={(e) => this.selecionaMarcados(e.target)} type="switch" id="perfil-switch" name="customSwitch" label="" />
                        <Col className="perfil-switch-label">Selecionados</Col>
                      </Row>

                    </Col>
                  </Row>

                  <div className="perfil-lista p-3">
                    { this.state.lista }
                  </div>

                </CardBody>
              </Card>
            </div>
            {/*** PAINEL RESUMO ***/}
            <div className="pl-1 perfil-column-resumo">
              <Card className="perfil-ficha">
                <CardBody>
                  <h3 className="text-dark pb-2">Perfis selecionados</h3>
                  <div className="perfil-table-container">
                    <Table size="sm">
                      <tbody>
                        { this.state.resumo.length > 0
                          ? this.state.resumo.map((item) => (
                            <tr>
                              <td className="bg-dark text-white pl-3" width="20px"><small>{ item.tipo.substring(0, 2) }</small></td>
                              <td className="bg-dark text-white pl-3" width="210px"><small>{ item.perfil }</small></td>
                              <td className="text-right border pr-3"><small>{ item.observacao }</small></td>
                            </tr>
                          )) : null}
                      </tbody>
                    </Table>
                  </div>
                  <SaveButton save={() => functions.savePFisicaPerfil(this.props, this.state.id)} />
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  perfilListaData: state.pFisica.perfilListaData,
  perfilResumeData: state.pFisica.perfilResumeData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

});
export default connect(() => (mapState))(FichaPerfil);
