import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faPlus, faFilter, faCoins, faEdit, faFilePdf, faFileExcel, faSave, faExchangeAlt,faUserTie,faChartPie,
  faTimes, faEraser, faLayerGroup, faHdd, faUserFriends, faUser, faSearch, faDownload, faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

import { checkFunctionsPermission } from '../../functions/sistema/permissoes';

function Buttons({
  permission, title, description, position, onClick, linkTo, color,
}) {
  const props = permission;
  const action = description;

  let Icone;
  let Visibility = ' show ';
  let direction = 'right ';

  if (props !== undefined) {
    Visibility = checkFunctionsPermission(props, action);
  }

  if (position !== undefined) {
    direction = position;
  }

  switch (action) {
    case 'Incluir': Icone = faPlus; break;
    case 'Cadastrar': Icone = faPlus; break;
    case 'Incluir serviço': Icone = faPlus; Visibility = ' show '; break;
    case 'Agrupar': Icone = faLayerGroup; Visibility = ' show '; break;
    case 'Limpar': Icone = faEraser; Visibility = ' show '; break;
    case 'Filtrar': Icone = faFilter; Visibility = ' show '; break;
    case 'Fechar': Icone = faTimes; Visibility = ' show '; break;
    case 'Salvar': Icone = faSave; Visibility = ' show '; break;
    case 'Download': Icone = faFilePdf; Visibility = ' show '; break;
    case 'Download Planilha': Icone = faFileExcel; Visibility = ' show '; break;
    case 'BACEN': Icone = faFilePdf; Visibility = ' show '; break;
    case 'Gerar fixos': Icone = faCoins; Visibility = ' show '; break;
    case 'Importar lista': Icone = faFileExcel; Visibility = ' show '; break;
    case 'Novo Cadastro': Icone = faUser; Visibility = ' show '; break;
    case 'Consolidador': Icone = faSearch; Visibility = ' show btn-sm'; break;
    case 'Importar': Icone = faDownload; Visibility = ' show '; break;
    case 'Replicar': Icone = faUserFriends; break;
    case 'Processar': Icone = faHdd; Visibility = ' show '; break;
    case 'Calcular': Icone = faHdd; Visibility = ' show '; break;
    case 'Editar form': Icone = faEdit; Visibility = ' show '; break;
    case 'Gerar dossiê': Icone = faFileExcel; Visibility = ' show '; break;
    case 'Consultar dossiê': Icone = faFileAlt; Visibility = ' show '; break;
    case 'Transferir': Icone = faExchangeAlt; Visibility = ' show '; break;
    case 'Entrar' : Icone = faUserTie; Visibility = ' show '; break;
    case 'Alterar' : Icone = faUserTie; Visibility = ' show '; break;
    case 'Login Google' : Icone = faUserTie; Visibility = ' show '; break;
    case 'Dashboard': Icone = faChartPie; break;
    default: return null;
  }

  const classButton = `ml-3 mt-0 float-${direction} btn button-shadow btn-${color} ${Visibility}`;

  return (
    <Link to={linkTo}>
      <button type="button" className={classButton} title={title} onClick={onClick}>
        <FontAwesomeIcon icon={Icone} className="p-0 m-0 cursor mr-2 mt-1" />
        {description}
      </button>
    </Link>
  );
}

export default memo(Buttons);
