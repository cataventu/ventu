import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Badge, Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import routes from '../../routes/index';
import logo from '../../assets/img/ventu/Cataventu_horizontal_white.png';
import { checkCategorySidebar, checkModuloPermission, checkPagePermission } from '../../functions/sistema/permissoes';

const SidebarCategory = withRouter(
  ({
    name, props, badgeColor, badgeText, icon: Icon, isOpen, children, onClick, location, to,
  }) => {
    const getSidebarItemClass = (path) => (location.pathname.indexOf(path) !== -1
        || (location.pathname === '/' && path === '/dashboard')
      ? 'active'
      : '');
    return (
      <li className={`sidebar-item ${checkCategorySidebar(name, props)}${getSidebarItemClass(to)}`}>
        <span
          data-toggle="collapse"
          className={`sidebar-link ${!isOpen ? 'collapsed' : ''}`}
          onClick={onClick}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <Icon size={18} className="align-middle mr-3" />
          <span className="align-middle">{name}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className="sidebar-dropdown list-unstyled">
            {children}
          </ul>
        </Collapse>
      </li>
    );
  },
);

const SidebarItem = withRouter(
  ({
    name, badgeColor, badgeText, icon: Icon, to,
  }) => (
    <li className="sidebar-item">
      <NavLink
        to={to}
        className="sidebar-link"
        activeClassName="active"
        //onClickCapture={ () => dispatch(toggleSidebar()) }
      >
        {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
        {name}
        {badgeColor && badgeText ? (
          <Badge color={badgeColor} size={18} className="sidebar-badge">
            {badgeText}
          </Badge>
        ) : null}
      </NavLink>
    </li>
  ),
);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    routes.forEach((route, index) => {
      this.setState(() => ({
        [index]: false,
      }));
    });
  }

  toggle = (index) => {
    //Collapse all elements
    Object.keys(this.state).forEach(
      (item) => this.state[index]
        || this.setState(() => ({
          [item]: false,
        })),
    );

    //Toggle selected element
    this.setState((state) => ({
      [index]: !state[index],
    }));
  };

  render() {
    const { sidebar } = this.props;

    return (
      <nav
        id="sidebar"
        className={
          `d-print-none sidebar${
            sidebar.isOpen ? ' ' : ' toggled'
          }${sidebar.isSticky ? ' sidebar-sticky' : ''}`
        }
      >
        <div className="sidebar-content">
          <PerfectScrollbar>
            <a className="sidebar-brand" href="/">
              <img src={logo} className="logo-ventu-sidebar" alt="Logo CataVentu" />
            </a>

            <ul className="sidebar-nav">
              { routes.map((category, index) => (
                <React.Fragment key={index}>
                  { category.header && checkModuloPermission(category.name, this.props) ? (
                    <li className="sidebar-header">
                      {' '}
                      { category.header }
                      {' '}
                    </li>
                  ) : null }

                  { category.children ? (
                    <SidebarCategory
                      name={category.name}
                      props={this.props}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={this.state[index]}
                      onClick={() => this.toggle(index)}
                    >
                      { category.children.map((route, index) => (
                        checkPagePermission(category.name, route.name, this.props)

                          ? (
                            <SidebarItem
                              key={index}
                              name={route.name}
                              to={route.path}
                              badgeColor={route.badgeColor}
                              badgeText={route.badgeText}
                              dispatch={this.props.dispatch}
                            />
                          )
                          : null

                      )) }
                    </SidebarCategory>
                  ) : (

                    <SidebarItem
                      name={category.name}
                      to={category.path}
                      icon={category.icon}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      dispatch={this.props.dispatch}
                    />

                  ) }

                </React.Fragment>
              ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect((store) => ({
    visibilityModulo: store.usuario.visibilityModulo,
    visibilityPageCadastro: store.usuario.visibilityPageCadastro,
    visibilityPageTabelas: store.usuario.visibilityPageTabelas,
    visibilityPageProjeto: store.usuario.visibilityPageProjeto,
    visibilityPageFinanceiro: store.usuario.visibilityPageFinanceiro,
    visibilityPageSistema: store.usuario.visibilityPageSistema,

    sidebar: store.sidebar,
    layout: store.layout,
  }))(Sidebar),
);
