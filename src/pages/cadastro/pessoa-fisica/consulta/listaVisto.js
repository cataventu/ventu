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
import { getRVistoPagina } from '../../../../functions/cadastro/pessoa-fisica/index';

function PessoaFisicaListaVistoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRvisto, setExibeRvisto] = useState([]);
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');

  ////// VISTO  //////////////////////////////////////////

  const tableColumns_Rvisto = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pais', text: 'País Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_emissao', text: 'Dt Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_validade', text: 'Dt Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rvisto, setRvisto] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getRVistoPagina(props, id);
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { rvisto_regs } = props.rvistoTableData;

    if (id > 0) {
      setId(id);

      //DADOS PESSOAIS
      setNome_completo(nome_completo);
    }
    //VISTO
    const _tempRvisto = [];

    rvisto_regs.forEach((item) => {
      _tempRvisto.push({
        id: item.id,
        pais: item.pais,
        dt_emissao: item.dt_emissao,
        dt_validade: item.dt_validade,
        tipo: item.tipo,
        numero: item.numero,

      });
    });

    setRvisto(_tempRvisto);

    /// EXIBE/OCULTA TABELA VISTO
    if (rvisto_regs.length > 0) {
      setExibeRvisto('show');
    } else {
      setExibeRvisto('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Visto" />

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

            {/*TABELA RVISTO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRvisto}`}>

              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rvisto}
                  table-striped
                  columns={tableColumns_Rvisto}
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
  rvistoTableData: state.pFisica.rvistoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaVistoConsulta);
