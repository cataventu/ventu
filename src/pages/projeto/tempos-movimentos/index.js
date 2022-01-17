///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import moment from 'moment';
import 'moment/locale/pt-br';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import api from '../../../services/api';
import {
  TableButton, ButtonSwitch, Modal, TabsProjeto, Buttons, PageTitle,
} from '../../../components';
import CalendarModal from './Modal';
import {
  handleSidebar, hideModal, deleteRegistro, showModal,
} from '../../../functions/sistema';
import { resetNomeProjeto } from '../../../functions/projeto';
import {
  getTempoMovPagina, showTooltipCalendar, removeTooltipCalendar, editTM, goToAnexoFicha,
} from '../../../functions/projeto/tempos-movimentos';
import './style.css';

require('fullcalendar');
const $ = require('jquery');

function TemposMovimentos(props) {
  const [firstLoad, setFirst] = useState(true);

  const [visibilityCardsContainer, setVisibilityCardsContainer] = useState('exibe');
  const [visibilityCards, setVisibilityCards] = useState('');

  const [visibilityTableContainer, setVisibilityTableContainer] = useState('');
  const [visibilityTable, setVisibilityTable] = useState('hide');
  const [eventosLista, setEventosLista] = useState([]);

  const [flagMove, setFlagMove] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  ////// FAST EVENT
  const [fastEventDados, setfastEventDados] = useState('');

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'p-0 pl-3', headerClasses: 'bg-dark text-white tb-tm-id',
    },
    {
      dataField: 'cor', text: 'Categoria', sort: false, classes: 'p-0', headerClasses: 'bg-dark text-white tb-tm-categoria',
    },
    {
      dataField: 'titulo', text: 'Título', sort: true, classes: 'p-0 pl-3 ', headerClasses: 'bg-dark text-white tb-tm-titulo',
    },
    {
      dataField: 'dt_inicio', text: 'Início', sort: true, classes: 'p-0 pr-3 text-right', headerClasses: 'bg-dark text-white tb-tm-dt-inicio',
    },
    {
      dataField: 'dt_termino', text: 'Término', sort: true, classes: 'p-0 pr-3 text-right', headerClasses: 'bg-dark text-white tb-tm-dt-termino',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'p-0 pr-3 text-right', headerClasses: 'bg-dark text-white tb-tm-buttons',
    },
  ];

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${props.match.params.id}/tempos-movimentos/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
    <div className="painel-container-switch">
      <ButtonSwitch {...props} opcao1="Cards" opcao2="Tabela" top={2} />
    </div>,
  ];

  const handleModalCalendar = useCallback((visibility) => {
    const { dispatch } = props;
    visibility
      ? dispatch({ type: '@SHOW_MODAL_CALENDAR' })
      : dispatch({ type: '@HIDE_MODAL_CALENDAR' });
  }, [props]);

  const setTableVisible = useCallback(() => {
    setVisibilityCardsContainer('');
    setTimeout(() => setVisibilityCards('hide'), 500);

    setTimeout(() => setVisibilityTable(''), 400);
    setTimeout(() => setVisibilityTableContainer('exibe'), 400);
  }, []);

  const setCardVisible = useCallback(() => {
    setTimeout(() => setVisibilityCards('show'), 300);
    setTimeout(() => setVisibilityCardsContainer('exibe'), 350);

    setVisibilityTableContainer('');
    setTimeout(() => setVisibilityTable('hide'), 500);
  }, []);

  const selectDay = useCallback((element) => {
    const { _d } = element;
    const day = moment(_d).add(1, 'day').format('L');

    setfastEventDados({
      id: 0,
      id_projeto: props.match.params.id,
      dt_inicio: `${day} 00:00:00`,
      dt_termino: `${day} 23:59:59`,
      auth: props.auth,
    });

    handleModalCalendar(true);
  }, [props, handleModalCalendar]);

  const moveEvent = useCallback((element) => {
    const { title } = element;

    setTimeout(() => {
      const evento = document.getElementsByClassName('fc-title');
      for (let i = 0; i < evento.length; i += 1) {
        if (evento[i].textContent === title) {
          setFlagMove(true);
          evento[i].click();
        }
      }
    }, 600);
  }, [setFlagMove]);

  const updateCalendar = useCallback(() => {
    async function getPagina(form) {
      const pagina = await getTempoMovPagina(props, form);

      const eventos = [];
      pagina.data.forEach((item) => {
        const {
          id, id_projeto, titulo, dt_inicio, dt_termino, dia_inteiro, categoria, id_categoria, cor,
        } = item;

        const buttonEditar = (
          <TableButton
            action="Editar"
            permission={props}
            click={() => editTM(props, item)}
          />
        );

        const buttonExcluir = (
          <TableButton
            action="Excluir"
            permission={props}
            click={() => showModal(props, id)}
          />
        );

        const buttonAnexar = (
          <TableButton
            action="Anexar"
            click={() => goToAnexoFicha(props, id)}
            permission={props}
          />
        );
        eventos.push({
          id,
          id_projeto,
          titulo: titulo.toUpperCase(),
          title: `ID ${id}: ${titulo.toUpperCase()}`,
          description: '',
          allDay: dia_inteiro,
          start: dt_inicio,
          end: dt_termino,
          dt_inicio: moment(dt_inicio).format('L LTS'),
          dt_termino: moment(dt_termino).format('L LTS'),
          url: '',
          categoria,
          id_categoria,
          color: cor,
          cor: <div style={{
            backgroundColor: cor, color: cor, width: 100, height: 35,
          }}
          />,
          buttons: [buttonExcluir, buttonAnexar, buttonEditar],
        });
      });

      setEventosLista(eventos);
      $('#fullcalendar').fullCalendar('removeEvents');
      $('#fullcalendar').fullCalendar('addEventSource', eventos);
    }

    const title = document.getElementsByClassName('fc-center')[0].innerText;
    //const calendar = { title: title }

    let mes;
    let ano;

    //const { title } = calendar;
    const { id: id_projeto } = props.match.params;

    const titulo = title.split(' ');

    /// CALENDÁRIO MENSAL
    if (titulo.length === 2) {
      switch (titulo[0]) {
        case 'Janeiro': mes = 1; break;
        case 'Fevereiro': mes = 2; break;
        case 'Março': mes = 3; break;
        case 'Abril': mes = 4; break;
        case 'Maio': mes = 5; break;
        case 'Junho': mes = 6; break;
        case 'Julho': mes = 7; break;
        case 'Agosto': mes = 8; break;
        case 'Setembro': mes = 9; break;
        case 'Outubro': mes = 10; break;
        case 'Novembro': mes = 11; break;
        case 'Dezembro': mes = 12; break;
        default: mes = 1;
      }

      const indexAno = 1;
      ano = titulo[indexAno];

      /// CALENDÁRIO SEMANAL
    } else {
      switch (titulo[titulo.length - 3]) {
        case 'Jan': mes = 1; break;
        case 'Fev': mes = 2; break;
        case 'Mar': mes = 3; break;
        case 'Abr': mes = 4; break;
        case 'Mai': mes = 5; break;
        case 'Jun': mes = 6; break;
        case 'Jul': mes = 7; break;
        case 'Ago': mes = 8; break;
        case 'Set': mes = 9; break;
        case 'Out': mes = 10; break;
        case 'Nov': mes = 11; break;
        case 'Dez': mes = 12; break;
        default: mes = 1;
      }

      ano = titulo[titulo.length - 1];
    }

    const form = {
      id_projeto,
      mes,
      ano,
    };

    getPagina(form);
  }, [props]);

  const renderCalendar = useCallback(() => {
    const header = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek',
      //right: "month, agendaWeek, agendaDay"
    };

    const buttonText = {
      prev: 'voltar',
      next: 'próximo',
      prevYear: 'ano anterior',
      nextYear: 'próximo ano',
      year: 'Ano',
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    };

    $('#fullcalendar').fullCalendar({
      columnHeader: true,
      weekNumbers: false,
      eventLimit: false,
      editable: true,

      handleWindowResize: true,
      windowResizeDelay: 100,

      locale: 'pt-br',
      header,
      buttonText,

      dayClick: (e) => selectDay(e),
      eventClick: (e) => setSelectedEvent(e),
      eventDragStop: (e, z) => moveEvent(e, z),

      viewRender: () => updateCalendar(),

      eventMouseover: showTooltipCalendar,
      eventMouseout: removeTooltipCalendar,

      /// RIGHT CLICK
      //eventRender: function (event, element) {
      //element.bind('mousedown', function (e) {
      //removeTooltipCalendar();
      //if (parseInt(e.which) === 3) {

      //eventMenuCalendar(event)
      //}
      //});
      //},

      events: [],
    });
  }, [moveEvent, selectDay, updateCalendar]);

  const saveNewDate = useCallback((Event) => {
    async function saveNewDate(Event) {
      const url = '/tsmTEMPOMOV/MOVE';
      await api.put(url, Event, { auth: props.auth });
    }
    saveNewDate(Event);
  }, [props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      resetNomeProjeto(props);
      handleSidebar(props.dispatch, props.sidebar);
      renderCalendar();
      setFirst(false);
    }
  }, [props, firstLoad, selectDay, moveEvent, renderCalendar]);

  ////// ALTERNA CARDS E TABLE
  useEffect(() => {
    switch (props.switchChecked) {
      case true: setTableVisible(); break;
      case false: setCardVisible(); break;
      default: setCardVisible(); break;
    }
  }, [props.switchChecked, setCardVisible, setTableVisible]);

  ////// SAVE FASTEVENT
  useEffect(() => {
    const { dispatch, modalCalendarSave } = props;
    if (modalCalendarSave) {
      const title = document.getElementsByClassName('fc-center')[0].innerText;
      updateCalendar({ title });
      dispatch({ type: '@SET_MODAL_CALENDAR_SAVE_FALSE' });
    }
  }, [props, updateCalendar]);

  ////// MOVE / EDIT EVENT
  useEffect(() => {
    const { id, start } = selectedEvent;

    /// MOVE
    if (flagMove && !!id) {
      const Event = {
        id,
        id_projeto: parseInt(props.match.params.id, 10),
        dt_inicio: moment(start).format('L'),
        alt_usuario: props.user.id,
      };

      saveNewDate(Event);

      setSelectedEvent({});
      setFlagMove(false);
    }

    /// CLICK
    if (!flagMove && !!id) {
      editTM(props, selectedEvent);
    }
  }, [props, flagMove, selectedEvent, saveNewDate]);

  ////// DELETE
  useEffect(() => {
    const { dispatch, flagDelete } = props;
    if (flagDelete) {
      dispatch({ type: '@SET_TEMPOMOV_DELETE_FALSE' });
      updateCalendar();
    }
  }, [props, updateCalendar]);

  ////// FORCE UPDATE TABLE BUTTONS
  useEffect(() => {
    updateCalendar();
  }, [props.visibilitySubPages, updateCalendar]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Tempos & Movimentos"
          buttons={ActionButtons}
          voltar
          linkTo="/projeto/painel"
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => deleteRegistro(props, '/TsmTEMPOMOV/EXCLUI/', '@SET_TEMPOMOV_DELETE_TRUE')}
        />

        <CalendarModal
          {...props}
          dados={fastEventDados}
          fechar={() => handleModalCalendar(false)}
        />

        <TabsProjeto ativo={6} props={props} />

        <Row className={`pl-3 pr-3 TM-container-calendar ${visibilityCardsContainer}`}>
          <Card className={visibilityCards}>
            <CardBody>
              <Row className="p-3">
                <div id="fullcalendar" />
              </Row>
            </CardBody>
          </Card>
        </Row>

        <Row className={`pb-0 TM-container-table ${visibilityTableContainer}`}>
          <Col sm={12}>
            <Card className={visibilityTable}>
              <CardHeader />
              <CardBody className="pt-0">
                <BootstrapTable
                  keyField="id"
                  data={eventosLista}
                  classes="table-striped table-movimento"
                  columns={tableColumns}
                  bootstrap4
                  bordered={false}
                  pagination={paginationFactory({
                    sizePerPage: 25,
                    sizePerPageList: [5, 10, 25, 50, 100],
                  })}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  flagDelete: state.temposMovimentos.flagDelete,

  switchChecked: state.buttonSwitch.switchChecked,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  user: state.usuario.fichaData,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,

  modalCalendarVisibility: state.sistema.modalCalendarVisibility,
  modalCalendarSave: state.sistema.modalCalendarSave,
});
export default connect(() => (mapState))(TemposMovimentos);
