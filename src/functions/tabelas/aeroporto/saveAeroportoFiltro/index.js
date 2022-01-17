import { toggleFiltro } from '../../../sistema';

const saveAeroportoFiltro = async (props, formDados) => {
  ////// CONSTANTES
  const { dispatch } = props;
  const {
    aeroporto, municipio, uf, pais, situacao, alt_dhsis_maior, alt_dhsis_menor,
  } = formDados;

  ////// SALVAR NO LOCAL STORAGE
  localStorage.setItem('TABELAS_AEROPORTO_FILTRO', JSON.stringify(formDados));

  ////// ATIVA FILTRO //////
  if (aeroporto !== '' || municipio !== '' || uf !== '' || pais !== '' || situacao !== '' || alt_dhsis_maior !== '' || alt_dhsis_menor !== '') {
    dispatch({ type: '@SET_AEROPORTO_FILTRO_ATIVO' });
  } else {
    dispatch({ type: '@SET_AEROPORTO_FILTRO_INATIVO' });
  }
  ////// FLAG PARA RECARREGAMENTO DA PAGINA
  dispatch({ type: '@SET_AEROPORTO_FILTRO_FLAG_TRUE' });
  ////// FECHA A TELA DE FILTRO
  toggleFiltro(props, 'tabela-aeroporto-filtro');
};

export default saveAeroportoFiltro;
