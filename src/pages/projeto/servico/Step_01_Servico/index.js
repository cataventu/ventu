///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import moment from 'moment';
import { getDados, formatDataInput } from '../../../../functions/sistema';
import { AutoCompletarV2 } from '../../../../components';
import { visibilitySteps } from '../../../../functions/projeto/servico';

function Step01(props) {
  const {
    AC_servico,
  } = props;

  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [listaStatus, setListaStatus] = useState([]);
  const [listaOperacao, setListaOperacao] = useState(0);
  const [listaTipoServico, setListaTipoServico] = useState(0);

  const [status, setStatus] = useState(1);
  const [operacao, setOperacao] = useState(0);
  const [tipo_servico, setTipo_Servico] = useState(0);

  const [id_servico, setId_servico] = useState(0);
  const [servico, setServico] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  //const [disabledStatus, setdisabledStatus] = useState(false);
  const [disabledOperacao, setDisabledOperacao] = useState(false);
  const [disabledTipo_servico, setDisabledTipo_servico] = useState(false);
  const [disabledServico, setDisabledServico] = useState(false);
  const [visibilityTipoServico, setVisibilityTipoServico] = useState('hide');
  const [visibilityTipoServicoVenda, setVisibilityTipoServicoVenda] = useState('hide');

  const [flagAtualizado, setAtualizado] = useState(false);

  const atualizaTipoServiço = useCallback((tipoServico) => {
    const { dispatch } = props;
    setTipo_Servico(tipoServico);
    dispatch({ type: '@SET_PROSERVICO_TIPO_SERVICO', payload: tipoServico });
  }, [props]);

  const atualizaOperacao = useCallback((operacao) => {
    const { dispatch } = props;
    setOperacao(operacao);
    dispatch({ type: '@SET_PROSERVICO_OPERACAO', payload: operacao });
  }, [props]);

  const atualizaIdServico = useCallback((id_servico) => {
    const { dispatch } = props;
    dispatch({ type: '@SET_PROSERVICO_ID_SERVICO', payload: id_servico });
  }, [props]);

  const atualizaStatus = useCallback((status) => {
    const { dispatch } = props;
    dispatch({ type: '@SET_PROSERVICO_STATUS', payload: status });
  }, [props]);

  const handleOperacao = useCallback((value) => {
    setOperacao(value);
    if (value === 3) {
      setVisibilityTipoServico('hide');
      setVisibilityTipoServicoVenda('');
    } else {
      setVisibilityTipoServico('');
      setVisibilityTipoServicoVenda('show');
    }
  }, []);

  useEffect(() => {
    handleOperacao(operacao);
  }, [operacao, handleOperacao]);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      ////// STATUS
      const status = await getDados(props, '/TsmSISTEMA/STATUS_PROSERVICO_TABELA', '');
      setListaStatus(status);

      ////// OPERACAO
      const operacao = await getDados(props, '/TsmSISTEMA/OPERACAO_PROSERVICO_TABELA/1 ', '');
      setListaOperacao(operacao);

      ////// TIPO SERVICO
      const tipoServico = await getDados(props, '/TsmSISTEMA/TIPO_SERVICO_TABELA', '');
      setListaTipoServico(tipoServico);
    }
    getTabelas();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      getTabelas();
      atualizaOperacao(operacao);
    }
  }, [props, firstLoad, getTabelas]);

  /// RECEBE FICHA DATA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData } = props;

    if (parseInt(idUrl, 10) > 0) {
      const {
        id, status, operacao, id_servico, servico, tipo_servico, alt_dhsis,
      } = fichaData;

      setDisabledOperacao(true);
      setDisabledTipo_servico(true);
      setDisabledServico(true);

      if ((id > 0 && !flagAtualizado)) {
        setStatus(status);

        atualizaOperacao(operacao);
        atualizaTipoServiço(tipo_servico);

        setId_servico(id_servico);
        setServico(servico);
        setAlt_dhsis(alt_dhsis);

        const { dispatch } = props;
        dispatch({ type: '@SET_AUTOCOMPLETAR_ID_RSERVICO', payload: id_servico });
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_01_FALSE' });
        //console.log('Atualizado Step 1');

        setId(id);
        setAtualizado(true);
      }
    }
  }, [props, flagAtualizado, atualizaOperacao, atualizaIdServico]);

  /// ATUALIZA ID SERVICO
  useEffect(() => {
    atualizaIdServico(AC_servico);
  }, [AC_servico, atualizaIdServico]);

  /// ATUALIZA STATUS
  useEffect(() => {
    atualizaStatus(status);
  }, [status, atualizaStatus]);

  /// MONITORA TIPO SERVICO - VISIBILITY E LABELS
  useEffect(() => {
    switch (parseInt(operacao, 10)) {
      /// AGENCIAMENTO
      case 1:
        setVisibilityTipoServicoVenda('hide');
        setVisibilityTipoServico('');
        break;
        /// COMPRA
      case 2:
        setVisibilityTipoServicoVenda('hide');
        setVisibilityTipoServico('');
        break;
      /// VENDA
      case 3:
        setVisibilityTipoServicoVenda('');
        setVisibilityTipoServico('hide');
        break;
      ///
      default:
        setVisibilityTipoServicoVenda('hide');
        setVisibilityTipoServico('');
    }
  }, [operacao, visibilityTipoServicoVenda, visibilityTipoServico]);

  /// ATUALIZA FORM E LOCAL STORAGE
  useEffect(() => {
    const newForm = {
      status: parseInt(status, 10),
      tipo_servico: parseInt(tipo_servico, 10),
      operacao: parseInt(operacao, 10),
      id_servico: parseInt(AC_servico, 10),
      alt_dhsis,
    };
    localStorage.setItem('PROSERVICO_FORM_STEP_01', JSON.stringify(newForm));
  }, [AC_servico, operacao, status, tipo_servico, alt_dhsis]);

  /// ATUALIZA DISABLED
  useEffect(() => {
    if (props.step > 0) {
      setDisabledOperacao(true);
      setDisabledServico(true);
      setDisabledTipo_servico(true);
    }
  }, [props.step]);

  return (
    <>
      <Row>
        <Col sm={12} md={5} lg={4} xl={3}>
          <Row>
            {/*** STATUS ***/}
            <Col sm={4} md={6}>
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  className="required"
                  value={status}
                  //disabled={disabledStatus}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="0">Selecione...</option>

                  { !!listaStatus && listaStatus.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))}

                </Input>
              </FormGroup>
            </Col>
            {/*** OPERACAO ***/}
            <Col sm={4} md={6}>
              <FormGroup>
                <Label>Operação</Label>
                <Input
                  type="select"
                  className="required"
                  value={operacao}
                  disabled={disabledOperacao}
                  onChange={(e) => atualizaOperacao(e.target.value)}
                  onChangeCapture={(e) => handleOperacao(e.target.value)}
                >
                  <option value="0">Selecione...</option>

                  { !!listaOperacao && listaOperacao.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))}

                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>

        <Col sm={12} md={7} lg={8} xl={9}>
          <Row>
            {/*** TIPO SERVIÇO ***/}
            <Col sm={4} md={4} lg={3} xl={2} className={visibilityTipoServico}>
              <FormGroup>
                <Label>Tipo de Serviço</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo_servico}
                  campo={operacao}
                  disabled={disabledTipo_servico}
                  onChange={(e) => atualizaTipoServiço(e.target.value)}
                >
                  <option value="0">Selecione...</option>

                  { !!listaTipoServico && listaTipoServico.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))}

                </Input>
              </FormGroup>
            </Col>
            <Col sm={4} md={4} lg={3} xl={2} className={visibilityTipoServicoVenda}>
              <FormGroup>
                <Label>Tipo de Serviço</Label>
                <Input
                  type="select"
                  className="required"
                  value={tipo_servico}
                  campo={operacao}
                  disabled={disabledTipo_servico}
                  onChange={(e) => atualizaTipoServiço(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  {/*<option value="1">AÉREO</option>
                  <option value="2">HOSPEDAGEM</option>
                  <option value="3">VEÍCULO</option> */}
                  <option value="4">CRIAÇÃO</option>
                  <option value="5">LOGÍSTICA</option>
                  <option value="6">PRODUÇÃO</option>
                  <option value="7">FINANCEIRO</option>
                  <option value="8">GENÉRICO</option>
                  {/*
                  { !!listaTipoServico && listaTipoServico.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))} */}

                </Input>
              </FormGroup>
            </Col>

            {/*** PROSERVICO ***/}
            <Col sm={6} md={8} lg={5} xl={4}>
              <FormGroup>
                <Label>Serviço</Label>
                <AutoCompletarV2
                  {...props}
                  value={servico}
                  valueId={id_servico}
                  tabela="RSERVICO"
                  campo={tipo_servico}
                  disabled={disabledServico}
                  visible
                  required
                  editar={{ id, value: servico, valueId: id_servico }}
                />
              </FormGroup>
            </Col>
            {/*** DATA ***/}
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
          </Row>
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  step: state.wizard.step,
  fichaData: state.servicos.fichaData,
  AC_servico: state.autoCompletar.autoCompletarId_RServico,
});
export default connect(() => (mapState))(Step01);
