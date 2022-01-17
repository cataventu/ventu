import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

///////// KeyPress //////////////
/////////////////////////////////
function handlePesquisar(e) {
  const keyPressed = e.key;
  if (keyPressed === 'Escape') {
    document.getElementById(this.props.id).value = '';
  }
}

class Pesquisar extends Component {
  async componentDidMount() {
    document.addEventListener('keydown', handlePesquisar);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', handlePesquisar);
  }

  render() {
    return (
      <>
        <div className="p-1 pr-2 pl-2 m-0 float-left cursor" onClick={this.props.pesquisar}>
          <FontAwesomeIcon icon={faSearch} className="p-0 m-0 mt-1 h5 text-muted" />
        </div>
        <Input placeholder="Pesquisar..." id={this.props.id} className="col-5 col-sd-6 col-md-5 col-lg-4 border-none" />
      </>
    );
  }
}

export default Pesquisar;
