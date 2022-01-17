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

function PessoaJuridicaListaREnderecoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRendereco, setExibeRendereco] = useState([]);
  const [id, setId] = useState(0);
  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');

  ///////// ENDERECO //////////////////////////

  const tableColumns_Rendereco = [
    {
      dataField: 'id', text: 'Id', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'identificacao', text: 'Identificação', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },
    {
      dataField: 'endereco', text: 'Endereco', sort: true, headerClasses: 'tb-col-5 sm-3 bg-dark text-white',
    },
    {
      dataField: 'cep', text: 'Cep', sort: true, headerClasses: 'tb-col-2 sm-3 bg-dark text-white',
    },

  ];

  const [rendereco, setRendereco] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      const data = { id_pjuridica: parseInt(id, 10), id_pfisica: 0 };
      getPagina(props, 'TsmRENDERECO/PAGINA', '@GET_RENDERECO_PAGINA', data, '');
    }

    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, razao_social, nome_fantasia } = props.consultaDadosComerciais;
    const { rendereco_regs } = props.renderecoTableData;

    if (id > 0) {
      setId(id);

      //DADOS COMERCIAIS
      setRazao_social(razao_social);
      setNome_fantasia(nome_fantasia);
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
  consultaDadosComerciais: state.pJuridica.consultaDadosComerciais,
  renderecoTableData: state.pJuridica.renderecoTableData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaJuridicaListaREnderecoConsulta);
