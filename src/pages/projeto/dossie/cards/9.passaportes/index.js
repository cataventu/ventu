///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { DossieTitulo, DossieLinha } from '../../components';
import './style.css';

const Passaportes = ({ dados }) => {
  ////// TABLE PASSAPORTES
  const [tableData, set_tableData] = useState([]);

  const colunas = [
    {
      dataField: 'tag',
      text: 'TAG',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-tag',
    },
    {
      dataField: 'nome_completo',
      text: 'NOME COMPLETO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-nome-completo',
    },
    {
      dataField: 'passaporte',
      text: 'PASSAPORTE',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-passaporte',
    },
    {
      dataField: 'pais',
      text: 'PAÍS',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-pais',
    },
    {
      dataField: 'dt_emissao',
      text: 'DATA EMISSÃO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-dt-emissao',
    },
    {
      dataField: 'dt_validade',
      text: 'DATA VALIDADE',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passaporte-dt-validade',
    },
  ];

  useEffect(() => {
    if (dados !== undefined) {
      const { passaporte_regs } = dados;
      set_tableData(passaporte_regs);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Passaportes" />
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

export default Passaportes;
