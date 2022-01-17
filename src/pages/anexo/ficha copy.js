///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { CardHeaderName, SaveButton, PageTitle } from '../../components';
import {
  upload, getDocData, saveAnexo, resetAnexoFicha, calculaTamanho, getAnexoFicha, setAnexoFixa, renderIcon, renderFoto,
} from '../../functions/anexo';
import { getCurrentDay } from '../../functions/sistema';

class Anexo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.idAnexo;
    resetAnexoFicha(this.props);
    await getAnexoFicha(this.props, id);
    setAnexoFixa(this.props.anexoFichaData);
    getCurrentDay('anexo-ficha-data');
    const page = this.props.location.pathname.split('/');
    this.setState({ page: `/${page[1]}/${page[2]}/${page[3]}/${page[4]}/${page[5]}` });
  }

  render() {
    return (
      <Container fluid className="p-0">
        <PageTitle
          history={this.props.history}
          title={this.props.title}
          subtitle={this.props.subtitle}
          voltar
          linkTo={this.state.page}
        />
        <Row>
          {/*** BODY ***/}
          <Col sm={8} md={8} lg={8} xl={9}>
            <Card className="anexo-ficha">
              <CardBody>
                <CardHeaderName {...this.props} titulo={this.props.anexoNome} />
                <Row>
                  {/*** DATA ***/}
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Data</Label>
                      <Input
                        type="date"
                        id="anexo-ficha-data"
                        name="anexo-ficha-data"
                        className="required"
                        maxLength={60}
                      />
                    </FormGroup>
                  </Col>
                  {/*** TITULO ***/}
                  <Col sm={8} md={8} lg={8} xl={8}>
                    <FormGroup>
                      <Label>Título</Label>
                      <Input
                        type="text"
                        id="anexo-ficha-titulo"
                        name="anexo-ficha-titulo"
                        className="required"
                        maxLength={60}
                      />
                    </FormGroup>

                  </Col>

                  <SaveButton save={() => saveAnexo(this.props)} />

                  {/*** OCULTO ***/}
                  <Col sm={12} className="hide">
                    <Row>
                      {/*** ID ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>Id</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id"
                            name="anexo-ficha-id"
                          />
                        </FormGroup>
                      </Col>
                      {/*** EXTENSAO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>EXTENSAO OCULTA</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-extensao"
                            name="anexo-ficha-extensao"
                          />
                        </FormGroup>
                      </Col>
                      {/*** TAMANHO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>TAMANHO OCULTA</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-tamanho"
                            name="anexo-ficha-tamanho"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ARQUIVO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ARQUIVO OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-arquivo"
                            name="anexo-ficha-arquivo"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ID PESSOA FISICA ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ID PESSOA FISICA - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id-pessoa-fisica"
                            name="anexo-ficha-id-pessoa-fisica"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ID PESSOA JURIDICA ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ID PESSOA JURIDICA - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id-pessoa-juridica"
                            name="anexo-ficha-id-pessoa-juridica"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ID MOVIMENTO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ID MOVIMENTO - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id-movimento"
                            name="anexo-ficha-id-movimento"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ID PROJETO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ID PROJETO - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id-projeto"
                            name="anexo-ficha-id-projeto"
                          />
                        </FormGroup>
                      </Col>
                      {/*** ID SERVICO ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>ID SERVICO - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-id-servico"
                            name="anexo-ficha-id-servico"
                          />
                        </FormGroup>
                      </Col>
                      {/*** atualizacao ***/}
                      <Col sm={4}>
                        <FormGroup>
                          <Label>atualizacao - OCULTO</Label>
                          <Input
                            type="text"
                            id="anexo-ficha-alt_dhsis"
                            name="anexo-ficha-alt_dhsis"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>

                </Row>
              </CardBody>
            </Card>
          </Col>
          {/*** FOTO ***/}
          <Col sm={4} md={4} lg={4} xl={3} className="pl-1">
            <Card className="anexo-ficha bg-dark text-white">
              <CardBody>
                <div className="text-center">
                  <div className="pb-2">
                    { renderIcon(this.props.anexoFichaData.extensao, 'anexo-icone') }
                  </div>

                  <div className="mt-3 mb-3">
                    <Button onClick={() => upload()} color="primary">
                      <FontAwesomeIcon icon={faUpload} />
                      {' '}
Upload
                    </Button>
                    <form encType="multipart/form-data" action="/upload/image" method="post">
                      <input id="doc-file" type="file" className="hide" onChange={() => getDocData(this.props)} />
                    </form>
                  </div>

                  <small>
                    Tamanho do arquivo:
                    {' '}
                    <span className="h6 text-light ml-2">{ calculaTamanho(this.props.anexoFichaData.tamanho) }</span>
                    <br />
                    Tamanho máximo:
                    {' '}
                    <span className="h6 text-light ml-2">3mb</span>
                  </small>
                </div>
              </CardBody>
            </Card>
          </Col>
           {/*** FOTO ***/}
           <Col sm={4} md={4} lg={4} xl={3} className="pl-1">
            <Card className="anexo-ficha bg-dark text-white">
              <CardBody>
                <div className="text-center">
                  <div className="pb-2">
                    <img  src={`data:image/gif;base64,${this.props.anexoFichaData.arquivo}`}  ></img>         
                    {/* // { renderFoto(this.props.anexoFichaData.arquivo, ) } */}
                  </div>

               

             
                </div>
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
  anexoNome: state.anexo.anexoNome,
  anexoFichaData: state.anexo.anexoFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(Anexo);
