///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Nav } from 'reactstrap';
import {
  faUserFriends, faDollarSign, faFileAlt, faUserTie, faUsers, faHandshake,
  faHotel, faClock, faMoneyBillWave, faExclamationTriangle, faBurn, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { TabNavItem } from '../index';

function TabsProjeto({ ativo, props }) {
  const url_atual = props.match.url;

  const tabAtivo = 'bg-roxo-ventu text-white tab-ativo';
  const tabInativo = 'bg-white text-dark border text-roxo-ventu tab-inativo';
  const tabDesativado = 'bg-gray-medium border text-muted tab-desativado';

  const [tab1, setTab1] = useState(tabInativo);
  const [tab2, setTab2] = useState(tabDesativado);
  const [tab3, setTab3] = useState(tabDesativado);
  const [tab4, setTab4] = useState(tabDesativado);
  const [tab5, setTab5] = useState(tabDesativado);
  const [tab6, setTab6] = useState(tabDesativado);
  const [tab7, setTab7] = useState(tabDesativado);
  const [tab8, setTab8] = useState(tabDesativado);
  const [tab9, setTab9] = useState(tabDesativado);
  const [tab10, setTab10] = useState(tabDesativado);
  const [tab11, setTab11] = useState(tabDesativado);
  const [tab12, setTab12] = useState(tabDesativado);

  const [url1, setUrl1] = useState(url_atual);
  const [url2, setUrl2] = useState(url_atual);
  const [url3, setUrl3] = useState(url_atual);
  const [url4, setUrl4] = useState(url_atual);
  const [url5, setUrl5] = useState(url_atual);
  const [url6, setUrl6] = useState(url_atual);
  const [url7, setUrl7] = useState(url_atual);
  const [url8, setUrl8] = useState(url_atual);
  const [url9, setUrl9] = useState(url_atual);
  const [url10, setUrl10] = useState(url_atual);
  const [url11, setUrl11] = useState(url_atual);
  //const [url12] = useState(url_atual);
  const [url12, setUrl12] = useState(url_atual);

  const [firstLoad, setFirst] = useState(true);

  ////// FIRST LOAD
  useEffect(() => {
    if (firstLoad && props.visibilitySubPages.length > 0) {
      const { id } = props.match.params;
      setUrl1(`/projeto/painel/${id}/ficha`);

      ////// 01 - PERMISSOES DO USUARIO
      props.visibilitySubPages.forEach((modulo) => {
        if (modulo.nome.toUpperCase() === 'PAINEL') {
          modulo.subpages.forEach((subpage) => {
            switch (subpage.nome) {
              case '> CONTRATANTE':
                if (subpage.acesso) {
                  setTab2(tabInativo);
                  setUrl2(`/projeto/painel/${id}/contratante`);
                }
                break;
              case '> RSVP':
                if (subpage.acesso) {
                  setTab3(tabInativo);
                  setUrl3(`/projeto/painel/${id}/rsvp`);
                }
                break;
              case '> PARTICIPANTE':
                if (subpage.acesso) {
                  setTab4(tabInativo);
                  setUrl4(`/projeto/painel/${id}/participantes`);
                }
                break;
              case '> SERVIÇO':
                if (subpage.acesso) {
                  setTab5(tabInativo);
                  setUrl5(`/projeto/painel/${id}/servicos`);
                }
                break;
              case '> TEMPO E MOVIMENTO':
                if (subpage.acesso) {
                  setTab6(tabInativo);
                  setUrl6(`/projeto/painel/${id}/tempos-movimentos`);
                }
                break;
              case '> OCORRÊNCIA':
                if (subpage.acesso) {
                  setTab7(tabInativo);
                  setUrl7(`/projeto/painel/${id}/ocorrencias`);
                }
                break;
              case '> ROOMING LIST':
                if (subpage.acesso) {
                  setTab8(tabInativo);
                  setUrl8(`/projeto/painel/${id}/rooming-list`);
                }
                break;
              case '> FINANCEIRO':
                if (subpage.acesso) {
                  setTab9(tabInativo);
                  setUrl9(`/projeto/painel/${id}/financeiro`);
                }
                break;
              case '> ORÇAMENTO':
                if (subpage.acesso) {
                  setTab10(tabInativo);
                  setUrl10(`/projeto/painel/${id}/orcamento`);
                }
                break;
              default:
            }
          });
        }
      });

      ////// HOTSITE
      setTab11(tabInativo);
      setUrl11(`/projeto/painel/${id}/hotsite/ficha`);

      ////// DOSSIE
      setTab12(tabInativo);
      setUrl12(`/projeto/painel/${id}/dossie/ficha`);

      ////// VERIFICA TAB ATIVA
      switch (ativo) {
        case 1: setTab1(tabAtivo); break;
        case 2: setTab2(tabAtivo); break;
        case 3: setTab3(tabAtivo); break;
        case 4: setTab4(tabAtivo); break;
        case 5: setTab5(tabAtivo); break;
        case 6: setTab6(tabAtivo); break;
        case 7: setTab7(tabAtivo); break;
        case 8: setTab8(tabAtivo); break;
        case 9: setTab9(tabAtivo); break;
        case 10: setTab10(tabAtivo); break;
        case 11: setTab11(tabAtivo); break;
        case 12: setTab12(tabAtivo); break;
        default:
      }

      setFirst(false);
    }
  }, [props, ativo, firstLoad]);

  return (
    <Row className="d-print-none">
      <Col className="m-0 mt-1 pb-0" sm={12}>
        <Nav tabs>
          <TabNavItem ativo={tab1} icone={faFileAlt} label="Ficha" url={url1} />
          <TabNavItem ativo={tab2} icone={faUserTie} label="Contratantes" url={url2} />
          <TabNavItem ativo={tab10} icone={faMoneyBillWave} label="Orçamento" url={url10} />
          <TabNavItem ativo={tab3} icone={faUserFriends} label="RSVP" url={url3} />
          <TabNavItem ativo={tab4} icone={faUsers} label="Participantes" url={url4} />
          <TabNavItem ativo={tab5} icone={faHandshake} label="Serviços" url={url5} />
          <TabNavItem ativo={tab6} icone={faClock} label="Tempos & Movimentos" url={url6} />
          <TabNavItem ativo={tab7} icone={faExclamationTriangle} label="Ocorrências" url={url7} />
          <TabNavItem ativo={tab8} icone={faHotel} label="Rooming List" url={url8} />
          <TabNavItem ativo={tab9} icone={faDollarSign} label="Financeiro" url={url9} />
          <TabNavItem ativo={tab11} icone={faBurn} label="Hotsite" url={url11} />
          <TabNavItem ativo={tab12} icone={faFileExcel} label="Dossiê" url={url12} />
        </Nav>
      </Col>
    </Row>
  );
}

export default memo(TabsProjeto);
