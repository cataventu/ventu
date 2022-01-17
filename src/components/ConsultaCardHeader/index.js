import React from 'react';
import { CardHeader, CardTitle } from 'reactstrap';

const ConsultaCardHeader = ({ titulo }) => (
  <CardHeader className="p-2 pl-3 pt-3">
    <CardTitle tag="h4" className="mb-0 "><p className="text-muted">{ titulo }</p></CardTitle>
  </CardHeader>
);

export default ConsultaCardHeader;
