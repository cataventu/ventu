///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, MenuPJuridica, CardHeaderName,
} from '../../../../components';
import { getPJuridicaRContatoFicha, savePJuridicaRContato, getPJuridicaComercialFicha } from '../../../../functions/cadastro/pessoa-juridica';
import { getDados, formatDataInput, newFormatCelular } from '../../../../functions/sistema';

function FichaContato(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);

  const [tipo, setTipo] = useState('');
  const [tipoRContato, setTipoRContato] = useState([]);

  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const ID_RContato = props.match.params.idRContato;
      setId_pjuridica(id);
      getPJuridicaComercialFicha(props, id);
      getDados(props, '/TsmSISTEMA/TIPO_CONTATO_TABELA/', '@GET_TIPO_RCONTATO');
      if (id > 0) { getPJuridicaRContatoFicha(props, ID_RContato); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  const handleEndereco = useCallback((value) => {
    if (tipo === '1' || tipo === '2' || tipo === 1 || tipo === 2) {
      setEndereco(newFormatCelular(value));
    } else {
      setEndereco(value);
    }
  }, [tipo]);

  useEffect(() => {
    const {
      id, id_pfisica, id_pjuridica, tipo, endereco, descricao, alt_dhsis,
    } = props.rcontatoFichaData;
    if (id > 0) {
      setId(id);
      setId_pfisica(id_pfisica);
      setId_pjuridica(id_pjuridica);
      setTipo(tipo);
      setEndereco(endereco);
      setDescricao(descricao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.rcontatoFichaData]);

  useEffect(() => {
    const arrayTipoRContato = [];
    props.tipoRContato.forEach((item) => {
      arrayTipoRContato.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setTipoRContato(arrayTipoRContato);
  }, [props.tipoRContato]);

  useEffect(() => {
    setForm({
      id,
      id_pfisica,
      id_pjuridica,
      tipo,
      endereco,
      descricao,

      inc_usuario: props.user.id,
      alt_usuario: props.user.id,

      alt_dhsis,
    });
  }, [id, id_pfisica, id_pjuridica, tipo, endereco, descricao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        title="Pessoa Jur??dica"
        subtitle="/ Cadastrar Contato"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_3="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">

          <Card>
            <CardBody className="pb-1">
              <CardHeaderName {...props} titulo={props.comercialFichaData.razao_social} />
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
                {/*** TIPO ***/}
                <Col sm={6} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Tipo</Label>
                    <Input
                      type="select"
                      className="required"
                      value={tipo}
                      dados={props.tipoRContato}
                      config={props}
                      action="@GET_TIPO_RCONTATO"
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { tipoRContato }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** ENDERECO ***/}
                <Col sm={6} md={4} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Endere??o</Label>
                    <Input
                      type="text"
                      value={endereco}
                      className="required"
                      maxLength={100}
                      onChange={(e) => handleEndereco(e.target.value)}
                    />

                  </FormGroup>
                </Col>
                {/*** DESCRICAO ***/}
                <Col sm={12} md={5} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Descri????o</Label>
                    <Input
                      type="text"
                      value={descricao}
                      maxLength={60}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** DHSIS ***/}
                <Col sm={12} className="hide">
                  <small>
                    <span className="pr-3 text-black">Atualiza????o:</span>
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
                <SaveButton save={() => savePJuridicaRContato(props, form)} />
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
  rcontatoFichaData: state.pJuridica.rcontatoFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
  tipoRContato: state.sistema.tipoRContato,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaContato);
