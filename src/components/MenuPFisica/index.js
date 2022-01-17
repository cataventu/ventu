import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle, faAddressCard, faHandshake, faPencilAlt, faPhoneAlt, faBuilding, faCreditCard, faUsers, faMedkit, faCheck, faPlane, faUserAlt, faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

import { showMSG } from '../index';

class menuPFisica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      linkTo_1: '#',
      linkTo_2: '#',
      linkTo_3: '#',
      linkTo_4: '#',
      linkTo_5: '#',
      linkTo_6: '#',
      linkTo_7: '#',
      linkTo_8: '#',
      linkTo_9: '#',
      linkTo_10: '#',
      linkTo_11: '#',
      linkTo_12: '#',
      linkTo_13: '#',
      ativo_1: 'text-muted',
      ativo_2: 'text-muted',
      ativo_3: 'text-muted',
      ativo_4: 'text-muted',
      ativo_5: 'text-muted',
      ativo_6: 'text-muted',
      ativo_7: 'text-muted',
      ativo_8: 'text-muted',
      ativo_9: 'text-muted',
      ativo_10: 'text-muted',
      ativo_11: 'text-muted',
      ativo_12: 'text-muted',
      ativo_13: 'text-muted',
    };
  }

  componentDidMount() {
    const id_pfisica_url = this.props.match.params.id;

    if (id_pfisica_url > 0) { this.atualizaMenu(id_pfisica_url); }

    this.handleAtivo();
    this.handleVisibility();
  }

  componentDidUpdate() {
    const id_pfisica_url = this.props.match.params.id;
    const id_pfisica = this.state.id;

    if (id_pfisica !== id_pfisica_url) { this.atualizaMenu(id_pfisica_url); }
    this.handleVisibility();
  }

  atualizaMenu = (id) => {
    this.setState({
      linkTo_1: `/cadastro/pessoa-fisica/ficha/${id}/dados-pessoais`,
      linkTo_2: `/cadastro/pessoa-fisica/ficha/${id}/dados-comerciais`,
      linkTo_3: `/cadastro/pessoa-fisica/ficha/${id}/contato`,
      linkTo_4: `/cadastro/pessoa-fisica/ficha/${id}/endereco`,
      linkTo_5: `/cadastro/pessoa-fisica/ficha/${id}/familia`,
      linkTo_6: `/cadastro/pessoa-fisica/ficha/${id}/emergencia`,
      linkTo_7: `/cadastro/pessoa-fisica/ficha/${id}/passaporte`,
      linkTo_8: `/cadastro/pessoa-fisica/ficha/${id}/visto`,
      linkTo_9: `/cadastro/pessoa-fisica/ficha/${id}/cartao`,
      linkTo_10: `/cadastro/pessoa-fisica/ficha/${id}/perfil`,
      linkTo_11: `/cadastro/pessoa-fisica/ficha/${id}/ocorrencias`,
      linkTo_12: `/cadastro/pessoa-fisica/ficha/${id}/observacao`,
      linkTo_13: `/cadastro/pessoa-fisica/ficha/${id}/servico`,
      id: this.props.match.params.id,
    });
  }

  msgBloqueio = () => {
    const { id } = this.state;
    if (id <= 0) { showMSG('Acesso Bloqueado', 'Requer salvar os dados comerciais.', 'error', 4000); }
  }

  changeVisibility = (item, acesso) => {
    const element = document.getElementById(item);

    if (element !== null) {
      !acesso
        ? element.classList.add('hide')
        : element.classList.remove('hide');
    }
  }

  handleFornecedor = (acesso) => {
    const fornecedor = this.props.fornecedorFlag;
    fornecedor === true && acesso === true
      ? this.changeVisibility('submenu-pfisica-servicos', true)
      : this.changeVisibility('submenu-pfisica-servicos', false);
  }

  handleVisibility = () => {
    this.props.visibilitySubPages.forEach((modulo) => {
      if (modulo.nome.toUpperCase() === 'PESSOA FÍSICA') {
        modulo.subpages.forEach((subpage) => {
          switch (subpage.nome) {
            case '> CONTATO': this.changeVisibility('submenu-pfisica-contatos', subpage.acesso); break;
            case '> ENDEREÇO': this.changeVisibility('submenu-pfisica-enderecos', subpage.acesso); break;
            case '> SERVIÇO': this.handleFornecedor(subpage.acesso); break;
            case '> PASSAPORTE': this.changeVisibility('submenu-pfisica-passaportes', subpage.acesso); break;
            case '> VISTO': this.changeVisibility('submenu-pfisica-vistos', subpage.acesso); break;
            case '> CARTÃO': this.changeVisibility('submenu-pfisica-cartoes', subpage.acesso); break;
            case '> PERFIL': this.changeVisibility('submenu-pfisica-perfil', subpage.acesso); break;
            default:
          }
        });
      }
    });
  }

  handleAtivo = () => {
    if (this.props.item_1 === 'active') { this.setState({ ativo_1: 'bg-primary text-light' }); }
    if (this.props.item_2 === 'active') { this.setState({ ativo_2: 'bg-primary text-light' }); }
    if (this.props.item_3 === 'active') { this.setState({ ativo_3: 'bg-primary text-light' }); }
    if (this.props.item_4 === 'active') { this.setState({ ativo_4: 'bg-primary text-light' }); }
    if (this.props.item_5 === 'active') { this.setState({ ativo_5: 'bg-primary text-light' }); }
    if (this.props.item_6 === 'active') { this.setState({ ativo_6: 'bg-primary text-light' }); }
    if (this.props.item_7 === 'active') { this.setState({ ativo_7: 'bg-primary text-light' }); }
    if (this.props.item_8 === 'active') { this.setState({ ativo_8: 'bg-primary text-light' }); }
    if (this.props.item_9 === 'active') { this.setState({ ativo_9: 'bg-primary text-light' }); }
    if (this.props.item_10 === 'active') { this.setState({ ativo_10: 'bg-primary text-light' }); }
    if (this.props.item_11 === 'active') { this.setState({ ativo_11: 'bg-primary text-light' }); }
    if (this.props.item_12 === 'active') { this.setState({ ativo_12: 'bg-primary text-light' }); }
    if (this.props.item_13 === 'active') { this.setState({ ativo_13: 'bg-primary text-light' }); }
  }

  render() {
    return (
      <>
        <Card>
          <ListGroup id="menu-lateral" className="cursor" flush>
            {/*** DADOS PESSOAIS ***/}
            <Link to={this.state.linkTo_1}>
              <ListGroupItem className={this.state.ativo_1} id="submenu-pfisica-dados-pessoais" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faAddressBook} />
                </span>
              Dados Pessoais
              </ListGroupItem>
            </Link>

            {/*** DADOS COMERCIAIS ***/}
            <Link to={this.state.linkTo_2} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_2} id="submenu-pfisica-dados-comerciais" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
              Dados Comerciais
              </ListGroupItem>
            </Link>

            {/*** SERVICOS ***/}
            <Link to={this.state.linkTo_13} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={`hide ${this.state.ativo_13}`} id="submenu-pfisica-servicos" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faHandshake} />
                </span>
              Serviços
              </ListGroupItem>
            </Link>

            {/*** CONTATOS ***/}
            <Link to={this.state.linkTo_3} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_3} id="submenu-pfisica-contatos" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </span>
              Contatos
              </ListGroupItem>
            </Link>

            {/*** ENDEREÇOS ***/}
            <Link to={this.state.linkTo_4} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_4} id="submenu-pfisica-enderecos" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faAddressCard} />
                </span>
              Endereços
              </ListGroupItem>
            </Link>

            {/*** FAMILIA ***/}
            <Link to={this.state.linkTo_5} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_5} id="submenu-pfisica-familia" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
              Família
              </ListGroupItem>
            </Link>

            {/*** EMERGENCIA ***/}
            <Link to={this.state.linkTo_6} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_6} id="submenu-pfisica-emergencia" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faMedkit} />
                </span>
              Emergência
              </ListGroupItem>
            </Link>

            {/*** PASSAPORTES ***/}
            <Link to={this.state.linkTo_7} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_7} id="submenu-pfisica-passaportes" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faPlane} />
                </span>
              Passaportes
              </ListGroupItem>
            </Link>

            {/*** VISTOS ***/}
            <Link to={this.state.linkTo_8} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_8} id="submenu-pfisica-vistos" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              Vistos
              </ListGroupItem>
            </Link>

            {/*** CARTÕES ***/}
            <Link to={this.state.linkTo_9} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_9} id="submenu-pfisica-cartoes" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faCreditCard} />
                </span>
              Cartões
              </ListGroupItem>
            </Link>

            {/*** PERFIL ***/}
            <Link to={this.state.linkTo_10} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_10} id="submenu-pfisica-perfil" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faUserAlt} />
                </span>
              Perfil
              </ListGroupItem>
            </Link>

            {/*** OCORRENCIAS ***/}
            <Link to={this.state.linkTo_11} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_11} id="submenu-pfisica-ocorrencias" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>
              Ocorrências
              </ListGroupItem>
            </Link>

            {/*** OBSERVACAO ***/}
            <Link to={this.state.linkTo_12} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_12} id="submenu-pfisica-observacao" action>
                <span className="mr-3 icon-left-menu-cadastro">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              Observação
              </ListGroupItem>
            </Link>

          </ListGroup>
        </Card>
      </>
    );
  }
}

export default connect((state) => ({
  fornecedorFlag: state.pFisica.fornecedorFlag,
  visibilitySubPages: state.usuario.visibilitySubPages,
}))(menuPFisica);
