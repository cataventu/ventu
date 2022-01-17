///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { getPagina, formatCEP } from '../../../../functions/sistema';
import { AutoCompletarV2 } from '../../../../components';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 4;
  const id_hash = props.match.params.id;

  const [campos, set_campos] = useState([]);
  const [firstLoad, setFirst] = useState(true);

  const [id_pfisica, set_id_pfisica] = useState(0);
  const [resetEditar, set_resetEditar] = useState(false);

  const [res_id_endereco, set_res_id_endereco] = useState(0);
  const [res_id_pfisica, set_res_id_pfisica] = useState(0);
  const [res_id_pjuridica, set_res_id_pjuridica] = useState(0);
  const [res_dtipo, set_res_dtipo] = useState('');
  const [res_tipo, set_res_tipo] = useState('');
  const [res_tipo_end, set_res_tipo_end] = useState([]);
  const [res_identificacao, set_res_identificacao] = useState('');
  const [res_cep, set_res_cep] = useState('');
  const [res_logradouro, set_res_logradouro] = useState('');
  const [res_endereco, set_res_endereco] = useState('');
  const [res_numero, set_res_numero] = useState('');
  const [res_complemento, set_res_complemento] = useState('');
  const [res_bairro, set_res_bairro] = useState('');
  const [res_id_municipio, set_res_id_municipio] = useState(0);
  const [res_municipio, set_res_municipio] = useState('');

  const [com_id_endereco, set_com_id_endereco] = useState(0);
  const [com_id_pfisica, set_com_id_pfisica] = useState(0);
  const [com_id_pjuridica, set_com_id_pjuridica] = useState(0);
  const [com_dtipo, set_com_dtipo] = useState('');
  const [com_tipo, set_com_tipo] = useState('');
  const [com_tipo_end, set_com_tipo_end] = useState([]);
  const [com_identificacao, set_com_identificacao] = useState('');
  const [com_cep, set_com_cep] = useState('');
  const [com_logradouro, set_com_logradouro] = useState('');
  const [com_endereco, set_com_endereco] = useState('');
  const [com_numero, set_com_numero] = useState('');
  const [com_complemento, set_com_complemento] = useState('');
  const [com_bairro, set_com_bairro] = useState('');
  const [com_id_municipio, set_com_id_municipio] = useState(0);
  const [com_municipio, set_com_municipio] = useState('');

  const [visibilisty_res, set_visibilisty_res] = useState('hide');
  const [visibilisty_com, set_visibilisty_com] = useState('hide');

  const [required_res, set_required_res] = useState('');
  const [required_com, set_required_com] = useState('');

  const [required_municipio_res, set_required_municipio_res] = useState(false);
  const [required_municipio_com, set_required_municipio_com] = useState(false);

  const updateResidencial = useCallback((form) => {
    const {
      id,
      id_pfisica,
      id_pjuridica,
      dtipo,
      tipo,
      tipo_end,
      identificacao,
      cep,
      logradouro,
      endereco,
      numero,
      complemento,
      bairro,
      id_municipio,
      municipio,
    } = form;

    set_res_id_endereco(id);
    set_res_id_pfisica(id_pfisica);
    set_res_id_pjuridica(id_pjuridica);
    set_res_tipo(tipo);
    set_res_dtipo(dtipo);
    set_res_tipo_end(tipo_end);
    set_res_identificacao(identificacao);
    set_res_cep(cep);
    set_res_logradouro(logradouro);
    set_res_endereco(endereco);
    set_res_numero(numero);
    set_res_complemento(complemento);
    set_res_bairro(bairro);
    set_res_id_municipio(id_municipio);
    set_res_municipio(municipio);
  }, []);

  const updateComercial = useCallback((form) => {
    const {
      id,
      id_pfisica,
      id_pjuridica,
      dtipo,
      tipo,
      tipo_end,
      identificacao,
      cep,
      logradouro,
      endereco,
      numero,
      complemento,
      bairro,
      id_municipio,
      municipio,
    } = form;

    set_com_id_endereco(id);
    set_com_id_pfisica(id_pfisica);
    set_com_id_pjuridica(id_pjuridica);
    set_com_tipo(tipo);
    set_com_dtipo(dtipo);
    set_com_tipo_end(tipo_end);
    set_com_identificacao(identificacao);
    set_com_cep(cep);
    set_com_logradouro(logradouro);
    set_com_endereco(endereco);
    set_com_numero(numero);
    set_com_complemento(complemento);
    set_com_bairro(bairro);
    set_com_id_municipio(id_municipio);
    set_com_municipio(municipio);
  }, []);

  const updateCampos = useCallback((ws, store) => {
    let ficha;
    ////// CASO WS
    if (store === null) {
      ficha = ws;
      const { rendereco_regs } = ficha;

      rendereco_regs.forEach((endereco) => {
        const { tipo } = endereco;
        switch (tipo) {
          case 1:
            updateResidencial(endereco);
            break;
          case 2:
            updateComercial(endereco);
            break;
          default: break;
        }
      });

      ////// CASO STORE
    } else {
      ficha = store;
      const { endereco_res, endereco_com } = ficha;

      const {
        res_id_endereco,
        res_id_pfisica,
        res_id_pjuridica,
        res_dtipo,
        res_tipo,
        res_tipo_end,
        res_identificacao,
        res_cep,
        res_logradouro,
        res_endereco,
        res_numero,
        res_complemento,
        res_bairro,
        res_id_municipio,
        res_municipio,
      } = endereco_res;

      const {
        com_id_endereco,
        com_id_pfisica,
        com_id_pjuridica,
        com_dtipo,
        com_tipo,
        com_tipo_end,
        com_identificacao,
        com_cep,
        com_logradouro,
        com_endereco,
        com_numero,
        com_complemento,
        com_bairro,
        com_id_municipio,
        com_municipio,
      } = endereco_com;

      set_res_id_endereco(res_id_endereco);
      set_res_id_pfisica(res_id_pfisica);
      set_res_id_pjuridica(res_id_pjuridica);
      set_res_tipo(res_tipo);
      set_res_dtipo(res_dtipo);
      set_res_tipo_end(res_tipo_end);
      set_res_identificacao(res_identificacao);
      set_res_cep(res_cep);
      set_res_logradouro(res_logradouro);
      set_res_endereco(res_endereco);
      set_res_numero(res_numero);
      set_res_complemento(res_complemento);
      set_res_bairro(res_bairro);
      set_res_id_municipio(res_id_municipio);
      set_res_municipio(res_municipio);

      set_com_id_endereco(com_id_endereco);
      set_com_id_pfisica(com_id_pfisica);
      set_com_id_pjuridica(com_id_pjuridica);
      set_com_tipo(com_tipo);
      set_com_dtipo(com_dtipo);
      set_com_tipo_end(com_tipo_end);
      set_com_identificacao(com_identificacao);
      set_com_cep(com_cep);
      set_com_logradouro(com_logradouro);
      set_com_endereco(com_endereco);
      set_com_numero(com_numero);
      set_com_complemento(com_complemento);
      set_com_bairro(com_bairro);
      set_com_id_municipio(com_id_municipio);
      set_com_municipio(com_municipio);
    }
  }, [updateComercial, updateResidencial]);

  const render = useCallback(() => {
    async function render() {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      const userData = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_USER_DATA'));

      ////// RENDER
      const { modulo_regs } = form;
      modulo_regs.forEach((modulo) => {
        const { permissao, campo_regs } = modulo;
        if (permissao === 4) {
          campo_regs.forEach((endereco) => {
            const { permissao, acesso } = endereco;
            switch (permissao) {
              case 1:
                if (acesso) {
                  updateResidencial(endereco);
                  set_res_dtipo('RESIDENCIAL');
                  set_visibilisty_res('');
                  set_required_res('required');
                  set_required_municipio_res(true);
                }
                break;
              case 2:
                if (acesso) {
                  updateComercial(endereco);
                  set_com_dtipo('COMERCIAL');
                  set_visibilisty_com('');
                  set_required_com('required');
                  set_required_municipio_com(true);
                }
                break;
              default: break;
            }
          });
        }
      });

      set_campos(form);
      set_id_pfisica(userData.id_pfisica);

      const filtro = { id_pfisica: parseInt(userData.id_pfisica, 10), id_pjuridica: 0 };

      const _store = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_ENDERECO'));
      const _ws = await getPagina(props, '/TsmRENDERECO/PAGINA', '', filtro, '');
      await updateCampos(_ws, _store);

      set_resetEditar(true);
    }
    render();
  }, [props, updateCampos, updateComercial, updateResidencial]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      render();
    }
  }, [firstLoad, render]);

  ////// HANDLE SAVE
  useEffect(() => {
    if (!firstLoad) {
      const Form = {
        endereco_res: {
          res_id_endereco,
          res_id_pfisica,
          res_id_pjuridica,
          res_dtipo,
          res_tipo,
          res_tipo_end,
          res_identificacao,
          res_cep,
          res_logradouro,
          res_endereco,
          res_numero,
          res_complemento,
          res_bairro,
          res_id_municipio,
          res_municipio,
        },
        endereco_com: {
          com_id_endereco,
          com_id_pfisica,
          com_id_pjuridica,
          com_dtipo,
          com_tipo,
          com_tipo_end,
          com_identificacao,
          com_cep,
          com_logradouro,
          com_endereco,
          com_numero,
          com_complemento,
          com_bairro,
          com_id_municipio,
          com_municipio,
        },
      };
      localStorage.setItem('HOTSITE_PARTICIPANTE_ENDERECO', JSON.stringify(Form));
    }
  }, [com_bairro, com_cep, com_complemento, com_dtipo, com_endereco, com_id_endereco, com_id_municipio, com_id_pfisica, com_id_pjuridica, com_identificacao, com_logradouro, com_municipio, com_numero, com_tipo, com_tipo_end, firstLoad, res_bairro, res_cep, res_complemento, res_dtipo, res_endereco, res_id_endereco, res_id_municipio, res_id_pfisica, res_id_pjuridica, res_identificacao, res_logradouro, res_municipio, res_numero, res_tipo, res_tipo_end]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    set_res_id_municipio(props.AC_Id_RES_Municipio);
  }, [props.AC_Id_RES_Municipio]);

  useEffect(() => {
    set_com_id_municipio(props.AC_Id_COM_Municipio);
  }, [props.AC_Id_COM_Municipio]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faAddressCard}
          title="Endereços"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">

          {/*** RESIDENCIAL ***/}
          <Row className={`pb-3 ${visibilisty_res}`}>

            {/*** ID ***/}
            <Col sm={0} className="hide">
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="text"
                  disabled
                  value={res_id_endereco}
                  onChange={(e) => set_res_id_endereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** TIPO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Tipo</Label>
                <Input
                  type="text"
                  disabled
                  value={res_dtipo}
                  onChange={(e) => set_res_dtipo(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** LOUGRADOURO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Logradouro</Label>
                <Input
                  type="text"
                  maxLength={3}
                  value={res_logradouro}
                  className={required_res}
                  onChange={(e) => set_res_logradouro(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ENDERECO ***/}
            <Col sm={6}>
              <FormGroup>
                <Label>Endereço</Label>
                <Input
                  type="text"
                  maxLength={50}
                  value={res_endereco}
                  className={required_res}
                  onChange={(e) => set_res_endereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** NUMERO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="number"
                  maxLength={10}
                  value={res_numero}
                  className={required_res}
                  onChange={(e) => set_res_numero(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** COMPLEMENTO ***/}
            <Col sm={4}>
              <FormGroup>
                <Label>Complemento</Label>
                <Input
                  type="text"
                  maxLength={30}
                  value={res_complemento}
                  className={required_res}
                  onChange={(e) => set_res_complemento(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** BAIRRO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Bairro</Label>
                <Input
                  type="text"
                  maxLength={30}
                  value={res_bairro}
                  className={required_res}
                  onChange={(e) => set_res_bairro(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** MUNICIPIO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Município</Label>
                <AutoCompletarV2
                  {...props}
                  value={res_municipio}
                  valueId={res_id_municipio}
                  tabela="RES_MUNICIPIO"
                  campo=""
                  disabled={false}
                  visible
                  required={required_municipio_res}
                  resetEditar={resetEditar}
                  editar={{ id: id_pfisica, value: res_municipio, valueId: res_id_municipio }}
                />
              </FormGroup>
            </Col>
            {/*** CEP ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>CEP</Label>
                <Input
                  type="text"
                  maxLength={9}
                  value={res_cep}
                  className={required_res}
                  onChange={(e) => set_res_cep(formatCEP(e.target.value))}
                />
              </FormGroup>
            </Col>

          </Row>

          {/*** COMERCIAL ***/}
          <Row className={`pb-3 ${visibilisty_com}`}>

            {/*** ID ***/}
            <Col sm={0} className="hide">
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="text"
                  disabled
                  value={com_id_endereco}
                  onChange={(e) => set_com_id_endereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** TIPO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Tipo</Label>
                <Input
                  type="text"
                  disabled
                  value={com_dtipo}
                  onChange={(e) => set_com_dtipo(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** LOUGRADOURO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Logradouro</Label>
                <Input
                  type="text"
                  maxLength={3}
                  value={com_logradouro}
                  className={required_com}
                  onChange={(e) => set_com_logradouro(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ENDERECO ***/}
            <Col sm={6}>
              <FormGroup>
                <Label>Endereço</Label>
                <Input
                  type="text"
                  maxLength={50}
                  value={com_endereco}
                  className={required_com}
                  onChange={(e) => set_com_endereco(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** NUMERO ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="number"
                  maxLength={10}
                  value={com_numero}
                  className={required_com}
                  onChange={(e) => set_com_numero(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/*** COMPLEMENTO ***/}
            <Col sm={4}>
              <FormGroup>
                <Label>Complemento</Label>
                <Input
                  type="text"
                  maxLength={30}
                  value={com_complemento}
                  className={required_com}
                  onChange={(e) => set_com_complemento(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** BAIRRO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Bairro</Label>
                <Input
                  type="text"
                  maxLength={30}
                  value={com_bairro}
                  className={required_com}
                  onChange={(e) => set_com_bairro(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** MUNICIPIO ***/}
            <Col sm={3}>
              <FormGroup>
                <Label>Município</Label>
                <AutoCompletarV2
                  {...props}
                  value={com_municipio}
                  valueId={com_id_municipio}
                  tabela="COM_MUNICIPIO"
                  campo=""
                  disabled={false}
                  visible
                  resetEditar={resetEditar}
                  required={required_municipio_com}
                  editar={{ id: id_pfisica, value: com_municipio, valueId: com_id_municipio }}
                />
              </FormGroup>
            </Col>
            {/*** CEP ***/}
            <Col sm={2}>
              <FormGroup>
                <Label>CEP</Label>
                <Input
                  type="text"
                  maxLength={9}
                  value={com_cep}
                  className={required_com}
                  onChange={(e) => set_com_cep(formatCEP(e.target.value))}
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

  AC_Id_RES_Municipio: state.autoCompletar.autoCompletarId_RES_Municipio,
  AC_Id_COM_Municipio: state.autoCompletar.autoCompletarId_COM_Municipio,
});
export default connect(() => (mapState))(Hotsite);
