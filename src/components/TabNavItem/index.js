///////// IMPORTS ///////////////
/////////////////////////////////
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavItem, NavLink } from 'reactstrap';

function TabNavItem({
  ativo, icone, label, url,
}) {
  const [visibilityLabel, set_visibilityLabel] = useState('tab-nav-item-label');

  return (
    <NavItem title={label}>
      <Link to={url} alt="">
        <NavLink
          onMouseEnter={() => set_visibilityLabel('')}
          onMouseLeave={() => set_visibilityLabel('tab-nav-item-label')}
          className={ativo}
        >
          <FontAwesomeIcon icon={icone} />
          <span className={`${visibilityLabel} ml-2`}>{ label.toString().toUpperCase() }</span>
        </NavLink>
      </Link>
    </NavItem>
  );
}

export default memo(TabNavItem);
