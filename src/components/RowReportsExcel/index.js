///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo } from 'react';
import {
  Col, Row, UncontrolledDropdown, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { MoreHorizontal } from 'react-feather';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { DropdownRelatorio } from '../index';

//////// FLUXOCAIXA ///////////////
/////////////////////////////////
const RowReportsExcel = ({ props, funcao }) => (
  <Row className="text-right m-0 p-0">
    <Col sm={12}>
      <UncontrolledDropdown>
        <DropdownToggle tag="a">
          <MoreHorizontal />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownRelatorio
            onClick={funcao}
            icon={faFileExcel}
            titulo="Exportar Excel"
            permission={props}
            action="Excel"
          />
        </DropdownMenu>
      </UncontrolledDropdown>
    </Col>
  </Row>
);

export default memo(RowReportsExcel);
