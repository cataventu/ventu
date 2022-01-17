///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { DossieTitulo, DossieLinha } from '../../components';
import './style.css';

const Malas = ({ dados }) => {
  ////// TABLE MALAS
  const [tableData, set_tableData] = useState([]);

  const colunas = [
    {
      dataField: 'tag',
      text: 'TAG',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-malas-tag',
    },
    {
      dataField: 'nome_completo',
      text: 'NOME COMPLETO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-malas-nome-completo',
    },
    {
      dataField: 'malas',
      text: 'MALAS',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-malas',
    },
  ];

  useEffect(() => {
    if (dados !== undefined) {
      const { malas_regs } = dados;
      set_tableData(malas_regs);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Controle de Malas - tag" />
      <DossieLinha position="left">
        <BootstrapTable
          keyField="id"
          data={tableData}
          rowClasses="dossie-consulta-table"
          columns={colunas}
          condensed
          bootstrap4
          striped
          bordered={false}
        />
      </DossieLinha>
    </>
  );
};

export default Malas;
