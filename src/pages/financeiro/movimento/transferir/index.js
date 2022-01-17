///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { AutoCompletarV2, PageTitle, SaveButton } from '../../../../components';
import {
  getDados, formatData, formatDataInput, getCurrentDate, formatCompleteZeros,
} from '../../../../functions/sistema';
import { getCambio, saveTransferir } from '../../../../functions/financeiro/movimento';

///////// FICHA /////////////////
/////////////////////////////////
function MovimentoTransferir(props) {
  const [firstLoad, setFirst] = useState(true);

  /// NAO EXIBIR NA TELA
  const [transacao_1] = useState(1);
  const [transacao_2] = useState(2);
  const [documento] = useState(4);
  const [pessoa] = useState(2);
  const [id_pjuridica] = useState(1); /// ventu
  const [status] = useState(3);

  const [id_conta_1, set_id_conta_1] = useState(0);
  const [moeda_1, set_moeda_1] = useState('');
  const [id_moeda_1, set_id_moeda_1] = useState(0);
  const [cambio_1, set_cambio_1] = useState(0);

  const [id_conta_2, set_id_conta_2] = useState(0);
  const [moeda_2, set_moeda_2] = useState('');
  const [id_moeda_2, set_id_moeda_2] = useState(0);
  const [cambio_2, set_cambio_2] = useState(0);

  const [descricao, set_descricao] = useState('');
  const [subgrupo] = useState('');
  const [id_subgrupo, set_id_subgrupo] = useState(0);

  const [valor, set_valor] = useState('');
  const [forma, set_forma] = useState(0);
  const [dt_ocorrencia, set_dt_ocorrencia] = useState('');

  ////// LISTAS
  const [lista_contas, set_lista_contas] = useState([]);
  const [lista_formas, set_lista_formas] = useState([]);

  const [form, set_form] = useState({});

  //////FUNCOES
  const handleCambio = useCallback((conta, id_conta, dt_ocorrencia) => {
    async function recebeCambio() {
      if (id_conta && dt_ocorrencia) {
        const ficha = await getCambio(props, id_conta, dt_ocorrencia);
        const { id_moeda, moeda, cambio } = ficha;

        switch (conta) {
          case 'conta_1':
            set_id_moeda_1(id_moeda);
            set_moeda_1(moeda);
            set_cambio_1(cambio);
            break;
          case 'conta_2':
            set_id_moeda_2(id_moeda);
            set_moeda_2(moeda);
            set_cambio_2(cambio);
            break;
          default:
        }
      }
    }
    recebeCambio(conta, id_conta, dt_ocorrencia);
  }, [props]);

  const handleDtOcorrencia = useCallback((dt_ocorrencia, id_conta_1, id_conta_2) => {
    handleCambio('conta_1', id_conta_1, dt_ocorrencia);
    handleCambio('conta_2', id_conta_2, dt_ocorrencia);
  }, [handleCambio]);

  ////// FIRST LOAD
  useEffect(() => {
    async function getTabelas() {
      const contas = await getDados(props, '/TsmCONTA/PESQUISA/', '');
      set_lista_contas(contas);

      const formas = await getDados(props, '/TsmSISTEMA/FORMA_TABELA/1', '');
      set_lista_formas(formas);
    }
    if (firstLoad) {
      set_dt_ocorrencia(formatDataInput(getCurrentDate()));
      getTabelas();
      setFirst(false);
    }
  }, [props, firstLoad]);

  ////// ATUALIZA FORM
  useEffect(() => {
    const pagar = {
      id: 0,

      status,
      transacao: transacao_1,
      restrito: false,
      pessoa,
      id_pjuridica,

      documento,
      dt_ocorrencia: formatData(dt_ocorrencia),
      dt_vencimento: formatData(dt_ocorrencia),
      dt_pagamento: formatData(dt_ocorrencia),

      id_subgrupo,

      id_conta: id_conta_1,
      id_moeda: id_moeda_1,
      cambio: cambio_1,

      valor_original: valor,
      valor_pago: valor,

      forma,
      descricao,
    };

    const receber = {
      id: 0,

      status,
      transacao: transacao_2,
      restrito: false,
      pessoa,
      id_pjuridica,

      documento,
      dt_ocorrencia: formatData(dt_ocorrencia),
      dt_vencimento: formatData(dt_ocorrencia),
      dt_pagamento: formatData(dt_ocorrencia),

      id_subgrupo,

      id_conta: id_conta_2,
      id_moeda: id_moeda_2,
      cambio: cambio_2,

      valor_original: valor,
      valor_pago: valor,

      forma,
      descricao,
    };

    set_form({
      pagar,
      receber,
    });
  }, [id_conta_1, moeda_1, id_moeda_1, cambio_1, id_conta_2, moeda_2, id_moeda_2, pessoa, id_pjuridica,
    cambio_2, descricao, id_subgrupo, valor, forma, documento, status, dt_ocorrencia, transacao_1, transacao_2]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    set_id_subgrupo(props.AC_ID_SubGrupo);
  }, [props.AC_ID_SubGrupo]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Movimento"
        subtitle="/ Cadastrar"
        voltar
        linkTo="/financeiro/movimento"
      />
      <Card>
        <CardBody className="pb-3 content-container">
          <div className="form-container ">

            {/*** LINHA 01 ***/}
            <Row className="pb-2 mb-4 border-bottom">
              {/*** CONTA 1 ***/}
              <Col sm={5} className="">
                <Row>
                  {/*** CONTA 1 ***/}
                  <Col sm={12}>
                    <FormGroup>
                      <Label>Conta</Label>
                      <Input
                        type="select"
                        className="required"
                        value={id_conta_1}
                        dados={props.contaListaData}
                        config={props}
                        action="@GET_CONTA_LISTA"
                        onChange={(e) => set_id_conta_1(e.target.value)}
                        onChangeCapture={(e) => handleCambio('conta_1', e.target.value, dt_ocorrencia)}
                      >
                        <option key="0" value="0">Selecione...</option>
                        {
                          !!lista_contas && lista_contas.map((conta) => (
                            <option key={conta.id} value={conta.id}>{conta.descricao}</option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** MOEDA 1 ***/}
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Moeda</Label>
                      <Input
                        type="hidden"
                        disabled
                        id="movimento-ficha-moeda-id"
                        value={id_moeda_1}
                      />
                      <Input
                        type="text"
                        id="movimento-ficha-moeda"
                        disabled
                        value={moeda_1}
                      />
                    </FormGroup>
                  </Col>
                  {/*** CAMBIO 1 ***/}
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Câmbio</Label>
                      <Input
                        type="number"
                        value={cambio_1}
                        id="movimento-ficha-cambio"
                        onChange={(e) => set_cambio_1(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              {/*** ICONE ***/}
              <Col sm={2} className="transferir-arrow-container">
                <FontAwesomeIcon icon={faAngleDoubleRight} size="5x" />
              </Col>
              {/*** CONTA 2 ***/}
              <Col sm={5} className="">
                <Row>
                  {/*** CONTA 2 ***/}
                  <Col sm={12}>
                    <FormGroup>
                      <Label>Conta</Label>
                      <Input
                        type="select"
                        className="required"
                        value={id_conta_2}
                        dados={props.contaListaData}
                        config={props}
                        action="@GET_CONTA_LISTA"
                        onChange={(e) => set_id_conta_2(e.target.value)}
                        onChangeCapture={(e) => handleCambio('conta_2', e.target.value, dt_ocorrencia)}
                      >
                        <option key="0" value="0">Selecione...</option>
                        {
                          !!lista_contas && lista_contas.map((conta) => (
                            <option key={conta.id} value={conta.id}>{conta.descricao}</option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** MOEDA 2 ***/}
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Moeda</Label>
                      <Input
                        type="hidden"
                        disabled
                        id="movimento-ficha-moeda-id"
                        value={id_moeda_2}
                      />
                      <Input
                        type="text"
                        id="movimento-ficha-moeda"
                        disabled
                        value={moeda_2}
                      />
                    </FormGroup>
                  </Col>
                  {/*** CAMBIO 2 ***/}
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Câmbio</Label>
                      <Input
                        type="number"
                        value={cambio_2}
                        id="movimento-ficha-cambio"
                        onChange={(e) => set_cambio_2(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/*** LINHA 02 ***/}
            <Row>
              {/*** DESCRICAO ***/}
              <Col sm={5}>
                <FormGroup>
                  <Label>Descrição</Label>
                  <Input
                    type="text"
                    className="required"
                    maxLength={60}
                    value={descricao}
                    onChange={(e) => set_descricao(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/*** GRUPO ***/}
              <Col sm={7}>
                <FormGroup>
                  <Label>Grupo</Label>
                  <AutoCompletarV2
                    {...props}
                    value={subgrupo}
                    valueId={id_subgrupo}
                    tabela="SUBGRUPO"
                    required
                    campo=""
                    visible
                    editar={{ id_subgrupo, value: subgrupo, valueId: id_subgrupo }}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/*** LINHA 03 ***/}
            <Row>
              {/*** VALOR ***/}
              <Col sm={3}>
                <FormGroup>
                  <Label>Valor</Label>
                  <Input
                    type="number"
                    className="required"
                    value={valor}
                    onChange={(e) => set_valor(e.target.value)}
                    onBlur={(e) => set_valor(formatCompleteZeros(e.target.value, 2))}
                  />
                </FormGroup>
              </Col>
              {/*** FORMA ***/}
              <Col sm={4}>
                <FormGroup>
                  <Label>Forma</Label>
                  <Input
                    type="select"
                    className="required"
                    value={forma}
                    dados={props.tipo_forma}
                    config={props}
                    onChange={(e) => set_forma(e.target.value)}
                  >
                    <option key="0" value="0">Selecione...</option>
                    {
                      !!lista_formas && lista_formas.map((forma) => (
                        <option key={forma.id} value={forma.id}>{forma.descricao}</option>
                      ))
                    }
                  </Input>
                </FormGroup>
              </Col>
              {/*** DATA OCORRENCIA ***/}
              <Col sm={4}>
                <FormGroup>
                  <Label>Data Ocorrência</Label>
                  <Input
                    type="date"
                    className="required"
                    value={dt_ocorrencia}
                    onChange={(e) => set_dt_ocorrencia(e.target.value)}
                    onChangeCapture={(e) => handleDtOcorrencia(e.target.value, id_conta_1, id_conta_2)}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/*** SAVE ***/}
            <SaveButton save={() => saveTransferir(props, form)} />

          </div>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  AC_ID_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,
});
export default connect(() => (mapState))(MovimentoTransferir);
