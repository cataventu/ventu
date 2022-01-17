///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getDados } from '../../../../functions/sistema';

function PessoaFisicaListaPerfilConsulta(props) {
  const [firstLoad, setFirst] = useState(true);
  const [exibeRperfil, setExibeRperfil] = useState('hide');
  const [id, setId] = useState(0);
  const [nome_completo, setNome_completo] = useState('');

  const tableColumns_Rperfil = [
    {
      dataField: 'id_perfil', text: 'Id', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'dtipo', text: 'Tipo', sort: true, headerClasses: 'tb-col-2 sm-4 bg-dark text-white',
    },
    {
      dataField: 'perfil', text: 'Perfil', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },
    {
      dataField: 'observacao', text: 'Observação', sort: true, headerClasses: 'tb-col-4 sm-2 bg-dark text-white',
    },

  ];

  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getDados(props, `/TsmRPERFIL/FICHA/${id}`, '@SET_PFISICA_PERFIL_LISTA');
      setFirst(false);
    }
  }, [props, firstLoad]);

  useEffect(() => {
    const { id, nome_completo } = props.pessoalFichaData;
    const { rperfil_regs } = props.perfilListaData;

    if (rperfil_regs === undefined) { return; }

    if (id > 0) {
      setId(id);
      setNome_completo(nome_completo);
    }
    //PERFIL
    /// EXIBE/OCULTA TABELA PERFIL

    const _tempPerfil = [];
    rperfil_regs.forEach((item) => {
      if (item.check === true) {
        _tempPerfil.push({
          id_perfil: item.id_perfil,
          dtipo: item.dtipo,
          perfil: item.perfil,
          observacao: item.observacao,
        });
        setExibeRperfil('show');
      }
    });
    setPerfil(_tempPerfil);
  }, [props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Cadastro" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Cadastro / Perfil" />

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

            {/*TABELA PERFIL */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeRperfil}`}>
              <Col sm={12}>
                <br />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={perfil}
                  table-striped
                  columns={tableColumns_Rperfil}
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
  perfilListaData: state.pFisica.perfilListaData,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(PessoaFisicaListaPerfilConsulta);
