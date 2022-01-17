///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, CardBody, Card, Col,
} from 'reactstrap';
import {
  TabsProjeto, Modal, Wizard, CardHeaderName, PageTitle,
} from '../../../components';
import {
  checkValidation, resetValidation, hideModal, showModal, deleteRegistro,
} from '../../../functions/sistema';
import { saveTM, saveRTMServicos } from '../../../functions/projeto/tempos-movimentos';
import Step01 from './Step_01_Ficha';
import Step02 from './Step_02_Servicos';
import './style.css';

function ProjetoServicoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState('');
  const [id_tempomov, setId_tempomov] = useState('');

  const [nomeProjeto] = useState('');

  const [step, setStep] = useState(0);

  const data = [
    {
      step: 0,
      title: 'Ficha',
      description: 'Cadastro do evento no calendário do projeto.',
      content: <Step01 {...props} />,
      visibility: 'proservico-step-1',
    },
    {
      step: 1,
      title: 'Serviços',
      description: 'Vincule os serviços referentes a este evento.',
      content: <Step02 {...props} />,
      visibility: 'proservico-step-2',
    },
  ];

  const headerButtons = [
    <Button
      id="button-tempomov-anexo"
      className="card-header-tm-button-anexo btn bg-muted hide"
      onClick={() => handleAnexo()}
    >
      Anexo
    </Button>,
    <Button
      id="button-tempomov-excluir"
      className="card-header-tm-button-excluir btn bg-danger hide"
      onClick={() => showModal(props, id_tempomov)}
    >
      Excluir
    </Button>,

    <Button
      className="card-header-tm-button-left btn sw-btn-prev"
      onClick={() => handleNavigation(step, 'prev')}
    >
      Voltar
    </Button>,
    <Button
      className="card-header-tm-button-middle btn sw-btn-next"
      onClick={() => handleNavigation(step, 'next')}
    >
      Avançar
    </Button>,
    <Button
      className="card-header-tm-button-right bg-success"
      onClick={() => handleSave(props)}
    >
      Salvar
    </Button>,
  ];

  const handleStepAutoClick = useCallback((tab, error) => {
    const links = document.getElementsByClassName('wizard-steps-links');
    const lista = document.getElementsByClassName('wizard-steps');

    links.forEach((item) => {
      const Texto = item.getElementsByClassName('title-wizard')[0].outerText;
      switch (tab) {
        case 0: if (Texto === 'Ficha') { item.click(); } break;
        case 1: if (Texto === 'Serviços') { item.click(); } break;
        default:
      }
    });

    if (error) {
      lista.forEach((item) => {
        const Texto = item.getElementsByClassName('title-wizard')[0].outerText;
        switch (tab) {
          case 0: if (Texto === 'Ficha') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 1: if (Texto === 'Serviços') { item.classList.add('danger'); item.classList.remove('active'); } break;
          default:
        }
      });
    }
  }, []);

  const handleSave = useCallback((props) => {
    const Step_01 = JSON.parse(localStorage.getItem('TEMPOMOV-FICHA'));
    const Step_02 = JSON.parse(localStorage.getItem('TEMPOMOV-FICHA-SERVICOS'));

    saveTM(props, Step_01);
    saveRTMServicos(props, Step_02);
  }, []);

  ////// HANDLE BTN VOLTAR / AVANCAR
  const handleNavigation = useCallback((step, direction) => {
    const total_steps = 1;

    function handleDirection(total_steps) {
      if (direction === 'next') { newStep += parseInt(1, 10); }
      if (direction === 'prev') { newStep -= parseInt(1, 10); }
      if (newStep >= total_steps) { newStep = total_steps; }
      if (newStep < 0) { newStep = 0; }
    }

    const {
      status, operacao, tipo_servico, id_servico,
    } = props;

    const lista = document.getElementsByClassName('wizard-steps');
    const links = document.getElementsByClassName('wizard-steps-links');

    let newStep = parseInt(step, 10);
    handleDirection(total_steps);

    let n = 0;
    while (n <= total_steps) {
      const nextStep = lista[newStep].classList.value;

      if (!nextStep.includes('hide')) {
        /// VALIDAÇÃO STEP 0
        if (parseInt(step, 10) === 0) {
          if (parseInt(status, 10) === 0 || parseInt(operacao, 10) === 0 || parseInt(tipo_servico, 10) === 0 || parseInt(id_servico, 10) === 0) {
            checkValidation();
            return;
          }
          resetValidation();
        }

        n = total_steps + 1;
        setStep(newStep);
        lista[newStep].classList.add('done');
        links[newStep].click();
      } else {
        n += 1;
        handleDirection();
      }
    }
  }, [props]);

  const handleExcluir = useCallback(() => {
    deleteRegistro(props, '/TsmTEMPOMOV/EXCLUI/', '');
    const { history } = props;
    const url = `/projeto/painel/${id_projeto}/tempos-movimentos`;
    history.push(url);
  }, [props, id_projeto]);

  const handleAnexo = useCallback(() => {
    const { history } = props;
    const url = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id_tempomov}/anexo`;
    history.push(url);
  }, [props, id_projeto, id_tempomov]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { id, idTempoMov } = props.match.params;
      localStorage.removeItem('TEMPOMOV-FICHA');
      localStorage.removeItem('TEMPOMOV-FICHA-SERVICOS');

      const btn_anexo = document.getElementById('button-tempomov-anexo').classList;
      const btn_excluir = document.getElementById('button-tempomov-excluir').classList;

      parseInt(idTempoMov, 10) > 0 ? btn_anexo.remove('hide') : btn_anexo.add('hide');
      parseInt(idTempoMov, 10) > 0 ? btn_excluir.remove('hide') : btn_excluir.add('hide');

      setId_projeto(parseInt(id, 10));
      setId_tempomov(idTempoMov);
      handleStepAutoClick(0, false);
      setFirst(false);
    }
  }, [props, firstLoad, handleStepAutoClick]);

  return (
    <Container fluid className="p-0">

      <PageTitle
        history={props.history}
        title="Projeto"
        subtitle="/ Tempos & Movimentos / Cadastrar"
        voltar
        linkTo={`/projeto/painel/${id_projeto}/tempos-movimentos`}
      />

      <TabsProjeto ativo={6} props={props} />

      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => handleExcluir()}
      />

      <Row>
        <Col sm={12}>
          <Card>
            <CardBody className="pb-0">

              <CardHeaderName
                {...props}
                titulo={nomeProjeto}
                label="Projeto:"
                buttons={headerButtons}

              />

              <Wizard
                {...props}
                data={data}
                modulo="TEMPOS-MOVIMENTOS"
                stepsSelected={1}
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
  fichaData: state.servicos.fichaData,
  step: state.wizard.step,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ProjetoServicoFicha);
