///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { savePaisFiltro } from '../../../functions/tabelas/pais';

///////// FILTRO Pais //////////
////////////////////////////////
function PaisFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [pais, setPais] = useState('');
  const [sigla, setSigla] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [situacao, setSituacao] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setPais('');
    setSigla('');
    setNacionalidade('');

    setSituacao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_AEROPORTO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_AEROPORTO_FILTRO'));
      const {
        pais, sigla, nacionalidade, situacao, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

      setPais(pais);
      setSigla(sigla);
      setNacionalidade(nacionalidade);
      setSituacao(situacao);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      pais,
      sigla,
      nacionalidade,
      situacao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [pais, sigla, nacionalidade, situacao, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => savePaisFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-pais-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container id="tabela-pais-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/*** PAIS ***/}
            <Col sm={5} md={4} lg={3} xl={3}>
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
            {/*** SIGLA ***/}
            <Col sm={2} md={2} lg={1} xl={1}>
              <FormGroup>
                <Label>Sigla</Label>
                <Input
                  type="text"
                  value={sigla}
                  placeholder=""
                  onChange={(e) => setSigla(e.target.value)}
                  maxLength={10}
                />
              </FormGroup>
            </Col>
            {/*** NACIONALIDADE ***/}
            <Col sm={5} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Nacionalidade</Label>
                <Input
                  type="text"
                  value={nacionalidade}
                  placeholder=""
                  onChange={(e) => setNacionalidade(e.target.value)}
                  maxLength={60}
                />
              </FormGroup>
            </Col>
            {/*** SITUACAO ***/}
            <Col sm={4} md={3} lg={2} xl={2}>
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

export default connect()(PaisFiltro);
