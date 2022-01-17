import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import {  Row,  Col,  Collapse,  Navbar,  Nav,  UncontrolledDropdown,  DropdownToggle,
//DropdownMenu, DropdownItem,  ListGroup,  ListGroupItem,  Form,  Input } from "reactstrap";
import {
  Collapse, Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
//import {  AlertCircle,  Bell,  Home,  User,  UserPlus, Settings, LogOut, HelpCircle } from "react-feather";
import {
  User, Settings, LogOut, HelpCircle,
} from 'react-feather';
//import { GoogleLogout } from 'react-google-login';
import { signOut } from '../../functions/sistema/google';
import { toggleSidebar } from '../../redux/actions/sidebarActions';
//import * as functions from '../functions/sistema/google';
import logo from '../../assets/img/ventu/Cataventu_icon.png';

////// Navbar Notifications //////
//////////////////////////////////
/*
  /// Mensagens
  const notifications = [
    {
      type: "important",
      title: "Update completed",
      description: "Restart server 12 to complete the update.",
      time: "2h ago"
    },
    {
      type: "default",
      title: "Lorem ipsum",
      description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
      time: "6h ago"
    },
    {
      type: "login",
      title: "Login from 192.186.1.1",
      description: "",
      time: "6h ago"
    },
    {
      type: "request",
      title: "New connection",
      description: "Anna accepted your request.",
      time: "12h ago"
    }
  ];
*/
/// Caixa de Mensagens
//const NavbarDropdown = ({ children, count, showBadge, header, footer, icon: Icon }) => (
//<UncontrolledDropdown nav inNavbar className="mr-2">
//<DropdownToggle nav className="nav-icon dropdown-toggle">
//<div className="position-relative">
//<Icon className="align-middle" size={18} />
//{showBadge ? <span className="indicator">{count}</span> : null}
//</div>
//</DropdownToggle>
//<DropdownMenu right className="dropdown-menu-lg py-0">
//<div className="dropdown-menu-header position-relative">
//{count} {header}
//</div>
//<ListGroup>{children}</ListGroup>
//<DropdownItem header className="dropdown-menu-footer">
//<span className="text-muted">{footer}</span>
//</DropdownItem>
//</DropdownMenu>
//</UncontrolledDropdown>
//);

/// Corpo da Mensagem
//const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
//<ListGroupItem>
//<Row noGutters className="align-items-center">
//<Col xs={2}>{icon}</Col>
//<Col xs={10} className={spacing ? "pl-2" : null}>
//<div className="text-dark">{title}</div>
//<div className="text-muted small mt-1">{description}</div>
//<div className="text-muted small mt-1">{time}</div>
//</Col>
//</Row>
//</ListGroupItem>
//);
//////////////////////////////////

////// Navbar completo ///////////
//////////////////////////////////

const NavbarComponent = (props) => (

  <Navbar color="white" className="navbar-ventu d-print-none" light expand>
    <span
      className="sidebar-toggle d-flex mr-2"
      onClick={() => {
        props.dispatch(toggleSidebar());
      }}
    >
      <i className="hamburger align-self-center" />
    </span>

    <img src={logo} className="logo-ventu mr-2 ml-2" alt="Logo CataVentu" />

    {/*** Barra Busca ***/}
    {/*
      <Form inline>
        <Input
          type="text"
          placeholder="Search projects..."
          aria-label="Search"
          className="form-control-no-border mr-sm-2"
        />
      </Form>
    */}

    <Collapse navbar>
      <Nav className="ml-auto" navbar>

        {/*** Notificação ***/}
        {/*}
            <NavbarDropdown
              header="New Notifications"
              footer="Show all notifications"
              icon={Bell}
              count={notifications.length}
              showBadge
            >
              {notifications.map((item, key) => {
                let icon = <Bell size={18} className="text-warning" />;

                if (item.type === "important") {
                  icon = <AlertCircle size={18} className="text-danger" />;
                }

                if (item.type === "login") {
                  icon = <Home size={18} className="text-primary" />;
                }

                if (item.type === "request") {
                  icon = <UserPlus size={18} className="text-success" />;
                }

                return (
                  <NavbarDropdownItem
                    key={key}
                    icon={icon}
                    title={item.title}
                    description={item.description}
                    time={item.time}
                  />
                );
              })}
            </NavbarDropdown>
            */}

        {/**** Avatar e Nome ****/}
        {/***********************/}
        <UncontrolledDropdown nav inNavbar>

          <span className="d-none d-sm-inline-block">
            <DropdownToggle nav caret>
              <img src={logo} className="logo-ventu mr-2 ml-2" alt="Logo CataVentu" />
              {/*<img
                // src={props.googleUserData.imageUrl}
                // alt={props.googleUserData.name}
                className="avatar img-fluid rounded-circle mr-1"
              /> */}
              {/*<span className="text-dark ml-2 mr-2">{ props.googleUserData.name }</span> */}
              <span className="text-dark ml-2 mr-2">{ props.loginUserData.email }</span>
            </DropdownToggle>
          </span>

          <DropdownMenu right>
            <DropdownItem>
              {' '}
              <User size={18} className="align-middle mr-2" />
              {' '}
              <Link to="/sistema/alterarSenha/ficha">
Alterar Senha
                {' '}
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            {/*<DropdownItem onClick = { () => props.history.push("/sistema/parametro") }> <Settings size={18} className="align-middle mr-2" /> Configurações </DropdownItem> */}
            <DropdownItem>
              <Link to="/sistema/parametros">
                <Settings size={18} className="align-middle mr-2" />
                {' '}
Configurações
              </Link>
            </DropdownItem>
            <DropdownItem>
              {' '}
              <HelpCircle size={18} className="align-middle mr-2" />
              {' '}
Ajuda
            </DropdownItem>
            {/*<GoogleLogout
              clientId={props.gmailClientID}
              buttonText="Logout"
              //onLogoutSuccess={ () => functions.signOut(this.props) }
              //onFailure={() => console.log('error')}
              onLogoutSuccess={() => signOut(props)}
              render={(renderProps) => (
                <DropdownItem onClick={renderProps.onClick}>
                  {' '}
                  <LogOut size={18} className="align-middle mr-2" />
                  {' '}
Sair
                </DropdownItem>
              )}
            /> */}
            <DropdownItem onClick={() => signOut(props)}>
              <LogOut size={18} className="align-middle mr-2" />
              Sair
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>
);

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
  loginUserData: state.login.loginUserData,
  gmailClientID: state.google.gmailClientID,
  googleUserData: state.google.googleUserData,
});
export default connect(() => (mapState))(NavbarComponent);
