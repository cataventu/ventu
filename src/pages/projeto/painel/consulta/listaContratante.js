///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getProjetoFicha } from '../../../../functions/projeto';
import { formatPadrao } from '../../../../functions/sistema';
import { getContratantePagina } from '../../../../functions/projeto/contratante';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tabelaContratante, setTabelaContratante] = useState([]);
  const [contratante, setContratante] = useState([]);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 bg-dark text-white',
    },
    {
      dataField: 'nome_pessoa', text: 'Contratante', sort: true, headerClasses: 'tb-col-8 bg-dark text-white',
    },
    {
      dataField: 'padrao', text: 'Padrão', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },

  ];

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getContratantePagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { contratante_regs } = props.table_contratante;

    if (id > 0) {
      setId(id);
      setCodigo(codigo);
      setDescricao(descricao);
    }

    const _tempContratante = [];
    contratante_regs.forEach((item) => {
      _tempContratante.push({
        id: item.id,
        nome_pessoa: item.nome_pessoa,
        padrao: formatPadrao(item.padrao),

      });
    });

    setContratante(_tempContratante);

    if (contratante_regs.length > 0) {
      setTabelaContratante('show');
    } else {
      setTabelaContratante('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / Contratante" />

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </Col>
            </Row>

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Código:</span>
                <span className="text-muted">{ codigo }</span>
              </Col>
            </Row>
            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Projeto:</span>
                <span className="text-muted">{ descricao }</span>
              </Col>
            </Row>

            {/*PARTICIPANTES */}
            <Row className={`pl-3 h5 pt-1 text-left ${tabelaContratante}`}>
              <Col sm={12}>
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={contratante}
                  table-striped
                  columns={tableColumns}
                  bootstrap4
                  bordered={false}
                />
              </Col>
            </Row>

            <ConsultaFooter />
          </div>
        </Card>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  nomeProjeto: state.projeto.nomeProjeto,
  projetoFichaData: state.projeto.projetoFichaData,
  table_contratante: state.contratante.tableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

});
export default connect(() => (mapState))(ProjetoConsulta);
