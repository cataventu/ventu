///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Input, Label,
} from 'reactstrap';
import {
  TabsProjeto, CardHeaderName, PageTitle, SaveButton,
} from '../../../components';
import { getDados, newFormatCelular, formatDataInput } from '../../../functions/sistema';
import { resetRSVP, saveRSVP } from '../../../functions/projeto/rsvp';

function RSVPficha(props) {
  const hoje = moment().format('L');

  const [firstLoad, setFirst] = useState(true);
  const [listaStatus, setListaStatus] = useState([]);

  const [id, setId] = useState('');
  const [id_projeto, setId_projeto] = useState('');
  const [id_pfisica, setId_pfisica] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');
  const [notas, setNotas] = useState('');

  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const id = props.match.params.idRSVP;
    const id_projeto = props.match.params.id;

    setId(id);
    setId_projeto(id_projeto);

    if (firstLoad) {
      resetRSVP(props);

      const arrayStatus = [];
      props.status_rsvp.forEach((item) => {
        arrayStatus.push(<option value={item.id}>{ item.descricao }</option>);
      });

      setListaStatus(arrayStatus);

      if (id > 0) { getDados(props, `/tsmRSVP/Ficha/${id}`, '@GET_RSVP_FICHA'); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      nome_completo, email, telefone, status, id_pfisica, notas, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      setNome(nome_completo);
      setEmail(email);
      setId_pfisica(id_pfisica);
      setTelefone(telefone);
      setStatus(status);
      setNotas(notas);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.fichaData]);

  /// inclui
  useEffect(() => {
    setForm({
      id,
      id_projeto,
      nome_completo: nome,
      id_pfisica,
      email,
      telefone,
      status,
      notas,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, nome, id_projeto, email, telefone, notas, status, id_pfisica, alt_dhsis, props]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ RSVP / Cadastrar"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={3} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">

                <CardHeaderName {...props} titulo={props.nomeProjeto} label="Projeto:" />

                <Row>
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
                  {/*** ID ***/}
                  <Col sm={2} md={2} lg={1} xl={1}>
                    <FormGroup>
                      <Label>Id</Label>
                      <Input
                        type="text"
                        disabled
                        value={id}
                      />
                    </FormGroup>
                  </Col>
                  {/*** NOME ***/}
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Nome</Label>
                      <Input
                        type="text"
                        className="required"
                        maxLength={120}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** EMAIL ***/}
                  <Col sm={6} md={5} lg={3} xl={3}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="text"
                        className="email"
                        value={email}
                        maxLength={120}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** TELEFONE ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Telefone</Label>
                      <Input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(newFormatCelular(e.target.value))}
                      />
                    </FormGroup>
                  </Col>
                  {/*** STATUS ***/}
                  <Col sm={3} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        className="required"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        { listaStatus }
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** NOTAS ***/}
                  <Col sm={12}>
                    <FormGroup>
                      <Label>Notas</Label>
                      <Input
                        type="textarea"
                        className="obs"
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                </Row>
                <Row>
                  {/*** SAVE BUTTON ***/}
                  <SaveButton save={() => saveRSVP(props, form)} />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  nomeProjeto: state.projeto.nomeProjeto,
  fichaData: state.rsvp.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  status_rsvp: state.sistema.status_rsvp,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(RSVPficha);
