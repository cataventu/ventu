///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import { toggleFiltro, formatData, formatDataInput } from '../../../functions/sistema';
import { saveFixoFiltro } from '../../../functions/financeiro/fixo';

function FixoFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [transacao, setTransacao] = useState('');
  const [nome_pessoa, setNome_pessoa] = useState('');

  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setTransacao('');
    setNome_pessoa('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_FIXO_FILTRO')) {
      const filtro = JSON.parse(localStorage.getItem('TABELAS_FIXO_FILTRO'));
      const {
        transacao, nome_pessoa, alt_dhsis_maior, alt_dhsis_menor,
      } = filtro;

      setTransacao(transacao);
      setNome_pessoa(nome_pessoa);

      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));
    }
    setFirst(false);
  }, [firstLoad]);

  useEffect(() => {
    setForm({
      chave: '',
      transacao,
      nome_pessoa,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    });
  }, [transacao, nome_pessoa, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => saveFixoFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-fixo-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container id="tabela-fixo-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>

            {/*** TRANSACAO ***/}
            <Col sm={6} md={2} lg={2} xl={2}>
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

            {/*** NOME PESSOA ***/}
            <Col sm={6} md={3} lg={3} xl={3}>
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

export default connect()(FixoFiltro);
