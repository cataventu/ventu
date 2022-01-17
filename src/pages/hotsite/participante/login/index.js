///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleEntrar, getFichaHotsite } from '../../../../functions/hotsite/participante';
import { formatCPF } from '../../../../functions/sistema';
import { getBanner, hotsiteFicha } from '../../../../functions/hotsite/projeto';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 0;
  const { id_projeto, id_hash } = props.match.params;

  const dados = { modulo_regs: [] };

  const [firstLoad, setFirst] = useState(true);

  const [nacionalidade, set_nacionalidade] = useState('1');
  const [cpf, set_cpf] = useState('');
  const [passaporte, set_passaporte] = useState('');

  const [visibility_vazio, set_visibility_vazio] = useState('');
  const [visibility_cpf, set_visibility_cpf] = useState('hide');
  const [visibility_passaporte, set_visibility_passaporte] = useState('hide');

  const [form, set_form] = useState({});

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      localStorage.removeItem('HOTSITE_PARTICIPANTE_FICHA');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_USER_DATA');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_ID_PFISICA');

      localStorage.removeItem('HOTSITE_PARTICIPANTE_DADOS_PESSOAIS');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_DADOS_COMERCIAIS');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_CONTATO');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_EMERGENCIA');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_ENDERECO');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_PASSAPORTE');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_PERFIL');
      localStorage.removeItem('HOTSITE_PARTICIPANTE_ANEXO');
      hotsiteFicha(props, 2);
      getBanner(id_projeto, props);
      getFichaHotsite(id_projeto, props);
      setFirst(false);
    }
  }, [props, firstLoad, id_projeto]);

  ////// DOCUMENTO
  useEffect(() => {
    switch (nacionalidade) {
      case '1':
        set_visibility_vazio('hide');
        set_visibility_cpf('');
        set_visibility_passaporte('hide');
        break;
      case '2':
        set_visibility_vazio('hide');
        set_visibility_cpf('hide');
        set_visibility_passaporte('');
        break;
      default:
        set_visibility_vazio('');
        set_visibility_cpf('hide');
        set_visibility_passaporte('hide');
        break;
    }
  }, [nacionalidade]);

  useEffect(() => {
    const dados = {
      id_hash,
      id_projeto,
      cpf,
      passaporte,
    };

    set_form(dados);
  }, [nacionalidade, id_projeto, passaporte, cpf, id_hash]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faDoorOpen}
          title="Login"
          page={stepAtual}
          id={id_hash}
          dados={dados}
        />

        {/*** NACIONALIDADE ***/}
        <Col sm={3}>
          <FormGroup>
            <Label className="h5 text-dark">Nacionalidade</Label>
            <Input
              type="select"
              value={nacionalidade}
              onChange={(e) => set_nacionalidade(e.target.value)}
            >
              <option value="0">Selecione...</option>
              <option value="1">Brasileiro</option>
              <option value="2">Estrangeiro</option>
            </Input>
          </FormGroup>
        </Col>
        {/*** VAZIO ***/}
        <Col sm={3} className={visibility_vazio}>
          <FormGroup>
            <Label className="h5 text-dark">Documento</Label>
            <Input
              type="text"
              value=""
              disabled
            />
          </FormGroup>
        </Col>
        {/*** CPF ***/}
        <Col sm={3} className={visibility_cpf}>
          <FormGroup>
            <Label className="h5 text-dark">CPF</Label>
            <Input
              type="text"
              value={cpf}
              onChange={(e) => set_cpf(formatCPF(e.target.value))}
            />
          </FormGroup>
        </Col>
        {/*** PASSAPORTE ***/}
        <Col sm={3} className={visibility_passaporte}>
          <FormGroup>
            <Label className="h5 text-dark">Passaporte</Label>
            <Input
              type="text"
              value={passaporte}
              onChange={(e) => set_passaporte(e.target.value)}
            />
          </FormGroup>
        </Col>

        {/*** BTN ENTRAR ***/}
        <Col sm={2} className="pl-1">
          <Button className="btn mt-2 bg-primary border-none ml-2" title="" onClick={() => handleEntrar(form, props)}>
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
