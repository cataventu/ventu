///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {
  DossieTitulo, DossieLabel, DossieLinha, DossieSubTitulo,
} from '../../components';

const DadosProjeto = ({ dados }) => {
  const [id, set_id] = useState(0);
  const [codigo, set_codigo] = useState('');
  const [descricao, set_descricao] = useState('');
  const [fuso, set_fuso] = useState('');

  const [convidados, set_convidados] = useState(0);
  const [coordenadores, set_coordenadores] = useState(0);
  const [batedores, set_batedores] = useState(0);
  const [motoristas, set_motoristas] = useState(0);
  const [interpretes, set_interpretes] = useState(0);

  const [voo_regs, set_voo_regs] = useState([]);

  const columnsVoos = [
    {
      dataField: 'cia',
      text: 'CIA',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'flight',
      text: 'FLIGHT',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'date',
      text: 'DATE',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'from',
      text: 'FROM',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'to',
      text: 'TO',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'depart',
      text: 'DEPART.',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
    {
      dataField: 'arrival',
      text: 'ARRIVAL',
      sort: false,
      classes: 'text-center p-0 pt-2 pb-2',
      headerClasses: 'dossie-consulta-table-title text-center',
    },
  ];

  useEffect(() => {
    if (dados !== undefined) {
      const {
        descricao,
        fuso,
        codigo,
        id,
        num_batedores,
        num_convidados,
        num_coordenadores,
        num_interpretes,
        num_motoristas,

        voo_regs,
      } = dados;

      set_id(id);
      set_codigo(codigo);
      set_fuso(fuso);
      set_descricao(descricao);

      set_convidados(num_convidados);
      set_coordenadores(num_coordenadores);
      set_batedores(num_batedores);
      set_motoristas(num_motoristas);
      set_interpretes(num_interpretes);

      set_voo_regs(voo_regs);
    }
  }, [dados]);

  return (
    <>
      {/*** DADOS PROJETO ***/}
      <>
        <DossieTitulo titulo="Dados do Projeto" />
        <DossieLinha position="center">
          <DossieLabel titulo="Id" conteudo={id} />
          <DossieLabel titulo="Cód" conteudo={codigo} />
          <DossieLabel titulo="Descrição" conteudo={descricao} />
        </DossieLinha>

        <DossieLinha position="center">
          <DossieLabel titulo="Fuso horário" conteudo={fuso} />
        </DossieLinha>
      </>

      {/*** PARTICIPANTES ***/}
      <>
        <DossieTitulo titulo="Participantes" />
        <DossieLinha position="center">
          <DossieLabel titulo="Convidados" conteudo={convidados} />
          <DossieLabel titulo="Coordenadores" conteudo={coordenadores} />
        </DossieLinha>

        <DossieLinha position="center">
          <DossieLabel titulo="Batedores" conteudo={batedores} />
          <DossieLabel titulo="Motoristas" conteudo={motoristas} />
          <DossieLabel titulo="Interpretes" conteudo={interpretes} />
        </DossieLinha>
      </>

      {/*** VOOS ***/}
      <DossieTitulo titulo="Voos" />
      {
        !!voo_regs && voo_regs.map((tabela) => (
          <>
            <DossieLinha position="left">
              <DossieSubTitulo texto={tabela.descricao} />
              <BootstrapTable
                keyField="id"
                data={tabela.tableData}
                rowClasses="dossie-consulta-table"
                columns={columnsVoos}
                condensed
                bootstrap4
                striped
                bordered={false}
              />
            </DossieLinha>
          </>
        ))
      }
    </>
  );
};

export default DadosProjeto;
