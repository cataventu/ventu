///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Container, Row, CardBody, Card, Col, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  PageTitle, TableButton, CardHeaderName, TabsProjeto,
} from '../../../components';
import { getProjetoFicha, resetNomeProjeto } from '../../../functions/projeto';
import {
  getPagina, handleSidebar, getExcel, getDados,
} from '../../../functions/sistema';
import { editRoominglist } from '../../../functions/projeto/roominglist';

function Participantes(props) {
  const [firstLoad, setFirst] = useState(true);
  const [id_projeto, setId_projeto] = useState(0);
  //const [filtro, setFiltro] = useState({});

  const [listaFornecedor, setListaFornecedor] = useState([]);
  const [flagFornecedor, setFlagFornecedor] = useState(false);
  const [fornecedor, setFornecedor] = useState({});

  const [roomingList, setRoomingList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const tableColumns = [
    {
      dataField: 'id', text: 'Id', sort: true, classes: 'tb-rooming-id', headerClasses: 'bg-dark text-white tb-rooming-id',
    },
    {
      dataField: 'hos_apto', text: 'Apto', sort: true, classes: 'tb-rooming-hop_apto', headerClasses: 'bg-dark text-white tb-rooming-apto',
    },
    {
      dataField: 'rpax_regs', text: 'PAX', sort: true, classes: 'tb-rooming-rpax_regs', headerClasses: 'bg-dark text-white tb-rooming-pax',
    },
    {
      dataField: 'dt_inicio', text: 'Data início', sort: true, classes: 'tb-rooming-dt_inicio text-right', headerClasses: 'bg-dark text-white tb-rooming-inicio text-right',
    },
    {
      dataField: 'dt_termino', text: 'Término', sort: true, classes: 'tb-rooming-dt_termino text-right', headerClasses: 'bg-dark text-white tb-rooming-fim text-right',
    },
    {
      dataField: 'hos_wakeup', text: 'WakeUp', sort: true, classes: 'text-right', headerClasses: 'bg-dark text-white tb-rooming-wakeup text-right',
    },
    {
      dataField: 'hos_dtipo', text: 'Tipo', sort: true, classes: 'text-right', headerClasses: 'bg-dark text-white tb-rooming-tipo text-right',
    },
    {
      dataField: 'buttons', text: '', sort: false, classes: '', headerClasses: 'bg-dark text-white tb-rooming-buttons',
    },
  ];

  const handleFornecedor = useCallback((object) => {
    setFornecedor(object);
    setFlagFornecedor(true);
  }, []);

  const getFornecedor = useCallback((id) => {
    async function getFornecedor(id) {
      getProjetoFicha(props, id);
      const response = await getDados(props, `/TsmROOMINGLIST/FORNECEDOR/${id}`, '');
      setListaFornecedor(response);
    }
    getFornecedor(id);
  }, [props]);

  const getRooming = useCallback((filtro) => {
    async function getRooming(filtro) {
      //props, url, action, filtro, actionflag
      const url = '/TsmROOMINGLIST/PAGINA';

      const response = await getPagina(props, url, '', filtro, '');

      const _table = [];
      response.forEach((item) => {
        const {
          id, hos_apto, rpax_regs, dt_inicio, dt_termino, hos_wakeup, hos_dtipo,
        } = item;

        const _PAX = [];

        rpax_regs.forEach((PAX) => {
          _PAX.push([<p className="p-0 m-0">{PAX.nome_completo}</p>]);
        });

        const _linha = {
          id,
          hos_apto,
          rpax_regs: _PAX,
          dt_inicio,
          dt_termino,
          hos_wakeup,
          hos_dtipo,
        };

        _table.push(_linha);
      });

      setRoomingList(_table);
    }
    getRooming(filtro);
  }, [props]);

  /// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);

      handleSidebar(props.dispatch, props.sidebar);
      localStorage.removeItem('PROSERVICO_FORM_STEP_01');
      localStorage.removeItem('PROSERVICO_FORM_STEP_02');
      localStorage.removeItem('PROSERVICO_FORM_STEP_03');

      resetNomeProjeto(props);

      getFornecedor(id);

      setFirst(false);
    }
  }, [props, firstLoad, getFornecedor]);

  /// TABLE DATA
  useEffect(() => {
    const _temp = [];

    roomingList.forEach((item) => {
      const {
        id, hos_dtipo, hos_apto, hos_wakeup, dt_inicio, dt_termino, rpax_regs,
      } = item;

      let _id;
      let _PAX = rpax_regs;
      let _tipo = hos_dtipo;
      const Buttons = [];

      /// exibe msg de "não há registros";
      if (id === 0) {
        _PAX = hos_dtipo;
        _tipo = '';
      }

      if (id > 0) {
        _id = id;
        Buttons.push([<TableButton
          action="Editar"
          permission={props}
          click={() => editRoominglist(props, id_projeto, item.id)}
        />,
        ]);
      }

      _temp.push({
        id: _id,
        hos_dtipo: _tipo,
        hos_apto,
        hos_wakeup,
        dt_inicio,
        dt_termino,
        rpax_regs: _PAX,
        buttons: Buttons,
      });
    });

    setTableData(_temp);
  }, [props, roomingList, id_projeto]);

  /// FORNECEDOR
  useEffect(() => {
    if (fornecedor.length === 1) {
      const _vazio = { rpax_regs: 'Nenhum registro encontrado.' };
      setRoomingList([_vazio]);
    }

    if (!!fornecedor && fornecedor.length > 1 && flagFornecedor) {
      const { pessoa, id_pfisica, id_pjuridica } = JSON.parse(fornecedor);

      const filtro = {
        id_projeto,
        for_pessoa: pessoa,
        for_id_pfisica: id_pfisica,
        for_id_pjuridica: id_pjuridica,
      };

      getRooming(filtro);
      setFlagFornecedor(false);
    }
  }, [props, id_projeto, fornecedor, flagFornecedor, getRooming]);

  return (
    <>
      <Container fluid className="p-0">

        <PageTitle
          history={props.history}
          title="Projeto"
          subtitle="/ Rooming List"
          voltar
          linkTo="/projeto/painel"
        />

        <TabsProjeto ativo={8} props={props} />

        <Row>
          <Col sm={12}>
            <Card>
              <CardBody className="pb-0">
                {/*** HEADER ***/}
                <Row>
                  <Col className="p-0 m-0 pl-3 pr-3" sm={12}>
                    <CardHeaderName
                      {...props}
                      titulo={props.nomeProjeto}
                      label="Projeto:"
                      excel
                      onClickExcel={() => getExcel(props, '/TsmROOMINGLIST/EXCEL', { id_projeto })}
                    />
                  </Col>
                </Row>

                {/*** FORNECEDOR ***/}
                <Row>
                  <Col className="p-0 m-0 pl-3 pr-3" sm={6} md={5} lg={4} xl={3}>
                    <FormGroup>
                      <Label>Fornecedor</Label>
                      <Input
                        type="select"

                        //value={ fornecedor }
                        onChange={(e) => handleFornecedor(e.target.value)}
                      >
                        <option value="0">Selecione...</option>

                        { !!listaFornecedor && listaFornecedor.map((item) => (
                          <option
                            key={item.id}
                            value={JSON.stringify({
                              pessoa: item.pessoa,
                              id_pfisica: item.id_pfisica,
                              id_pjuridica: item.id_pjuridica,
                            })}
                          >
                            {item.nome_pessoa}
                          </option>
                        ))}

                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="p-0 m-0 pl-3 pr-3" sm={6} md={5} lg={4} xl={3} />
                </Row>

                {/*** TABLE DATA ***/}
                <Row>
                  <Col className="m-0 pt-0 pl-3 pr-3 pb-2" sm={12}>

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

  nomeProjeto: state.projeto.nomeProjeto,

  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(Participantes);
