///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';

function Step09(props) {
  const [firstLoad, setFirst] = useState(true);
  const [capa_bilhete, setCapaBilhete] = useState('');
  const [flagAtualizado, setAtualizado] = useState(false);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      setFirst(false);
    }
  }, [props, firstLoad]);

  /// RECEBE TABLE DATA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const { id, capa_bilhete } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        setCapaBilhete(capa_bilhete);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_09_FALSE' });
        //console.log('Atualizado Step 9');
      }
    }
  }, [props, flagAtualizado]);

  /// ATUALIZA FORM
  useEffect(() => {
    localStorage.setItem('PROSERVICO_FORM_STEP_09', JSON.stringify({ capa_bilhete }));
  }, [capa_bilhete]);

  return (
    <>
      <Row>
        <Col sm={12}>
          <FormGroup>
            <Label>Capa do Bilhete</Label>
            <Input
              type="textarea"
              className="obs"
              maxLength={2000}
              value={capa_bilhete}
              onChange={(e) => setCapaBilhete(e.target.value)}
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
  fichaData: state.servicos.fichaData,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step09,
});
export default connect(() => (mapState))(Step09);
