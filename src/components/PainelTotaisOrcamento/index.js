///////// IMPORTS ///////////////
/////////////////////////////////
import React, {
  useEffect, useState, useCallback, memo,
} from 'react';
import { Row, Col, Input } from 'reactstrap';
import { TotaisOrcamento } from '..';
import { formatCompleteZeros, calculaValorPercentual } from '../../functions/sistema';
import './style.css';

function PainelTotaisOrcamento({
  dispatch, ficha, disableDesconto, page,
}) {
  const [firstLoad, set_firstLoad] = useState(true);

  const [disabledAll, set_disabledAll] = useState(false);

  ////// DISABLED DESCONTO
  const [disabledDesconto, set_disabledDesconto] = useState(false);
  const [hideCliente, set_hideCliente] = useState(false);
  const [hideDesconto, set_hideDesconto] = useState(false);

  ////// COLUNA 1 %
  const [tad_percentual, set_tad_percentual] = useState(0); /// TAXA ADM
  const [imp_percentual, set_imp_percentual] = useState(0); /// IMPOSTO
  const [des_valor, set_des_valor] = useState(0); /// DESCONTO
  const [tcl_percentual, set_tcl_percentual] = useState(0); /// TAXA CLIENTE

  ////// COLUNA 2 VALORES
  const [ser_valor, set_ser_valor] = useState(0); /// SUBTOTAL
  const [tad_valor, set_tad_valor] = useState(0); /// VALOR TAXA ADM (CALCULADO)
  const [imp_valor, set_imp_valor] = useState(0); /// VALOR IMPOSTO (CALCULADO)
  const [valor_total, set_valor_total] = useState(0); /// TOTAL
  const [valor_total_cliente, set_valor_total_cliente] = useState(0); /// TOTAL
  const [tcl_valor, set_tcl_valor] = useState(0); //

  const [saldo, set_saldo] = useState(0); /// SALDO

  ////// BACKGROUND
  const [bg_saldo, set_bg_saldo] = useState('');

  ////// HANDLEPAGE - visibility
  const handlePage = useCallback((page) => {
    switch (page) {
      case 'orcamento':
        set_hideCliente(true);
        set_hideDesconto(false);

        set_disabledAll(false);
        set_disabledDesconto(false);
        break;
      case 'servico':
        set_hideCliente(false);
        set_hideDesconto(true);

        set_disabledAll(true);
        set_disabledDesconto(true);
        break;
      default:
    }
  }, []);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      handlePage(page);
      set_firstLoad(false);
    }
  }, [firstLoad, ficha, handlePage, page]);

  ////// MONITORA ATUALIZACAO DE VALORES
  useEffect(() => {
    const {
      tx_adm,
      tx_imposto,
      vlr_desconto,

      tx_cliente,
      vlr_subtotal,
      vlr_total,
      vlr_total_cliente,

      vlr_saldo,
    } = ficha;

    set_tad_percentual(formatCompleteZeros(tx_adm, 2));
    set_imp_percentual(formatCompleteZeros(tx_imposto, 2));
    set_des_valor(formatCompleteZeros(vlr_desconto, 2));
    set_tcl_percentual(formatCompleteZeros(tx_cliente, 2));
    set_ser_valor(formatCompleteZeros(vlr_subtotal, 2));
    set_valor_total(formatCompleteZeros(vlr_total, 2));
    set_valor_total_cliente(formatCompleteZeros(vlr_total_cliente, 2));
    set_saldo(formatCompleteZeros(vlr_saldo, 2));
  }, [ficha]);

  ////// ATUALIZA TAXA ADM
  useEffect(() => {
    const valor = formatCompleteZeros(calculaValorPercentual(ser_valor, tad_percentual), 2);
    set_tad_valor(valor);
  }, [ser_valor, tad_percentual]);

  ////// ATUALIZA IMPOSTO
  useEffect(() => {
    const valor = formatCompleteZeros(calculaValorPercentual(tad_valor, imp_percentual), 2);
    set_imp_valor(valor);
  }, [tad_valor, imp_percentual]);

  ////// ATUALIZA TOTAL VENTU
  useEffect(() => {
    const valor = parseFloat(ser_valor) + parseFloat(tad_valor) + parseFloat(imp_valor) - parseFloat(des_valor);
    const valorTotal = formatCompleteZeros(valor, 2);
    set_valor_total(valorTotal);
  }, [ser_valor, tad_valor, imp_valor, des_valor]);

  ////// ATUALIZA CLIENTE
  useEffect(() => {
    const valor = formatCompleteZeros(calculaValorPercentual(ser_valor, tcl_percentual), 2);
    set_tcl_valor(valor);
  }, [ser_valor, tcl_percentual]);

  ////// ATUALIZA TOTAL CLIENTE
  /// useEffect(() => {
  ///   const novo_imp_valor = calculaValorPercentual(tcl_valor, imp_percentual);
  ///   const valor = parseFloat(ser_valor) + parseFloat(tcl_valor) + parseFloat(novo_imp_valor) - parseFloat(des_valor);
  ///   const valorTotal = formatCompleteZeros(valor, 2);
  ///   set_valor_total_cliente(valorTotal);
  /// }, [ser_valor, imp_valor, des_valor, tcl_valor, imp_percentual]);

  ////// ATUALIZA SALDO
  useEffect(() => {
    const valor = parseFloat(valor_total) - parseFloat(valor_total_cliente);
    const valorSaldo = formatCompleteZeros(valor, 2);
    set_saldo(valorSaldo);
  }, [valor_total, valor_total_cliente]);

  ////// ATUALIZAR REDUX
  useEffect(() => {
    const ficha = {
      tad_percentual,
      imp_percentual,
      des_valor,
      tcl_percentual,
      ser_valor,
      tad_valor,
      imp_valor,
      valor_total,
      valor_total_cliente,
      tcl_valor,
      saldo,
    };
    dispatch({ type: '@SET_PAINEL_ORCAMENTO_FICHA', payload: ficha });
  }, [tad_percentual, imp_percentual, des_valor, tcl_percentual, ser_valor, dispatch,
    tad_valor, imp_valor, valor_total, valor_total_cliente, tcl_valor, saldo]);

  ////// MONITORA BACKGROUND SALDO
  useEffect(() => {
    parseFloat(saldo) > 0
      ? set_bg_saldo('bg-danger text-white')
      : set_bg_saldo('bg-info text-white');
  }, [saldo]);

  ////// DISABLE DESCONTO
  useEffect(() => {
    set_disabledDesconto(disableDesconto);
    if (disableDesconto) { set_des_valor('0.00'); }
  }, [disableDesconto]);

  return (
    <>
      <Row>
        {/*** COLUNA 1 - PERCENTUAL ***/}
        <Col sm={9} className="pt-0 pb-4">
          <Row>

            {/*** SUBTOTAL ***/}
            <TotaisOrcamento
              key="Subtotal"
              title="Subtotal"
              strong
              disabled
              hideInput
            />

            {/*** TAXA ADM ***/}
            <TotaisOrcamento
              key="Taxa Adm (%)"
              title="Taxa Adm (%)"
              type="number"
              min={0}
              max={100}
              disabled={disabledAll}
              value={tad_percentual}
              onChange={(e) => set_tad_percentual(e.target.value)}
              onBlur={(e) => set_tad_percentual(formatCompleteZeros(e.target.value, 2))}
            />

            {/*** IMPOSTO ***/}
            <TotaisOrcamento
              key="Imposto (%)"
              title="Imposto (%)"
              type="number"
              min={0}
              max={100}
              disabled={disabledAll}
              value={imp_percentual}
              onChange={(e) => set_imp_percentual(e.target.value)}
              onBlur={(e) => set_imp_percentual(formatCompleteZeros(e.target.value, 2))}
            />

            {/*** DESCONTO ***/}
            <TotaisOrcamento
              key="Desconto"
              title="Desconto"
              type="number"
              min={0}
              hideInput={hideDesconto}
              disabled={disabledDesconto}
              value={des_valor}
              onChange={(e) => set_des_valor(e.target.value)}
              onBlur={(e) => set_des_valor(formatCompleteZeros(e.target.value, 2))}
            />

            {/*** VALOR TOTAL VENTU ***/}
            <TotaisOrcamento
              key="Total"
              title="Total Ventu"
              strong
              disabled
              hideInput
            />

            {/*** TAXA CLIENTE ***/}
            <TotaisOrcamento
              key="Taxa Cliente"
              title="Taxa Cliente (%)"
              type="number"
              min={0}
              max={100}
              disabled={disabledAll}
              value={tcl_percentual}
              onChange={(e) => set_tcl_percentual(e.target.value)}
              onBlur={(e) => set_tcl_percentual(formatCompleteZeros(e.target.value, 2))}
            />

            {/*** TOTAL CLIENTE ***/}
            <TotaisOrcamento
              key="Total Cliente"
              title="Total Cliente"
              strong
              disabled
              hidden={hideCliente}
              hideInput
            />

            {/*** SALDO ***/}
            <TotaisOrcamento
              key="Saldo"
              strong
              title="Saldo"
              disabled
              hidden={hideCliente}
              hideInput
            />

          </Row>
        </Col>

        {/*** COLUNA 2 - VALORES ***/}
        <Col sm={3} className="pt-0 pl-0 pb-4">
          <Row>

            {/*** SUBTOTAL ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 bg-dark-2 text-white text-right"
                value={ser_valor}
                disabled
              />
            </Col>

            {/*** TAXA ADM ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 text-right"
                value={tad_valor}
                disabled
              />
            </Col>

            {/*** IMPOSTO ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 text-right"
                value={imp_valor}
                disabled
              />
            </Col>

            {/*** DESCONTO ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 text-right"
                value={des_valor}
                disabled
              />
            </Col>

            {/*** VALOR TOTAL VENTU ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 text-right bg-roxo-ventu text-white"
                value={valor_total}
                disabled
              />
            </Col>

            {/*** TAXA CLIENTE ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 text-right"
                value={tcl_valor}
                disabled
              />
            </Col>

            {/*** TOTAL CLIENTE ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className="pr-0 bg-dark-2 text-white text-right"
                value={valor_total_cliente}
                disabled
                hidden={hideCliente}
              />
            </Col>

            {/*** SALDO ***/}
            <Col sm={12} className="totais-orcamento-container">
              <Input
                type="number"
                className={`pr-0 text-right ${bg_saldo}`}
                value={saldo}
                disabled
                hidden={hideCliente}
              />
            </Col>

          </Row>
        </Col>
      </Row>
    </>
  );
}

export default memo(PainelTotaisOrcamento);
