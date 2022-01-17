///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageTitle, SaveButton } from '../../../components';
import { getParcelamentoFicha, saveParcelar } from '../../../functions/financeiro/movimento/parcelar';
import {
  formatDecimal, formatDataInput, formatData, formatExibeValor, formatCompleteZeros,
} from '../../../functions/sistema';

///////// FICHA /////////////////
/////////////////////////////////
function MovimentoParcelar(props) {
  const [firstLoad, setFirst] = useState(true);
  const hoje = moment().format('L');

  const [contato, setContato] = useState(0);
  const [descricao, setDescricao] = useState('');

  const [id_subgrupo, setId_SubGrupo] = useState(0);
  const [subgrupo, setSubGrupo] = useState('');
  const [dt_vencimento, setDt_vencimento] = useState('');
  const [valor_original, setValor_original] = useState('');

  const [dt_pagamento, setDt_pagamento] = useState('');
  const [dt_ocorrencia, setDt_ocorrencia] = useState('');

  const [pessoa, setPessoa] = useState('');
  const [id_pfisica, setId_pfisica] = useState(0);
  const [id_pjuridica, setId_pjuridica] = useState(0);

  const [documento, setDocumento] = useState(0);
  const [ndocumento, setNdocumento] = useState('');
  const [id_conta, setId_conta] = useState(0);
  const [forma, setForma] = useState('');

  const [observacao, setObservacao] = useState('');
  const [status, setStatus] = useState('');
  const [restrito, setRestrito] = useState('');

  //filho_regs
  const [listaDatas, setListaDatas] = useState(['', '']);
  const [listaValor, setListaValor] = useState(['', '']);
  const [parcelas, setParcelas] = useState(2);
  const [linhas, setLinhas] = useState(2);

  const [valor_total, setValor_total] = useState('');
  const [classTotal, setClassTotal] = useState('');
  const [form, setForm] = useState({});

  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const handleInput = useCallback((index, number, lista, valor) => {
    const _temp = [];

    for (let i = 0; i < parcelas; i += 1) {
      if (i === index) {
        if (number === 1) { _temp.push(valor); }
        if (number === 2) { _temp.push(formatDecimal(valor, 2)); }
      } else {
        _temp.push(lista[i]);
      }
    }

    switch (number) {
      case 1: setListaDatas(_temp); break;
      case 2: setListaValor(_temp); break;
      default:
    }
  }, [parcelas]);

  const renderLinhas = useCallback((parcelas) => {
    const _temp = [];

    for (let i = 2; i < parcelas; i += 1) {
      const index = i;
      _temp.push(
        <Row>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Input
                type="date"
                value={listaDatas[i]}
                onChange={(e) => handleInput(index, 1, listaDatas, e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={3} md={3} lg={2} xl={2}>
            <FormGroup>
              <Input
                type="text"
                value={listaValor[i]}
                onChange={(e) => handleInput(index, 2, listaValor, e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>,
      );
    }

    setLinhas(_temp);
  }, [handleInput, listaDatas, listaValor]);

  const handleValorLinhas = useCallback((listaValor) => {
    let _temp = [];

    /// console.log('---------------------')
    const valorLinhas = Math.fround(parseFloat(listaValor[0])).toFixed(2);
    /// console.log("valorLinhas: "+valorLinhas);

    const original = Math.fround(parseFloat(valor_original)).toFixed(2);
    /// console.log("original: "+original)

    const totalLinhas = Math.fround(parseFloat(valorLinhas * parcelas)).toFixed(2);
    /// console.log("totalLinhas: "+totalLinhas);

    const diferenca = Math.fround(parseFloat(totalLinhas) - parseFloat(original)).toFixed(2);
    /// console.log("diferenca: "+diferenca)
    /// console.log('---------------------')

    for (let i = 0; i < parcelas; i += 1) { _temp.push(valorLinhas); }

    let newLinhas;
    let newTotal;
    let newDiferenca;
    let newPrimeiraLinha;

    if (diferenca > 0) {
      _temp = [];

      ///console.log('maior')
      ///console.log('---------------------')

      newLinhas = Math.fround(parseFloat(valorLinhas) - parseFloat(diferenca)).toFixed(2);
      ///console.log("newLinhas: "+newLinhas)

      newTotal = Math.fround(parseFloat(newLinhas * parcelas)).toFixed(2);
      ///console.log("newTotal: "+newTotal)

      newDiferenca = Math.fround(parseFloat(original) - parseFloat(newTotal)).toFixed(2);
      ///console.log("newDiferenca: "+newDiferenca)

      newPrimeiraLinha = Math.fround(parseFloat(newLinhas) + parseFloat(newDiferenca)).toFixed(2);
      ///console.log("newPrimeiraLinha: "+newPrimeiraLinha)
    }

    if (diferenca < 0) {
      _temp = [];

      ///console.log('maior')
      ///console.log('---------------------')

      newLinhas = Math.fround(parseFloat(valorLinhas) + parseFloat(diferenca)).toFixed(2);
      ///console.log("newLinhas: "+newLinhas)

      newTotal = Math.fround(parseFloat(newLinhas * parcelas)).toFixed(2);
      ///console.log("newTotal: "+newTotal)

      newDiferenca = Math.fround(parseFloat(original) - parseFloat(newTotal)).toFixed(2);
      ///console.log("newDiferenca: "+newDiferenca)

      newPrimeiraLinha = Math.fround(parseFloat(newLinhas) + parseFloat(newDiferenca)).toFixed(2);
      ///console.log("newPrimeiraLinha: "+newPrimeiraLinha)
    }

    if (diferenca < 0 || diferenca > 0) {
      for (let i = 0; i < parcelas; i += 1) {
        if (i === 0) {
          _temp.push(newPrimeiraLinha);
        } else {
          _temp.push(newLinhas);
        }
      }
    }

    setListaValor(_temp);
  }, [parcelas, valor_original]);

  const handleDataLinhas = useCallback((parcelas, dt_vencimento, valor_original) => {
    const _tempDatas = [];
    const _tempValor = [];

    let dia = parseInt(dt_vencimento.substring(8, 10), 10);
    if (dia < 10) { dia = `0${dia}`; }

    let mes = parseInt(dt_vencimento.substring(5, 7), 10) - 1;
    let ano = parseInt(dt_vencimento.substring(0, 4), 10);

    const newValor = valor_original / parcelas;

    for (let i = 0; i < parcelas; i += 1) {
      mes += 1;

      if (mes < 10) { mes = `0${mes}`; }
      if (mes > 12) { mes = '01'; ano += 1; }

      _tempDatas.push(`${ano}-${mes}-${dia}`);
      _tempValor.push(parseFloat(newValor));

      mes = parseInt(mes, 10);
      ano = parseInt(ano, 10);
    }

    setListaDatas(_tempDatas);
    setListaValor(_tempValor);

    handleValorLinhas(_tempValor);
  }, [handleValorLinhas]);

  const handleValorTotal = useCallback((listaValor) => {
    let newTotal = 0.0;
    listaValor.forEach((item) => {
      newTotal = parseFloat(newTotal) + parseFloat(item);
    });

    newTotal = parseFloat(newTotal).toFixed(2);

    setValor_total(newTotal);

    const original = parseFloat(valor_original).toFixed(2);

    if (newTotal === original) {
      setClassTotal('bg-success text-white');
    } else {
      setClassTotal('bg-danger text-white');
    }
  }, [valor_original]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getParcelamentoFicha(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      descricao, documento, dt_ocorrencia, dt_pagamento, dt_vencimento, filho_regs,
      forma, id_conta, id_pfisica, id_pjuridica, id_subgrupo, ndocumento, nome_pessoa,
      observacao, pessoa, restrito, status, subgrupo, valor_original, alt_dhsis,
    } = props.parcelamentoFicha;

    const _tempDatas = [];
    const _tempValor = [];

    setContato(nome_pessoa);

    setPessoa(pessoa);
    setId_pfisica(id_pfisica);
    setId_pjuridica(id_pjuridica);

    setRestrito(restrito);
    setDocumento(documento);
    setNdocumento(ndocumento);

    setDt_ocorrencia(formatDataInput(dt_ocorrencia));
    setDt_vencimento(formatDataInput(dt_vencimento));
    setDt_pagamento(formatDataInput(dt_pagamento));

    setId_conta(id_conta);

    setId_SubGrupo(id_subgrupo);
    setSubGrupo(subgrupo);

    setValor_original(formatCompleteZeros(valor_original, 2));
    setStatus(status);
    setForma(forma);

    setDescricao(descricao);
    setObservacao(observacao);
    setAlt_dhsis(alt_dhsis);

    filho_regs.forEach((item) => {
      _tempDatas.push(formatDataInput(item.dt_vencimento));
      _tempValor.push(item.valor_original);
    });

    setListaDatas(_tempDatas);
    setListaValor(_tempValor);
  }, [props.parcelamentoFicha]);

  useEffect(() => {
    renderLinhas(parcelas);
  }, [renderLinhas, parcelas]);

  useEffect(() => {
    handleDataLinhas(parcelas, dt_vencimento, valor_original);
  }, [handleDataLinhas, dt_vencimento, valor_original, parcelas]);

  useEffect(() => {
    handleValorTotal(listaValor);
  }, [handleValorTotal, listaValor]);

  useEffect(() => {
    const { id } = props.match.params;
    const filho_regs = [];

    for (let i = 0; i < parcelas; i += 1) {
      filho_regs.push({
        id_pai: id,
        id_pfisica,
        id_pjuridica,
        nome_pessoa: contato,
        dt_vencimento: formatData(listaDatas[i]),
        parcela: i + 1,
        valor_original: listaValor[i],
      });
    }

    let tempId_Pfisica = 0;
    let tempId_juridica = 0;

    if (parseInt(pessoa, 10) === 1) { tempId_Pfisica = id_pfisica; }
    if (parseInt(pessoa, 10) === 2) { tempId_juridica = id_pjuridica; }

    setForm({
      id,
      status,
      restrito,
      pessoa,
      id_pfisica: tempId_Pfisica,
      id_pjuridica: tempId_juridica,
      documento,
      ndocumento,
      dt_ocorrencia: formatData(dt_ocorrencia),
      dt_vencimento: formatData(dt_vencimento),
      dt_pagamento: formatData(dt_pagamento),
      id_conta,
      id_subgrupo,
      valor_original, //: formatExibeValor(valor_original),
      forma,
      descricao,
      observacao,
      alt_dhsis,
      filho_regs,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
    });
  }, [props, status, restrito, pessoa, contato, id_pfisica, id_pjuridica, documento,
    ndocumento, dt_ocorrencia, dt_vencimento, dt_pagamento, id_conta, id_subgrupo, valor_original,
    forma, descricao, observacao, parcelas, listaDatas, listaValor, alt_dhsis, props.user.id]);

  return (
    <Container fluid className="p-0">
      <PageTitle history={props.history} title="Movimento" subtitle="/ Cadastrar" voltar />
      <Card>
        <CardBody className="pb-0">
          {/*** LINHA 01 ***/}
          <Row>
            {/*** CONTATO ***/}
            <Col sm={6} md={6} lg={4} xl={4}>
              <FormGroup>
                <Label>Contato</Label>
                <Input
                  type="text"
                  disabled
                  value={contato}
                />
              </FormGroup>
            </Col>
            {/*** DESCRICAO ***/}
            <Col sm={6} md={5} lg={4} xl={4}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  disabled
                  value={descricao}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 02 ***/}
          <Row>
            {/*** SUB GRUPO ***/}
            <Col sm={6} md={6} lg={4} xl={4}>
              <FormGroup>
                <Label>Subgrupo</Label>
                <Input
                  type="text"
                  disabled
                  value={subgrupo}
                />
              </FormGroup>
            </Col>
            {/*** DATA VENCIMENTO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Data vencimento</Label>
                <Input
                  type="date"
                  disabled
                  value={dt_vencimento}
                />
              </FormGroup>
            </Col>
            {/*** VALOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Valor Original</Label>
                <Input
                  type="text"
                  disabled
                  value={valor_original}
                  onChange={(e) => setValor_original(formatExibeValor(e.target.value))}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          {/*** PARCELAS ***/}
          <Row>
            {/*** Nº PARCELAS ***/}
            <Col sm={2} md={1}>
              <FormGroup>
                <Label>Parcelas</Label>
                <Input
                  type="number"
                  setp={1}
                  min={2}
                  max={12}
                  value={parcelas}
                  onChange={(e) => setParcelas(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm={10} md={11}>

              {/*** 1º LINHA ***/}

              <Row>
                {/*** DATA ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Data</Label>
                    <Input
                      type="date"
                      value={listaDatas[0]}
                      onChange={(e) => handleInput(0, 1, listaDatas, e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** VALOR ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Label>Valor</Label>
                    <Input
                      type="text"
                      value={listaValor[0]}
                      onChange={(e) => handleInput(0, 2, listaValor, e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                {/*** DATA ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Input
                      type="date"
                      value={listaDatas[1]}
                      onChange={(e) => handleInput(1, 1, listaDatas, e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** VALOR ***/}
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Input
                      type="text"
                      value={listaValor[1]}
                      onChange={(e) => handleInput(1, 2, listaValor, e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              { linhas }

              {/*** TOTAL ***/}
              <Row>
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup className="text-right mt-2">
                    <Label><b>Total</b></Label>
                  </FormGroup>
                </Col>
                <Col sm={3} md={3} lg={2} xl={2}>
                  <FormGroup>
                    <Input
                      type="text"
                      disabled
                      className={classTotal}
                      value={valor_total}
                    />
                  </FormGroup>
                </Col>
              </Row>

            </Col>
            {/*** DHSIS ***/}
            <Col sm={12} className="hide">
              <small>
                <span className="pr-3 text-black">Atualização:</span>
                <span className="text-muted">
                  {/*{ alt_dusuario } */}
                  {' '}
-
                  {' '}
                  { alt_dhsis }
                </span>
              </small>
            </Col>
          </Row>
          {/*** SAVE ***/}
          <Row>
            <SaveButton save={() => saveParcelar(props, form)} />
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  parcelamentoFicha: state.movimento.parcelamentoFicha,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(MovimentoParcelar);
