import React, { useReducer, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from './logics/socketLogic';
import GlobalContext from './global.context';

import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <GlobalContext.Provider
            value={{ io, user, setUser, room, setRoom, changePage, page }}
          >
            <Route path="/main">
              <Main />
            </Route>
          </GlobalContext.Provider>
        </Switch>
      </BrowserRouter>
    </RouterStyle>
  );
};

export default Router;
