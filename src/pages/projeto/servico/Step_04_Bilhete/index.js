///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import {
  Buttons, Modal, TableButton, Checkbox,
} from '../../../../components';
import { formatData, formatDataInput, formatPta } from '../../../../functions/sistema';
import './style.css';

function Step03(props) {
  const hoje = moment().format('L');

  ////// TABELA
  const [firstLoad, setFirst] = useState(true);
  const [showTable, setShowTable] = useState('show');

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-id hide', classes: 'hide',
    },
    {
      dataField: 'linha', text: 'Linha', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-id hide', classes: 'hide',
    },
    {
      dataField: 'tour_code', text: 'Tour Code', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-tour-code',
    },
    {
      dataField: 'numero', text: 'Número Bilhete', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-bilhete',
    },
    {
      dataField: 'pta', text: 'PTA', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-pta',
    },
    {
      dataField: 'dt_emissao', text: 'Data Emissão', sort: true, headerClasses: 'bg-dark text-white tb-ficha03-dt-emissao',
    },
    {
      dataField: 'Buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-ficha03-buttons',
    },
  ];

  ////// FORMULARIO
  const [showForm, setShowForm] = useState('hide');

  const [id, setId] = useState(0);
  const [linha, setLinha] = useState(0);
  const [id_proservico, setId_proservico] = useState(0);
  const [numero, setNumero] = useState('');
  const [tour_code, setTour_code] = useState('');
  const [pta, setPta] = useState(false);
  const [dt_emissao, setDt_emissao] = useState(formatDataInput(hoje));

  const [deleteId, setDeleteId] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [flagAtualizado, setAtualizado] = useState(false);
  const [rbilhete_regs, setRbilhete_regs] = useState([]);

  const handleClose = useCallback(() => {
    setId(0);
    setLinha(0);
    setNumero('');
    setTour_code('');
    setPta('');
    setDt_emissao(formatDataInput(hoje));

    setShowTable('show');
    setShowForm('hide');

    const { dispatch } = props;
    dispatch({ type: '@SET_FICHA_BILHETE_FORM_FALSE' });
  }, [props, hoje]);

  const handleShowModal = useCallback((id) => {
    setDeleteId(id);
    setModalVisibility(true);
  }, []);

  const handleDelete = useCallback((value) => {
    for (let i = rbilhete_regs.length - 1; i >= 0; i -= 1) {
      if (rbilhete_regs[i].linha === value) {
        rbilhete_regs.splice(i, 1);
      }
    }
    setModalVisibility(false);
    localStorage.setItem('PROSERVICO_FORM_STEP_04', JSON.stringify(rbilhete_regs));
  }, [rbilhete_regs]);

  const handleEditar = useCallback((item, linha) => {
    const {
      id, numero, tour_code, pta, dt_emissao,
    } = item;
    const { dispatch } = props;

    setLinha(linha);
    setNumero(numero);
    setTour_code(tour_code);
    setPta(formatPta(pta));
    setDt_emissao(formatDataInput(dt_emissao));

    parseInt(id, 10) === 0 ? setId(9999) : setId(id); /// Usado p/ corrigir btn editar;

    dispatch({ type: '@SET_FICHA_BILHETE_FORM_TRUE' });
  }, [props]);

  const handleAtualiza = useCallback((rbilhete_regs) => {
    const temp = [];
    let linha = 0;

    rbilhete_regs.forEach((item) => {
      const {
        id, id_proservico, numero, tour_code, pta, dt_emissao,
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

      const Buttons = [buttonExcluir, buttonEditar];

      const newLine = {
        id,
        id_proservico,
        linha,
        numero,
        tour_code,
        pta: formatPta(pta),
        dt_emissao,
        Buttons,
      };
      linha += 1;
      temp.push(newLine);
    });

    setRbilhete_regs(temp);
    localStorage.setItem('PROSERVICO_FORM_STEP_04', JSON.stringify(temp));
  }, [handleEditar, handleShowModal, props]);

  const handleSave = useCallback(() => {
    let Id;
    id === 9999 ? Id = 0 : Id = id;

    ////// NEW LINE
    const newLine = {
      id: Id,
      linha,
      id_proservico,
      numero,
      tour_code,
      pta: formatPta(pta),
      dt_emissao: formatData(dt_emissao),
      Buttons: '',
    };

    ////// CASO EDITAR
    if (id > 0) {
      const temp = [];
      rbilhete_regs.forEach((item) => {
        if (item.linha === linha) {
          temp.push(newLine);
        } else {
          temp.push(item);
        }
      });
      handleAtualiza(temp);
    }

    ////// CASO NOVO REGISTRO
    if (id === 0) {
      const temp = rbilhete_regs;
      temp.push(newLine);
      handleAtualiza(temp);
    }

    handleClose();
  }, [id, linha, id_proservico, numero, tour_code, pta, dt_emissao, rbilhete_regs, handleAtualiza, handleClose]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setId_proservico(props.match.params.idServico);
      localStorage.setItem('PROSERVICO_FORM_STEP_04', JSON.stringify(rbilhete_regs));
      setFirst(false);
    }
  }, [props, firstLoad]);

  /// RECEBE TABLE DATA DA FICHA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const { id, rbilhete_regs } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        handleAtualiza(rbilhete_regs);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_04_FALSE' });
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
            data={rbilhete_regs}
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
      <div className={showForm}>
        <Row>
          {/*** LINHA 01 ***/}
          <Col sm={12} md={7} lg={7} xl={8}>
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
              {/*** LINHA - OCULTO ***/}
              <Col sm={2} className="hide">
                <FormGroup>
                  <Label>linha</Label>
                  <Input
                    type="number"
                    disabled
                    value={linha}
                  />
                </FormGroup>
              </Col>
              {/*** Tour Code ***/}
              <Col sm={2} md={2}>
                <FormGroup>
                  <Label>Tour Code</Label>
                  <Input
                    type="text"
                    className="email"
                    value={tour_code}
                    onChange={(e) => setTour_code(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/*** Nº Bilhete ***/}
              <Col sm={6} md={7} lg={6} xl={4}>
                <FormGroup>
                  <Label>Nº Bilhete</Label>
                  <Input
                    type="text"
                    className=""
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/*** PTA ***/}
              <Col sm={2} md={2}>
                <FormGroup className="ml-3">
                  <Label>&nbsp;</Label>
                  <Checkbox
                    info="PTA"
                    checked={pta}
                    onClick={(e) => setPta(e.target.checked)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          {/*** LINHA 02 ***/}
          <Col sm={12} md={5} lg={5} xl={4}>
            <Row>
              {/*** data emissao ***/}
              <Col sm={4} md={6} lg={5}>
                <FormGroup>
                  <Label>Data Emissão</Label>
                  <Input
                    type="date"
                    className="required"
                    value={dt_emissao}
                    onChange={(e) => setDt_emissao(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          {/*** LINHA 03 ***/}
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
      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,

  fichaData: state.servicos.fichaData,
  form: state.servicos.Bilhete_ShowForm,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step04,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(Step03);
