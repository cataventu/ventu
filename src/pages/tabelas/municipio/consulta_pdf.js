///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import {
  Card, Container, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import {
  Buttons, ConsultaFooter, PageTitle, ConsultaHeader,
} from '../../../components';
import * as functions from '../../../functions/tabelas/municipio';
import { formatData, formatSituacao } from '../../../functions/sistema';

///////// Municipio ///////////////
/////////////////////////////////
class MunicipioConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      situacao: '',
      inc_dusuario: '',
      inc_dhsis: '',
      alt_dusuario: '',
      alt_dhsis: '',
      id_pais: '',
      pais: '',
      municipio: '',
      uf: '',
      ibge: '',
      ddd: '',
      pdf: '',
    };
  }

  async componentDidMount() {
    /// ID
    const { id } = this.props.match.params;
    /// RECEBE DADOS
    await functions.getConsultaMunicipio(this.props, id);
  }

  componentDidUpdate() {
    const Ficha = this.props.municipioConsulta;
    if (Ficha.id && this.state.id === 0) {
      this.setConsulta(Ficha);
    }
  }

  setConsulta = (data) => {
    this.setState({ id: data.id });
    this.setState({ situacao: formatSituacao(data.situacao) });
    this.setState({ inc_dhsis: formatData(data.inc_dhsis) });
    this.setState({ inc_dusuario: data.inc_dusuario });
    this.setState({ alt_dhsis: formatData(data.alt_dhsis) });
    this.setState({ alt_dusuario: data.alt_dusuario });

    this.setState({ id_pais: data.id_pais });
    this.setState({ pais: data.pais });
    this.setState({ municipio: data.municipio });
    this.setState({ uf: data.uf });
    this.setState({ ibge: data.ibge });
    this.setState({ ddd: data.ddd });

    this.setState({ pdf: data });
  }

  render() {
    ///////// RENDER TABLE //////////
    /////////////////////////////////
    return (

      <Container fluid className="p-0 ">
        <PageTitle
          history={this.props.history}

          buttons={
            [

              <PDFDownloadLink className="hide" document={<PdfDocument data={this.state.pdf} />} fileName="somename.pdf">
                {({
                  blob, url, loading, error,
                }) => (loading ? ''
                  : <span id="pdf">download</span>)}
              </PDFDownloadLink>,

              <Buttons
                onClick={() => document.getElementById('pdf').click()}
                description="Download"
                color="danger"
                title="download PDF."
              />,
            ]
          }

          title="Consulta"
          voltar
        />

        <Card className="p-3">
          <div className="consulta-body">
            <ConsultaHeader titulo="Municipio" />

            <Row className="p-0 m-0">
              <Col sm={7}>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Pais:</span>
                    <span className="text-muted">
                      <Link className="text-blue" to={`/tabelas/pais/consulta/${this.state.id_pais}`}>
                        { this.state.pais }
                      </Link>
                    </span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">Municipio:</span>
                    <span className="text-muted">{ this.state.municipio }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">UF:</span>
                    <span className="text-muted">{ this.state.uf }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">IBGE:</span>
                    <span className="text-muted">{ this.state.ibge }</span>
                  </Col>
                </Row>
                <Row className="pl-3 h5 pt-1 text-left">
                  <Col sm={12}>
                    <span className="pr-3 text-black">DDD:</span>
                    <span className="text-muted">{ this.state.ddd }</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={5}>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Id:</span>
                      <span className="text-muted">{ this.state.id }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Situação:</span>
                      <span className="text-muted">{ this.state.situacao }</span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Inclusão:</span>
                      <span className="text-muted">
                        { this.state.inc_dusuario }
                        {' '}
-
                        {' '}
                        { this.state.inc_dhsis }
                      </span>
                    </small>
                  </Col>
                </Row>
                <Row className="pr-4 h6 text-right">
                  <Col sm={12}>
                    <small>
                      <span className="pr-3 text-black">Atualização:</span>
                      <span className="text-muted">
                        { this.state.alt_dusuario }
                        {' '}
-
                        {' '}
                        { this.state.alt_dhsis }
                      </span>
                    </small>
                  </Col>
                </Row>
              </Col>
            </Row>

            <ConsultaFooter />
          </div>
        </Card>
      </Container>

    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  municipioConsulta: state.municipio.municipioConsulta,

  auth: state.sistema.auth,
});
export default connect(() => (mapState))(MunicipioConsulta);
