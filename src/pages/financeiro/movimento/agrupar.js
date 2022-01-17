///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardHeader, Row, Col, Container, FormGroup, Label, Input,
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import {
  SaveButton, Checkbox, PageTitle, AutoCompletarV2,
} from '../../../components';
import { getDados, formatExibeValor, formatDataInput } from '../../../functions/sistema';
import { saveAgrupar } from '../../../functions/financeiro/movimento/agrupar';

function MovimentoAgrupar(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id, setId] = useState('');
  const [restrito, setRestrito] = useState(false);
  const [dt_ocorrencia, setDt_ocorrencia] = useState('');
  const [dt_vencimento, setDt_vencimento] = useState('');

  const [listaStatus, setListaStatus] = useState([]);
  const [status, setStatus] = useState('');

  const [pessoa, setPessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [nome_pessoa, setNome_pessoa] = useState('');

  const [listaDocumento, setListaDocumento] = useState([]);
  const [documento, setDocumento] = useState(0);
  const [ndocumento, setNDocumento] = useState('');
  const [dt_pagamento, setDt_pagamento] = useState('');
  const [id_subgrupo, setId_SubGrupo] = useState(0);
  const [subgrupo, setSubGrupo] = useState('');

  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');

  const [conta, setConta] = useState('');
  const [forma, setForma] = useState('');

  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState('');

  const [form, setForm] = useState('');

  const selectRow = {
    mode: 'checkbox',
    selected,
  };

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'td-movimento-id', headerClasses: 'td-movimento-id bg-dark text-white',
    },
    {
      dataField: 'nome_pessoa', text: 'Contato', sort: true, classes: 'td-movimento-contato', headerClasses: 'td-movimento-contato bg-dark text-white',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, classes: 'td-movimento-documento', headerClasses: 'td-movimento-documento bg-dark text-white',
    },
    {
      dataField: 'dt_vencimento', text: 'Vencimento', sort: true, classes: 'td-movimento-vencimento text-right', headerClasses: 'td-movimento-vencimento bg-dark text-white text-right',
    },
    {
      dataField: 'valor_pago', text: 'Valor', sort: true, classes: 'td-movimento-valor text-right', headerClasses: 'td-movimento-valor bg-dark text-white text-right',
    },
    {
      dataField: 'alt_dhsis', text: '', sort: false, classes: 'hide', headerClasses: 'hide',
    },
  ];

  useEffect(() => {
    async function getFichas() {
      const { id } = props.match.params;
      await getDados(props, '/TsmSISTEMA/STATUS_MOVIMENTO_TABELA', '@GET_STATUS_MOVIMENTO');
      await getDados(props, '/TsmSISTEMA/DOCUMENTO_TABELA/1', '@GET_TIPO_DOCUMENTO');
      await getDados(props, `/TsmMOVIMENTO/AGRUPAMENTO_PAGINA/${id}`, '@GET_MOVIMENTO_AGRUPAR');
    }

    if (firstLoad) {
      setFirst(false);
      getFichas();
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, restrito, dt_ocorrencia, dt_vencimento, status, pessoa, alt_dhsis, filho_regs,
    } = props.tableDataAgrupar;
    const { id_pfisica, id_pjuridica, nome_pessoa } = props.tableDataAgrupar;
    const {
      documento, ndocumento, dt_pagamento, id_subgrupo, subgrupo,
    } = props.tableDataAgrupar;
    const {
      descricao, observacao, conta, dforma,
    } = props.tableDataAgrupar;

    setId(id);
    setRestrito(restrito);
    setDt_ocorrencia(dt_ocorrencia);
    setDt_vencimento(dt_vencimento);
    setStatus(status);
    setPessoa(pessoa);

    setId_Pfisica(id_pfisica);
    setId_Pjuridica(id_pjuridica);
    setNome_pessoa(nome_pessoa);

    setDocumento(documento);
    setNDocumento(ndocumento);
    setDt_pagamento(formatDataInput(dt_pagamento));
    setId_SubGrupo(id_subgrupo);
    setSubGrupo(subgrupo);

    setDescricao(descricao);
    setObservacao(observacao);
    setConta(conta);
    setForma(dforma);
    setAlt_dhsis(alt_dhsis);

    const _tempTable = [];
    const _tempSelected = [];

    filho_regs.forEach((filho) => {
      _tempTable.push(
        {
          id_pai: filho.Id_pai,
          check: filho.check,
          id: filho.id,
          transacao: filho.trasacao,
          pessoa: filho.pessoa,
          dpessoa: filho.dpessoa,
          id_pfisica: filho.id_pfisica,
          id_pjuridica: filho.id_pjuridica,
          nome_pessoa: filho.nome_pessoa,
          documento: filho.documento,
          dt_vencimento: filho.dt_vencimento,
          valor_pago: formatExibeValor(filho.valor_pago),
          moeda: filho.moeda,
          descricao: filho.descricao,
          alt_dhsis: filho.alt_dhsis,
        },
      );
      if (filho.check) { _tempSelected.push(parseInt(filho.id, 10)); }
    });

    setTableData(_tempTable);
    setSelected(_tempSelected);
  }, [forma, props.tableDataAgrupar]);

  useEffect(() => {
    setId_SubGrupo(props.autoCompletarId_SubGrupo);
  }, [props.autoCompletarId_SubGrupo]);

  useEffect(() => {
    const _temp = [];
    props.status_movimento.forEach((item) => {
      if (item.id > 1) {
        _temp.push(
          <option value={item.id}>
            {' '}
            { item.descricao }
          </option>,
        );
      }
    });
    setListaStatus(_temp);
  }, [props.status_movimento]);

  useEffect(() => {
    const _temp = [];
    props.tipo_documento.forEach((item) => {
      _temp.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setListaDocumento(_temp);
  }, [props.tipo_documento]);

  useEffect(() => {
    setForm({
      id,
      restrito,
      dt_ocorrencia,
      dt_vencimento,

      status,

      pessoa,
      id_pfisica,
      id_pjuridica,

      documento,
      ndocumento,
      dt_pagamento,
      id_subgrupo,

      descricao,
      observacao,
      alt_dhsis,
    });
  }, [id, restrito, dt_ocorrencia, dt_vencimento, status, pessoa, id_pfisica, id_pjuridica,
    documento, ndocumento, dt_pagamento, id_subgrupo, descricao,
    observacao, alt_dhsis]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle history={props.history} title="Movimento" subtitle="/ Agrupar" voltar />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="p-2 pt-3">

            {/***ID PAI OCULTO ***/}
            <Col sm={12}>
              <FormGroup>
                <Input
                  type="hidden"
                  disabled
                  value={id}
                />
              </FormGroup>
            </Col>

            {/*** DT OCORRENCIA OCULTO ***/}
            <Col sm={12}>
              <FormGroup>
                <Input type="hidden" disabled value={dt_ocorrencia} />
              </FormGroup>
            </Col>

            {/*** DT VENCIMENTO OCULTO ***/}
            <Col sm={12}>
              <FormGroup>
                <Input type="hidden" disabled value={dt_vencimento} />
              </FormGroup>
            </Col>

            <Row className="pl-4 pr-4 h5 pt-1 text-left">

              {/*** STATUS ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Status: </Label>
                  <Input
                    type="select"
                    className="required"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Selecione...</option>
                    { listaStatus }
                  </Input>
                </FormGroup>
              </Col>

              {/*** RESTRITO ***/}
              <Col sm={8} md={9} lg={10} xl={10}>
                <FormGroup className="text-right">
                  <Label>Restrito</Label>
                  <Checkbox
                    checked={restrito}
                    onClick={(e) => setRestrito(e.target.checked)}
                  />
                </FormGroup>
              </Col>

              {/***PESSOA ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Pessoa</Label>
                  <Input
                    type="select"
                    value={pessoa}
                    disabled
                  >
                    <option value="0">Selecione...</option>
                    <option value="1">FÍSICA</option>
                    <option value="2">JURÍDICA</option>
                  </Input>
                </FormGroup>
              </Col>

              {/*** CONTATO ***/}
              <Col sm={8} md={6} lg={4} xl={4}>
                <Label>Contato</Label>
                <Input
                  type="text"
                  disabled
                  value={nome_pessoa}
                />
              </Col>
            </Row>

            <hr />

            <Row className="pl-4 pr-4 h5 pt-1 text-left">

              {/*** DOC ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Documento</Label>
                  <Input
                    type="select"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                  >
                    <option value="0">Selecione...</option>
                    { listaDocumento }
                  </Input>
                </FormGroup>
              </Col>

              {/*** N DOC ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Nº Documento</Label>
                  <Input
                    type="text"
                    value={ndocumento}
                    onChange={(e) => setNDocumento(e.target.value)}
                  />
                </FormGroup>
              </Col>

              {/*** DT PGMT ***/}
              <Col sm={4} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Data Pagamento: </Label>
                  <Input
                    type="date"
                    disabled
                    className="required"
                    value={dt_pagamento}
                    onChange={(e) => setDt_pagamento(e.target.value)}
                  />
                </FormGroup>
              </Col>

              {/*** SUB GRUPO ***/}
              <Col sm={12} md={9} lg={6} xl={6}>
                <FormGroup>
                  <Label>SubGrupo</Label>
                  <AutoCompletarV2
                    {...props}
                    value={subgrupo}
                    valueId={id_subgrupo}
                    tabela="SUBGRUPO"
                    required
                    campo=""
                    disabled={false}
                    visible
                    editar={{ id, value: subgrupo, valueId: id_subgrupo }}
                  />
                </FormGroup>
              </Col>

            </Row>

            <hr />

            <Row className="pl-4 pr-4 h5 pt-1 text-left">
              {/*** DESCRICAO ***/}
              <Col sm={6} md={5} lg={4} xl={4}>
                <FormGroup>
                  <Label>Descrição: </Label>
                  <Input
                    type="texto"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </FormGroup>
              </Col>

              {/*** OBS ***/}
              <Col sm={6} md={7} lg={8} xl={8}>
                <FormGroup>
                  <Label>Obs: </Label>
                  <Input
                    type="texto"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <hr />

            <Row className="pl-4 pr-4 h5 text-left">
              {/*** DT VENC ***/}
              <Col className="p-3" sm={5} md={4} lg={4} xl={4}>
                <span className="pr-3 text-black">Data de Vencimento:</span>
                <span className="text-muted">{ dt_vencimento }</span>
              </Col>

              {/*** CONTA ***/}
              <Col className="p-3" sm={7} md={4} lg={4} xl={4}>
                <span className="pr-3 text-black">Conta:</span>
                <span className="text-muted">{ conta }</span>
              </Col>

              {/*** FORMA ***/}
              <Col className="p-3" sm={12} md={4} lg={4} xl={4}>
                <span className="pr-3 text-black">Forma:</span>
                <span className="text-muted">{ forma }</span>
              </Col>
              {/*** ALT DHSIS ***/}
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

          </CardHeader>
          {/****** body *****************/}
          {/*****************************/}
          <CardBody className="pt-0">

            <BootstrapTable
              keyField="id"
              id="movimento-agrupar-table-data"
              data={tableData}
              classes="table-striped table-movimento"
              columns={tableColumns}
              selectRow={selectRow}
              bootstrap4
              bordered={false}
            />

            <SaveButton save={() => saveAgrupar(props, form)} />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  status_movimento: state.sistema.status_movimento,
  tipo_documento: state.sistema.tipo_documento,

  sidebar: state.sidebar,
  tableDataAgrupar: state.movimento.tableDataAgrupar,

  autoCompletarCursor: state.autoCompletar.autoCompletarCursor,
  autoCompletarVazio: state.autoCompletar.autoCompletarVazio,

  autoCompletarId_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,
  autoCompletarSubGrupo: state.autoCompletar.autoCompletarSubGrupo,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,

  autoCompletarPfisica: state.autoCompletar.autoCompletarPfisica,
  autoCompletarPjuridica: state.autoCompletar.autoCompletarPjuridica,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(MovimentoAgrupar);
