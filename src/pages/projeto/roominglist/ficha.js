///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, CardBody, Card, Col,
} from 'reactstrap';
import {
  CardHeaderName, Wizard, TabsProjeto, PageTitle, Buttons,
} from '../../../components';
import { getDados } from '../../../functions/sistema';
import { saveRoominglist } from '../../../functions/projeto/roominglist';
import Step02 from './Step_01_Fornecedor';
import Step07 from './Step_02_PAX';
import Step10 from './Step_03_Obs';

function ProjetoServicoFicha(props) {
  const [firstLoad, setFirst] = useState(true);

  const [actionButtons, setActionButtons] = useState([]);
  const [urlVoltar, setUrlVoltar] = useState('');

  const [step, setStep] = useState(0);

  const data = [
    {
      step: 0, title: 'Fornecedor', description: '', content: <Step02 {...props} />, visibility: '',
    },
    {
      step: 1, title: 'PAX', description: '', content: <Step07 {...props} />, visibility: '',
    },
    {
      step: 2, title: 'Observação', description: '', content: <Step10 {...props} />, visibility: '',
    },
  ];

  const headerButtons = [
    <Button
      className="card-header-button-left btn sw-btn-prev"
      onClick={() => handleNavigation(step, 'prev')}
    >
Voltar

    </Button>,
    <Button
      className="card-header-button-middle btn sw-btn-next"
      onClick={() => handleNavigation(step, 'next')}
    >
Avançar

    </Button>,
    <Button
      className="card-header-button-right bg-success"
      onClick={() => handleSave(props)}
    >
Salvar

    </Button>,
  ];

  const handleBtnIncluir = useCallback((page) => {
    setStep(page);
    const { dispatch } = props;

    let relacionalIncluir = false;
    let relacionalAction = '';

    switch (parseInt(page, 10)) {
      case 1:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_PAX_FORM';
        break;
      default:
        relacionalIncluir = false;
    }

    /// BTN INCLUIR
    if (relacionalIncluir) {
      setActionButtons([
        <Buttons
          description="Incluir"
          color="primary"
          title="Cadastrar novo registro."
          permission={props}
          onClick={() => dispatch({ type: `${relacionalAction}_TRUE` })}
        />,
      ]);
    } else {
      setActionButtons([]);
    }
  }, [props]);

  const handleStepAutoClick = useCallback((tab, error) => {
    handleBtnIncluir(tab);
    const links = document.getElementsByClassName('wizard-steps-links');
    const lista = document.getElementsByClassName('wizard-steps');

    links.forEach((item) => {
      switch (tab) {
        case 0: if (item.textContent === 'Fornecedor') { item.click(); } break;
        case 1: if (item.textContent === 'PAX') { item.click(); } break;
        case 2: if (item.textContent === 'Observação') { item.click(); } break;
        default:
      }
    });

    if (error) {
      lista.forEach((item) => {
        switch (tab) {
          case 0: if (item.textContent === 'Fornecedor') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 1: if (item.textContent === 'PAX') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 2: if (item.textContent === 'Observação') { item.classList.add('danger'); item.classList.remove('active'); } break;
          default:
        }
      });
    }
  }, [handleBtnIncluir]);

  ////// HANDLE BTN VOLTAR / AVANCAR
  const handleNavigation = useCallback((step, direction) => {
    const total_steps = 2;

    function handleDirection(total_steps) {
      if (direction === 'next') { newStep += 1; }
      if (direction === 'prev') { newStep -= 1; }
      if (newStep >= total_steps) { newStep = total_steps; }
      if (newStep < 0) { newStep = 0; }
    }

    const lista = document.getElementsByClassName('wizard-steps');
    const links = document.getElementsByClassName('wizard-steps-links');

    let newStep = parseInt(step, 10);
    handleDirection(total_steps);

    let n = 0;
    while (n <= total_steps) {
      const nextStep = lista[newStep].classList.value;

      if (!nextStep.includes('hide')) {
        n = total_steps + 1;
        setStep(newStep);
        lista[newStep].classList.add('done');
        links[newStep].click();
        handleBtnIncluir(newStep);
      } else {
        n += 1;
        handleDirection();
      }
    }
  }, [handleBtnIncluir]);

  const handleSave = useCallback((props) => {
    const Step_01 = JSON.parse(localStorage.getItem('ROOMINGLIST_FORM_STEP_01'));
    const Step_02 = JSON.parse(localStorage.getItem('ROOMINGLIST_FORM_STEP_02'));
    const Step_03 = JSON.parse(localStorage.getItem('ROOMINGLIST_FORM_STEP_03'));

    const {
      id, id_projeto, especificacao, for_pessoa, for_id_pfisica, for_id_pjuridica,
      hos_apto, hos_tipo, hos_wakeup, dt_inicio, dt_termino,
    } = Step_01;
    const { rpax_regs } = Step_02;
    const { observacao } = Step_03;

    const form = {
      id,
      id_projeto,
      for_pessoa,
      for_id_pfisica,
      for_id_pjuridica,
      especificacao,
      hos_apto,
      hos_tipo,
      hos_wakeup,
      dt_inicio,
      dt_termino,

      rpax_regs,
      observacao,

      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
    };

    async function Save(form) {
      const response = await saveRoominglist(props, form);

      if (response.retorno === 0) {
        handleStepAutoClick(response.tag - 1, true);
      }
    }

    Save(form);
  }, [handleStepAutoClick]);

  /// FIRST LOAD
  useEffect(() => {
    const { match } = props;

    if (firstLoad) {
      handleStepAutoClick(0, false);

      const id_projeto = match.params.id;
      const id_roomingList = match.params.idRoomingList;

      const url = `/tsmROOMINGLIST/FICHA/${id_roomingList}`;
      getDados(props, url, '@SET_ROOMINGLIST_FICHA');

      setUrlVoltar(`/projeto/painel/${id_projeto}/rooming-list`);

      setFirst(false);
    }
  }, [props, firstLoad, handleStepAutoClick]);

  ////// MONITORA CLICK NAS ABAS
  useEffect(() => {
    handleBtnIncluir(props.step);
  }, [props.step, handleBtnIncluir]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        {...props}
        title="Projeto"
        buttons={actionButtons}
        subtitle="/ Rooming List / Cadastrar"
        voltar
        linkTo={urlVoltar}
      />

      <TabsProjeto ativo={8} props={props} />

      <Row>
        <Col sm={12}>
          <Card>
            <CardBody className="pb-0 card-proservico-content">

              <CardHeaderName
                {...props}
                titulo={props.nomeProjeto}
                label="Projeto:"
                buttons={headerButtons}

              />

              <Wizard
                {...props}
                data={data}
                modulo="ROOMINGLIST"
                stepsSelected={props.match.params.idRoomingList}
                function={() => handleBtnIncluir()}
                //stepsDisabled={[8]}
                //stepsError={[9]}
                //stepsHidden={[2]}
              />

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  nomeProjeto: state.projeto.nomeProjeto,
  step: state.wizard.step,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ProjetoServicoFicha);
