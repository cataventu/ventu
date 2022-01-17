///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  Row, Col, FormGroup, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Modal, TableTotal, TableButton, Buttons, AutoCompletarV2,
} from '../../../../components';
import {
  getDados, formatDataInput, formatData, formatExibeValor, formatDecimal,
  formatCompleteZeros,
} from '../../../../functions/sistema';
//import { calculaPag_ValorTotal } from '../../../../functions/projeto/servico';

import './style.css';

function Step06(props) {
  const hoje = moment().format('L');

  const { idServico } = props.match.params;

  const {
    Id_servico,
    AC_Fornecedor,
    pag_valortotal,
    AC_ID_Fornecedor,
    AC_Fornecedor_DadosAdicionais,
  } = props;

  ////// TABELA
  const [firstLoad, setFirst] = useState(true);
  const [showTable, setShowTable] = useState('show');

  const tableColumns = [
    {
      dataField: 'id_movimento', text: 'Movimento', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-id', classes: '',
    },
    {
      dataField: 'linha', text: 'Linha', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-id hide', classes: 'hide',
    },
    {
      dataField: 'nome_pessoa', text: 'Pagador', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-pagador',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-data',
    },
    {
      dataField: 'valor', text: 'Valor', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-valor', classes: 'text-right',
    },
    {
      dataField: 'rateio', text: 'Rateio %', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-rateio', classes: 'text-right',
    },
    {
      dataField: 'cambio', text: 'Câmbio', sort: true, headerClasses: 'bg-dark text-white tb-ficha06-cambio', classes: 'text-center',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'bg-dark text-white tb-ficha06-buttons',
    },
  ];

  ////// FORMULARIO
  const [showForm, setShowForm] = useState('hide');

  const [id, setId] = useState(0);
  const [linha, setLinha] = useState(0);

  const [id_proservico, setId_proservico] = useState(0);

  const [pessoa, setPessoa] = useState('');
  const [id_pfisica, setId_Pfisica] = useState(0);
  const [id_pjuridica, setId_Pjuridica] = useState(0);
  const [nome_pessoa, setNome_pessoa] = useState('');
  const [gera_pagto, setGeraPagto] = useState('');

  const [data, setData] = useState(formatDataInput(hoje));

  const [rateio, setRateio] = useState(100);
  const [valor, setValor] = useState('');

  const [valor_total, setValorTotal] = useState('');
  const [soma, setSoma] = useState(0);
  const [alertSoma, setAlertSoma] = useState(false);

  const [cambio, setCambio] = useState(1);

  const [documento, setDocumento] = useState(1);
  const [ndocumento, setNdocumento] = useState('');

  const [listaForma, setListaForma] = useState('');
  const [forma, setForma] = useState(1);

  const [car_id_cartao, setCar_id_cartao] = useState(0);
  const [car_cartao, setCar_cartao] = useState('');
  const [car_titular, setCar_titular] = useState('');
  const [car_numero, setCar_numero] = useState('');
  const [car_validade, setCar_validade] = useState('');
  const [car_seguranca, setCar_seguranca] = useState('');
  const [car_senha, setCar_senha] = useState('');

  const [id_movimento, setId_movimento] = useState('');

  const [bloqueio, setBloqueio] = useState(false);

  const [deleteId, setDeleteId] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [flagAtualizado, setAtualizado] = useState(false);
  const [rconpagto_regs, setRconpagto_regs] = useState([]);

  const [listaDocumento, setlistaDocumento] = useState([]);

  ////// AUTO COMPLETAR
  const [resetEditar, setResetEditar] = useState(false);
  const [id_Representante, setId_Representante] = useState(0);
  const [representante, setRepresentante] = useState('');
  const [id_cartaocorp, setId_CartaoCorp] = useState(0);
  const [cartaocorp, setCartaocorp] = useState('');

  //const [tipo_servico, setTipo_Servico] = useState(0);

  const handleAtualizaTotal = useCallback((lista) => {
    let _temp = 0;
    lista.forEach((item) => {
      if (item.valor !== undefined) {
        const valor = item.valor.toString().replace(',', '.');
        _temp = parseFloat(_temp) + parseFloat(valor);
      }
    });
    setValorTotal(formatExibeValor(_temp));
  }, []);

  const handleClose = useCallback(() => {
    setId(0);
    setLinha(0);

    setPessoa('');
    setId_Pfisica('');
    setId_Pjuridica('');

    setNome_pessoa('');
    setData(formatDataInput(hoje));
    setRateio(100);

    setValor('');
    setCambio(1);
    setDocumento(1);
    setNdocumento('');
    setForma(1);
    setGeraPagto('');

    setCar_id_cartao('');
    setCar_cartao('');
    setCar_titular('');
    setCar_numero('');
    setCar_validade('');
    setCar_seguranca('');
    setCar_senha('');

    setId_CartaoCorp(0);
    setCartaocorp('');
    setId_movimento('');

    setBloqueio('');

    setRepresentante('');
    setId_Representante(0);

    setShowTable('show');
    setShowForm('show');

    const { dispatch } = props;
    dispatch({ type: '@SET_FICHA_PAGAMENTO_FORM_FALSE' });

    dispatch({ type: '@SET_AUTOCOMPLETAR_REPRESENTANTE', payload: '' });
    dispatch({ type: '@SET_AUTOCOMPLETAR_ID_REPRESENTANTE', payload: 0 });

    dispatch({ type: '@SET_AUTOCOMPLETAR_CARTAOCORP', payload: '' });
    dispatch({ type: '@SET_AUTOCOMPLETAR_ID_CARTAOCORP', payload: 0 });

    setResetEditar(true);
  }, [props, hoje]);

  const handleShowModal = useCallback((id) => {
    setDeleteId(id);
    setModalVisibility(true);
  }, []);

  const handleDelete = useCallback((value) => {
    for (let i = rconpagto_regs.length - 1; i >= 0; i -= 1) {
      if (rconpagto_regs[i].linha === value) {
        rconpagto_regs.splice(i, 1);
      }
    }
    setModalVisibility(false);
    handleAtualizaTotal(rconpagto_regs);
    localStorage.setItem('PROSERVICO_FORM_STEP_06', JSON.stringify(rconpagto_regs));
  }, [rconpagto_regs, handleAtualizaTotal]);

  const handleEditar = useCallback((item, linha) => {
    const {
      id,

      pessoa,
      id_pfisica,
      id_pjuridica,
      nome_pessoa,
      gera_pagto,

      data,
      rateio,

      valor,
      cambio,
      documento,
      ndocumento,
      forma,

      car_id_cartao,
      car_cartao,
      car_titular,
      car_numero,
      car_validade,
      car_seguranca,
      car_senha,

      id_cartaocorp,
      cartaocorp,
      id_movimento,
      bloqueio,
    } = item;

    const { dispatch } = props;

    setId(id);
    setLinha(linha);

    setPessoa(pessoa);
    setId_Pfisica(id_pfisica);
    setId_Pjuridica(id_pjuridica);

    if (parseInt(pessoa, 10) === 1) { setId_Representante(id_pfisica); }
    if (parseInt(pessoa, 10) === 2) { setId_Representante(id_pjuridica); }

    setNome_pessoa(nome_pessoa);
    setRepresentante(nome_pessoa);
    setGeraPagto(gera_pagto);

    setData(formatDataInput(data));
    setRateio(rateio);

    setValor(formatCompleteZeros(valor, 2));
    setCambio(formatCompleteZeros(cambio, 4));

    if (parseInt(documento, 10) === 0) { setDocumento(1); }
    if (parseInt(documento, 10) > 0) { setDocumento(documento); }

    //setDocumento(documento);
    setNdocumento(ndocumento);
    setForma(forma);

    setCar_id_cartao(car_id_cartao);
    setCar_cartao(car_cartao);
    setCar_titular(car_titular);
    setCar_numero(car_numero);
    setCar_validade(car_validade);
    setCar_seguranca(car_seguranca);
    setCar_senha(car_senha);

    setId_movimento(id_movimento);

    setBloqueio(bloqueio);

    setResetEditar(true); /// Usado para corrigir editar do Auto Completar (gambiarra);
    parseInt(id, 10) === 0 ? setId(9999) : setId(id); /// Usado p/ corrigir btn editar;

    setId_CartaoCorp(id_cartaocorp);
    setCartaocorp(cartaocorp);

    dispatch({ type: '@SET_FICHA_PAGAMENTO_FORM_TRUE' });
  }, [props]);

  const handleAtualiza = useCallback((rconpagto_regs) => {
    const _temp = [];
    let _soma = 0;
    let linha = 0;

    rconpagto_regs.forEach((item) => {
      const {
        id, id_proservico, pessoa, id_pfisica, id_pjuridica, gera_pagto, nome_pessoa,
        data, rateio, valor, cambio, documento, ndocumento, forma, car_id_cartao, car_cartao, car_titular,
        car_numero, car_validade, car_seguranca, car_senha, id_cartaocorp, cartaocorp,
        id_movimento, bloqueio,
      } = item;

      const deleteLinha = linha;
      const editarLinha = linha;

      const buttonExcluirEnable = (<TableButton action="Excluir" permission={props} click={() => handleShowModal(deleteLinha)} />);
      const buttonExcluirDisable = (<TableButton action="Excluir" permission={props} disable="disable" />);
      const buttonEditarEnable = (<TableButton action="Editar" permission={props} click={() => handleEditar(item, editarLinha)} />);
      const buttonEditarDisable = (<TableButton action="Editar" permission={props} disable="disable" />);

      let buttonExcluir;
      let buttonEditar;

      if (item.bloqueio === true) {
        buttonExcluir = buttonExcluirDisable;
      } else {
        buttonExcluir = buttonExcluirEnable;
      }

      if (item.bloqueio === true) {
        buttonEditar = buttonEditarDisable;
      } else {
        buttonEditar = buttonEditarEnable;
      }
      const buttons = [buttonExcluir, buttonEditar];

      const newLine = {
        id,
        id_proservico,
        linha,

        pessoa,
        id_pfisica,
        id_pjuridica,
        nome_pessoa,
        gera_pagto,

        data,
        rateio,

        //valor: formatExibeValor(valor),
        valor: formatCompleteZeros(valor, 2),
        cambio,
        documento,
        ndocumento,
        forma,

        car_id_cartao,
        car_cartao,
        car_titular,
        car_numero,
        car_validade,
        car_seguranca,
        car_senha,

        id_cartaocorp,
        cartaocorp,
        id_movimento,
        bloqueio,
        buttons,
      };
      linha += 1;

      _soma = parseFloat(_soma) + parseFloat(valor);
      _temp.push(newLine);
    });

    setSoma(_soma);
    setRconpagto_regs(_temp);
    handleAtualizaTotal(_temp);
    localStorage.setItem('PROSERVICO_FORM_STEP_06', JSON.stringify(_temp));
  }, [handleEditar, handleShowModal, handleAtualizaTotal, props]);

  const handleSave = useCallback(() => {
    let Id;
    let GeraPagto;
    let Nome_pessoa;
    let Pessoa;
    let Id_pfisica;
    let Id_pjuridica;
    let Id_cartaocorp;

    id === 9999 ? Id = 0 : Id = id;
    gera_pagto !== undefined ? GeraPagto = gera_pagto : GeraPagto = false;
    nome_pessoa !== undefined ? Nome_pessoa = nome_pessoa : Nome_pessoa = '';
    pessoa !== undefined ? Pessoa = pessoa : Pessoa = 0;
    id_pfisica !== undefined ? Id_pfisica = id_pfisica : Id_pfisica = 0;
    id_pjuridica !== undefined ? Id_pjuridica = id_pjuridica : Id_pjuridica = 0;
    id_cartaocorp !== undefined ? Id_cartaocorp = id_cartaocorp : Id_cartaocorp = 0;

    ////// NEW LINE
    const newLine = {
      id: Id,
      linha,
      id_proservico,

      pessoa: Pessoa,
      id_pfisica: Id_pfisica,
      id_pjuridica: Id_pjuridica,
      nome_pessoa: Nome_pessoa,
      gera_pagto: GeraPagto,

      data: formatData(data),

      rateio,
      //correcao erro ao incluir mais de uma parcela - estva forcando a sugestao do valor total a pagar
      valor, //: formatCompleteZeros(pag_valortotal, 2),
      cambio,
      documento,
      ndocumento,
      forma,

      car_id_cartao,
      car_cartao,
      car_titular,
      car_numero,
      car_validade,
      car_seguranca,
      car_senha,

      id_cartaocorp: Id_cartaocorp,
      cartaocorp,
      id_movimento,
      bloqueio,
    };

    ////// CASO EDITAR
    if (id > 0) {
      const _temp = [];
      rconpagto_regs.forEach((item) => {
        item.linha === linha
          ? _temp.push(newLine)
          : _temp.push(item);
      });
      handleAtualiza(_temp);
    }

    ////// CASO NOVO REGISTRO
    if (id === 0) {
      const _temp = rconpagto_regs;
      _temp.push(newLine);
      handleAtualiza(_temp);
    }

    handleClose();
  }, [gera_pagto, linha, nome_pessoa, id_pfisica, id_pjuridica, pessoa, id_proservico, data, rateio, valor, cambio, documento, ndocumento, forma, car_id_cartao, car_cartao, car_titular, car_numero, car_validade, car_seguranca, car_senha, id_cartaocorp, cartaocorp, id_movimento, id, handleClose, rconpagto_regs, handleAtualiza]);

  const getTabelas = useCallback(() => {
    async function getTabelas() {
      ////// STATUS
      const forma = await getDados(props, '/TsmSISTEMA/FORMA_TABELA/1', '');
      const documento = await getDados(props, '/TsmSISTEMA/DOCUMENTO_TABELA/1', '@GET_TIPO_DOCUMENTO');
      setListaForma(forma);
      setlistaDocumento(documento);
    }
    getTabelas();
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getTabelas();
      setId_proservico(idServico);
      localStorage.setItem('PROSERVICO_FORM_STEP_06', JSON.stringify(rconpagto_regs));
      setFirst(false);
    }
  }, [idServico, firstLoad, getTabelas]);

  /// RECEBE TABLE DATA
  useEffect(() => {
    const idUrl = idServico;
    const { fichaData, fichaConsolidador, flagConsolidador } = props;

    if (parseInt(idUrl, 10) > 0 || flagConsolidador) {
      let Ficha;
      flagConsolidador
        ? Ficha = fichaConsolidador
        : Ficha = fichaData;

      const { id, rconpagto_regs } = Ficha;

      if ((id > 0 && !flagAtualizado) || flagConsolidador) {
        handleAtualiza(rconpagto_regs);
        setAtualizado(true);

        const { dispatch } = props;
        dispatch({ type: '@SET_PROSERVICO_FLAG_CONSOLIDADOR_STEP_06_FALSE' });
      }
    }
  }, [props, flagAtualizado, handleAtualiza, idServico]);

  /// EXIBE / OCULTA FORM
  useEffect(() => {
    if (props.form) {
      /// RECEBE DADOS DO FORNECEDOR DO STEP 1
      if (AC_Fornecedor !== undefined) {
        setRepresentante(AC_Fornecedor);
        setNome_pessoa(AC_Fornecedor);
        setId_Representante(AC_ID_Fornecedor);

        if (AC_Fornecedor_DadosAdicionais !== undefined) {
          const { pessoa, id_pfisica, id_pjuridica } = AC_Fornecedor_DadosAdicionais;
          if (pessoa !== undefined) {
            setPessoa(pessoa);
            setId_Pfisica(id_pfisica);
            setId_Pjuridica(id_pjuridica);
          }
        }
      }
      //sugere valor quando importado do consolidador
      if (parseInt(props.tipo_servico, 10) === 1 && valor !== undefined) {
        setValor(pag_valortotal);
      }
      setShowTable('hide');
      setShowForm('show');
    } else {
      setShowTable('show');
      setShowForm('hide');
    }
  }, [props.form, AC_Fornecedor, AC_ID_Fornecedor, AC_Fornecedor_DadosAdicionais, pag_valortotal]);

  /// MONITORA DIFERENÇA DO TOTAL E SOMA
  useEffect(() => {
    parseFloat(soma) !== parseFloat(valor_total)
      ? setAlertSoma(true)
      : setAlertSoma(false);
  }, [soma, valor_total]);

  /// AUTO COMPLETAR
  useEffect(() => {
    setNome_pessoa(props.Representante);
    setRepresentante(props.Representante);
    setId_Representante(props.Representante_Id);

    if (props.Representante_DadosAdicionais !== undefined) {
      const {
        pessoa, id_pfisica, id_pjuridica, gera_pagto,
      } = props.Representante_DadosAdicionais;
      if (pessoa !== undefined) {
        setPessoa(pessoa);
        setId_Pfisica(id_pfisica);
        setId_Pjuridica(id_pjuridica);
        setGeraPagto(gera_pagto);
      }
    }
  }, [props.Representante_Id, props.Representante, props.Representante_DadosAdicionais]);

  //AUTO COMPLETAR RESET
  useEffect(() => {
    if (resetEditar) { setResetEditar(false); }
  }, [resetEditar]);

  useEffect(() => {
    setId_CartaoCorp(props.autoCompletarId_CartaoCorp);
  }, [props.autoCompletarId_CartaoCorp]);

  /// PREENCHIMENTO AUTO
  useEffect(() => {
    setValor(pag_valortotal);
    setValorTotal(pag_valortotal);
  }, [pag_valortotal]);

  //useEffect(() => {
  //if (parseInt(id, 10) === 0 || parseInt(id, 10) === 9999) { setId_CartaoCorp(''); } else { setId_CartaoCorp(id_cartaocorp); }
  //}, [id, id_cartaocorp]);

  return (
    <>
      {/*** TABELA ***/}
      <Row className={showTable}>
        <Col sm={12} className="p-0">
          <BootstrapTable
            keyField="id"
            data={rconpagto_regs}
            classes="table-striped table-movimento"
            columns={tableColumns}
            bootstrap4
            bordered={false}
            pagination={paginationFactory({
              sizePerPage: 25,
              sizePerPageList: [5, 10, 25, 50, 100],
            })}
          />

          <TableTotal
            totalPagar={formatExibeValor(valor_total)}
            soma={formatExibeValor(soma)}
            somaAlert={alertSoma}
          />

        </Col>
      </Row>

      {/*** MODAL DELETE ***/}
      <Modal
        open={modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => setModalVisibility(false)}
        sim={() => handleDelete(deleteId)}
      />

      {/*** FORMULARIO ***/}
      <Row className={showForm}>
        <Col sm={12}>
          {/*** LINHA 01 ***/}
          <Row>
            {/*** ID - OCULTO ***/}
            <Col sm={2} className="hide">
              <FormGroup>
                <Label>Id</Label>
                <Input
                  type="number"
                  disabled
                  value={id}
                />
              </FormGroup>
            </Col>
            {/*** LINHA - OCULTO ***/}
            <Col sm={2} className="hide">
              <FormGroup>
                <Label>linha</Label>
                <Input
                  type="number"
                  disabled
                  value={linha}
                />
              </FormGroup>
            </Col>
            {/*** ID MOVIMENTO ***/}
            <Col sm={2} md={2} lg={2} xl={2} className="">
              <FormGroup>
                <Label>Movimento</Label>
                <Input
                  type="number"
                  disabled
                  value={id_movimento}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** CONTATO ***/}
            <Col sm={6} md={6} lg={4} xl={4}>
              <FormGroup>
                <Label>Representante</Label>
                <AutoCompletarV2
                  {...props}
                  value={representante}
                  valueId={id_Representante}
                  tabela="REPRESENTANTE"
                  campo={Id_servico}
                  disabled={false}
                  visible
                  dados_adicionais
                  editar={{ id: id_Representante, value: representante, valueId: id_Representante }}
                  resetEditar={resetEditar}
                />
              </FormGroup>
            </Col>
            {/*** DATA ***/}
            <Col sm={3} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 02 ***/}
          <Row>
            {/*** VALOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Valor</Label>
                <Input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(formatDecimal(e.target.value, 2))}
                />
              </FormGroup>
            </Col>
            {/*** CAMBIO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Câmbio</Label>
                <Input
                  type="number"
                  value={cambio}
                  placeholder="0.0000"
                  onChange={(e) => setCambio(e.target.value)}
                  onBlur={(e) => setCambio(formatCompleteZeros(e.target.value, 4))}
                />
              </FormGroup>
            </Col>
            {/*** RATEIO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Rateio %</Label>
                <Input
                  type="number"
                  value={rateio}
                  onChange={(e) => setRateio(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 03 ***/}
          <Row>
            {/*** DOCUMENTO ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Documento</Label>
                <Input
                  type="select"
                  className="required"
                  value={documento}
                  //disabled={disabledStatus}
                  onChange={(e) => setDocumento(e.target.value)}
                >
                  <option value="0">Selecione...</option>

                  { !!listaDocumento && listaDocumento.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))}

                </Input>
              </FormGroup>
            </Col>
            {/*** NUM DOCUMENTO ***/}
            <Col sm={4} md={4} lg={2} xl={2}>
              <FormGroup>
                <Label>Número Documento</Label>
                <Input
                  type="text"
                  value={ndocumento}
                  maxLength={10}
                  onChange={(e) => setNdocumento(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*LINHA 04  */}
            {/*** FORMA ***/}
            <Col sm={3} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Forma</Label>
                <Input
                  type="select"

                  value={forma}
                  onChange={(e) => setForma(e.target.value)}
                >
                  <option value="0">Selecione...</option>

                  { !!listaForma && listaForma.map((item) => (
                    <option key={item.id} value={item.id}>{item.descricao}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            {/*** CARTAO CORP ***/}
            <Col sm={6} md={6} lg={4} xl={4}>
              <FormGroup>
                <Label>Cartão Corporativo</Label>
                <AutoCompletarV2
                  {...props}
                  value={cartaocorp}
                  valueId={id_cartaocorp}
                  tabela="CARTAOCORP"
                  campo=""
                  disabled={false}
                  visible
                  editar={{ id, value: cartaocorp, valueId: id_cartaocorp }}
                  resetEditar={resetEditar}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*** LINHA 04 ***/}
          <Row>
            {/*** SAVE ***/}
            <Col sm={12} className="pt-3">
              <Buttons
                onClick={() => handleSave()}
                description="Salvar"
                color="green"
                title="Salva todas as informações."
              />
              <Buttons
                onClick={() => handleClose()}
                description="Fechar"
                color="gray"
                title="Fechar janela."
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.servicos.fichaData,
  form: state.servicos.Pagamento_ShowForm,

  //tipo_servico: state.servicos.tipo_servico,

  Id_servico: state.servicos.Id_servico,

  operacaoServico: state.servicos.operacaoServico,
  tipo_servico: state.servicos.tipo_servico,
  cobrancaTarifa: state.servicos.cobrancaTarifa,
  rentTarifa: state.servicos.rentTarifa,

  pag_valortotal: state.servicos.pag_valortotal,

  fichaConsolidador: state.servicos.fichaDataConsolidador,
  flagConsolidador: state.servicos.flagFichaConsolidador_Step06,

  //Id_servico: state.autoCompletar.autoCompletarId_RServico,
  autoCompletarId_CartaoCorp: state.autoCompletar.autoCompletarId_CartaoCorp,

  Representante: state.autoCompletar.autoCompletarRepresentante,
  Representante_Id: state.autoCompletar.autoCompletarId_Representante,
  Representante_DadosAdicionais: state.autoCompletar.autoCompletarRepresentanteDadosAdicionais,

  AC_Fornecedor: state.autoCompletar.autoCompletarFornecedor,
  AC_ID_Fornecedor: state.autoCompletar.autoCompletarId_Fornecedor,
  AC_Fornecedor_DadosAdicionais: state.autoCompletar.autoCompletarFornecedorDadosAdicionais,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});

export default connect(() => (mapState))(Step06);
