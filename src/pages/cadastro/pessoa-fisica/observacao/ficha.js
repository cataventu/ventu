///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import { getPFisicaObservacao, savePFisicaObservacao } from '../../../../functions/cadastro/pessoa-fisica';
import {
  SaveButton, PageTitle, MenuPFisica, CardHeaderName,
} from '../../../../components';
import { formatDataInput } from '../../../../functions/sistema';

function FichaObservacao(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [observacao, setObservacao] = useState('');
  const [form, setForm] = useState({});
  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      if (id > 0) { getPFisicaObservacao(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const { id, observacao, alt_dhsis } = props.observacaoFichaData;
    if (id > 0) {
      setId(id);
      setObservacao(observacao);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.observacaoFichaData]);

  useEffect(() => {
    setForm({
      id,
      observacao,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, observacao, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Observação"
        voltar
        linkTo="/cadastro/pessoa-fisica"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_12="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10}>
          <Card>
            <CardBody className="pb-0">
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.observacaoFichaData.nome} />
              <Row>
                {/*** OBSERVACAO ***/}
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Input
                      type="textarea"
                      maxLength={2000}
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
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
                <SaveButton save={() => savePFisicaObservacao(props, form)} />
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
  observacaoFichaData: state.pFisica.observacaoFichaData,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaObservacao);
