///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, CardBody, Card, Col,
} from 'reactstrap';
import {
  TabsProjeto, Wizard, CardHeaderName, PageTitle, Buttons,
} from '../../../components';
import {
  getDados, formatData, checkValidation, resetValidation,
} from '../../../functions/sistema';
import { saveProServico, visibilitySteps } from '../../../functions/projeto/servico';

import Step01 from './Step_01_Servico';
import Step02 from './Step_02_Fornecedor';
import Step03 from './Step_03_Tarifa';
import Step04 from './Step_04_Bilhete';
import Step05 from './Step_05_Recebimento';
import Step06 from './Step_06_Pagamento';
import Step07 from './Step_07_PAX';
import Step08 from './Step_08_Itinerario';
import Step09 from './Step_09_Capa';
import Step10 from './Step_10_Obs';

function ProjetoServicoFicha(props) {
  const [firstLoad, setFirst] = useState(true);
  const [actionButtons, setActionButtons] = useState([]);
  const [urlVoltar, setUrlVoltar] = useState('');
  const [nomeProjeto, setNomeProjeto] = useState('');

  const [step, setStep] = useState(0);

  const data = [
    {
      step: 0, title: 'Serviço', description: '', content: <Step01 {...props} />, visibility: 'proservico-step-1',
    },
    {
      step: 1, title: 'Fornecedor', description: '', content: <Step02 {...props} />, visibility: 'proservico-step-2',
    },
    {
      step: 2, title: 'Tarifa', description: '', content: <Step03 {...props} />, visibility: 'proservico-step-3',
    },
    {
      step: 3, title: 'Bilhete', description: '', content: <Step04 {...props} />, visibility: 'proservico-step-4 hide',
    },
    {
      step: 4, title: 'Recebimento', description: '', content: <Step05 {...props} />, visibility: 'proservico-step-5',
    },
    {
      step: 5, title: 'Pagamento', description: '', content: <Step06 {...props} />, visibility: 'proservico-step-6 hide',
    },
    {
      step: 6, title: 'PAX', description: '', content: <Step07 {...props} />, visibility: 'proservico-step-7',
    },
    {
      step: 7, title: 'Itinerário', description: '', content: <Step08 {...props} />, visibility: 'proservico-step-8 hide',
    },
    {
      step: 8, title: 'Capa Bilhete', description: '', content: <Step09 {...props} />, visibility: 'proservico-step-9',
    },
    {
      step: 9, title: 'Observação', description: '', content: <Step10 {...props} />, visibility: 'proservico-step-10',
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
      case 3:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_BILHETE_FORM';
        break;
      case 4:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_RECEBIMENTO_FORM';
        break;
      case 5:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_PAGAMENTO_FORM';
        break;
      case 6:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_PAX_FORM';
        break;
      case 7:
        relacionalIncluir = true;
        relacionalAction = '@SET_FICHA_ITINERARIO_FORM';
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
        case 0: if (item.textContent === 'Serviço') { item.click(); } break;
        case 1: if (item.textContent === 'Fornecedor') { item.click(); } break;
        case 2: if (item.textContent === 'Tarifa') { item.click(); } break;
        case 3: if (item.textContent === 'Bilhete') { item.click(); } break;
        case 4: if (item.textContent === 'Recebimento') { item.click(); } break;
        case 5: if (item.textContent === 'Pagamento') { item.click(); } break;
        case 6: if (item.textContent === 'PAX') { item.click(); } break;
        case 7: if (item.textContent === 'Itinerário') { item.click(); } break;
        case 8: if (item.textContent === 'Capa Bilhete') { item.click(); } break;
        case 9: if (item.textContent === 'Observação') { item.click(); } break;
        default:
      }
    });

    if (error) {
      lista.forEach((item) => {
        switch (tab) {
          case 0: if (item.textContent === 'Serviço') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 1: if (item.textContent === 'Fornecedor') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 2: if (item.textContent === 'Tarifa') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 3: if (item.textContent === 'Bilhete') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 4: if (item.textContent === 'Recebimento') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 5: if (item.textContent === 'Pagamento') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 6: if (item.textContent === 'PAX') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 7: if (item.textContent === 'Itinerário') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 8: if (item.textContent === 'Capa Bilhete') { item.classList.add('danger'); item.classList.remove('active'); } break;
          case 9: if (item.textContent === 'Observação') { item.classList.add('danger'); item.classList.remove('active'); } break;
          default:
        }
      });
    }
  }, [handleBtnIncluir]);

  const handleSave = useCallback((props) => {
    const { id, idServico } = props.match.params;

    const Step_01 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_01'));
    const Step_02 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_02'));
    const Step_03 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_03'));
    const Step_04 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_04'));
    const Step_05 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_05'));
    const Step_06 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_06'));
    const Step_07 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_07'));
    const Step_08 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_08'));
    const Step_09 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_09'));
    const Step_10 = JSON.parse(localStorage.getItem('PROSERVICO_FORM_STEP_10'));

    ////// STEP 03 - TARIFA
    let Seguro = Step_03.seguro;
    let Rep_pessoa = parseInt(Step_03.rep_pessoa, 10);
    let Rep_id_pfisica = parseInt(Step_03.rep_id_pfisica, 10);
    let Rep_id_pjuridica = parseInt(Step_03.rep_id_pjuridica, 10);
    let Rep_nome_pessoa = Step_03.rep_nome_pessoa;
    let Rep_nome_pessoa2 = Step_03.rep_nome_pessoa2;

    if (Number.isNaN(Seguro)) { Seguro = 0; }
    if (Number.isNaN(Rep_pessoa)) { Rep_pessoa = 0; }
    if (Number.isNaN(Rep_id_pfisica)) { Rep_id_pfisica = 0; }
    if (Number.isNaN(Rep_id_pjuridica)) { Rep_id_pjuridica = 0; }

    if (Rep_nome_pessoa === undefined) { Rep_nome_pessoa = ''; }
    if (Rep_nome_pessoa2 === undefined) { Rep_nome_pessoa2 = ''; }

    ////// STEP 04 - BILHETE
    const rbilhete_regs = [];
    Step_04.length > 0 && Step_04.forEach((item) => {
      rbilhete_regs.push({
        dt_emissao: item.dt_emissao,
        id: item.id,
        linha: item.linha,
        numero: item.numero,
        pta: item.pta,
        tour_code: item.tour_code,
      });
    });

    ////// STEP 05 - RECEBIMENTO
    const rconrecto_regs = [];
    Step_05.forEach((item) => {
      rconrecto_regs.push({
        bloqueio: item.bloqueio,
        cambio: item.cambio,
        car_cartao: item.car_cartao,
        car_id_cartao: item.car_id_cartao,
        car_numero: item.car_numero,
        car_seguranca: item.car_seguranca,
        car_senha: item.car_senha,
        car_titular: item.car_titular,
        car_validade: item.car_validade,
        cartaocorp: item.cartaocorp,
        data: item.data,
        documento: item.documento,
        forma: item.forma,
        id: item.id,
        id_cartaocorp: item.id_cartaocorp,
        id_movimento: item.id_movimento,
        id_pfisica: item.id_pfisica,
        id_pjuridica: item.id_pjuridica,
        linha: item.linha,
        ndocumento: item.ndocumento,
        nome_pessoa: item.nome_pessoa,
        pessoa: item.pessoa,
        rateio: item.rateio,
        valor: item.valor,
      });
    });
    ////// STEP 06 - PAGAMENTO
    const rconpagto_regs = [];
    Step_06.forEach((item) => {
      rconpagto_regs.push({
        bloqueio: item.bloqueio,
        cambio: item.cambio,
        car_cartao: item.car_cartao,
        car_id_cartao: item.car_id_cartao,
        car_numero: item.car_numero,
        car_seguranca: item.car_seguranca,
        car_senha: item.car_senha,
        car_titular: item.car_titular,
        car_validade: item.car_validade,
        cartaocorp: item.cartaocorp,
        data: item.data,
        documento: item.documento,
        forma: item.forma,
        id: item.id,
        id_cartaocorp: item.id_cartaocorp,
        id_movimento: item.id_movimento,
        id_pfisica: item.id_pfisica,
        id_pjuridica: item.id_pjuridica,
        linha: item.linha,
        ndocumento: item.ndocumento,
        nome_pessoa: item.nome_pessoa,
        pessoa: item.pessoa,
        rateio: item.rateio,
        valor: item.valor,
      });
    });

    ////// STEP 07 - PAX
    const rpax_regs = [];
    Step_07.forEach((item) => {
      rpax_regs.push({
        id: item.id,
        id_pfisica: item.id_pfisica,
        linha: item.linha,
        nome_completo: item.nome_completo,
        nome_reserva: item.nome_reserva,
        tipo: item.tipo,
      });
    });

    ////// STEP 08 - ITINERARIO
    const ritinerario_regs = [];
    Step_08.forEach((item) => {
      ritinerario_regs.push({
        cia: item.cia,
        classe: item.classe,
        ddestino: item.ddestino,
        destino: item.destino,
        dorigem: item.dorigem,
        dtdes: item.dtdes,
        dtemb: item.dtemb,
        farebasis: item.farebasis,
        hrdes: item.hrdes,
        hremb: item.hremb,
        id: item.id,
        linha: item.linha,
        origem: item.origem,
        tipo: item.tipo,
        voo: item.voo,
      });
    });

    ////// STEP 09 - CAPA BILHETE
    let capa_bilhete;
    switch (Step_09) {
      case null: capa_bilhete = ''; break;
      default: capa_bilhete = Step_09.capa_bilhete;
    }

    ////// STEP 10 - OBSERVACAO
    let observacao;
    switch (Step_10) {
      case null: observacao = ''; break;
      default: observacao = Step_10.observacao;
    }

    const form = {
      id: parseInt(idServico, 10),
      id_projeto: parseInt(id, 10),

      ////// STEP 01 - SERVICO
      status: Step_01.status,
      operacao: Step_01.operacao,
      tipo_servico: parseInt(Step_01.tipo_servico, 10),
      id_servico: parseInt(Step_01.id_servico, 10),
      alt_dhsis: Step_01.alt_dhsis,

      ////// STEP 02 - FORNECEDOR
      descricao: Step_02.descricao,
      for_pessoa: Step_02.for_pessoa,
      for_id_pfisica: parseInt(Step_02.for_id_pfisica, 10),
      for_id_pjuridica: parseInt(Step_02.for_id_pjuridica, 10),
      for_gera_pagto: Step_02.for_gera_pagto,

      especificacao: Step_02.especificacao,
      hos_tipo: Step_02.hos_tipo,
      hos_apto: Step_02.hos_apto,

      cnf_data: formatData(Step_02.cnf_data),
      cnf_numero: Step_02.cnf_numero,
      cnf_contato: Step_02.cnf_contato,

      ////// STEP 03 - TARIFA
      seguro: Seguro,
      rep_pessoa: Rep_pessoa,
      rep_id_pfisica: Rep_id_pfisica,
      rep_id_pjuridica: Rep_id_pjuridica,
      rep_nome_pessoa: Rep_nome_pessoa,
      rep_nome_pessoa2: Rep_nome_pessoa2,

      cedente: Step_03.cedente,

      cobranca: Step_03.cobranca,
      id_moeda: parseInt(Step_03.id_moeda, 10),
      cambio: Step_03.cambio,
      em_moeda: Step_03.em_moeda,

      dt_inicio: `${formatData(Step_03.dt_inicio)} ${Step_03.hr_inicio}`,
      dt_termino: `${formatData(Step_03.dt_termino)} ${Step_03.hr_termino}`,
      quantidade: Step_03.quantidade,
      regime: Step_03.regime,

      //taxa_aeroportuaria: Step_03.taxa_aeroportuaria,
      //taxa_embarque: Step_03.taxa_embarque,

      extra: Step_03.extra,
      taxa_seguro: Step_03.taxa_seguro,

      valor: Step_03.valor,
      tax_percentual: Step_03.tax_percentual,
      tax_valor: Step_03.tax_valor,

      tre_bloqueio: Step_03.tre_bloqueio,
      tre_percentual: Step_03.tre_percentual,
      tre_valor: Step_03.tre_valor,
      tre_indice: Step_03.tre_indice,

      com_bloqueio: Step_03.com_bloqueio,
      com_percentual: Step_03.com_percentual,
      com_valor: Step_03.com_valor,
      com_indice: Step_03.com_indice,

      inc_bloqueio: Step_03.inc_bloqueio,
      inc_percentual: Step_03.inc_percentual,
      inc_valor: Step_03.inc_valor,
      inc_base: Step_03.inc_base,

      imp_percentual: Step_03.imp_percentual,
      imp_valor: Step_03.imp_valor,
      rentabilidade: Step_03.rentabilidade,

      valor_total: Step_03.valor_total,
      valor_totalsimp: Step_03.valor_totalsimp,

      rec_valortotal: Step_03.rec_valortotal,
      pag_valortotal: Step_03.pag_valortotal,

      ////// STEP 04 - BILHETE
      rbilhete_regs,
      ////// STEP 05 - RECEBIMENTO
      rconrecto_regs,
      ////// STEP 06 - PAGAMENTO
      rconpagto_regs,
      ////// STEP 07 - PAX
      rpax_regs,
      ////// STEP 08 - ITINERARIO
      ritinerario_regs,
      ////// STEP 09 - CAPA BILHETE
      capa_bilhete,
      ////// STEP 10 - OBSERVACAO
      observacao,
      ////// USER
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
    };

    async function Save(form) {
      const response = await saveProServico(props, form);
      if (response.retorno === 0) {
        handleStepAutoClick(response.tag - 1, true);
      }
    }

    Save(form);
  }, [handleStepAutoClick]);

  ////// HANDLE BTN VOLTAR / AVANCAR
  const handleNavigation = useCallback((step, direction) => {
    const total_steps = 9;

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
        ///////////////////////////////////
        /// VALIDAÇÃO STEP 0 - SERVICOS ///
        ///////////////////////////////////
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

  /// FIRST LOAD
  useEffect(() => {
    const { match } = props;

    if (firstLoad) {
      const { id } = match.params;
      const id_servico = match.params.idServico;
      setUrlVoltar(`/projeto/painel/${id}/servicos`);

      if (parseInt(id_servico, 10) > 0) {
        handleStepAutoClick(0, false);
        getDados(props, `/tsmPROSERVICO/FICHA/${id_servico}`, '@SET_PROSERVICO_FICHA');
      }

      setFirst(false);
    }
  }, [props, firstLoad, handleStepAutoClick]);

  /// NOME PROJETO
  useEffect(() => {
    const { projeto } = props.fichaData;
    setNomeProjeto(projeto);
  }, [props.fichaData]);

  ////// MONITORA CLICK NAS ABAS
  useEffect(() => {
    handleBtnIncluir(props.step);
  }, [props.step, handleBtnIncluir]);

  /// ATUALIZA VISIBILITY STEPS
  useEffect(() => {
    /// TIPO SERVIÇO
    switch (parseInt(props.tipo_servico, 10)) {
      case 1: /// aereo
        visibilitySteps(4, true); /// bilhete
        visibilitySteps(8, true); /// itinerario
        break;
      case 3: /// veículo
        visibilitySteps(8, true); /// itinerario
        break;
      default: /// padrão
        visibilitySteps(4, false);
        visibilitySteps(8, false);
    }

    /// OPERACAO
    switch (parseInt(props.operacao, 10)) {
      case 1: /// agenciamento
        if (props.cedente === 1) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, false); /// pagamento
        } else
        if (props.cedente === 2) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, true); /// pagamento
        }
        break;
      case 2: /// compra
        if (props.cedente === 1 || props.cedente === 2) {
          visibilitySteps(5, false); /// recebimento
          visibilitySteps(6, true); /// pagamento
        }
        break;
      case 3: /// venda
        if (props.cedente === 1 || props.cedente === 2) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, false); /// pagamento
        }
        break;
      default:
    }

    /// CEDENTE
    switch (parseInt(props.cedente, 10)) {
      case 1:
        if (parseInt(props.operacao, 10) === 1) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, false); /// pagamento
        } else
        if (parseInt(props.operacao, 10) === 2) {
          visibilitySteps(5, false); /// recebimento
          visibilitySteps(6, true); /// pagamento
        } else
        if (parseInt(props.operacao, 10) === 3) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, false); /// pagamento
        }
        break;
      case 2:
        if (parseInt(props.operacao, 10) === 1) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, true); /// pagamento
        } else
        if (parseInt(props.operacao, 10) === 2) {
          visibilitySteps(5, false); /// recebimento
          visibilitySteps(6, true); /// pagamento
        } else
        if (parseInt(props.operacao, 10) === 3) {
          visibilitySteps(5, true); /// recebimento
          visibilitySteps(6, false); /// pagamento
        }
        break;
      default:
    }
  }, [props.tipo_servico, props.operacao, props.cedente]);

  return (
    <Container fluid className="p-0">
      <PageTitle
        {...props}
        title="Projeto"
        buttons={actionButtons}
        subtitle="/ Serviços / Cadastrar"
        voltar
        linkTo={urlVoltar}
      />

      <TabsProjeto ativo={5} props={props} />

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
                modulo="PROSERVICO"
                stepsSelected={props.match.params.idServico}
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
  fichaData: state.servicos.fichaData,
  step: state.wizard.step,

  nomeProjeto: state.projeto.nomeProjeto,
  status: state.servicos.statusServico,

  cedente: state.servicos.cedente,
  operacao: state.servicos.operacaoServico,
  tipo_servico: state.servicos.tipo_servico,
  id_servico: state.servicos.Id_servico,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(ProjetoServicoFicha);
