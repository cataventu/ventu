///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AutoCompletarV2 } from '../index';

function AutoCompletarPessoa(props) {
  const [flagEditar, setFlagEditar] = useState(true);

  const [ACV_visible, setACV_visible] = useState(true);
  const [PF_visible, setPF_visible] = useState(false);
  const [PF_disable, setPF_disable] = useState(true);
  const [PJ_visible, setPJ_visible] = useState(false);
  const [PJ_disable, setPJ_disable] = useState(true);

  const [id, setId] = useState(0);
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [pfisica, setPfisica] = useState('');
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [pjuridica, setPjuridica] = useState('');

  const handleContato = useCallback((pessoa) => {
    switch (parseInt(pessoa, 10)) {
      case 1:
        setACV_visible(false);

        setPF_disable(false);
        setPF_visible(true);

        setPJ_disable(true);
        setPJ_visible(false);

        break;

      case 2:
        setACV_visible(false);

        setPF_disable(true);
        setPF_visible(false);

        setPJ_disable(false);
        setPJ_visible(true);

        break;

      default:
        setACV_visible(true);

        setPF_disable(true);
        setPF_visible(false);

        setPJ_disable(true);
        setPJ_visible(false);
    }
  }, []);

  useEffect(() => {
    handleContato(props.pessoa);
  }, [props.pessoa, handleContato]);

  ////// MONITORA EDITAR (UMA ÚNICA VEZ)
  useEffect(() => {
    if (props.editar.id > 0 && flagEditar) {
      const { id, pfisica, pjuridica } = props.editar;
      handleContato(props.pessoa);
      setId(id);
      setPfisica(pfisica.descricao);
      setId_Pfisica(pfisica.id);
      setPjuridica(pjuridica.descricao);
      setId_Pjuridica(pjuridica.id);
      setFlagEditar(false);
    }
  }, [flagEditar, props.editar, props.pessoa, handleContato, id]);

  useEffect(() => {
    setId_Pfisica(props.autoCompletarId_Pfisica);
  }, [props.autoCompletarId_Pfisica]);

  useEffect(() => {
    setId_Pjuridica(props.autoCompletarId_Pjuridica);
  }, [props.autoCompletarId_Pjuridica]);

  return (
    <>
      <AutoCompletarV2
        {...props}
        value=""
        valueId=""
        tabela=""
        campo=""
        disabled
        visible={ACV_visible}
        editar={{ id: '', value: '', valueId: '' }}
      />

      <AutoCompletarV2
        {...props}
        value={pjuridica}
        valueId={id_pjuridica}
        tabela="PJURIDICA"
        campo=""
        disabled={PJ_disable}
        visible={PJ_visible}
        editar={{ id, value: pjuridica, valueId: id_pjuridica }}
      />

      <AutoCompletarV2
        {...props}
        value={pfisica}
        valueId={id_pfisica}
        tabela="PFISICA"
        campo=""
        disabled={PF_disable}
        visible={PF_visible}
        editar={{ id, value: pfisica, valueId: id_pfisica }}
      />
    </>
  );
}

const mapState = (state) => ({
  autoCompletarId_Pfisica: state.autoCompletar.autoCompletarId_Pfisica,
  autoCompletarId_Pjuridica: state.autoCompletar.autoCompletarId_Pjuridica,
});
export default connect(() => (mapState))(AutoCompletarPessoa);
