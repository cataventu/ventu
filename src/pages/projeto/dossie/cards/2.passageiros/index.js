///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col } from 'reactstrap';
import { DossieTitulo } from '../../components';
import './style.css';

const Passageiros = ({ dados, subtitulo }) => {
  const colunas = [
    {
      dataField: 'tag',
      text: 'TAG',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passageiros-tag',
    },
    {
      dataField: 'nome_completo',
      text: 'NOME COMPLETO',
      sort: false,
      headerClasses: 'dossie-consulta-table-title dossie-tb-passageiros-nome-completo',
    },
  ];

  const [tabela_01, set_tabela_01] = useState([]);
  const [tabela_02, set_tabela_02] = useState([]);

  useEffect(() => {
    if (dados !== undefined) {
      const {
        passageiros_tag_regs,
        passageiros_alfa_regs,
      } = dados;

      const tamanho = passageiros_tag_regs.length;
      const divisor = parseInt((passageiros_tag_regs.length / 2), 10);

      const temp_01 = [];
      const temp_02 = [];

      let tabela;

      subtitulo === 'TAG'
        ? tabela = passageiros_tag_regs
        : tabela = passageiros_alfa_regs;

      for (let index = 0; index < tamanho; index += 1) {
        index < divisor
          ? temp_01.push(tabela[index])
          : temp_02.push(tabela[index]);
      }

      set_tabela_01(temp_01);
      set_tabela_02(temp_02);
    }
  }, [dados, subtitulo]);

  return (
    <>
      <DossieTitulo titulo={`Lista de passageiros - ${subtitulo}`} />
      <Row>
        <Col sm={6} className="col-6 pr-1">
          <BootstrapTable
            keyField="id"
            data={tabela_01}
            rowClasses="dossie-consulta-table"
            columns={colunas}
            condensed
            bootstrap4
            striped
            bordered={false}
          />
        </Col>
        <Col sm={6} className="col-6 pl-1">
          <BootstrapTable
            keyField="id"
            data={tabela_02}
            rowClasses="dossie-consulta-table"
            columns={colunas}
            condensed
            bootstrap4
            striped
            bordered={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Passageiros;
