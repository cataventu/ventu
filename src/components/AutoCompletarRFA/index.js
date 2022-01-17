///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AutoCompletarV2 } from '../index';

function AutoCompletarRFA(props) {
  const [flagEditar, setFlagEditar] = useState(true);

  const [RFA_ACV_visible, setRFA_ACV_visible] = useState(true);
  const [RFA_PF_visible, setRFA_PF_visible] = useState(false);
  const [RFA_PF_disable, setRFA_PF_disable] = useState(true);
  const [RFA_PJ_visible, setRFA_PJ_visible] = useState(false);
  const [RFA_PJ_disable, setRFA_PJ_disable] = useState(true);

  const [id, setId] = useState(0);
  const [rfa_id_pfisica, setRfa_id_pfisica] = useState(0);
  const [rfa_pfisica, setRfa_pfisica] = useState('');
  const [rfa_id_pjuridica, setRfa_id_pjuridica] = useState(0);
  const [rfa_pjuridica, setRfa_pjuridica] = useState('');

  const handleContatoRFA = useCallback((rfa_pessoa) => {
    switch (parseInt(rfa_pessoa, 10)) {
      case 1:
        setRFA_ACV_visible(false);

        setRFA_PF_disable(false);
        setRFA_PF_visible(true);

        setRFA_PJ_disable(true);
        setRFA_PJ_visible(false);

        break;

      case 2:
        setRFA_ACV_visible(false);

        setRFA_PF_disable(true);
        setRFA_PF_visible(false);

        setRFA_PJ_disable(false);
        setRFA_PJ_visible(true);

        break;

      default:
        setRFA_ACV_visible(true);

        setRFA_PF_disable(true);
        setRFA_PF_visible(false);

        setRFA_PJ_disable(true);
        setRFA_PJ_visible(false);
    }
  }, []);

  useEffect(() => {
    handleContatoRFA(props.rfa_pessoa);
  }, [props.rfa_pessoa, handleContatoRFA]);

  ////// MONITORA EDITAR (UMA ÚNICA VEZ)
  useEffect(() => {
    if (props.editar.id > 0 && flagEditar) {
      const { id, rfa_pfisica, rfa_pjuridica } = props.editar;
      handleContatoRFA(props.rfa_pessoa);

      setId(id);

      setRfa_pfisica(rfa_pfisica.descricao);
      setRfa_id_pfisica(rfa_pfisica.id);
      setRfa_pjuridica(rfa_pjuridica.descricao);
      setRfa_id_pjuridica(rfa_pjuridica.id);

      setFlagEditar(false);
    }
  }, [flagEditar, props.editar, props.rfa_pessoa, handleContatoRFA, id]);

  useEffect(() => {
    setRfa_id_pfisica(props.autoCompletarRfa_Id_Pfisica);
  }, [props.autoCompletarRfa_Id_Pfisica]);

  useEffect(() => {
    setRfa_id_pjuridica(props.autoCompletarRfa_Id_Pjuridica);
  }, [props.autoCompletarRfa_Id_Pjuridica]);

  return (
    <>
      <AutoCompletarV2
        {...props}
        value=""
        valueId=""
        tabela=""
        campo=""
        disabled
        visible={RFA_ACV_visible}
        editar={{ id: '', value: '', valueId: '' }}
      />

      <AutoCompletarV2
        {...props}
        value={rfa_pjuridica}
        valueId={rfa_id_pjuridica}
        tabela="RFA_PJURIDICA"
        campo=""
        disabled={RFA_PJ_disable}
        visible={RFA_PJ_visible}
        editar={{ id, value: rfa_pjuridica, valueId: rfa_id_pjuridica }}
      />

      <AutoCompletarV2
        {...props}
        value={rfa_pfisica}
        valueId={rfa_id_pfisica}
        tabela="RFA_PFISICA"
        campo=""
        disabled={RFA_PF_disable}
        visible={RFA_PF_visible}
        editar={{ id, value: rfa_pfisica, valueId: rfa_id_pfisica }}
      />

    </>
  );
}

const mapState = (state) => ({
  autoCompletarRfa_Id_Pfisica: state.autoCompletar.autoCompletarRfa_Id_Pfisica,
  autoCompletarRfa_Id_Pjuridica: state.autoCompletar.autoCompletarRfa_Id_Pjuridica,
});
export default connect(() => (mapState))(AutoCompletarRFA);
