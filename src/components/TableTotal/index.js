///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo, useEffect, useState } from 'react';

const TableTotal = ({
  pagar, receber, total, totalPagar, soma, somaAlert,
}) => {
  const [firstLoad, setFirst] = useState(true);
  const [colspan, setColspan] = useState(1);

  const [valorPagar, setValorPagar] = useState('');
  const [valorReceber, setValorReceber] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const [visibilityPagar, setVisibilityPagar] = useState('hide');
  const [visibilityReceber, setVisibilityReceber] = useState('hide');
  const [visibilityTotal, setVisibilityTotal] = useState('hide');
  const [visibilityTotalPagar, setVisibilityTotalPagar] = useState('hide');
  const [visibilitySoma, setVisibilitySoma] = useState('hide');

  const [alertSoma, setAlertSoma] = useState('');

  useEffect(() => {
    if (firstLoad) {
      let totalColumn = 0;

      if (pagar !== undefined) {
        totalColumn += 2;
        setVisibilityPagar('');
      }

      if (receber !== undefined) {
        totalColumn += 2;
        setVisibilityReceber('');
      }

      if (total !== undefined) {
        totalColumn += 2;
        setVisibilityTotal('');
      }

      if (totalPagar !== undefined) {
        totalColumn += 2;
        setVisibilityTotalPagar('');
      }

      if (soma !== undefined) {
        totalColumn += 2;
        setVisibilitySoma('');
      }
      setColspan(colspan + totalColumn);
      setFirst(false);
    }
  }, [colspan, firstLoad, pagar, receber, soma, total, totalPagar]);

  useEffect(() => {
    setValorPagar(pagar);
    setValorReceber(receber);
    setValorTotal(total);
  }, [pagar, receber, total]);

  useEffect(() => {
    somaAlert === true
      ? setAlertSoma('text-danger')
      : setAlertSoma('text-blue');
  }, [somaAlert]);

  return (
    <table className="table table-total pb-0 m-0 mt-3">
      <tr className="table-total-hr bg-dark">
        <td colSpan={colspan} className="p-0" />
      </tr>
      <tr>
        <td className="column-empty" />

        <td className={`table-total-column table-total-column-title pr-0 pl-0 ${visibilityPagar}`}> Pagar </td>
        <td className={`table-total-column column-valor pr-0 pl-0 ${visibilityPagar}`}>{ valorPagar }</td>

        <td className={`table-total-column table-total-column-title pr-0 pl-0 ${visibilityReceber}`}> Receber </td>
        <td className={`table-total-column column-valor pr-0 pl-0 ${visibilityReceber}`}>{ valorReceber}</td>

        <td className={`table-total-column table-total-column-title pr-0 pl-0 ${visibilityTotal}`}> Total </td>
        <td className={`table-total-column column-valor pr-0 pl-0 ${visibilityTotal}`}>{ valorTotal }</td>

        <td className={`table-total-column table-total-column-title pr-0 pl-0 ${visibilityTotalPagar}`}>Total à pagar</td>
        <td className={`table-total-column column-valor pr-0 pl-0 ${visibilityTotalPagar}`}>{ totalPagar }</td>

        <td className={`table-total-column table-total-column-title pr-0 pl-0 ${visibilitySoma} ${alertSoma}`}> Soma </td>
        <td className={`table-total-column column-valor pr-0 pl-0 ${visibilitySoma} ${alertSoma}`}>{ soma }</td>
      </tr>
    </table>
  );
};

export default memo(TableTotal);
