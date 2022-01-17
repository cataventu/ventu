///////// IMPORTS ///////////////
/////////////////////////////////
import React, {
  Fragment, useEffect, useState, useCallback,
} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Row, Col, FormGroup, Input,
} from 'reactstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getDados } from '../../../../functions/sistema';
import Header from '../_header';


function Hotsite(props) {
  const stepAtual = 7;
  const  id_hash  = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState([]);

  const [inputs, set_inputs] = useState([]);
  const [rperfil_regs, set_rperfil_regs] = useState([]);

  const updateCampos = useCallback((form, ws, firstLoad) => {
    let ficha;

    const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_PERFIL'));
    _store !== null && firstLoad ? ficha = _store : ficha = ws;

    const { modulo_regs } = form;
    const { rperfil_regs } = ficha;

    const _temp = [];

    modulo_regs.forEach((modulo) => {
      switch (modulo.descricao) {
        case 'PERFIL':
          modulo.campo_regs.forEach((campo) => {
            if (campo.acesso) {
              rperfil_regs.forEach((ficha) => {
                if (ficha.perfil === campo.descricao) {
                  const {
                    id, perfil, id_perfil, inc_usuario, inc_dhsis, alt_usuario, alt_dhsis,
                  } = ficha;
                  const element = document.getElementById(`card-perfil-observacao-${campo.permissao}`);

                  if (firstLoad && element !== null) { element.value = ficha.observacao; }

                  let _inc_dhsis; let
                    _alt_dhsis;

                  inc_dhsis.substring(0, 4) === '1899'
                    ? _inc_dhsis = moment(Date.now()).format()
                    : _inc_dhsis = inc_dhsis;

                  alt_dhsis.substring(0, 4) === '1899'
                    ? _alt_dhsis = moment(Date.now()).format()
                    : _alt_dhsis = alt_dhsis;

                  _temp.push({
                    id,
                    perfil,
                    id_perfil,
                    observacao: element.value,
                    check: true,
                    inc_dhsis: _inc_dhsis,
                    inc_usuario,
                    alt_dhsis: _alt_dhsis,
                    alt_usuario,
                  });
                }
              });
            }
          });
          break;
        default: break;
      }
    });
    set_rperfil_regs(_temp);
  }, []);

  const renderCampos = useCallback((form, ficha) => {
    const _temp = [];
    const { modulo_regs } = form;
    modulo_regs.forEach((item) => {
      switch (item.descricao) {
        case 'PERFIL':
          item.campo_regs.forEach((item) => {
            if (item.acesso) {
              _temp.push(
                <Fragment key={`${item.permissao}`}>
                  <Col sm={3}>
                    <FormGroup>
                      <Input
                        type="text"
                        disabled
                        value={item.descricao}
                        id={`card-perfil-${item.permissao}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Input
                        type="text"
                        className="required"
                        id={`card-perfil-observacao-${item.permissao}`}
                        onChange={() => updateCampos(form, ficha, false)}
                      />
                    </FormGroup>
                  </Col>
                </Fragment>,
              );
            }
          });
          break;
        default: break;
      }
    });
    set_inputs(_temp);
  }, [updateCampos]);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));
      const { id_projeto } = userData;

      set_campos(form);
      
      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_PERFIL'));
      const _ws = await getDados(props, `/TsmRPERFIL/HOTSITE_FICHA/${userData.id_pfisica}/${id_projeto}`, '');

      await renderCampos(form, _ws);
      await updateCampos(form, _ws, true);
 
      setFirst(false);
    }
    render();
  }, [props, renderCampos, updateCampos]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      render();
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = { rperfil_regs };
      localStorage.setItem('HOTSITE_PARTICIPANTE_PERFIL', JSON.stringify(Form));
    }
  }, [firstLoad, rperfil_regs]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faUser}
          title="Perfil"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>{ inputs }</Row>
        </Col>

      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  step: state.hotsite_participante.step,
  id_pfisica: state.hotsite_participante.id_pfisica,
});
export default connect(() => (mapState))(Hotsite);
