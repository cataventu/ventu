///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import { formatData, getDados, formatHora } from '../../../../functions/sistema';
import './style.css';

function Step01(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [id_projeto, setId_projeto] = useState(0);

  const [for_pessoa, setFor_Pessoa] = useState('');
  const [for_nome_pessoa, setFor_nome_pessoa] = useState('');
  const [for_id_pfisica, setFor_Id_Pfisica] = useState(0);
  const [for_id_pjuridica, setFor_Id_Pjuridica] = useState(0);

  const [dt_inicio, setDt_inicio] = useState('');
  const [dt_termino, setDt_termino] = useState(0);
  const [hos_wakeup, setHos_wakeup] = useState(0);

  const [especificacao, setEspecificacao] = useState('');
  const [hos_tipo, setHos_tipo] = useState('');
  const [hos_apto, setHos_apto] = useState('');
  const [listaHos_Tipo, setListaHos_Tipo] = useState('');

  const handleHos_tipo = useCallback((hos_tipo) => {
    const { dispatch } = props;
    dispatch({ type: '@SET_ROOMINGLIST_HOS_TIPO', payload: parseInt(hos_tipo, 10) });
  }, [props]);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      ////// TIPO HOSPEDAGEM
      const hos_tipo = await getDados(props, '/TsmSISTEMA/TIPO_HOSPEDAGEM_TABELA', '');
      setListaHos_Tipo(hos_tipo);
    }
    getTabelas();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getTabelas();
      setFirst(false);
    }
  }, [getTabelas, firstLoad]);

  /// FICHA DATA
  useEffect(() => {
    const idUrl = props.match.params.idRoomingList;
    if (parseInt(idUrl, 10) > 0) {
      const {
        id, id_projeto, dt_inicio, dt_termino, especificacao, for_nome_pessoa, for_id_pfisica, for_id_pjuridica,
        for_pessoa, hos_apto, hos_tipo, hos_wakeup,
      } = props.fichaData;

      setId(id);
      setId_projeto(id_projeto);
      setEspecificacao(especificacao);
      setFor_Pessoa(for_pessoa);
      setFor_nome_pessoa(for_nome_pessoa);
      setFor_Id_Pfisica(for_id_pfisica);
      setFor_Id_Pjuridica(for_id_pjuridica);
      //setDt_inicio(formatDataInput(dt_inicio));
      //setDt_termino(formatDataInput(dt_termino));
      setDt_inicio(dt_inicio);
      setDt_termino(dt_termino);
      setHos_wakeup(hos_wakeup);

      setHos_tipo(hos_tipo);
      setHos_apto(hos_apto);

      handleHos_tipo(hos_tipo);
      //console.log('Atualizado Step 1');
    }
  }, [props, handleHos_tipo]);

  /// ATUALIZA FORM
  useEffect(() => {
    const form = {
      id,
      id_projeto,
      especificacao,
      for_pessoa,
      for_id_pfisica,
      for_id_pjuridica,
      hos_apto,
      hos_tipo,
      hos_wakeup,
      dt_inicio: formatData(dt_inicio),
      dt_termino: formatData(dt_termino),
    };
    handleHos_tipo(hos_tipo);
    localStorage.setItem('ROOMINGLIST_FORM_STEP_01', JSON.stringify(form));
  }, [id, id_projeto, for_pessoa, for_id_pfisica, for_id_pjuridica, especificacao,
    hos_apto, hos_tipo, hos_wakeup, dt_inicio, dt_termino, handleHos_tipo]);

  return (
    <>
      {/*** LINHA 02 - FORNECEDOR ***/}
      <Row>
        {/*** CONTATO ***/}
        <Col sm={6} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Fornecedor</Label>
            <Input
              type="text"
              value={for_nome_pessoa}
              disabled
            />
          </FormGroup>
        </Col>
        {/*** DATA INICIO ***/}
        <Col sm={3} md={2} lg={2} xl={2}>
          <FormGroup>
            <Label>Início</Label>
            <Input
              type="text"
              disabled
              value={dt_inicio}
            />
          </FormGroup>
        </Col>
        {/*** DATA FIM ***/}
        <Col sm={3} md={2} lg={2} xl={2}>
          <FormGroup>
            <Label>Fim</Label>
            <Input
              type="text"
              disabled
              value={dt_termino}
              //onChange={ e => setDt_termino(e.target.value) }
            />
          </FormGroup>
        </Col>
      </Row>

      {/*** LINHA 03 - HOSPEDAGEM ***/}
      <Row>
        {/*** ESPECIFICACAO ***/}
        <Col sm={6} md={5} lg={4} xl={4}>
          <FormGroup>
            <Label>Especificação</Label>
            <Input
              type="text"
              value={especificacao}
              onChange={(e) => setEspecificacao(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** APTO ***/}
        <Col sm={2} md={2} lg={1} xl={1}>
          <FormGroup>
            <Label>Apto</Label>
            <Input
              type="text"
              value={hos_apto}
              maxLength={5}
              onChange={(e) => setHos_apto(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** WAKE UP ***/}
        <Col sm={2} md={2} lg={1} xl={1}>
          <FormGroup>
            <Label>Wake up</Label>
            <Input
              type="text"
              placeholder="00:00"
              maxLength={5}
              value={hos_wakeup}
              onChange={(e) => setHos_wakeup(formatHora(e.target.value))}
            />
          </FormGroup>
        </Col>
        {/*** TIPO HOSPEDAGEM ***/}
        <Col sm={2} md={2} lg={2} xl={2}>
          <FormGroup>
            <Label>Tipo Hospedagem</Label>
            <Input
              type="select"
              value={hos_tipo}
              onChange={(e) => setHos_tipo(e.target.value)}
            >
              <option value="0">Selecione...</option>

              { !!listaHos_Tipo && listaHos_Tipo.map((item) => (
                <option key={item.id} value={item.id}>{item.descricao}</option>
              ))}

            </Input>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.roomingList.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(Step01);
