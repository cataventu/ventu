///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Container, Row, CardBody, Card, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  showMSG, PageTitle, Buttons, TabsProjeto, CardHeaderName, TableButton, Modal,
} from '../../../../components';
import { renderIcon, calculaTamanho, downloadAnexo } from '../../../../functions/anexo';
import { handleSidebar, hideModal, showModal } from '../../../../functions/sistema';
// import {
//   consultaAnexo,
//  } from '../../../../functions/anexo';
import api from '../../../../services/api';

function TempoMovimentoAnexoPagina(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState(0);
  const [id_evento, setId_evento] = useState(0);

  const [nomeProjeto, setNomeProjeto] = useState([]);
  const [listaAnexos, setListaAnexos] = useState([]);
  const [tableData, setTableData] = useState([]);

  const ActionButtons = [
    <Buttons
      linkTo={`/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id_evento}/anexo/ficha/0`}
      description="Incluir"
      color="primary"
      title="Cadastrar novo registro."
      permission={props}
    />,
  ];

  const tableColumns = [
    {
      dataField: 'icone', text: 'Tipo', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, headerClasses: 'tb-col-6 sm-2 bg-dark text-white',
    },
    {
      dataField: 'tamanho', text: 'Tamanho', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'buttons', text: '', sort: false, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
  ];

  const handlePagina = useCallback((id) => {
    async function getPagina(id) {
      const url = '/TsmANEXO/PAGINA';
      const dados = { id_tempomov: id };
      const anexo = await api.post(url, dados, { auth: props.auth });
      const { nome, anexo_regs } = anexo.data;
      setNomeProjeto(nome);
      setListaAnexos(anexo_regs);
    }
    getPagina(id);
  }, [props]);

  const handleDelete = useCallback(() => {
    async function exclui() {
      const { idTempoMov } = props.match.params;
      const url = `/TsmANEXO/EXCLUI/${props.modalId}`;
      const response = await api.delete(url, { auth: props.auth });

      const { status, data } = response;

      status === 200 || status === 201
        ? showMSG('Anexo', 'Arquivo excluído com sucesso!', 'success', 2500)
        : showMSG('Error', data.msgerro, 'error', 2500);

      const { retorno } = data;
      if (parseInt(retorno, 10) === 1) {
        hideModal(props);
        handlePagina(idTempoMov);
      }
    }
    exclui();
  }, [props, handlePagina]);

  const handleEdit = useCallback((id) => {
    const { history } = props;
    const page = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id_evento}/anexo/ficha/${id}`;
    history.push(page);
  }, [props, id_projeto, id_evento]);

  const handleConsulta = useCallback((id) => {
    const { history } = props;
    const page = `/projeto/painel/${id_projeto}/tempos-movimentos/ficha/${id_evento}/anexo/consulta/${id}`;
    history.push(page);
  }, [props, id_projeto, id_evento]);

  useEffect(() => {
    if (firstLoad) {
      const { id, idTempoMov } = props.match.params;
      setId_projeto(id);
      setId_evento(idTempoMov);
      handleSidebar(props.dispatch, props.sidebar);
      handlePagina(idTempoMov);
      setFirst(false);
    }
  }, [props, firstLoad, handlePagina]);

  useEffect(() => {
    const temp = [];
    listaAnexos.forEach((anexo) => {
      const Buttons = [];

      const {
        id, extensao, data, titulo, tamanho,
      } = anexo;

      if (id !== 0 && id !== '') {

        const Deletar = <TableButton action="Excluir" click={() => showModal(props, id)} permission={props} />;
        const Editar = <TableButton action="Editar" click={() => handleEdit(id)} permission={props} />;
        let Ver = <TableButton action="Ver" click={() => handleConsulta(id)} permission={props} />;
        
           ////// DESABILITA BOTAO VER
           if (extensao === '.doc' || extensao === '.docx' || extensao === '.xlsx' || extensao === '.xls' || extensao === '.ppt' || extensao === '.pptx' || extensao === '.ppsx'  ){
            Ver = <TableButton action="Ver" permission={props} disable/>;
          }
 
         Buttons.push(
          Deletar,
          Editar,
          Ver,
        );
      //   Buttons.push(
      //     <TableButton action="Excluir" click={() => showModal(props, id)} permission={props} />,
      //     <TableButton action="Editar" click={() => handleEdit(id)} permission={props} />,
      //   );
      // }

      const icone = (
        <span onClick={() => downloadAnexo(props, id)}>
          {' '}
          { renderIcon(extensao, 'h3') }
        </span>
      );

      temp.push(
        {
          icone,
          data,
          documento: titulo,
          tamanho: calculaTamanho(tamanho),
          buttons: Buttons,
        },
      );
      }
    });
    setTableData(temp);
  }, [props, listaAnexos, handleEdit]);

  return (
    <>
      <Container fluid className="p-0">
        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Tempos & Movimentos / Anexo"
          buttons={ActionButtons}
          voltar
          linkTo={`/projeto/painel/${id_projeto}/tempos-movimentos`}
        />

        <Modal
          open={props.modalVisibility}
          descricao="Confirma a exclusão do registro?"
          nao={() => hideModal(props)}
          sim={() => handleDelete()}
        />

        <TabsProjeto ativo={6} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                <Row>
                  <Col className="pl-3 pr-3 pt-0 pb-3 m-0" sm={12}>

                    <CardHeaderName
                      {...props}
                      titulo={nomeProjeto}
                      label="Projeto:"
                      excel={false}
                    />

                    <BootstrapTable
                      keyField="id"
                      data={tableData}
                      classes="table-striped table-movimento"
                      columns={tableColumns}
                      bootstrap4
                      bordered={false}
                      pagination={paginationFactory({
                        sizePerPage: 25,
                        sizePerPageList: [5, 10, 25, 50, 100],
                      })}
                    />

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  user: state.usuario.fichaData,

  auth: state.sistema.auth,
  modalVisibility: state.sistema.modalVisibility,
  modalId: state.sistema.modalId,
});
export default connect(() => (mapState))(TempoMovimentoAnexoPagina);
