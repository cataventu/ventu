import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faEdit, faTrashAlt, faFileAlt, faPaperclip, faLayerGroup,
  faDivide, faArrowsAltH, faClone, faHandshake, faFileExcel, faEye,
} from '@fortawesome/free-solid-svg-icons';

import { checkFunctionsPermission } from '../../functions/sistema/permissoes';

const TableButton = ({
  permission, click, action, disable,
}) => {
  const props = permission;

  let Opacity;
  let Icone;
  let Color;
  let Margin;
  let Visibility = checkFunctionsPermission(props, action);

  if (disable) { Opacity = ' disable '; } else { Opacity = ' '; }

  switch (action) {
    case 'Incluir':
      Icone = faPlus;
      Color = ' text-success ';
      Margin = ' mr-1 ';
      break;
    case 'Editar':
      Icone = faEdit;
      Color = ' text-blue ';
      Margin = ' mr-1 ';
      break;
    case 'Excluir':
      Icone = faTrashAlt;
      Color = ' text-danger ';
      Margin = ' mr-1 ';
      break;
    case 'Consultar':
      Icone = faFileAlt;
      Color = ' text-muted ';
      Margin = ' mr-2 ';
      break;
    case 'Anexar':
      Icone = faPaperclip;
      Color = ' text-muted ';
      Margin = ' mr-2 ';
      break;
    case 'Agrupar':
      Icone = faLayerGroup;
      Color = ' text-muted ';
      Margin = ' mr-2 ';
      break;
    case 'Parcelar':
      Icone = faDivide;
      Color = ' text-blue ';
      Margin = ' mr-2 ';
      break;
    case 'Excel':
      Icone = faFileExcel;
      Color = ' text-green ';
      Margin = ' ml-2 mr-2 ';
      Visibility = ' show';
      break;
    case 'Comparar':
      Icone = faArrowsAltH;
      Color = ' text-blue ';
      Margin = ' mr-2 ';
      Visibility = ' show';
      break;
    case 'Serviços':
      Icone = faHandshake;
      Color = ' text-muted ';
      Margin = ' mr-2 ';
      Visibility = ' show';
      break;
    case 'Duplicar':
      Icone = faClone;
      Color = ' text-success ';
      Margin = ' mr-2 ';
      Visibility = ' show';
      break;
      case 'Ver':
      Icone = faEye;
      Color = ' text-green ';
      Margin = ' mr-2 ';
      Visibility = ' show';
      break;
    default: return null;
  }

  const classButton = 'h4 p-0 m-0 ml-1 cursor float-right';

  return (
    <>
      <FontAwesomeIcon
        key={action}
        icon={Icone}
        onClick={click}
        className={`${classButton} ${Margin} ${Color} ${Visibility} ${Opacity}`}
        title={action.toUpperCase()}
      />
    </>
  );
};

export default memo(TableButton);
