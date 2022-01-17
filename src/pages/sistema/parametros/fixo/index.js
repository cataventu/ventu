///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import { PageTitle, SaveButton, MenuParametros } from '../../../../components';
import { getParametrosFixoFicha, saveParametrosFixo } from '../../../../functions/sistema/parametros';
import { formatDataInput } from '../../../../functions/sistema';

function FichaFixo(props) {
  const [firstLoad, setFirst] = useState(true);

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id, setId] = useState(0);

  const [ano, setAno] = useState(0);
  const [mes, setMes] = useState(0);

  const [form, setForm] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      //if( id > 0 ) {
      getParametrosFixoFicha(props, id);
      //}
      setFirst(false);
    }
  }, [props, firstLoad]);

  /// EDITAR
  useEffect(() => {
    const {
      id, ano, mes, alt_dhsis,
    } = props.fixoFichaData;

    //if( id > 0 ) {
    setId(id);
    setAno(ano);
    setMes(mes);
    setAlt_dhsis(alt_dhsis);

    //}
  }, [props.fixoFichaData]);

  /// salvar
  useEffect(() => {
    setForm({
      id,
      mes,
      ano,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, mes, ano, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Parâmetros"
        subtitle="/ Fixo"
        voltar={false}
        //linkTo="/sistema/parametros/"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuParametros {...props} item_1="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card className="fixo-ficha">
            <CardBody>
              <Row>
                {/*** ID ***/}
                {/*<Col sm={3} md={3} lg={2} xl={2}>
                        <FormGroup>
                          <Label >Id......</Label>
                          <Input type="text"
                                  disabled
                                  value={id}
                              />
                        </FormGroup>
                      </Col>  */}
                {/*** MES ***/}
                <Col sm={4} md={4} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Mês</Label>
                    <Input
                      type="select"
                      value={mes}
                      onChange={(e) => setMes(e.target.value)}
                    >
                      <option value={0}>Selecione...</option>
                      <option value={1}>JANEIRO</option>
                      <option value={2}>FEVEREIRO</option>
                      <option value={3}>MARÇO</option>
                      <option value={4}>ABRIL</option>
                      <option value={5}>MAIO</option>
                      <option value={6}>JUNHO</option>
                      <option value={7}>JULHO</option>
                      <option value={8}>AGOSTO</option>
                      <option value={9}>SETEMBRO</option>
                      <option value={10}>OUTUBRO</option>
                      <option value={11}>NOVEMBRO</option>
                      <option value={12}>DEZEMBRO</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/*** ANO ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Ano</Label>
                    <Input
                      type="text"
                      maxLength={4}
                      value={ano}
                      onChange={(e) => setAno(e.target.value)}
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

                <SaveButton save={() => saveParametrosFixo(props, form)} />
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

  fixoFichaData: state.parametros.fixoFichaData,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  visibilityPageSistema: state.usuario.visibilityPageSistema,
});
export default connect(() => (mapState))(FichaFixo);
