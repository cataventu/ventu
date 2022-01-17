import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Loading = ({ loading }) => {
  const [visibility, setVisibility] = useState('');

  useEffect(() => {
    if (!loading) {
      setVisibility(' hide');
    } else {
      setVisibility(' show');
    }
  }, [loading]);

  const classe = `text-center mt-5 ${visibility}`;

  return (
    <>
      <Row className={classe}>
        <Col sm={12}>
          <Spinner size="sm" className="text-roxo-ventu" />
          <span className="h3 ml-2 text-roxo-ventu">carregando...</span>
        </Col>
      </Row>
    </>
  );
};

export default Loading;
