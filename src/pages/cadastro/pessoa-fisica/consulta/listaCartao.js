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
import { getRCartaoPagina } from '../../../../functions/cadastro/pessoa-fisica/index';

function PessoaFisicaListaCartaoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRcartao, setExibeRcartao] = useState([]);
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');

  ////// CARTAO //////////////////////////////////////////

  const tableColumns_Rcartao = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo_cartao', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-4 bg-dark text-white',
    },
    {
      dataField: 'cartao', text: 'Cartão', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },
    {
      dataField: 'titular', text: 'Titular', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'validade', text: 'Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rcartao, setRcartao] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getRCartaoPagina(props, id);
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { rcartao_regs } = props.rcartaoTableData;

    if (id > 0) {
      setId(id);

      //DADOS PESSOAIS
      setNome_completo(nome_completo);
    }
    //CARTAO
    const _tempRcartao = [];

    rcartao_regs.forEach((item) => {
      _tempRcartao.push({
        id: item.id,
        tipo_cartao: item.tipo_cartao,
        cartao: item.cartao,
        titular: item.titular,
        numero: item.numero,
        validade: item.validade,
      });
    });

    setRcartao(_tempRcartao);

    /// EXIBE/OCULTA TABELA CARTOES
    if (rcartao_regs.length > 0) {
      setExibeRcartao('show');
    } else {
      setExibeRcartao('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Cartão" />

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

            {/*TABELA CARTAO */}
            <Row className={`pl-3 h6 pt-1 text-left ${exibeRcartao}`}>

              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rcartao}
                  table-striped
                  columns={tableColumns_Rcartao}
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
  rcartaoTableData: state.pFisica.rcartaoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaCartaoConsulta);
