///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';

import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveOcorrenciasFiltro } from '../../../functions/sistema/ocorrencias';

function OcorrenciasFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setNome('');
    setStatus('');
    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('PROJETO_OCORRENCIAS_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('PROJETO_OCORRENCIAS_FILTRO'));
      const {
        nome, status, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;
      setNome(nome);
      setStatus(status);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      nome,
      status,
      //status: parseInt(status),
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [nome, status, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveOcorrenciasFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'projeto-ocorrencia-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  return (
    <Container id="projeto-ocorrencia-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          {/*** LINHA 01 ***/}
          <Row form>
            {/*** DESCRICAO ***/}
            <Col sm={8} lg={3} xl={4}>
              <FormGroup>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  value={nome}
                  placeholder=""
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** Status ***/}
            <Col sm={4} lg={3} xl={2}>
              <FormGroup>
                <Label>Situação</Label>
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="3">ARQUIVADA</option>
                  <option value="2">SOLUCIONADA</option>
                  <option value="1">PENDENTE</option>

                </Input>
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MAIOR ***/}
            <Col sm={6} lg={3} xl={2}>
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
            <Col sm={6} lg={3} xl={2}>
              <FormGroup>
                <Label>Atualização Menor que</Label>
                <Input
                  type="date"
                  value={alt_dhsis_menor}
                  onChange={(e) => setAlt_dhsis_menor(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** BOTOES ***/}
            <Col sm={12} className="text-right pt-2">
              { ActionButtons }
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}

export default connect()(OcorrenciasFiltro);
