import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister as unregisterServiceWorker } from 'register-service-worker';

import App from './App';

/// disable cache react
/// https://gist.github.com/kirillshevch/a7d778a6aaa788149ae86a9b313cb0ad

ReactDOM.render(<App />, document.getElementById('root'));
unregisterServiceWorker();
