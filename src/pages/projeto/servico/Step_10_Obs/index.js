///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';

function Step10(props) {
  const [firstLoad, setFirst] = useState(true);
  const [observacao, setObs] = useState('');
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

      const { id, observacao } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        setObs(observacao);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_10_FALSE' });
        //console.log('Atualizado Step 10');
      }
    }
  }, [props, flagAtualizado]);

  /// ATUALIZA FORM
  useEffect(() => {
    localStorage.setItem('PROSERVICO_FORM_STEP_10', JSON.stringify({ observacao }));
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
  fichaData: state.servicos.fichaData,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step10,
});
export default connect(() => (mapState))(Step10);
