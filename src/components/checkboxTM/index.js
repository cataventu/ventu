import React, {
  memo, useState, useCallback, useEffect,
} from 'react';
import {
  InputGroup, InputGroupAddon, InputGroupText, Col, Input, Row,
} from 'reactstrap';
import { formatCompleteZeros } from '../../functions/sistema';
import './style.css';

function CheckboxTM({ dados, onChange }) {
  const input_selected = 'bg-primary text-white';
  const input_nonselected = 'bg-muted text-dark';

  const [checked, setChecked] = useState(true);
  const [selected, set_selected] = useState(false);

  const [id, set_id] = useState(false);
  const [tipo_servico, set_tipo_servico] = useState(false);
  const [servico, set_servico] = useState(false);
  const [fornecedor, set_fornecedor] = useState(false);
  const [confirmacao, set_confirmacao] = useState(false);
  const [valor, set_valor] = useState(false);
  const [moeda, set_moeda] = useState(false);

  const handleCheck = useCallback((checkbox) => {
    switch (checkbox) {
      case true:
        set_selected(input_selected);
        setChecked(true);
        break;
      case false:
        set_selected(input_nonselected);
        setChecked(false);
        break;
      default:
    }
  }, []);

  useEffect(() => {
    const {
      id, check, tipo_servico, servico, fornecedor, confirmacao, valor, moeda,
    } = dados;

    set_id(id);
    set_tipo_servico(tipo_servico);
    set_servico(servico);
    set_fornecedor(fornecedor);
    set_confirmacao(confirmacao);
    set_valor(valor);
    set_moeda(moeda);

    handleCheck(check);
  }, [dados, handleCheck]);

  return (
    <>
      <Row id={`TM-group-${id}`} className="pb-1">
        <Col lg="12">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText name="TM-checkbox-info" className={selected}>
                <Input
                  addon
                  type="checkbox"
                  checked={checked}
                  id={id}
                  name="TM-checkbox"
                  //onChange={ onChange }

                  onChange={(e) => handleCheck(e.target.checked)}
                  onChangeCapture={onChange}
                  value={`${id}-${tipo_servico}`}
                />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={servico}
              className={`p-0 m-0 pl-2 pr-2 input-tm-servico ${selected}`}
            />
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={tipo_servico}
              className={`p-0 m-0 pl-2 pr-2 input-tm-tipo-servico ${selected}`}
            />
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={fornecedor}
              className={`p-0 m-0 pl-2 pr-2 input-tm-fornecedor ${selected}`}
            />
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={confirmacao}
              className={`p-0 m-0 pl-2 pr-2 input-tm-confirmacao ${selected}`}
            />
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={formatCompleteZeros(valor, 2)}
              className={`p-0 m-0 pl-2 pr-2 input-tm-valor ${selected}`}
            />
            <Input
              disabled
              type="text"
              name="TM-checkbox-info"
              value={moeda}
              className={`p-0 m-0 pl-2 pr-2 input-tm-moeda ${selected}`}
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  );
}

export default memo(CheckboxTM);
