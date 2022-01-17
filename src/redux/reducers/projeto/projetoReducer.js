import * as initial from '../../initials/projeto/projeto';

const initialState = {
  filtroColor: ['filtro-inativo', 'filtro-ativo'],
  filtroAtivo: 0, //usado na cor do botão filtro
  filtroFlag: false, //usado p/ ativar a busca de novos dados no componentWillUpdate()

  tableData: initial.tableData,
  projetoFichaData: initial.projetoFichaData,
  projetoConsulta: initial.projetoConsulta,

  nomeProjeto: '',
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //////// CONSULTA
    case '@SET_PROJETO_CONSULTA': return { ...state, projetoConsulta: actions.payload };
    ////// PAGINA
    case '@GET_PROJETO_PAGINA': return { ...state, tableData: actions.payload };
    ////// FICHA
    case '@GET_PROJETO_FICHA': return { ...state, projetoFichaData: actions.payload };
    ////// FILTRO

    case '@SET_PROJETO_FILTRO_ATIVO': return { ...state, filtroAtivo: 1 };
    case '@SET_PROJETO_FILTRO_INATIVO': return { ...state, filtroAtivo: 0 };
    case '@SET_PROJETO_FILTRO_FLAG_FALSE': return { ...state, filtroFlag: false };
    case '@SET_PROJETO_FILTRO_FLAG_TRUE': return { ...state, filtroFlag: true };
    ////// RESET
    case '@RESET_PROJETO_FICHA': return { ...state, projetoFichaData: initial.projetoFichaData };

    ////// NOME PROJETO
    case '@SET_NOMEPROJETO': return { ...state, nomeProjeto: actions.payload };
    case '@RESET_NOMEPROJETO': return { ...state, nomeProjeto: '' };

    default: return state;
  }
}
