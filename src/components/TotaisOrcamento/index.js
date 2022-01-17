///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, memo } from 'react';
import { Col, Input, Label } from 'reactstrap';
import './style.css';

function TotaisOrcamento({
  title, type, value, onChange, onBlur, disabled, min, max,
  onChangeCapture, className, strong, hidden, hideInput,
}) {
  const [classTitle, set_classTitle] = useState(true);

  const [visibility, set_visibility] = useState(true);
  const [visibilityInput, set_visibilityInput] = useState(true);

  useEffect(() => {
    strong
      ? set_classTitle('font-weight-bold')
      : set_classTitle('');

    hidden
      ? set_visibility('hide')
      : set_visibility('');

    hideInput
      ? set_visibilityInput('hide')
      : set_visibilityInput('');
  }, [strong, hidden, hideInput]);

  return (
    <>
      {/*** TOTAIS ORCAMENTO ***/}
      <Col sm={12} className={`totais-orcamento-container ${visibility}`}>

        <Label className={`totais-orcamento-title ${classTitle}`}>
          { title }
        </Label>

        <Input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${className} ${visibilityInput}`}
          min={min}
          max={max}
          onChangeCapture={onChangeCapture}
          disabled={disabled}
          style={{
            width: 125,
            textAlign: 'right',
          }}
        />

      </Col>
    </>
  );
}

export default memo(TotaisOrcamento);
