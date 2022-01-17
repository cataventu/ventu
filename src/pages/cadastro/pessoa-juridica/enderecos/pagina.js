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
  CardHeaderName, Modal, Buttons, MenuPJuridica, PageTitle,
} from '../../../../components';
import {
  showModal, hideModal, goToPage, getPagina,
} from '../../../../functions/sistema';
import { deletePJuridicaREndereco, resetFieldsPJuridicaREnderecoFichaData } from '../../../../functions/cadastro/pessoa-juridica';

function REnderecoPagina(props) {
  const [tableData, setTableData] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const tableColumns = [
    {
      dataField: 'endereco', text: 'Endereço', sort: true, classes: 'tb-endereco-endereco', headerClasses: 'tb-col-6 bg-dark text-white tb-endereco-endereco',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, classes: 'tb-endereco-tipo', headerClasses: 'tb-col-2 bg-dark text-white tb-endereco-tipo',
    },
    {
      dataField: 'cep', text: 'CEP', sort: true, classes: 'tb-endereco-cep', headerClasses: 'tb-col-2 bg-dark text-white tb-endereco-cep',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: 'tb-endereco-buttons', headerClasses: 'tb-col-2 bg-dark text-white tb-endereco-buttons',
    },
  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
      resetFieldsPJuridicaREnderecoFichaData(props, id);
      getPagina(props, 'TsmRENDERECO/PAGINA', '@GET_RENDERECO_PAGINA', data, '');
      setFirstLoad(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const tableData = [];

    props.renderecoTableData.rendereco_regs.forEach((item) => {
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
          cep: item.cep,
          identificacao: item.identificacao,
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
        sim={() => deletePJuridicaREndereco(props, props.modalId)}
      />
      <PageTitle
        title="Pessoa Jurídica"
        subtitle="/ Endereço"
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
          <MenuPJuridica {...props} item_2="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card>
            <CardBody className="pb-1">
              <CardHeaderName {...props} titulo={props.renderecoTableData.nome} />
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
  renderecoTableData: state.pJuridica.renderecoTableData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(REnderecoPagina);
