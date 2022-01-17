///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MenuParametros, SaveButton, PageTitle } from '../../../../components';
import { saveCategoria } from '../../../../functions/sistema/parametros';
import api from '../../../../services/api';
import { formatDataInput } from '../../../../functions/sistema';

const $ = require('jquery');

function CategoriaFicha(props) {
  const [firstLoad, setFirst] = useState(true);

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id, setId] = useState(0);

  const [cor, setCor] = useState('');
  const [descricao, setDescricao] = useState('');

  const [form, setForm] = useState({});

  const handleCategoria = useCallback(() => {
    const element = document.getElementById('parametros-categoria-Container');
    $(element).toggleClass('hide');
  }, []);

  const setColor = useCallback((cor) => {
    const element = document.getElementById('parametros-categoria');
    $(element).css('background-color', cor);

    const container = document.getElementById('parametros-categoria-Container');
    $(container).addClass('hide');

    const excluir = document.getElementById('parametros-categoria-excluir');
    $(excluir).removeClass('text-danger');

    switch (cor) {
      case '': $(excluir).addClass('text-danger'); break;
      case '#F9F9FF': $(excluir).addClass('text-danger'); break;
      case '#FFEEAD': $(excluir).addClass('text-danger'); break;
      case '#FFCC5C': $(excluir).addClass('text-danger'); break;
      default: $(excluir).addClass('text-white');
    }
    setCor(cor);
  }, []);

  const clearColor = useCallback(() => {
    const element = document.getElementById('parametros-categoria');
    $(element).css('background-color', '');
    setCor('');

    const container = document.getElementById('parametros-categoria-Container');
    $(container).addClass('hide');

    const excluir = document.getElementById('parametros-categoria-excluir');
    $(excluir).removeClass('text-white');
    $(excluir).addClass('text-danger');
  }, []);

  const getFicha = useCallback((id) => {
    async function getFicha(id) {
      if (id > 0) {
        const url = `/TsmPARAMETRO/RPARCAT_FICHA/${id}`;
        const ficha = await api.get(url, { auth: props.auth });
        const { cor, descricao, alt_dhsis } = ficha.data;
        setDescricao(descricao);
        setColor(cor);
        setAlt_dhsis(alt_dhsis);
      }
    }
    getFicha(id);
  }, [props, setColor]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId(id);
      getFicha(id);
      setFirst(false);
    }
  }, [props, firstLoad, setColor, getFicha]);

  useEffect(() => {
    setForm({
      id,
      cor,
      descricao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, cor, descricao, alt_dhsis, props.user]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Grupo" subtitle="/ Cadastrar" voltar />

      <Row>

        {/*** menuParametros ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuParametros {...props} item_4="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">
              <Row>
                {/*** ID ***/}
                <Col sm={2} md={2} lg={1} xl={1}>
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>

                {/*** CATEGORIA ***/}
                <Col sm={2} md={2} lg={1} xl={1} className="pl-1">
                  <FormGroup style={{ width: 80 }}>
                    <Label>Categoria</Label>
                    <div role="button" className="parametros-categoria-excluir p-2" onClick={() => clearColor()}>
                      <FontAwesomeIcon icon={faTrash} id="parametros-categoria-excluir" className="text-danger" />
                    </div>
                    <div
                      role="grid"
                      id="parametros-categoria"
                      className="form-control noselect"
                      onClick={() => handleCategoria()}
                    />
                    <ul id="parametros-categoria-Container" className="noselect paramentros-categoria-Container-ficha hide">
                      <li style={{ background: '#F9F9FF' }} onClick={() => setColor('#F9F9FF')}>&nbsp;</li>

                      <li style={{ background: '#FFEEAD' }} onClick={() => setColor('#FFEEAD')}>&nbsp;</li>
                      <li style={{ background: '#FFCC5C' }} onClick={() => setColor('#FFCC5C')}>&nbsp;</li>

                      <li style={{ background: '#E3A21A' }} onClick={() => setColor('#E3A21A')}>&nbsp;</li>
                      <li style={{ background: '#DA532C' }} onClick={() => setColor('#DA532C')}>&nbsp;</li>

                      <li style={{ background: '#EE1111' }} onClick={() => setColor('#EE1111')}>&nbsp;</li>
                      <li style={{ background: '#B91D47' }} onClick={() => setColor('#B91D47')}>&nbsp;</li>

                      <li style={{ background: '#00A300' }} onClick={() => setColor('#00A300')}>&nbsp;</li>
                      <li style={{ background: '#1E7145' }} onClick={() => setColor('#1E7145')}>&nbsp;</li>

                      <li style={{ background: '#2D89EF' }} onClick={() => setColor('#2D89EF')}>&nbsp;</li>
                      <li style={{ background: '#2B5797' }} onClick={() => setColor('#2B5797')}>&nbsp;</li>

                      <li style={{ background: '#7E3878' }} onClick={() => setColor('#7E3878')}>&nbsp;</li>
                      <li style={{ background: '#603CBA' }} onClick={() => setColor('#603CBA')}>&nbsp;</li>

                      <li style={{ background: '#212121' }} onClick={() => setColor('#212121')}>&nbsp;</li>
                    </ul>
                  </FormGroup>
                </Col>

                {/*** DESCRICAO***/}
                <Col sm={5} md={5} lg={6} xl={6}>
                  <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                      type="text"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DHSIS ***/}
                <Col sm={12} className="hide">
                  <small>
                    <span className="pr-3 text-black">Atualização:</span>
                    <span className="text-muted">
                      {/*{ alt_dusuario } */}
                      {' '}
-
                      {' '}
                      { alt_dhsis }
                    </span>
                  </small>
                </Col>

                {/*** SAVE ***/}
                <SaveButton save={() => saveCategoria(props, form)} />
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
  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(CategoriaFicha);
