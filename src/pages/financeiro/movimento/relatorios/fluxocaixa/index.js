///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardHeader, Col, Container, Row, Table, Spinner, CardBody, FormGroup, Input, Label, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PageTitle, ConsultaHeader, ConsultaFooter, RowReportsExcel, Buttons,
} from '../../../../../components';
import {
  getExcel, getDados, formatData, formatDataInput, formatExibeValor,
} from '../../../../../functions/sistema';
import { saveFluxoCaixaFiltro } from '../../../../../functions/financeiro/movimento/relatorios/fluxocaixa';

function FluxoCaixaConsulta(props) {
  const [moeda, setMoeda] = useState([]);
  const [id_moeda, setId_Moeda] = useState('');

  const [conta, setConta] = useState([]);
  const [id_contas, setId_Conta] = useState('');

  const [dtIni, setDtIni] = useState('');
  const [dtFim, setDtFim] = useState('');

  const [form, setForm] = useState('');

  const [tituloMoeda, setTituloMoeda] = useState('');
  const [tituloContas, setTituloContas] = useState('');

  const [tbody, setTbody] = useState([]);
  const [dados, setDados] = useState([]);
  const [oculta, setOculta] = useState('oculta');
  const [filtro, setFiltro] = useState('');

  const [firstLoad, setFirst] = useState(true);

  const ActionButtons = [
    <Buttons
      onClick={() => handleFiltro(filtro)}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
  ];

  const FiltroButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveFiltro(form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFiltro()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => handleFiltro(filtro)} title="Limpa todas as configurações do filtro" />,
  ];

  const resetFiltro = useCallback(() => {
    setId_Moeda('');
    setId_Conta('');
    setConta([]);
    setDtIni('');
    setDtFim('');
  }, []);

  const handleConta = useCallback((id) => {
    setId_Moeda(id);
    const { dispatch } = props;
    dispatch({ type: '@RESET_CONTA_LISTA' });
    getDados(props, `/TsmCONTA/PESQUISAMOEDA/${id}`, '@GET_CONTA_LISTA');
  }, [props]);

  const handleFiltro = useCallback((exibe) => {
    switch (exibe) {
      case 'oculta': setFiltro(''); setOculta('oculta'); break;
      case '': setFiltro('oculta'); break;
      default:
    }
  }, []);

  const handleTituloMoeda = useCallback((id_moeda) => {
    props.moedaListaData.forEach((item) => {
      if (parseInt(item.id, 10) === parseInt(id_moeda, 10)) {
        setTituloMoeda(item.descricao);
      }
    });
  }, [props]);

  const handleTituloContas = useCallback((id_contas) => {
    props.contaListaData.forEach((item) => {
      if (parseInt(item.id, 10) === parseInt(id_contas, 10)) {
        setTituloContas(item.descricao);
      }
    });
  }, [props]);

  const saveFiltro = useCallback((form) => {
    setFiltro('oculta');
    saveFluxoCaixaFiltro(props, form);
  }, [props]);

  useEffect(() => {
    if (firstLoad) {
      getDados(props, '/TsmMOEDA/PESQUISA/DESCRICAO', '@GET_MOEDA_LISTA'); /// RECEBE DADOS

      const filtro = JSON.parse(localStorage.getItem('RELATORIO_FLUXOCAIXA_FILTRO'));

      if (filtro) {
        setId_Moeda(filtro.id_moeda);
        handleConta(filtro.id_moeda);
        setId_Conta(filtro.id_contas);
        setDtIni(formatDataInput(filtro.dt_perini));
        setDtFim(formatDataInput(filtro.dt_perfim));
        saveFiltro(filtro);
      }
      setFirst(false);
    }
  }, [props, firstLoad, saveFiltro, handleConta, id_moeda, id_contas]);

  useEffect(() => {
    const arrayMoedas = [];
    if (props.moedaListaData.length > 0) {
      props.moedaListaData.forEach((item) => {
        arrayMoedas.push(
          <option value={item.id}>
            {' '}
            { item.descricao }
          </option>,
        );
      });
      handleTituloMoeda(id_moeda);
      setMoeda(arrayMoedas);
    }
  }, [handleTituloMoeda, id_moeda, props.moedaListaData]);

  useEffect(() => {
    const arrayContas = [];
    if (props.contaListaData.length > 0) {
      props.contaListaData.forEach((item) => {
        arrayContas.push(
          <option className="p-1" value={item.id}>
            {' '}
            { item.descricao }
          </option>,
        );
      });
      handleTituloContas(id_contas);
      setConta(arrayContas);
    }
  }, [handleTituloContas, id_contas, props.contaListaData]);

  useEffect(() => {
    setForm({
      id_moeda: parseInt(id_moeda, 10),
      id_contas,
      dt_perini: formatData(dtIni),
      dt_perfim: formatData(dtFim),
    });
  }, [id_moeda, id_contas, dtIni, dtFim]);

  useEffect(() => {
    if (!props.loading) {
      setTbody(<tbody>{ dados }</tbody>);
    } else {
      setTbody(
        <tbody>
          <tr>
            <td className="p-3 text-center" colSpan="6">
              <Spinner size="sm" className="text-roxo-ventu" />
              <span className="h4 ml-2 text-roxo-ventu">carregando...</span>
            </td>
          </tr>
        </tbody>,
      );
    }
  }, [props, dados, props.loading]);

  useEffect(() => {
    if (props.fluxoCaixaData.length > 1) {
      const { dispatch } = props;
      const dadosRelatorio = [];

      props.fluxoCaixaData.forEach((item) => {
        const data_pagamento = item.dt_pagamento;
        let movimento = item.id;
        const link_movimento = `/financeiro/movimento/consulta/${item.id}`;
        const { pessoa } = item;
        let link_pessoa;
        let nome_pessoa = <a className="text-blue" href={link_pessoa}>{ item.nome_pessoa }</a>;
        let { conciliado } = item;
        const { previsto } = item;
        const { forma } = item;
        let class_conciliado = 'text-blue';
        let class_previsto = 'text-blue';

        if (movimento === 0) {
          movimento = '';
          nome_pessoa = item.nome_pessoa;
        }

        if (conciliado === 0) { conciliado = ''; }

        if (pessoa === 1) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (pessoa === 2) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        if (conciliado.toString().substring(0, 1) === '-') { class_conciliado = 'text-danger'; }
        if (previsto.toString().substring(0, 1) === '-') { class_previsto = 'text-danger'; }

        dadosRelatorio.push(
          <tr>
            <td>{ data_pagamento }</td>
            <td><Link className="text-blue" to={link_movimento}>{ movimento }</Link></td>
            <td><Link className="text-blue" to={link_pessoa}>{ nome_pessoa }</Link></td>
            <td className={`text-right ${class_conciliado}`}>{ formatExibeValor(conciliado) }</td>
            <td className={`text-right ${class_previsto}`}>{ formatExibeValor(previsto) }</td>
            <td className="text-right">{ forma }</td>
          </tr>,
        );
      });

      ///setFieldsFluxoCaixaFiltro(props.filtroData);
      setTimeout(() => setDados(dadosRelatorio), 100);
      setTimeout(() => dispatch({ type: '@SET_FLUXOCAIXA_LOADING_FALSE' }), 600);
    }
  }, [props, props.fluxoCaixaData]);

  useEffect(() => {
    switch (props.relatorioView) {
      case true:
        setFiltro('oculta');
        setTimeout(() => setOculta(''), 400);
        break;
      default: setFiltro('');
        setOculta('oculta');
    }
  }, [props.relatorioView]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          buttons={ActionButtons}
          title="Relatórios"
          subtitle="/ Fluxo de Caixa"
          voltar
          linkTo="/financeiro/movimento"
        />

        {/*** FILTRO ***/}
        <>
          <Container id="relatorios-fluxocaixa-filtro" fluid className={`p-0 filter ${filtro}`}>
            <Card className="bg-dark text-white">
              <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
                <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
              </CardHeader>
              <CardBody>
                {/*** MOEDA ***/}
                <Row>
                  <Col sm={6} md={6} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Moeda</Label>
                      <Input
                        type="select"
                        value={id_moeda}
                        onChange={(e) => handleConta(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        { moeda }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/*** CONTAS ***/}
                <Row>
                  <Col sm={6} md={6} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Conta</Label>
                      <Input
                        type="select"
                        multiple
                        onChange={(e) => setId_Conta(e.target.value)}
                      >
                        { conta }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/*** DATAS ***/}
                <Row>
                  {/*** DATA INICIO ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>data inicio</Label>
                      <Input
                        type="date"
                        value={dtIni}
                        onChange={(e) => setDtIni(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** DATA FIM ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Data fim</Label>
                      <Input
                        type="date"
                        value={dtFim}
                        onChange={(e) => setDtFim(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/*** BUTTONS ***/}
                <Row>
                  <Col sm={12} md={12} lg={12} className="text-right pt-4">
                    { FiltroButtons }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Container>
        </>

        {/*** RELATORIO ***/}
        <Card id="relatorios-fluxocaixa" className={`p-3 filter ${oculta}`}>
          <RowReportsExcel props={props} funcao={() => getExcel(props, '/TsmFIN_FLUCAIXA/EXCEL', form)} />
          <ConsultaHeader titulo="Fluxo de Caixa" />

          <CardHeader className="pt-0 mt-0">
            {/*** MOEDA ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Moeda:</span>
                <span className="text-muted">{ tituloMoeda }</span>
              </Col>
            </Row>
            {/*** CONTAS ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Contas:</span>
                <span className="text-muted">{ tituloContas }</span>
              </Col>
            </Row>
            {/*** PERIODO ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Período:</span>
                <span className="text-muted">
                  { formatData(dtIni) }
                  {' '}
até
                  {' '}
                  { formatData(dtFim) }
                </span>
              </Col>
            </Row>
          </CardHeader>

          <Table size="sm" striped className="mb-3">
            <thead>
              <tr>
                <th width={140} className="h5 bg-dark text-white">Data Pagamento</th>
                <th width={90} className="h5 bg-dark text-white">Movimento</th>
                <th width="auto" className="h5 bg-dark text-white">Contato</th>
                <th width={100} className="h5 bg-dark text-white text-right">Conciliado</th>
                <th width={150} className="h5 bg-dark text-white text-right">Previsto / Confirmado</th>
                <th width={60} className="h5 bg-dark text-white text-right">Forma</th>
              </tr>
            </thead>
            { tbody }
          </Table>

          <ConsultaFooter />
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,

  filtroData: state.fluxocaixa.filtroData,
  filtroColor: state.fluxocaixa.filtroColor,
  filtroAtivo: state.fluxocaixa.filtroAtivo,

  relatorioView: state.fluxocaixa.relatorioView,
  loading: state.fluxocaixa.loading,

  fluxoCaixaData: state.fluxocaixa.fluxoCaixaData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  contaListaData: state.conta.contaListaData,
  moedaListaData: state.moeda.moedaListaData,

});
export default connect(() => (mapState))(FluxoCaixaConsulta);
