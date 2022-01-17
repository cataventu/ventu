///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col, FormGroup, Input, Label, Row, Container,
} from 'reactstrap';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  SaveButton, PageTitle, MenuPFisica, Checkbox, AutoCompletarV2, CardHeaderName,
} from '../../../../components';
import { getDados, formatDataInput } from '../../../../functions/sistema';
import { savePFisicaFamilia, getPFisicaFamiliaFicha, getPFisicaFamiliaPagina } from '../../../../functions/cadastro/pessoa-fisica';

function FichaDependencia(props) {
  const [tableData, setTableData] = useState([]);
  const [cardFicha, setCardFicha] = useState('hide');
  const [cardTable, setCardTable] = useState('hide');
  const hoje = moment().format('L');
  const [alt_dhsis, setAlt_dhsis] = useState(formatDataInput(hoje));

  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [fam_id_pfisica, setFam_id_pfisica] = useState(0);
  const [fam_pfisica, setFam_pfisica] = useState('');
  const [fam_parentesco, setFam_parentesco] = useState(0);
  const [fam_par_outros, setFam_par_outros] = useState('');
  const [outrosHide, setOutrosHide] = useState('hide');

  const [dependente, setDependente] = useState(false);

  const [fam_endereco, setFam_endereco] = useState(false);
  const [fam_telefone, setFam_telefone] = useState(false);
  const [parentesco, setParentesco] = useState([]);
  const [form, setForm] = useState({});

  const tableColumns = [
    {
      dataField: 'titular', text: 'Titular', sort: true, headerClasses: 'tb-col-6 bg-dark text-white',
    },
    {
      dataField: 'parentesco', text: 'Parentesco', sort: true, headerClasses: 'tb-col-3 bg-dark text-white',
    },
    {
      dataField: 'outros', text: '', sort: false, headerClasses: 'tb-col-3 bg-dark text-white',
    },
  ];

  //PARENTESCO
  const handleParentesco = useCallback((value) => {
    if (value === 6 || value === '6') {
      setOutrosHide('show');
    } else {
      setOutrosHide('hide');
    }
  }, []);

  //DEPENDENTE
  const handleCard = useCallback((value) => {
    if (value === true) {
      setCardFicha('show');
      setCardTable('hide');
    } else {
      setCardTable('show');
      setCardFicha('hide');
    }
  }, []);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      getDados(props, '/TsmSISTEMA/PARENTESCO_TABELA/', '@GET_PARENTESCO');
      getPFisicaFamiliaFicha(props, id);
      getPFisicaFamiliaPagina(props, id);
      setFirst(false);
    }
  }, [props, firstLoad]);

  //EDITAR
  useEffect(() => {
    const {
      id, fam_id_pfisica, fam_pfisica, fam_telefone, fam_parentesco, fam_par_outros,
      fam_endereco, dependente, alt_dhsis,
    } = props.familiaFichaData;
    if (id > 0) {
      setId(id);
      setFam_id_pfisica(fam_id_pfisica);
      setFam_pfisica(fam_pfisica);

      setFam_parentesco(fam_parentesco);
      setFam_par_outros(fam_par_outros);
      setFam_endereco(fam_endereco);
      setFam_telefone(fam_telefone);
      setDependente(dependente);
      setAlt_dhsis(alt_dhsis);
    }
  }, [props.familiaFichaData]);

  useEffect(() => {
    const arrayTemp = [];
    props.familiaTableData.familia_regs.forEach((item) => {
      arrayTemp.push(
        {
          titular: item.fam_pfisica,
          parentesco: item.fam_dparentesco,
          outros: item.fam_par_outros,
        },
      );
    });
    setTableData(arrayTemp);
  }, [props, props.tableData]);

  useEffect(() => {
    handleParentesco(fam_parentesco);
  }, [fam_parentesco, handleParentesco]);

  useEffect(() => {
    handleCard(dependente);
  }, [dependente, handleCard]);

  //AC
  useEffect(() => {
    setFam_id_pfisica(props.autoCompletarId_Titular);
  }, [props.autoCompletarId_Titular]);

  //LISTA
  useEffect(() => {
    const arrayParentesco = [];
    props.parentesco.forEach((item) => {
      arrayParentesco.push(
        <option value={item.id}>
          {' '}
          { item.descricao }
        </option>,
      );
    });
    setParentesco(arrayParentesco);
  }, [props.parentesco]);

  useEffect(() => {
    setForm({
      id,
      fam_id_pfisica,
      fam_pfisica,
      fam_telefone,
      fam_parentesco,
      fam_par_outros,
      fam_endereco,
      dependente,
      inc_usuario: props.user.id,
      alt_usuario: props.user.id,
      alt_dhsis,
    });
  }, [id, fam_id_pfisica, fam_pfisica, fam_telefone, fam_parentesco, fam_par_outros, fam_endereco, dependente, alt_dhsis, props.user.id, props.autoCompletarTitular]);

  ///////// RENDER ////////////////
  /////////////////////////////////
  return (
    <Container fluid className="p-0">
      <PageTitle
        history={props.history}
        title="Pessoa Física"
        subtitle="/ Família"
        voltar
        linkTo="/cadastro/pessoa-fisica"
      />
      <Row>
        {/*** MENU ***/}
        <Col sm={3} md={3} lg={2} xl={2}>
          <MenuPFisica {...props} item_5="active" />
        </Col>
        {/*** BODY ***/}
        <Col sm={9} md={9} lg={10} xl={10} className="pl-1">
          <Card className="pb-5">
            {/*** FICHA DADOS DO TITULAR ***/}
            <CardBody className={cardFicha}>
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.familiaFichaData.nome} />
              <Row>
                {/*** PESSOA FISICA ***/}
                <Col sm={12} md={4} lg={4} xl={5}>
                  <FormGroup>
                    <Label>Titular</Label>
                    <AutoCompletarV2
                      {...props}
                      value={fam_pfisica}
                      valueId={fam_id_pfisica}
                      tabela="TITULAR"
                      campo="0"
                      disabled={false}
                      visible
                      editar={{ id, value: fam_pfisica, valueId: fam_id_pfisica }}
                    />
                  </FormGroup>
                </Col>
                {/*** PARENTESCO ***/}
                <Col sm={6} md={4} lg={3} xl={3}>
                  <FormGroup>
                    <Label>Parentesco</Label>
                    <Input
                      type="select"
                      value={fam_parentesco}
                      dados={props.parentesco}
                      config={props}
                      action="@GET_PARENTESCO"
                      onChange={(e) => setFam_parentesco(e.target.value)}
                    >
                      <option value="0" selected>Selecione...</option>
                      { parentesco }
                    </Input>
                  </FormGroup>
                </Col>
                {/*** OUTROS ***/}
                <Col sm={6} md={4} lg={4} xl={3} className={outrosHide}>
                  <FormGroup>
                    <Label>&nbsp;</Label>
                    <Input
                      type="text"
                      value={fam_par_outros}
                      maxLength={30}
                      onChange={(e) => setFam_par_outros(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                {/*** ENDERECO ***/}
                <Col sm={12}>
                  <FormGroup>
                    <Label>Endereco</Label>
                    <div className="pl-4">
                      <Checkbox
                        info="Usar endereço do titular"
                        checked={fam_endereco}
                        onClick={(e) => setFam_endereco(e.target.checked)}
                      />
                    </div>
                  </FormGroup>
                </Col>
                {/*** TELEFONE ***/}
                <Col sm={12}>
                  <FormGroup>
                    <Label>Telefone</Label>
                    <div className="pl-4">
                      <Checkbox
                        info="Usar telefone do titular"
                        checked={fam_telefone}
                        onClick={(e) => setFam_telefone(e.target.checked)}
                      />
                    </div>
                  </FormGroup>
                </Col>
                {/*** DHSIS ***/}
                <Col sm={12} className="hide">
                  <small>
                    <span className="pr-3 text-black">Atualização:</span>
                    <span className="text-muted">
                      {/*{ alt_dusuario } */}
                      {' '}
-
                      {' '}
                      { alt_dhsis }
                    </span>
                  </small>
                </Col>
                {/*** SAVE ***/}
                <SaveButton save={() => savePFisicaFamilia(props, form)} />
              </Row>
            </CardBody>
            {/*** TABELA DE DEPENDENTES ***/}
            <CardBody className={cardTable}>
              {/*** CARD HEADER ***/}
              <CardHeaderName {...props} titulo={props.familiaFichaData.nome} />
              <BootstrapTable
                keyField="id"
                data={tableData}
                classes="table-striped"
                columns={tableColumns}
                bootstrap4
                //rowEvents={ rowEvents }
                bordered={false}
                pagination={paginationFactory({
                  sizePerPage: 5,
                  sizePerPageList: [5, 10, 25, 50, 100],
                })}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  auth: state.sistema.auth,
  user: state.usuario.fichaData,

  parentesco: state.sistema.parentesco,

  familiaTableData: state.pFisica.familiaTableData,
  familiaFichaData: state.pFisica.familiaFichaData,

  autoCompletarId_Titular: state.autoCompletar.autoCompletarId_Titular,
  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(FichaDependencia);
