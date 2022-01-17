///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  Row, Col, FormGroup, Input, Label, CardBody, Card, CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Buttons, AutoCompletarV2 } from '../../../../components';
import {
  getPagina, formatData, formatDataInput, getDados,
} from '../../../../functions/sistema';
import './style.css';

function Step02(props) {
  const hoje = moment().format('L');

  const {
    AC_Fornecedor,
    AC_ID_Fornecedor,
    AC_Fornecedor_DadosAdicionais,
    AC_servico,
  } = props;

  //const [id, setId] = useState(0);
  const [firstLoad, setFirst] = useState(true);

  const [for_pessoa, setFor_Pessoa] = useState('');
  const [for_id_pfisica, setFor_Id_Pfisica] = useState(0);
  const [for_id_pjuridica, setFor_Id_Pjuridica] = useState(0);
  const [for_gera_pagto, setFor_gera_pagto] = useState('');

  const [id_Fornecedor, setId_Fornecedor] = useState(0);
  const [fornecedor, setFornecedor] = useState('');
  const [dadosAdicionais, setDadosAdicionais] = useState('');

  const [tipo_servico, setTipo_Servico] = useState(0);

  const [descricao, setDescricao] = useState('');

  const [especificacao, setEspecificacao] = useState('');
  const [hos_tipo, setHos_tipo] = useState('');
  const [hos_apto, setHos_apto] = useState('');
  const [listaHos_Tipo, setListaHos_Tipo] = useState('');

  const [flagAtualizado, setAtualizado] = useState(false);

  /// CONSOLIDADOR
  const [dt_consolidador, setDt_consolidador] = useState(formatDataInput(hoje));
  const [tabledata, setTableData] = useState([]);

  /// CONFIRMACAO
  const [cnf_data, setCnf_data] = useState(formatDataInput(hoje));
  const [cnf_numero, setCnf_numero] = useState('');
  const [cnf_contato, setCnf_contato] = useState('');

  /// VISIVILITY
  const [visibilityBoxConsolidador, setVisibilityBoxConsolidador] = useState('');
  const [visibilityConsolidador, setVisibilityConsolidador] = useState('oculta');

  const [visibilityBoxConfirmacao, setVisibilityBoxConfirmacao] = useState('');
  const [visibilityHospedagem, setVisibilityHospedagem] = useState('');

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'bg-dark text-white tb-step-02-id',
    },
    {
      dataField: 'empresa', text: 'Empresa', sort: true, headerClasses: 'bg-dark text-white tb-step-02-empresa',
    },
    {
      dataField: 'loc', text: 'Loc', sort: true, headerClasses: 'bg-dark text-white tb-step-02-loc',
    },
    {
      dataField: 'bilhete', text: 'Bilhete', sort: true, headerClasses: 'bg-dark text-white tb-step-02-bilhete',
    },
    {
      dataField: 'pax', text: 'Pax', sort: true, headerClasses: 'bg-dark text-white tb-step-02-pax',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-step-02-buttons',
    },
  ];

  const handleConsolidadorImportar = useCallback((empresa, id, AC_servico) => {
    async function getFichaConsolidador() {
      const { dispatch } = props;
      const response = await getDados(props, `/TsmCONSOLIDADOR/FICHA/${empresa}/${id}/${AC_servico}`, '');
      dispatch({ type: '@SET_PROSERVICO_FICHA_CONSOLIDADOR', payload: response });
      dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_TRUE' });
    }
    getFichaConsolidador();
    const lista = document.getElementsByClassName('wizard-steps');
    lista.forEach((item) => {
      if (item.textContent === 'Fornecedor') {
        item.classList.add('active');
      } else {
        item.classList.add('done');
      }
    });
    setVisibilityConsolidador('');
  }, [props]);

  const handleConsolidador = useCallback((AC_servico) => {
    setTableData([]);
    setVisibilityConsolidador('exibe');
    async function getConsolidador() {
      const data = { data: formatData(dt_consolidador) };
      const response = await getPagina(props, '/TsmCONSOLIDADOR/PAGINA', '', data, '');
      const temp = [];
      response.forEach((item) => {
        const {
          empresa, dempresa, id, loc, pax, bilhete,
        } = item;
        const row = {
          empresa: dempresa,
          id,
          loc,
          pax,
          bilhete,
          buttons: <Buttons
            description="Importar"
            color="success"
            position="right"
            title="Importar via Rextur / KG Travel"
            permission={props}
            onClick={() => handleConsolidadorImportar(empresa, id, AC_servico)}
          />,
        };
        temp.push(row);
      });
      setTableData(temp);
    }
    getConsolidador();
  }, [props, dt_consolidador, handleConsolidadorImportar]);

  const atualizaTipoHospedagem = useCallback((hospedagem) => {
    const { dispatch } = props;
    dispatch({ type: '@SET_PROSERVICO_TIPO_HOSPEDAGEM', payload: parseInt(hospedagem, 10) });
  }, [props]);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      ////// TIPO HOSPEDAGEM
      const hos_tipo = await getDados(props, '/TsmSISTEMA/TIPO_HOSPEDAGEM_TABELA', '');
      setListaHos_Tipo(hos_tipo);
    }
    getTabelas();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
      getTabelas();
    }
  }, [props, firstLoad, getTabelas]);

  /// RECEBE FICHA DATA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const {
        id,
        //tipo_servico,

        for_pessoa,
        for_nome_pessoa,
        for_nome_pessoa2,
        for_id_pfisica,
        for_id_pjuridica,
        for_gera_pagto,

        especificacao,
        hos_tipo,
        hos_apto,

        cnf_data,
        cnf_numero,
        cnf_contato,

        descricao,
      } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        setFor_Pessoa(for_pessoa);
        setFor_Id_Pfisica(for_id_pfisica);
        setFor_Id_Pjuridica(for_id_pjuridica);

        switch (for_pessoa) {
          case 1:
            setId_Fornecedor(for_id_pfisica);
            setFornecedor(for_nome_pessoa);
            break;
          case 2:
            setId_Fornecedor(for_id_pjuridica);
            setFornecedor(for_nome_pessoa2);
            break;
          default:
        }

        if (for_gera_pagto !== undefined) { setFor_gera_pagto(for_gera_pagto); }
        if (descricao !== undefined) { setDescricao(descricao); }

        setEspecificacao(especificacao);
        setHos_tipo(hos_tipo);
        setHos_apto(hos_apto);

        setCnf_data(formatDataInput(cnf_data));
        setCnf_numero(cnf_numero);
        setCnf_contato(cnf_contato);

        setAtualizado(true);
        //setId(id);

        const { dispatch } = props;

        //if (tipo_servico !== undefined) { dispatch({ type: '@SET_AUTOCOMPLETAR_ID_RSERVICO', payload: tipo_servico }); }
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_02_FALSE' });
        //console.log('Atualizado Step 2');
      }
    }
  }, [props, flagAtualizado]);

  /// ATUALIZA FORM
  useEffect(() => {
    const newForm = {
      fornecedor,

      especificacao,
      hos_tipo,
      hos_apto,

      cnf_data,
      cnf_numero,
      cnf_contato,

      for_pessoa,
      for_id_pfisica,
      for_id_pjuridica,
      for_gera_pagto,
      descricao,
    };

    localStorage.setItem('PROSERVICO_FORM_STEP_02', JSON.stringify(newForm));
  }, [for_pessoa, for_id_pfisica, for_id_pjuridica, for_gera_pagto, dadosAdicionais, descricao, id_Fornecedor,
    fornecedor, especificacao, hos_tipo, hos_apto, cnf_data, cnf_numero, cnf_contato]);

  /// MONITORA TIPO SERVICO
  useEffect(() => {
    switch (parseInt(props.tipo_servico, 10)) {
      /// AEREO
      case 1:
        setVisibilityBoxConsolidador('');

        setVisibilityBoxConfirmacao('hide');
        setVisibilityHospedagem('hide');

        break;
        /// HOSPEDAGEM
      case 2:
        setVisibilityBoxConsolidador('hide');

        setVisibilityBoxConfirmacao('');
        setVisibilityHospedagem('');
        break;
        /// VEICULO
      case 3:
        setVisibilityBoxConsolidador('hide');

        setVisibilityBoxConfirmacao('');
        setVisibilityHospedagem('hide');
        break;
      default:
        setVisibilityBoxConsolidador('hide');

        setVisibilityBoxConfirmacao('');
        setVisibilityHospedagem('hide');
    }
  }, [props.tipo_servico]);

  /// MONITORA TIPO HOSPEDAGEM
  useEffect(() => {
    atualizaTipoHospedagem(hos_tipo);
  }, [atualizaTipoHospedagem, hos_tipo]);

  /// AUTO COMPLETAR SERVICO
  useEffect(() => {
    setTipo_Servico(props.AC_servico);
    //console.log('FORNECEDOR:: '+props.AC_servico);
  }, [props.AC_servico]);

  useEffect(() => {
    setFornecedor(AC_Fornecedor);
    setDadosAdicionais(AC_Fornecedor_DadosAdicionais);
    setId_Fornecedor(AC_ID_Fornecedor);

    if (AC_Fornecedor_DadosAdicionais !== undefined) {
      const {
        pessoa, id_pfisica, id_pjuridica, gera_pagto,
      } = AC_Fornecedor_DadosAdicionais;

      if (pessoa !== undefined) {
        setFor_Pessoa(pessoa);
        setFor_Id_Pfisica(id_pfisica);
        setFor_Id_Pjuridica(id_pjuridica);
        setFor_gera_pagto(gera_pagto);
      }
    }
  }, [AC_Fornecedor, AC_ID_Fornecedor, AC_Fornecedor_DadosAdicionais]);

  return (
    <>
      {/*** LINHA 01 - CONSOLIDADOR ***/}
      <Row className={`step02-box-consolidador ${visibilityBoxConsolidador}`}>
        <Col sm={4} md={3} xl={2} className={visibilityBoxConsolidador}>
          <FormGroup>
            <Label>Data Emissão</Label>
            <Input
              type="date"
              value={dt_consolidador}
              onChange={(e) => setDt_consolidador(e.target.value)}
            />
          </FormGroup>
        </Col>

        {/*** BTN CONSOLIDADOR ***/}
        <Col sm={8} className={`m-0 p-0 pt-4 ${visibilityBoxConsolidador}`}>
          <FormGroup>
            <Label>&nbsp;</Label>
            <Buttons
              description="Consolidador"
              color="blue"
              position="left"
              title="Importar via Rextur / KG Travel"
              permission={props}
              onClick={() => handleConsolidador(AC_servico)}
            />
          </FormGroup>
        </Col>
      </Row>

      {/*** LINHA 02 - FORNECEDOR ***/}
      <Row>
        {/*** CONTATO ***/}
        <Col sm={6} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Fornecedor</Label>
            <AutoCompletarV2
              {...props}
              value={fornecedor}
              valueId={id_Fornecedor}
              tabela="FORNECEDOR"
              campo={tipo_servico}
              disabled={false}
              visible
              dados_adicionais
              editar={{ id: id_Fornecedor, value: fornecedor, valueId: id_Fornecedor }}
            />
          </FormGroup>
        </Col>
        {/*** DESCRICAO ***/}
        <Col sm={6} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Descrição</Label>
            <Input
              type="text"
              value={descricao}
              maxLength={120}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      {/*** LINHA 03 - HOSPEDAGEM ***/}
      <Row className={visibilityHospedagem}>
        {/*** ESPECIFICACAO ***/}
        <Col sm={6} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Especificação</Label>
            <Input
              type="text"
              value={especificacao}
              onChange={(e) => setEspecificacao(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** APTO ***/}
        <Col sm={2} md={2} lg={1} xl={1}>
          <FormGroup>
            <Label>Apto</Label>
            <Input
              type="text"
              value={hos_apto}
              maxLength={5}
              onChange={(e) => setHos_apto(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** TIPO HOSPEDAGEM ***/}
        <Col sm={2} md={2} lg={2} xl={2}>
          <FormGroup>
            <Label>Tipo Hospedagem</Label>
            <Input
              type="select"
              value={hos_tipo}
              onChange={(e) => setHos_tipo(e.target.value)}
            >
              <option value="0">Selecione...</option>

              { !!listaHos_Tipo && listaHos_Tipo.map((item) => (
                <option key={item.id} value={item.id}>{item.descricao}</option>
              ))}

            </Input>
          </FormGroup>
        </Col>
      </Row>

      {/*** LINHA 04 - BOX CONFIRMACAO ***/}
      <Row className={`step02-box-confirmacao ${visibilityBoxConfirmacao}`}>
        <div className="step02-label-confirmacao">
          <Label>Confirmação</Label>
        </div>

        {/*** DATA ***/}
        <Col sm={4} md={3} xl={2}>
          <FormGroup>
            <Label>Data</Label>
            <Input
              type="date"
              value={cnf_data}
              onChange={(e) => setCnf_data(e.target.value)}
            />
          </FormGroup>
        </Col>

        {/*** NUMERO ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Número</Label>
            <Input
              type="text"
              value={cnf_numero}
              onChange={(e) => setCnf_numero(e.target.value)}
            />
          </FormGroup>
        </Col>

        {/*** CONFIRMADO POR ***/}
        <Col sm={5} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Confirmado por</Label>
            <Input
              type="text"
              value={cnf_contato}
              onChange={(e) => setCnf_contato(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      {/*** CARD CONSOLIDADOR ***/}
      <Card className={`card-consolidador ${visibilityConsolidador}`}>
        <CardHeader className="mb-0 pb-0">
          <Row>
            <Col sm={4} md={3} xl={2}>
              <FormGroup>
                <Label>Data Emissão</Label>
                <Input
                  type="date"
                  value={dt_consolidador}
                  onChange={(e) => setDt_consolidador(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={4} md={6} xl={5} className="m-0 p-0 pt-4">
              <FormGroup>
                <Label>&nbsp;</Label>
                <Buttons
                  description="Consolidador"
                  color="blue"
                  position="left"
                  title="Importar via Rextur / KG Travel"
                  permission={props}
                  onClick={() => handleConsolidador(AC_servico)}
                />
              </FormGroup>
            </Col>
            <Col sm={4} md={3} xl={5} className="m-0 p-0 pt-4 pr-3">
              <FormGroup>
                <Label>&nbsp;</Label>
                <Buttons
                  description="Fechar"
                  color="gray"
                  position="right"
                  title="Fechar"
                  permission={props}
                  onClick={() => setVisibilityConsolidador('')}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="">

          <BootstrapTable
            keyField="id"
            data={tabledata}
            classes="table-striped table-movimento"
            columns={tableColumns}
            bootstrap4
            bordered={false}
            pagination={paginationFactory({
              sizePerPage: 5,
              sizePerPageList: [5, 10, 25, 50, 100],
            })}
          />

        </CardBody>
      </Card>
      <div className={`bg-consolidador ${visibilityConsolidador}`} />
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.servicos.fichaData,
  form: state.servicos.Bilhete_ShowForm,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step02,

  tipo_servico: state.servicos.tipo_servico,
  AC_servico: state.autoCompletar.autoCompletarId_RServico,

  AC_Fornecedor: state.autoCompletar.autoCompletarFornecedor,
  AC_ID_Fornecedor: state.autoCompletar.autoCompletarId_Fornecedor,
  AC_Fornecedor_DadosAdicionais: state.autoCompletar.autoCompletarFornecedorDadosAdicionais,
});
export default connect(() => (mapState))(Step02);
