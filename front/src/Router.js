import React, { useState, useReducer } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Home from 'pages/Home/Home';
import GlobalContext from 'global.context';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import PrivateGame from 'pages/PrivateGame';
import PublicGame from 'pages/PublicGame';
import SettingPage from 'pages/Setting';
import Waiting from 'pages/Waiting';
import Room from 'utils/catchmymind/Room';
import User from 'utils/catchmymind/User';
import RouterStyle from 'Router.style';
import parseCookies from 'utils/cookie';
import useInitSocket from 'hooks/Socket/useInitSocket';

const changeUser = (prev, newUser) => {
  return { ...prev, ...newUser };
};

const Router = () => {
  const { jwt: jwtToken } = parseCookies();

  let userInitial = new User();
  if (jwtToken) {
    const { id, nickname, avatar } = jwt.decode(jwtToken);
    userInitial = new User(nickname, id, avatar);
  }

  const [isLogin, setIsLogin] = useState(false);
  const [room, setRoom] = useState(new Room());
  const [user, userDispatch] = useReducer(changeUser, userInitial);
  const [gameSocket, setGameSocket] = useState(null);
  const [onlineSocket] = useInitSocket('/online');
  return (
    <RouterStyle id="Router">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <GlobalContext.Provider
            value={{
              onlineSocket,
              user,
              userDispatch,
              room,
              setRoom,
              gameSocket,
              setGameSocket,
              isLogin,
              setIsLogin,
            }}
          >
            <Route path="/mypage">
              <MyPage />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/public">
              <PublicGame />
            </Route>
            <Route path="/setting:hash">
              <SettingPage />
            </Route>
            <Route path="/waiting:hash">
              <Waiting />
            </Route>
            <Route path="/private:hash">
              <PrivateGame />
            </Route>
          </GlobalContext.Provider>
          <Route>
            <Redirect to="/main" />
          </Route>
        </Switch>
      </HashRouter>
    </RouterStyle>
  );
};

export default Router;
