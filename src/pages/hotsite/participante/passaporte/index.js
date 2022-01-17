///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { formatDataInput, getPagina } from '../../../../functions/sistema';
import { AutoCompletarV2 } from '../../../../components';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 6;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [id_pfisica, set_id_pfisica] = useState(0);
  const [resetEditar, set_resetEditar] = useState(false);

  const [id_passaporte, set_id_passaporte] = useState(0);

  const [id_pais, set_id_pais] = useState(0);
  const [pais, set_pais] = useState('');

  const [id_pais_emissao, set_id_pais_emissao] = useState(0);
  const [pais_emissao, set_pais_emissao] = useState('');

  const [nome_passaporte, set_nome_passaporte] = useState('');
  const [numero, set_numero] = useState('');
  const [dt_emissao, set_dt_emissao] = useState('');
  const [dt_validade, set_dt_validade] = useState('');

  const updateCampos = useCallback((ws, store) => {
    let ficha;

    if (store !== null) {
      ficha = store;
    } else {
      const { rpassaporte_regs } = ws;
      if (rpassaporte_regs.length > 0) {
        ws.rpassaporte_regs.forEach((passaporte) => {
          const { padrao } = passaporte;
          if (padrao) { ficha = passaporte; }
        });
      }
    }

    if (ficha === undefined) { return; }

    const {
      id, id_pais, pais, id_pais_emissao,
      pais_emissao, nome_passaporte, numero, dt_emissao,
      dt_validade,
    } = ficha;

    set_id_passaporte(id);

    set_id_pais(id_pais);
    set_pais(pais);

    set_id_pais_emissao(id_pais_emissao);
    set_pais_emissao(pais_emissao);

    set_nome_passaporte(nome_passaporte);
    set_numero(numero);

    if (store !== null) {
      set_dt_emissao(dt_emissao);
      set_dt_validade(dt_validade);
    } else {
      set_dt_emissao(formatDataInput(dt_emissao));
      set_dt_validade(formatDataInput(dt_validade));
    }

    set_resetEditar(true);
  }, []);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      set_id_pfisica(userData.id_pfisica);
      set_campos(form);

      const filtro = { id_pfisica: parseInt(userData.id_pfisica, 10), id_pjuridica: 0 };

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_PASSAPORTE'));
      const _ws = await getPagina(props, '/TsmRPASSAPORTE/PAGINA', '', filtro, '');

      await updateCampos(_ws, _store);
      setFirst(false);
    }
    render();
  }, [props, updateCampos]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      render();
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const form = {
        id_passaporte,
        id_pfisica,
        id_pjuridica: 0,
        pais,
        id_pais,
        pais_emissao,
        id_pais_emissao,
        nome_passaporte,
        numero,
        dt_emissao,
        dt_validade,
        padrao: true,
      };

      localStorage.setItem('HOTSITE_PARTICIPANTE_PASSAPORTE', JSON.stringify(form));
    }
  }, [dt_emissao, dt_validade, firstLoad, id_pais, id_pais_emissao, id_passaporte, id_pfisica, nome_passaporte, numero, pais, pais_emissao]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    set_id_pais(props.AC_Id_Pais);
  }, [props.AC_Id_Pais]);

  useEffect(() => {
    set_id_pais_emissao(props.AC_Id_PaisEmissao);
  }, [props.AC_Id_PaisEmissao]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faPlane}
          title="Passaporte"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>

            {/*** ID ***/}
            <Col sm={3} className="hide">
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="text"
                  disabled
                  value={id_passaporte}
                  onChange={(e) => set_id_passaporte(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** PAIS ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>País</Label>
                <AutoCompletarV2
                  {...props}
                  value={pais}
                  valueId={id_pais}
                  tabela="PAIS"
                  campo="PAIS"
                  disabled={false}
                  visible
                  required
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: pais, valueId: id_pais }}
                />
              </FormGroup>
            </Col>

            {/*** NOME ***/}
            <Col sm={9}>
              <FormGroup>
                <Label>Nome</Label>
                <Input
                  type="text"
                  maxLength={60}
                  className="required"
                  value={nome_passaporte}
                  onChange={(e) => set_nome_passaporte(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** PAIS EMISSAO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>País Emissão</Label>
                <AutoCompletarV2
                  {...props}
                  value={pais_emissao}
                  valueId={id_pais_emissao}
                  tabela="PAISEMISSAO"
                  campo="PAISEMISSAO"
                  disabled={false}
                  visible
                  required
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: pais_emissao, valueId: id_pais_emissao }}
                />
              </FormGroup>
            </Col>

            {/*** NUMERO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="text"
                  className="required"
                  maxLength={20}
                  value={numero}
                  onChange={(e) => set_numero(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** DATA EMISSAO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Data Emissão</Label>
                <Input
                  type="date"
                  value={dt_emissao}
                  className="required"
                  onChange={(e) => set_dt_emissao(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** DATA VALIDADE ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Data Validade</Label>
                <Input
                  type="date"
                  value={dt_validade}
                  className="required"
                  onChange={(e) => set_dt_validade(e.target.value)}
                />
              </FormGroup>
            </Col>

          </Row>
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

  AC_Id_Pais: state.autoCompletar.autoCompletarId_Pais,
  AC_Id_PaisEmissao: state.autoCompletar.autoCompletarId_PaisEmissao,
});
export default connect(() => (mapState))(Hotsite);
