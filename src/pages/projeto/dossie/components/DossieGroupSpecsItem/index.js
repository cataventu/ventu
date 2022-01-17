import React from 'react';
import { Col } from 'reactstrap';

function DossieGroupSpecsItem({ titulo, conteudo }) {
  return (
    <>
      <Col sm={12} className="pl-0 pb-3">
        <h4 className="pb-1 pt-2">{`:: ${titulo}`}</h4>
        {
          !!conteudo && conteudo.map((linha) => (
            <p className="pl-2">{`${linha.nome_completo} - ${linha.descricao}`}</p>
          ))
        }
      </Col>
    </>
  );
}
export default DossieGroupSpecsItem;
