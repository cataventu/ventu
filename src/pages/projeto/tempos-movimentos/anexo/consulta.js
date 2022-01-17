///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  TabsProjeto, PageTitle, SaveButton, CardHeaderName, ConsultaHeader, ConsultaFooter
} from '../../../../components';
import { upload, calculaTamanho, renderIcon } from '../../../../functions/anexo';
import { formatDataInput } from '../../../../functions/sistema';
import { getAnexoData, saveAnexo } from '../../../../functions/projeto/tempos-movimentos';
import api from '../../../../services/api';
import './style.css';

function TempoMovimentoAnexoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState(0);
  const [id_evento, setId_evento] = useState(0);

  const [nomeProjeto, setNomeProjeto] = useState([]);

  const [data, setData] = useState(formatDataInput(moment(Date.now()).format('L')));
  const [titulo, setTitulo] = useState('');
  const [tamanho, setTamanho] = useState(0);
  const [extensao, setExtensao] = useState('');
  const [arquivo, setArquivo] = useState('');

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
      const { id, idTempoMov, idTempoMovAnexo } = props.match.params;
      const { dispatch } = props;
      dispatch({ type: '@RESET_TEMPOMOV_ANEXO_FILE' });
      setId_projeto(id);
      setId_evento(idTempoMov);
      getFicha(idTempoMovAnexo);
      setFirst(false);
    }
  }, [props, firstLoad, getFicha]);

  ////// ATUALIZA FORM
  useEffect(() => {
    const { idTempoMov: id_tempomov, idTempoMovAnexo: id } = props.match.params;

    const form = {
      id,
      id_pfisica: 0,
      id_pjuridica: 0,
      id_projeto: 0,
      id_proservico: 0,
      id_movimento: 0,
      id_tempomov: parseInt(id_tempomov, 10),
      data: moment(data).format('L'),
      titulo,
      tamanho,
      extensao,
      arquivo,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
    };

    setForm(form);
  }, [props, data, titulo, tamanho, extensao, arquivo]);

  ////// RECEBE FILE ANEXO
  useEffect(() => {
    const {
      titulo, tamanho, extensao, arquivo,
    } = props.fileAnexo;

    setTitulo(titulo);
    setTamanho(tamanho);
    setExtensao(extensao);
    setArquivo(arquivo);
  }, [props.fileAnexo]);

  ////// RECEBE FICHA DATA
  useEffect(() => {
    if (fichaData !== undefined) {
      const {
        data, titulo, tamanho, extensao, arquivo, nome,
      } = fichaData;

      setData(formatDataInput(data));
      setTitulo(titulo);
      setTamanho(tamanho);
      setExtensao(extensao);
      if (extensao === '.jpg' || extensao === '.gif' || extensao === '.png' || extensao === '.jpeg'){
        let codifica = (                    
        <img width="50%" src={`data:image/gif;base64, ${arquivo}`}  />         
        );
        setArquivo(codifica);
      }
      if (extensao === '.pdf' ){
        let codifica = (
          <iframe width="100%" height="1000px" src={`data:application/pdf;base64, ${arquivo}`}  />   
          );
          setArquivo(codifica);
      }
      if (extensao === '.doc' || extensao === '.docx' || extensao === '.xlsx' || extensao === '.xls' || extensao === '.ppt' || extensao === '.pptx' || extensao === '.ppsx'  ){
        setArquivo( <h4><i>Documento disponível somente para Download</i></h4>
       );
        
      }
      // setArquivo(arquivo);
      setNomeProjeto(nome);
    }
  }, [fichaData]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Consulta" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Anexo" />
            <Row className="p-0 m-0">
            <Col>
              <div className="pb-2" align="center" >
                {arquivo}
              </div>
            </Col>
            </Row>
            <ConsultaFooter />
          </div>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  anexoFichaData: state.anexo.anexoFichaData,
  anexoConsulta: state.anexo.anexoConsulta,
  fileAnexo: state.temposMovimentos.fileAnexo,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  user: state.usuario.fichaData,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(TempoMovimentoAnexoFicha);
