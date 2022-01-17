///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  TabsProjeto, PageTitle, SaveButton, CardHeaderName,
} from '../../../../components';
import { upload, calculaTamanho, renderIcon } from '../../../../functions/anexo';
import { formatDataInput } from '../../../../functions/sistema';
import { getAnexoData, saveAnexo } from '../../../../functions/projeto/servico';
import api from '../../../../services/api';
import './style.css';

function ServicoAnexoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState(0);
  const [id_servico, setId_servico] = useState(0);

  const [nomeProjeto, setNomeProjeto] = useState([]);

  const [data, setData] = useState(formatDataInput(moment(Date.now()).format('L')));
  const [titulo, setTitulo] = useState('');
  const [tamanho, setTamanho] = useState(0);
  const [extensao, setExtensao] = useState('');
  const [arquivo, setArquivo] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState();
  const [fichaData, setFichaData] = useState();

  const getFicha = useCallback((id) => {
    async function getFicha(id) {
      if (parseInt(id, 10) > 0) {
        const url = `/TsmANEXO/FICHA/${id}`;
        const ficha = await api.get(url, { auth: props.auth });
        setFichaData(ficha.data);
      }
    }
    getFicha(id);
  }, [props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      //console.log(props.match.params);

      const { id, idServico, idAnexo } = props.match.params;
      const { dispatch } = props;
      dispatch({ type: '@RESET_SERVICO_ANEXO_FILE' });
      setId_projeto(id);
      setId_servico(idServico);
      getFicha(idAnexo);
      setFirst(false);
    }
  }, [props, firstLoad, getFicha]);

  ////// ATUALIZA FORM
  useEffect(() => {
    const { idServico: id_servico, idServicoAnexo: id } = props.match.params;

    const form = {
      id,
      id_pfisica: 0,
      id_pjuridica: 0,
      id_projeto: 0,
      id_proservico: parseInt(id_servico, 10),
      id_movimento: 0,
      //id_servico: parseInt(id_servico, 10),
      data: moment(data).format('L'),
      titulo,
      tamanho,
      extensao,
      arquivo,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    };

    setForm(form);
  }, [props, data, titulo, tamanho, extensao, arquivo, alt_dhsis]);

  ////// RECEBE FILE ANEXO
  useEffect(() => {
    const {
      titulo, tamanho, extensao, arquivo, alt_dhsis,
    } = props.fileAnexo;
    setTitulo(titulo);
    setTamanho(tamanho);
    setExtensao(extensao);
    setArquivo(arquivo);
    setAlt_dhsis(alt_dhsis);
  }, [props.fileAnexo]);

  ////// RECEBE FICHA DATA
  useEffect(() => {
    if (fichaData !== undefined) {
      const {
        data, titulo, tamanho, extensao, arquivo, nome, alt_dhsis,
      } = fichaData;

      setData(formatDataInput(data));
      setTitulo(titulo);
      setTamanho(tamanho);
      setExtensao(extensao);
      setArquivo(arquivo);
      setNomeProjeto(nome);
      setAlt_dhsis(alt_dhsis);
    }
  }, [fichaData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Serviço / Anexo"
          voltar
          linkTo={`/projeto/painel/${id_projeto}/servicos/ficha/${id_servico}/anexo`}
        />

        <TabsProjeto ativo={5} props={props} />
        <Card>
          <CardBody className="pb-3">
            <Row className="">
              <Col className="pl-3 pr-3 pt-0 pb-0 m-0" sm={12}>
                <CardHeaderName
                  {...props}
                  titulo={nomeProjeto}
                  label="Projeto:"
                  excel={false}
                />
              </Col>
            </Row>

            <Row className="">
              {/*** BODY ***/}
              <Col sm={8} md={8} lg={8} xl={9} className="pt-0">
                <Row>
                  {/*** DATA ***/}
                  <Col sm={5} md={4} lg={3} xl={2}>
                    <FormGroup>
                      <Label>Data</Label>
                      <Input
                        type="date"
                        className="required"
                        maxLength={60}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/*** TITULO ***/}
                  <Col sm={12} md={8} lg={6} xl={6}>
                    <FormGroup>
                      <Label>Título</Label>
                      <Input
                        type="text"
                        className="required"
                        maxLength={120}
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
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
                <Row className="pt-5 mt-5 mb-0 pb-0">
                  <SaveButton save={() => saveAnexo(props, form)} />
                </Row>
              </Col>

              {/*** FOTO ***/}
              <Col sm={4} md={4} lg={4} xl={3} className="pt-0 border-left-anexo ">
                <div className="text-center">
                  <div className="pt-1 pb-4 pl-0 pr-0">
                    { renderIcon(extensao, 'pfisica-anexo-icone') }
                  </div>

                  <div className="mb-3 pl-2">
                    <Button onClick={() => upload()} color="primary">
                      <FontAwesomeIcon icon={faUpload} />
                      {' '}
                      Upload
                    </Button>
                    <form encType="multipart/form-data" action="/upload/image" method="post">
                      <input id="doc-file" type="file" className="hide" onChange={() => getAnexoData(props)} />
                    </form>
                  </div>

                  <small>
                            Tamanho do arquivo:
                    <span className="h6 text-muted ml-2">
                      { calculaTamanho(tamanho) }
                    </span>
                    <br />
                            Tamanho máximo:
                    {' '}
                    <span className="h6 text-muted ml-2">3mb</span>
                  </small>
                </div>
              </Col>

            </Row>

          </CardBody>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  fileAnexo: state.servicos.fileAnexo,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  user: state.usuario.fichaData,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(ServicoAnexoFicha);
