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
import { getDados, newFormatCelular, formatDataInput } from '../../../../functions/sistema';
import { getPFisicaEmergenciaFicha, savePFisicaEmergencia } from '../../../../functions/cadastro/pessoa-fisica';

function FichaEmergencia(props) {
  const hoje = moment().format('L');
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [eme_nome, setEme_nome] = useState('');
  const [eme_parentesco, setEme_parentesco] = useState(0);
  const [eme_par_outros, setEme_par_outros] = useState('');
  const [outrosHide, setOutrosHide] = useState('hide');
  const [eme_ntelefone1, setEme_ntelefone1] = useState('');
  const [eme_dtelefone1, setEme_dtelefone1] = useState('');
  const [eme_ntelefone2, setEme_ntelefone2] = useState('');
  const [eme_dtelefone2, setEme_dtelefone2] = useState('');
  const [eme_observacao, setEme_observacao] = useState('');
  const [parentesco, setParentesco] = useState([]);
  const [form, setForm] = useState({});
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const handleParentesco = useCallback((value) => {
    if (value === 6 || value === '6') {
      setOutrosHide('show');
    } else {
      setOutrosHide('hide');
    }
  }, []);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getDados(props, '/TsmSISTEMA/PARENTESCO_TABELA/', '@GET_PARENTESCO');
      if (id > 0) { getPFisicaEmergenciaFicha(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    handleParentesco(eme_parentesco);
  }, [eme_parentesco, handleParentesco]);

  //LISTA
  useEffect(() => {
    const arrayParentesco = [];
    props.parentesco.forEach((item) => {
      arrayParentesco.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setParentesco(arrayParentesco);
  }, [props.parentesco]);

  //EDITAR
  useEffect(() => {
    const {
      id, eme_nome, eme_parentesco, eme_par_outros,
      eme_ntelefone1, eme_dtelefone1, eme_ntelefone2, eme_dtelefone2, eme_observacao, alt_dhsis,
    } = props.emergenciaFichaData;
    if (id > 0) {
      setId(id);
      setEme_nome(eme_nome);
      setEme_parentesco(eme_parentesco);
      setEme_par_outros(eme_par_outros);
      setEme_ntelefone1(eme_ntelefone1);
      setEme_dtelefone1(eme_dtelefone1);
      setEme_ntelefone2(eme_ntelefone2);
      setEme_dtelefone2(eme_dtelefone2);
      setEme_observacao(eme_observacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.emergenciaFichaData]);

  useEffect(() => {
    setForm({
      id,
      eme_nome,
      eme_parentesco,
      eme_par_outros,
      eme_ntelefone1,
      eme_dtelefone1,
      eme_ntelefone2,
      eme_dtelefone2,
      eme_observacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, eme_nome, eme_parentesco, eme_par_outros,
    eme_ntelefone1, eme_dtelefone1, eme_ntelefone2, eme_dtelefone2, eme_observacao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Emergência"
        voltar
        linkTo="/cadastro/pessoa-fisica"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_6="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10}>
          <Card>
            <CardBody className="pb-0">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.emergenciaFichaData.nome} />
              <Row>
                {/*** NOME ***/}
                <Col sm={12} md={5} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      value={eme_nome}
                      maxLength={60}
                      onChange={(e) => setEme_nome(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** PARENTESCO ***/}
                <Col sm={6} md={3} lg={4} xl={4}>
                  <FormGroup>
                    <Label>Parentesco</Label>
                    <Input
                      type="select"
                      value={eme_parentesco}
                      dados={props.parentesco}
                      config={props}
                      action="@GET_PARENTESCO"
                      onChange={(e) => setEme_parentesco(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { parentesco }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** OUTROS ***/}
                <Col sm={6} md={4} lg={4} xl={4} className={outrosHide}>
                  <FormGroup>
                    <Label>&nbsp;</Label>
                    <Input
                      type="text"
                      value={eme_par_outros}
                      maxLength={30}
                      onChange={(e) => setEme_par_outros(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** TELEFONE 1 ***/}
                <Col sm={6} md={3} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Telefone 1</Label>
                    <Input
                      type="text"
                      value={eme_ntelefone1}
                      maxLength={16}
                      onChange={(e) => setEme_ntelefone1(newFormatCelular(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** DESCRICAO TELEFONE 1 ***/}
                <Col sm={6} md={3} lg={3} xl={3}>
                  <FormGroup>
                    <Label>&nbsp;</Label>
                    <Input
                      type="text"
                      value={eme_dtelefone1}
                      maxLength={20}
                      onChange={(e) => setEme_dtelefone1(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** TELEFONE 2 ***/}
                <Col sm={6} md={3} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Telefone 2</Label>
                    <Input
                      type="text"
                      value={eme_ntelefone2}
                      maxLength={16}
                      onChange={(e) => setEme_ntelefone2(newFormatCelular(e.target.value))}
                    />
                  </FormGroup>
                </Col>
                {/*** DESCRICAO TELEFONE 2 ***/}
                <Col sm={6} md={3} lg={3} xl={3}>
                  <FormGroup>
                    <Label>&nbsp;</Label>
                    <Input
                      type="text"
                      value={eme_dtelefone2}
                      maxLength={20}
                      onChange={(e) => setEme_dtelefone2(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** OBSERVACAO ***/}
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Label>Observação</Label>
                    <Input
                      type="textarea"
                      value={eme_observacao}
                      placeholder="Digite suas observações"
                      onChange={(e) => setEme_observacao(e.target.value)}
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
                <SaveButton save={() => savePFisicaEmergencia(props, form)} />
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

  emergenciaFichaData: state.pFisica.emergenciaFichaData,
  parentesco: state.sistema.parentesco,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaEmergencia);
