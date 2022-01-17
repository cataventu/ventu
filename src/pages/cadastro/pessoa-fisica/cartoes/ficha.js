///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, AutoCompletarV2, CardHeaderName, MenuPFisica,
} from '../../../../components';
import { getPFisicaRCartaoFicha, getPFisicaPessoalFicha, savePFisicaRCartao } from '../../../../functions/cadastro/pessoa-fisica';
import {
  getDados, formatValidade, formatDataInput,
} from '../../../../functions/sistema';

function FichaRCartao(props) {
  const hoje = moment().format('L');
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);
  const [nome, setNome] = useState('');
  const [titular, setTitular] = useState('');
  const [numero, setNumero] = useState('');
  const [id_cartao, setId_cartao] = useState(0);
  const [tipo_cartao, setTipo_cartao] = useState('');
  const [cartao, setCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [seguranca, setSeguranca] = useState('');
  const [senha, setSenha] = useState('');

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const id_Cartao = props.match.params.idRCartao;
      setId_pfisica(id);
      getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${id}`, '@GET_PFISICA_PESSOAL_FICHA');
      getDados(props, '/TsmSISTEMA/TIPO_CARTAO_TABELA/', '@GET_TIPO_CARTAO');
      getPFisicaRCartaoFicha(props, id_Cartao);
      getPFisicaPessoalFicha(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, nome, titular, numero, id_cartao,
      tipo_cartao, cartao, validade, seguranca, senha, alt_dhsis,
    } = props.rcartaoFichaData;
    if (id > 0) {
      setId(id);
      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);
      setId_cartao(id_cartao);
      setNumero(numero);
      setCartao(cartao);
      setTipo_cartao(tipo_cartao);
      setNome(nome);
      setTitular(titular);
      setSeguranca(seguranca);
      setSenha(senha);
      setValidade(validade);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.rcartaoFichaData]);
  //campo AC
  useEffect(() => {
    setId_cartao(props.autoCompletarId_TipoCartao);
  }, [props.autoCompletarId_TipoCartao]);

  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pjuridica,
      id_cartao,
      cartao,
      numero,
      nome,
      titular,
      tipo_cartao,
      seguranca,
      senha,
      validade,
      //validade,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pfisica, id_pjuridica, id_cartao, cartao, nome, titular, numero, alt_dhsis,
    tipo_cartao, seguranca, senha, validade, props.user.id, props.autoCompletarId_TipoCartao]);
  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Física"
        subtitle="/ Cadastrar Cartão"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_9="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">

          <Card>
            <CardBody className="pb-1">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.pessoalFichaData.nome_completo} />
              <Row>
                {/*** ID ***/}
                <Col sm={3} md={3} lg={2} xl={2} className="hide">
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>
                {/*** CARTAO ** */}
                <Col sm={6} md={6} lg={5} xl={5}>
                  <FormGroup>
                    <Label>Cartão</Label>
                    <AutoCompletarV2
                      {...props}
                      value={cartao}
                      valueId={id_cartao}
                      tabela="TIPOCARTAO"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: cartao, valueId: id_cartao }}
                    />
                  </FormGroup>
                </Col>
                {/*** TIPO CARTAO ***/}
                <Col sm={0} md={0} lg={0} xl={0} className="hide">
                  <FormGroup>
                    <Label>Tipo Cartão</Label>
                    <Input
                      type="text"
                      disabled
                      value={tipo_cartao}
                    />
                  </FormGroup>
                </Col>
                {/*** TITULAR ***/}
                <Col sm={6} md={6} lg={7} xl={7}>
                  <FormGroup>
                    <Label>Titular</Label>
                    <Input
                      type="text"
                      value={titular}
                      className="required"
                      maxLength={60}
                      onChange={(e) => setTitular(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** NUMERO ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      type="text"
                      value={numero}
                      className="required"
                      maxLength={20}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** VALIDADE ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Data Validade</Label>
                    <Input
                      type="text"
                      value={validade}
                      maxLength={5}
                      onChange={(e) => setValidade(formatValidade(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** SEGURANCA ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Segurança</Label>
                    <Input
                      type="text"
                      value={seguranca}
                      maxLength={100}
                      onChange={(e) => setSeguranca(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** SENHA ***/}
                <Col sm={6} md={6} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Senha</Label>
                    <Input
                      type="text"
                      value={senha}
                      maxLength={100}
                      onChange={(e) => setSenha(e.target.value)}
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
                {/*** SAVE ***/}
                <SaveButton save={() => savePFisicaRCartao(props, form)} />
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
  pessoalFichaData: state.pFisica.pessoalFichaData,
  rcartaoFichaData: state.pFisica.rcartaoFichaData,
  autoCompletarId_TipoCartao: state.autoCompletar.autoCompletarId_TipoCartao,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaRCartao);
