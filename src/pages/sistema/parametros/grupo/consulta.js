///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PageTitle, ConsultaHeader, ConsultaFooter, MenuParametros,
} from '../../../../components';
import { getConsultaGrupo } from '../../../../functions/sistema/parametros';
import { formatData } from '../../../../functions/sistema';

///////// GRUPO ///////////////
/////////////////////////////////
function GrupoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  //const [msg, setMsg] = useState('');
  //const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [id_grupo, setId_grupo] = useState(0);
  const [grupo, setGrupo] = useState('');
  const [id_subgrupo, setId_subgrupo] = useState(0);
  const [subgrupo, setSubgrupo] = useState('');

  const [alt_dusuario, setAlt_dusuario] = useState(0);
  const [alt_dhsis, setAlt_dhsis] = useState(0);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getConsultaGrupo(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id, descricao, id_grupo, grupo, id_subgrupo, subgrupo, alt_dusuario, alt_dhsis,
    } = props.grupoConsulta;

    if (id > 0) {
      setId(id);
      //setMsg(msg);
      setDescricao(descricao);
      //setCodigo(codigo);
      setId_grupo(id_grupo);
      setGrupo(grupo);
      setId_subgrupo(id_subgrupo);
      setSubgrupo(subgrupo);
      setAlt_dusuario(alt_dusuario);
      setAlt_dhsis(formatData(alt_dhsis));
    }
  }, [props.grupoConsulta]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />

        <Row>
          {/*** MENU ***/}
          <Col sm={3} md={3} lg={2} xl={2}>
            <MenuParametros {...props} item_2="active" />
          </Col>

          {/*** BODY ***/}
          <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
            <Card className="p-3">
              <div className="consulta-body">
                <ConsultaHeader titulo="Responsável" />

                <Row className="p-0 m-0">

                  <Col sm={12}>
                    <Row className="pr-4 h5">
                      <Col sm={12}>
                        <span className="pr-3 text-black">Id:</span>
                        <span className="text-muted">{ id }</span>
                      </Col>
                    </Row>

                    <Row className="pr-4 h5">
                      <Col sm={12}>
                        <span className="pr-3 text-black">Descrição:</span>
                        <span className="text-muted">{ descricao }</span>
                      </Col>
                    </Row>

                    <Row className="pr-4 h5">
                      <Col sm={12}>
                        <span className="pr-3 text-black">Grupo:</span>
                        <span>
                          <Link className="text-blue" to={`/financeiro/grupo/consulta/${id_grupo}`}>
                            { grupo }
                          </Link>
                        </span>
                      </Col>
                    </Row>

                    <Row className="pr-4 h5">
                      <Col sm={12}>
                        <span className="pr-3 text-black">Subgrupo:</span>
                        <span>
                          <Link className="text-blue" to={`/financeiro/subgrupo/consulta/${id_subgrupo}`}>
                            { subgrupo }
                          </Link>
                        </span>
                      </Col>
                    </Row>

                    <Row className="pr-4 h5">
                      <Col sm={12}>
                        <span className="pr-3 text-black">Última Atualização em:</span>
                        <span className="text-muted">
                          { alt_dusuario }
                          {' '}
-
                          {' '}
                          { alt_dhsis }
                        </span>
                      </Col>
                    </Row>

                  </Col>
                </Row>

                <ConsultaFooter />
              </div>
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
  grupoConsulta: state.parametros.grupoConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(GrupoConsulta);
