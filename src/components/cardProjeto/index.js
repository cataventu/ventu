///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, Card, CardFooter, Row, CardHeader, CardImg, CardTitle, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import { getBanner } from '../../functions/hotsite/projeto';
import DropDownMenu from './dropDownMenu';
import './style.css';
import banner_default from '../../assets/img/ventu/banner_default.jpg';

const CardProjeto = ({
  props, name, state, image, tipo, vagas, inicio, fim, id, codigo, visibility,
}) => {
  const [firstLoad, set_first] = useState(true);
  const [color, setColor] = useState(true);

  //const [banner, set_banner] = useState(banner_default);

  //const loadBanner = useCallback(() => {
  //async function loadBanner() {
  //const res = await getBanner(id, props);
  //if (res.length > 0) {
  //set_banner(`data:image/jpg;base64, ${res}`);
  //}
  //set_first(false);
  //}
  //loadBanner();
  //}, [id, props]);

  useEffect(() => {
    switch (state) {
      case 'COTAÇÃO': setColor('primary'); break;
      case 'CONFIRMADO': setColor('success'); break;
      case 'ENCERRADO': setColor('blue'); break;
      case 'CANCELADO': setColor('danger'); break;
      default:
    }
  }, [state]);

  ////// FIRST LOAD
  //useEffect(() => {
  //if (firstLoad) {
  //loadBanner();
  //}
  //}, [firstLoad, loadBanner]);

  return (
    <Col className={visibility} sm={6} md={4} lg={4} xl={3}>

      <Card className="noselect">

        {image ? <CardImg top src={image} alt="Card image cap" /> : ''}

        <CardHeader className="project-header-container p-0 m-0">

          <div className="project-header-text bg-dark rounded-top text-light p-2">
            <CardTitle tag="h5">
              <Badge className={`project-badge text-light bg-${color}`} color="success"><small>{state}</small></Badge>
              <span className="text-light">{ name }</span>
            </CardTitle>

            <DropDownMenu props={props} id={id} />
          </div>

          {/*<div className="project-header-banner">
            <img src={banner} alt="banner hotsite" />
          </div> */}

        </CardHeader>

        <div className="project">
          <Link to={`/projeto/painel/${id}/ficha`}>
            <ListGroup flush>
              <ListGroupItem className="pb-2">
                <Row className="project-row">
                  <span className="project-label">Tipo:</span>
                  <h5 className="project-info">{ tipo }</h5>
                </Row>
                <Row className="project-row">
                  <span className="project-label">Código:</span>
                  <h5 className="project-info">{ codigo }</h5>
                </Row>
                <Row className="project-row">
                  <span className="project-label">Vagas:</span>
                  <h5 className="project-info">{ vagas }</h5>
                </Row>
                <Row className="project-row">
                  <span className="project-label">Início:</span>
                  <h5 className="project-info">{ inicio }</h5>
                </Row>
                <Row className="project-row">
                  <span className="project-label">Fim:</span>
                  <h5 className="project-info">{ fim }</h5>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Link>
        </div>

        <CardFooter className="project-footer" />
      </Card>

    </Col>
  );
};

export default CardProjeto;
