///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { AutoCompletarV2 } from '../index';

function AutoCompletarWOO(props) {
  const [flagEditar, setFlagEditar] = useState(true);

  const [WOO_ACV_visible, setWOO_ACV_visible] = useState(true);
  const [WOO_PF_visible, setWOO_PF_visible] = useState(false);
  const [WOO_PF_disable, setWOO_PF_disable] = useState(true);
  const [WOO_PJ_visible, setWOO_PJ_visible] = useState(false);
  const [WOO_PJ_disable, setWOO_PJ_disable] = useState(true);

  const [id, setId] = useState(0);
  const [woo_id_pfisica, setWoo_id_pfisica] = useState(0);
  const [woo_pfisica, setWoo_pfisica] = useState('');
  const [woo_id_pjuridica, setWoo_id_pjuridica] = useState(0);
  const [woo_pjuridica, setWoo_pjuridica] = useState('');

  const handleContatoWOO = useCallback((woo_pessoa) => {
    switch (parseInt(woo_pessoa, 10)) {
      case 1:
        setWOO_ACV_visible(false);

        setWOO_PF_disable(false);
        setWOO_PF_visible(true);

        setWOO_PJ_disable(true);
        setWOO_PJ_visible(false);

        break;

      case 2:
        setWOO_ACV_visible(false);

        setWOO_PF_disable(true);
        setWOO_PF_visible(false);

        setWOO_PJ_disable(false);
        setWOO_PJ_visible(true);

        break;

      default:
        setWOO_ACV_visible(true);

        setWOO_PF_disable(true);
        setWOO_PF_visible(false);

        setWOO_PJ_disable(true);
        setWOO_PJ_visible(false);
    }
  }, []);

  useEffect(() => {
    handleContatoWOO(props.woo_pessoa);
  }, [props.woo_pessoa, handleContatoWOO]);

  ////// MONITORA EDITAR (UMA ÚNICA VEZ)
  useEffect(() => {
    if (props.editar.id > 0 && flagEditar) {
      const { id, woo_pfisica, woo_pjuridica } = props.editar;
      handleContatoWOO(props.woo_pessoa);

      setId(id);

      setWoo_pfisica(woo_pfisica.descricao);
      setWoo_id_pfisica(woo_pfisica.id);
      setWoo_pjuridica(woo_pjuridica.descricao);
      setWoo_id_pjuridica(woo_pjuridica.id);

      setFlagEditar(false);
    }
  }, [flagEditar, props.editar, props.woo_pessoa, handleContatoWOO, id]);

  useEffect(() => {
    setWoo_id_pfisica(props.autoCompletarWoo_Id_Pfisica);
  }, [props.autoCompletarWoo_Id_Pfisica]);

  useEffect(() => {
    setWoo_id_pjuridica(props.autoCompletarWoo_Id_Pjuridica);
  }, [props.autoCompletarWoo_Id_Pjuridica]);

  return (
    <>
      <AutoCompletarV2
        {...props}
        value=""
        valueId=""
        tabela=""
        campo=""
        disabled
        visible={WOO_ACV_visible}
        editar={{ id: '', value: '', valueId: '' }}
      />

      <AutoCompletarV2
        {...props}
        value={woo_pjuridica}
        valueId={woo_id_pjuridica}
        tabela="WOO_PJURIDICA"
        campo=""
        disabled={WOO_PJ_disable}
        visible={WOO_PJ_visible}
        editar={{ id, value: woo_pjuridica, valueId: woo_id_pjuridica }}
      />

      <AutoCompletarV2
        {...props}
        value={woo_pfisica}
        valueId={woo_id_pfisica}
        tabela="WOO_PFISICA"
        campo=""
        disabled={WOO_PF_disable}
        visible={WOO_PF_visible}
        editar={{ id, value: woo_pfisica, valueId: woo_id_pfisica }}
      />

    </>
  );
}

const mapState = (state) => ({
  autoCompletarWoo_Id_Pfisica: state.autoCompletar.autoCompletarWoo_Id_Pfisica,
  autoCompletarWoo_Id_Pjuridica: state.autoCompletar.autoCompletarWoo_Id_Pjuridica,
});
export default connect(() => (mapState))(AutoCompletarWOO);
