import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import WrapApp from './components/App';
import register from './registerServiceWorker';

ReactDOM.render(
  <WrapApp />,
  document.getElementById('root'),
);
register();