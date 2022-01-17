///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardHeader, Col, Container, Row, Table, Spinner, CardBody, FormGroup, Input, Label, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PageTitle, ConsultaHeader, ConsultaFooter, RowReportsExcel, Buttons, AutoCompletarPessoa,
} from '../../../../../components';
// import AutoCompletarPessoa from '../../../../../functions/sistema/';
import { getExcel, formatExibeValor } from '../../../../../functions/sistema';
import {
  saveContatoFiltro, setFieldsContatoFiltro, recebeCookie, resetFieldsContatoFiltro,
} from '../../../../../functions/financeiro/movimento/relatorios/contato';
import { filtroData } from '../../../../../redux/initials/sistema/usuario';

function ContatoConsulta(props) {
  const [tbody, setTbody] = useState([]);
  const [dados, setDados] = useState([]);
  const [oculta, setOculta] = useState('oculta');
  const [filtro, setFiltro] = useState('');
  const [firstLoad, setFirst] = useState(true);


  const [id, setId] = useState(0);
  const [pessoa, setPessoa] = useState(0);
  const [nome_pessoa, setNome_pessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');


    const [flagEditar, setFlagEditar] = useState(true);
  
    const [ACV_visible, setACV_visible] = useState(true);
    const [PF_visible, setPF_visible] = useState(false);
    const [PF_disable, setPF_disable] = useState(true);
    const [PJ_visible, setPJ_visible] = useState(false);
    const [PJ_disable, setPJ_disable] = useState(true);

  //////// PAGINA ////////


  const handleContato = useCallback((pessoa) => {
    switch (parseInt(pessoa, 10)) {
      case 1:
        setACV_visible(false);

        setPF_disable(false);
        setPF_visible(true);

        setPJ_disable(true);
        setPJ_visible(false);

        break;

      case 2:
        setACV_visible(false);

        setPF_disable(true);
        setPF_visible(false);

        setPJ_disable(false);
        setPJ_visible(true);

        break;

      default:
        setACV_visible(true);

        setPF_disable(true);
        setPF_visible(false);

        setPJ_disable(true);
        setPJ_visible(false);
    }
  }, []);
  useEffect(() => {
    handleContato(props.pessoa);
  }, [props.pessoa, handleContato]);

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
    saveContatoFiltro(props);
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
    if (props.contatoData.length > 1) {
      const { dispatch } = props;
      const dadosRelatorio = [];

      props.contatoData.forEach((item) => {
        let movimento = item.id;
        const link_movimento = `/financeiro/movimento/consulta/${item.id}`;
        const { dt_vencimento } = item;
        const { grupo } = item;
        const { subgrupo } = item;
        const { descricao } = item;
        let { forma } = item;
        let { valor } = item;

        const { dstatus } = item;
        let class_valor = 'text-blue';

        if (movimento === 0) {
          movimento = '';
          forma = item.forma;
        }

        if (valor === 0) { valor = ''; }

        if (valor.toString().substring(0, 1) === '-') { class_valor = 'text-danger'; }

        dadosRelatorio.push(
          <tr>
            <td><Link className="text-blue" to={link_movimento}>{ movimento }</Link></td>
            <td>{ dt_vencimento }</td>
            <td>{ grupo }</td>
            <td>{subgrupo }</td>
            <td>{ descricao }</td>
            <td className="text-right">{ forma }</td>
            <td className={`text-right ${class_valor}`}>{ formatExibeValor(valor) }</td>
            <td className="text-right">{ dstatus }</td>
          </tr>,
        );
      });

      setFieldsContatoFiltro(props.filtroData);
      console.log(props.filtroData)
      setTimeout(() => setDados(dadosRelatorio), 100);
      setTimeout(() => dispatch({ type: '@SET_CONTATO_LOADING_FALSE' }), 600);
    }
  }, [props, props.contatoData]);
  console.log(props.contatoData)

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
    <Buttons description="Filtrar" color="primary" onClick={() => saveFiltro()} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFieldsContatoFiltro(props)} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => handleFiltro(filtro)} title="Limpa todas as configurações do filtro" />,
  ];

  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

   useEffect(() => {
    if (firstLoad && props.contatoData.length === 1) {
      recebeCookie('relatorioContato', props);
      setFirst(false);
    }
    console.log(props.contatoData)
  }, [props, firstLoad]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
          buttons={ActionButtons}
          title="Relatórios"
          subtitle="/ consulta por Contato"
          voltar
          linkTo="/financeiro/movimento"
        />

        <Container id="relatorios-contato-filtro" fluid className={`p-0 filter ${filtro}`}>
          <Card className="bg-dark text-white">
            <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
              <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                 {/*** PESSOA ***/}
                 <Col sm={4} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Pessoa</Label>
                      <Input
                        type="select"
                        className="required"
                        value={pessoa}
                        id="pessoa"
                        config={props}
                        onChange={(e) => setPessoa(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        <option value="1">FÍSICA</option>
                        <option value="2">JURÍDICA</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** CONTATO ***/}
                  
                  <Col sm={8} md={5} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Contratante</Label>
                      <AutoCompletarPessoa
                        {...props}
                        pessoa={pessoa}
                        editar={{
                          id,
                          pfisica: { id: id_pfisica, descricao: pfisica},
                          pjuridica: { id: id_pjuridica, descricao: pjuridica },
                        }}
                      />
                    </FormGroup>
                  </Col>
               {/*** DATA INICIO ***/}
                <Col sm={6} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data inicio</Label>
                    <Input type="date" id="contato-filtro-dt-perini" name="contato-filtro-dt-perini" />
                  </FormGroup>
                </Col> 
                {/*** DATA FIM ***/}
                <Col sm={6} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data fim</Label>
                    <Input type="date" id="contato-filtro-dt-perfim" name="contato-filtro-dt-perfim" />
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

        <Card id="relatorios-contato" className={`p-3 filter ${oculta}`}>
          <RowReportsExcel props={props} funcao={() => getExcel(props, '/TsmFIN_CONTATO/EXCEL')} />
          <ConsultaHeader titulo="Contato" />
          <CardHeader className="pt-0 mt-0">
            {/*** CONTATO ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Contato:</span>
                <span className="text-muted">{ props.filtroData.nome }</span>
              </Col>
            </Row>

            {/*** PERIODO ***/}
            <Row className="h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Data Vencimento:</span>
                <span className="text-muted">
                  { props.filtroData.dt_perini }
                  {' '}
                  <span className="ml-2 mr-2">até</span>
                  {' '}
                  { props.filtroData.dt_perfim }
                </span>
              </Col>
            </Row>
          </CardHeader>
          <Table size="sm" striped className="mb-3">
            <thead>
              <tr>
                <th width={90} className="h5 bg-dark text-white">Movimento</th>
                <th width={120} className="h5 bg-dark text-white">Data Vencimento</th>
                <th width={200} className="h5 bg-dark text-white">Grupo</th>
                <th width={200} className="h5 bg-dark text-white">Subgrupo</th>
                <th width="auto" className="h5 bg-dark text-white">Descrição</th>
                <th width={100} className="h5 bg-dark text-white text-right">Forma</th>
                <th width={120} className="h5 bg-dark text-white text-right">Valor R$</th>
                <th width={100} className="h5 bg-dark text-white text-right">Status</th>

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

  filtroData: state.contato.filtroData,
  filtroColor: state.contato.filtroColor,
  filtroAtivo: state.contato.filtroAtivo,

  relatorioView: state.contato.relatorioView,
  loading: state.contato.loading,

  contatoData: state.contato.contatoData,

  PJficha: state.pJuridica.comercialFichaData,
  PFficha: state.pFisica.pessoalFichaData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,

  // autoCompletarCursor: state.autoCompletar.autoCompletarCursor,
  // autoCompletarVazio: state.autoCompletar.autoCompletarVazio,

  autoCompletarPfisica: state.autoCompletar.autoCompletarPfisica,
  autoCompletarPjuridica: state.autoCompletar.autoCompletarPjuridica,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
});
export default connect(() => (mapState))(ContatoConsulta);
