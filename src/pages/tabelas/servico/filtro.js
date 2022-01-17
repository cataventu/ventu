///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveServicoFiltro } from '../../../functions/tabelas/servico';

///////// FILTRO SERVICO //////////
/////////////////////////////////
function ServicoFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');

  const [situacao, setSituacao] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setDescricao('');
    setTipo('');

    setSituacao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_SERVICO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_SERVICO_FILTRO'));
      const {
        descricao, tipo, situacao, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

      setDescricao(descricao);
      setTipo(tipo);

      setSituacao(situacao);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      descricao,
      tipo,
      situacao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [descricao, tipo, situacao, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveServicoFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-servico-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  return (
    <Container id="tabela-servico-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/*** DESCRICAO ***/}
            <Col sm={6} md={4} lg={4} xl={4}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  value={descricao}
                  placeholder=""
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** TIPO CARTAO ** */}
            <Col sm={3} md={2} lg={2} xl={2}>
              {/*<FormGroup>
                <Label>Tipo</Label>
                <Input
                  type="text"
                  value={tipo}
                  placeholder=""
                  onChange={(e) => setTipo(e.target.value)}
                  maxLength={30}
                />
              </FormGroup> */}
              <FormGroup>
                <Label>Tipo</Label>
                <Input
                  type="select"
                  value={tipo}
                  config={props}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">AÉREO</option>
                  <option value="2">HOSPEDAGEM</option>
                  <option value="3">VEÍCULO</option>
                  <option value="4">CRIAÇÃO</option>
                  <option value="5">LOGÍSTICA</option>
                  <option value="6">PRODUÇÃO</option>
                  <option value="7">FINANCEIRO</option>
                  <option value="8">GENÉRICO</option>
                </Input>
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={3} md={2} lg={2} xl={2}>
              <FormGroup>
                <Label>Situação</Label>
                <Input
                  type="select"
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">ATIVO</option>
                  <option value="0">INATIVO</option>
                </Input>
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MAIOR ***/}
            <Col sm={4} md={2} lg={2} xl={2}>
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
            <Col sm={4} md={2} lg={2} xl={2}>
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
              { ActionButtons }
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default connect()(ServicoFiltro);
