import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'reactstrap';

const Checkbox = ({
  id, name, info, onClick, checked, onChange,
}) => {
  const [check, set_check] = useState(false);
  const [id_input, set_id_input] = useState('');

  useEffect(() => {
    set_check(checked);

    id === undefined
      ? set_id_input(`checkbox-${name}`)
      : set_id_input(id);
  }, [id, checked, name]);

  return (
    <Row>
      <Col className="p-0 m-0 pl-3 pr-3 pt-2">
        <Input
          className="checkbox"
          type="checkbox"
          id={id_input}
          name={name}
          onClick={onClick}
          checked={check}
          onChange={onChange}
        />
        <label htmlFor={id_input} className="noselect pl-2">{ info }</label>
      </Col>
    </Row>
  );
};

export default Checkbox;
