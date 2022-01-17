///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  getDados, formatCompleteZeros, formatHora, formatDataInput,
  formatDecimal, //formatExibeValor,
} from '../../../../functions/sistema';
import { calculaPag_ValorTotal } from '../../../../functions/projeto/servico';
import { AutoCompletarV2, Checkbox } from '../../../../components';
import './style.css';

function Step04(props) {
  const hoje = moment().format('L');

  const {
    dispatch,
    AC_Fornecedor,
    AC_ID_Fornecedor,
    Representante_Id,
    Representante_DadosAdicionais,
    AC_Fornecedor_DadosAdicionais,
  } = props;

  const [id, setId] = useState(0);
  const [firstLoad, setFirst] = useState(true);

  ////// LINHA 01
  const [rep_pessoa, setRep_pessoa] = useState('');
  const [rep_id_pfisica, setRep_id_pfisica] = useState('');
  const [rep_id_pjuridica, setRep_id_pjuridica] = useState('');
  const [rep_nome_pessoa, setRep_nome_pessoa] = useState('');
  const [rep_nome_pessoa2, setRep_nome_pessoa2] = useState('');

  const [listaCedente, setListaCedente] = useState('');
  const [cedente, setCedente] = useState(0);

  const [tipo_servico, setTipo_servico] = useState(0);
  const [id_Representante, setId_Representante] = useState(0);
  const [representante, setRepresentante] = useState('');

  ////// LINHA 02
  const [listaCobranca, setListaCobranca] = useState('');
  const [cobranca, setCobranca] = useState('');
  const [listaMoeda, setListaMoeda] = useState('');
  const [id_moeda, setId_moeda] = useState(1);
  const [visibilityBoxMoeda, setVisibilityBoxMoeda] = useState('hide');
  const [cambio, setCambio] = useState(1);
  const [em_moeda, setEm_moeda] = useState(false);

  const [dt_inicio, setDt_inicio] = useState(formatDataInput(hoje));
  const [hr_inicio, setHr_inicio] = useState('');
  const [dt_termino, setDt_termino] = useState(formatDataInput(hoje));
  const [hr_termino, setHr_termino] = useState('');
  const [labelQuantidade, setLabelQuantidade] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const [listaRegime, setListaRegime] = useState('');
  const [regime, setRegime] = useState('');

  const [listaSeguro, setListaSeguro] = useState([]);
  const [seguro, setSeguro] = useState(0);
  const [taxa_seguro, setTaxa_seguro] = useState(0);

  ////// LINHA 03 - %
  const [labelValor, setlabelValor] = useState('');
  const [valor, setValor] = useState(0);
  const [extra, setExtra] = useState('');

  const [tax_percentual, setTax_percentual] = useState('');
  const [tax_percentual_valor, setTax_percentual_valor] = useState('');

  const [tre_percentual, setTre_percentual] = useState('');
  const [com_percentual, setCom_percentual] = useState('');
  const [inc_percentual, setInc_percentual] = useState('');
  const [imp_percentual, setImp_percentual] = useState('');
  const [ren_percentual, setRen_percentual] = useState('');
  ////// LINHA 04 - VALOR
  const [tax_valor, setTax_valor] = useState('');
  const [tre_valor, setTre_valor] = useState('');
  const [com_valor, setCom_valor] = useState('');
  const [inc_valor, setInc_valor] = useState('');
  const [imp_valor, setImp_valor] = useState('');
  const [rentabilidade, setRentabilidade] = useState('');
  const [valor_total, setValor_total] = useState('');
  ////// LINHA 05 - ÍNDICE
  const [tre_indice, setTre_indice] = useState('');
  const [com_indice, setCom_indice] = useState('');
  const [inc_base, setInc_base] = useState('');
  const [valor_totalsimp, setValor_totalsimp] = useState('');

  const [tre_bloqueio, setTre_bloqueio] = useState(false);
  const [com_bloqueio, setCom_bloqueio] = useState(false);
  const [inc_bloqueio, setInc_bloqueio] = useState(false);

  ////// LINHA 06 - VALORES EM REAIS
  const [valor_real, setValor_real] = useState('');
  const [taxa_real, setTaxa_real] = useState('');
  const [rent_real, setRent_real] = useState('');
  const [total_real, setTotal_real] = useState('');

  const [pag_valortotal, setPag_valortotal] = useState('');
  const [rec_valortotal, setRec_valortotal] = useState('');

  const [flagAtualizado, setAtualizado] = useState(false);

  ////// VISIBILITY
  const [visibilityHospedagem, setVisibilityHospedagem] = useState('hide');
  const [visibilityDatas, setVisibilityDatas] = useState('hide');
  const [visibilityVeiculo, setVisibilityVeiculo] = useState('hide');
  const [visibilityIncentivo, setVisibilityIncentivo] = useState('');
  const [visibilityIndice, setVisibilityIndice] = useState('hide');

  const [visibilityCobrancaAereo, setVisibilityCobrancaAereo] = useState('hide');
  const [visibilityCobrancaAgenciamento, setVisibilityCobrancaAgenciamento] = useState('hide');
  const [visibilityCobranca, setVisibilityCobranca] = useState('hide');
  const [visibilityQTD, setVisibilityQTD] = useState('hide');

  const [visibilityTRE, setVisibilityTRE] = useState('');
  const [visibilityCOM, setVisibilityCOM] = useState('');
  const [visibilityCOL, setVisibilityCOL] = useState('hide');

  const [disabledCedente, setDisabledCedente] = useState(false);
  const [disabledQtd, setDisabledQtd] = useState(true);

  const [disabledTRE, setDisableTRE] = useState(false);
  const [disabledCOM, setDisableCOM] = useState(false);
  const [disabledINC, setDisableINC] = useState(false);
  const [disabledValor, setDisabledValor] = useState(false);

  const calculaValor = useCallback((value, coluna, valorOriginal) => {
    ////// ETAPA 1 - FORMATAR PERCENTUAL
    const percentualDigitado = value.toString().replace(',', '');
    const percentual = percentualDigitado;

    let valorTarifa;
    valorOriginal === undefined
      ? valorTarifa = valor
      : valorTarifa = valorOriginal;

    ///// ETAPA 2 - CALCULO DO VALOR PERCENTUAL
    //const valorPercentual = (valorTarifa * value) / 100;
    const valorPercentual = ((valorTarifa * value * quantidade) / 100).toFixed(2);

    //const valorFinal = formatDecimal(valorPercentual, 2);
    const valorFinal = formatCompleteZeros(valorPercentual, 2);

    ////// imposto
    const valorPercentualI = (valor_totalsimp * percentual) / 100;
    const valorFinalI = formatCompleteZeros(valorPercentualI, 2);

    ///// ETAPA 3 - ATUALIZA STATES
    switch (coluna) {
      case 1:
        setTax_percentual(percentual);
        setTax_percentual_valor(valorFinal);
        break;
      case 2:
        setTre_percentual(percentual);
        setTre_valor(valorFinal);
        break;
      case 3:
        setCom_percentual(percentual);
        setCom_valor(valorFinal);
        break;
      case 4:
        setInc_percentual(percentual);
        setInc_valor(valorFinal);
        break;
      case 5:
        setImp_percentual(percentual);
        setImp_valor(valorFinalI);
        break;
      default:
    }
  }, [valor, cambio, valor_totalsimp]);

  const calculaPercentual = useCallback((value, coluna) => {
    ////// ETAPA 1 - FORMATAR VALOR
    const valorDigitado = value.toString().replace(',', '');
    //const valorDigitado = value.toString().replace(',', '');

    //const valorFinal = formatDecimal(valorDigitado, 2);
    const valorFinal = valorDigitado;
    ////// calcula taxa percentual individual
    const taxFinal = (percentualFinal / 100) * valor;

    ////// ETAPA 2 - CALCULO DO PERCENTUAL
    //const valorPercentual = (valorFinal * 100) / valor;
    const valorPercentual = ((valorFinal / quantidade / valor) * 100).toFixed(3);
    //const valorPercentual = (valorFinal / quantidade / valor) * 100;
    const percentualFinal = formatCompleteZeros(valorPercentual, 3);

    //////// imposto
    const valorPercentualI = (valorFinal * 100) / valor_totalsimp;
    const percentualFinalI = formatCompleteZeros(valorPercentualI, 3);

    ///// ETAPA 3 - ATUALIZA STATES
    switch (coluna) {
      case 1:
        setTax_percentual(percentualFinal);
        setTax_percentual_valor(taxFinal);
        setTax_valor(valorFinal);
        break;
      case 2:
        setTre_percentual(percentualFinal);
        setTre_valor(valorFinal);
        break;
      case 3:
        setCom_percentual(percentualFinal);
        setCom_valor(valorFinal);
        break;
      case 4:
        setInc_percentual(percentualFinal);
        setInc_valor(valorFinal);
        break;
      case 5:
        setImp_percentual(percentualFinalI);
        setImp_valor(valorFinal);
        break;
      default:
    }
  }, [valor, valor_totalsimp]);

  const calculaCambio = useCallback((cambio, tax_valor) => {
    setCambio(cambio);
    setTax_valor(tax_valor);

    const valor_real = formatCompleteZeros((valor * cambio), 2);
    const taxa_real = formatCompleteZeros((tax_valor * cambio), 2);
    const rent_real = formatCompleteZeros((rentabilidade * cambio), 2);

    setValor_real(valor_real);
    setTaxa_real(taxa_real);
    setRent_real(rent_real);
  }, [valor, rentabilidade]);

  const calculaIndice = useCallback((value, coluna) => {
    ////// ETAPA 1 - FORMATAR VALOR
    let valorDigitado = value.replace(',', '');

    ////// SEMPRE INDICE DA TAXA % SUPERIOR A 1
    if (parseInt(coluna, 10) === 1 && value < 1) {
      valorDigitado = 1;
      setTre_indice(1);
    }

    ////// VALOR A SER USADO NO CÁLCULO
    const valorFinal = valorDigitado;

    ////// ETAPA 2 - RECALCULA VALOR (PARA RESET)
    let valorPercentual;
    switch (coluna) {
      case 1: valorPercentual = (quantidade * valor * tre_percentual) / 100; break;
      case 2: valorPercentual = (quantidade * valor * com_percentual) / 100; break;
        //case 3:  valorPercentual =  valor * inc_percentual  / 100; break;
      default:
    }

    ////// ETAPA 3 - CALCULO DO NOVO VALOR
    const novoValor = valorPercentual / valorFinal;
    const novoValorFinal = formatCompleteZeros(novoValor, 2);

    ///// ETAPA 4 - ATUALIZA STATES
    switch (coluna) {
      case 1:
        if (value > 0) { setTre_valor(novoValorFinal); }
        if (value === 1 || value === 0 || value === '') { setTre_valor(formatCompleteZeros(valorPercentual, 2)); }
        setTre_indice(valorFinal);
        break;
      case 2:
        if (value > 0) { setCom_valor(novoValorFinal); }
        if (value === 1 || value === 0 || value === '') { setCom_valor(formatCompleteZeros(valorPercentual, 2)); }
        setCom_indice(valorFinal);
        break;
        //case 3:
        //if ( value > 0 ) { setInc_valor( novoValorFinal ); }
        //if ( value === 1 || value === 0 || value === '' ) { setInc_valor( formatCompleteZeros(valorPercentual, 2) ); }
        //setInc_base(valorFinal);
        //break;
      default:
    }
  }, [valor, tre_percentual, com_percentual]);

  const calculaBase = useCallback((value) => {
    let baseValue = value;
    if (baseValue < 0) { baseValue = 0; }

    const valorPercentual = (valor * inc_percentual) / 100;
    const percentual = formatCompleteZeros((valorPercentual * baseValue) / 100, 2);

    setInc_base(baseValue);
    setInc_valor(percentual);
  }, [valor, inc_percentual]);

  const calculaDias = useCallback((dt_inicio, dt_termino) => {
    const date1 = new Date(dt_inicio);
    const date2 = new Date(dt_termino);

    const difTime = date2.getTime() - date1.getTime();
    const difDays = difTime / (1000 * 3600 * 24);

    let response = 0;

    difDays <= 0
      ? response = 1
      : response = difDays;

    return response;
  }, []);

  const calcula_PagTotal_RecTotal = useCallback((valor_total, dadosPagTotal, operacao, cedente) => {
    let total_rec = 0;
    let total_pag = 0;

    switch (parseInt(operacao, 10)) {
      /// AGENCIAMENTO
      case 1:
        parseInt(cedente, 10) === 2
          ? total_pag = calculaPag_ValorTotal(dadosPagTotal)
          : total_pag = 0;

        parseInt(cedente, 10) === 1
          ? total_rec = valor_total
          : total_rec = valor_total;
        break;
      /// COMPRA
      case 2:
        total_rec = 0;
        total_pag = calculaPag_ValorTotal(dadosPagTotal);
        break;
      /// VENDA
      case 3:
        total_rec = valor_total;
        total_pag = 0;
        break;
      default:
    }

    setRec_valortotal(total_rec);
    setPag_valortotal(total_pag);

    dispatch({ type: '@SET_PROSERVICO_TOTAL_RECEB', payload: total_rec });
    dispatch({ type: '@SET_PROSERVICO_TOTAL_PGMT', payload: total_pag });
  }, [dispatch]);

  const atualizaCobranca = useCallback((value) => {
    const { dispatch } = props;
    setCobranca(value);
    dispatch({ type: '@SET_PROSERVICO_COBRANCA_TARIFA', payload: value });
  }, [props]);

  const atualizaCedente = useCallback((cedente) => {
    const { dispatch } = props;
    setCedente(cedente);
    dispatch({ type: '@SET_PROSERVICO_CEDENTE', payload: cedente });
  }, [props]);

  const atualizaRentabilidade = useCallback((value) => {
    const { dispatch } = props;
    dispatch({ type: '@SET_PROSERVICO_RENT_TARIFA', payload: value });
  }, [props]);

  const atualizaValor = useCallback((value) => {
    setValor(value);
    setValor_real(formatCompleteZeros((value * cambio), 2));

    if (tax_percentual > 0) { calculaValor(tax_percentual, 1, value); }
    if (tre_percentual > 0) { calculaValor(tre_percentual, 2, value); }
    if (com_percentual > 0) { calculaValor(com_percentual, 3, value); }
    if (inc_percentual > 0) { calculaValor(inc_percentual, 4, value); }
    if (imp_percentual > 0) { calculaValor(imp_percentual, 5, value); }
  }, [calculaValor, com_percentual, imp_percentual, inc_percentual, tax_percentual, tre_percentual]);

  const atualizaTotal = useCallback((dados) => {
    const {
      valor, tax_percentual, tax_valor, tre_valor, com_valor, inc_valor, imp_valor,
      cambio, extra, quantidade, seguro, taxa_seguro, cobranca, rentabilidade,
    } = dados;

    let _valor = parseFloat(valor);
    let _tax_percentual_valor = parseFloat((tax_percentual * valor * quantidade) / 100);
    let _tax_valor = parseFloat(tax_valor);
    let _tre_valor = parseFloat(tre_valor);
    let _com_valor = parseFloat(com_valor);
    let _inc_valor = parseFloat(inc_valor);
    let _imp_valor = parseFloat(imp_valor);
    let _cambio = parseFloat(cambio);
    let _extra = parseFloat(extra);
    let _taxa_seguro = parseFloat(taxa_seguro);
    let _valor_total = 0;
    let _rentabilidade = parseFloat(rentabilidade);

    if (Number.isNaN(_valor)) { _valor = 0; }
    if (Number.isNaN(_tax_percentual_valor)) { _tax_percentual_valor = 0; }
    if (Number.isNaN(_tax_valor)) { _tax_valor = 0; }
    if (Number.isNaN(_tre_valor)) { _tre_valor = 0; }
    if (Number.isNaN(_com_valor)) { _com_valor = 0; }
    if (Number.isNaN(_inc_valor)) { _inc_valor = 0; }
    if (Number.isNaN(_imp_valor)) { _imp_valor = 0; }
    if (Number.isNaN(_cambio)) { _cambio = 1.0000; }
    if (Number.isNaN(_extra)) { _extra = 0; }
    if (Number.isNaN(_taxa_seguro)) { _taxa_seguro = 0; }
    if (Number.isNaN(_rentabilidade)) { _rentabilidade = 0; }

    let _dias = 1;
    if (parseInt(seguro, 10) === 1) { _dias = quantidade; }

    let _qtd = 1;
    if (parseInt(props.tipo_servico, 10) <= 3) { _qtd = quantidade; }
    if (parseInt(props.tipo_servico, 10) > 3) { _qtd = quantidade; }
    if (parseInt(props.tipo_servico, 10) === 1) { _qtd = 1; }

    if (parseInt(cobranca, 10) === 3) {
      _valor_total = ((_valor * _qtd) + _tax_percentual_valor + _tax_valor + _tre_valor + _com_valor + (_taxa_seguro * _dias) + _extra + _imp_valor).toFixed(2);
      const valor_totalsimp = ((_valor * _qtd) + _tax_percentual_valor + _tax_valor + _tre_valor + _com_valor + (_taxa_seguro * _dias) + _extra).toFixed(2);
      setValor_total(formatCompleteZeros(_valor_total, 2));
      setValor_totalsimp(formatCompleteZeros(valor_totalsimp, 2));
    }

    if (parseInt(cobranca, 10) !== 3) {
      _valor_total = ((_valor * _qtd) + _tax_percentual_valor + _tax_valor + _tre_valor + (_taxa_seguro * _dias) + _extra + _imp_valor).toFixed(2);
      const valor_totalsimp = ((_valor * _qtd) + _tax_percentual_valor + _tax_valor + _tre_valor + (_taxa_seguro * _dias) + _extra).toFixed(2);
      setValor_total(formatCompleteZeros(_valor_total, 2));
      setValor_totalsimp(formatCompleteZeros(valor_totalsimp, 2));
    }

    const valor_real = formatCompleteZeros((valor * _cambio), 2);
    setValor_real(valor_real);

    const total_real = formatCompleteZeros((_valor_total * _cambio), 2);
    setTotal_real(total_real);

    //AGENCIAMENTO
    //AEREO
    if ((parseInt(props.operacaoServico, 10) === 1 && parseInt(props.tipo_servico, 10) === 1)) {
      _rentabilidade = (_tre_valor + _com_valor + _inc_valor).toFixed(2);
      setRentabilidade(formatCompleteZeros(_rentabilidade, 2));
    }

    //DEMAIS
    if ((parseInt(props.operacaoServico, 10) === 1 && parseInt(props.tipo_servico, 10) > 1)) {
      _rentabilidade = (_tre_valor + _com_valor).toFixed(2);
      setRentabilidade(formatCompleteZeros(_rentabilidade, 2));
    }

    //COMPRA
    //AEREO
    if ((parseInt(props.operacaoServico, 10) === 2 && parseInt(props.tipo_servico, 10) === 1)) {
      _rentabilidade = ((_valor_total * (-1)) + _tre_valor + _com_valor + _inc_valor).toFixed(2);
      setRentabilidade(formatCompleteZeros(_rentabilidade, 2));
    }
    //DEMAIS
    if ((parseInt(props.operacaoServico, 10) === 2 && parseInt(props.tipo_servico, 10) > 1)) {
      _rentabilidade = ((_valor_total * (-1)) + (_tre_valor + _com_valor)).toFixed(2);
      setRentabilidade(formatCompleteZeros(_rentabilidade, 2));
    }

    //VENDA
    if (parseInt(props.operacaoServico, 10) === 3) {
      _rentabilidade = _valor_total;
      setRentabilidade(formatCompleteZeros(_rentabilidade, 2));
    }

    atualizaRentabilidade(formatCompleteZeros(_rentabilidade, 2));

    if (_valor > 0) {
      const ren_percentual = (((_rentabilidade) / (_qtd * _valor)) * 100).toFixed(3);
      setRen_percentual(formatCompleteZeros(ren_percentual, 3));
    } else {
      const ren_percentual = '0,000';
      setRen_percentual(formatCompleteZeros(ren_percentual, 3));
    }

    const taxa_real = formatCompleteZeros((_rentabilidade * _cambio), 2);
    setRent_real(taxa_real);
  }, [props]);

  const atualizaQTDgenerico = useCallback((value) => {
    let qtd = value;
    if (qtd < 0) { qtd = 1; }
    setQuantidade(qtd);
  }, []);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      const listaCedente = await getDados(props, '/TsmSISTEMA/CEDENTE_PROSERVICO_TABELA', '');
      setListaCedente(listaCedente);
      //setCedente(cedente);

      ////// COBRANCA
      const listaCobranca = await getDados(props, '/TsmSISTEMA/COBRANCA_PROSERVICO_TABELA', '');
      setListaCobranca(listaCobranca);

      ////// MOEDA
      const listaMoeda = await getDados(props, '/TsmMOEDA/PESQUISA/CODIGO', '');
      setListaMoeda(listaMoeda);

      ////// REGIME
      const listaRegime = await getDados(props, '/TsmSISTEMA/REGIME_TABELA', '');
      setListaRegime(listaRegime);

      ////// REGIME
      const listaSeguro = await getDados(props, '/TsmSISTEMA/SEGURO_TABELA', '');
      setListaSeguro(listaSeguro);
    }
    getTabelas();
  }, [props]);

  /// atualiza pela quantidade
  useEffect(() => {
  ////exCOMV := (inQTDE*exVALR*(exCOMP/100));
    const tre_valor = (valor * quantidade) * (tre_percentual / 100);
    const com_valor = (valor * quantidade) * (com_percentual / 100);
    const inc_valor = (valor * (inc_percentual / 100));

    setTre_valor(formatCompleteZeros(tre_valor, 2));
    setCom_valor(formatCompleteZeros(com_valor, 2));
    setInc_valor(formatCompleteZeros(inc_valor, 2));
  }, [quantidade]);

  useEffect(() => {
    const imp_valor = (imp_percentual * valor_totalsimp) / 100;
    setImp_valor(formatCompleteZeros(imp_valor, 2));
  }, [valor_totalsimp]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getTabelas();
      setFirst(false);
    }
  }, [getTabelas, firstLoad]);

  /// RECEBE FICHA DATA
  useEffect(() => {
    const idUrl = props.match.params.idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    /// EDITAR OU CONSOLIDADOR
    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const {
        id,

        tipo_servico,
        ////// LINHA 01
        rep_pessoa,
        rep_id_pfisica,
        rep_id_pjuridica,
        rep_nome_pessoa,
        rep_nome_pessoa2,
        representante,
        cedente,
        ////// LINHA 02
        cobranca,
        id_moeda,
        cambio,
        em_moeda,

        dt_inicio,
        dt_termino,

        quantidade,
        regime,

        seguro,
        taxa_seguro,
        extra,

        ////// LINHA 03
        valor,

        tre_bloqueio,
        com_bloqueio,
        inc_bloqueio,

        tax_percentual,
        tre_percentual,
        com_percentual,
        inc_percentual,
        imp_percentual,

        ////// LINHA 04
        tax_valor,
        tre_valor,
        com_valor,
        inc_valor,
        imp_valor,
        rentabilidade,
        valor_total,

        ////// LINHA 05
        tre_indice,
        com_indice,
        inc_base,
        valor_totalsimp,

      } = Ficha;

      //if ((id > 0 && !flagAtualizado) || flagConsolidador) {

      ////// LINHA 01
      setRep_pessoa(rep_pessoa);
      setRep_id_pfisica(rep_id_pfisica);
      setRep_id_pjuridica(rep_id_pjuridica);
      setRep_nome_pessoa(rep_nome_pessoa);
      setRep_nome_pessoa2(rep_nome_pessoa2);

      setRepresentante(representante);
      atualizaCedente(cedente);

      switch (rep_pessoa) {
        case 1:
          setId_Representante(rep_id_pfisica);
          setRepresentante(rep_nome_pessoa);
          break;
        case 2:
          setId_Representante(rep_id_pjuridica);
          setRepresentante(rep_nome_pessoa);
          break;
        default:
      }

      ////// LINHA 02
      atualizaCobranca(cobranca);
      setId_moeda(id_moeda);
      setCambio(formatCompleteZeros(cambio, 4));
      setEm_moeda(em_moeda);

      setDt_inicio(formatDataInput(dt_inicio));
      setDt_termino(formatDataInput(dt_termino));
      if (quantidade <= 0 || quantidade === '') { setQuantidade(1); } else { setQuantidade(quantidade); }
      setRegime(regime);

      setSeguro(seguro);
      setTaxa_seguro(formatCompleteZeros(taxa_seguro, 2));
      setExtra(formatCompleteZeros(extra));

      ////// LINHA 03 - %
      setTre_bloqueio(tre_bloqueio);
      setCom_bloqueio(com_bloqueio);
      setInc_bloqueio(inc_bloqueio);
      setValor(formatCompleteZeros(valor, 2));

      setTax_percentual(formatCompleteZeros(tax_percentual, 3));
      setTre_percentual(formatCompleteZeros(tre_percentual, 3));
      setCom_percentual(formatCompleteZeros(com_percentual, 3));
      setInc_percentual(formatCompleteZeros(inc_percentual, 3));
      setImp_percentual(formatCompleteZeros(imp_percentual, 3));
      //setRen_percentual();

      ////// LINHA 04 - VALOR
      setTax_valor(formatCompleteZeros(tax_valor, 2));
      setTre_valor(formatCompleteZeros(tre_valor, 2));
      setCom_valor(formatCompleteZeros(com_valor, 2));
      setInc_valor(formatCompleteZeros(inc_valor, 2));
      setImp_valor(formatCompleteZeros(imp_valor, 2));

      setValor_total(formatCompleteZeros(valor_total, 2));

      ////// LINHA 05 - ÍNDICE
      let _tre_indice = tre_indice;
      if (parseInt(tipo_servico, 10) === 1 && parseInt(tre_indice, 10) < 1) { _tre_indice = 1; }
      setTre_indice(formatCompleteZeros(_tre_indice, 4));

      setCom_indice(formatCompleteZeros(com_indice, 4));
      setInc_base(inc_base);
      setValor_totalsimp(formatCompleteZeros(valor_totalsimp, 2));

      const valor_real = formatCompleteZeros((valor * cambio), 2);
      setValor_real(valor_real);

      const taxa_real = formatCompleteZeros((tax_valor * cambio), 2);
      setTaxa_real(taxa_real);

      setRentabilidade(formatCompleteZeros(rentabilidade, 2));
      atualizaRentabilidade(formatCompleteZeros(rentabilidade, 2));

      setId(id);
      setAtualizado(true);

      if (flagConsolidador) {
        //value, coluna

        setTax_valor(tax_valor);
        if (tax_percentual > 0) {
          const tax_percentual_valor = ((tre_valor / quantidade / valor) * 100).toFixed(3);
          setTax_percentual(tax_percentual);
          setTax_percentual_valor(tax_percentual_valor);
        }

        if (tre_percentual === 0) {
          const tre_percentual = ((tre_valor / quantidade / valor) * 100).toFixed(3);
          setTre_percentual(tre_percentual);
          setTre_valor(tre_valor);
        } else {
          calculaValor(tre_percentual, 2, valor);
        }

        if (com_percentual === 0) {
          const com_percentual = ((com_valor / quantidade / valor) * 100).toFixed(3);
          setCom_percentual(com_percentual);
          setCom_valor(com_valor);
        } else {
          calculaValor(com_percentual, 3, valor);
        }

        if (inc_percentual === 0) {
          const inc_percentual = ((inc_valor / quantidade / valor) * 100).toFixed(3);
          setInc_percentual(inc_percentual);
          setInc_valor(inc_valor);
        } else {
          calculaValor(inc_percentual, 4, valor);
        }

        imp_percentual === 0
          ? calculaPercentual(imp_valor, 5)
          : calculaValor(imp_percentual, 5, valor);
      }
      const { dispatch } = props;
      dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_03_FALSE' });
    }
  }, [props, flagAtualizado, atualizaCobranca, atualizaRentabilidade, atualizaTotal]);

  /// ATUALIZA FORM
  useEffect(() => {
    const newForm = {
      id,
      rep_pessoa,
      rep_id_pfisica,
      rep_id_pjuridica,
      rep_nome_pessoa,
      rep_nome_pessoa2,

      cobranca,
      id_moeda,
      cambio,
      em_moeda,

      cedente,

      dt_inicio,
      dt_termino,

      hr_inicio,
      hr_termino,

      quantidade,
      regime,

      seguro,
      taxa_seguro,
      extra,

      valor,

      tre_bloqueio,
      com_bloqueio,
      inc_bloqueio,

      tax_percentual,
      tax_valor,

      tre_percentual,
      tre_valor,
      tre_indice,

      com_percentual,
      com_valor,
      com_indice,

      inc_percentual,
      inc_valor,
      inc_base,

      imp_percentual,
      imp_valor,
      rentabilidade,

      valor_total,
      pag_valortotal,
      rec_valortotal,
      valor_totalsimp,

    };
    localStorage.setItem('PROSERVICO_FORM_STEP_03', JSON.stringify(newForm));
  }, [id, rep_pessoa, rep_id_pfisica, rep_id_pjuridica, rep_nome_pessoa, rep_nome_pessoa2, cobranca, dt_inicio, dt_termino,
    hr_inicio, hr_termino, quantidade, regime, cedente, id_moeda, cambio, em_moeda, valor, tax_percentual, tax_valor,
    extra, taxa_seguro, tre_bloqueio, com_bloqueio, inc_bloqueio, tre_percentual, tre_valor, tre_indice, com_percentual, com_valor, com_indice, inc_percentual,
    seguro, inc_valor, inc_base, imp_percentual, imp_valor, rentabilidade, valor_total, valor_totalsimp, pag_valortotal,
    rec_valortotal]);

  /// MONITORA TIPO SERVICO - VISIBILITY E LABELS
  useEffect(() => {
    switch (parseInt(props.tipo_servico, 10)) {
    /// AEREO
      case 1:
        setVisibilityCobrancaAereo('');
        setVisibilityCobrancaAgenciamento('hide');
        setVisibilityCobranca('hide');

        setVisibilityDatas('hide');
        setVisibilityQTD('hide');
        setVisibilityHospedagem('hide');
        setVisibilityVeiculo('hide');

        setVisibilityIncentivo('');
        setVisibilityIndice('');

        setDisabledQtd(true);

        setLabelQuantidade('');
        setlabelValor('Valor');
        break;
      /// HOSPEDAGEM
      case 2:
        if (parseInt(props.operacaoServico, 10) === 3) {
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobranca('hide');
          setCobranca(0);
        } else
        if (parseInt(props.operacaoServico, 10) === 1) {
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobrancaAgenciamento('');
          setVisibilityCobranca('hide');
        } else {
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobranca('');
        }
        setVisibilityDatas('');
        setVisibilityQTD('hide');
        setVisibilityHospedagem('');
        setVisibilityVeiculo('hide');

        setVisibilityIncentivo('hide');
        setVisibilityIndice('hide');

        setDisabledQtd(true);

        setLabelQuantidade('Noite(s)');
        setlabelValor('Diária');
        break;
      /// VEÍCULO
      case 3:
        if (parseInt(props.operacaoServico, 10) === 3) {
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobranca('hide');
          setCobranca(0);
        } else
        if (parseInt(props.operacaoServico, 10) === 1) {
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobrancaAgenciamento('');
          setVisibilityCobranca('hide');
        } else {
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobranca('');
        }

        setVisibilityDatas('');
        setVisibilityQTD('hide');
        setVisibilityHospedagem('hide');
        setVisibilityVeiculo('');

        setVisibilityIncentivo('hide');
        setVisibilityIndice('hide');

        setDisabledQtd(true);

        setLabelQuantidade('Dia(s)');
        setlabelValor('Diária');
        break;
      /// DEMAIS TIPOS SERVIÇO
      default:
        if (parseInt(props.operacaoServico, 10) === 1 && (tipo_servico !== 1)) {
          setVisibilityCobrancaAgenciamento('');
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobranca('hide');
        } else
        if (parseInt(props.operacaoServico, 10) === 2 && (tipo_servico !== 1)) {
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobranca('');
        } else
        if (parseInt(props.operacaoServico, 10) === 3) {
          setVisibilityCobrancaAgenciamento('hide');
          setVisibilityCobrancaAereo('hide');
          setVisibilityCobranca('hide');
          setCobranca(0);
          setVisibilityCOM('hide');
          setVisibilityTRE('hide');
          setVisibilityCOL('');
        }

        setVisibilityDatas('hide');
        setVisibilityQTD('show');
        setVisibilityHospedagem('hide');
        setVisibilityVeiculo('hide');

        setVisibilityIncentivo('hide');
        setVisibilityIndice('hide');

        setDisabledQtd(false);

        setLabelQuantidade('Quantidade');
        setlabelValor('Valor');
    }
  }, [props.tipo_servico, visibilityIncentivo]);

  /// ATUALIZA QUANTIDADE
  useEffect(() => {
    if (parseInt(props.tipo_servico, 10) === 2 || parseInt(props.tipo_servico, 10) === 3) {
      if (dt_inicio !== '' && dt_termino !== '') {
        setQuantidade(calculaDias(dt_inicio, dt_termino));
      }
    }
  }, [props.tipo_servico, dt_inicio, dt_termino, calculaDias]);

  /// ATUALIZA QUANTIDADE AEREO
  useEffect(() => {
    if (parseInt(props.tipo_servico, 10) === 1) {
      setQuantidade(1);
    }
  }, [props.tipo_servico]);

  /// ATUALIZA TOTAL
  useEffect(() => {
    const dados = {
      valor,
      tax_percentual_valor,
      tax_valor,
      tre_valor,
      com_valor,
      inc_valor,
      imp_valor,
      cobranca,
      cambio,
      extra,
      quantidade,
      seguro,
      taxa_seguro,
      tax_percentual,
      tre_percentual,
      com_percentual,
      inc_percentual,
      imp_percentual,
    };
    atualizaTotal(dados);
  }, [cobranca, valor, tax_percentual_valor, tax_valor, tre_valor, com_valor, inc_valor, imp_valor, cambio, extra, quantidade, seguro, taxa_seguro,
    tax_percentual, tre_percentual, com_percentual, inc_percentual, imp_percentual, atualizaTotal]);

  /// ATUALIZA PAG E REC VALOR TOTAL
  useEffect(() => {
    const { tipo_servico, operacaoServico } = props;

    const dados = {
      totalTarifa: valor_total,
      tipo_servico,
      cobrancaTarifa: cobranca,
      operacaoServico,
      rentTarifa: rentabilidade,
    };

    calcula_PagTotal_RecTotal(valor_total, dados, operacaoServico, cedente, tipo_servico);
  }, [props, valor_total, cobranca, rentabilidade, calcula_PagTotal_RecTotal]);

  /// ATUALIZA VISIBILITY BOX MOEDA
  useEffect(() => {
    parseInt(id_moeda, 10) > 1
      ? setVisibilityBoxMoeda('show')
      : setVisibilityBoxMoeda('hide');
  }, [id_moeda]);

  /// DISABLE CEDENTE
  useEffect(() => {
    const operacao = parseInt(props.operacaoServico, 10);
    if (operacao === 2) {
      setCedente(1);
      atualizaCedente(1);
      setDisabledCedente(true);
    } else if (operacao === 3) {
      setCedente(2);
      atualizaCedente(2);
      setDisabledCedente(true);
    } else {
      setCedente(cedente);
      atualizaCedente(cedente);
    }
  }, [props.operacaoServico]);

  //// DISABLE CAMPOS REPROCESSAMENTO
  useEffect(() => {
    if (tre_bloqueio === true || com_bloqueio === true || inc_bloqueio === true) {
      setDisabledValor(true);
    }
  }, [valor, tre_bloqueio, com_bloqueio, inc_bloqueio]);

  useEffect(() => {
    if (tre_bloqueio === true) { setDisableTRE(true); } else { setDisableTRE(false); }
  }, [tre_bloqueio]);

  useEffect(() => {
    if (com_bloqueio === true) { setDisableCOM(true); } else { setDisableCOM(false); }
  }, [com_bloqueio]);

  useEffect(() => {
    if (inc_bloqueio === true) { setDisableINC(true); } else { setDisableINC(false); }
  }, [inc_bloqueio]);

  /// AUTO COMPLETAR SERVICO
  useEffect(() => {
    setTipo_servico(props.autoCompletarId_RServico);
  }, [props.autoCompletarId_RServico]);

  useEffect(() => {
    setId_Representante(Representante_Id);

    if (Representante_DadosAdicionais !== undefined) {
      const {
        pessoa, id_pfisica, id_pjuridica, nome_pessoa,
      } = Representante_DadosAdicionais;

      setRep_pessoa(pessoa);
      setRep_id_pfisica(id_pfisica);
      setRep_id_pjuridica(id_pjuridica);
      setRep_nome_pessoa(nome_pessoa);
      setRep_nome_pessoa2(nome_pessoa);

      setRepresentante(nome_pessoa);
    }
  }, [Representante_Id, Representante_DadosAdicionais]);

  useEffect(() => {
    setRepresentante(AC_Fornecedor);
    setId_Representante(AC_ID_Fornecedor);

    if (AC_Fornecedor_DadosAdicionais !== undefined) {
      const {
        pessoa, id_pfisica, id_pjuridica,
      } = AC_Fornecedor_DadosAdicionais;

      setRep_pessoa(pessoa);
      setRep_id_pfisica(id_pfisica);
      setRep_id_pjuridica(id_pjuridica);
      setRep_nome_pessoa(AC_Fornecedor);
      setRep_nome_pessoa2(AC_Fornecedor);
    }
  }, [AC_Fornecedor, AC_ID_Fornecedor, AC_Fornecedor_DadosAdicionais]);

  return (
    <>
      <div className="">

        {/*** LINHA 01 - REPRESENTANTE ***/}
        <Row>
          {/*** REPRESENTANTE ***/}
          <Col sm={6} md={6} lg={5} xl={4}>
            <FormGroup>
              <Label>Representante / Credor</Label>
              <AutoCompletarV2
                {...props}
                value={representante}
                valueId={id_Representante}
                tabela="REPRESENTANTE"
                campo={tipo_servico}
                disabled={false}
                visible
                dados_adicionais
                editar={{ id: id_Representante, value: representante, valueId: id_Representante }}
              />
            </FormGroup>
          </Col>
          {/*** CEDENTE ***/}
          <Col sm={4} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label>Cedente</Label>
              <Input
                type="select"
                value={cedente}
                disabled={disabledCedente}
                onChange={(e) => atualizaCedente(e.target.value)}
              >
                <option value="0">Selecione...</option>

                { !!listaCedente && listaCedente.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}

              </Input>
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 02 - PREÇO ***/}
        <Row>
          <Col sm={3} md={3} lg={3} xl={3} className={visibilityCobrancaAereo}>
            <FormGroup>
              <Label>Tipo Cobrança</Label>
              <Input
                type="select"
                required
                value={cobranca}
                onChange={(e) => atualizaCobranca(e.target.value)}
              >
                <option value="0">Selecione...</option>
                <option value="1">RETER COMISSÃO</option>
                <option value="2">COMISSÃO À RECEBER</option>
                {/*<option value="3">COMISSÃO SOBRE O VALOR</option> */}
                <option value="4">SEM COMISSÃO</option>
              </Input>
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={3} xl={3} className={visibilityCobrancaAgenciamento}>
            <FormGroup>
              <Label>Cobrança</Label>
              <Input
                type="select"
                required
                value={cobranca}
                onChange={(e) => atualizaCobranca(e.target.value)}
                //onBlur={(e) => setCobranca(e.target.value)}
                //onChangeCapture={(e) => setCobranca(e.target.value)}
              >
                <option value="0">Selecione...</option>
                { !!listaCobranca && listaCobranca.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}

              </Input>
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={3} xl={3} className={visibilityCobranca}>
            <FormGroup>
              <Label>Tipo Cobrança</Label>
              <Input
                type="select"
                required
                value={cobranca}
                onChange={(e) => atualizaCobranca(e.target.value)}
                //onBlur={(e) => setCobranca(e.target.value)}
              >
                <option value="0">Selecione...</option>
                <option value="1">RETER COMISSÃO</option>
                <option value="2">COMISSÃO À RECEBER</option>
                {/*<option value="3">COMISSÃO SOBRE O VALOR</option> */}
                <option value="4">SEM COMISSÃO</option>
              </Input>
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>Moeda</Label>
              <Input
                type="select"
                value={id_moeda}
                onChange={(e) => setId_moeda(e.target.value)}
              >
                <option value="0">Selecione...</option>

                { !!listaMoeda && listaMoeda.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}

              </Input>
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={1} className={visibilityBoxMoeda}>
            <FormGroup>
              <Label>Câmbio</Label>
              <Input
                type="number"
                value={cambio}
                placeholder="0.0000"
                onChange={(e) => calculaCambio(e.target.value, tax_valor)}
                onBlur={(e) => setCambio(formatCompleteZeros(e.target.value, 4))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2} className={visibilityBoxMoeda}>
            <FormGroup className="pl-4">
              <Label>&nbsp;</Label>
              <Checkbox
                info="Valores em MOEDA"
                checked={em_moeda}
                onClick={(e) => setEm_moeda(e.target.checked)}
              />
            </FormGroup>
          </Col>
          {/*** LINHA 03 - somente qtd ***/}

          <Col sm={2} md={2} lg={1} xl={1} className={visibilityQTD}>
            <FormGroup>
              <Label>{ labelQuantidade }</Label>
              <Input
                type="number"
                //disabled={disabledQtd}
                value={quantidade}
                onChange={(e) => atualizaQTDgenerico(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 03 - DATAS ***/}
        <Row className={visibilityDatas}>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label>Início</Label>
              <Input
                type="date"
                value={dt_inicio}
                onChange={(e) => setDt_inicio(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>&nbsp;</Label>
              <Input
                type="text"
                maxLength={5}
                placeholder="00:00"
                value={hr_inicio}
                onChange={(e) => setHr_inicio(formatHora(e.target.value))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label>Término</Label>
              <Input
                type="date"
                value={dt_termino}
                onChange={(e) => setDt_termino(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>&nbsp;</Label>
              <Input
                type="text"
                maxLength={5}
                placeholder="00:00"
                value={hr_termino}
                onChange={(e) => setHr_termino(formatHora(e.target.value))}
              />
            </FormGroup>
          </Col>
          <Col sm={2} md={2} lg={1} xl={1}>
            <FormGroup>
              <Label>{ labelQuantidade }</Label>
              <Input
                type="number"
                disabled={disabledQtd}
                value={quantidade}
                onChange={(e) => atualizaQTDgenerico(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup className={visibilityHospedagem}>
              <Label>Regime</Label>
              <Input
                type="select"
                value={regime}
                onChange={(e) => setRegime(e.target.value)}
              >
                <option value="0">Selecione...</option>

                { !!listaRegime && listaRegime.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup className={visibilityVeiculo}>
              <Label>Seguro</Label>
              <Input
                type="select"
                value={seguro}
                onChange={(e) => setSeguro(e.target.value)}
              >
                <option value="0">Selecione...</option>

                { !!listaSeguro && listaSeguro.map((item) => (
                  <option key={item.id} value={item.id}>{item.descricao}</option>
                ))}

              </Input>
            </FormGroup>

          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup className={visibilityVeiculo}>
              <Label>Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={taxa_seguro}
                onChange={(e) => setTaxa_seguro(e.target.value)}
                onBlur={(e) => setTaxa_seguro(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 04 - % PERCENTAGEM ***/}
        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label>{ labelValor }</Label>
              <Input
                type="text"
                //placeholder="0.00"
                value={valor}
                disabled={disabledValor}
                onChange={(e) => atualizaValor(formatDecimal(e.target.value, 2))}
                onBlur={(e) => setValor(formatDecimal(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>Taxa %</Label>
              <Input
                type="number"
                placeholder="0.000"
                value={tax_percentual}
                onChange={(e) => calculaValor(e.target.value, 1)}
                onBlur={(e) => setTax_percentual(formatCompleteZeros(e.target.value, 3))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityTRE}>
            <FormGroup>
              <Label>Taxa Rep %</Label>
              <Input
                type="number"
                placeholder="0.000"
                value={tre_percentual}
                disabled={disabledTRE}
                onChange={(e) => calculaValor(e.target.value, 2)}
                onBlur={(e) => setTre_percentual(formatCompleteZeros(e.target.value, 3))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOM}>
            <FormGroup>
              <Label>Comissão %</Label>
              <Input
                type="number"
                placeholder="0.000"
                value={com_percentual}
                disabled={disabledCOM}
                onChange={(e) => calculaValor(e.target.value, 3)}
                onBlur={(e) => setCom_percentual(formatCompleteZeros(e.target.value, 3))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup className={visibilityIncentivo}>
              <Label>Incentivo %</Label>
              <Input
                type="number"
                placeholder="0.000"
                value={inc_percentual}
                disabled={disabledINC}
                onChange={(e) => calculaValor(e.target.value, 4)}
                onBlur={(e) => setInc_percentual(formatCompleteZeros(e.target.value, 3))}
              />
            </FormGroup>

            <FormGroup className={visibilityVeiculo}>
              <Label>Extra Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                onBlur={(e) => setExtra(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
            <FormGroup className={visibilityHospedagem}>
              <Label>Extra Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                onBlur={(e) => setExtra(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>

          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>Imposto %</Label>
              <Input
                type="number"
                placeholder="0.000"
                value={imp_percentual}
                onChange={(e) => calculaValor(e.target.value, 5)}
                onBlur={(e) => setImp_percentual(formatCompleteZeros(e.target.value, 3))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label className="font-weight-bold">Rentabilidade %</Label>
              <Input
                type="number"
                placeholder="0.000"
                disabled
                value={ren_percentual}
                onChange={(e) => setRen_percentual(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2} />
        </Row>

        {/*** LINHA 05 - VALOR ***/}
        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>Taxa Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={tax_valor}
                onChange={(e) => calculaCambio(cambio, e.target.value)}
                onBlur={(e) => setTax_valor(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityTRE}>
            <FormGroup>
              <Label>Taxa Rep Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={tre_valor}
                disabled={disabledTRE}
                onChange={(e) => calculaPercentual(e.target.value, 2)}
                onBlur={(e) => setTre_valor(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOM}>
            <FormGroup>
              <Label>Comissão Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={com_valor}
                disabled={disabledCOM}
                onChange={(e) => calculaPercentual(e.target.value, 3)}
                onBlur={(e) => setCom_valor(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup className={visibilityIncentivo}>
              <Label>Incentivo Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={inc_valor}
                disabled={disabledINC}
                onChange={(e) => calculaPercentual(e.target.value, 4)}
                onBlur={(e) => setInc_valor(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup>
              <Label>Imposto Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={imp_valor}
                onChange={(e) => calculaPercentual(e.target.value, 5)}
                onBlur={(e) => setImp_valor(formatCompleteZeros(e.target.value, 2))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label className="font-weight-bold">Rentabilidade Valor</Label>
              <Input
                type="number"
                placeholder="0.00"
                disabled
                value={rentabilidade}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label className="font-weight-bold">Total s/ Imposto</Label>
              <Input
                type="number"
                disabled
                value={valor_totalsimp}
              />
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 06 - ÍNDICE ***/}
        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityTRE}>
            <FormGroup className={visibilityIndice}>
              <Label>Índice</Label>
              <Input
                type="number"
                placeholder="0.0000"
                value={tre_indice}
                disabled={disabledTRE}
                onChange={(e) => calculaIndice(e.target.value, 1)}
                onBlur={(e) => setTre_indice(formatCompleteZeros(e.target.value, 4))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOL}>
            <FormGroup />
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} className={visibilityCOM}>
            <FormGroup className={visibilityIndice}>
              <Label>Índice</Label>
              <Input
                type="number"
                placeholder="0.0000"
                value={com_indice}
                disabled={disabledCOM}
                onChange={(e) => calculaIndice(e.target.value, 2)}
                onBlur={(e) => setCom_indice(formatCompleteZeros(e.target.value, 4))}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1}>
            <FormGroup className={visibilityIndice}>
              <Label>Base %</Label>
              <Input
                type="number"
                placeholder="0"
                value={inc_base}
                disabled={disabledINC}
                onChange={(e) => calculaBase(e.target.value)}
                //onBlur={ e => setInc_base( formatCompleteZeros( e.target.value, 4 ) ) }
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={1} xl={1} />
          <Col sm={3} md={3} lg={2} xl={2} />
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Label className="font-weight-bold">Total</Label>
              <Input
                type="number"
                disabled
                className="bg-dark-2 text-white"
                value={valor_total}
              />
            </FormGroup>
          </Col>
        </Row>

        {/*** LINHA 07 - VALOR EM REAIS ***/}
        <div className={`p-0 m-0 ${visibilityBoxMoeda}`}>
          <div className="ficha04-title-totais">Valores em Reais</div>
          <Row className="border pl-0 pr-0 pt-2 pb-2">

            <Col sm={3} md={3} lg={2} xl={2}>
              <Input
                type="number"
                value={valor_real}
                disabled
              />
            </Col>
            <Col sm={3} md={3} lg={2} xl={2}>
              <Input
                type="number"
                value={taxa_real}
                disabled
              />
            </Col>
            <Col sm={3} md={3} lg={1} xl={1} />
            <Col sm={3} md={3} lg={1} xl={1} />
            <Col sm={3} md={3} lg={1} xl={1} />
            <Col sm={3} md={3} lg={2} xl={2}>
              <Input
                type="text"
                value={rent_real}
                disabled
              />
            </Col>
            <Col sm={3} md={3} lg={2} xl={2}>
              <Input
                type="text"
                value={total_real}
                disabled
              />
            </Col>
          </Row>
        </div>

      </div>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  //step: state.wizard.step,

  fichaData: state.servicos.fichaData,
  autoCompletarId_RServico: state.autoCompletar.autoCompletarId_RServico,

  operacaoServico: state.servicos.operacaoServico,
  tipo_servico: state.servicos.tipo_servico,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step03,

  Representante_Id: state.autoCompletar.autoCompletarId_Representante,
  Representante_DadosAdicionais: state.autoCompletar.autoCompletarRepresentanteDadosAdicionais,

  AC_Fornecedor: state.autoCompletar.autoCompletarFornecedor,
  AC_ID_Fornecedor: state.autoCompletar.autoCompletarId_Fornecedor,
  AC_Fornecedor_DadosAdicionais: state.autoCompletar.autoCompletarFornecedorDadosAdicionais,
});
export default connect(() => (mapState))(Step04);
