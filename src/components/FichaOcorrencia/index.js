///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import moment from 'moment';
import { SaveButton } from '../index';
import {
  formatData, formatDataInput, getDados, formatHora,
} from '../../functions/sistema';
import { saveOcorrencia } from '../../functions/sistema/ocorrencias';
import AutoCompletarV2 from '../AutoCompletarV2';

function FichaOcorrencia({ props, page }) {
  const {
    fichaPessoal,
    fichaComerciais,
    autoCompletarId_Pfisica: AC_ID_PFisica,
    autoCompletarId_Pjuridica: AC_ID_PJuridica,
    autoCompletarId_Projeto: AC_ID_Projeto,

    autoCompletarPfisica: AC_PFisica,
    autoCompletarPjuridica: AC_PJuridica,
    autoCompletarProjeto: AC_Projeto,
  } = props;

  const [firstLoad, setFirst] = useState(true);
  const [listaStatus, setListaStatus] = useState([]);
  const [id, setId] = useState(0);

  const [id_pfisica, setId_pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [disablePfisica, setDisablePfisica] = useState(false);

  const [id_pjuridica, setId_pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');
  const [disablePjuridica, setDisablePjuridica] = useState(false);

  const [id_projeto, setId_Projeto] = useState(0);
  const [projeto, setProjeto] = useState('');
  const [disableProjeto, setDisableProjeto] = useState(false);

  const [data, setData] = useState('');
  const [hora, setHora] = useState('00:00');
  const [dt_solucao, setDt_solucao] = useState('');
  const [status, setStatus] = useState('');
  const [texto, setTexto] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [form, setForm] = useState({});

  const handlePage = useCallback((fichaPessoal, fichaComercial) => {
    let registro;
    const { params } = props.match;

    switch (page) {
      case 'PFISICA':
        registro = parseInt(fichaPessoal.id, 10);
        break;
      case 'PJURIDICA':
        registro = parseInt(fichaComercial.id, 10);
        break;
      case 'PROJETO':
        const { id: id_projeto } = params;
        if (props.nomeProjeto.length > 0) { setProjeto(props.nomeProjeto); }
        registro = parseInt(id_projeto, 10);
        setDisableProjeto(true);
        break;
      case 'OCORRENCIA':
        const { id: id_ocorrencia } = params;
        registro = parseInt(id_ocorrencia, 10);
        break;
      default:
    }

    if (registro === 0 || isNaN(registro)) { return; }

    let id_ocorrencia;
    switch (page) {
      case 'PFISICA':
        id_ocorrencia = parseInt(params.idOcorrencia, 10);
        setPfisica(props.fichaPessoal.nome_completo);
        setId_pfisica(params.id);
        setDisablePfisica(true);
        break;
      case 'PJURIDICA':
        id_ocorrencia = parseInt(params.idOcorrencia, 10);
        setPjuridica(props.fichaComerciais.nome_fantasia);
        setDisablePjuridica(true);
        setId_pjuridica(params.id);
        break;
      case 'PROJETO':
        id_ocorrencia = parseInt(params.idOcorrencia, 10);
        setId_Projeto(params.id);
        break;
      case 'OCORRENCIA':
        id_ocorrencia = parseInt(params.id, 10);
        break;
      default:
    }
    setId(id_ocorrencia);
    getDados(props, `/tsmOCORRENCIA/Ficha/${id_ocorrencia}`, '@GET_OCORRENCIA_FICHA', '');
  }, [props, page]);

  useEffect(() => {
    if (firstLoad) {
      const { dispatch } = props;
      dispatch({ type: '@RESET_OCORRENCIA_FICHA' });

      getDados(props, '/TsmSISTEMA/STATUS_OCORRENCIA_TABELA', '@GET_STATUS_OCORRENCIA');
      handlePage(fichaPessoal, fichaComerciais);
      setFirst(false);
    }
  }, [props, firstLoad, fichaPessoal, fichaComerciais, handlePage]);

  useEffect(() => {
    const arrayStatus = [];

    props.status_ocorrencia.forEach((item) => {
      arrayStatus.push(<option value={item.id}>{ item.descricao }</option>);
    });

    setListaStatus(arrayStatus);
  }, [props.status_ocorrencia]);

  /// FORM
  useEffect(() => {
    //const Dt =  new Date();
    //const h  =  Dt.getHours();
    //const m  =  Dt.getMinutes();

    setForm({
      id,
      id_projeto,
      id_pfisica,
      id_pjuridica,
      data: `${formatData(data)} ${hora}`,
      hora,
      //"dt_solucao": formatData(dt_solucao) +" "+ h+":"+m,
      dt_solucao: formatData(dt_solucao),
      status,
      texto,
      alt_dhsis,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
    });
  }, [id, id_projeto, id_pfisica, id_pjuridica, data, hora, dt_solucao, status, texto, alt_dhsis, props.user.id]);

  /// FICHA DATA
  useEffect(() => {
    const {
      id, id_projeto, projeto, id_pfisica, pfisica, id_pjuridica, pjuridica, data, dt_solucao, status, texto, alt_dhsis,
    } = props.fichaData;

    if (id > 0) {
      const _dt_solucao = formatDataInput(dt_solucao.substring(0, 10));
      const _data = formatDataInput(data.substring(0, 10));
      const _hora = data.substring(11, 16);

      setId(id);

      setData(_data);
      setHora(_hora);
      setDt_solucao(_dt_solucao);
      setStatus(status);
      setTexto(texto);
      setAlt_dhsis(alt_dhsis);

      /// AC
      setProjeto(projeto);
      setId_Projeto(id_projeto);

      setPfisica(pfisica);
      setId_pfisica(id_pfisica);

      setPjuridica(pjuridica);
      setId_pjuridica(id_pjuridica);
    }
  }, [id, pjuridica, props.fichaData]);

  /// AC
  useEffect(() => {
    if (AC_ID_Projeto > 0) {
      setProjeto(AC_Projeto);
      setId_Projeto(AC_ID_Projeto);
    }
  }, [AC_Projeto, AC_ID_Projeto]);

  useEffect(() => {
    if (AC_ID_PFisica > 0) {
      setPfisica(AC_PFisica);
      setId_pfisica(AC_ID_PFisica);
    }
  }, [AC_PFisica, AC_ID_PFisica]);

  useEffect(() => {
    if (AC_ID_PJuridica > 0) {
      setPjuridica(AC_PJuridica);
      setId_pjuridica(AC_ID_PJuridica);
    }
  }, [AC_PJuridica, AC_ID_PJuridica]);

  return (
    <>
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
        {/*** PROJETO ***/}
        <Col sm={10} md={4} lg={3} xl={3}>
          <FormGroup>
            <Label>Projeto</Label>
            <AutoCompletarV2
              {...props}
              value={projeto}
              valueId={id_projeto}
              tabela="PROJETO"
              campo=""
              disabled={disableProjeto}
              visible
              editar={{ id: id_projeto, value: projeto, valueId: id_projeto }}
            />
          </FormGroup>
        </Col>
        {/*** ESPAÇO VAZIO ***/}
        <Col sm={7} md={1} lg={5} xl={5} />
        {/*** DATA ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Data</Label>
            <Input
              type="date"
              value={data}
              className="required"
              onChange={(e) => setData(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** HORA ***/}
        <Col sm={2} md={2} lg={1} xl={1}>
          <FormGroup>
            <Label>Hora</Label>
            <Input
              type="text"
              maxLength={5}
              value={hora}
              onChange={(e) => setHora(formatHora(e.target.value))}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {/*** PESSOA FISICA ***/}
        <Col sm={6} md={6} lg={3} xl={3}>
          <FormGroup>
            <Label>Pessoa Física</Label>
            <AutoCompletarV2
              {...props}
              value={pfisica}
              valueId={id_pfisica}
              tabela="PFISICA"
              campo=""
              disabled={disablePfisica}
              visible
              editar={{ id: id_pfisica, value: pfisica, valueId: id_pfisica }}
            />
          </FormGroup>
        </Col>
        {/*** PESSOA JURIDICA ***/}
        <Col sm={6} md={6} lg={3} xl={3}>
          <FormGroup>
            <Label>Pessoa Jurídica</Label>
            <AutoCompletarV2
              {...props}
              value={pjuridica}
              valueId={id_pjuridica}
              tabela="PJURIDICA"
              campo=""
              disabled={disablePjuridica}
              visible
              editar={{ id: id_pjuridica, value: pjuridica, valueId: id_pjuridica }}
            />
          </FormGroup>
        </Col>
        {/*** ESPAÇO VAZIO ***/}
        <Col sm={5} md={6} lg={2} xl={2} />
        {/*** DATA SOLUÇÃO ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Data Solução</Label>
            <Input
              type="date"
              value={dt_solucao}
              onChange={(e) => setDt_solucao(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** STATUS ***/}
        <Col sm={4} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Status</Label>
            <Input
              type="select"
              value={status}
              className="required"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="0">Selecione...</option>
              { listaStatus }
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        {/*** TEXTO ***/}
        <Col sm={12}>
          <FormGroup>
            <Label>Texto</Label>
            <Input
              type="textarea"
              className="required obs"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
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
        <SaveButton save={() => saveOcorrencia(props, form, page)} />
      </Row>
    </>
  );
}

export default FichaOcorrencia;
