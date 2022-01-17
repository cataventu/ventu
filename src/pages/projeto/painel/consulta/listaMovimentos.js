///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getProjetoFicha } from '../../../../functions/projeto';
import { getFinanceiroPagina } from '../../../../functions/projeto/financeiro';
import { formatExibeValor } from '../../../../functions/sistema';

function ProjetoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tabelaFinanceiro, setTabelaFinanceiro] = useState([]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getProjetoFicha(props, id);
      getFinanceiroPagina(props, id);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, codigo, descricao } = props.projetoFichaData;
    const { tableData } = props;

    setId(id);
    setCodigo(codigo);
    setDescricao(descricao);

    //TABELA MOVIMENTO

    const array = [];

    if (tableData.length > 0) {
      tableData.forEach((item) => {
        const link_movimento = `/financeiro/movimento/consulta/${item.id}`;
        let link_pessoa;
        if (item.pessoa === 1) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (item.pessoa === 2) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        if (parseInt(item.id, 10) > 0) {
          array.push(
            <tr>
              <td><Link className="text-blue" to={link_movimento}>{ item.id }</Link></td>
              <td>{ item.documento }</td>
              <td><Link className="text-blue" to={link_pessoa}>{ item.nome_pessoa }</Link></td>
              <td>{ item.dt_vencimento }</td>
              <td className="text-right ">{ formatExibeValor(item.valor_pago) }</td>
            </tr>,
          );
        }
      });
    }
    setTableData(array);

    /// EXIBE/OCULTA TABELA FINANCEIRO
    if (id > 0) {
      setTabelaFinanceiro('show');
    } else {
      setTabelaFinanceiro('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Projeto / Movimentos" />

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

            <Row className={`pl-3 h5 pt-1 text-left ${tabelaFinanceiro}`}>
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th width={100} className="h5 bg-dark text-white">Movimento</th>
                      <th width="auto" className="h5 bg-dark text-white">Documento</th>
                      <th width="auto" className="h5 bg-dark text-white">Contato</th>
                      <th width={120} className="h5 bg-dark text-white">Data Vencimento</th>
                      <th width={120} className="h5 bg-dark text-white text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    { tableData }
                  </tbody>
                </Table>
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
  tableData: state.movimento.tableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

});
export default connect(() => (mapState))(ProjetoConsulta);
