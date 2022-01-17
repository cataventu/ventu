///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import {
  formatDataInput, getDados, formatCPF, formatRG,
} from '../../../../functions/sistema';
import { AutoCompletarV2 } from '../../../../components';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 1;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  const [id_pfisica, set_id_pfisica] = useState(0);
  const [resetEditar, set_resetEditar] = useState(false);

  const [id, set_id] = useState(0);
  const [nome_completo, set_nome_completo] = useState('');
  const [nome_reserva, set_nome_reserva] = useState('');
  const [nome_cracha, set_nome_cracha] = useState('');

  const [rg, set_rg] = useState('');
  const [rne, set_rne] = useState('');
  const [cpf, set_cpf] = useState('');

  const [nac_id_pais, set_nac_id_pais] = useState(0);
  const [nacionalidade, set_nacionalidade] = useState('');

  const [pro_id_aeroporto, set_pro_id_aeroporto] = useState(0);
  const [pro_aeroporto, set_pro_aeroporto] = useState('');

  const [dt_nascimento, set_dt_nascimento] = useState('');
  const [estado_civil, set_estado_civil] = useState('');
  const [genero, set_genero] = useState('');

  const [visibility_nome_completo, set_visibility_nome_completo] = useState('hide');
  const [visibility_nome_reserva, set_visibility_nome_reserva] = useState('hide');
  const [visibility_nome_cracha, set_visibility_nome_cracha] = useState('hide');

  const [visibility_rg, set_visibility_rg] = useState('hide');
  const [visibility_rne, set_visibility_rne] = useState('hide');
  const [visibility_cpf, set_visibility_cpf] = useState('hide');

  const [visibility_nacionalidade, set_visibility_nacionalidade] = useState('hide');
  const [visibility_pro_aeroporto, set_visibility_pro_aeroporto] = useState('hide');
  const [visibility_dt_nascimento, set_visibility_dt_nascimento] = useState('hide');

  const [visibility_estado_civil, set_visibility_estado_civil] = useState('hide');
  const [visibility_genero, set_visibility_genero] = useState('hide');
  const [visibility_genero_outros, set_visibility_genero_outros] = useState('hide');

  const [required_nome_completo, set_required_nome_completo] = useState('');
  const [required_nome_reserva, set_required_nome_reserva] = useState('');
  const [required_nome_cracha, set_required_nome_cracha] = useState('');

  const [required_rg, set_required_rg] = useState('');
  const [required_rne, set_required_rne] = useState('');
  const [required_cpf, set_required_cpf] = useState('');

  const [required_nacionalidade, set_required_nacionalidade] = useState(false);
  const [required_pro_aeroporto, set_required_pro_aeroporto] = useState(false);
  const [required_dt_nascimento, set_required_dt_nascimento] = useState('');

  const [required_estado_civil, set_required_estado_civil] = useState('');
  const [required_genero, set_required_genero] = useState('');
  const [required_genero_outros, set_required_genero_outros] = useState('');

  const [listaEstadoCivil, set_listaEstadoCivil] = useState([]);
  const [listaGenero, set_listaGenero] = useState([]);

  const handleGenero = useCallback((genero) => {
    parseInt(genero, 10) === 3
      ? set_visibility_genero_outros('')
      : set_visibility_genero_outros('hide');

    parseInt(genero, 10) === 3
      ? set_required_genero_outros('required')
      : set_required_genero_outros('');
  }, []);

  const updateCampos = useCallback((ws, store) => {
    let ficha;
    store !== null ? ficha = store : ficha = ws;

    const {
      id,
      nome_completo,
      nome_reserva,
      nome_cracha,
      rg,
      rne,
      cpf,
      nacionalidade,
      pro_aeroporto,
      dt_nascimento,
      estado_civil,
      genero,
    } = ficha;

    if (id > 0) {
      set_id(id);
      set_nome_completo(nome_completo);
      set_nome_reserva(nome_reserva);
      set_nome_cracha(nome_cracha);

      set_rg(rg);
      set_rne(rne);
      set_cpf(cpf);

      set_nacionalidade(nacionalidade);
      set_pro_aeroporto(pro_aeroporto);
      set_dt_nascimento(formatDataInput(dt_nascimento));

      set_estado_civil(estado_civil);
      set_genero(genero);

      set_resetEditar(true);
    }
  }, []);

  const handleVisibility = useCallback((form) => {
    const { modulo_regs } = form;
    modulo_regs.forEach((modulo) => {
      switch (modulo.descricao) {
        case 'DADOS PESSOAIS':
          modulo.campo_regs.forEach((campo) => {
            if (campo.acesso) {
              switch (parseInt(campo.permissao, 10)) {
                case 1: set_required_nome_completo('required'); set_visibility_nome_completo(''); break;
                case 2: set_required_nome_reserva('required'); set_visibility_nome_reserva(''); break;
                case 3: set_required_nome_cracha('required'); set_visibility_nome_cracha(''); break;
                case 4: set_required_rg('required'); set_visibility_rg(''); break;
                case 5: set_required_cpf('required'); set_visibility_cpf(''); break;
                case 6: set_required_rne('required'); set_visibility_rne(''); break;
                case 7: set_required_nacionalidade(true); set_visibility_nacionalidade(''); break;
                case 8: set_required_pro_aeroporto(true); set_visibility_pro_aeroporto(''); break;
                case 9: set_required_dt_nascimento('required'); set_visibility_dt_nascimento(''); break;
                case 10: set_required_estado_civil('required'); set_visibility_estado_civil(''); break;
                case 11: set_required_genero('required'); set_visibility_genero(''); break;
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
    async function renderHTML() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      const { id_pfisica, cpf } = userData;

      set_id_pfisica(id_pfisica);
      set_cpf(cpf);
      set_campos(form);
      handleVisibility(form);

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_DADOS_PESSOAIS'));
      const _ws = await getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${userData.id_pfisica}`, '');

      const _genero = await getDados(props, '/TsmSISTEMA/GENERO_TABELA/', '');
      set_listaGenero(_genero);

      const _estado_civil = await getDados(props, '/TsmSISTEMA/ESTADO_CIVIL_TABELA/', '');
      set_listaEstadoCivil(_estado_civil);

      await updateCampos(_ws, _store);
      setFirst(false);
    }
    renderHTML();
  }, [props, handleVisibility, updateCampos]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      render();
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = {
        id,
        nome_completo,
        nome_reserva,
        nome_cracha,
        rg,
        rne,
        cpf,
        nac_id_pais,
        nacionalidade,
        pro_id_aeroporto,
        pro_aeroporto,
        dt_nascimento,
        estado_civil,
        genero,
      };
      localStorage.setItem('HOTSITE_PARTICIPANTE_DADOS_PESSOAIS', JSON.stringify(Form));
    }
  }, [cpf, dt_nascimento, estado_civil, firstLoad, genero, id, nac_id_pais, nacionalidade, nome_completo, nome_cracha, nome_reserva, pro_aeroporto, pro_id_aeroporto, rg, rne]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    set_nac_id_pais(props.autoCompletarId_Pais);
  }, [props.autoCompletarId_Pais]);

  useEffect(() => {
    set_pro_id_aeroporto(props.autoCompletarId_Aeroporto);
  }, [props.autoCompletarId_Aeroporto]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faAddressBook}
          title="Dados Pessoais"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULÁRIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>

            <Col sm={4} className={visibility_nome_completo}>
              <FormGroup>
                <Label>Nome completo</Label>
                <Input
                  type="text"
                  maxLength={60}
                  value={nome_completo}
                  className={required_nome_completo}
                  onChange={(e) => set_nome_completo(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_nome_reserva}>
              <FormGroup>
                <Label>Nome p/ reserva</Label>
                <Input
                  type="text"
                  maxLength={60}
                  value={nome_reserva}
                  className={required_nome_reserva}
                  onChange={(e) => set_nome_reserva(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_nome_cracha}>
              <FormGroup>
                <Label>Nome p/ Crachá</Label>
                <Input
                  type="text"
                  value={nome_cracha}
                  className={required_nome_cracha}
                  onChange={(e) => set_nome_cracha(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_rg}>
              <FormGroup>
                <Label>RG</Label>
                <Input
                  type="text"
                  maxLength={15}
                  value={rg}
                  className={required_rg}
                  onChange={(e) => set_rg(formatRG(e.target.value))}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_rne}>
              <FormGroup>
                <Label>RNE</Label>
                <Input
                  type="text"
                  maxLength={20}
                  value={rne}
                  className={required_rne}
                  onChange={(e) => set_rne(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_cpf}>
              <FormGroup>
                <Label>CPF</Label>
                <Input
                  type="text"
                  maxLength={14}
                  value={cpf}
                  className={required_cpf}
                  onChange={(e) => set_cpf(formatCPF(e.target.value))}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_nacionalidade}>
              <FormGroup>
                <Label>Nacionalidade</Label>

                <AutoCompletarV2
                  {...props}
                  value={nacionalidade}
                  required={required_nacionalidade}
                  valueId={nac_id_pais}
                  tabela="PAIS"
                  campo="NACIONALIDADE"
                  disabled={false}
                  visible
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: nacionalidade, valueId: nac_id_pais }}
                />

              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_pro_aeroporto}>
              <FormGroup>
                <Label>Aeroporto próximo</Label>

                <AutoCompletarV2
                  {...props}
                  value={pro_aeroporto}
                  required={required_pro_aeroporto}
                  valueId={pro_id_aeroporto}
                  tabela="AEROPORTO"
                  campo=""
                  disabled={false}
                  visible
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: pro_aeroporto, valueId: pro_id_aeroporto }}
                />

              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_dt_nascimento}>
              <FormGroup>
                <Label>Data Nascimento</Label>
                <Input
                  type="date"
                  value={dt_nascimento}
                  className={required_dt_nascimento}
                  onChange={(e) => set_dt_nascimento(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_estado_civil}>
              <FormGroup>
                <Label>Estado Civil</Label>
                <Input
                  type="select"
                  value={estado_civil}
                  className={required_estado_civil}
                  onChange={(e) => set_estado_civil(e.target.value)}
                >
                  <option value="0" selected>Selecione...</option>
                  { !!listaEstadoCivil && listaEstadoCivil.map((item) => (
                    <option value={item.id}>{item.descricao}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_genero}>
              <FormGroup>
                <Label>Gênero</Label>
                <Input
                  type="select"
                  value={genero}
                  className={required_genero}
                  onChange={(e) => set_genero(e.target.value)}
                  onChangeCapture={(e) => handleGenero(e.target.value)}
                >
                  <option value="0" selected>Selecione...</option>
                  { !!listaGenero && listaGenero.map((item) => (
                    <option value={item.id}>{item.descricao}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>

            <Col sm={4} className={visibility_genero_outros}>
              <FormGroup>
                <Label>&nbsp;</Label>
                <Input
                  type="text"
                  className={required_genero_outros}
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

  autoCompletarId_Aeroporto: state.autoCompletar.autoCompletarId_Aeroporto,
  autoCompletarId_Pais: state.autoCompletar.autoCompletarId_Pais,
});
export default connect(() => (mapState))(Hotsite);
