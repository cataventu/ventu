export const pesquisaUsuario = async (props) => {
  const pesquisa = document.getElementById('usuario-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, descricao: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_USUARIO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_USUARIO_FILTRO_FLAG_TRUE' });
};

export default pesquisaUsuario;
