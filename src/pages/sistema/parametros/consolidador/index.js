///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import { hideSidebar } from '../../../../redux/actions/sidebarActions';
import {
  AutoCompletarWOO, AutoCompletarRFA, MenuParametros, SaveButton, PageTitle,
} from '../../../../components';
import { getParametrosConsolidadorFicha, saveParametrosConsolidador } from '../../../../functions/sistema/parametros';
import { formatDataInput } from '../../../../functions/sistema';

function FichaConsolidador(props) {
  const dispatch = useDispatch();

  const {
    AC_RFA_Id_Pfisica,
    AC_RFA_Id_Pjuridica,
    AC_WOO_Id_Pfisica,
    AC_WOO_Id_Pjuridica,
  } = props;

  useEffect(() => {
    dispatch(hideSidebar());
  }, [dispatch]);
  const [firstLoad, setFirst] = useState(true);

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id, setId] = useState(0);

  //ReservaFácil
  const [rfa_pessoa, setRfa_pessoa] = useState(0);
  const [rfa_id_pfisica, setRfa_id_pfisica] = useState(0);
  const [rfa_id_pjuridica, setRfa_id_pjuridica] = useState(0);
  const [rfa_pfisica, setRfa_pfisica] = useState('');
  const [rfa_pjuridica, setRfa_pjuridica] = useState('');

  //KG Travel
  const [woo_pessoa, setWoo_pessoa] = useState(0);
  const [woo_id_pfisica, setWoo_id_pfisica] = useState(0);
  const [woo_id_pjuridica, setWoo_id_pjuridica] = useState(0);
  const [woo_pfisica, setWoo_pfisica] = useState('');
  const [woo_pjuridica, setWoo_pjuridica] = useState('');

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getParametrosConsolidadorFicha(props, id);

      setFirst(false);
    }
  }, [props, firstLoad, props.dispatch, props.sidebar]);

  /// EDITAR
  useEffect(() => {
    const {
      id, rfa_pessoa, rfa_pfisica, rfa_pjuridica, rfa_id_pfisica, rfa_id_pjuridica, rfa_nome_pessoa,
      woo_pessoa, woo_pfisica, woo_pjuridica, woo_id_pfisica, woo_id_pjuridica, woo_nome_pessoa, alt_dhsis,
    } = props.consolidadorFichaData;

    if (id > 0) {
      setId(id);

      //ReservaFacil contato
      setRfa_pessoa(rfa_pessoa);
      setRfa_pfisica(rfa_pfisica);
      setRfa_pjuridica(rfa_pjuridica);

      if (rfa_pessoa === 1) { setRfa_pfisica(rfa_nome_pessoa); }
      if (rfa_pessoa === 2) { setRfa_pjuridica(rfa_nome_pessoa); }

      setRfa_id_pfisica(rfa_id_pfisica);
      setRfa_id_pjuridica(rfa_id_pjuridica);

      //KG travel contato
      setWoo_pessoa(woo_pessoa);
      setWoo_pfisica(woo_pfisica);
      setWoo_pjuridica(woo_pjuridica);

      if (woo_pessoa === 1) { setWoo_pfisica(woo_nome_pessoa); }
      if (woo_pessoa === 2) { setWoo_pjuridica(woo_nome_pessoa); }

      setWoo_id_pfisica(woo_id_pfisica);
      setWoo_id_pjuridica(woo_id_pjuridica);

      setAlt_dhsis(alt_dhsis);
    }
  }, [props.consolidadorFichaData]);

  /// RFA
  useEffect(() => {
    switch (rfa_pessoa) {
      case '1':
        setRfa_id_pjuridica(0);
        setRfa_id_pfisica(AC_RFA_Id_Pfisica);
        break;
      case '2':
        setRfa_id_pfisica(0);
        setRfa_id_pjuridica(AC_RFA_Id_Pjuridica);
        break;
      default:
    }
  }, [rfa_pessoa, AC_RFA_Id_Pfisica, AC_RFA_Id_Pjuridica]);

  /// WOO
  useEffect(() => {
    switch (woo_pessoa) {
      case '1':
        setWoo_id_pjuridica(0);
        setWoo_id_pfisica(AC_WOO_Id_Pfisica);
        break;
      case '2':
        setWoo_id_pfisica(0);
        setWoo_id_pjuridica(AC_WOO_Id_Pjuridica);
        break;
      default:
    }
  }, [woo_pessoa, AC_WOO_Id_Pjuridica, AC_WOO_Id_Pfisica]);

  /// salvar
  useEffect(() => {
    setForm({
      rfa_pessoa,
      rfa_id_pfisica,
      rfa_id_pjuridica,

      woo_pessoa,
      woo_id_pfisica,
      woo_id_pjuridica,

      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [rfa_pessoa, rfa_id_pfisica, rfa_id_pjuridica, woo_pessoa, woo_id_pfisica, woo_id_pjuridica, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Parâmetros"
        subtitle="/ Consolidador"
        voltar={false}
      />
      <Row>
        {/*** menuParametros ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuParametros {...props} item_3="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card className="consolidador-ficha">
            <CardBody>

              {/*** LINHA 01 ***/}
              <Row>
                {/*** RESERVA FACIL ***/}
                <Col sm={12}>
                  <FormGroup>
                    <Label className="h5 text-roxo-ventu">Reserva Fácil</Label>
                  </FormGroup>
                </Col>

                {/*** PESSOA ***/}
                <Col sm={4} md={4} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Pessoa</Label>
                    <Input
                      type="select"
                      className="required"
                      value={rfa_pessoa}
                      config={props}
                      onChange={(e) => setRfa_pessoa(e.target.value)}
                    >
                      <option value="0">Selecione...</option>
                      <option value="1">FÍSICA</option>
                      <option value="2">JURÍDICA</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/*** CONTATO ***/}
                <Col sm={8} md={8} lg={5} xl={5}>
                  <FormGroup>
                    <Label>Contato</Label>
                    <AutoCompletarRFA
                      {...props}
                      rfa_pessoa={rfa_pessoa}
                      editar={{
                        id,
                        rfa_pfisica: { id: rfa_id_pfisica, descricao: rfa_pfisica },
                        rfa_pjuridica: { id: rfa_id_pjuridica, descricao: rfa_pjuridica },
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/*** QUEBRA LINHA ***/}
              <Row>
                <Col sm={12}><hr /></Col>
              </Row>

              {/*** LINHA 02 ***/}
              <Row>
                {/*** RESERVA FACIL ***/}
                <Col sm={12}>
                  <FormGroup>
                    <Label className="h5 text-roxo-ventu">KG Travel</Label>
                  </FormGroup>
                </Col>

                {/*** PESSOA ***/}
                <Col sm={4} md={4} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Pessoa</Label>
                    <Input
                      type="select"
                      className="required"
                      value={woo_pessoa}
                      config={props}
                      onChange={(e) => setWoo_pessoa(e.target.value)}
                    >
                      <option value="0">Selecione...</option>
                      <option value="1">FÍSICA</option>
                      <option value="2">JURÍDICA</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/*** CONTATO ***/}
                <Col sm={8} md={8} lg={5} xl={5}>
                  <FormGroup>
                    <Label>Contato</Label>
                    <AutoCompletarWOO
                      {...props}
                      woo_pessoa={woo_pessoa}
                      editar={{
                        id,
                        woo_pfisica: { id: woo_id_pfisica, descricao: woo_pfisica },
                        woo_pjuridica: { id: woo_id_pjuridica, descricao: woo_pjuridica },
                      }}
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
              </Row>

              {/*** SAVE ***/}
              <Row>
                <SaveButton save={() => saveParametrosConsolidador(props, form)} />
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

  consolidadorFichaData: state.parametros.consolidadorFichaData,

  AC_RFA_Id_Pfisica: state.autoCompletar.autoCompletarRfa_Id_Pfisica,
  AC_RFA_Id_Pjuridica: state.autoCompletar.autoCompletarRfa_Id_Pjuridica,

  AC_WOO_Id_Pfisica: state.autoCompletar.autoCompletarWoo_Id_Pfisica,
  AC_WOO_Id_Pjuridica: state.autoCompletar.autoCompletarWoo_Id_Pjuridica,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  visibilityPageSistema: state.usuario.visibilityPageSistema,
});
export default connect(() => (mapState))(FichaConsolidador);
