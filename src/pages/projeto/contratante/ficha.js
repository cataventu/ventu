///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Input, Label,
} from 'reactstrap';
import moment from 'moment';
import {
  SaveButton, Checkbox, AutoCompletarPessoa, PageTitle, CardHeaderName, TabsProjeto,
} from '../../../components';
import { getDados, formatDataInput } from '../../../functions/sistema';
import { saveContratante, resetContratante } from '../../../functions/projeto/contratante';

function ContratanteFicha(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState('');
  const [padrao, setPadrao] = useState(false);

  //const [id_projeto, setId_Projeto] = useState(0);
  //const [projeto, setProjeto] = useState('');

  const [pessoa, setPessoa] = useState(0);
  //const [nome_pessoa, setNome_pessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  useEffect(() => {
    const id = props.match.params.idContratante;
    if (firstLoad) {
      resetContratante(props);
      if (id > 0) { getDados(props, `/tsmCONTRATANTE/Ficha/${id}`, '@GET_CONTRATANTE_FICHA', id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, padrao, pessoa, nome_pessoa, id_pfisica, id_pjuridica, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      setId(id);

      if (pessoa === 1) { setPfisica(nome_pessoa); }
      if (pessoa === 2) { setPjuridica(nome_pessoa); }

      setPessoa(pessoa);
      //setNome_pessoa(nome_pessoa);

      setId_Pfisica(id_pfisica);
      setId_Pjuridica(id_pjuridica);

      setPadrao(padrao);
      setAlt_dhsis(alt_dhsis);

      //setId_Projeto(id_projeto);
      //setProjeto(projeto);
    }
  }, [props.fichaData]);

  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

  /// salvar
  useEffect(() => {
    let tempId_Pfisica = 0;
    let tempId_juridica = 0;

    if (parseInt(pessoa, 10) === 1) { tempId_Pfisica = id_pfisica; }
    if (parseInt(pessoa, 10) === 2) { tempId_juridica = id_pjuridica; }

    setForm({
      id,
      padrao,

      pessoa,
      id_pfisica: tempId_Pfisica,
      id_pjuridica: tempId_juridica,

      id_projeto: props.match.params.id,

      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, padrao, pessoa, id_pfisica, id_pjuridica, alt_dhsis, props.user.id, props.match.params.id]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Contratante / Cadastrar"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={2} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">

                <CardHeaderName {...props} titulo={props.nomeProjeto} label="Projeto:" />

                <Row>
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

                  {/*** PESSOA ***/}
                  <Col sm={4} md={3} lg={2} xl={2}>
                    <FormGroup>
                      <Label>Pessoa</Label>
                      <Input
                        type="select"
                        className="required"
                        value={pessoa}
                        config={props}
                        onChange={(e) => setPessoa(e.target.value)}
                      >
                        <option value="0">Selecione...</option>
                        <option value="1">FÍSICA</option>
                        <option value="2">JURÍDICA</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  {/*** CONTATO ***/}
                  <Col sm={8} md={5} lg={4} xl={4}>
                    <FormGroup>
                      <Label>Contratante</Label>
                      <AutoCompletarPessoa
                        {...props}
                        pessoa={pessoa}
                        editar={{
                          id,
                          pfisica: { id: id_pfisica, descricao: pfisica },
                          pjuridica: { id: id_pjuridica, descricao: pjuridica },
                        }}
                      />
                    </FormGroup>
                  </Col>
                  {/*** PADRAO ***/}
                  <Col sm={1} md={1} lg={2} xl={2}>
                    <FormGroup className="text-right">
                      <Label>Padrão</Label>
                      <Checkbox
                        info="Padrão"
                        checked={padrao}
                        onClick={(e) => setPadrao(e.target.checked)}
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

                  {/*** SAVE BUTTON ***/}
                  <SaveButton save={() => saveContratante(props, form)} />
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
  fichaData: state.contratante.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,

  user: state.usuario.fichaData,

  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
});
export default connect(() => (mapState))(ContratanteFicha);
