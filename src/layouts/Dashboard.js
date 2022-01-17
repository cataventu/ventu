import React from 'react';
import {
  Wrapper,
  Sidebar,
  Main,
  Navbar,
  Content,
  Footer,
  Return,
} from '../components';

const Dashboard = ({ children }) => (
  <>
    <Wrapper>
      <Return />
      <Sidebar />
      <Main>
        <Navbar {...children.props} />
        <Content>{ children }</Content>
        <Footer />
      </Main>
    </Wrapper>
  </>
);

export default Dashboard;
