import React, { Component, memo } from 'react';
import {
  InputGroup, InputGroupAddon, InputGroupText, Col, Input, Row,
} from 'reactstrap';

class CheckboxPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCheckbox: 'input-bg-muted',
      classInput: 'perfil-input text-dark bg-muted col-md-5 col-lg-4',
      classTipo: 'perfil-input text-dark bg-muted col-md-3 col-lg-2',
      input: 'disabled',
      observacao: '',
    };
  }

  componentDidMount() {
    this.handleCheck(this.props.check);
  }

  handleCheck = async (checkbox) => {
    switch (checkbox) {
      case true:
        this.setState({ classCheckbox: 'bg-dark perfil-group' });
        this.setState({ classInput: 'perfil-input text-white bg-dark col-md-5 col-lg-4' });
        this.setState({ classTipo: 'perfil-input text-white bg-dark col-md-3 col-lg-2' });
        this.setState({ input: '' });
        this.setState({ observacao: this.props.observacao });
        document.getElementById(this.props.id).checked = true;
        break;
      case false:
        this.setState({ classCheckbox: 'bg-muted' });
        this.setState({ classInput: 'perfil-input bg-muted col-md-5 col-lg-4' });
        this.setState({ classTipo: 'perfil-input bg-muted col-md-3 col-lg-2' });
        this.setState({ input: 'disabled' });
        //this.setState({ observacao: '', });
        break;
      default:
    }
  }

  handleClick = () => {
    const element = document.getElementById(this.props.id);
    if (!element.checked) { element.click(); }
  }

  render() {
    return (
      <>
        <Row id={`perfil-group-${this.props.id}`} className="pb-1">
          <Col lg="12">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className={this.state.classCheckbox}>
                  <Input
                    addon
                    type="checkbox"
                    id={this.props.id}
                    name="perfil-checkbox"
                    onClick={(e) => this.handleCheck(e.target.checked)}
                    onChange={this.props.onChange}
                    aria-label="Checkbox for following text input"
                    value={`${this.props.tipo}-${this.props.perfil}`}
                  />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                disabled
                type="text"
                value={this.props.tipo}
                className={this.state.classTipo}
              />
              <Input
                disabled
                type="text"
                value={this.props.perfil}
                className={this.state.classInput}
              />
              <Input
                className="col-md-4 col-lg-7"
                disabled={this.state.input}
                placeholder=""
                id={`info-${this.props.id}`}
                value={this.state.observacao}
                onChange={this.props.onChange}
                onChangeCapture={(e) => this.setState({ observacao: e.target.value })}
              />
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default memo(CheckboxPerfil);
