///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { PageTitle, ConsultaHeader, ConsultaFooter } from '../../../components';
import {
  formatData, formatExibeValor, formatExibeIndice, getDados, formatExibePercentual, formatCompleteZeros, formatHoraDHSIS,
} from '../../../functions/sistema';
import { getProjetoFicha } from '../../../functions/projeto';
import { getFinanceiroPagina } from '../../../functions/projeto/financeiro';
import {
  getAnexoPagina, renderIcon, calculaTamanho, downloadAnexo,
} from '../../../functions/anexo';
import './consulta.css';

function ServicoConsulta(props) {
  const [firstLoad, setFirst] = useState(true);

  const [id, setId] = useState(0);
  const [id_projeto, setId_projeto] = useState(0);
  const [projeto, setProjeto] = useState('');
  const [status, setStatus] = useState(0);
  const [dstatus, setDstatus] = useState('');
  const [dstatusP, setDstatusP] = useState('');
  //const [operacao, setOperacao] = useState(0);
  const [doperacao, setDoperacao] = useState('');
  const [id_servico, setId_servico] = useState(0);
  //const [tipo_servico, setTipo_Servico] = useState(0);
  const [servico, setServico] = useState('');
  //const [con_empresa, setCon_empresa] = useState(0);
  //const [con_id, setCon_id] = useState(0);
  //const [for_pessoa, setFor_pessoa] = useState(0);
  //const [for_dpessoa, setFor_dpessoa] = useState('');
  //const [for_id_pfisica, setFor_id_pfisica] = useState(0);
  //const [for_id_pjuridica, setFor_id_pjuridica] = useState(0);
  const [for_nome_pessoa, setFor_nome_pessoa] = useState('');
  //const [for_nome_pessoa2, setFor_nome_pessoa2] = useState('');
  //const [for_gera_pagto, setFor_gera_pagto] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [especificacao, setEspecificacao] = useState('');
  //const [hos_tipo, setHos_tipo] = useState(0);
  //const [hos_dtipo, setHos_dtipo] = useState('');
  //const [hos_apto, setHos_apto] = useState('');
  const [cnf_data, setCnf_data] = useState('');
  const [cnf_numero, setCnf_numero] = useState('');
  const [cnf_contato, setCnf_contato] = useState('');
  //const [rep_pessoa, setRep_pessoa] = useState(0);
  //const [rep_dpessoa, setRep_dpessoa] = useState('');
  //const [rep_id_pfisica, setRep_id_pfisica] = useState(0);
  //const [rep_id_pjuridica, setRep_id_pjuridica] = useState(0);
  const [rep_nome_pessoa, setRep_nome_pessoa] = useState('');
  //const [rep_nome_pessoa2, setRep_nome_pessoa2] = useState('');
  //const [cobranca, setCobranca] = useState(0);
  const [dcobranca, setDcobranca] = useState('');
  const [id_moeda, setId_moeda] = useState(0);
  const [moeda, setMoeda] = useState('');
  const [cambio, setCambio] = useState(0);
  //const [em_moeda, setEm_moeda] = useState(false);
  //const [dt_inicio, setDt_inicio] = useState('');
  //const [dt_termino, setDt_termino] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  //const [regime, setRegime] = useState(0);
  //const [dregime, setDregime] = useState('');
  //const [seguro, setSeguro] = useState(0);
  //const [dseguro, setDseguro] = useState('');
  //const [taxa_seguro, setTaxa_seguro] = useState(0);
  const [valor, setValor] = useState(0);
  //const [taxa_embarque, setTaxa_embarque] = useState(0);
  //const [taxa_aeroportuaria, setTaxa_aeroportuaria] = useState(0);
  const [tax_percentual, setTax_percentual] = useState(0);
  const [tax_valor, setTax_valor] = useState(0);
  const [tre_percentual, setTre_percentual] = useState(0);
  const [tre_valor, setTre_valor] = useState(0);
  const [tre_indice, setTre_indice] = useState(0);
  const [com_percentual, setCom_percentual] = useState(0);
  const [com_valor, setCom_valor] = useState(0);
  const [com_indice, setCom_indice] = useState(0);
  const [inc_percentual, setInc_percentual] = useState(0);
  const [inc_valor, setInc_valor] = useState(0);
  const [inc_base, setInc_base] = useState(0);
  const [extra, setExtra] = useState(0);
  const [imp_percentual, setImp_percentual] = useState(0);
  const [imp_valor, setImp_valor] = useState(0);
  const [ren_percentual, setRen_percentual] = useState(0);
  const [rentabilidade, setRentabilidade] = useState(0);
  const [valor_total, setValor_total] = useState(0);
  const [valor_totalsimp, setValor_totalsimp] = useState(0);

  const [valorCambio, setValorCambio] = useState(0);
  const [tax_valorCambio, setTax_valorCambio] = useState(0);
  const [rentabilidadeCambio, setRentabilidadeCambio] = useState(0);
  const [valor_totalCambio, setValor_totalCambio] = useState(0);

  //const [cedente, setCedente] = useState(0);
  //const [dcedente, setDcedente] = useState('');
  const [capa_bilhete, setCapa_bilhete] = useState('');
  const [observacao, setObservacao] = useState('');

  const [inc_dusuario, setInc_dusuario] = useState('');
  const [inc_dhsis, setInc_dhsis] = useState('');
  const [alt_dusuario, setAlt_dusuario] = useState('');
  const [alt_dhsis, setAlt_dhsis] = useState('');

  const [link_fornecedor, setLink_fornecedor] = useState('');
  const [link_representante, setLink_representante] = useState('');

  const [tableData, setTableData] = useState([]);
  const [pax, setPax] = useState([]);
  const [bilhete, setBilhete] = useState([]);
  const [itinerario, setItinerario] = useState([]);
  const [condpag, setCondpag] = useState([]);
  const [condrec, setCondrec] = useState([]);

  const [tabelaPax, setTabelaPax] = useState('hide');
  const [tabelaBilhete, setTabelaBilhete] = useState('hide');
  const [tabelaItinerario, setTabelaItinerario] = useState('hide');

  const [tituloCondicoes, setTituloCondicoes] = useState('hide');
  const [tabelaCondpag, setTabelaCondpag] = useState('hide');
  const [tabelaCondrec, setTabelaCondrec] = useState('hide');

  const [tabelaMovimento, setTabelaMovimento] = useState('hide');
  const [exibeAnexos, setExibeAnexos] = useState('hide');

  const [visibilityCambio, setVisibilityCambio] = useState('hide');

  ////// ANEXO //////////////////////////////////////////

  const tableColumns_anexos = [
    {
      dataField: 'icone', text: 'Tipo', sort: true, headerClasses: 'tb-col-1 sm-2 bg-dark text-white',
    },
    {
      dataField: 'data', text: 'Data', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
    {
      dataField: 'documento', text: 'Documento', sort: true, headerClasses: 'tb-col-6  sm-2 bg-dark text-white',
    },
    {
      dataField: 'tamanho', text: 'Tamanho', sort: true, headerClasses: 'tb-col-2 sm-2 bg-dark text-white',
    },
  ];

  const [listaAnexos, setListaAnexos] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      const { id } = props.match.params;
      setId_projeto(id);
      getProjetoFicha(id);
      const { idServico } = props.match.params;
      getDados(props, `TsmPROSERVICO/FICHA/${idServico}`, '@SET_PROSERVICO_FICHA');
      getFinanceiroPagina(props, id, idServico);
      getAnexoPagina(props, 0, 0, 0, idServico, 0);
    }
    setFirst(false);
  }, [props, firstLoad]);

  useEffect(() => {
    const {
      id,
      id_projeto,
      projeto,
      status,
      dstatus,
      dstatusP,
      //operacao,
      doperacao,
      id_servico,
      //tipo_servico,
      servico,
      //con_empresa,
      //con_id, for_pessoa,
      //for_dpessoa,
      for_id_pfisica,
      for_id_pjuridica,
      for_nome_pessoa,
      //for_nome_pessoa2,
      //for_gera_pagto,
      descricao,
      especificacao,
      //hos_tipo,
      //hos_dtipo,
      //hos_apto,
      cnf_data,
      cnf_numero,
      cnf_contato,
      //rep_pessoa,
      //rep_dpessoa,
      rep_id_pfisica,
      rep_id_pjuridica,
      rep_nome_pessoa,
      //rep_nome_pessoa2,
      //cobranca,
      dcobranca,
      id_moeda,
      moeda,
      cambio,
      //em_moeda,
      //dt_inicio,
      //dt_termino,
      quantidade,
      //regime,
      //dregime,
      //seguro,
      //dseguro,
      //taxa_seguro,
      valor,
      //taxa_embarque,
      //taxa_aeroportuaria,
      tax_percentual,
      tax_valor,
      tre_percentual,
      tre_valor,
      tre_indice,
      com_percentual,
      com_valor,
      com_indice,
      inc_percentual,
      inc_valor,
      inc_base,
      //extra,
      imp_percentual,
      imp_valor,

      rentabilidade,
      valor_total,
      valor_totalsimp,
      //cedente,
      //dcedente,
      capa_bilhete,
      observacao,
      //inc_usuario,
      inc_dusuario,
      inc_dhsis,
      //alt_usuario,
      alt_dusuario,
      alt_dhsis,
    } = props.fichaData;

    //const { dstatusP, codigo } = props.projetoFicha;

    const { tableData } = props;

    const { rbilhete_regs } = props.fichaData;
    const { rconpagto_regs } = props.fichaData;
    const { rconrecto_regs } = props.fichaData;
    const { ritinerario_regs } = props.fichaData;
    const { rpax_regs } = props.fichaData;

    const { anexo_regs } = props.anexoTableData;

    if (for_id_pfisica > 0) { setLink_fornecedor(`/cadastro/pessoa-fisica/consulta/${for_id_pfisica}`); }
    if (for_id_pjuridica > 0) { setLink_fornecedor(`/cadastro/pessoa-juridica/consulta/${for_id_pjuridica}`); }

    if (rep_id_pfisica > 0) { setLink_representante(`/cadastro/pessoa-fisica/consulta/${rep_id_pfisica}`); }
    if (rep_id_pjuridica > 0) { setLink_representante(`/cadastro/pessoa-juridica/consulta/${rep_id_pjuridica}`); }

    //TABELA BILHETE
    const tempBilhete = [];
    if (rbilhete_regs.length > 0) {
      rbilhete_regs.forEach((item) => {
        if (parseInt(item.id, 10) > 0) {
          tempBilhete.push(
            <tr>
              <td className="tb-col-bilhete-cia">{ item.id }</td>
              <td className="tb-col-bilhete-dt_emissao">{ item.dt_emissao }</td>
              <td className="tb-col-bilhete-numero">{ item.numero }</td>
              <td className="tb-col-bilhete-tour_code">{ item.tour_code }</td>
              <td className="tb-col-bilhete-cia">{ item.cia }</td>
              <td className="tb-col-bilhete-rota">{ item.rota }</td>
            </tr>,
          );
        }
      });
    }
    setBilhete(tempBilhete);

    //TABELA PAX
    const tempPax = [];
    if (rpax_regs.length > 0) {
      rpax_regs.forEach((item) => {
        if (parseInt(item.id, 10) > 0) {
          let link_pessoa;
          if (item.id_pfisica > 0) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
          if (item.id_pjuridica > 0) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

          tempPax.push(
            <tr>
              <td className="tb-col-pax-id">{ item.id }</td>
              <td className="tb-col-pax-nome_completo"><Link className="text-blue" to={link_pessoa}>{item.nome_completo }</Link></td>
              <td className="tb-col-pax-nome_reserva">{ item.nome_reserva }</td>
              <td className="tb-col-pax-dtipo">{ item.dtipo }</td>
            </tr>,
          );
        }
      });
    }
    setPax(tempPax);

    //TABELA ITINERARIO
    const tempItinerario = [];
    if (ritinerario_regs.length > 0) {
      ritinerario_regs.forEach((item) => {
        if (parseInt(item.id, 10) > 0) {
          tempItinerario.push(
            <tr>
              <td className="tb-col-itinerario-cia">{ item.cia }</td>
              <td className="tb-col-itinerario-voo">{ item.voo }</td>
              <td className="tb-col-itinerario-dtemb">{ item.dtemb }</td>
              <td className="tb-col-itinerario-origem">{ item.origem }</td>
              <td className="tb-col-itinerario-destino">{ item.destino }</td>
              <td className="tb-col-itinerario-tipo">{ item.tipo }</td>
              <td className="tb-col-itinerario-classe">{ item.classe }</td>
              <td className="tb-col-itinerario-farebasis">{ item.farebasis }</td>
              <td className="tb-col-itinerario-hremb">{ item.hremb }</td>
              <td className="tb-col-itinerario-hrdes">{ item.hrdes }</td>
              <td className="tb-col-itinerario-localizador">{ item.localizador }</td>
            </tr>,
          );
        }
      });
    }
    setItinerario(tempItinerario);

    //TABELA PAGAMENTO
    const tempCondpag = [];
    if (rconpagto_regs.length > 0) {
      rconpagto_regs.forEach((item) => {
        let link_pessoa;
        if (item.id_pfisica > 0) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (item.id_pjuridica > 0) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        if (parseInt(item.id, 10) > 0) {
          tempCondpag.push(
            <tr>
              <td><Link className="tb-col-condpag-pagador text-blue" to={link_pessoa}>{ item.nome_pessoa }</Link></td>
              <td className="tb-col-condpag-parcela">{ item.parcela }</td>
              <td className="tb-col-condpag-data">{ item.data }</td>
              <td className="tb-col-condpag-rateio">{ item.rateio }</td>
              <td className="tb-col-condpag-valor">{ formatExibeValor(item.valor) }</td>
              <td className="tb-col-condpag-cambio">{ item.cambio }</td>
              <td className="tb-col-condpag-dforma">{ item.dforma }</td>
              <td className="tb-col-condpag-fatura">{ item.ddocumento }</td>
            </tr>,
          );
        }
      });
    }
    setCondpag(tempCondpag);

    //TABELA RECEBIMENTO
    const tempCondrec = [];
    if (rconrecto_regs.length > 0) {
      rconrecto_regs.forEach((item) => {
        let link_pessoa;
        if (item.id_pfisica > 0) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (item.id_pjuridica > 0) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        if (parseInt(item.id, 10) > 0) {
          tempCondrec.push(
            <tr>
              <td><Link className="tb-col-condrec-pagador text-blue" to={link_pessoa}>{ item.nome_pessoa }</Link></td>
              <td className="tb-col-condrec-parcela">{ item.parcela }</td>
              <td className="tb-col-condrec-data">{ item.data }</td>
              <td className="tb-col-condrec-rateio">{ item.rateio }</td>
              <td className="tb-col-condrec-valor">{ formatExibeValor(item.valor) }</td>
              <td className="tb-col-condrec-cambio">{ item.cambio }</td>
              <td className="tb-col-condrec-dforma">{ item.dforma }</td>
              <td className="tb-col-condrec-fatura">{ item.ddocumento }</td>
            </tr>,
          );
        }
      });
    }
    setCondrec(tempCondrec);

    //TABELA MOVIMENTO
    const array = [];

    if (tableData.length > 0) {
      tableData.forEach((item) => {
        const link_movimento = `/financeiro/movimento/consulta/${item.id}`;
        let link_pessoa;
        if (item.pessoa === 1) { link_pessoa = `/cadastro/pessoa-fisica/consulta/${item.id_pfisica}`; }
        if (item.pessoa === 2) { link_pessoa = `/cadastro/pessoa-juridica/consulta/${item.id_pjuridica}`; }

        if (parseInt(item.id, 10) > 0) {
          setTabelaMovimento('show');
          array.push(
            <tr>
              <td className="tb-col-movimento-id"><Link className="text-blue" to={link_movimento}>{ item.id }</Link></td>
              <td className="tb-col-movimento-documento">{ item.documento }</td>
              <td className="tb-col-movimento-nome_pessoa"><Link className="text-blue" to={link_pessoa}>{ item.nome_pessoa }</Link></td>
              <td className="tb-col-movimento-descricao">{ item.descricao }</td>
              <td className="tb-col-movimento-dt_vencimento">{ item.dt_vencimento }</td>
              <td className="tb-col-movimento-valor">{ formatExibeValor(item.valor_pago) }</td>
            </tr>,
          );
        }
      });
    }
    setTableData(array);

    //ANEXO
    const _tempAnexo = [];
    if (anexo_regs.length > 0) {
      anexo_regs.forEach((item) => {
        const _icone = (
          <span onClick={() => downloadAnexo(props, item.id)}>
            {' '}
            { renderIcon(item.extensao, 'h3') }
          </span>
        );
        const _link = (
          <Link to={`/projeto/painel/${id_projeto}/servicos/ficha/${id_servico}/anexo/consulta/${item.id}`}>
             {item.titulo}
             </Link>
       );
        //if (item.id_proservico === id_servico) {
        _tempAnexo.push({
          icone: _icone,
          data: item.data,
          documento: _link,
          tamanho: calculaTamanho(item.tamanho),
        });
        //}
      });

      setListaAnexos(_tempAnexo);
    }

    //EXIBE/OCULTA TABELA ANEXOS
    if (anexo_regs.length > 0) {
      setExibeAnexos('show');
    } else {
      setExibeAnexos('hide');
    }

    //EXIBE/OCULTA TABELA ANEXOS
    if (id_moeda !== 1) {
      setVisibilityCambio('show');
    } else {
      setVisibilityCambio('hide');
    }

    /// EXIBE/OCULTA TABELAS
    //if (id > 0) {
    if (rpax_regs.length > 0) {
      setTabelaPax('show');
    } else {
      setTabelaPax('hide');
    }

    if (rbilhete_regs.length > 0) {
      setTabelaBilhete('show');
    } else {
      setTabelaBilhete('hide');
    }
    if (ritinerario_regs.length > 0) {
      setTabelaItinerario('show');
    } else {
      setTabelaItinerario('hide');
    }

    if (rconrecto_regs.length > 0) {
      setTabelaCondrec('show');
    } else {
      setTabelaCondrec('hide');
    }

    if (rconpagto_regs.length > 0) {
      setTabelaCondpag('show');
    } else {
      setTabelaCondpag('hide');
    }

    if (rconrecto_regs.length > 0 || rconpagto_regs.length > 0) {
      setTituloCondicoes('show');
    } else {
      setTituloCondicoes('hide');
    }

    setId(id);
    setServico(servico);
    //setOperacao(operacao);
    setDoperacao(doperacao);
    setInc_dusuario(inc_dusuario);
    setInc_dhsis(inc_dhsis);
    setAlt_dusuario(alt_dusuario);
    setAlt_dhsis(alt_dhsis);

    setId_projeto(id_projeto);
    setProjeto(projeto);
    setStatus(status);
    setDstatus(dstatus);
    setId_servico(id_servico);
    //setTipo_Servico(tipo_servico);

    //setCon_empresa(con_empresa);
    //setCon_id(con_id);
    //setFor_pessoa(for_pessoa);
    //setFor_dpessoa(for_dpessoa);
    //setFor_id_pfisica(for_id_pfisica);
    //setFor_id_pjuridica(for_id_pjuridica);
    setFor_nome_pessoa(for_nome_pessoa);
    //setFor_nome_pessoa2(for_nome_pessoa2);

    //setFor_gera_pagto(for_gera_pagto);
    setDescricao(descricao);
    setEspecificacao(especificacao);
    //setHos_tipo(hos_tipo);
    //setHos_dtipo(hos_dtipo);
    //setHos_apto(hos_apto);

    setCnf_contato(cnf_contato);
    setCnf_data(cnf_data);
    setCnf_numero(cnf_numero);

    //setRep_pessoa(rep_pessoa);
    //setRep_dpessoa(rep_dpessoa);
    //setRep_id_pfisica(rep_id_pfisica);
    //setRep_id_pjuridica(rep_id_pjuridica);
    setRep_nome_pessoa(rep_nome_pessoa);
    //setRep_nome_pessoa2(rep_nome_pessoa2);

    //setCobranca(cobranca);
    setDcobranca(dcobranca);
    setId_moeda(id_moeda);
    setMoeda(moeda);
    setCambio(cambio);
    //setEm_moeda(em_moeda);

    //setDt_inicio(dt_inicio);
    //setDt_termino(dt_termino);

    setQuantidade(quantidade);
    //setRegime(regime);
    //setDregime(dregime);
    //setSeguro(seguro);
    //setDseguro(dseguro);

    //setTaxa_seguro(taxa_seguro);
    setValor(valor);
    //setTaxa_embarque(taxa_embarque);
    //setTaxa_aeroportuaria(taxa_aeroportuaria);
    setTax_percentual(tax_percentual);
    setTax_valor(tax_valor);

    setTre_percentual(tre_percentual);
    setTre_valor(tre_valor);
    setTre_indice(tre_indice);

    setCom_percentual(com_percentual);
    setCom_valor(com_valor);
    setCom_indice(com_indice);

    setInc_percentual(inc_percentual);
    setInc_valor(inc_valor);
    setInc_base(inc_base);
    //setExtra(extra);
    setImp_percentual(imp_percentual);
    setImp_valor(imp_valor);

    /// CALCULA RENTABILIDADE PERCENTUAL - VARIAVEL LOCAL
    if (valor > 0) {
      const _ren_percentual = rentabilidade / (quantidade * valor) * 100;
      setRen_percentual(formatCompleteZeros(_ren_percentual, 3));
    } else {
      const _ren_percentual = '0,000';
      setRen_percentual(formatCompleteZeros(_ren_percentual, 3));
    }

    setRentabilidade(rentabilidade);
    setValor_total(valor_total);
    setValor_totalsimp(valor_totalsimp);

    if (id_moeda !== 1) {
      let _valor = parseFloat(valor);
      let _tax_valor = parseFloat(tax_valor);
      let _rentabilidade = parseFloat(rentabilidade);
      let _valor_total = parseFloat(valor_total);
      let _cambio = parseFloat(cambio);

      if (Number.isNaN(_tax_valor)) { _tax_valor = 0; }
      if (Number.isNaN(_rentabilidade)) { _rentabilidade = 0; }
      if (Number.isNaN(_valor)) { _valor = 0; }
      if (Number.isNaN(_valor_total)) { _valor_total = 0; }
      if (Number.isNaN(_cambio)) { _cambio = 1.0000; }

      const valor_Cambio = _cambio * _valor;
      const tax_valorCambio = _cambio * _tax_valor;
      const rentabilidadeCambio = _cambio * _rentabilidade;
      const valor_totalCambio = _cambio * _valor_total;

      setValorCambio(formatCompleteZeros(valor_Cambio, 2));
      setTax_valorCambio(formatCompleteZeros(tax_valorCambio, 2));
      setRentabilidadeCambio(formatCompleteZeros(rentabilidadeCambio, 2));
      setValor_totalCambio(formatCompleteZeros(valor_totalCambio, 2));
    }

    //setCedente(cedente);
    //setDcedente(dcedente);
    setCapa_bilhete(capa_bilhete);

    setObservacao(observacao);

    setDstatusP(dstatusP);
  }, [id_projeto, props]);

  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle history={props.history} title="Projeto" voltar />
        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Serviço" />
            {/*CABECALHO */}
            {/*COLUNA DIREITA CABECALHO */}
            <Row className="p-0 m-0">

              <Col sm={12}>
                {/*ID */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ id }</span>
                    </small>
                  </Col>
                </Row>

                {/*INCLUSAO */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Inclusão:</span>
                      <span className="text-muted">
                        { inc_dusuario }
                        {' '}
-
                        {' '}
                        {formatData(inc_dhsis) }
                        {/*{' '}
                        { (inc_dhsis) } */}

                      </span>
                    </small>
                  </Col>
                </Row>

                {/*ATUALIZAÇÃO */}
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Atualização:</span>
                      <span className="text-muted">
                        { alt_dusuario }
                        {' '}
-
                        {' '}
                        {formatData(alt_dhsis) }
                        {' '}
                        { formatHoraDHSIS(alt_dhsis) }
                      </span>
                    </small>
                  </Col>
                </Row>
              </Col>

            </Row>
            <Row className="p-0 m-0">

              {/*COLUNA ESQUERDA CABECALHO */}
              <Col sm={7}>
                {/*VENDA */}
                <Row className="pl-0 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Id Projeto:</span>
                    <span className="text-muted"><Link className="text-blue" to={`/projeto/painel/consulta/${id_projeto}`}>{ id_projeto }</Link></span>
                  </Col>
                </Row>
                {/*DESCRICAO */}
                <Row className="pl-0 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Projeto:</span>
                    <span className="text-muted"><Link className="text-blue" to={`/projeto/painel/consulta/${id_projeto}`}>{ projeto }</Link></span>
                  </Col>
                </Row>
                {/*OPERACAO */}
                <Row className="pl-0 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Operação:</span>
                    <span className="text-muted">{ doperacao }</span>
                  </Col>
                </Row>
                {/*SERVICO */}
                <Row className="pl-0 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Serviço:</span>
                    <span className="text-muted">{ servico }</span>
                  </Col>
                </Row>
                {/*STATUS DO SERVICO */}
                <Row className="pl-0 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Status:</span>
                    <span className="text-muted">{ dstatus }</span>
                  </Col>
                </Row>

              </Col>
            </Row>
            <Row className="p-2 m-0">
              <Col sm={12} />
            </Row>

            {/*TARIFA TITULO */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>TARIFA</b>
                  <hr />
                </div>
              </Col>
            </Row>
            {/*TABELA CABECALHO TARIFA */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Representante:</th>
                      <th aria-label="cell" width={800} className="h5  bg-white border-white text-left text-muted"><Link className="text-blue" to={link_representante}>{ rep_nome_pessoa }</Link></th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />

                    </tr>
                    <tr>
                      <td aria-label="cell" width={100} className="h5 text-left bg-white border-white">Preço:</td>
                      <td aria-label="cell" className="h5  bg-white border-white text-left text-muted">{formatExibeValor(valor_total)}</td>
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" width={250} className="h5 text-left bg-white border-white">Moeda:</td>
                      <td aria-label="cell" width={400} className="h5  bg-white border-white text-left text-muted">{moeda}</td>
                    </tr>
                    <tr>
                      <td aria-label="cell" width={100} className="h5 text-left bg-white border-white">Qtd:</td>
                      <td aria-label="cell" className="h5  bg-white border-white text-left text-muted">{quantidade}</td>
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" className="h5 text-left bg-white border-white" />
                      <td aria-label="cell" width={250} className="h5 text-left bg-white border-white">Tipo Cobrança:</td>
                      <td aria-label="cell" width={400} className="h5  bg-white border-white text-left text-muted">{dcobranca}</td>
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>
            {/*TABELA TARIFA */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    {/*LINHA 01 */}
                    <tr>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">VALOR</th>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">TAXA %</th>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">TX REP %</th>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">COMISSÃO %</th>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">INCENTIVO %</th>
                      {/*RENTABILIDADE campo nao tem mais sera calculado na hora */}
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-dark text-white">RENTABILIDADE %</th>
                      <th aria-label="cell" headerClasses="tb-col-tarifa" className="tb-col-tarifa text-right bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(tax_percentual)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(tre_percentual)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(com_percentual)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(inc_percentual)}</td>
                      {/*RENTABILIDADE campo nao tem mais sera calculado na hora */}
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(ren_percentual)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                    </tr>
                    {/*LINHA 02 */}
                    <tr>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">TAXA</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">TX REP</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">COMISSÃO</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">INCENTIVO</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">RENTABILIDADE</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white text-right">TOTAL</th>
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(tax_valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(tre_valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(com_valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(inc_valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(rentabilidade)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right text-right">{formatExibeValor(valor_total)}</td>
                    </tr>
                    {/*LINHA 03 */}
                    <tr>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">INDICE</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">INDICE</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">BASE %</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeIndice(tre_indice)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeIndice(com_indice)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(inc_base)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                    </tr>
                    {/*LINHA 04 */}
                    <tr>
                      <th aria-label="cell" className="tb-col-tarifa tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">IMPOSTO %</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">IMPOSTO</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">TOTAL S/ IMP</th>
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibePercentual(imp_percentual)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(imp_valor)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(valor_totalsimp)}</td>
                    </tr>
                    {/*LINHA VAZIO */}
                    <tr>
                      {/*<th width={'auto'} className="tb-col-tarifa text-right bg-white text-white border-white"></th> */}
                    </tr>
                    <tr>
                      {/*<th width={'auto'} className="tb-col-tarifa text-right bg-white text-white border-white"></th>  */}
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>
            <Row className={`p-0 m-0  ${visibilityCambio}`}>
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    {/*LINHA 05 */}

                    <tr>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">CÂMBIO</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(cambio)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                    </tr>

                    {/*LINHA 06 */}
                    {/*valores quie serao calculados na hora baseado no cambio*/}
                    <tr>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">VALOR</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">TAXA(VLR)</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-white text-white border-white" />
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">RENTABILIDADE</th>
                      <th aria-label="cell" className="tb-col-tarifa text-right bg-dark text-white">TOTAL</th>
                    </tr>
                    <tr>
                      <td aria-label="cell" className="tb-col-tarifa tb-col-tarifa text-right">{formatExibeValor(valorCambio)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(tax_valorCambio)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right bg-white border-white" />
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(rentabilidadeCambio)}</td>
                      <td aria-label="cell" className="tb-col-tarifa text-right">{formatExibeValor(valor_totalCambio)}</td>
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>

            {/*PAX TITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaPax}`}>
              <Col sm={12}>

                <div className="h5 text-roxo-ventu">
                  <b>PAX</b>
                  <hr />
                </div>

                {/*PAX TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" className="tb-col-pax-id bg-dark text-white">ID</th>
                      <th aria-label="cell" className="tb-col-pax-nome_completo bg-dark text-white">NOME COMPLETO</th>
                      <th aria-label="cell" className="tb-col-pax-nome_reserva bg-dark text-white">NOME RESERVA</th>
                      <th aria-label="cell" className="tb-col-pax-dtipo bg-dark text-white">TIPO</th>
                    </tr>
                  </thead>
                  <tbody>
                    { pax }
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/*FORNECEDOR TITULO */}
            <Row className="p-0 m-0 mt-2">
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>FORNECEDOR</b>
                  <hr />
                </div>
              </Col>
            </Row>
            <Row className="p-0 m-0">
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Fornecedor:</th>
                      <th aria-label="cell" width={200} className="h5  bg-white border-white text-left text-muted"><Link className="text-blue" to={link_fornecedor}>{ for_nome_pessoa }</Link></th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={200} className="h5 text-left bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Descrição:</th>
                      <th aria-label="cell" width={300} className="h5  bg-white border-white text-left text-muted"><Link className="text-blue" to={`/tabelas/servico/consulta/${id_servico}`}>{ descricao }</Link></th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Data:</th>
                      <th aria-label="cell" width={200} className="h5  bg-white border-white text-left text-muted">{cnf_data}</th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={200} className="h5 text-left bg-white text-white border-white" />
                    </tr>
                    <tr>
                      <th aria-label="cell" width={120} className="h5 text-left bg-white border-white">Nº Confirmação:</th>
                      <th aria-label="cell" width={200} className="h5 bg-white border-white text-left text-muted">{cnf_numero}</th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={120} className="h5 text-left bg-white border-white">Confirmado Por:</th>
                      <th aria-label="cell" width={200} className="h5 bg-white border-white text-left text-muted">{cnf_contato}</th>
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>
            {/*</Col>
            </Row> */}
            {/*BILHETE TITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaBilhete}`}>
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>BILHETE</b>
                  <hr />
                </div>

                {/*BILHETE CABECALHO */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" width={150} className="h5 text-left bg-white border-white">Data:</th>
                      <th aria-label="cell" width={150} className="h5  bg-white border-white text-left text-muted">{cnf_data}</th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={150} className="h5 text-left bg-white border-white">Número:</th>
                      <th aria-label="cell" width={350} className="h5 bg-white border-white text-left text-muted">{cnf_numero}</th>
                    </tr>
                    <tr>
                      <th aria-label="cell" width={150} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={150} className="h5  bg-white border-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={150} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={300} className="h5 text-left bg-white text-white border-white" />
                    </tr>
                  </thead>
                </Table>

                {/*BILHETE TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" className="tb-col-bilhete-id bg-dark text-white">ID</th>
                      <th aria-label="cell" className="tb-col-bilhete-dt_emissao bg-dark text-white">EMISSÃO</th>
                      <th aria-label="cell" className="tb-col-bilhete-numero bg-dark text-white">NÚMERO</th>
                      <th aria-label="cell" className="tb-col-bilhete-tour_code bg-dark text-white">TOUR CODE</th>
                      <th aria-label="cell" className="tb-col-bilhete-cia bg-dark text-white">CIA</th>
                      <th aria-label="cell" className="tb-col-bilhete-rota bg-dark text-white">ROTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    { bilhete }
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/*ITINERARIO TITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaItinerario}`}>
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>ITINERÁRIO</b>
                  <hr />
                </div>

                {/*ITINERARIO TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" className="tb-col-itinerario-id bg-dark text-white">CIA</th>
                      <th aria-label="cell" className="tb-col-itinerario-voo bg-dark text-white">VOO</th>
                      <th aria-label="cell" className="tb-col-itinerario-dtemb bg-dark text-white">DATA</th>
                      <th aria-label="cell" className="tb-col-itinerario-origem bg-dark text-white">ORIGEM</th>
                      <th aria-label="cell" className="tb-col-itinerario-destino bg-dark text-white">DESTINO</th>

                      <th aria-label="cell" className="tb-col-itinerario-tipo bg-dark text-white text-center">TIPO</th>
                      <th aria-label="cell" className="tb-col-itinerario-classe bg-dark text-white text-center">CLASSE</th>
                      <th aria-label="cell" className="tb-col-itinerario-farebasis bg-dark text-white">FAREBASIS</th>
                      <th aria-label="cell" className="tb-col-itinerario-hremb bg-dark text-white">HR EMB</th>
                      <th aria-label="cell" className="tb-col-itinerario-hrdes bg-dark text-white ">HR DES</th>
                      <th aria-label="cell" className="tb-col-itinerario-localizador bg-dark text-white ">LOC</th>

                    </tr>
                  </thead>
                  <tbody>
                    { itinerario }
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/*CONDICOES TITULO */}
            <Row className={`p-0 m-0 mt-2 ${tituloCondicoes}`}>
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>CONDIÇÕES</b>
                  <hr />
                </div>
              </Col>
            </Row>
            {/*COND RECEBIMENTO SUBTITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaCondrec}`}>
              <Col sm={12}>
                <div className="h6"><b>RECEBIMENTO DO CLIENTE</b></div>

                {/*COND RECEBIMENTO TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" className="tb-col-condrec-pagador bg-dark text-white">PAGADOR</th>
                      <th aria-label="cell" className="tb-col-condrec-parcela bg-dark text-white">PARCELA</th>
                      <th aria-label="cell" className="tb-col-condrec-data bg-dark text-white">DATA</th>
                      <th aria-label="cell" className="tb-col-condrec-rateio bg-dark text-white">RATEIO</th>
                      <th aria-label="cell" className="tb-col-condrec-valor bg-dark text-white text-right">VALOR</th>
                      <th aria-label="cell" className="tb-col-condrec-cambio bg-dark text-white">CAMBIO</th>
                      <th aria-label="cell" className="tb-col-condrec-dforma bg-dark text-white">FORMA</th>
                      <th aria-label="cell" className="tb-col-condrec-fatura bg-dark text-white">DOCUMENTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    { condrec }
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/*COND PAGAMENTO SUBTITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaCondpag}`}>
              <Col sm={12}>
                <div className="h6"><b>PAGAMENTO AO FORNECEDOR</b></div>

                {/*COND PAGAMENTO TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" className="tb-col-condpag-pagador bg-dark text-white">PAGADOR</th>
                      <th aria-label="cell" className="tb-col-condpag-parcela bg-dark text-white">PARCELA</th>
                      <th aria-label="cell" className="tb-col-condpag-data bg-dark text-white">DATA</th>
                      <th aria-label="cell" className="tb-col-condpag-rateio bg-dark text-white">RATEIO</th>
                      <th aria-label="cell" className="tb-col-condpag-valor bg-dark text-white text-right">VALOR</th>
                      <th aria-label="cell" className="tb-col-condpag-cambio bg-dark text-white">CAMBIO</th>
                      <th aria-label="cell" className="tb-col-condpag-dforma bg-dark text-white">FORMA</th>
                      <th aria-label="cell" className="tb-col-condpag-fatura bg-dark text-white">DOCUMENTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    { condpag }
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/*MOVIMENTO TITULO */}
            <Row className={`p-0 m-0 mt-2 ${tabelaMovimento}`}>
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>MOVIMENTOS</b>
                  <hr />
                </div>

                {/*MOVIMENTO TABELA */}

                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" width={100} className="tb-col-movimento-id bg-dark text-white">MOVIMENTO</th>
                      <th aria-label="cell" width={100} className="tb-col-movimento-documento bg-dark text-white">DOCUMENTO</th>
                      <th aria-label="cell" width="auto" className="tb-col-movimento-contato bg-dark text-white">CONTATO</th>
                      <th aria-label="cell" width="auto" className="tb-col-movimento-descricao bg-dark text-white">DESCRIÇÃO</th>
                      <th aria-label="cell" width={120} className="tb-col-movimento-dt_vencimento bg-dark text-white">VENCIMENTO</th>
                      <th aria-label="cell" width={150} className="tb-col-movimento-valor bg-dark text-white text-right">VALOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    { tableData }
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/*RESPOSNAVEL TITULO */}
            <Row className="p-0 m-0 mt-2">
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>RESPONSÁVEL</b>
                  <hr />
                </div>
              </Col>
            </Row>
            {/*RESPOSAVEL TABELA */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <Table size="sm" striped className="mb-3">
                  <thead>
                    <tr>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Data Inclusão:</th>
                      <th aria-label="cell" width={200} className="h5 bg-white border-white text-left text-muted">{formatData(inc_dhsis)}</th>
                      <th aria-label="cell" width={100} className="h5 text-left bg-white text-white border-white" />
                      <th aria-label="cell" width={100} className="h5 text-left bg-white border-white">Consultor:</th>
                      <th aria-label="cell" width={200} className="h5 bg-white border-white text-left text-muted">{inc_dusuario}</th>
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>
            {/*CAPA BILHETE TITULO */}
            <Row className="p-0 m-0 mt-2">
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>CAPA BILHETE</b>
                  <hr />
                </div>
              </Col>
            </Row>
            {/*CAPA BILHETE CONTEUDO */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <span className="pr-3 text-black" />
                <span className="text-muted">{ capa_bilhete }</span>
              </Col>
            </Row>
            <Row className="p-2 m-0">
              <Col sm={12} />
            </Row>
            {/*OBSERVAÇÃO TITULO */}
            <Row className="p-0 m-0 mt-2">
              <Col sm={12}>
                <div className="h5 text-roxo-ventu">
                  <b>OBSERVAÇÃO</b>
                  <hr />
                </div>
              </Col>
            </Row>
            {/*OBSERVAÇÃO CONTEUDO */}
            <Row className="p-0 m-0">
              <Col sm={12}>
                <span className="pr-3 text-black" />
                <span className="text-muted">{ observacao }</span>
              </Col>
            </Row>
            {/*ANEXOS */}
            <Row className={`pl-3 h5 pt-1 text-left ${exibeAnexos}`}>
              <Col sm={12}>
                <br />
                <span className="pr-3 text-info">ANEXOS</span>
                {' '}
                <hr />
                <BootstrapTable
                  class="sm"
                  size="sm"
                  striped
                  condensed
                  keyField="id"
                  data={listaAnexos}
                  table-striped
                  columns={tableColumns_anexos}
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
  nomeProjeto: state.projeto.nomeProjeto,
  projetoFichaData: state.projeto.projetoFichaData,
  fichaData: state.servicos.fichaData,

  tableData: state.movimento.tableData,
  anexoTableData: state.anexo.anexoTableData,

  auth: state.sistema.auth,
  visibilityPageProjeto: state.usuario.visibilityPageProjeto,
  visibilitySubPages: state.usuario.visibilitySubPages,
});
export default connect(() => (mapState))(ServicoConsulta);
