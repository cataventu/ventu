///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hotsiteFicha } from '../../../../functions/hotsite/projeto';
import Navigation from '../_navigation';

function HotsiteHeader(props) {
  const {
    page, id, dados, icon, title, step,
  } = props;
  const [firstLoad, setFirst] = useState(true);
  const [total, set_total] = useState(true);
  const [visibility_steps, set_visibility_steps] = useState('hide');

  const getPagina = useCallback(() => {
    async function getPagina() {
      await hotsiteFicha(props, 2);

      if (page > 0 && page < 9) {
        const form = JSON.parse(localStorage.getItem('HOTSITE_PARTICIPANTE_FICHA'));

        if (form === null) { return; }

        const { modulo_regs } = form;

        let total = 0;
        modulo_regs.forEach((page) => {
          if (page.acesso) { total += 1; }
        });

        set_total(total);
        set_visibility_steps('');
      }

      setFirst(false);
    }
    getPagina();
  }, [props, page]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getPagina();
    }
  }, [firstLoad, getPagina]);

  return (
    <>
      <Col sm={12} className="noselect border-bottom hotsite-header">

        <div className="hotsite-header-text-container">
          <FontAwesomeIcon icon={icon} className="card-icon" />
          <span className="text-muted card-title">{ title }</span>

          <span className={`text-muted h5 pl-4 ${visibility_steps}`}>
            <i className="pr-1">Etapa</i>
            <i className="pl-1">
              { step }
              {' '}
/
              {' '}
              <b>{ total }</b>
            </i>
          </span>

        </div>

        <div><Navigation {...props} step={step} page={page} id={id} dados={dados} /></div>

      </Col>

    </>
  );
}

const mapState = (state) => ({
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(HotsiteHeader);
