///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  PageTitle, SaveButton, MenuParametros, AutoCompletarV2,
} from '../../../../components';
import { getParametrosGrupoFicha, saveParametrosGrupo } from '../../../../functions/sistema/parametros';
import { formatDataInput } from '../../../../functions/sistema';

function GrupoFicha(props) {
  const [firstLoad, setFirst] = useState(true);

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [id, setId] = useState(0);
  const [msg, setMsg] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [id_subgrupo, setId_subgrupo] = useState(0);
  const [subgrupo, setSubgrupo] = useState('');

  const [form, setForm] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    if (firstLoad) {
      if (id > 0) { getParametrosGrupoFicha(props, id); }
      setFirst(false);
    }
  }, [props, firstLoad]);

  //editar
  useEffect(() => {
    const {
      id, msg, descricao, codigo, id_subgrupo, subgrupo, alt_dhsis,
    } = props.grupoFichaData;
    if (id > 0) {
      setId(id);
      setMsg(msg);
      setDescricao(descricao);
      setCodigo(codigo);
      setId_subgrupo(id_subgrupo);
      setSubgrupo(subgrupo);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.grupoFichaData]);

  useEffect(() => {
    setId_subgrupo(props.autoCompletarId_SubGrupo);
  }, [props.autoCompletarId_SubGrupo]);

  //salvar
  useEffect(() => {
    setForm({
      id,
      msg,
      descricao,
      codigo,
      id_subgrupo,
      subgrupo,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, msg, descricao, codigo, id_subgrupo, subgrupo, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Grupo" subtitle="/ Cadastrar" voltar />

      <Row>
        {/*** MenuParametros ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuParametros {...props} item_2="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-0">
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
                {/*** DESCRICAO***/}
                <Col sm={4} md={4} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                      type="text"
                      disabled
                      value={descricao}
                    />
                  </FormGroup>
                </Col>
                {/*** SUBGRUPO ***/}
                <Col sm={6} md={6} lg={5} xl={5}>
                  <FormGroup>
                    <Label>Grupo</Label>
                    <AutoCompletarV2
                      {...props}
                      value={subgrupo}
                      valueId={id_subgrupo}
                      tabela="SUBGRUPO"
                      required
                      campo=""
                      disabled={false}
                      visible
                      editar={{ id, value: subgrupo, valueId: id_subgrupo }}
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
                <SaveButton save={() => saveParametrosGrupo(props, form)} />
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

  grupoFichaData: state.parametros.grupoFichaData,
  auth: state.sistema.auth,
  user: state.usuario.fichaData,
  autoCompletarId_SubGrupo: state.autoCompletar.autoCompletarId_SubGrupo,

});
export default connect(() => (mapState))(GrupoFicha);
