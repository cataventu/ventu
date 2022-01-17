//import React, { Component, useState, useEffect } from 'react';
import React from 'react';
/// import Loading from "./Loading";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hideSidebar } from '../../redux/actions/sidebarActions';

const handleSidebar = (dispatch, sidebar) => {
  if (sidebar.isOpen) { dispatch(hideSidebar()); }
};

const Cont = ({ children, dispatch, sidebar }) => {
  //const [contentVisibility, setContentVisibility] = useState(' hide');
  //const [loadingVisibility, setloadingVisibility] = useState(true);

  //useEffect( () => {

  //setTimeout(handleLoading, 300);

  //function handleLoading() {
  //if (!loading.isLoading) {
  //setloadingVisibility(false);
  //setContentVisibility(' show');

  //} else {
  //setloadingVisibility(true);
  //setContentVisibility(' hide');
  //}
  //}

  //},[loading]);

  //const classe = "pb-4 pt-3 pl-4 pr-4 " + contentVisibility;
  const classe = 'pb-4 pt-3 pl-4 pr-4';

  return (
    <>
      {/*<Loading loading={loadingVisibility} /> */}
      <div onClick={() => handleSidebar(dispatch, sidebar)} className={classe}>{ children }</div>
      <div className="bg-sistema d-print-none" />
    </>
  );
};

const Content = (props) => (
  <>
    <Cont {...props} />
  </>
);

export default withRouter(
  connect((store) => ({
    sidebar: store.sidebar,
    loading: store.loading,
  }))(Content),
);
