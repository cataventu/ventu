///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveProjetoFiltro } from '../../../functions/projeto';

function ProjetoFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [codigo, setCodigo] = useState('');
  const [projeto, setProjeto] = useState('');
  const [status, setStatus] = useState('');
  const [tipo, setTipo] = useState('');
  const [dt_inicio_menor, setDt_inicio_menor] = useState('');
  const [dt_inicio_maior, setDt_inicio_maior] = useState('');

  const [dt_termino_menor, setDt_termino_menor] = useState('');
  const [dt_termino_maior, setDt_termino_maior] = useState('');

  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFiltro = useCallback(() => {
    setCodigo('');
    setProjeto('');
    setStatus('');
    setTipo('');
    setCodigo('');

    setDt_inicio_menor('');
    setDt_inicio_maior('');

    setDt_termino_menor('');
    setDt_termino_maior('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_PROJETO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_PROJETO_FILTRO'));
      const {
        codigo, descricao, status, tipo, dt_inicio_menor, dt_inicio_maior, dt_termino_menor, dt_termino_maior, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

      setCodigo(codigo);
      setProjeto(descricao);
      setStatus(status);
      setTipo(tipo);
      setDt_inicio_menor(formatDataInput(dt_inicio_menor));
      setDt_inicio_maior(formatDataInput(dt_inicio_maior));

      setDt_termino_menor(formatDataInput(dt_termino_menor));
      setDt_termino_maior(formatDataInput(dt_termino_maior));

      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      descricao: projeto,
      status,
      tipo,
      dt_inicio_menor: formatData(dt_inicio_menor),
      dt_inicio_maior: formatData(dt_inicio_maior),

      dt_termino_menor: formatData(dt_termino_menor),
      dt_termino_maior: formatData(dt_termino_maior),

      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [codigo, projeto, status, tipo, dt_inicio_menor, dt_inicio_maior, dt_termino_menor, dt_termino_maior, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" icon="faFilter" color="primary" onClick={() => saveProjetoFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" icon="faEraser" color="filtro-interno" onClick={() => resetFiltro()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" icon="faTimes" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-projeto-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  return (
    <Container id="tabela-projeto-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          {/*** LINHA 01 ***/}
          <Row form>

            {/*** PROJETO ***/}
            <Col sm={6} md={6} lg={6} xl={6}>
              <FormGroup>
                <Label>Projeto</Label>
                <Input
                  type="text"
                  value={projeto}
                  onChange={(e) => setProjeto(e.target.value)}
                  maxLength={30}

                />
              </FormGroup>
            </Col>
            {/*** STATUS ***/}
            <Col sm={3} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">COTAÇÃO</option>
                  <option value="2">CONFIRMADO</option>
                  <option value="3">ENCERRADO</option>
                  <option value="4">CANCELADO</option>
                </Input>
              </FormGroup>
            </Col>
            {/*** TIPO ***/}
            <Col sm={3} md={3} lg={3} xl={3}>
              <FormGroup>
                <Label>Tipo</Label>
                <Input
                  type="select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">EVENTOS</option>
                  <option value="2">GRUPOS</option>
                </Input>
              </FormGroup>
            </Col>

            {/*** DT INICIO MENOR ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Data Início:</Label>
                <Input
                  type="date"
                  value={dt_inicio_menor}
                  onChange={(e) => setDt_inicio_menor(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DT INICIO MAIOR ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Até:</Label>
                <Input
                  type="date"
                  value={dt_inicio_maior}
                  onChange={(e) => setDt_inicio_maior(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DT TERMINO MENOR ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Data Término</Label>
                <Input
                  type="date"
                  value={dt_termino_menor}
                  onChange={(e) => setDt_termino_menor(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** DT TERMINO MAIOR ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Até:</Label>
                <Input
                  type="date"
                  value={dt_termino_maior}
                  onChange={(e) => setDt_termino_maior(e.target.value)}
                />
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MAIOR ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
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
            <Col sm={6} md={3} lg={2} xl={2}>
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

export default connect()(ProjetoFiltro);
