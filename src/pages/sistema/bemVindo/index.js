import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { hideSidebar } from '../../../redux/actions/sidebarActions';
import { getDados } from '../../../functions/sistema';
import './style.css';

function BemVindo(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideSidebar());
  }, [dispatch]);

  useEffect(() => {
    async function getTables() {
      ////// CADASTRO
      await getDados(props, '/TsmSISTEMA/ESTADO_CIVIL_TABELA/', '@GET_ESTADO_CIVIL');
      await getDados(props, '/TsmSISTEMA/GENERO_TABELA/', '@GET_SEXO');
      await getDados(props, '/TsmSISTEMA/PARENTESCO_TABELA/', '@GET_PARENTESCO');
      await getDados(props, '/TsmSISTEMA/PESSOA_TABELA/', '@GET_PESSOA');
      await getDados(props, '/TsmSISTEMA/TIPO_CONTATO_TABELA/', '@GET_TIPO_RCONTATO');
      await getDados(props, '/TsmSISTEMA/TIPO_ENDERECOPF_TABELA/', '@GET_TIPO_RENDERECO_PF');
      await getDados(props, '/TsmSISTEMA/TIPO_ENDERECOPJ_TABELA/', '@GET_TIPO_RENDERECO_PJ');

      ////// FINANCEIRO
      await getDados(props, '/TsmSISTEMA/STATUS_MOVIMENTO_TABELA', '@GET_STATUS_MOVIMENTO');
      await getDados(props, '/TsmSISTEMA/TRANSACAO_TABELA', '@GET_TRANSACAO');
      await getDados(props, '/TsmSISTEMA/DOCUMENTO_TABELA/1', '@GET_TIPO_DOCUMENTO');
      await getDados(props, '/TsmSISTEMA/TIPO_NEGOCIACAO_TABELA/1', '@GET_TIPO_NEGOCIACAO');
      await getDados(props, '/TsmSISTEMA/TIPO_NEGOCIACAO_TABELA/2', '@GET_TIPO_NEGOCIACAO_OPERADORES');
      await getDados(props, '/TsmSISTEMA/FORMA_TABELA/1', '@GET_TIPO_FORMA');
      await getDados(props, '/TsmSISTEMA/TIPO_CONTA_TABELA', '@GET_TIPO_CONTA');
      await getDados(props, '/TsmSISTEMA/TIPO_GRUPO_TABELA/1', '@GET_TIPO_GRUPO');
      await getDados(props, '/TsmSISTEMA/TIPO_CARTAO_TABELA/', '@GET_TIPO_CARTAO');
      await getDados(props, '/TsmSISTEMA/TIPO_SERVICO_TABELA', '@GET_TIPO_SERVICO_LISTA');
      await getDados(props, '/TsmSISTEMA/DATA_MOVIMENTO_TABELA/', '@GET_DATA');

      await getDados(props, '/TsmCONTA/PESQUISA/', '@GET_CONTA_LISTA');
      //await getDados(props, '/TsmMOEDA/PESQUISA/CODIGO','@GET_MOEDA_LISTA');
      //await getDados(props, '/TsmMOEDA/PESQUISA/DESCRICAO','@GET_MOEDA_LISTA');
      await getDados(props, '/TsmGRUPO/PESQUISA/', '@GET_GRUPO_LISTA');

      ////// PROJETO
      await getDados(props, '/TsmSISTEMA/TIPO_PROJETO_TABELA', '@GET_TIPO_PROJETO');
      await getDados(props, '/TsmSISTEMA/STATUS_PROJETO_TABELA', '@GET_STATUS_PROJETO');
      ////// PARTICIPANTES
      await getDados(props, '/TsmSISTEMA/ATUACAO_PARTICIPANTE_TABELA', '@GET_ATUACAO_PARTICIPANTE');
      ////// RSVP
      await getDados(props, '/TsmSISTEMA/STATUS_RSVP_TABELA', '@GET_STATUS_RSVP');
      ////// OCORRENCIA
      await getDados(props, '/TsmSISTEMA/STATUS_OCORRENCIA_TABELA', '@GET_STATUS_OCORRENCIA');

      ////// TABELAS -------- PERFIL
      await getDados(props, 'TsmSISTEMA/TIPO_PERFIL_TABELA', '@GET_TIPO_PERFIL_LISTA');
    }

    getTables();
  }, [props]);

  return (
    <>
      <div className="welcome-container">
        <p className="welcome-subtitle">sistema integrado</p>
        <p className="welcome-title">CATAVENTU</p>
        <p className="welcome-phrase">Transformando experiências em aprendizado</p>
      </div>

      <div className="bg-welcome" />
    </>
  );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  sidebar: state.sidebar,

  visibilityPageSistema: state.usuario.visibilityPageSistema,
  auth: state.sistema.auth,
});
export default connect(() => (mapState))(BemVindo);
