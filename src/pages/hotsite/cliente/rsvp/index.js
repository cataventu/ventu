///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import api from '../../../../services/api';
import { hotsiteFicha } from '../../../../functions/hotsite/projeto';

function Hotsite(props) {
  const { id_projeto } = props.match.params;
  const initial = { rsvp_regs: [] };

  const loading = [
    {
      id: 0,
      nome: '',
      id_pfisica: '',
      email: [
        <>
          <span className="spinner-border spinner-border-sm mr-2" />
                     CARREGANDO...
        </>],
      telefone: '',
      status: '',
      hotsite: '',
      className: '',
    },
  ];

  const tableColumns = [
    {
      dataField: 'id_pfisica', text: '', sort: true, headerClasses: 'hide', classes: 'hide',
    },
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'hide', classes: 'hide',
    },
    {
      dataField: 'nome', text: 'NOME', sort: true, headerClasses: 'tb-col-rsvp-nome bg-dark text-white',
    },
    {
      dataField: 'email', text: 'EMAIL', sort: true, headerClasses: 'tb-col-rsvp-email bg-dark text-white',
    },
    {
      dataField: 'telefone', text: 'TELEFONE', sort: true, headerClasses: 'tb-col-rsvp-telefone bg-dark text-white',
    },
    {
      dataField: 'status', text: 'STATUS', sort: true, headerClasses: 'tb-col-rsvp-status bg-dark text-white',
    },
    {
      dataField: 'hotsite', text: '', sort: false, headerClasses: 'hide', classes: 'hide',
    },
  ];

  const rowClasses = (row) => {
    let rowClass;
    row.hotsite ? rowClass = 'text-blue' : rowClass = 'text-green';
    if (row.status === 'PENDENTE') { rowClass = 'text-blue'; }
    if (row.status === 'CONFIRMADO') { rowClass = 'text-dark'; }
    if (row.status === 'CANCELADO') { rowClass = 'text-danger'; }
    if (row.status === 'INDECISO') { rowClass = 'text-green'; }
    if (row.status === 'SEM CONTATO') { rowClass = 'text-warning'; }
    if (row.status === 'SEM RESPOSTA') { rowClass = 'text-info'; }
    return rowClass;
  };

  const [firstLoad, setFirst] = useState(true);
  const [listaRSVP, setListaRSVP] = useState(initial);
  const [tableData, setTableData] = useState(loading);

  const getPagina = useCallback((id_projeto) => {
    async function getPagina(id_projeto) {
      await hotsiteFicha(props, 1);
      const url = '/TsmRSVP/PAGINA';
      const data = { id_projeto };
      const pagina = await api.post(url, data, { auth: props.auth });
      setListaRSVP(pagina.data);
    }
    getPagina(id_projeto);
  }, [props]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      getPagina(id_projeto);
      setFirst(false);
    }
  }, [props, firstLoad, id_projeto, getPagina]);

  ////// CARREGA PAGINA
  useEffect(() => {
    const arrayRSVP = [];
    const { rsvp_regs } = listaRSVP;

    if (rsvp_regs.length > 0) {
      rsvp_regs.forEach((item) => {
        const {
          id, id_pfisica, nome_completo, email, telefone, dstatus, hotsite,
        } = item;

        let Check;
        parseInt(id_pfisica, 10) > 0
          ? Check = <FontAwesomeIcon icon={faCheck} />
          : Check = '';

        arrayRSVP.push({
          id,
          nome: nome_completo.toUpperCase(),
          id_pfisica: Check,
          email: email.toLowerCase(),
          telefone,
          status: dstatus,
          hotsite,
          className: 'text-primary',
        });
      });
      setTimeout(() => setTableData(arrayRSVP), 1500);
    }
  }, [listaRSVP]);

  return (
    <>
      <Row className="body-hotsite">

        <Col sm={12} className="p-0">
          <BootstrapTable
            keyField="id"
            data={tableData}
            classes="table-striped table-movimento"
            columns={tableColumns}
            bootstrap4
            bordered={false}
            rowClasses={rowClasses}
            pagination={paginationFactory({
              sizePerPage: 50,
              sizePerPageList: [5, 10, 25, 50, 100, 150],
            })}
          />
        </Col>

      </Row>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(Hotsite);
