///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Buttons, Modal, TableButton } from '../../../../components';
import { formatData, formatDataInput, formatHora } from '../../../../functions/sistema';
import './style.css';

function Step08(props) {
  const hoje = moment().format('L');

  ////// TABELA
  const [firstLoad, setFirst] = useState(true);
  const [showTable, setShowTable] = useState('hide');

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'bg-dark text-white tb-ficha07-id hide', classes: 'hide',
    },
    {
      dataField: 'linha', text: 'Linha', sort: true, headerClasses: 'bg-dark text-white tb-ficha07-id hide', classes: 'hide',
    },
    {
      dataField: 'cia', text: 'Cia', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-cia',
    },
    {
      dataField: 'voo', text: 'Voo', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-voo',
    },
    {
      dataField: 'origem', text: 'Origem', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-prefixo',
    },
    {
      dataField: 'dtemb', text: 'Data', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-data',
    },
    {
      dataField: 'hremb', text: 'Hora', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-hora',
    },
    {
      dataField: 'destino', text: 'Destino', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-prefixo',
    },
    {
      dataField: 'dtdes', text: 'Data', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-data',
    },
    {
      dataField: 'hrdes', text: 'Hora', sort: true, headerClasses: 'bg-dark text-white tb-ficha08-hora',
    },
    {
      dataField: 'classe', text: 'Classe', sort: true, headerClasses: 'bg-dark text-white center tb-ficha08-classe', classes: 'text-center',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-ficha08-buttons',
    },
  ];

  ////// FORMULARIO
  const [showForm, setShowForm] = useState('hide');

  const [id, setId] = useState(0);
  const [linha, setLinha] = useState(0);
  const [id_proservico, setId_proservico] = useState(0);

  const [cia, setCia] = useState('');
  const [voo, setVoo] = useState('');

  const [dtemb, setDtemb] = useState(formatDataInput(hoje));
  const [hremb, setHremb] = useState('00:00');
  const [id_origem, setId_Origem] = useState(0);
  const [origem, setOrigem] = useState('');
  const [dorigem, setDOrigem] = useState('');

  const [dtdes, setDtdes] = useState(formatDataInput(hoje));
  const [hrdes, setHrdes] = useState('00:00');
  const [id_destino, setId_Destino] = useState(0);
  const [destino, setDestino] = useState('');
  const [ddestino, setDDestino] = useState('');

  const [tipo, setTipo] = useState('');
  const [classe, setClasse] = useState('');
  const [farebasis, setFarebasis] = useState('');

  const [deleteId, setDeleteId] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [flagAtualizado, setAtualizado] = useState(false);
  const [ritinerario_regs, setRitinerario_regs] = useState([]);

  const handleClose = useCallback(() => {
    setId(0);
    setLinha(0);

    setCia('');
    setVoo('');

    setDtemb(formatDataInput(hoje));
    setHremb('');
    setOrigem('');

    setDtdes(formatDataInput(hoje));
    setHrdes('');
    setDestino('');

    setTipo('');
    setClasse('');
    setFarebasis('');

    setShowTable('show');
    setShowForm('hide');

    const { dispatch } = props;
    dispatch({ type: '@SET_FICHA_ITINERARIO_FORM_FALSE' });
  }, [props, hoje]);

  const handleShowModal = useCallback((id) => {
    setDeleteId(id);
    setModalVisibility(true);
  }, []);

  const handleDelete = useCallback((value) => {
    for (let i = ritinerario_regs.length - 1; i >= 0; i -= 1) {
      if (ritinerario_regs[i].linha === value) {
        ritinerario_regs.splice(i, 1);
      }
    }
    setModalVisibility(false);
    localStorage.setItem('PROSERVICO_FORM_STEP_08', JSON.stringify(ritinerario_regs));
  }, [ritinerario_regs]);

  const handleEditar = useCallback((item, linha) => {
    const {
      id, cia, voo, dtemb, hremb, id_origem, origem, dorigem, dtdes, hrdes, id_destino, destino, ddestino, tipo, classe, farebasis,
    } = item;
    const { dispatch } = props;

    setId(id);
    setLinha(linha);

    setCia(cia);
    setVoo(voo);

    setDtemb(formatDataInput(dtemb));
    setHremb(hremb);
    setOrigem(origem);
    setDOrigem(dorigem);
    setId_Origem(id_origem);

    setDtdes(formatDataInput(dtdes));
    setHrdes(hrdes);
    setDestino(destino);
    setDDestino(ddestino);
    setId_Destino(id_destino);

    setTipo(tipo);
    setClasse(classe);
    setFarebasis(farebasis);

    parseInt(id, 10) === 0 ? setId(9999) : setId(id); /// Usado p/ corrigir btn editar;

    dispatch({ type: '@SET_FICHA_ITINERARIO_FORM_TRUE' });
  }, [props]);

  const handleAtualiza = useCallback((ritinerario_regs) => {
    const _temp = [];
    let linha = 0;

    ritinerario_regs.forEach((item) => {
      const {
        id, id_proservico, cia, voo, dtemb, hremb, id_origem, origem, dorigem, dtdes,
        hrdes, id_destino, destino, ddestino, tipo, classe, farebasis,
      } = item;

      const deleteLinha = linha;
      const editarLinha = linha;

      const buttonExcluir = (
        <TableButton
          action="Excluir"
          permission={props}
          click={() => handleShowModal(deleteLinha)}
        />
      );

      const buttonEditar = (
        <TableButton
          action="Editar"
          permission={props}
          click={() => handleEditar(item, editarLinha)}
        />
      );

      const buttons = [buttonExcluir, buttonEditar];

      const newLine = {
        id,
        id_proservico,
        linha,
        cia,
        voo,
        dtemb,
        hremb,
        id_origem,
        origem,
        dorigem,
        dtdes,
        hrdes,
        id_destino,
        destino,
        ddestino,
        tipo,
        classe,
        farebasis,
        buttons,
      };
      linha += 1;
      _temp.push(newLine);
    });

    setRitinerario_regs(_temp);
    localStorage.setItem('PROSERVICO_FORM_STEP_08', JSON.stringify(_temp));
  }, [handleEditar, handleShowModal, props]);

  const handleSave = useCallback(() => {
    let Id;
    id === 9999 ? Id = 0 : Id = id;

    ////// NEW LINE
    const newLine = {
      id: Id,
      id_proservico,
      cia,
      voo,
      dtemb: formatData(dtemb),
      hremb,
      id_origem,
      origem,
      dorigem,
      dtdes: formatData(dtdes),
      hrdes,
      id_destino,
      destino,
      ddestino,
      tipo,
      classe,
      farebasis,
      Buttons: '',
    };

    ////// CASO EDITAR
    if (id > 0) {
      const _temp = [];
      ritinerario_regs.forEach((item) => {
        item.linha === linha
          ? _temp.push(newLine)
          : _temp.push(item);
      });
      handleAtualiza(_temp);
    }

    ////// CASO NOVO REGISTRO
    if (id === 0) {
      const _temp = ritinerario_regs;
      _temp.push(newLine);
      handleAtualiza(_temp);
    }

    handleClose();
  }, [id, linha, id_proservico, cia, voo, dtemb, hremb, id_origem, origem, dorigem, dtdes, hrdes, id_destino, destino, ddestino, tipo, classe, farebasis, ritinerario_regs, handleAtualiza, handleClose]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setId_proservico(props.match.params.idServico);
      localStorage.setItem('PROSERVICO_FORM_STEP_08', JSON.stringify(ritinerario_regs));
      setFirst(false);
    }
  }, [props, firstLoad]);

  /// RECEBE TABLE DATA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const { id, ritinerario_regs } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        handleAtualiza(ritinerario_regs);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_08_FALSE' });
        //console.log('Atualizado Step 8');
      }
    }
  }, [props, flagAtualizado, handleAtualiza]);

  /// EXIBE / OCULTA FORM
  useEffect(() => {
    if (props.form) {
      setShowTable('hide');
      setShowForm('show');
    } else {
      setShowTable('show');
      setShowForm('hide');
    }
  }, [props.form]);

  return (
    <>
      {/*** TABELA ***/}
      <Row className={showTable}>
        <Col sm={12} className="p-0">
          <BootstrapTable
            keyField="id"
            data={ritinerario_regs}
            classes="table-striped table-movimento"
            columns={tableColumns}
            bootstrap4
            bordered={false}
            pagination={paginationFactory({
              sizePerPage: 25,
              sizePerPageList: [5, 10, 25, 50, 100],
            })}
          />
        </Col>
      </Row>

      {/*** MODAL DELETE ***/}
      <Modal
        open={modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => setModalVisibility(false)}
        sim={() => handleDelete(deleteId)}
      />

      {/*** FORMULARIO ***/}
      <Row className={showForm}>
        <Col sm={12}>
          {/*** LINHA 01 ***/}
          <Row>
            {/*** ID - OCULTO ***/}
            <Col sm={2} md={2} lg={2} xl={2} className="hide">
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="number"
                  disabled
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Cia ***/}
            <Col sm={2} md={2} lg={2} xl={1}>
              <FormGroup>
                <Label>Cia</Label>
                <Input
                  type="text"
                  value={cia}
                  onChange={(e) => setCia(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Voo ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Voo</Label>
                <Input
                  type="text"
                  value={voo}
                  onChange={(e) => setVoo(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Classe ***/}
            <Col sm={4} md={2} lg={2} xl={1}>
              <FormGroup>
                <Label>Classe</Label>
                <Input
                  type="text"
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Firebasis ***/}
            <Col sm={2} md={2} lg={2} xl={1}>
              <FormGroup>
                <Label>Firebasis</Label>
                <Input
                  type="text"
                  value={farebasis}
                  onChange={(e) => setFarebasis(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 02 ***/}
          <Row>
            {/*** Origem ***/}
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Origem</Label>
                <Input
                  type="text"
                  value={origem}
                  maxLength={3}
                  onChange={(e) => setOrigem(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Data Embarque ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={dtemb}
                  onChange={(e) => setDtemb(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Hora Embarque ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Hora</Label>
                <Input
                  type="text"
                  placeholder="00:00"
                  maxLength={5}
                  value={hremb}
                  onChange={(e) => setHremb(formatHora(e.target.value))}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*** Destino ***/}
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Destino</Label>
                <Input
                  type="text"
                  value={destino}
                  maxLength={3}
                  onChange={(e) => setDestino(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Data Destino ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={dtdes}
                  onChange={(e) => setDtdes(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** Hora Destino ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Hora</Label>
                <Input
                  type="text"
                  placeholder="00:00"
                  maxLength={5}
                  value={hrdes}
                  onChange={(e) => setHrdes(formatHora(e.target.value))}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 03 ***/}
          <Row>
            <Col sm={12}>
              <Row>
                {/*** SAVE ***/}
                <Col sm={12} className="pt-3">
                  <Buttons
                    onClick={() => handleSave()}
                    description="Salvar"
                    color="green"
                    title="Salva todas as informações."
                  />
                  <Buttons
                    onClick={() => handleClose()}
                    description="Fechar"
                    color="gray"
                    title="Fechar janela."
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.servicos.fichaData,
  form: state.servicos.Itinerario_ShowForm,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step08,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(Step08);
