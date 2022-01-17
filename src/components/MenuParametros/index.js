import React, { memo } from 'react';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function menuParametros({
  item_1, item_2, item_3, item_4,
}) {
  return (
    <>
      <Card>
        <ListGroup id="menu-lateral" className="cursor" flush>
          {/*** CATEGORIA ***/}
          <Link to="/sistema/parametros/categoria">
            <ListGroupItem className={item_4} action id="item-4">Categoria</ListGroupItem>
          </Link>
          {/***  CONSOLIDADOR ***/}
          <Link to="/sistema/parametros/consolidador">
            <ListGroupItem className={item_3} action id="item-3">Consolidador</ListGroupItem>
          </Link>
          {/*** GRUPO ***/}
          <Link to="/sistema/parametros/grupo">
            <ListGroupItem className={item_2} action id="item-2">Grupo</ListGroupItem>
          </Link>
          {/*** FIXO ***/}
          <Link to="/sistema/parametros/fixo">
            <ListGroupItem className={item_1} action id="item-1">Fixo</ListGroupItem>
          </Link>
        </ListGroup>
      </Card>
    </>
  );
}

export default memo((menuParametros));
