///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';

import {
  SaveButton, PageTitle, MenuPFisica, CardHeaderName,
} from '../../../../components';
import { getPFisicaRContatoFicha, savePFisicaRContato, getPFisicaPessoalFicha } from '../../../../functions/cadastro/pessoa-fisica';
import { getDados, newFormatCelular, formatDataInput } from '../../../../functions/sistema';

function FichaContato(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);
  const [tipo, setTipo] = useState('');
  const [tipoRContato, setTipoRContato] = useState([]);
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [form, setForm] = useState({});

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const ID_RContato = props.match.params.idRContato;
      setId_pfisica(id);
      getDados(props, `/TsmPFISICA/PESSOAL_FICHA/${id}`, '@GET_PFISICA_PESSOAL_FICHA');
      getDados(props, '/TsmSISTEMA/TIPO_CONTATO_TABELA/', '@GET_TIPO_RCONTATO');
      getPFisicaPessoalFicha(props, id);
      if (id > 0) { getPFisicaRContatoFicha(props, ID_RContato); }
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

  //EDITAR
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

  //lista TIPO
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
        title="Pessoa Física"
        subtitle="/ Cadastrar Contato"
        voltar
        history={props.history}
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_3="active" />
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
                    <Label>Endereço</Label>
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
                    <Label>Descrição</Label>
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
                <SaveButton save={() => savePFisicaRContato(props, form)} />
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
  rcontatoFichaData: state.pFisica.rcontatoFichaData,
  pessoalFichaData: state.pFisica.pessoalFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
  tipoRContato: state.sistema.tipoRContato,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaContato);
