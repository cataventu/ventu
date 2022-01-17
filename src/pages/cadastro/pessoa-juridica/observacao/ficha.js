///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, PageTitle, MenuPJuridica, CardHeaderName,
} from '../../../../components';
import { getPJuridicaObservacao, savePJuridicaObservacao } from '../../../../functions/cadastro/pessoa-juridica';
import { formatDataInput } from '../../../../functions/sistema';

function FichaObservacao(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [observacao, setObservacao] = useState(0);
  const [form, setForm] = useState({});

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      if (id > 0) { getPJuridicaObservacao(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

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
        title="Pessoa Jurídica"
        subtitle="/ Observação"
        voltar
        linkTo="/cadastro/pessoa-juridica"
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_5="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">
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
                <SaveButton save={() => savePJuridicaObservacao(props, form)} />
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
  observacaoFichaData: state.pJuridica.observacaoFichaData,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaObservacao);
