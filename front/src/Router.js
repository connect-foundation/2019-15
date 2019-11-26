
import React, { useState } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import io from './logics/socketLogic';
import GlobalContext from './global.context';

import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import SecretGame from './pages/SecretGame/SecretGame';
import GamePlay from './pages/GamePlay/GamePlay';

import Room from './logics/room';
import User from './logics/user';
import RouterStyle from './Router.style';
import GamePlay from './pages/Main/GamePlay';
import MainPage from './pages/Main/MainPage';

const routingPages = (prev, pageName) => {
  switch (pageName) {
    case 'mypage':
      return <MyPage />;
    case 'gameplay':
      return <GamePlay />;
    default:
      return <MainPage />;
  }
};

const Router = () => {
  const [page, changePage] = useReducer(routingPages, <MainPage />);
  const [room, setRoom] = useState(Room());
  const [user, setUser] = useState(User());
  return (
    <RouterStyle id="Router">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <GlobalContext.Provider value={{ io, user, setUser, room, setRoom }}>
            <Route path="/gameplay">
              <GamePlay />
            </Route>
            <Route path="/mypage">
              <MyPage />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/secret:hash">
              <SecretGame />
            </Route>
          </GlobalContext.Provider>
        </Switch>
      </HashRouter>
    </RouterStyle>
  );
};

export default Router;
