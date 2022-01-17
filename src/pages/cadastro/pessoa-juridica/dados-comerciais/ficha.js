///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  MenuPJuridica, AutoCompletarV2, SaveButton, PageTitle, Checkbox,
} from '../../../../components';
import { getPJuridicaComercialFicha, savePJuridicaComercial } from '../../../../functions/cadastro/pessoa-juridica';
import { formatCNPJ, formatDataInput } from '../../../../functions/sistema';

function FichaDadosComerciais(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [situacao, setSituacao] = useState(true);

  const [fornecedor, setFornecedor] = useState(true);

  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ie, setIe] = useState('');
  const [nif, setNif] = useState('');
  const [duns, setDuns] = useState('');
  const [id_ramoatividade, setId_ramoatividade] = useState(0);
  const [ramoatividade, setRamoatividade] = useState('');

  const [estrangeira, setEstrangeira] = useState(false);

  const [estrangeiro, setEstrangeiro] = useState('hide');
  const [nacional, setNacional] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handleEstrangeira = useCallback((value) => {
    setEstrangeira(value);
    if (value) {
      setEstrangeiro('');
      setNacional('hide');
    } else {
      setEstrangeiro('hide');
      setNacional('');
    }
  }, []);

  const handleFornecedor = useCallback((fornecedor) => {
    const { dispatch } = props;
    fornecedor
      ? dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_TRUE' })
      : dispatch({ type: '@SET_PJURIDICA_FORNECEDOR_FALSE' });
  }, [props]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      if (id > 0) { getPJuridicaComercialFicha(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  /// EDITAR
  useEffect(() => {
    const {
      id, situacao, razao_social, nome_fantasia, cnpj, ie, nif, duns, fornecedor,
      id_ramoatividade, ramoatividade, estrangeira, estrangeiro, nacional, alt_dhsis,
    } = props.comercialFichaData;
    if (id > 0) {
      setId(id);
      setFornecedor(fornecedor);
      setSituacao(situacao);
      setRazao_social(razao_social);
      setNome_fantasia(nome_fantasia);
      setCnpj(cnpj);
      setIe(ie);
      setNif(nif);
      setDuns(duns);
      setId_ramoatividade(id_ramoatividade);
      setRamoatividade(ramoatividade);
      setEstrangeira(estrangeira);
      setEstrangeiro(estrangeiro);
      setNacional(nacional);

      handleEstrangeira(estrangeira);
      handleFornecedor(fornecedor);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.comercialFichaData, handleEstrangeira, handleFornecedor]);

  /// campo AC
  useEffect(() => {
    setId_ramoatividade(props.autoCompletarId_Ramoatividade);
  }, [props.autoCompletarId_Ramoatividade]);

  /// salvar
  useEffect(() => {
    setForm({
      id,
      fornecedor,
      situacao,
      razao_social,
      nome_fantasia,
      cnpj,
      ie,
      nif,
      duns,
      id_ramoatividade,
      estrangeira,
      estrangeiro,
      nacional,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, situacao, razao_social, nome_fantasia, cnpj, ie, nif, duns, fornecedor,
    id_ramoatividade, estrangeira, estrangeiro, nacional, alt_dhsis, props.user.id, props.autoCompletarRamoatividade]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Jurídica"
        subtitle="/ Dados comerciais"
        voltar
        linkTo="/cadastro/pessoa-juridica"
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_1="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card className="comercial-ficha">
            <CardBody>
              <Row>
                {/*** ID ***/}
                <Col sm={3} md={2} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>
                {/*** FORNECEDOR ***/}
                <Col sm={3} md={6} lg={8} xl={8}>
                  <FormGroup className="text-right">
                    <Label>Fornecedor</Label>
                    <Checkbox
                      checked={fornecedor}
                      info="Sim"
                      onClick={(e) => setFornecedor(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
                {/*** ESTRANGEIRA ***/}
                <Col sm={3} md={2} lg={1} xl={1}>
                  <FormGroup className="text-right">
                    <Label>Estrangeira</Label>
                    <Checkbox
                      checked={estrangeira}
                      onClick={(e) => handleEstrangeira(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
                {/*** SITUACAO ***/}
                <Col sm={3} md={2} lg={1} xl={1}>
                  <FormGroup className="text-right">
                    <Label>Situação</Label>
                    <Checkbox
                      info="Ativo"
                      checked={situacao}
                      onClick={(e) => setSituacao(e.target.checked)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** RAZAO SOCIAL ***/}
                <Col sm={12} md={6} lg={6} xl={6}>
                  <FormGroup>
                    <Label>Razão Social</Label>
                    <Input
                      type="text"
                      className="required"
                      maxLength={60}
                      value={razao_social}
                      onChange={(e) => setRazao_social(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NOME FANTASIA ***/}
                <Col sm={12} md={6} lg={6} xl={6}>
                  <FormGroup>
                    <Label>Nome Fantasia</Label>
                    <Input
                      type="text"
                      className="required"
                      maxLength={30}
                      value={nome_fantasia}
                      onChange={(e) => setNome_fantasia(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** CNPJ ***/}
                <Col sm={6} md={4} lg={4} xl={4} className={nacional}>
                  <FormGroup>
                    <Label>CNPJ</Label>
                    <Input
                      type="text"
                      value={cnpj}
                      onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                      maxLength={18}
                    />
                  </FormGroup>
                </Col>
                {/*** IE ***/}
                <Col sm={6} md={4} lg={4} xl={4} className={nacional}>
                  <FormGroup>
                    <Label>Inscrição Estadual</Label>
                    <Input
                      type="text"
                      maxLength={15}
                      value={ie}
                      onChange={(e) => setIe(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NIF ***/}
                <Col sm={6} md={4} lg={4} xl={4} className={estrangeiro}>
                  <FormGroup>
                    <Label>NIF</Label>
                    <Input
                      type="text"
                      maxLength={20}
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      onChangeCapture={(e) => handleEstrangeira(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DUNS ***/}
                <Col sm={6} md={4} lg={4} xl={4} className={estrangeiro}>
                  <FormGroup>
                    <Label>DUNS</Label>
                    <Input
                      type="text"
                      maxLength={20}
                      value={duns}
                      onChange={(e) => setDuns(e.target.value)}
                      onChangeCapture={(e) => handleEstrangeira(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** RAMO ATIVIDADE ***/}
                <Col sm={12} md={4} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Ramo Atividade</Label>
                    <AutoCompletarV2
                      {...props}
                      value={ramoatividade}
                      valueId={id_ramoatividade}
                      tabela="RAMOATIVIDADE"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: ramoatividade, valueId: id_ramoatividade }}
                    />
                  </FormGroup>
                </Col>
                {/*** DHSIS ***/}
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
                <SaveButton save={() => savePJuridicaComercial(props, form)} />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({

  formatCNPJ: state.sistema.formatCNPJ,
  comercialFichaData: state.pJuridica.comercialFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
  autoCompletarId_Ramoatividade: state.autoCompletar.autoCompletarId_Ramoatividade,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaDadosComerciais);
