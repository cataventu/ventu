///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Input, Label, Button,
} from 'reactstrap';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBanner, hotsiteFicha } from '../../../../functions/hotsite/projeto';
import { showMSG } from '../../../../components';

function Hotsite(props) {
  const { history } = props;
  const { id_projeto, id_hash } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [senha, set_senha] = useState('');
  const [acesso, set_acesso] = useState('');

  const handleEntrar = useCallback((senha, acesso) => {
    senha !== acesso
      ? showMSG('Acesso bloqueado', 'Favor tentar novamente', 'error', 4000)
      : history.push(`/hotsite/contratante/rsvp/${id_projeto}/${id_hash}`);
  }, [history, id_hash, id_projeto]);

  const getPagina = useCallback((id_projeto) => {
    async function getPagina(id_projeto) {
      getBanner(id_projeto, props);
      const acesso = await hotsiteFicha(props, 1);
      set_acesso(acesso);
    }
    getPagina(id_projeto);
  }, [props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      getPagina(id_projeto);
    }
  }, [firstLoad, id_projeto, getPagina]);

  return (
    <>
      <Row className="body-hotsite pt-4 pb-4">

        {/*** LOGIN ***/}
        <Col sm={3}>
          <FormGroup>
            <Label className="h5 text-dark">Senha de acesso</Label>
            <Input
              type="text"
              value={senha}
              onChange={(e) => set_senha(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** BTN ENTRAR ***/}
        <Col sm={2} className="pl-1">
          <Button className="btn mt-2 bg-primary border-none ml-2" title="" onClick={() => handleEntrar(senha, acesso)}>
            <FontAwesomeIcon icon={faDoorOpen} className="p-0 m-0 h5 cursor mr-2 text-white" />
               Entrar
          </Button>
        </Col>

      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(Hotsite);
