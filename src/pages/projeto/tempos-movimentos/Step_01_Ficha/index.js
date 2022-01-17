///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { Checkbox } from '../../../../components';
import { formatHora, formatDataInput } from '../../../../functions/sistema';
import api from '../../../../services/api';
import '../style.css';

const $ = require('jquery');

function TemposMovimentosFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState('');

  const [id, setId] = useState('');
  const [id_categoria, setId_categoria] = useState(0);
  const [colorList, setColorList] = useState([]);
  const [titulo, setTitulo] = useState('');
  //const [privado, setPrivado] = useState('');
  const [privado, setPrivado] = useState('');
  const [dia_inteiro, setDia_inteiro] = useState(false);

  const [dt_inicio, setDt_inicio] = useState('');
  const [hr_inicio, setHr_inicio] = useState('');
  const [dt_termino, setDt_termino] = useState('');
  const [hr_termino, setHr_termino] = useState('');

  const [local, setLocal] = useState('');
  const [link, setLink] = useState('');

  const [descricao, setDescricao] = useState('');
  const [destaque, setDestaque] = useState('');

  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const handleCategoria = useCallback(() => {
    const element = document.getElementById('TM-Categoria-Container');
    $(element).toggleClass('hide');
  }, []);

  const setColor = useCallback((item) => {
    const { cor, id } = item;

    const element = document.getElementById('TM-Categoria');
    $(element).css('background-color', cor);
    setId_categoria(id);

    const container = document.getElementById('TM-Categoria-Container');
    $(container).addClass('hide');

    const excluir = document.getElementById('TM-categoria-excluir');
    $(excluir).removeClass('text-danger');

    switch (cor) {
      case '': $(excluir).addClass('text-danger'); break;
      case '#F9F9FF': $(excluir).addClass('text-danger'); break;
      case '#FFEEAD': $(excluir).addClass('text-danger'); break;
      case '#FFCC5C': $(excluir).addClass('text-danger'); break;
      default: $(excluir).addClass('text-white');
    }
  }, []);

  const clearColor = useCallback(() => {
    const element = document.getElementById('TM-Categoria');
    $(element).css('background-color', '');
    setId_categoria(0);

    const container = document.getElementById('TM-Categoria-Container');
    $(container).addClass('hide');

    const excluir = document.getElementById('TM-categoria-excluir');
    $(excluir).removeClass('text-white');
    $(excluir).addClass('text-danger');
  }, []);

  const getCategoria = useCallback(() => {
    async function getCategoria() {
      const url = '/TsmPARAMETRO/RPARCAT_PAGINA';
      const categorias = await api.get(url, { auth: props.auth });
      setColorList(categorias.data.rparcat_regs);
    }
    getCategoria();
  }, [props]);

  const getFicha = useCallback((idTempoMov) => {
    async function getFicha(idTempoMov) {
      if (idTempoMov > 0) {
        const url = `/tsmTEMPOMOV/FICHA/${idTempoMov}`;
        const ficha = await api.get(url, { auth: props.auth });

        const {
          cor, id_categoria, titulo, privado, dt_inicio, dt_termino,
          local, link, descricao, dia_inteiro, destaque, alt_dhsis,
        } = ficha.data;

        setAlt_dhsis(alt_dhsis);
        setTitulo(titulo);
        setDia_inteiro(dia_inteiro);

        const DT_Inicio = dt_inicio.split(' ');
        const DT_Termino = dt_termino.split(' ');

        setDt_inicio(formatDataInput(DT_Inicio[0]));
        setHr_inicio(DT_Inicio[1]);

        setDt_termino(formatDataInput(DT_Termino[0]));
        setHr_termino(DT_Termino[1]);

        setLocal(local);
        setLink(link);

        setDescricao(descricao);
        setPrivado(privado);
        setDestaque(destaque);

        const item = { id: id_categoria, cor };
        setColor(item);
      }
    }
    getFicha(idTempoMov);
  }, [props, setColor]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { id, idTempoMov } = props.match.params;
      setFirst(false);
      setId(idTempoMov);
      setId_projeto(id);
      getCategoria();
      getFicha(idTempoMov);
    }
  }, [props, firstLoad, setColor, getCategoria, getFicha]);

  /// ATUALIZA FORM
  useEffect(() => {
    let hrInicio = hr_inicio;
    if (hrInicio === undefined) { hrInicio = '00:00'; }

    let hrTermino = hr_termino;
    if (hrTermino === undefined) { hrTermino = '23:59'; }

    const Form = {
      id: parseInt(id, 10),
      id_projeto: parseInt(id_projeto, 10),
      id_categoria: parseInt(id_categoria, 10),
      titulo,
      privado,
      dt_inicio: `${moment(dt_inicio).format('L')} ${hrInicio}`,
      dt_termino: `${moment(dt_termino).format('L')} ${hrTermino}`,
      local,
      dia_inteiro,
      link,
      descricao,
      destaque,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    };

    localStorage.setItem('TEMPOMOV-FICHA', JSON.stringify(Form));
  }, [id, id_projeto, id_categoria, titulo, privado,
    dt_inicio, hr_inicio, dt_termino, hr_termino, dia_inteiro,
    local, link, descricao, destaque, alt_dhsis, props.user]);

  return (
    <>
      {/*** LINHA 01 ***/}
      <Row>
        {/*** DATA ***/}
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
            <Input type="text" disabled value={id} />
          </FormGroup>
        </Col>
        {/*** CATEGORIA ***/}
        <Col sm={2} md={2} lg={1} xl={1}>
          <FormGroup style={{ width: 80 }}>
            <Label>Categoria</Label>
            <div className="TM-categoria-excluir p-2" onClick={() => clearColor()}>
              <FontAwesomeIcon icon={faTrash} id="TM-categoria-excluir" className="text-danger" />
            </div>
            <div

              id="TM-Categoria"
              className="form-control noselect"
              onClick={() => handleCategoria()}
            />
            <ul id="TM-Categoria-Container" className="noselect TM-Categoria-Container-ficha hide">
              { !!colorList && colorList.map((item) => (
                <li
                  style={{ background: item.cor }}
                  onClick={() => setColor(item)}
                >
                  &nbsp;
                </li>
              ))}
            </ul>
          </FormGroup>
        </Col>
        {/*** TITULO ***/}
        <Col sm={5} md={5} lg={7} xl={7}>
          <FormGroup>
            <Label>Titulo</Label>
            <Input
              type="text"
              maxLength={120}
              className="required"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** SITUACAO ***/}
        {/*<Col sm={3} md={3} lg={3} xl={3}>
               <FormGroup className="text-right">
                  <Label>Privado</Label>

                  <Checkbox info="Sim"
                              checked={ privado }
                              onClick={ e => setPrivado(e.target.checked) }
                  />
               </FormGroup>
            </Col> */}
        {/*** SITUACAO ***/}
        <Col sm={3} md={3} lg={3} xl={3}>
          <FormGroup className="text-right">
            <Label>Dia inteiro</Label>

            <Checkbox
              info="Sim"
              checked={dia_inteiro}
              onClick={(e) => setDia_inteiro(e.target.checked)}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr className="p-0 mt-1 mb-3" />
      <Row>
        {/*** DT INICIO ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Início</Label>
            <Input
              type="date"
              className="required"
              value={dt_inicio}
              onChange={(e) => setDt_inicio(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** HR INICIO ***/}
        <Col sm={3} md={3} lg={1} xl={1}>
          <FormGroup>
            <Label>&nbsp;</Label>
            <Input
              type="text"
              maxLength={5}
              placeholder="00:00"
              value={hr_inicio}
              onChange={(e) => setHr_inicio(formatHora(e.target.value))}
            />
          </FormGroup>
        </Col>
        {/*** DT TÉRMINO ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <FormGroup>
            <Label>Término</Label>
            <Input
              type="date"
              className="required"
              value={dt_termino}
              onChange={(e) => setDt_termino(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** HR TÉRMINO ***/}
        <Col sm={3} md={3} lg={1} xl={1}>
          <FormGroup>
            <Label>&nbsp;</Label>
            <Input
              type="text"
              maxLength={5}
              placeholder="00:00"
              value={hr_termino}
              onChange={(e) => setHr_termino(formatHora(e.target.value))}
            />
          </FormGroup>
        </Col>
        {/*** LOCAL ***/}
        <Col sm={4} md={4} lg={3} xl={3}>
          <FormGroup>
            <Label>Local</Label>
            <Input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** LINK ***/}
        <Col sm={4} md={4} lg={3} xl={3}>
          <FormGroup>
            <Label>Link</Label>
            <Input
              type="text"
              className="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr className="p-0 mt-1 mb-3" />
      <Row>
        {/*** DESCRIÇÃO ***/}
        <Col sm={6} md={7}>
          <FormGroup>
            <Label>Descrição</Label>
            <Input
              type="textarea"
              maxLength={2000}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** PRIVADO ***/}
        <Col sm={6} md={5}>
          <FormGroup>
            <Label>Privado</Label>
            <Input
              type="textarea"
              maxLength={2000}
              value={privado}
              onChange={(e) => setPrivado(e.target.value)}
            />
          </FormGroup>
        </Col>
        {/*** DESTAQUE ***/}
        <Col sm={12}>
          <FormGroup>
            <Label>Destaque</Label>
            <Input
              type="textarea"
              maxLength={2000}
              value={destaque}
              onChange={(e) => setDestaque(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  nomeProjeto: state.projeto.nomeProjeto,

  //fichaData: state.rsvp.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(TemposMovimentosFicha);
