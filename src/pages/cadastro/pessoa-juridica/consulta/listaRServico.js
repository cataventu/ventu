///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getPagina } from '../../../../functions/sistema';

function PessoaJuridicaListaRServicoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRservico, setExibeRservico] = useState([]);
  const [id, setId] = useState(0);
  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');

  ////// RSERVICO /////////////////////////////////////

  const tableColumns_Rservico = [
    {
      dataField: 'servico', text: 'Serviço', sort: true, classes: 'tb-rservico-servico', headerClasses: 'tb-col-4 bg-dark text-white tb-rservico-servico',
    },
    {
      dataField: 'pag_prazo', text: 'Prazo Pagto', sort: true, classes: 'tb-rservico-pag_prazo', headerClasses: 'tb-col-1 bg-dark text-white tb-rservico-pag_prazo',
    },
    {
      dataField: 'dpag_criterio', text: 'Critério Pagto', sort: true, classes: 'tb-rservico-dpag_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-dpag-criterio',
    },
    {
      dataField: 'rec_prazo', text: 'Prazo Receb.', sort: true, classes: 'tb-rservico-rec_prazo', headerClasses: 'tb-col-1 bg-dark text-white tb-rservico-rec_prazo',
    },
    {
      dataField: 'drec_criterio', text: 'Critério Receb.', sort: true, classes: 'tb-rservico-drec_criterio', headerClasses: 'tb-col-2 bg-dark text-white tb-rservico-drec_criterio',
    },
  ];
  const [rservico, setRservico] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
      getPagina(props, 'TsmRSERVICO/PAGINA', '@GET_RSERVICO_PAGINA', data, '');
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, razao_social, nome_fantasia } = props.consultaDadosComerciais;
    const { rservico_regs } = props.rservicoTableData;

    if (id > 0) {
      setId(id);

      //DADOS COMERCIAIS
      setRazao_social(razao_social);
      setNome_fantasia(nome_fantasia);
    }
    //RSERVICO

    const _tempRservico = [];
    rservico_regs.forEach((item) => {
      _tempRservico.push({
        servico: item.servico,
        pag_prazo: item.pag_prazo,
        dpag_criterio: item.dpag_criterio,
        rec_prazo: item.rec_prazo,
        drec_criterio: item.drec_criterio,
      });
    });

    setRservico(_tempRservico);

    /// EXIBE/OCULTA TABELA RSERVICO

    if (rservico_regs.length > 0) {
      setExibeRservico('show');
    } else {
      setExibeRservico('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Serviço" />

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Id:</span>
                <span className="text-muted">{ id }</span>
              </Col>
            </Row>

            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Razão Social:</span>
                <span className="text-muted">{ razao_social }</span>
              </Col>
            </Row>
            <Row className="pl-3 h5 pt-1 text-left">
              <Col sm={12}>
                <span className="pr-3 text-black">Nome Fantasia:</span>
                <span className="text-muted">{ nome_fantasia }</span>
              </Col>
            </Row>

            {/*TABELA RENDERECO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRservico}`}>
              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rservico}
                  table-striped
                  columns={tableColumns_Rservico}
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
  consultaDadosComerciais: state.pJuridica.consultaDadosComerciais,
  rservicoTableData: state.pJuridica.rservicoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaJuridicaListaRServicoConsulta);
