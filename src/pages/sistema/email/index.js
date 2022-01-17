///////// IMPORTS ///////////////
/////////////////////////////////
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import {
  Card, CardBody, Col, Container, Form, Row, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Buttons, PageTitle } from '../../../components';
import { sendMail } from '../../../functions/sistema';

///////// FICHA CARGO ///////////
/////////////////////////////////
class Email extends Component {
  componentDidMount() {
    //document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    //document.removeEventListener("keydown", this.handleKeyDown);
  }

  ///////// KeyPress //////////////
  /////////////////////////////////
  handleKeyDown = (e) => {
    const keyPressed = e.key;
    if (keyPressed === 'Enter') {
      //saveCargo(this.props)
    }
  }

  render() {
    ///////// TABLE PROPERTY ////////
    /////////////////////////////////
    const tableTitle = 'Send Email';
    const ActionButtons = [
      <Buttons description="Enviar" icon="faMailBulk" color="primary" onClick={() => sendMail()} title="Envie o email" />,
    ];

    ///////// RENDER FILTRO /////////
    /////////////////////////////////
    return (
      <Container fluid className="p-0">
        <PageTitle title={tableTitle} buttons={ActionButtons} voltar={false} />
        <Row>
          <Col lg="12">
            <Card className="">
              <CardBody>
                <Form>

                  <div className="row p-0 m-0 email-container">
                    <div className="col-2 email-label">Para</div>
                    <div className="col-10 p-0 m-0">
                      <Input type="text" id="email-ficha-para" name="email-ficha-para" />
                    </div>
                  </div>

                  <div className="row p-0 m-0 email-container">
                    <div className="col-2 email-label">CC</div>
                    <div className="col-10 p-0 m-0">
                      <Input type="text" id="email-ficha-cc" name="email-ficha-cc" />
                    </div>
                  </div>

                  <div className="row p-0 m-0 email-container">
                    <div className="col-2 email-label">CCO</div>
                    <div className="col-10 p-0 m-0">
                      <Input type="text" id="email-ficha-cco" name="email-ficha-cco" />
                    </div>
                  </div>

                  <div className="row p-0 m-0 email-container">
                    <div className="col-2 email-label">Assunto</div>
                    <div className="col-10 p-0 m-0">
                      <Input type="text" id="email-ficha-assunto" name="email-ficha-assunto" />
                    </div>
                  </div>

                  <ReactQuill placeholder="Type something" id="email-ficha-body" name="email-ficha-body" />

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  googleUserData: state.google.googleUserData,
});
export default connect(() => (mapState))(Email);
