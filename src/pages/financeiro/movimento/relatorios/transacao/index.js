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
  getExcel, getDados, formatData, formatExibeValor,
} from '../../../../../functions/sistema';
import { saveTransacaoFiltro } from '../../../../../functions/financeiro/movimento/relatorios/transacao';

function TransacaoConsulta(props) {
  const [tbody, setTbody] = useState([]);
  const [dados, setDados] = useState([]);
  const [oculta, setOculta] = useState('oculta');
  const [filtro, setFiltro] = useState('');
  const [firstLoad, setFirst] = useState(true);

  const [listaContas, setListaContas] = useState([]);
  const [dcontas, setDContas] = useState('');
  const [id_contas, setId_Contas] = useState('');

  const [transacao, setTransacao] = useState('');
  const [dtransacao, setDTransacao] = useState('');

  const [data, setData] = useState('');

  const [dt_perini, setDt_perini] = useState('');
  const [dt_perfim, setDt_perfim] = useState('');

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
    <Buttons description="Filtrar" color="primary" onClick={() => saveFiltro()} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => handleFiltro(filtro)} title="Limpa todas as configurações do filtro" />,
  ];

  const handleFiltro = useCallback((exibe) => {
    switch (exibe) {
      case 'oculta': setFiltro(''); break;
      case '': setFiltro('oculta'); break;
      default:
    }
  }, []);

  const setFields = useCallback(() => {
    const filtro = localStorage.getItem('RELATORIO_TRANSACAO_FILTRO');
    if (filtro) {
      const {
        transacao, data, dt_perini, dt_perfim, dtransacao, dcontas,
      } = JSON.parse(filtro);
      setTransacao(transacao);
      setDTransacao(dtransacao);
      setDContas(dcontas);
      setData(data);
      setDt_perini(dt_perini);
      setDt_perfim(dt_perfim);
    }
  }, []);

  const resetFields = useCallback(() => {
    setTransacao('');
    setData('');
    setDt_perini('');
    setDt_perfim('');
  }, []);

  const handleContas = useCallback((input) => {
    const arrayDContas = [];
    let newValue = '';
    input.getElementsByTagName('option').forEach((linha) => {
      if (linha.selected) {
        //console.log(linha);
        newValue = `${newValue},${linha.value}`;
        arrayDContas.push(`${linha.text} / `);
      }
    });
    setId_Contas(newValue);
    setDContas(arrayDContas);
  }, []);

  const handleDTransacao = useCallback((input) => {
    input.getElementsByTagName('option').forEach((linha) => {
      if (linha.selected) { setDTransacao(linha.text); }
    });
  }, []);

  const saveFiltro = useCallback(() => {
    setFiltro('oculta');

    const form = {
      transacao,
      dtransacao,
      data,
      dcontas,
      id_contas,
      dt_perini,
      dt_perfim,
    };

    saveTransacaoFiltro(props, form);
  }, [props, dtransacao, transacao, data, dcontas, id_contas, dt_perini, dt_perfim]);

  useEffect(() => {
    if (!props.loading) {
      setTbody(<tbody>{ dados }</tbody>);
    } else {
      setTbody(
        <tbody>
          <tr>
            <td className="p-3 text-center" colSpan="9">
              <Spinner size="sm" className="text-roxo-ventu" />
              <span className="h4 ml-2 text-roxo-ventu">carregando...</span>
            </td>
          </tr>
        </tbody>,
      );
    }
  }, [props, dados, props.loading]);

  useEffect(() => {
    if (props.transacaoData.length > 1) {
      const { dispatch } = props;
      const dadosRelatorio = [];

      props.transacaoData.forEach((item) => {
        let movimento = item.id;
        const link_movimento = `/financeiro/movimento/consulta/${item.id}`;

        const { data } = item;
        const { pessoa } = item;
        let link_pessoa;
        let nome_pessoa = <a className="text-blue" href={link_pessoa}>{ item.nome_pessoa }</a>;

        const { subgrupo } = item;
        const link_subgrupo = `/financeiro/subgrupo/consulta/${item.id_subgrupo}`;

        const { forma } = item;
        const { conta } = item;
        const link_conta = `/financeiro/conta/consulta/${item.id_conta}`;
        const { moeda } = item;
        const { valor } = item;
        const { dstatus } = item;

        if (movimento === 0) {
          movimento = '';
          nome_pessoa = item.nome_pessoa;
        }

        if (pessoa === 1) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (pessoa === 2) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        dadosRelatorio.push(
          <tr>
            <td><Link className="text-blue" to={link_movimento}>{ movimento }</Link></td>
            <td>{ data }</td>
            <td><Link className="text-blue" to={link_pessoa}>{ nome_pessoa }</Link></td>
            <td><Link className="text-blue" to={link_subgrupo}>{ subgrupo }</Link></td>
            <td>{ forma }</td>
            <td><Link className="text-blue" to={link_conta}>{ conta }</Link></td>
            <td>{ moeda }</td>
            <td className="text-right">{ formatExibeValor(valor) }</td>
            <td className="text-right">{ dstatus }</td>
          </tr>,
        );
      });

      //setFieldsTransacaoFiltro(props.filtroData);
      setTimeout(() => setDados(dadosRelatorio), 100);
      setTimeout(() => dispatch({ type: '@SET_TRANSACAO_LOADING_FALSE' }), 600);
    }
  }, [props, props.transacaoData]);

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

  useEffect(() => {
    if (firstLoad && props.transacaoData.length === 1) {
      getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
      setFields();
      setFirst(false);
    }
  }, [props, firstLoad, setFields]);

  useEffect(() => {
    const arrayContas = [];
    props.contaListaData.forEach((item) => {
      arrayContas.push(<option value={item.id}>{ item.descricao }</option>);
    });
    setListaContas(arrayContas);
  }, [props.contaListaData]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          buttons={ActionButtons}
          title="Relatórios"
          subtitle="/ consulta por Transação"
          voltar
          linkTo="/financeiro/movimento"
        />

        {/*** FILTRO ***/}
        <Container id="relatorios-transacao-filtro" fluid className={`p-0 filter ${filtro}`}>
          <Card className="bg-dark text-white">
            <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
              <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                {/*** TRANSACAO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Transação</Label>
                    <Input
                      type="select"
                      value={transacao}
                      onChange={(e) => setTransacao(e.target.value)}
                      onChangeCapture={(e) => handleDTransacao(e.target)}
                    >
                      <option value="0">Selecione...</option>
                      <option value="1">PAGAR</option>
                      <option value="2">RECEBER</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/*** DATA ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data</Label>
                    <Input
                      type="select"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    >
                      <option value="0">Selecione...</option>
                      <option value="1">VENCIMENTO</option>
                      <option value="2">PAGAMENTO</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** CONTAS ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Conta</Label>
                    <Input
                      type="select"
                      id="transacao-filtro-contas"
                      multiple
                      onChange={(e) => handleContas(e.target)}
                    >
                      { listaContas }
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** DATA INICIO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>data inicio</Label>
                    <Input
                      type="date"
                      value={dt_perini}
                      onChange={(e) => setDt_perini(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DATA FIM ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data fim</Label>
                    <Input
                      type="date"
                      value={dt_perfim}
                      onChange={(e) => setDt_perfim(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} className="text-right pt-4">
                  { FiltroButtons }
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>

        <Card id="relatorios-transacao" className={`p-3 filter ${oculta}`}>
          <RowReportsExcel props={props} funcao={() => getExcel(props, '/TsmFIN_TRANSACAO/EXCEL')} />
          <ConsultaHeader titulo="Movimento / Transação" />
          <CardHeader className="pt-0 mt-0">
            {/*** TRANSACAO ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Transação:</span>
                <span className="text-muted">{ dtransacao }</span>
              </Col>
            </Row>
            {/*** CONTAS ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Contas:</span>
                <span className="text-muted">{ dcontas }</span>
              </Col>
            </Row>
            {/*** PERIODO ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Período:</span>
                <span className="text-muted">
                  { formatData(dt_perini) }
                  {' '}
até
                  {' '}
                  { formatData(dt_perfim) }
                </span>
              </Col>
            </Row>
          </CardHeader>
          <Table size="sm" striped className="mb-3">
            <thead>
              <tr>
                <th width={90} className="h5 bg-dark text-white">Movimento</th>
                <th width={120} className="h5 bg-dark text-white">Data Pagamento</th>
                <th width="auto" className="h5 bg-dark text-white">Contato</th>
                <th width="auto" className="h5 bg-dark text-white">Subgrupo</th>
                <th width="auto" className="h5 bg-dark text-white">Forma</th>
                <th width={150} className="h5 bg-dark text-white">Conta</th>
                <th width={50} className="h5 bg-dark text-white">Moeda</th>
                <th width={150} className="h5 bg-dark text-white text-right">Valor R$</th>
                <th width={150} className="h5 bg-dark text-white text-right">Status</th>
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

  filtroColor: state.transacao.filtroColor,
  filtroAtivo: state.transacao.filtroAtivo,

  relatorioView: state.transacao.relatorioView,
  loading: state.transacao.loading,

  transacaoData: state.transacao.transacaoData,
  contaListaData: state.conta.contaListaData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(TransacaoConsulta);
