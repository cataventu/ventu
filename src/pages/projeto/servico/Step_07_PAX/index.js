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
  TableButton, Modal, showMSG, Buttons, AutoCompletarV2,
} from '../../../../components';
import { getDados } from '../../../../functions/sistema';
import './style.css';

function Step07(props) {
  const { idServico } = props.match.params;
  const {
    AC_NomeReserva,
    AC_Pfisica,
    AC_Id_Pfisica,
  } = props;

  ////// TABELA
  const [firstLoad, setFirst] = useState(true);
  const [showTable, setShowTable] = useState('show');

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
  const [showForm, setShowForm] = useState('show');

  const [id, setId] = useState(0);
  const [linha, setLinha] = useState(0);
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
    setId(0);
    setLinha(0);

    setId_Pfisica('');
    setPfisica('');
    setNome_reserva('');
    setTipo('');

    setShowTable('show');
    setShowForm('hide');

    const { dispatch } = props;
    dispatch({ type: '@SET_FICHA_PAX_FORM_FALSE' });

    dispatch({ type: '@SET_AUTOCOMPLETAR_PFISICA', payload: '' });
    dispatch({ type: '@SET_AUTOCOMPLETAR_ID_PFISICA', payload: 0 });
    dispatch({ type: '@SET_AUTOCOMPLETAR_RESERVA_PFISICA', payload: '' });

    setResetEditar(true);
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
    localStorage.setItem('PROSERVICO_FORM_STEP_07', JSON.stringify(rpax_regs));
  }, [rpax_regs]);

  const handleEditar = useCallback((item, linha) => {
    const {
      id, id_pfisica, nome_completo, nome_reserva, tipo,
    } = item;

    const { dispatch } = props;

    setId(id);
    setLinha(linha);

    setId_Pfisica(id_pfisica);
    setNome_reserva(nome_reserva);
    setTipo(tipo);
    setPfisica(nome_completo);

    setResetEditar(true); /// Usado para corrigir editar do Auto Completar (gambiarra);
    parseInt(id, 10) === 0 ? setId(9999) : setId(id); /// Usado p/ corrigir btn editar;

    dispatch({ type: '@SET_FICHA_PAX_FORM_TRUE' });
  }, [props]);

  const handleAtualiza = useCallback((rpax_regs) => {
    const _temp = [];
    let linha = 0;

    rpax_regs.forEach((item) => {
      const {
        id, id_proservico, id_pfisica, pfisica, nome_completo, nome_reserva, tipo,
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
        id_pfisica,
        pfisica,
        nome_completo,
        nome_reserva,
        tipo,
        buttons,
      };
      linha += 1;
      _temp.push(newLine);
    });

    setRpax_regs(_temp);
    localStorage.setItem('PROSERVICO_FORM_STEP_07', JSON.stringify(_temp));
  }, [handleEditar, handleShowModal, props]);

  const handleSave = useCallback(() => {
    let Id;

    id === 9999 ? Id = 0 : Id = id;

    ////// NEW LINE
    const newLine = {
      id: Id,
      id_proservico,
      id_pfisica,
      pfisica,
      nome_completo: pfisica,
      nome_reserva,
      tipo,
      Buttons: '',
    };

    ////// CASO EDITAR
    if (id > 0) {
      const _temp = [];
      rpax_regs.forEach((item) => {
        item.linha === linha
          ? _temp.push(newLine)
          : _temp.push(item);
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
  }, [id, id_proservico, linha, id_pfisica, pfisica, nome_reserva, tipo, rpax_regs, handleAtualiza, handleClose]);

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
      localStorage.setItem('PROSERVICO_FORM_STEP_07', JSON.stringify(rpax_regs));
      setFirst(false);
    }
  }, [firstLoad, getTabelas, idServico]);

  /// RECEBE TABLE DATA
  useEffect(() => {
    const idUrl = idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const { id, rpax_regs } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        handleAtualiza(rpax_regs);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_07_FALSE' });
        //console.log('Atualizado Step 7');
      }
    }
  }, [props, flagAtualizado, handleAtualiza, idServico]);

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
    const { pro_vagas } = props.fichaData;
    switch (parseInt(props.tipo_servico, 10)) {
      /// AEREO
      case 1: setLimit_pax(1); break;
        /// HOSPEDAGEM
      case 2: setLimit_pax(props.hospedagem); break;
        /// VEÍCULO
      case 3: setLimit_pax(2); break;
        /// DEMAIS TIPOS SERVIÇO
      default: setLimit_pax(pro_vagas);
    }
  }, [props.fichaData, props.tipo_servico, props.hospedagem]);

  ////// AUTO COMPLETAR
  useEffect(() => {
    if (AC_Id_Pfisica <= 0) { return; }

    setPfisica(AC_Pfisica);
    setNome_reserva(AC_NomeReserva);
    setId_Pfisica(AC_Id_Pfisica);
  }, [AC_Pfisica, AC_Id_Pfisica, AC_NomeReserva]);

  /// AUTO COMPLETAR RESET
  useEffect(() => {
    if (resetEditar) { setResetEditar(false); }
  }, [resetEditar]);

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
          <Col sm={2} className="hide">
            <FormGroup>
              <Label>Id</Label>
              <Input
                type="number"
                disabled
                value={id}
              />
            </FormGroup>
          </Col>
          {/*** LINHA - OCULTO ***/}
          <Col sm={2} className="hide">
            <FormGroup>
              <Label>Linha</Label>
              <Input
                type="number"
                disabled
                value={linha}
              />
            </FormGroup>
          </Col>
          {/*** DISPLAY PESSOA FISICA CONSOLIDADOR ***/}
          <Col sm={8} md={8} lg={6} xl={6}>
            <FormGroup>
              <Label>Pessoa Física (Consolidado Rextur / KG Travel)</Label>
              <Input
                type="text"
                disabled
                value={pfisica}
              />
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 02 ***/}
        <Row>
          {/*** AC NOME ***/}
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
                editar={{ id: id_pfisica, value: pfisica, valueId: id_pfisica }}
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
      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.servicos.fichaData,
  form: state.servicos.Pax_ShowForm,

  hospedagem: state.servicos.tipo_hospedagem,
  tipo_servico: state.servicos.tipo_servico,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step07,

  AC_NomeReserva: state.autoCompletar.autoCompletarNomeReservaPFisica,
  AC_Pfisica: state.autoCompletar.autoCompletarPfisica,
  AC_Id_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(Step07);
