///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { nextPage, previousPage, saveDadosPessoais } from '../../../../functions/hotsite/participante';

function Navigation(props) {
  const { page, dados, step } = props;
  const { modulo_regs } = dados;
  const { id_projeto, id_hash } = props.match.params;

  const form = {
    step,
    page,
    id_projeto,
    id_hash,
    modulos: modulo_regs,
  };

  const [firstLoad, setFirst] = useState(true);

  const [visibilityVoltar, set_visibilityVoltar] = useState('hide');
  const [visibilityAvancar, set_visibilityAvancar] = useState('hide');
  const [visibilitySave, set_visibilitySave] = useState('hide');

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      page === 0 || page === 9 ? set_visibilityAvancar('hide') : set_visibilityAvancar('');
      page === 0 ? set_visibilityVoltar('hide') : set_visibilityVoltar('');
      page === 9 ? set_visibilitySave('') : set_visibilitySave('hide');
      setFirst(false);
    }
  }, [dados, firstLoad, id_hash, id_projeto, page]);

  return (
    <>
      <Button className={`btn float-right bg-success border-none ml-2 ${visibilitySave}`} title="" onClick={() => saveDadosPessoais(props)}>
        <FontAwesomeIcon icon={faSave} className="p-0 m-0 h4 cursor mr-2 text-white" />
         Salvar
      </Button>

      <Button className={`btn float-right bg-primary border-none ml-2 ${visibilityAvancar}`} title="" onClick={() => nextPage(props, form)}>
         Avançar
        <FontAwesomeIcon icon={faAngleRight} className="p-0 m-0 h4 cursor ml-2 text-white" />
      </Button>

      <Button className={`btn float-right bg-primary border-none ml-2 ${visibilityVoltar}`} title="" onClick={() => previousPage(props, form)}>
        <FontAwesomeIcon icon={faAngleLeft} className="p-0 m-0 h4 cursor mr-2 text-white" />
         Voltar
      </Button>
    </>
  );
}

export default Navigation;
