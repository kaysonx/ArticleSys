import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './ui/App';

injectTapEventPlugin();

render(<App />, document.getElementById('root'));
