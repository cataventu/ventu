///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';

function Step03(props) {
  const [observacao, setObs] = useState('');

  /// FICHA DATA
  useEffect(() => {
    const idUrl = props.match.params.idRoomingList;
    if (parseInt(idUrl, 10) > 0) {
      const { observacao } = props.fichaData;
      setObs(observacao);
      //console.log('Atualizado Step 3');
    }
  }, [props]);

  /// ATUALIZA FORM
  useEffect(() => {
    localStorage.setItem('ROOMINGLIST_FORM_STEP_03', JSON.stringify({ observacao }));
  }, [observacao]);

  return (
    <>
      <Row>
        <Col sm={12}>
          <FormGroup>
            <Label>Observações gerais</Label>
            <Input
              type="textarea"
              className="obs"
              maxLength={2000}
              value={observacao}
              onChange={(e) => setObs(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.roomingList.fichaData,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(Step03);
