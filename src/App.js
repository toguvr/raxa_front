import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';
import Routes from './routes';
import history from './config/history';

import { ToastContainerStyled, CssStyle } from './styles/global';
import store from './config/createStore';
// import { registerServiceWorker } from './serviceWorker';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        {/* <CssStyle> */}
        <Routes />
        {/* </CssStyle> */}
        <ToastContainerStyled autoClose={5000} />
      </Router>
    </Provider>
  );
}

export default App;
