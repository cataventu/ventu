///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getREnderecoPagina } from '../../../../functions/cadastro/pessoa-fisica/index';

function PessoaFisicaListaREnderecoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRendereco, setExibeRendereco] = useState([]);
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');

  ////// RENDERECO /////////////////////////////////////

  const tableColumns_Rendereco = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'identificacao', text: 'Identificação', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereço', sort: true, headerClasses: 'tb-col-4 sm-3 bg-dark text-white',
    },
    {
      dataField: 'cep', text: 'Cep', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },
  ];
  const [rendereco, setRendereco] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getREnderecoPagina(props, id);
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { rendereco_regs } = props.renderecoTableData;

    if (id > 0) {
      setId(id);

      //DADOS PESSOAIS
      setNome_completo(nome_completo);
    }
    //RENDERECO
    const _tempRendereco = [];
    rendereco_regs.forEach((item) => {
      _tempRendereco.push({
        id: item.id,
        tipo: item.dtipo,
        endereco: item.endereco,
        cep: item.cep,
        identificacao: item.identificacao,
      });
    });

    setRendereco(_tempRendereco);

    /// EXIBE/OCULTA TABELA RENDERECO
    if (rendereco_regs.length > 0) {
      setExibeRendereco('show');
    } else {
      setExibeRendereco('hide');
    }
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Endereço" />

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

            {/*TABELA RENDERECO */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRendereco}`}>
              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={rendereco}
                  table-striped
                  columns={tableColumns_Rendereco}
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
  pessoalFichaData: state.pFisica.pessoalFichaData,
  renderecoTableData: state.pFisica.renderecoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaREnderecoConsulta);
