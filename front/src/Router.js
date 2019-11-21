import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import io from './logics/socketLogic';
import GlobalContext from './global.context';

import Home from './pages/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage';

import Room from './logics/room';
import User from './logics/user';

const Router = () => {
  const [room, setRoom] = useState(Room());
  const [user, setUser] = useState(User());
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <GlobalContext.Provider value={{ io, user, setUser, room, setRoom }}>
          <Route path="/main">
            <Main />
          </Route>
        </GlobalContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
