import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Button, Modal, ModalBody, ModalHeader, ModalFooter,
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';

import api from '../../../services/api';

const $ = require('jquery');

const CalendarModal = (props) => {
  const [firstLoad, setFirst] = useState(true);
  const [colorList, setColorList] = useState([]);

  const [fastEventColorId, setfastEventColorId] = useState('');
  const [fastEventTitulo, setfastEventTitulo] = useState('');

  const handleCategoria = useCallback(() => {
    const element = document.getElementById('TM-Categoria-Container');
    $(element).toggleClass('hide');
  }, []);

  const setColor = useCallback((item) => {
    const { cor, id } = item;
    const element = document.getElementById('TM-Categoria');
    $(element).css('background-color', cor);
    setfastEventColorId(id);
    handleCategoria();
  }, [handleCategoria]);

  const closeFastEvent = useCallback(() => {
    const { dispatch } = props;
    dispatch({ type: '@HIDE_MODAL_CALENDAR' });
  }, [props]);

  const saveFastEvent = useCallback(() => {
    const { dispatch, dados, auth } = props;
    const {
      id, id_projeto, dt_inicio, dt_termino,
    } = dados;

    const formSave = {
      id,
      id_projeto: parseInt(id_projeto, 10),
      dt_inicio,
      dt_termino,
      titulo: fastEventTitulo,
      id_categoria: fastEventColorId,
    };

    async function saveFastEvent() {
      const url = '/tsmTEMPOMOV/GRAVA';
      const res = await api.put(url, formSave, { auth });

      dispatch({ type: '@SET_MODAL_CALENDAR_SAVE_TRUE' });
    }

    closeFastEvent();
    saveFastEvent();
    setfastEventColorId(0);
    setfastEventTitulo('');
  }, [props, fastEventTitulo, fastEventColorId, closeFastEvent]);

  const getCategoria = useCallback(() => {
    async function getCategoria() {
      const { auth } = props;
      const url = '/TsmPARAMETRO/RPARCAT_PAGINA';
      const categorias = await api.get(url, { auth });
      setColorList(categorias.data.rparcat_regs);
    }
    getCategoria();
  }, [props]);

  /// First Load
  useEffect(() => {
    if (firstLoad) {
      getCategoria();
      setFirst(false);
    }
  }, [props, firstLoad, getCategoria]);

  return (
    <Modal className="modal-container shadow" isOpen={props.modalCalendarVisibility}>
      <ModalHeader className="m-0 p-0 pt-1" />
      <ModalBody className="modal-body m-0 pt-3 pr-4 pl-4">
        <h4 className="p-0 m-0 pb-4 text-left text-roxo-ventu">Incluir Evento</h4>
        <Row className="text-left">

          <Col sm={3}>
            <FormGroup>
              <Label>Categoria</Label>
              <div

                id="TM-Categoria"
                className="form-control noselect"
                onClick={() => handleCategoria()}
              />
              <ul id="TM-Categoria-Container" className="noselect TM-Categoria-Container hide">

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

          <Col sm={9}>
            <FormGroup>
              <Label>Descrição</Label>
              <Input
                type="text"
                maxLength={120}
                value={fastEventTitulo}
                onChange={(e) => setfastEventTitulo(e.target.value)}
              />
            </FormGroup>
          </Col>

        </Row>
      </ModalBody>
      <ModalFooter className="modal-footer p-2">
        <Button color="filtro-interno" className="pr-2 pl-2" onClick={() => closeFastEvent()}>
          <FontAwesomeIcon icon={faTimes} className="p-0 m-0 cursor mr-2 mt-1 " />
               Fechar
        </Button>
        <Button color="primary" className="pr-2 pl-2" onClick={() => saveFastEvent()}>
          <FontAwesomeIcon icon={faSave} className="p-0 m-0 cursor mr-2 mt-1" />
               Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CalendarModal;
