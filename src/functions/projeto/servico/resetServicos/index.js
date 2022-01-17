//import api from '../../../../services/api';

const resetServicos = async (props) => {
  const { dispatch } = props;
  dispatch({ type: '@RESET_PROSERVICO_PAGINA' });
  dispatch({ type: '@RESET_PROSERVICO_FICHA' });

  dispatch({ type: '@RESET_AUTOCOMPLETAR' });
};

export default resetServicos;
