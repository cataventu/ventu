///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Header from '../_header';

function Hotsite(props) {
  const stepAtual = 9;
  const id_hash = props.match.params.id;

  const [firstLoad, setFirst] = useState(true);
  const [campos, set_campos] = useState({});

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));
      set_campos(form);
      setFirst(false);
    }
  }, [firstLoad, props]);

  return (
    <>
      <Row className="body-hotsite">

        {/*** HEADER ***/}
        <Header
          {...props}
          icon={faSave}
          title="Salvar"
          step={props.step}
          page={stepAtual}
          id={id_hash}
          dados={campos}
        />

        {/*** FORMULARIO ***/}
        <Col sm={12} className="p-0 pl-3 pr-3">
          <Row>
            <Col sm={12}><h2 className="mb-2 text-success">Falta pouco!</h2></Col>
            <Col sm={12}><h5 className="mb-2 text-muted">Para finalizar seu cadastro, clique no botão salvar.</h5></Col>
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
