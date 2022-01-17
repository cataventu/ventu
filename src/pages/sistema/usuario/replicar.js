///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PageTitle, SaveButton, AutoCompletarV2 } from '../../../components';
import { saveReplicar } from '../../../functions/sistema/usuario';

///////// FICHA /////////////////
/////////////////////////////////
function Replicar(props) {
  const [id_userOrigem, setId_userOrigem] = useState(0);
  const [userOrigem, setUserOrigem] = useState('');

  const [id_userDestino, setId_userDestino] = useState();
  const [userDestino, setUserDestino] = useState('');

  useEffect(() => {
    const {
      autoCompletarId_UsuarioOrigem,
      autoCompletarUsuarioOrigem,
      autoCompletarId_UsuarioDestino,
      autoCompletarUsuarioDestino,
    } = props;
    setUserOrigem(autoCompletarUsuarioOrigem);
    setId_userOrigem(autoCompletarId_UsuarioOrigem);
    setUserDestino(autoCompletarUsuarioDestino);
    setId_userDestino(autoCompletarId_UsuarioDestino);
  }, [props]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Usuário" subtitle="/ Cadastrar" voltar />
      <Row>
        <Col lg="12">
          <Card>
            <CardBody className="pb-0">

              <Row>
                {/*** USUARIO ORIGEM ***/}
                <Col sm={5} md={4} lg={3}>
                  <FormGroup>
                    <Label>Usuário Origem</Label>
                    <AutoCompletarV2
                      {...props}
                      value={userOrigem}
                      valueId={id_userOrigem}
                      tabela="USUARIO_ORIGEM"
                      nomeReserva
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id: 0, value: '', valueId: 0 }}
                    />
                  </FormGroup>
                </Col>

                <Col sm={2} md={1} lg={1} className="pt-4 text-center">
                  <FontAwesomeIcon size="3x" icon={faChevronRight} className="text-success" />
                  <FontAwesomeIcon size="3x" icon={faChevronRight} className="text-success" />
                </Col>

                {/*** USUÁRIO DESTINO ***/}
                <Col sm={5} md={4} lg={3}>
                  <FormGroup>
                    <Label>Usuário Destino</Label>
                    <AutoCompletarV2
                      {...props}
                      value={userDestino}
                      valueId={id_userDestino}
                      tabela="USUARIO_DESTINO"
                      nomeReserva
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id: 0, value: '', valueId: 0 }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {/*** SAVE BUTTON ***/}
              <Row>
                <SaveButton save={() => saveReplicar(props, id_userOrigem, id_userDestino)} />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  autoCompletarCursor: state.autoCompletar.autoCompletarCursor,
  autoCompletarVazio: state.autoCompletar.autoCompletarVazio,

  autoCompletarId_UsuarioOrigem: state.autoCompletar.autoCompletarId_UsuarioOrigem,
  autoCompletarUsuarioOrigem: state.autoCompletar.autoCompletarUsuarioOrigem,

  autoCompletarId_UsuarioDestino: state.autoCompletar.autoCompletarId_UsuarioDestino,
  autoCompletarUsuarioDestino: state.autoCompletar.autoCompletarUsuarioDestino,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Replicar);
