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
import { getExcel, formatAno, formatExibeValor } from '../../../../../functions/sistema';
import {
  recebeCookie, setFieldsDreFiltro, resetFieldsDreFiltro, saveDreFiltro,
} from '../../../../../functions/financeiro/movimento/relatorios/dre';

function DreConsulta(props) {
  const [tbody, setTbody] = useState([]);
  const [dados, setDados] = useState([]);
  const [oculta, setOculta] = useState('oculta');
  const [filtro, setFiltro] = useState('');
  const [firstLoad, setFirst] = useState(true);
 
  //////// PAGINA ////////

  const ActionButtons = [
    <Buttons
      onClick={() => handleFiltro(filtro)}
      description="Filtrar"
      color={props.filtroColor[props.filtroAtivo]}
      title="Filtro de informações."
      permission={props}
    />,
  ];

  const handleFiltro = useCallback((exibe) => {
    switch (exibe) {
      case 'oculta': setFiltro(''); break;
      case '': setFiltro('oculta'); break;
      default:
    }
  }, []);

   const saveFiltro = useCallback(() => {
    setFiltro('oculta');
    saveDreFiltro(props);
  }, [props]);

  useEffect(() => {
    if (!props.loading) {
      setTbody(<tbody>{ dados }</tbody>);
    } else {
      setTbody(
        <tbody>

          <tr>
            <td className="p-3 text-center" colSpan="16">
              <Spinner size="sm" className="text-roxo-ventu" />
              <span className="h4 ml-2 text-roxo-ventu">carregando...</span>
            </td>
          </tr>
        </tbody>,
      );
    }
  }, [props, dados, props.loading]);

  useEffect(() => {
    if (props.dreData.length > 1) {
      const { dispatch } = props;
      const dadosRelatorio = [];

      props.dreData.forEach((item) => {
        const { dtipo } = item;
        const { grupo } = item;
        const { subgrupo } = item;
        const mes_regs = [];

        let class_red = '';
        class_red = 'text-right';

        item.mes_regs.forEach((mes) => {
          let valor;
          mes.valor === 0 ? valor = '' : valor = mes.valor;

          mes_regs.push(
            <td className="text-blue">
              <Link to={`/financeiro/movimento/relatorios/dremov/${mes.link}`}>{ formatExibeValor(valor) }</Link>
            </td>,
          );
        });

        const { total } = item;
        const media = formatExibeValor(item.media);
        const { percentagem } = item;

        if (total.toString().substring(0, 1) === '-') { class_red = 'text-danger'; }
        if (media.toString().substring(0, 1) === '-') { class_red = 'text-danger'; }

        let imprimirTipo;
        let imprimirGrupo;
        let imprimirSubgrupo;

        if (dtipo !== '' && grupo === '' && subgrupo === '') { imprimirTipo = dtipo; }
        if (dtipo !== '' && grupo !== '' && subgrupo === '') { imprimirGrupo = grupo; }
        if (dtipo !== '' && grupo !== '' && subgrupo !== '') { imprimirSubgrupo = subgrupo; }

        dadosRelatorio.push(
          <tr>
            <td>{imprimirTipo}</td>
            <td>{imprimirGrupo}</td>
            <td>{imprimirSubgrupo}</td>
            {mes_regs}
            <td className={`text-right ${class_red}`}>{ formatExibeValor(total) }</td>
            <td className={`text-right ${class_red}`}>{ formatExibeValor(media) }</td>
            <td className="text-right ">{ percentagem }</td>
          </tr>,
        );
      });

      setFieldsDreFiltro(props.filtroData);
      setTimeout(() => setDados(dadosRelatorio), 100);
      setTimeout(() => dispatch({ type: '@SET_DRE_LOADING_FALSE' }), 600);
    }
  }, [props, props.dreData]);

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

  //////// FILTRO ////////

  const FiltroButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveFiltro(props.filtroData)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFieldsDreFiltro(props)} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => handleFiltro(filtro)} title="Limpa todas as configurações do filtro" />,
  ];

  useEffect(() => {
    if (firstLoad && props.dreData.length === 1) {
      recebeCookie('relatorioDRE', props);
      setFirst(false);
    }
  }, [props, firstLoad]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          buttons={ActionButtons}
          title="Relatórios"
          subtitle="/ DRE - Demonstrativo de Resultados"
          voltar
          linkTo="/financeiro/movimento"
        />

        {/*** FILTRO ***/}
        <Container id="relatorios-dre-filtro" fluid className={`p-0 filter ${filtro}`}>
          <Card className="bg-dark text-white">
            <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
              <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                {/*** DATA ***/}
                <Col sm={4} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data</Label>
                    <Input type="select" id="dre-filtro-data" name="dre-filtro-data">
                      <option value="0">Selecione...</option>
                      <option value="1">VENCIMENTO</option>
                      <option value="2">PAGAMENTO</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/*** ANO ***/}
                <Col sm={4} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Ano</Label>
                    <Input 
                      type="text" 
                      onChange={(e) => formatAno(e.target)} 
                      id="dre-filtro-ano" 
                      name="dre-filtro-ano" 
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

        <Card id="relatorios-dre" className={`p-3 filter ${oculta}`}>
          <RowReportsExcel props={props} funcao={() => getExcel(props, '/TsmFIN_DRE/EXCEL', props.filtroData)} />
          <ConsultaHeader titulo={`DRE - Demonstrativo de Resultado ${props.filtroData.ano}`} />

          <Table size="sm" striped className="mb-3">
            <thead>
              <tr>
                <th width="auto" className="h5 bg-dark text-white ">Tipo</th>
                <th width="auto" className="h5 bg-dark text-white ">Grupo</th>
                <th width="auto" className="h5 bg-dark text-white ">Subgrupo</th>
                <th width={90} className="h5 bg-dark text-white text-left">JAN</th>
                <th width={90} className="h5 bg-dark text-white text-left">FEV</th>
                <th width={90} className="h5 bg-dark text-white text-left ">MAR</th>
                <th width={90} className="h5 bg-dark text-white text-left">ABR</th>
                <th width={90} className="h5 bg-dark text-white text-left">MAI</th>
                <th width={90} className="h5 bg-dark text-white text-left">JUN</th>
                <th width={90} className="h5 bg-dark text-white text-left">JUL</th>
                <th width={90} className="h5 bg-dark text-white text-left">AGO</th>
                <th width={90} className="h5 bg-dark text-white text-left">SET</th>
                <th width={90} className="h5 bg-dark text-white text-left">OUT</th>
                <th width={90} className="h5 bg-dark text-white text-left">NOV</th>
                <th width={90} className="h5 bg-dark text-white text-left">DEZ</th>
                <th width={100} className="h5 bg-dark text-white text-right">Soma</th>
                <th width={100} className="h5 bg-dark text-white text-right">Média</th>
                <th width={90} className="h5 bg-dark text-white text-right">%</th>
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

  filtroData: state.dre.filtroData,
  filtroColor: state.dre.filtroColor,
  filtroAtivo: state.dre.filtroAtivo,

  relatorioView: state.dre.relatorioView,
  loading: state.dre.loading,

  dreData: state.dre.dreData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(DreConsulta);