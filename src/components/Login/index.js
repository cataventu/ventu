import React, { memo } from 'react';
import { Col, FormGroup } from 'reactstrap';
import { Buttons } from '../index';

const LoginButton = ({ save }) => (
  <Col sm={12} className="text-right pb-3">
    <FormGroup>
      <Buttons onClick={save} description="Entrar" color="green" title="Acesso ao Sistema Ventu" />
    </FormGroup>
  </Col>
);

export default memo(LoginButton);
