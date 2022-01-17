///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveMunicipioFiltro } from '../../../functions/tabelas/municipio';

///////// FILTRO Municipio //////////
/////////////////////////////////
function MunicipioFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [pais, setPais] = useState('');
  const [situacao, setSituacao] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setMunicipio('');
    setUf('');
    setPais('');
    setSituacao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_MUNICIPIO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_MUNICIPIO_FILTRO'));
      const {
        municipio, uf, pais, situacao, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

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
      municipio,
      uf,
      pais,
      situacao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [municipio, uf, pais, situacao, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveMunicipioFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-municipio-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container id="tabela-municipio-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/*** MUNICIPIO ***/}
            <Col sm={5} md={4} lg={3} xl={3}>
              <FormGroup>
                <Label>Municipio</Label>
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
            <Col sm={2} md={2} lg={1} xl={1}>
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
            <Col sm={5} md={3} lg={2} xl={3}>
              <FormGroup>
                <Label>Pais</Label>
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
            <Col sm={4} md={3} lg={2} xl={1}>
              <FormGroup>
                <Label>Situação</Label>
                <Input
                  type="select"
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </Input>
              </FormGroup>
            </Col>
            {/*** ATUALIZACAO MAIOR ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
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
            <Col sm={4} md={3} lg={2} xl={2}>
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

export default connect()(MunicipioFiltro);
