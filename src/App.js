import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store/index';
import Routes from './routes/Routes';
import Aviso from './pages/sistema/aviso';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <ReduxToastr
      timeOut={5000}
      newestOnTop
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    <Aviso />
  </Provider>
);

export default App;
