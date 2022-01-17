///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveAeroportoFiltro } from '../../../functions/tabelas/aeroporto';

///////// FILTRO //////////
/////////////////////////////////
function AeroportoFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [aeroporto, setAeroporto] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [pais, setPais] = useState('');
  const [situacao, setSituacao] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setAeroporto('');
    setMunicipio('');
    setUf('');
    setPais('');
    setSituacao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_AEROPORTO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_AEROPORTO_FILTRO'));
      const {
        nome, municipio, uf, pais, situacao, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

      setAeroporto(nome);
      setMunicipio(municipio);
      setUf(uf);
      setPais(pais);
      setSituacao(situacao);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      nome: aeroporto,
      municipio,
      uf,
      pais,
      situacao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [aeroporto, municipio, uf, pais, situacao, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveAeroportoFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-aeroporto-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container id="tabela-aeroporto-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/*** AEROPORTO ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Aeroporto</Label>
                <Input
                  type="text"
                  value={aeroporto}
                  placeholder=""
                  onChange={(e) => setAeroporto(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** MUNICIPIO ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Município</Label>
                <Input
                  type="text"
                  value={municipio}
                  placeholder=""
                  onChange={(e) => setMunicipio(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** UF ***/}
            <Col sm={3} md={3} lg={1} xl={1}>
              <FormGroup>
                <Label>UF</Label>
                <Input
                  type="text"
                  value={uf}
                  placeholder=""
                  onChange={(e) => setUf(e.target.value)}
                  maxLength={2}
                />
              </FormGroup>
            </Col>
            {/*** PAIS ***/}
            <Col sm={6} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>País</Label>
                <Input
                  type="text"
                  value={pais}
                  placeholder=""
                  onChange={(e) => setPais(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={3} md={3} lg={1} xl={1}>
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

export default connect()(AeroportoFiltro);
