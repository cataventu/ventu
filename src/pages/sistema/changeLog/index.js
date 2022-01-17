///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { PageTitle } from '../../../components';
import { handleSidebar } from '../../../functions/sistema/index';
import { log_1_0_0 } from './1.0.0';
import { log_1_1_0 } from './1.1.0';
import { log_1_2_0 } from './1.2.0';
import { log_1_3_0 } from './1.3.0';
import { log_1_4_0 } from './1.4.0';
import { log_1_5_0 } from './1.5.0';
import { log_1_6_0 } from './1.6.0';
import { log_1_6_1 } from './1.6.1';
import { log_1_6_2 } from './1.6.2';
import { log_1_7_0 } from './1.7.0';
import { log_1_8_0 } from './1.8.0';
import { log_1_9_0 } from './1.9.0';
import { log_1_9_1 } from './1.9.1';
import { log_1_9_2 } from './1.9.2';
import { log_1_9_3 } from './1.9.3';
import { log_1_9_4 } from './1.9.4';
import { log_1_9_5 } from './1.9.5';
import { log_1_9_6 } from './1.9.6';
import { log_1_9_7 } from './1.9.7';
import { log_1_9_8 } from './1.9.8';
import { log_1_9_9 } from './1.9.9';
import { log_2_0_0 } from './2.0.0';
import { log_2_0_1 } from './2.0.1';
import { log_2_0_2 } from './2.0.2';
import { log_2_0_3 } from './2.0.3';
import { log_2_0_4 } from './2.0.4';
import { log_2_0_5 } from './2.0.5';
import { log_2_0_6 } from './2.0.6';
import { log_2_0_7 } from './2.0.7';
import { log_2_0_8 } from './2.0.8';
import { log_2_0_9 } from './2.0.9';
import { log_2_1_0 } from './2.1.0';
import { log_2_1_1 } from './2.1.1';
import { log_2_1_2 } from './2.1.2';
import { log_2_1_3 } from './2.1.3';
import { log_2_1_4 } from './2.1.4';
import { log_2_1_5 } from './2.1.5';
import { log_2_1_6 } from './2.1.6';
import { log_2_1_7 } from './2.1.7';
import { log_2_2_2 } from './2.2.2';
import { log_2_2_3 } from './2.2.3';

///////// PFISICA ///////////////
/////////////////////////////////
class ChangeLog extends Component {
  componentDidMount() {
    handleSidebar(this.props.dispatch, this.props.sidebar);
  }

  render() {
    ///////// TABLE COLUMNS /////////
    /////////////////////////////////
    const tableColumns = [
      {
        dataField: 'data', text: 'Data', sort: true, classes: 'text-center', headerClasses: 'bg-dark text-white td-change-data text-center',
      },
      {
        dataField: 'versao', text: 'Versão', sort: true, classes: 'text-center', headerClasses: 'bg-dark text-white td-change-versao text-center',
      },
      {
        dataField: 'modulo', text: 'Módulo', sort: true, classes: 'text-right', headerClasses: 'bg-dark text-white td-change-modulo text-right',
      },
      {
        dataField: 'pagina', text: 'Página', sort: true, classes: 'text-right', headerClasses: 'bg-dark text-white td-change-pagina text-right',
      },
      {
        dataField: 'atividade', text: 'Atividade', sort: true, classes: 'text-left pl-4', headerClasses: 'bg-dark text-white td-change-atividade pl-4',
      },
    ];

    ///////// TABLE DATA ////////////
    /////////////////////////////////
    const tableData = [];
    log_2_2_3.forEach((item) => { tableData.push(item); });
    log_2_2_2.forEach((item) => { tableData.push(item); });
    log_2_1_7.forEach((item) => { tableData.push(item); });
    log_2_1_6.forEach((item) => { tableData.push(item); });
    log_2_1_5.forEach((item) => { tableData.push(item); });
    log_2_1_4.forEach((item) => { tableData.push(item); });
    log_2_1_3.forEach((item) => { tableData.push(item); });
    log_2_1_2.forEach((item) => { tableData.push(item); });
    log_2_1_1.forEach((item) => { tableData.push(item); });
    log_2_1_0.forEach((item) => { tableData.push(item); });
    log_2_0_9.forEach((item) => { tableData.push(item); });
    log_2_0_8.forEach((item) => { tableData.push(item); });
    log_2_0_7.forEach((item) => { tableData.push(item); });
    log_2_0_6.forEach((item) => { tableData.push(item); });
    log_2_0_5.forEach((item) => { tableData.push(item); });
    log_2_0_4.forEach((item) => { tableData.push(item); });
    log_2_0_3.forEach((item) => { tableData.push(item); });
    log_2_0_2.forEach((item) => { tableData.push(item); });
    log_2_0_1.forEach((item) => { tableData.push(item); });
    log_2_0_0.forEach((item) => { tableData.push(item); });
    log_1_9_9.forEach((item) => { tableData.push(item); });
    log_1_9_8.forEach((item) => { tableData.push(item); });
    log_1_9_7.forEach((item) => { tableData.push(item); });
    log_1_9_6.forEach((item) => { tableData.push(item); });
    log_1_9_5.forEach((item) => { tableData.push(item); });
    log_1_9_4.forEach((item) => { tableData.push(item); });
    log_1_9_3.forEach((item) => { tableData.push(item); });
    log_1_9_2.forEach((item) => { tableData.push(item); });
    log_1_9_1.forEach((item) => { tableData.push(item); });
    log_1_9_0.forEach((item) => { tableData.push(item); });
    log_1_8_0.forEach((item) => { tableData.push(item); });
    log_1_7_0.forEach((item) => { tableData.push(item); });
    log_1_6_2.forEach((item) => { tableData.push(item); });
    log_1_6_1.forEach((item) => { tableData.push(item); });
    log_1_6_0.forEach((item) => { tableData.push(item); });
    log_1_5_0.forEach((item) => { tableData.push(item); });
    log_1_4_0.forEach((item) => { tableData.push(item); });
    log_1_3_0.forEach((item) => { tableData.push(item); });
    log_1_2_0.forEach((item) => { tableData.push(item); });
    log_1_1_0.forEach((item) => { tableData.push(item); });
    log_1_0_0.forEach((item) => { tableData.push(item); });

    ///////// RENDER TABLE //////////
    /////////////////////////////////
    return (
      <>
        <Container fluid className="p-0">
          <PageTitle title="Change Log" voltar={false} />
          <Card>
            <CardBody className="pt-3">
              <BootstrapTable
                keyField="id"
                data={tableData}
                classes="table-striped table-sm"
                columns={tableColumns}
                bootstrap4
                bordered={false}
                pagination={paginationFactory({
                  sizePerPage: 50,
                  sizePerPageList: [25, 50, 100, 150],
                })}
              />
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  sidebar: state.sidebar,
  visibilityPageSistema: state.usuario.visibilityPageSistema,
});
export default connect(() => (mapState))(ChangeLog);
