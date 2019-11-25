import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from './logics/socketLogic';
import GlobalContext from './global.context';

import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import SecretGame from './pages/SecretGame/SecretGame';

import Room from './logics/room';
import User from './logics/user';
import RouterStyle from './Router.style';

const Router = () => {
  const [room, setRoom] = useState(Room());
  const [user, setUser] = useState(User());
  return (
    <RouterStyle id="Router">
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
            <Route path="/secret:hash">
              <SecretGame />
            </Route>
          </GlobalContext.Provider>
        </Switch>
      </BrowserRouter>
    </RouterStyle>
  );
};

export default Router;
