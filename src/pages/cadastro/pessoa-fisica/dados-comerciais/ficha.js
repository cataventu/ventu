///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  PageTitle, SaveButton, AutoCompletarV2, CardHeaderName, MenuPFisica,
} from '../../../../components';
import { getPFisicaComercialFicha, savePFisicaComercial } from '../../../../functions/cadastro/pessoa-fisica';
import { formatDataInput } from '../../../../functions/sistema';

function FichaDadosComerciais(props) {
  const [id, setId] = useState(0);
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [id_profissao, setId_Profissao] = useState(0);
  const [pjuridica, setPjuridica] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cargo, setCargo] = useState('');
  const [codempresa, setCodempresa] = useState('');
  const [area, setArea] = useState('');
  const [complemento, setComplemento] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const { dispatch } = props;
      dispatch({ type: '@RESET_PFISICA_COMERCIAL_FICHA' });
      if (id > 0) { getPFisicaComercialFicha(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, id_pjuridica, id_profissao, pjuridica, profissao, cargo, area, codempresa, complemento, alt_dhsis,
    } = props.comercialFichaData;

    if (id > 0) {
      setId(id);
      setId_Pjuridica(id_pjuridica);
      setId_Profissao(id_profissao);
      setPjuridica(pjuridica);
      setProfissao(profissao);
      setCargo(cargo);
      setArea(area);
      setCodempresa(codempresa);
      setComplemento(complemento);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.comercialFichaData]);

  //campo AC
  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

  useEffect(() => {
    setId_Profissao(props.autoCompletarId_Profissao);
  }, [props.autoCompletarId_Profissao]);

  /// salvar
  useEffect(() => {
    setForm({
      id,
      id_pjuridica,
      id_profissao,
      cargo,
      area,
      codempresa,
      complemento,
      fornecedor: props.fornecedorFlag,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pjuridica, id_profissao, cargo, area, codempresa, complemento, alt_dhsis, props.user.id, props.fornecedorFlag]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Dados Comerciais"
        voltar
        linkTo="/cadastro/pessoa-fisica"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_2="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.comercialFichaData.nome} />

              <Row>
                {/*** EMPRESA ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Empresa</Label>
                    <AutoCompletarV2
                      {...props}
                      value={pjuridica}
                      valueId={id_pjuridica}
                      tabela="PJURIDICA"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: pjuridica, valueId: id_pjuridica }}
                    />
                  </FormGroup>
                </Col>
                {/*** PROFISSAO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Profissão</Label>
                    <AutoCompletarV2
                      {...props}
                      value={profissao}
                      valueId={id_profissao}
                      tabela="PROFISSAO"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: profissao, valueId: id_profissao }}
                    />
                  </FormGroup>
                </Col>
                {/*** CARGO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Cargo</Label>
                    <Input
                      type="text"
                      value={cargo}
                      maxLength={40}
                      onChange={(e) => setCargo(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** AREA ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Área</Label>
                    <Input
                      type="text"
                      value={area}
                      maxLength={40}
                      onChange={(e) => setArea(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** CODIGO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Código</Label>
                    <Input
                      type="text"
                      value={codempresa}
                      maxLength={10}
                      onChange={(e) => setCodempresa(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** COMPLEMENTO ***/}
                <Col sm={9} md={9} lg={6} xl={6}>
                  <FormGroup>
                    <Label>Complemento</Label>
                    <Input
                      type="text"
                      value={complemento}
                      maxLength={40}
                      onChange={(e) => setComplemento(e.target.value)}

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
                <SaveButton save={() => savePFisicaComercial(props, form)} />
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
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  fornecedorFlag: state.pFisica.fornecedorFlag,
  comercialFichaData: state.pFisica.comercialFichaData,

  autoCompletarId_Profissao: state.autoCompletar.autoCompletarId_Profissao,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaDadosComerciais);
