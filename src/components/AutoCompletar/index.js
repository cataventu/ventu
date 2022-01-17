///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';

function toggleContent() {
  const id_container = `${this.props.id}-auto-completar-container`;
  document.getElementById(id_container).classList.toggle('hide');
}

function setValue(item) {
  const container = `${this.props.id}-auto-completar-container`;

  this.setState({ value: item.textContent });
  this.setState({ id: item.value });

  const { dispatch } = this.props.config;
  if (this.props.action) {
    dispatch({ type: this.props.action, payload: item.value });
  }

  if (this.props.nomeReserva) {
    dispatch({ type: this.props.actionReserva, payload: item.textContent });
  }

  document.getElementById(container).classList.add('hide');
}

function handleValue(value) {
  const newValue = value;

  if (value.length > 0) {
    const id_container = `${this.props.id}-auto-completar-container`;
    document.getElementById(id_container).classList.remove('hide');
  }
  this.setState({ value: newValue });
}

function handleKeyDown(e) {
  const keyPressed = e.key;
  const container = document.getElementById(`${this.props.id}-auto-completar-container`).classList;
  const limit = document.getElementsByClassName('auto-completar-item').length - 2;
  const { dispatch, autoCompletarCursor } = this.props.config;

  if (container.length === 2) {
    if (keyPressed === 'ArrowDown' || keyPressed === 'ArrowUp') {
      let number;
      if (keyPressed === 'ArrowDown') { number = parseInt(autoCompletarCursor, 10) + parseInt(1, 10); }
      if (keyPressed === 'ArrowUp') { number = parseInt(autoCompletarCursor, 10) - parseInt(1, 10); }

      ////// LIMIT //////
      if (number >= limit) { number = limit; }
      if (number <= 0) { number = 0; }

      ////// LIMPA LINHAS SELECIONADAS //////
      const itens = document.getElementsByClassName('auto-completar-item-hover');
      itens.forEach((item) => {
        item.classList.remove('auto-completar-item-hover');
      });

      ////// SELECIONA LINHA //////
      const id_item = `auto-completar-item-${this.props.id}-${number}`;
      const element = document.getElementById(id_item);
      element.classList.add('auto-completar-item-hover');
      ////// ATUALIZA STORE ////////
      dispatch({ type: '@SET_AUTOCOMPLETAR_CURSOR', payload: number });
    }

    if (keyPressed === 'Enter') {
      const id_item = `auto-completar-item-${this.props.id}-${autoCompletarCursor}`;
      const element = document.getElementById(id_item);
      setValue(element, this.props);
    }
  }
}

class AutoCompletar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      firstLoad: true,
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
    this.setState({ id: this.props.valueId });
    document.addEventListener('keydown', handleKeyDown);
  }

  componentDidUpdate() {
    if (this.state.firstLoad) {
      if (this.props.value !== this.state.value) {
        //this.setState({ value: this.props.value });
        //this.setState({ id: this.props.valueId });
        //this.setState({ firstLoad: false });
      }
    }
    document.removeEventListener('keydown', handleKeyDown);
  }

  render() {
    const Dados = [];
    let i = 0;
    this.props.dados.forEach((item) => {
      Dados.push(
        <option
          onClick={(e) => setValue(e.target, this.props)}
          id={`auto-completar-item-${this.props.id}-${i}`}
          className="auto-completar-item"
          value={item.id}
        >
          { item.descricao }
        </option>,
      );
      i += 1;
    });

    let Hide = '';
    if (this.props.hide) { Hide = ' hide '; }

    return (
      <>
        <div>
          <FontAwesomeIcon icon={faBolt} className={`auto-completar-icon${Hide}`} />
          <Input type="hidden" id={`${this.props.id}-id`} name={this.props.name} className="pl-5" value={this.state.id} />
          <Input
            type="text"
            autocomplete="off"
            className={`auto-completar-input ${this.props.className}${Hide}`}
            id={this.props.id}
            value={this.state.value}
            disabled={this.props.disabled}
            name={this.props.name}
            onKeyUp={this.props.function}
            onChange={(e) => handleValue(e.target.value)}
            onChangeCapture={this.props.onChangeCapture}
            onClick={() => toggleContent()}
          />
        </div>
        <div id={`${this.props.id}-auto-completar-container`} className={`hide col-12 auto-completar-container${Hide}`}>
          <div id={`${this.props.id}-auto-completar-content`} className="auto-completar-content form-control">
            { Dados }
          </div>
        </div>
      </>
    );
  }
}

export default AutoCompletar;
