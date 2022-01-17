///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo, useEffect, useState } from 'react';
import {
  Col, Row, CardHeader, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { MoreHorizontal } from 'react-feather';
import { DropdownRelatorio } from '../index';

const CardHeaderName = (props) => {
  const [header, setHeader] = useState('');
  const [excelVisibility, setExcelVisibility] = useState('hide');

  const {
    titulo, label, excel, onClickExcel, buttons,
  } = props;

  useEffect(() => {
    switch (label) {
      case undefined: setHeader('Nome Completo:'); break;
      default: setHeader(label);
    }

    if (excel) { setExcelVisibility('show'); }
  }, [label, excel]);

  return (
    <>
      <CardHeader className="p-0">
        <Row className="pl-3 h5 pt-0 text-left">
          <Col sm={12} className="card-header-title-height">
            <span className="pr-3 text-black">{ header }</span>
            <span className="text-muted">{ titulo }</span>

            <UncontrolledDropdown className={`card-header-excel ${excelVisibility}`}>
              <DropdownToggle tag="a">
                <MoreHorizontal />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownRelatorio
                  onClick={onClickExcel}
                  icon={faFileExcel}
                  titulo="Exportar Excel"
                  permission={props}
                  action="Excel"
                />
              </DropdownMenu>
            </UncontrolledDropdown>

            <div className="card-header-buttons">
              { buttons }
            </div>

          </Col>
        </Row>
      </CardHeader>
      <hr className="card-header-hr" />
    </>
  );
};

export default memo(CardHeaderName);
