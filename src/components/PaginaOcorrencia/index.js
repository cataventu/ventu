///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { TableButton, Modal } from '../index';
import {
  hideModal, showModal, limitChar, deleteRegistro,
} from '../../functions/sistema';
import {
  getOcorrenciaPagina, resetFichaOcorrencias, editOcorrencia, consultaOcorrencia,
} from '../../functions/sistema/ocorrencias';

function PaginaOcorrencia({ props, page }) {
  const [firstLoad, setFirst] = useState(true);
  const [hidePFisica, setHidePFisica] = useState('');
  const [hidePJuridica, setHidePJuridica] = useState('');
  const [hideProjeto, setHideProjeto] = useState('');
  const [tableData, setTableData] = useState([]);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-ocorrencias-id',
    },
    {
      dataField: 'data', text: 'Data', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-ocorrencias-data',
    },
    {
      dataField: 'pfisica', text: 'Participante', sort: true, classes: hidePFisica, headerClasses: `bg-dark text-white tb-ocorrencias-participante ${hidePFisica}`,
    },
    {
      dataField: 'pjuridica', text: 'Fornecedor', sort: true, classes: hidePJuridica, headerClasses: `bg-dark text-white tb-ocorrencias-fornecedor ${hidePJuridica}`,
    },
    {
      dataField: 'projeto', text: 'Projeto', sort: true, classes: hideProjeto, headerClasses: `bg-dark text-white tb-ocorrencias-projeto ${hideProjeto}`,
    },
    {
      dataField: 'status', text: 'Status', sort: true, classes: '', headerClasses: 'bg-dark text-white tb-ocorrencias-status',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: '', headerClasses: 'bg-dark text-white tb-ocorrencias-buttons',
    },
  ];

  const rowClasses = (row) => {
    let rowClass;
    row.hotsite ? rowClass = 'text-blue' : rowClass = 'text-green';
    if (row.status === 'PENDENTE') { rowClass = 'text-blue'; }
    if (row.status === 'SOLUCIONADA') { rowClass = 'text-dark'; }
    if (row.status === 'ARQUIVADA') { rowClass = 'text-danger'; }

    return rowClass;
  };
  const handleGetPagina = useCallback(() => {
    const Id = props.match.params.id;
    const filtro = localStorage.getItem('PROJETO_OCORRENCIAS_FILTRO');
    switch (page) {
      case 'PFISICA':
        getOcorrenciaPagina(props, { id_pfisica: Id });
        setHidePFisica('hide');
        break;
      case 'PJURIDICA':
        getOcorrenciaPagina(props, { id_pjuridica: Id });
        setHidePJuridica('hide');
        break;
      case 'PROJETO':
        getOcorrenciaPagina(props, { id_projeto: Id });
        setHideProjeto('hide');
        break;
      case 'OCORRENCIAS':
        getOcorrenciaPagina(props, filtro);
        break;
      default:
    }
  }, [props, page]);

  useEffect(() => {
    if (firstLoad) {
      handleGetPagina();
      resetFichaOcorrencias(props);
      setFirst(false);
    }
  }, [handleGetPagina, firstLoad, props]);

  const getPagina = useCallback(() => {
    async function getPagina(props) {
      handleGetPagina();
      const { dispatch } = props;
      dispatch({ type: '@SET_OCORRENCIA_FLAG_TRUE' });
      dispatch({ type: '@SET_OCORRENCIA_FILTRO_FLAG_FALSE' });
      dispatch({ type: '@SET_OCORRENCIA_DELETE_FALSE' });
    }
    getPagina(props);
  }, [props, handleGetPagina]);

  useEffect(() => {
    if (props.flagDelete || props.flagFiltro) {
      getPagina(props);
    }
  }, [props, handleGetPagina, getPagina]);

  useEffect(() => {
    const arrayOcorrencias = [];
    const { ocorrencia_regs } = props.tableData;

    //const id = props.match.params.id;

    if (ocorrencia_regs.length > 0 || props.flagTableUpdate === true) {
      ocorrencia_regs.forEach((item) => {
        const Buttons = [
          <TableButton action="Excluir" permission={props} click={() => showModal(props, item.id)} />,
          <TableButton action="Editar" permission={props} click={() => editOcorrencia(props, page, item.id)} />,
        ];

        if (page === 'OCORRENCIAS') {
          Buttons.push(<TableButton action="Consultar" permission={props} click={() => consultaOcorrencia(props, page, item.id)} />);
        }

        arrayOcorrencias.push({
          id: item.id,
          data: (item.data.substring(0, 10)),
          pfisica: item.pfisica,
          pjuridica: item.pjuridica,
          projeto: item.projeto,
          texto: limitChar(item.texto, 60),
          status: item.dstatus,
          buttons: Buttons,
        });
      });

      setTableData(arrayOcorrencias);

      const { dispatch } = props;
      dispatch({ type: '@SET_OCORRENCIA_FLAG_FALSE' });
    }
  }, [page, props, props.tableData]);

  return (
    <>
      <Modal
        open={props.modalVisibility}
        descricao="Confirma a exclusão do registro?"
        nao={() => hideModal(props)}
        sim={() => deleteRegistro(props, '/TsmOCORRENCIA/EXCLUI/', '@SET_OCORRENCIA_DELETE_TRUE')}
      />

      <BootstrapTable
        keyField="id"
        data={tableData}
        classes="table-striped table-movimento"
        columns={tableColumns}
        bootstrap4
        bordered={false}
        rowClasses={rowClasses}
        pagination={paginationFactory({
          sizePerPage: 25,
          sizePerPageList: [5, 10, 25, 50, 100],
        })}
      />
    </>
  );
}

export default PaginaOcorrencia;
