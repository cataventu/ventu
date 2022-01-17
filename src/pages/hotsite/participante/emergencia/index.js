///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { faMedkit } from '@fortawesome/free-solid-svg-icons';
import { getDados, newFormatCelular } from '../../../../functions/sistema';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 5;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [eme_dparentesco, set_eme_dparentesco] = useState('');
  const [eme_dtelefone1, set_eme_dtelefone1] = useState('');
  const [eme_dtelefone2, set_eme_dtelefone2] = useState('');

  const [eme_nome, set_eme_nome] = useState('');
  const [eme_ntelefone1, set_eme_ntelefone1] = useState('');
  const [eme_ntelefone2, set_eme_ntelefone2] = useState('');

  const [eme_observacao, set_eme_observacao] = useState('');
  const [eme_par_outros, set_eme_par_outros] = useState('');
  const [eme_parentesco, set_eme_parentesco] = useState('');

  const [listaParentesco, set_listaParentesco] = useState([]);

  const updateCampos = useCallback((ws, store) => {
    let ficha;
    store !== null ? ficha = store : ficha = ws;

    const {
      eme_dparentesco,
      eme_dtelefone1,
      eme_dtelefone2,
      eme_nome,
      eme_ntelefone1,
      eme_ntelefone2,
      eme_observacao,
      eme_par_outros,
      eme_parentesco,
    } = ficha;

    set_eme_dparentesco(eme_dparentesco);
    set_eme_dtelefone1(eme_dtelefone1);
    set_eme_dtelefone2(eme_dtelefone2);

    set_eme_nome(eme_nome);
    set_eme_ntelefone1(eme_ntelefone1);
    set_eme_ntelefone2(eme_ntelefone2);

    set_eme_observacao(eme_observacao);
    set_eme_par_outros(eme_par_outros);
    set_eme_parentesco(eme_parentesco);
  }, []);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      set_campos(form);

      const _parentesco = await getDados(props, '/TsmSISTEMA/PARENTESCO_TABELA/', '');
      set_listaParentesco(_parentesco);

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_EMERGENCIA'));
      const _ws = await getDados(props, `/TsmPFISICA/EMERGENCIA_FICHA/${userData.id_pfisica}`, '');

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
  }, [firstLoad, props, updateCampos, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = {
        eme_dparentesco,
        eme_dtelefone1,
        eme_dtelefone2,
        eme_nome,
        eme_ntelefone1,
        eme_ntelefone2,
        eme_observacao,
        eme_par_outros,
        eme_parentesco,
      };

      localStorage.setItem('HOTSITE_PARTICIPANTE_EMERGENCIA', JSON.stringify(Form));
    }
  }, [firstLoad, eme_dparentesco, eme_dtelefone1, eme_dtelefone2, eme_nome, eme_ntelefone1, eme_ntelefone2, eme_observacao, eme_par_outros, eme_parentesco]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faMedkit}
          title="Emergência"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>
            <Col sm={4}>
              <FormGroup>
                <Label>Nome</Label>
                <Input
                  type="text"
                  maxLength={60}
                  value={eme_nome}
                  className="required"
                  onChange={(e) => set_eme_nome(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <Label>Parentesco</Label>
                <Input
                  type="select"
                  value={eme_parentesco}
                  className="required"
                  onChange={(e) => set_eme_parentesco(e.target.value)}
                >
                  <option value="0">Selecione</option>
                  { listaParentesco.map((item) => (
                    <option value={item.id}>{item.descricao}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <Label>Telefone</Label>
                <Input
                  type="text"
                  maxLength={60}
                  className="required"
                  value={eme_ntelefone1}
                  onChange={(e) => set_eme_ntelefone1(newFormatCelular(e.target.value))}
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
});
export default connect(() => (mapState))(Hotsite);
