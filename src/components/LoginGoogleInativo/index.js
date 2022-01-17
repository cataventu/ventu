import React, { memo } from 'react';
import { Col, FormGroup } from 'reactstrap';
import { Buttons } from '../index';

const LoginButton = ({ save }) => (
  <Col sm={12} className="text-right pb-3">
    <FormGroup>
      <Buttons onClick={save} description="Login Google" color="blue" title="Login Temporariamente Indisponível" />
    </FormGroup>
  </Col>
);

export default memo(LoginButton);
