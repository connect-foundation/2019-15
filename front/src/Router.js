import React, { useRef, useState, useReducer } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Home from 'pages/Home/Home';
import GlobalContext from 'global.context';
import Main from 'pages/Main/Main';
import MyPage from 'pages/MyPage/MyPage';
import PrivateGame from 'pages/PrivateGame/PrivateGame';
import PublicGame from 'pages/PublicGame/PublicGame';
import SettingPage from 'pages/Setting/Setting';
import Waiting from 'pages/Waiting/Waiting';
import Room from 'logics/room';
import User from 'logics/user';
import RouterStyle from 'Router.style';
import parseCookies from 'util/cookie';
import { connectSocket } from 'logics/socketLogic/online';

const changeUser = (prev, newUser) => {
  return { ...prev, ...newUser };
};

const Router = () => {
  const { jwt: jwtToken } = parseCookies();

  let userInitial = new User();
  if (jwtToken) {
    const { id, nickname } = jwt.decode(jwtToken);
    userInitial = new User(nickname, id);
  }
  const [room, setRoom] = useState(new Room());
  const [user, userDispatch] = useReducer(changeUser, userInitial);
  const [gameSocket, setGameSocket] = useState(null);
  const onlineSocket = useRef(null);
  if (!onlineSocket.current) onlineSocket.current = connectSocket();

  return (
    <RouterStyle id="Router">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <GlobalContext.Provider
            value={{
              onlineSocket: onlineSocket.current,
              user,
              userDispatch,
              room,
              setRoom,
              gameSocket,
              setGameSocket,
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
        </Switch>
      </HashRouter>
    </RouterStyle>
  );
};

export default Router;
