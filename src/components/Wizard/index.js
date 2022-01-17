import React from 'react';
import { Container } from 'reactstrap';
import jQuery from 'jquery';
import './style.css';

const $ = jQuery;
let header = [];
let content = [];

window.jQuery = jQuery;

require('./custom.smartWizard.js');

class WizardVariant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {
    const {
      stepsDisabled, stepsError, stepsHidden, stepsSelected, modulo,
    } = this.state.data;

    let totalSelected = 0;

    if (stepsSelected > 0) {
      switch (modulo) {
        case 'PROSERVICO': totalSelected = 9; break;
        case 'ROOMINGLIST': totalSelected = 2; break;
        case 'TEMPOS-MOVIMENTOS': totalSelected = 1; break;
        case 'ORCAMENTO': totalSelected = 2; break;
        default:
      }
    }

    $(this.refs.smartwizard)
      .smartWizard({
        theme: 'arrows',
        backButtonSupport: false,
        keyNavigation: false,
        showStepURLhash: false,
        autoAdjustHeight: true,

        transitionEffect: 'fade',
        transitionSpeed: 300,

        hiddenSteps: stepsHidden,
        selected: totalSelected,
        disabledSteps: stepsDisabled,
        errorSteps: stepsError,

        lang: {
          next: 'Avançar',
          previous: 'Voltar',
        },

        toolbarSettings: {
          showNextButton: true,
          showPreviousButton: true,
          toolbarPosition: 'bottom',
        //btn save
        //toolbarExtraButtons: [$('<button class='btn btn-submit btn-primary' type='button'>Salvar</button>')]
        },

        anchorSettings: {
          anchorClickable: true,
          markDoneStep: true,
        },
      });
    //.on('leaveStep', function(e, anchorObject, stepNumber, stepDirection) {
    //if (stepDirection === 'forward') {
    //console.log(stepNumber);
    //}
    //return true;
    //});

    //$(this.refs.smartwizard)
    //.find('.btn-submit')
    //.on('click', function() {
    ////alert('Great! The form is ready to submit.');
    //// Final validation
    //return false;
    //});
  }

  render = () => {
    const { data } = this.state.data;

    const handleBtnIncluir = (step) => {
      const lista = document.getElementsByClassName('wizard-steps');
      const active = lista[step].classList.value.includes('active');
      if (active) {
        const { dispatch } = this.state.data;
        dispatch({ type: '@STEP_CLICK', payload: step });
      }
    };

    if (data !== undefined) {
      header = [];
      content = [];
      data.forEach((item) => {
        header.push(
          <li className={`wizard-steps ${item.visibility}`}>
            <a
              href={`#step-${item.step}`}
              className="wizard-steps-links"
              onClick={() => handleBtnIncluir(item.step)}
            >
              <p className="title-wizard p-0 m-0">{ item.title }</p>
              <small>{ item.description }</small>
            </a>
          </li>,
        );
        content.push(<div id={`step-${item.step}`}>{ item.content }</div>);
      });
    } else {
      header = [
        <li>
          <a href="#step-1">
            First Step
            <br />
            <small>Step description</small>
          </a>
        </li>];
      content = [<div id="step-1">Step Content 1</div>];
    }

    return (
      <div ref="smartwizard" className="wizard border-none wizard-dark mb-4">
        <ul>
          { header }
        </ul>
        <div>
          { content }
        </div>
      </div>
    );
  };
}

const Wizard = (data) => (
  <Container fluid className="p-0">
    <WizardVariant data={data} />
  </Container>
);

export default Wizard;
