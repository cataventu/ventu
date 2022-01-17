///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { saveHotsite } from '../../../../functions/hotsite/participante';

function Hotsite(props) {
  const [save, set_save] = useState(false);

  ////// SAVE FINAL
  useEffect(() => {
    const { id_pfisica } = props;
    if (id_pfisica > 0 && !save) {
      set_save(true);
      saveHotsite(id_pfisica, props);
    }
  }, [props, save]);

  return (
    <>
      <Row className="body-hotsite">
        {/*** FORMULARIO ***/}
        <Col sm={12} className="pl-3 pr-3 pt-4 pb-4">
          <Row>
            <Col sm={12}><h2 className="mb-2 text-success">Parabéns!</h2></Col>
            <Col sm={12}><h5 className="mb-2 text-muted">Cadastro realizado com sucesso.</h5></Col>
          </Row>
        </Col>

      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  step: state.hotsite_participante.step,
  id_pfisica: state.hotsite_participante.id_pfisica,
});
export default connect(() => (mapState))(Hotsite);
