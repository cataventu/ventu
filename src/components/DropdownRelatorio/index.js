///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo } from 'react';
import { DropdownItem, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkFunctionsPermission } from '../../functions/sistema/permissoes';

const DropdownRelatorio = ({
  onClick, icon, titulo, permission, action, color,
}) => (
  <DropdownItem
    onClick={onClick}
    className={
      `${checkFunctionsPermission(permission, action)} p-2 m-0 text-${color}`
    }
  >
    <Row className="p-0 m-0">
      <Col sm={3} md={2} className="p-0 m-0 text-center">
        <FontAwesomeIcon icon={icon} className="p-0 m-0 cursor" />
      </Col>
      <Col sm={9} md={10} className="p-0 m-0 pl-1 text-left">
        <span className="">{ titulo }</span>

      </Col>
    </Row>
  </DropdownItem>
);

export default memo(DropdownRelatorio);
