///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { getDados } from '../../../../functions/sistema';
import { AutoCompletarV2 } from '../../../../components';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 2;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [id_pfisica, set_id_pfisica] = useState(0);
  const [resetEditar, set_resetEditar] = useState(false);

  const [id_profissao, set_id_profissao] = useState('');
  const [profissao, set_profissao] = useState('');
  const [id_pjuridica, set_id_pjuridica] = useState('');
  const [pjuridica, set_pjuridica] = useState('');

  const [codempresa, set_codempresa] = useState('');
  const [cargo, set_cargo] = useState('');
  const [complemento, set_complemento] = useState('');
  const [area, set_area] = useState('');

  const [visibility_profissao, set_visibility_profissao] = useState('hide');
  const [visibility_empresa, set_visibility_empresa] = useState('hide');
  const [visibility_cargo, set_visibility_cargo] = useState('hide');

  const [required_profissao, set_required_profissao] = useState(false);
  const [required_empresa, set_required_empresa] = useState(false);
  const [required_cargo, set_required_cargo] = useState('');

  const updateCampos = useCallback((ws, store) => {
    let ficha;
    store !== null ? ficha = store : ficha = ws;

    const {
      id_profissao,
      profissao,
      id_pjuridica,
      pjuridica,
      codempresa,
      complemento,
      cargo,
      area,
    } = ficha;

    set_id_profissao(id_profissao);
    set_profissao(profissao);
    set_id_pjuridica(id_pjuridica);
    set_pjuridica(pjuridica);
    set_codempresa(codempresa);
    set_cargo(cargo);
    set_complemento(complemento);
    set_area(area);

    set_resetEditar(true);
  }, []);

  const handleVisibility = useCallback((form) => {
    const { modulo_regs } = form;
    modulo_regs.forEach((modulo) => {
      switch (modulo.descricao) {
        case 'DADOS COMERCIAIS':
          modulo.campo_regs.forEach((campo) => {
            if (campo.acesso) {
              switch (parseInt(campo.permissao, 10)) {
                case 1: set_visibility_profissao(''); set_required_profissao(true); break;
                case 2: set_visibility_empresa(''); set_required_empresa(true); break;
                case 3: set_visibility_cargo(''); set_required_cargo('required'); break;
                default:
              }
            }
          });
          break;
        default:
      }
    });
  }, []);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      set_id_pfisica(userData.id_pfisica);
      set_campos(form);
      handleVisibility(form);

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_DADOS_COMERCIAIS'));
      const _ws = await getDados(props, `/TsmPFISICA/COMERCIAL_FICHA/${userData.id_pfisica}`, '');

      await updateCampos(_ws, _store);
    }
    render();
  }, [props, handleVisibility, updateCampos]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      render();
      setFirst(false);
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = {
        id_profissao,
        profissao,
        id_pjuridica,
        pjuridica,
        codempresa,
        complemento,
        cargo,
        area,
      };
      localStorage.setItem('HOTSITE_PARTICIPANTE_DADOS_COMERCIAIS', JSON.stringify(Form));
    }
  }, [area, cargo, codempresa, complemento, firstLoad, id_pjuridica, id_profissao, pjuridica, profissao]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    set_pjuridica(props.autoCompletarPjuridica);
    set_id_pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica, props.autoCompletarPjuridica]);

  useEffect(() => {
    set_profissao(props.autoCompletarProfissao);
    set_id_profissao(props.autoCompletarId_Profissao);
  }, [props.autoCompletarId_Profissao, props.autoCompletarProfissao]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faBuilding}
          title="Dados Comerciais"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>
            <Col sm={4} className={visibility_profissao}>
              <FormGroup>
                <Label>Profissão</Label>
                <AutoCompletarV2
                  {...props}
                  value={profissao}
                  valueId={id_profissao}
                  required={required_profissao}
                  tabela="PROFISSAO"
                  campo=""
                  disabled={false}
                  visible
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: profissao, valueId: id_profissao }}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_empresa}>
              <FormGroup>
                <Label>Empresa</Label>
                <AutoCompletarV2
                  {...props}
                  value={pjuridica}
                  valueId={id_pjuridica}
                  required={required_empresa} //true / false
                  tabela="PJURIDICA"
                  campo=""
                  disabled={false}
                  visible
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: pjuridica, valueId: id_pjuridica }}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_cargo}>
              <FormGroup>
                <Label>Cargo</Label>
                <Input
                  className={required_cargo}
                  type="text"
                  maxLength={120}
                  value={cargo}
                  onChange={(e) => set_cargo(e.target.value)}
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

  autoCompletarId_Profissao: state.autoCompletar.autoCompletarId_Profissao,
  autoCompletarProfissao: state.autoCompletar.autoCompletarProfissao,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
  autoCompletarPjuridica: state.autoCompletar.autoCompletarPjuridica,
});
export default connect(() => (mapState))(Hotsite);
