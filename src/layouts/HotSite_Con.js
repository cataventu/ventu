import React from 'react';
import {
  Container, Row, Col, Card, CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Main } from '../components';
import CardFooter from '../pages/hotsite/cards/cardFooter';

const Landing = ({ banner, children }) => (
  <>
    <Main className="bg-hotsite-1 p-0 m-0">
      {/*** CARD HEADER ***/}
      <Container fluid className="container-header">
        <img
          src={banner}
          alt="Ventu"
        />
      </Container>

      {/*** CARD CONTEÚDO ***/}
      <Container fluid className="container-form container-display-center">
        <Row>
          <Col sm={12}>

            <Card className="m-0 card-shadow">
              <CardBody className="pt-2 pb-2">
                <Row>
                  <Col sm={12} className="p-0 pl-3 pr-3">
                    {children}
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/*** CARD FOOTER ***/}
            <CardFooter />

          </Col>
        </Row>
      </Container>
    </Main>
  </>
);

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  banner: state.hotsite_participante.banner,
});
export default connect(() => (mapState))(Landing);
