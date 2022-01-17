///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, MenuPJuridica, AutoCompletarV2, CardHeaderName,
} from '../../../../components';
import {
  getPJuridicaREnderecoFicha, getPJuridicaComercialFicha,
  savePJuridicaREndereco,
} from '../../../../functions/cadastro/pessoa-juridica';
import { formatCEP, getDados, formatDataInput } from '../../../../functions/sistema';
//import { comercialFichaData } from "../../../../redux/initials/cadastro/pfisica";

function FichaEndereco(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);

  const [tipo, setTipo] = useState('');
  const [tipo_end, setTipo_end] = useState([]);

  const [identificacao, setIdentificacao] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [id_municipio, setId_municipio] = useState(0);
  const [municipio, setMunicipio] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const ID_REndereco = props.match.params.idREndereco;
      setId_pjuridica(id);

      getDados(props, '/TsmSISTEMA/TIPO_ENDERECOPJ_TABELA/', '@GET_TIPO_RENDERECO_PJ');
      getPJuridicaComercialFicha(props, id);
      getPJuridicaREnderecoFicha(props, ID_REndereco);

      setFirst(false);
    }
  }, [props, props.autoCompletarId_Municipio, firstLoad]);

  //editar
  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, tipo, identificacao, cep, logradouro, endereco, numero,
      complemento, bairro, id_municipio, municipio, alt_dhsis,
    } = props.renderecoFichaData;

    if (id > 0) {
      setId(id);

      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);

      setTipo(tipo);
      setIdentificacao(identificacao);
      setCep(cep);
      setLogradouro(logradouro);
      setEndereco(endereco);
      setNumero(numero);
      setComplemento(complemento);
      setBairro(bairro);
      setId_municipio(id_municipio);
      setMunicipio(municipio);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.renderecoFichaData]);

  //lista TIPO
  useEffect(() => {
    const arrayTipo_end = [];
    props.tipo_REnderecoPJ.forEach((item) => {
      arrayTipo_end.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setTipo_end(arrayTipo_end);
  }, [props.tipo_REnderecoPJ]);

  //campo AC
  useEffect(() => {
    setId_municipio(props.autoCompletarId_Municipio);
  }, [props.autoCompletarId_Municipio]);

  //form
  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pjuridica,
      tipo,
      identificacao,
      cep,
      logradouro,
      endereco,
      numero,
      complemento,
      bairro,
      id_municipio,
      municipio,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, id_pfisica, id_pjuridica, tipo, identificacao, cep, logradouro, endereco, numero,
    complemento, bairro, id_municipio, municipio, alt_dhsis, props.user.id, props.autoCompletarMunicipio]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Jurídica"
        subtitle="/ Cadastrar Endereço"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_2="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              <CardHeaderName {...props} titulo={props.comercialFichaData.razao_social} />
              <Row>
                {/*** ID ***/}
                <Col sm={0} md={0} lg={0} xl={0} className="hide">
                  <FormGroup>
                    <Label>Id</Label>
                    <Input
                      type="text"
                      disabled
                      value={id}
                    />
                  </FormGroup>
                </Col>
                {/*** TIPO ***/}
                <Col sm={4} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Tipo</Label>
                    <Input
                      type="select"
                      className="required"
                      value={tipo}
                      dados={props.tipo_REnderecoPJ}
                      config={props}
                      action="@GET_TIPO_RENDERECO_PJ"
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { tipo_end }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** IDENTIFICACAO ***/}
                <Col sm={8} md={8} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Identificação</Label>
                    <Input
                      type="text"
                      maxLength={30}
                      value={identificacao}
                      onChange={(e) => setIdentificacao(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/*** CEP ***/}
                <Col sm={6} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>CEP</Label>
                    <Input
                      type="text"
                      value={cep}
                      maxLength={9}
                      onChange={(e) => setCep(formatCEP(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** LOUGRADOURO ***/}
                <Col sm={6} md={2} lg={1} xl={1}>
                  <FormGroup>
                    <Label>Logradouro</Label>
                    <Input
                      type="text"
                      value={logradouro}
                      maxLength={3}
                      onChange={(e) => setLogradouro(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** ENDERECO ***/}
                <Col sm={8} md={6} lg={7} xl={7}>
                  <FormGroup>
                    <Label>Endereço</Label>
                    <Input
                      type="text"
                      value={endereco}
                      maxLength={50}
                      className="required"
                      onChange={(e) => setEndereco(e.target.value)}

                    />
                  </FormGroup>
                </Col>
                {/*** NUMERO ***/}
                <Col sm={4} md={2} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      type="number"
                      value={numero}
                      maxLength={10}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** COMPLEMENTO ***/}
                <Col sm={12} md={10} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Complemento</Label>
                    <Input
                      type="text"
                      value={complemento}
                      maxLength={30}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** BAIRRO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Bairro</Label>
                    <Input
                      type="text"
                      value={bairro}
                      maxLength={30}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** MUNICIPIO ***/}
                <Col sm={6} md={6} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Município</Label>
                    <AutoCompletarV2
                      {...props}
                      value={municipio}
                      valueId={id_municipio}
                      tabela="MUNICIPIO"
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: municipio, valueId: id_municipio }}
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
                <SaveButton save={() => savePJuridicaREndereco(props, form)} />
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
  comercialFichaData: state.pJuridica.comercialFichaData,
  renderecoFichaData: state.pJuridica.renderecoFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  tipo_REnderecoPJ: state.sistema.tipo_REnderecoPJ,
  autoCompletarId_Municipio: state.autoCompletar.autoCompletarId_Municipio,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaEndereco);
