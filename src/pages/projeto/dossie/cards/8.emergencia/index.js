///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { DossieTitulo, DossieLinha } from '../../components';
import './style.css';

const Emergencia = ({ dados }) => {
  ////// TABLE EMERGENCIA
  const [tableData, set_tableData] = useState([]);

  const colunas = [
    {
      dataField: 'tag',
      text: 'TAG',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-emergencia-tag',
    },
    {
      dataField: 'nome_completo',
      text: 'NOME COMPLETO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-emergencia-nome-completo',
    },
    {
      dataField: 'nome',
      text: 'NOME',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-emergencia-nome',
    },
    {
      dataField: 'parentesco',
      text: 'PARENTESCO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-emergencia-parentesco',
    },
    {
      dataField: 'telefone',
      text: 'TELEFONE',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-emergencia-telefone',
    },
  ];

  useEffect(() => {
    if (dados !== undefined) {
      const { emergencia_regs } = dados;
      set_tableData(emergencia_regs);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Contatos de Emegência" />
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

export default Emergencia;
