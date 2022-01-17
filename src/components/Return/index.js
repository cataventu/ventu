import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { checkModuloPermission, checkPagePermission } from '../../functions/sistema/permissoes';
import { upperCaseFirst, checkLocalStgLogin } from '../../functions/sistema';

function Return(props) {
  const [firstLoad, setFirst] = useState(true);
  const { googleUserData, location } = props;
  const GOOGLE_USER_DATA = localStorage.getItem('GOOGLE_USER_DATA');

  const checkPermission = useCallback((props, location) => {
    const item = location.pathname.split('/');
    const currentModulo = item[1];
    const currentPage = item[2];

    if (!checkModuloPermission(upperCaseFirst(currentModulo), props)) {
      return (<Redirect to="/auth/404" />);
    }
    if (!checkPagePermission(upperCaseFirst(currentModulo), upperCaseFirst(currentPage), props)) {
      return (<Redirect to="/auth/404" />);
    }
    return null;
  }, []);

  useEffect(() => {
    if (firstLoad) {
      checkLocalStgLogin(props);
      setFirst(false);
    }
  }, [props, firstLoad]);

  ////// USUARIO NAO LOGADO
  // if (!googleUserData.logIn && !GOOGLE_USER_DATA) { return (<Redirect to="/" />); }

  ////// AMBIENTE DE PRODUCAO
  if (!props.develop) { checkPermission(props, location); }

  return null;
}

export default withRouter(
  connect((store) => ({
    develop: store.sistema.develop,

    googleUserData: store.google.googleUserData,
    visibilityModulo: store.usuario.visibilityModulo,
    visibilityPageCadastro: store.usuario.visibilityPageCadastro,
    visibilityPageTabelas: store.usuario.visibilityPageTabelas,
    visibilityPageProjeto: store.usuario.visibilityPageProjeto,
    visibilityPageFinanceiro: store.usuario.visibilityPageFinanceiro,
    visibilityPageSistema: store.usuario.visibilityPageSistema,
    visibilitySubPages: store.usuario.visibilitySubPages,

  }))(Return),
);
