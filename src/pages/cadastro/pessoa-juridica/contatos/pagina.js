///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import {
  PageTitle, MenuPJuridica, Buttons, Modal, CardHeaderName,
} from '../../../../components';
import {
  showModal, hideModal, goToPage, getPagina,
} from '../../../../functions/sistema';
import { deletePJuridicaRContato, resetFieldsPJuridicaRContatoFichaData } from '../../../../functions/cadastro/pessoa-juridica';

function PaginaContato(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const tableColumns = [
    {
      dataField: 'tipo', text: 'Tipo', sort: true, classes: 'tb-contatos-tipo', headerClasses: 'tb-col-2 bg-dark text-white tb-contatos-tipo',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, classes: 'tb-contatos-endereco', headerClasses: 'tb-col-4 bg-dark text-white tb-contatos-endereco',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, classes: 'tb-contatos-descricao', headerClasses: 'tb-col-4 bg-dark text-white tb-contatos-descricao',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-contatos-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-contatos-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      resetFieldsPJuridicaRContatoFichaData(props, id);
      const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
      getPagina(props, 'TsmRCONTATO/PAGINA', '@GET_RCONTATO_PAGINA', data, '');
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];

    props.rcontatoTableData.rcontato_regs.forEach((item) => {
      const Buttons = [];

      if (item.id !== 0 && item.id !== '') {
        Buttons.push(
          <FontAwesomeIcon icon={icons.faTrashAlt} onClick={() => showModal(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-danger float-right" />,
          <FontAwesomeIcon icon={icons.faEdit} onClick={() => goToPage(props, item.id)} className="h4 p-0 m-0 ml-2 mr-2 cursor text-blue float-right" />,
        );
      }

      tableData.push(
        {
          tipo: item.dtipo,
          endereco: item.endereco,
          descricao: item.descricao,
          buttons: Buttons,
        },
      );
    });
    setTableData(tableData);
  }, [props, props.tableData]);

  ///////// RENDER ////////////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deletePJuridicaRContato(props, props.modalId)}
      />
      <PageTitle
        title="Pessoa Jurídica"
        subtitle="/ Contato"
        voltar
        history={props.history}
        linkTo="/cadastro/pessoa-juridica"
        buttons={(
          <Buttons
            linkTo={`${props.location.pathname}/ficha/0`}
            description="Cadastrar"
            icon="faPlus"
            color="primary"
            title="Cadastrar novo registro."
          />
        )}
      />
      <Row>
        {/*** MenuPJuridica ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPJuridica {...props} item_3="active" />
        </Col>

        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              <CardHeaderName {...props} titulo={props.rcontatoTableData.nome} />
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
  rcontatoTableData: state.pJuridica.rcontatoTableData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(PaginaContato);
