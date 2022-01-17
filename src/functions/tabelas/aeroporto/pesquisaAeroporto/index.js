const pesquisaAeroporto = async (props) => {
  const pesquisa = document.getElementById('aeroporto-pesquisa').value;
  const newPesquisa = {
    chave: pesquisa, nome: '', municipio: '', uf: '', pais: '', situacao: '', alt_dhsis_maior: '', alt_dhsis_menor: '',
  };

  const { dispatch } = props;
  await dispatch({ type: '@NEW_AEROPORTO_FILTRO', payload: newPesquisa });
  dispatch({ type: '@SET_AEROPORTO_FILTRO_FLAG_TRUE' });
};

export default pesquisaAeroporto;
