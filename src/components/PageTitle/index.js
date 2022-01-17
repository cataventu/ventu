import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

function handleLink(linkTo, action, history, dispatch) {
  if (action) {
    dispatch({ type: action });
  } else {
    switch (linkTo) {
      case undefined: history.goBack(); break;
      default: history.push(linkTo);
    }
  }
}

const PageTitle = ({
  voltar, linkTo, title, subtitle, buttons, action, history, dispatch,
}) => {
  let classVoltar = 'cursor show';
  const visible = voltar;

  if (visible === false) { classVoltar = 'cursor hide'; }

  return (
    <>
      <Row className="d-print-none mb-3">
        <Col sm={12} className="pagetitle-container">

          <div className="pagetitle-container">
            <div className="pagetitle-voltar">
              <FontAwesomeIcon
                icon={faCaretLeft}
                className={`h2 p-0 m-0 text-roxo-ventu ${classVoltar} `}
                onClick={() => handleLink(linkTo, action, history, dispatch)}
              />
            </div>

            <div>
              <span className="pl-2 text-roxo-ventu h2">{ title }</span>
              <span className="pl-2 text-roxo-ventu h5">{ subtitle }</span>
            </div>
          </div>

          <div>
            { buttons }
          </div>

        </Col>
      </Row>
    </>
  );
};

export default PageTitle;
