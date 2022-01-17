import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';

const Page404 = () => (
  <div className="text-center">
    <h1 className="display-1 font-weight-bold">404</h1>
    <p className="h1">Página não encontrada</p>
    <p className="h2 font-weight-normal mt-3 mb-4">
          A página que você está procurando foi removida.
    </p>
    <Link to="/tabelas/aeroporto">
      <Button color="primary" size="lg">
            Retornar ao site
      </Button>
    </Link>
  </div>
);

export default Page404;
