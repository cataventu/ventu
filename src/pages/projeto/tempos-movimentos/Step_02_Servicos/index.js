///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup, InputGroupAddon, InputGroupText, CustomInput, Col, Input, Row,
} from 'reactstrap';

import { CheckboxTM } from '../../../../components';
import api from '../../../../services/api';

function RSVPcomparar(props) {
  const [firstLoad, setFirstLoad] = useState(true);

  const [servicosLista, setSevicosLista] = useState(true);
  const [listaTipoServico, setListaTipoServico] = useState([]);

  const [rtempomov_regs, setRtempomov_regs] = useState([]);

  const [filtroServicos, setFiltroServicos] = useState('0'); /// FILTRO SERVICOS
  const [marcados, setMarcados] = useState(false); /// FILTRO SERVICOS

  const filtraTipos = useCallback((tipo) => {
    const elements = document.getElementsByName('TM-checkbox');
    setFiltroServicos(tipo);
    if (tipo !== '0') {
      elements.forEach((item) => {
        const value = item.value.split('-');
        const { checked } = item;
        const tipoServico = value[1];
        const servicos = document.getElementById(`TM-group-${item.id}`);

        if (tipoServico !== tipo) {
          servicos.classList.add('hide');
        } else if (marcados && !checked) {
          servicos.classList.add('hide');
        } else {
          servicos.classList.remove('hide');
        }
      });
    } else {
      elements.forEach((item) => {
        const servicos = document.getElementById(`TM-group-${item.id}`);
        servicos.classList.remove('hide');
      });
    }
  }, [marcados]);

  const selecionaMarcados = useCallback((item) => {
    const elements = document.getElementsByName('TM-checkbox');
    const servico = item;
    switch (item.value) {
      ////// EXIBE SOMENTE SERVICOS SELECIONADOS
      case 'on':
        servico.value = 'off';
        setMarcados(true);
        elements.forEach((item) => {
          const marcado = document.getElementById(item.id).checked;
          const servicos = document.getElementById(`TM-group-${item.id}`);
          if (!marcado) {
            servicos.classList.add('hide');
          }
        });
        break;
      ////// EXIBE TODOS OS SERVICOS
      case 'off':
        servico.value = 'on';
        setMarcados(false);
        elements.forEach((item) => {
          const servicos = document.getElementById(`TM-group-${item.id}`);

          ////// CASO NÃO TENHA FILTRO, EXIBE TUDO
          if (filtroServicos === '0') {
            servicos.classList.remove('hide');
          } else {
            ///// CASO TENHA FILTRO, FAZ NOVA VALIDAÇÃO PELO TIPO
            const value = item.value.split('-');
            const tipoServico = value[1];

            tipoServico === filtroServicos
              ? servicos.classList.remove('hide')
              : servicos.classList.add('hide');
          }
        });
        break;
      default:
    }
    //filtraTipos(filtroServicos);
  }, [filtroServicos]);

  const handleSelectAll = useCallback((checked) => {
    const elements = document.getElementsByName('TM-checkbox');
    if (checked) {
      elements.forEach((item) => {
        if (!item.checked) { item.click(); }
      });
    } else {
      elements.forEach((item) => {
        if (item.checked) { item.click(); }
      });
    }
  }, []);

  const selecionaServico = useCallback(() => {
    const temp = [];
    const elements = document.getElementsByName('TM-checkbox');
    elements.forEach((item) => {
      if (item.checked) { temp.push({ id_proservico: parseInt(item.id, 10) }); }
    });
    setRtempomov_regs(temp);
  }, []);

  const renderListaServicos = useCallback((lista) => {
    const newLista = [];

    lista.forEach((item) => {
      const {
        id_proservico, check, dtipo_servico, servico, for_nome_pessoa, cnf_numero, valor_total, moeda,
      } = item;

      const dados = {
        id: id_proservico,
        check,
        tipo_servico: dtipo_servico,
        servico,
        fornecedor: for_nome_pessoa,
        confirmacao: cnf_numero,
        valor: valor_total,
        moeda,
      };

      newLista.push(<CheckboxTM
        dados={dados}
        onChange={() => selecionaServico({ id_proservico })}
      />);
    });

    setSevicosLista(newLista);
  }, [selecionaServico]);

  const getServicos = useCallback((id_projeto, id_evento) => {
    async function getServicos(id_projeto, id_evento) {
      const url = `/tsmTEMPOMOV/RTEMPOMOV_FICHA/${id_projeto}/${id_evento}`;
      const categorias = await api.get(url, { auth: props.auth });

      const { rtempomov_regs } = categorias.data;
      renderListaServicos(rtempomov_regs);

      const url2 = '/TsmSISTEMA/TIPO_SERVICO_TABELA';
      const tipoServico = await api.get(url2, { auth: props.auth });
      setListaTipoServico(tipoServico.data);
    }

    getServicos(id_projeto, id_evento);
  }, [props, renderListaServicos]);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad) {
      const id_projeto = parseInt(props.match.params.id, 10);
      const id_evento = parseInt(props.match.params.idTempoMov, 10);
      getServicos(id_projeto, id_evento);
      setFirstLoad(false);
    }
  }, [props, firstLoad, getServicos]);

  ////// FORM
  useEffect(() => {
    const id_projeto = parseInt(props.match.params.id, 10);
    const id_tempomov = parseInt(props.match.params.idTempoMov, 10);
    const Form = {
      id_tempomov,
      id_projeto,
      usuario: props.user.id,
      rtempomov_regs,
    };
    localStorage.setItem('TEMPOMOV-FICHA-SERVICOS', JSON.stringify(Form));
  }, [props, rtempomov_regs]);

  return (
    <>
      <Row>
        {/*** FILTRO ***/}
        <Col sm={12} className="pb-2">
          <span className="text-dark pt-3 pl-3 h3">Lista de Serviços</span>

          <Input
            className="float-right"
            onChange={(e) => filtraTipos(e.target.value)}
            type="select"
            bsSize="sm"
            style={{ width: 180 }}
          >
            <option value="0">Tipo de Serviço</option>

            { !!listaTipoServico && listaTipoServico.map((item) => (
              <option key={item.id} value={item.descricao}>{item.descricao}</option>
            ))}

          </Input>

          <Row className="perfil-switch float-right p-0 m-0">
            <Col className="perfil-switch-label">Exibir todos</Col>
            <CustomInput className="perfil-switch-button" onChange={(e) => selecionaMarcados(e.target)} type="switch" id="perfil-switch" name="customSwitch" label="" />
            <Col className="perfil-switch-label">Selecionados</Col>
          </Row>
        </Col>

        <Col sm={12} className="pl-3 pr-3 pt-1 pb-0">

          {/*** HEADER SERVICOS ***/}
          <Row className="pb-1">
            <Col sm={12}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="bg-dark">
                    <Input
                      addon
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  disabled
                  type="text"
                  value="Serviço"
                  className="p-0 m-0 pl-2 pr-2 input-tm-servico bg-dark text-light"
                />
                <Input
                  disabled
                  type="text"
                  value="Tipo serviço"
                  className="p-0 m-0 pl-2 pr-2 input-tm-tipo-servico bg-dark text-light"
                />
                <Input
                  disabled
                  type="text"
                  value="Fornecedor"
                  className="p-0 m-0 pl-2 pr-2 input-tm-fornecedor bg-dark text-light"
                />
                <Input
                  disabled
                  type="text"
                  value="Nº confirmação"
                  className="p-0 m-0 pl-2 pr-2 input-tm-confirmacao bg-dark text-light"
                />
                <Input
                  disabled
                  type="text"
                  value="Valor"
                  className="p-0 m-0 pl-2 pr-2 input-tm-valor bg-dark text-light"
                />
                <Input
                  disabled
                  type="text"
                  value="Moeda"
                  className="p-0 m-0 pl-2 pr-2 input-tm-moeda bg-dark text-light"
                />
              </InputGroup>
            </Col>
          </Row>

          {/*** LISTA SERVICOS ***/}
          { servicosLista }

        </Col>
      </Row>

    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,

  auth: state.sistema.auth,
  user: state.usuario.fichaData,
});
export default connect(() => (mapState))(RSVPcomparar);
