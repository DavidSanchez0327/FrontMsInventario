import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cliente from "./Client/Cliente";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.render(<Cliente />, div);
  ReactDOM.unmountComponentAtNode(div);
});
