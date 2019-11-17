import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import MyPage from './pages/MyPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
