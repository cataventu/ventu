///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getRPassaportePagina } from '../../../../functions/cadastro/pessoa-fisica/index';

function PessoaFisicaListaPassaporteConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRpassaporte, setExibeRpassaporte] = useState([]);
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');

  ////// PASSAPORTE //////////////////////////////////////////

  const tableColumns_Rpassaporte = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'pais_emissao', text: 'País Emissão', sort: true, headerClasses: 'tb-col-4 sm-4 bg-dark text-white',
    },
    {
      dataField: 'dt_emissao', text: 'Dt Emissão', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dt_validade', text: 'Dt Validade', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'numero', text: 'Número', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];
  const [rpassaporte, setRpassaporte] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getRPassaportePagina(props, id);
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { rpassaporte_regs } = props.rpassaporteTableData;

    if (id > 0) {
      setId(id);

      //DADOS PESSOAIS
      setNome_completo(nome_completo);
    }
    //// RPASSAPORTE
    const _tempRpassaporte = [];

    rpassaporte_regs.forEach((item) => {
      _tempRpassaporte.push({
        id: item.id,
        pais_emissao: item.pais_emissao,
        dt_emissao: item.dt_emissao,
        dt_validade: item.dt_validade,
        numero: item.numero,
      });
    });

    setRpassaporte(_tempRpassaporte);

    /// EXIBE/OCULTA TABELA  PASSAPORTE
    if (rpassaporte_regs.length > 0) {
      setExibeRpassaporte('show');
    } else {
      setExibeRpassaporte('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Passaporte" />

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

            {/*TABELA RPASSAPORTE */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRpassaporte}`}>

              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rpassaporte}
                  table-striped
                  columns={tableColumns_Rpassaporte}
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
  rpassaporteTableData: state.pFisica.rpassaporteTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaPassaporteConsulta);
