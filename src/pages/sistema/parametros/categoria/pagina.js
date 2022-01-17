///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../../../services/api';
import { PageTitle, MenuParametros } from '../../../../components';
import { handleSidebar, deleteRegistro } from '../../../../functions/sistema';
import { editCategoria } from '../../../../functions/sistema/parametros';

function CategoriaPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [categoriaLista, setcategoriaLista] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const ActionButtons = [
    <Link to="/sistema/parametros/categoria/ficha/0">
      <button type="button" className="ml-3 mt-0 float-right btn button-shadow btn-primary" title="Cadastrar novo registro.">
        <FontAwesomeIcon icon={faPlus} className="p-0 m-0 cursor mr-2 mt-1" />
                Incluir
      </button>
    </Link>,
  ];

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'p-0 pl-3 tb-grupo-id', headerClasses: 'bg-dark text-white tb-grupo-id',
    },
    {
      dataField: 'cor', text: 'Cor', sort: false, classes: 'p-0 tb-grupo-cor', headerClasses: 'bg-dark text-white tb-grupo-cor',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'p-0 pl-3 tb-grupo-descricao', headerClasses: 'bg-dark text-white tb-grupo-descricao',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'p-0 pr-3 tb-grupo-buttons', headerClasses: 'bg-dark text-white tb-grupo-buttons',
    },
  ];

  const getCategoriaPagina = useCallback((auth) => {
    async function getCategoriaPagina(auth) {
      const url = '/TsmPARAMETRO/RPARCAT_PAGINA';
      const pagina = await api.get(url, { auth });
      const { rparcat_regs } = pagina.data;
      setcategoriaLista(rparcat_regs);
    }
    getCategoriaPagina(auth);
  }, []);

  const deleteCategoria = useCallback((props, id) => {
    async function deleteCategoria(props, id) {
      const { auth } = props;
      await deleteRegistro(props, `/TsmPARAMETRO/RPARCAT_EXCLUI/${id}`, '');
      getCategoriaPagina(auth);
    }
    deleteCategoria(props, id);
  }, [getCategoriaPagina]);

  ///FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { dispatch, sidebar, auth } = props;
      handleSidebar(dispatch, sidebar);
      getCategoriaPagina(auth);
      setFirstLoad(false);
    }
  }, [props, firstLoad, getCategoriaPagina]);

  /// TABLE DATA
  useEffect(() => {
    const tableData = [];
    categoriaLista.forEach((item) => {
      const { id, cor, descricao } = item;

      const buttons = [];

      if (id !== 0 && id !== '') {
        buttons.push(

          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => deleteCategoria(props, id)}
            className="h4 p-0 m-0 ml-2 mr-2 cursor text-danger float-right"
          />,

          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => editCategoria(props, item.id)}
            className="h4 p-0 m-0 ml-2 mr-0 cursor text-blue float-right"
          />,

        );
      }

      tableData.push({
        id,
        cor: <div style={{ backgroundColor: cor, width: 70, height: 35 }} />,
        descricao,
        buttons,
      });
    });
    setTableData(tableData);
  }, [props, categoriaLista, deleteCategoria]);

  ///////// RENDER ////////////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">

      <PageTitle
        title="Parâmetros"
        subtitle="/ Categoria"
        voltar={false}
        buttons={ActionButtons}

      />

      <Row>
        {/*** menuParametros ***/}
        <Col sm={3} lg={2}>
          <MenuParametros {...props} item_4="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} lg={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              {/*** CARD HEADER ***/}
              <BootstrapTable
                keyField="id"
                data={tableData}
                classes="table-striped"
                columns={tableColumns}
                bootstrap4
                bordered={false}
                pagination={paginationFactory({
                  sizePerPage: 25,
                  sizePerPageList: [5, 10, 25, 50, 100],
                })}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,

  visibilityPageSistema: state.usuario.visibilityPageSistema,
});
export default connect(() => (mapState))(CategoriaPagina);
