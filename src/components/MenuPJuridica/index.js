import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle, faAddressCard, faHandshake, faPencilAlt, faPhoneAlt, faBuilding,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { showMSG } from '../index';

class menuPJuridica extends Component {
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
      ativo_1: 'text-muted',
      ativo_2: 'text-muted',
      ativo_3: 'text-muted',
      ativo_4: 'text-muted',
      ativo_5: 'text-muted',
      ativo_6: 'text-muted',
    };
  }

  componentDidMount() {
    const id_pjuridica_url = this.props.match.params.id;
    if (id_pjuridica_url > 0) { this.atualizaMenu(id_pjuridica_url); }
    this.handleAtivo();
    this.handleVisibility();
  }

  componentDidUpdate() {
    const id_pjuridica_url = this.props.match.params.id;
    const id_pjuridica = this.state.id;
    if (id_pjuridica !== id_pjuridica_url) { this.atualizaMenu(id_pjuridica_url); }
    this.handleVisibility();
  }

  atualizaMenu = (id) => {
    this.setState({
      linkTo_1: `/cadastro/pessoa-juridica/ficha/${id}/dados-comerciais`,
      linkTo_6: `/cadastro/pessoa-juridica/ficha/${id}/servico`,
      linkTo_2: `/cadastro/pessoa-juridica/ficha/${id}/endereco`,
      linkTo_3: `/cadastro/pessoa-juridica/ficha/${id}/contato`,
      linkTo_4: `/cadastro/pessoa-juridica/ficha/${id}/ocorrencias`,
      linkTo_5: `/cadastro/pessoa-juridica/ficha/${id}/observacao`,
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
      ? this.changeVisibility('submenu-pjuridica-servicos', true)
      : this.changeVisibility('submenu-pjuridica-servicos', false);
  }

  handleVisibility = () => {
    this.props.visibilitySubPages.forEach((modulo) => {
      if (modulo.nome.toUpperCase() === 'PESSOA JURÍDICA') {
        modulo.subpages.forEach((subpage) => {
          switch (subpage.nome) {
            case '> SERVIÇO': this.handleFornecedor(subpage.acesso); break;
            case '> ENDEREÇO': this.changeVisibility('submenu-pjuridica-enderecos', subpage.acesso); break;
            case '> CONTATO': this.changeVisibility('submenu-pjuridica-contatos', subpage.acesso); break;
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
  }

  render() {
    return (
      <>
        <Card>
          <ListGroup id="menu-lateral" className="cursor" flush>

            {/*** DADOS COMERCIAIS ***/}
            <Link to={this.state.linkTo_1}>
              <ListGroupItem className={this.state.ativo_1} id="submenu-pjuridica-dados-comerciais" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faBuilding} /></span>
                Dados Comerciais
              </ListGroupItem>
            </Link>

            {/*** ENDEREÇO ***/}
            <Link to={this.state.linkTo_2} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={`hide ${this.state.ativo_2}`} id="submenu-pjuridica-enderecos" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faAddressCard} /></span>
                Endereços
              </ListGroupItem>
            </Link>

            {/*** CONTATOS ***/}
            <Link to={this.state.linkTo_3} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={`hide ${this.state.ativo_3}`} id="submenu-pjuridica-contatos" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faPhoneAlt} /></span>
                Contatos
              </ListGroupItem>
            </Link>

            {/*** SERVICOS ***/}
            <Link to={this.state.linkTo_6} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={`hide ${this.state.ativo_6}`} id="submenu-pjuridica-servicos" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faHandshake} /></span>
                Serviços
              </ListGroupItem>
            </Link>

            {/*** OCORRENCIAS ***/}
            <Link to={this.state.linkTo_4} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_4} id="submenu-pjuridica-ocorrencias" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faExclamationTriangle} /></span>
                Ocorrências
              </ListGroupItem>
            </Link>

            {/*** OBSERVAÇÃO ***/}
            <Link to={this.state.linkTo_5} onClick={() => this.msgBloqueio()}>
              <ListGroupItem className={this.state.ativo_5} id="submenu-pjuridica-observacao" action>
                <span className="mr-3 icon-left-menu-cadastro"><FontAwesomeIcon icon={faPencilAlt} /></span>
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
  fornecedorFlag: state.pJuridica.fornecedorFlag,
  visibilitySubPages: state.usuario.visibilitySubPages,
}))(menuPJuridica);
