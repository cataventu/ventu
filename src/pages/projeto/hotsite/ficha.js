///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import crypto from 'crypto';
import api from '../../../services/api';
import { saveProcessar } from '../../../functions/hotsite/projeto';
import {
  PageTitle, Modal, BannerProjeto, TabsProjeto, showMSG, Buttons,
} from '../../../components';
import './style.css';

function Hotsite(props) {
  const { id: id_projeto } = props.match.params;

  const [firstLoad, setFirst] = useState(true);
  const [senhaAcesso, set_senhaAcesso] = useState('');
  const [visibility_modal, set_visibility_modal] = useState(false);

  const [hotSite_contratante, set_hotSite_contratante] = useState('');
  const [hotSite_participante, set_hotSite_participante] = useState('');

  const [hash_contratante, set_hash_contratante] = useState('');
  const [hash_participante, set_hash_participante] = useState('');

  const [flag_contratante, set_flag_contratante] = useState(false);
  const [flag_participante, set_flag_participante] = useState(false);

  const clearHotsite = useCallback((tipo) => {
    switch (tipo) {
      case 1:
        set_senhaAcesso('');
        set_hotSite_contratante('');
        set_flag_contratante(true);
        break;
      case 2:
        set_hotSite_participante('');
        set_flag_participante(true);
        break;
      default: break;
    }
  }, []);

  const handleHotSiteCliente = useCallback(() => {
    if (hotSite_contratante.length === 0) {
      crypto.randomBytes(6, (err, hash) => {
        if (err) { return; }
        const _hash = hash.toString('hex');
        set_senhaAcesso(_hash);
      });

      crypto.randomBytes(32, (err, hash) => {
        if (err) { return; }
        const _hash = hash.toString('hex');
        const url = `/hotsite/contratante/login/${id_projeto}/${_hash}`;
        set_hash_contratante(_hash);
        set_hotSite_contratante(url);
        set_flag_contratante(true);
      });
    } else {
      showMSG('Erro', 'Hotsite já processado.', 'error', 4000);
    }
  }, [hotSite_contratante.length, id_projeto]);

  const handleHotSiteParticipante = useCallback(() => {
    if (hotSite_participante.length === 0) {
      crypto.randomBytes(32, (err, hash) => {
        if (err) { return; }
        const _hash = hash.toString('hex');
        const url = `/hotsite/participante/login/${id_projeto}/${_hash}`;
        set_hash_participante(_hash);
        set_hotSite_participante(url);
        set_visibility_modal(false);
        set_flag_participante(true);
      });
    } else {
      showMSG('Erro', 'Hotsite já processado.', 'error', 4000);
    }
  }, [hotSite_participante.length, id_projeto]);

  const editarFormulario = useCallback(() => {
    const { history } = props;
    hotSite_participante.length > 0
      ? showMSG('Edição bloqueada', 'Hotsite já processado.', 'error', 4000)
      : history.push(`/projeto/painel/${id_projeto}/hotsite/editar`);
  }, [props, hotSite_participante.length, id_projeto]);

  const getFicha = useCallback(() => {
    async function getFicha() {
      const url = `/TsmHOTSITE/FICHA/${id_projeto}`;
      const ficha = await api.get(url, { auth: props.auth });
      const { contratante, participante, senha } = ficha.data;
      if (contratante.length > 0) {
        set_hotSite_contratante(`/hotsite/contratante/login/${id_projeto}/${contratante}`);
        set_senhaAcesso(senha);
      }
      if (participante.length > 0) {
        set_hotSite_participante(`/hotsite/participante/login/${id_projeto}/${participante}`);
      }
    }
    getFicha();
  }, [props, id_projeto]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getFicha();
      setFirst(false);
    }
  }, [firstLoad, getFicha]);

  ////// PROCESSAR
  useEffect(() => {
    if (flag_contratante) {
      const contratante = {
        id_projeto,
        pagina: 1,
        hotsite: hash_contratante,
        senha: senhaAcesso,
      };
      saveProcessar(contratante, props);
      set_flag_contratante(false);
    }

    if (flag_participante) {
      const participante = {
        id_projeto,
        pagina: 2,
        hotsite: hash_participante,
        senha: senhaAcesso,
      };
      saveProcessar(participante, props);
      set_flag_participante(false);
    }
  }, [props, id_projeto, hotSite_contratante, hotSite_participante, senhaAcesso, flag_contratante, flag_participante, hash_contratante, hash_participante]);

  return (
    <>
      <Container fluid className="p-0">

        <PageTitle
          history={props.history}
          title="Projeto"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={11} props={props} />

        <Modal
          open={visibility_modal}
          descricao="Confirma o processamento do hotsite?"
          adicional="O formulário de edição será bloqueado após a criação do hotsite."
          nao={() => set_visibility_modal(false)}
          sim={() => handleHotSiteParticipante()}
        />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-2">
                <Row className="hotsite-container">

                  { /*** BANNER *******************/
                    parseInt(id_projeto, 10) > 0
                      ? <BannerProjeto {...props} />
                      : null
                  }

                  {/*** URL ***/}
                  <Col sm={8}>
                    <FormGroup>
                      <Label>Link Hotsite Contratante</Label>

                      <div className="link hotsite-input-url form-control text-blue no-wrap">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor text-danger p-0 m-0 mr-2 h5"
                          onClick={() => clearHotsite(1)}
                        />
                        { hotSite_contratante }
                      </div>
                      <Link to={hotSite_contratante} target="_blank">
                        <div className="hotsite-icon-link bg-info cursor">
                          <FontAwesomeIcon icon={faCaretRight} className="text-white p-0 m-0 h4" />
                        </div>
                      </Link>
                    </FormGroup>
                  </Col>
                  {/*** SENHA ACESSO ***/}
                  <Col sm={2}>
                    <FormGroup>
                      <Label>Senha acesso</Label>
                      <Input type="text" className="p-0 text-center text-blue" disabled value={senhaAcesso} />
                    </FormGroup>
                  </Col>
                  {/*** PROCESSAR ***/}
                  <Col sm={2}>
                    <FormGroup className="pt-1">
                      <Buttons
                        onClick={() => handleHotSiteCliente()}
                        description="Processar"
                        color="primary"
                        position="left"
                        title="Gera link do hotsite."
                        permission={props}
                      />
                    </FormGroup>
                  </Col>

                  {/*** URL ***/}
                  <Col sm={8}>
                    <FormGroup>
                      <Label>Link Hotsite Participante</Label>
                      <div className="link hotsite-input-url form-control text-blue no-wrap">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor text-danger p-0 m-0 mr-2 h5"
                          onClick={() => clearHotsite(2)}
                        />
                        { hotSite_participante }
                      </div>
                      <Link to={hotSite_participante} target="_blank">
                        <div className="hotsite-icon-link bg-info cursor">
                          <FontAwesomeIcon icon={faCaretRight} className="text-white p-0 m-0 h4" />
                        </div>
                      </Link>
                    </FormGroup>
                  </Col>
                  {/*** EDITAR FORMULARIO ***/}
                  <Col sm={2}>
                    <FormGroup className="pt-1">
                      <Buttons
                        description="Editar form"
                        color="blue"
                        position="right"
                        title="Gera link do hotsite."
                        permission={props}
                        onClick={() => editarFormulario()}
                      />
                    </FormGroup>
                  </Col>
                  {/*** PROCESSAR ***/}
                  <Col sm={2}>
                    <FormGroup className="pt-1">
                      <Buttons
                        description="Processar"
                        color="primary"
                        position="left"
                        title="Gera link do hotsite."
                        permission={props}
                        onClick={() => set_visibility_modal(true)}
                      />

                    </FormGroup>
                  </Col>

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
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(Hotsite);
