///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useCallback, useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  TableButton, Modal, Buttons, AutoCompletarV2, showMSG,
} from '../../../../components';
import { getDados } from '../../../../functions/sistema';
import './style.css';

function Step02(props) {
  const { idServico } = props.match.params;

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
      dataField: 'nome_completo', text: 'PAX', sort: true, headerClasses: 'bg-dark text-white tb-ficha07-pax',
    },
    {
      dataField: 'nome_reserva', text: 'Nome reserva', sort: true, headerClasses: 'bg-dark text-white tb-ficha07-nome-reserva',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-ficha07-buttons',
    },
  ];

  ////// FORMULARIO
  const [showForm, setShowForm] = useState('hide');

  const [id, setId] = useState(0);
  const [id_proservico, setId_proservico] = useState(0);

  const [id_pfisica, setId_Pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [resetEditar, setResetEditar] = useState(false);
  const [nome_reserva, setNome_reserva] = useState('');

  const [listaTipo, setListaTipo] = useState('');
  const [tipo, setTipo] = useState('');

  const [deleteId, setDeleteId] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [flagAtualizado, setAtualizado] = useState(false);
  const [limit_pax, setLimit_pax] = useState(0);
  const [rpax_regs, setRpax_regs] = useState([]);

  const handleClose = useCallback(() => {
    setId_Pfisica('');
    setPfisica('');
    setNome_reserva('');
    setTipo('');

    setShowTable('show');
    setShowForm('hide');

    setId(0);
    setResetEditar(true);

    const { dispatch } = props;
    dispatch({ type: '@SET_FICHA_PAX_FORM_FALSE' });
  }, [props]);

  const handleShowModal = useCallback((id) => {
    setDeleteId(id);
    setModalVisibility(true);
  }, []);

  const handleDelete = useCallback((value) => {
    for (let i = rpax_regs.length - 1; i >= 0; i -= 1) {
      if (rpax_regs[i].linha === value) {
        rpax_regs.splice(i, 1);
      }
    }
    setModalVisibility(false);
  }, [rpax_regs]);

  const handleEditar = useCallback((item) => {
    const {
      id, id_pfisica, nome_completo, nome_reserva, tipo,
    } = item;

    const { dispatch } = props;

    setId_Pfisica(id_pfisica);
    setNome_reserva(nome_reserva);
    setTipo(tipo);
    setPfisica(nome_completo);

    ////// Usado para corrigir editar do Auto Completar (gambiarra);
    setResetEditar(true);
    if (parseInt(id, 10) === 0) {
      setId(9999);
    } else {
      setId(id);
    }

    dispatch({ type: '@SET_FICHA_PAX_FORM_TRUE' });
  }, [props]);

  const handleAtualiza = useCallback((rpax_regs) => {
    const _temp = [];
    let linha = 0;

    rpax_regs.forEach((item) => {
      const {
        id, id_pfisica, nome_completo, nome_reserva, tag, tipo,
      } = item;

      const deleteLinha = linha;

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
          click={() => handleEditar(item)}
        />
      );

      const buttons = [buttonExcluir, buttonEditar];

      const newLine = {
        id,
        linha,
        tag,
        id_pfisica,
        nome_completo,
        nome_reserva,
        listaTipo,
        tipo,
        buttons,
      };
      linha += 1;
      _temp.push(newLine);
    });

    setRpax_regs(_temp);
  }, [handleEditar, handleShowModal, listaTipo, props]);

  const handleSave = useCallback(() => {
    const { autoCompletarPfisica } = props;

    ////// NEW LINE
    const newLine = {
      id,
      id_proservico,
      id_pfisica,
      pfisica,
      nome_completo: autoCompletarPfisica,
      nome_reserva,
      listaTipo,
      tipo,
      Buttons: '',
    };

    ////// CASO EDITAR
    if (id > 0) {
      const _temp = [];
      rpax_regs.forEach((item) => {
        if (item.id === id) {
          _temp.push(newLine);
        } else {
          _temp.push(item);
        }
      });
      handleAtualiza(_temp);
    }

    ////// CASO NOVO REGISTRO
    if (id === 0) {
      const _temp = rpax_regs;
      _temp.push(newLine);
      handleAtualiza(_temp);
    }

    handleClose();
  }, [id, id_proservico, id_pfisica, pfisica, nome_reserva, listaTipo, tipo, rpax_regs, handleAtualiza, handleClose, props]);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      ////// STATUS
      const forma = await getDados(props, '/TsmSISTEMA/TIPO_PAX_TABELA', '');
      setListaTipo(forma);
    }
    getTabelas();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getTabelas();
      setId_proservico(idServico);
      setFirst(false);
    }
  }, [firstLoad, getTabelas, idServico]);

  /// TABLE DATA
  useEffect(() => {
    const { fichaData } = props;
    const { id, rpax_regs } = fichaData;
    if (!flagAtualizado && id > 0) {
      handleAtualiza(rpax_regs);
      setAtualizado(true);
      //console.log('Atualizado Step 2');
    }
  }, [props, flagAtualizado, handleAtualiza]);

  /// ATUALIZA FORM
  useEffect(() => {
    const form = [];
    rpax_regs.forEach((item) => {
      const {
        id, id_pfisica, nome_completo, nome_reserva, tag, tipo,
      } = item;
      form.push({
        id, id_pfisica, nome_completo, nome_reserva, tag, tipo,
      });
    });
    localStorage.setItem('ROOMINGLIST_FORM_STEP_02', JSON.stringify({ rpax_regs: form }));
  }, [rpax_regs]);

  /// EXIBE / OCULTA FORM (MONITORA LIMITE)
  useEffect(() => {
    if (props.form) {
      if ((limit_pax === 0 || rpax_regs.length >= limit_pax) && id === 0) {
        showMSG('Limite de PAX', 'Verificar o número de vagas refente ao serviço.', 'error', 3000);
        handleClose();
      }

      setResetEditar(false);
      setShowTable('hide');
      setShowForm('show');
    } else {
      handleClose();
    }
  }, [props.form, id, id_pfisica, rpax_regs, limit_pax, handleClose]);

  /// LIMITE INCLUIR PAX
  useEffect(() => {
    setLimit_pax(props.hos_tipo);
  }, [props.hos_tipo]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
    setNome_reserva(props.autoCompletarNomeReservaPFisica);
  }, [props.autoCompletarId_Pfisica, props.autoCompletarNomeReservaPFisica]);

  return (
    <>
      {/*** TABELA ***/}
      <Row className={showTable}>
        <Col sm={12} className="p-0">
          <BootstrapTable
            keyField="id"
            data={rpax_regs}
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

          {/*** NOME ***/}
          <Col sm={8} md={6} lg={4} xl={4}>
            <FormGroup>
              <Label>Pessoa Física</Label>
              <AutoCompletarV2
                {...props}
                value={pfisica}
                valueId={id_pfisica}
                tabela="PFISICA"
                nomeReserva
                campo=""
                disabled={false}
                visible
                editar={{ id, value: pfisica, valueId: id_pfisica }}
                resetEditar={resetEditar}
              />
            </FormGroup>
          </Col>

          {/*** NOME RESERVA ***/}
          <Col sm={2} md={2} lg={2} xl={2}>
            <FormGroup>
              <Label>Nome Reserva</Label>
              <Input
                type="text"
                disabled
                value={nome_reserva}
              />
            </FormGroup>
          </Col>

          {/*** TIPO ***/}
          <Col sm={2} md={1} lg={1} xl={1}>
            <FormGroup>
              <Label>Tipo</Label>
              <Input
                type="select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="0">...</option>

                { !!listaTipo && listaTipo.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}

              </Input>
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 02 ***/}
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
      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.roomingList.fichaData,
  hos_tipo: state.roomingList.hos_tipo,
  form: state.servicos.Pax_ShowForm,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  autoCompletarNomeReservaPFisica: state.autoCompletar.autoCompletarNomeReservaPFisica,
  autoCompletarPfisica: state.autoCompletar.autoCompletarPfisica,
  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
});
export default connect(() => (mapState))(Step02);
