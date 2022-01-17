import React from 'react';

export const CheckBoxContas = (props) => (
  <li>
    <input
      key={props.id}
      onChange={props.handleCheckChieldElement}
      type="checkbox"
      checked={props.isChecked}
      value={props.value}
    />
    {props.value}
  </li>
);

export default CheckBoxContas;
