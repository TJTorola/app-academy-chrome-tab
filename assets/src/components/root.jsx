import React from 'react';
import { Provider } from 'react-redux';

import App from './app';
import configureStore from 'store/configure';

const store = configureStore();

export default () => (
	<Provider store={ store }>
		<App />
	</Provider>
);