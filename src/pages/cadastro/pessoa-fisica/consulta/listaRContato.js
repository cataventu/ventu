///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
//import { formatData, formatSituacao, getDados } from "../../../../functions/sistema";
import { getRContatoPagina } from '../../../../functions/cadastro/pessoa-fisica/index';

function PessoaFisicaListaRContatoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [exibeRcontato, setExibeRcontato] = useState([]);

  const [id, setId] = useState(0);

  const [nome_completo, setNome_completo] = useState('');

  ////// RCONTATO /////////////////////////////////////

  const tableColumns_Rcontato = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
    {
      dataField: 'descricao', text: 'Descrição', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
  ];

  const [rcontato, setRcontato] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;

      getRContatoPagina(props, id);
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;

    const { rcontato_regs } = props.rcontatoTableData;

    if (id > 0) {
      setId(id);

      //DADOS PESSOAIS

      setNome_completo(nome_completo);
    }
    //RCONTATO
    const _tempRcontato = [];

    rcontato_regs.forEach((item) => {
      _tempRcontato.push({
        id: item.id,
        tipo: item.dtipo,
        endereco: item.endereco,
        descricao: item.descricao,
      });
    });

    setRcontato(_tempRcontato);

    /// EXIBE/OCULTA TABELA RCONTATO
    if (rcontato_regs.length > 0) {
      setExibeRcontato('show');
    } else {
      setExibeRcontato('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Contato" />

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </Col>
            </Row>

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Nome Completo:</span>
                <span className="text-muted">{ nome_completo }</span>
              </Col>
            </Row>

            {/*TABELA CONTATOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRcontato}`}>
              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rcontato}
                  table-striped
                  columns={tableColumns_Rcontato}
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
///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  pessoalFichaData: state.pFisica.pessoalFichaData,
  rcontatoTableData: state.pFisica.rcontatoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaRContatoConsulta);
