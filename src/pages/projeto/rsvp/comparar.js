///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, CardHeader, Row, Col, Container, FormGroup, Label, Input,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Buttons, PageTitle } from '../../../components';
import { getDados } from '../../../functions/sistema';
import { saveComparar, novoCadastroPFviaRSVP } from '../../../functions/projeto/rsvp';
//import { set } from "date-fns";

function RSVPcomparar(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [idProjeto, setIdProjeto] = useState('');
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');
  const [selectLine, setSelectLine] = useState(0); //ID RSVP Selecionado

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'bg-dark text-white',
    },
    {
      dataField: 'nome', text: 'Nome', sort: true, headerClasses: 'bg-dark text-white',
    },
    {
      dataField: 'email', text: 'Email', sort: true, headerClasses: 'bg-dark text-white',
    },
    {
      dataField: 'telefone', text: 'Telefone', sort: true, headerClasses: 'bg-dark text-white',
    },
    {
      dataField: 'status', text: 'Status', sort: true, headerClasses: 'bg-dark text-white',
    },
  ];

  const _tableData = [{
    id: '',
    nome: '',
    email: '',
    telefone: '',
    status: '',
  }];

  const [tableData, setTableData] = useState(_tableData);

  const selectRow = {
    mode: 'radio',
    onSelect: (row) => {
      setSelectLine(row.id);
    },
  };

  useEffect(() => {
    if (firstLoad) {
      const Id = props.match.params.idRSVP;
      const Id_Projeto = props.match.params.id;
      setIdProjeto(Id_Projeto);
      getDados(props, `/TsmRSVP/FICHA/${Id}`, '@GET_RSVP_FICHA');
      getDados(props, `/TsmRSVP/COMPARA_PAGINA/${Id}`, '@GET_RSVP_COMPARAR');
    }
    setFirstLoad(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const _temp = [];
    props.tableData.forEach((item) => {
      _temp.push(
        {
          id: item.id,
          nome: item.nome_completo,
          email: item.email,
          telefone: item.celular,
        },
      );
      setTableData(_temp);
    });
  }, [props, props.tableData]);

  useEffect(() => {
    const {
      id, nome_completo, email, telefone, dstatus,
    } = props.fichaData;
    setId(id);
    setNome(nome_completo);
    setEmail(email);
    setTelefone(telefone);
    setStatus(dstatus);
  }, [props, props.fichaData]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle history={props.history} title="Projeto" subtitle="/ RSVP / Comparar" voltar />
        <Card>
          {/****** header ***************/}
          {/*****************************/}
          <CardHeader className="pt-3 pb-0 pl-4 pr-4">
            <Row className="">
              {/*** ID ***/}
              <Col sm={2} md={2} lg={1} xl={1}>
                <FormGroup>
                  <Label>Id: </Label>
                  <Input type="text" value={id} disabled />
                </FormGroup>
              </Col>
              {/*** NOME ***/}
              <Col sm={5} md={5} lg={4} xl={4}>
                <FormGroup>
                  <Label>Nome: </Label>
                  <Input type="text" value={nome} disabled />
                </FormGroup>
              </Col>
              {/*** EMAIL ***/}
              <Col sm={5} md={5} lg={3} xl={3}>
                <FormGroup>
                  <Label>Email: </Label>
                  <Input type="text" value={email} disabled />
                </FormGroup>
              </Col>
              {/*** TELEFONE ***/}
              <Col sm={4} md={4} lg={2} xl={2}>
                <FormGroup>
                  <Label>Telefone: </Label>
                  <Input type="text" value={telefone} disabled />
                </FormGroup>
              </Col>
              {/*** STATUS ***/}
              <Col sm={3} md={3} lg={2} xl={2}>
                <FormGroup>
                  <Label>Status: </Label>
                  <Input type="text" value={status} disabled />
                </FormGroup>
              </Col>
            </Row>
            <hr />
          </CardHeader>

          <CardBody className="pt-0">
            <BootstrapTable
              keyField="id"
              id="rsvp-comparar-table"
              data={tableData}
              classes="table-striped table-movimento"
              columns={tableColumns}
              selectRow={selectRow}
              bootstrap4
              bordered={false}
              pagination={paginationFactory({
                sizePerPage: 10,
                sizePerPageList: [10, 25, 50, 100],
              })}
            />

            <Buttons
              description="Salvar"
              color="green"
              onClick={() => saveComparar(props, idProjeto, selectLine)}
              title="Salva associação com a Pessoa Física escolhida"
            />

            <Buttons
              description="Novo Cadastro"
              color="blue"
              onClick={() => novoCadastroPFviaRSVP(props)}
              title="Cadastro de um novo registro em Pessoa Física p/ associação do RSVP"
            />

          </CardBody>

        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  fichaData: state.rsvp.fichaData,
  tableData: state.rsvp.tableDataComparar,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(RSVPcomparar);
