///////// IMPORTS ///////////////
/////////////////////////////////
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem,
} from 'reactstrap';
import {
  faUserFriends, faEdit, faHotel, faClock,
  faTrashAlt, faHandshake, faUserTie, faUsers, faBurn,
  faExclamationTriangle, faFileAlt, faDollarSign, faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';

import { MoreHorizontal } from 'react-feather';
import { DropdownRelatorio } from '../index';
import { showModal } from '../../functions/sistema';
import './style.css';

const DropDownMenu = ({ props, id }) => (
  <div className="card-actions float-right">

    <UncontrolledDropdown>
      <DropdownToggle tag="a"><MoreHorizontal /></DropdownToggle>

      <DropdownMenu right className="dropdown-reports-project">

        <Link to={`/projeto/painel/consulta/${id}`}>
          <DropdownRelatorio
            icon={faFileAlt}
            titulo="Consultar"
            permission={props}
            action="CONSULTAR"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/ficha`}>
          <DropdownRelatorio
            icon={faEdit}
            titulo="Editar"
            permission={props}
            action="EDITAR"
            color="blue"
          />
        </Link>

        <DropdownRelatorio
          onClick={() => showModal(props, id)}
          icon={faTrashAlt}
          titulo="Excluir"
          permission={props}
          action="EXCLUIR"
          color="danger"
        />

        <Link to={`/projeto/painel/${id}/contratante`}>
          <DropdownRelatorio
            icon={faUserTie}
            titulo="Contratante"
            permission={props}
            action="> CONTRATANTE"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/orcamento`}>
          <DropdownRelatorio
            icon={faMoneyBillWave}
            titulo="Orçamento"
            permission={props}
            action="> ORÇAMENTO"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/rsvp`}>
          <DropdownRelatorio
            icon={faUserFriends}
            titulo="RSVP"
            permission={props}
            action="> RSVP"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/participantes`}>
          <DropdownRelatorio
            icon={faUsers}
            titulo="Participantes"
            permission={props}
            action="> PARTICIPANTE"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/servicos`}>
          <DropdownRelatorio
            icon={faHandshake}
            titulo="Serviços"
            permission={props}
            action="> SERVIÇO"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/tempos-movimentos`}>
          <DropdownRelatorio
            icon={faClock}
            titulo="Tempos & Movimentos"
            permission={props}
            action="> TEMPO E MOVIMENTO"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/ocorrencias`}>
          <DropdownRelatorio
            icon={faExclamationTriangle}
            titulo="Ocorrências"
            permission={props}
            action="> OCORRÊNCIA"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/rooming-list`}>
          <DropdownRelatorio
            icon={faHotel}
            titulo="Rooming List"
            permission={props}
            action="> ROOMING LIST"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/financeiro`}>
          <DropdownRelatorio
            icon={faDollarSign}
            titulo="Financeiro"
            permission={props}
            action="> FINANCEIRO"
            color="muted"
          />
        </Link>

        <DropdownItem divider />

        <Link to={`/projeto/painel/${id}/hotsite/ficha`}>
          <DropdownRelatorio
            icon={faBurn}
            titulo="Hotsite"
            permission={props}
            action="EDITAR"
            color="muted"
          />
        </Link>
        {/*
        <Link to={`/projeto/painel/${id}/dossie/ficha`}>
          <DropdownRelatorio
            icon={faFileExcel}
            titulo="Dossiê"
            permission={props}
            action="EDITAR"
            color="muted"
          />
        </Link>

        <Link to={`/projeto/painel/${id}/dossie/consulta`}>
          <DropdownRelatorio
            icon={faFile}
            titulo="Dossiê consulta"
            permission={props}
            action="EDITAR"
            color="muted"
          />
        </Link>
        */}

      </DropdownMenu>
    </UncontrolledDropdown>

  </div>
);

export default DropDownMenu;
