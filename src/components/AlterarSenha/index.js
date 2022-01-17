import React, { memo } from 'react';
import { Col, FormGroup } from 'reactstrap';
import { Buttons } from '../index';

const AlterarSenhaButton = ({ save }) => (
  <Col sm={12} className="text-right pb-3">
    <FormGroup>
      <Buttons onClick={save} description="Alterar" color="green" title="Alterar de senha" />
    </FormGroup>
  </Col>
);

export default memo(AlterarSenhaButton);
