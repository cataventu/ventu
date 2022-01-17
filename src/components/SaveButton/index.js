import React, { memo } from 'react';
import { Col, FormGroup } from 'reactstrap';
import { Buttons } from '../index';

const SaveButton = ({ save }) => (
  <Col sm={12} className="text-right pb-3">
    <FormGroup>
      <Buttons onClick={save} description="Salvar" color="green" title="Salva todas as informações." />
    </FormGroup>
  </Col>
);

export default memo(SaveButton);
