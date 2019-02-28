import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import CharacterPage from './components/CharacterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="character" component={CharacterPage}/>
  </Route>
);
