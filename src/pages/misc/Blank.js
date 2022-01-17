import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Container, Row,
} from 'reactstrap';
import { hideSidebar } from '../../redux/actions/sidebarActions';

export default function Blank() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideSidebar());
  }, [dispatch]);

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Blank Page</h1>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">Em desenvolvimento</CardTitle>
            </CardHeader>
            <CardBody>&nbsp;</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
