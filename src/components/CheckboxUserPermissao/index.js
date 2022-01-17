import React, { Component } from 'react';
import { Input, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class CheckboxUserPermissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Check: '',
      Icon: '',
      Tipo: '',
    };
  }

  componentDidMount() {
    this.changeIcon(this.props.acesso);
    this.handleTipo(this.props.tipo);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.changeIcon(value);
  }

  changeIcon(value) {
    switch (value) {
      case false:
        this.setState({ Check: '' });
        this.setState({ Icon: <FontAwesomeIcon className="float-left text-danger h4 ml-1 mt-1" icon={faTimes} /> });
        break;
      case true:
        this.setState({ Check: 'Checked' });
        this.setState({ Icon: <FontAwesomeIcon className="float-left text-green h4 mt-1" icon={faCheck} /> });
        break;
      default:
    }
  }

  handleTipo(value) {
    switch (value) {
      case 'Funcao': this.setState({ Tipo: 'cursor-default col-12 p-0 pl-2' }); break;
      case 'Page': this.setState({ Tipo: 'cursor-default col-12 m-0 pl-5' }); break;
      default: this.setState({ Tipo: 'cursor-default col-12 p-0 pl-2' });
    }
  }

  render() {
    return (
      <Row>
        <Col className="col-check-user-permissao">
          <Row id={`line-${this.props.id}`} className={this.state.Tipo}>
            <div className="col-check-user-permissao-icon cursor" onClick={() => document.getElementById(this.props.id).click()}>{ this.state.Icon }</div>
            <div className="col-check-user-permissao-texto col-11 pl-4 noselect" onClick={this.props.click}><p>{ this.props.descricao }</p></div>
            <div className="col-check-user-permissao-checkbox">
              <Input
                type="checkbox"
                className="m-0 p-0 mt-2 hide"
                checked={this.state.Check}
                onChange={(e) => this.handleChange(e, this)}
                id={this.props.id}
                name={this.props.name}
                info={this.props.info}
                num_modulo={this.props.num_modulo}
                permissao={this.props.permissao}
                descricao={this.props.descricao}
                acesso={this.props.acesso}
                pagina={this.props.pagina}
                num_pagina={this.props.num_pagina}
              />
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CheckboxUserPermissao;
