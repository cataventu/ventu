///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import 'moment/locale/pt-br';
import {
  Card, CardBody, Col, Container, FormGroup, Input, Label, Row, CardHeader, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons } from '../../../components';
import {
  toggleFiltro, formatData, formatDataInput, formatCPF, getPagina,
} from '../../../functions/sistema';
import { savePFisicaFiltro } from '../../../functions/cadastro/pessoa-fisica';

function PFisicaFiltro(props) {
  const [firstLoad, setFirst] = useState(true);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('');

  const [situacao, setSituacao] = useState('');
  const [alt_dhsis_maior, setAlt_dhsis_maior] = useState('');
  const [alt_dhsis_menor, setAlt_dhsis_menor] = useState('');

  const [form, setForm] = useState('');

  const resetFields = useCallback(() => {
    setNome('');
    setCpf('');
    setGenero('');

    setSituacao('');

    setAlt_dhsis_maior('');
    setAlt_dhsis_menor('');
  }, []);

  //// FIRST LOAD
  useEffect(() => {
    if (firstLoad && localStorage.getItem('TABELAS_PFISICA_FILTRO')) {
      //// RECEBE DADOS DO CACHE LOCAL STORAGE
      const cache = JSON.parse(localStorage.getItem('TABELAS_PFISICA_FILTRO'));
      const {
        nome, cpf, genero, situacao, alt_dhsis_maior, alt_dhsis_menor,
      } = cache;

      //// ATUALIZA CAMPOS DO FILTRO
      setNome(nome);
      setCpf(cpf);
      setGenero(genero);

      setSituacao(situacao);
      setAlt_dhsis_maior(formatDataInput(alt_dhsis_maior));
      setAlt_dhsis_menor(formatDataInput(alt_dhsis_menor));

      //// EXECUTA A PAGINA NOVA
      const url = '/TsmPFISICA/PAGINA/';
      const action = '@GET_PFISICA_PAGINA';
      const filtro = {
        nome,
        cpf,
        genero,
        situacao,
        alt_dhsis_maior,
        alt_dhsis_menor,
      };

      const actionFlag = '@SET_PFISICA_FILTRO_FLAG_FALSE';
      getPagina(props, url, action, filtro, actionFlag);

      setFirst(false);
    }
  }, [props, firstLoad]);

  //// FORM
  useEffect(() => {
    const form = {
      chave: '',
      nome,
      cpf,
      genero,

      situacao,
      alt_dhsis_maior: formatData(alt_dhsis_maior),
      alt_dhsis_menor: formatData(alt_dhsis_menor),
    };

    setForm(form);
  }, [nome, cpf, genero, situacao, alt_dhsis_maior, alt_dhsis_menor]);

  const ActionButtons = [
    <Buttons description="Filtrar" color="primary" onClick={() => savePFisicaFiltro(props, form)} title="Salva todas as configurações do filtro" />,
    <Buttons description="Limpar" color="filtro-interno" onClick={() => resetFields()} title="Limpa todas as configurações do filtro" />,
    <Buttons description="Fechar" color="filtro-interno" onClick={() => toggleFiltro(props, 'tabela-pfisica-filtro')} title="Limpa todas as configurações do filtro" />,
  ];

  ///////// RENDER FILTRO /////////
  /////////////////////////////////
  return (
    <Container id="tabela-pfisica-filtro" fluid className="p-0 filter oculta">
      <Card className="bg-dark text-white">
        <CardHeader className="pt-3 bg-dark text-white pb-0 m-0">
          <CardTitle tag="h4"><span className="text-primary">Selecionar informações</span></CardTitle>
        </CardHeader>
        <CardBody>
          {/*** LINHA 01 ***/}
          <Row form>
            {/*** NOME COMPLETO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Nome Completo</Label>
                <Input
                  type="text"
                  value={nome}
                  placeholder=""
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={30}
                />
              </FormGroup>
            </Col>
            {/*** CPF ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>CPF</Label>
                <Input
                  type="text"
                  value={cpf}
                  placeholder=""
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  maxLength={14}
                />
              </FormGroup>
            </Col>
            {/*** GENERO ***/}
            <Col sm={3} md={3} lg={2} xl={2}>
              <FormGroup>
                <Label>Gênero</Label>
                <Input
                  type="select"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="1">MASCULINO</option>
                  <option value="2">FEMININO</option>
                  <option value="3">OUTROS</option>
                </Input>
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
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PFisicaFiltro);
