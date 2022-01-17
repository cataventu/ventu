///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveMovimentoFiltro } from '../../../functions/financeiro/movimento';

function MovimentoFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [status, setStatus] = useState('');
  const [transacao, setTransacao] = useState('');

  const [nome_pessoa, setNome_pessoa] = useState('');

  const [id_projeto, setId_Projeto] = useState('');
  const [projeto, setProjeto] = useState('');
  const [id_proservico, setId_Proservico] = useState('');
  const [proservico, setProservico] = useState('');

  const [subgrupo, setSubgrupo] = useState('');
  const [conta, setConta] = useState('');
  const [moeda, setMoeda] = useState('');
  const [cartaocorp, setCartaocorp] = useState('');
  const [descricao, setDescricao] = useState('');

  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');
  const [vencimento_maior, setVencimento_maior] = useState('');
  const [vencimento_menor, setVencimento_menor] = useState('');

  const [agrupamento, setAgrupamento] = useState(true);

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setStatus('');
    setTransacao('');
    setNome_pessoa('');
    setId_Projeto('');
    setProjeto('');
    setId_Proservico('');
    setProservico('');

    setSubgrupo('');
    setConta('');
    setMoeda('');
    setCartaocorp('');
    setDescricao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
    setVencimento_maior('');
    setVencimento_menor('');
    setAgrupamento('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_MOVIMENTO_FILTRO')) {
      const { dispatch } = props;
      dispatch({ type: '@SET_MOVIMENTO_FILTRO_ATIVO' });

      const filtro = JSON.parse(localStorage.getItem('TABELAS_MOVIMENTO_FILTRO'));
      const {
        status, transacao, nome_pessoa, id_projeto, projeto, id_proservico, proservico, subgrupo, conta, moeda, cartaocorp, descricao,
      } = filtro;
      const {
        alt_dhsis_maior, alt_dhsis_menor, dt_vencimento_maior, dt_vencimento_menor, agrupamento,
      } = filtro;

      setStatus(status);
      setTransacao(transacao);
      setNome_pessoa(nome_pessoa);
      setId_Projeto(id_projeto);
      setProjeto(projeto);
      setId_Proservico(id_proservico);
      setProservico(proservico);
      setSubgrupo(subgrupo);
      setConta(conta);
      setMoeda(moeda);
      setCartaocorp(cartaocorp);
      setDescricao(descricao);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
      setVencimento_maior(formatDataInput(dt_vencimento_maior));
      setVencimento_menor(formatDataInput(dt_vencimento_menor));
      setAgrupamento(agrupamento);

      setFirst(false);
    }
  }, [props, firstLoad, vencimento_maior, vencimento_menor]);

  useEffect(() => {
    setForm({
      chave: '',
      status,
      transacao,
      nome_pessoa,
      id_projeto,
      projeto,
      id_proservico,
      proservico,
      subgrupo,
      conta,
      moeda,
      cartaocorp,
      descricao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
      dt_vencimento_maior: formatData(vencimento_maior),
      dt_vencimento_menor: formatData(vencimento_menor),
      agrupamento: true,
    });
  }, [status, transacao, id_projeto, projeto, id_proservico, proservico, nome_pessoa, subgrupo, conta, moeda, cartaocorp, descricao, alt_dhsis_maior, alt_dhsis_menor, vencimento_maior, vencimento_menor, agrupamento]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveMovimentoFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-movimento-filtro')} title="Limpa todas as configurações do filtro" />,
  ];
  ///////// RENDER FILTRO /////////
  /////////////////////////////////

  return (
    <Container id="tabela-movimento-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/*** STATUS ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">PREVISTO</option>
                  <option value="2">CONFIRMADO</option>
                  <option value="3">CONCILIADO</option>
                  <option value="4">PARCELADO</option>
                </Input>
              </FormGroup>

            </Col>
            {/*** TRANSACAO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Transação</Label>
                <Input
                  type="select"
                  value={transacao}
                  onChange={(e) => setTransacao(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">PAGAR</option>
                  <option value="2">RECEBER</option>
                </Input>
              </FormGroup>

            </Col>
            {/**DESCRIÇÃO ***/}
            <Col sm={6} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  value={descricao}
                  placeholder=""
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            {/**CONTATO ***/}
            <Col sm={12} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Contato</Label>
                <Input
                  type="text"
                  value={nome_pessoa}
                  placeholder=""
                  onChange={(e) => setNome_pessoa(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>

            {/**ID PROJETO ***/}
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>ID Projeto</Label>
                <Input
                  type="text"
                  value={id_projeto}
                  placeholder=""
                  onChange={(e) => setId_Projeto(e.target.value)}
                  maxLength={9}
                />
              </FormGroup>
            </Col>
            {/**PROJETO ***/}
            <Col sm={10} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Projeto</Label>
                <Input
                  type="text"
                  value={projeto}
                  placeholder=""
                  onChange={(e) => setProjeto(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            {/**ID SERVICO ***/}
            <Col sm={2} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>ID Serviço</Label>
                <Input
                  type="text"
                  value={id_proservico}
                  placeholder=""
                  onChange={(e) => setId_Proservico(e.target.value)}
                  maxLength={9}
                />
              </FormGroup>
            </Col>
            {/**SERVIÇO ***/}
            <Col sm={10} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Serviço</Label>
                <Input
                  type="text"
                  value={proservico}
                  placeholder=""
                  onChange={(e) => setProservico(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>

            {/**CONTA ***/}
            <Col sm={6} md={2} lg={2} xl={3}>
              <FormGroup>
                <Label>Conta</Label>
                <Input
                  type="text"
                  value={conta}
                  placeholder=""
                  onChange={(e) => setConta(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            {/**MOEDA ***/}
            <Col sm={6} md={2} lg={2} xl={3}>
              <FormGroup>
                <Label>Moeda</Label>
                <Input
                  type="text"
                  value={moeda}
                  placeholder=""
                  onChange={(e) => setMoeda(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            {/**SUBGRUPO ***/}
            <Col sm={6} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Subgrupo</Label>
                <Input
                  type="text"
                  value={subgrupo}
                  placeholder=""
                  onChange={(e) => setSubgrupo(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            {/**CARTAO CORP ***/}
            <Col sm={6} md={4} lg={4} xl={3}>
              <FormGroup>
                <Label>Cartão Corporativo</Label>
                <Input
                  type="text"
                  value={cartaocorp}
                  placeholder=""
                  onChange={(e) => setCartaocorp(e.target.value)}
                  maxLength={50}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>
            {/*** DT VENCIMENTO MAIOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Vencimento Maior que</Label>
                <Input
                  type="date"
                  value={vencimento_maior}
                  onChange={(e) => setVencimento_maior(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DT VENCIMENTO MENOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Vencimento Menor que</Label>
                <Input
                  type="date"
                  value={vencimento_menor}
                  onChange={(e) => setVencimento_menor(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MAIOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Atualização Maior que</Label>
                <Input
                  type="date"
                  value={alt_dhsis_maior}
                  onChange={(e) => setAlt_dhsis_maior(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MENOR ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Atualização Menor que</Label>
                <Input
                  type="date"
                  value={alt_dhsis_menor}
                  onChange={(e) => setAlt_dhsis_menor(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12} className="text-right pt-4">
              {ActionButtons}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default connect()(MovimentoFiltro);
