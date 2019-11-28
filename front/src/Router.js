import React, { useState, useReducer } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import io from './logics/socketLogic';
import GlobalContext from './global.context';
import GamePlayContext from './GamePlay.context';

import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import SecretGame from './pages/SecretGame/SecretGame';
import GamePlay from './pages/GamePlay/GamePlay';
import Room from './logics/room';
import User from './logics/user';
import RouterStyle from './Router.style';
import parseCookies from './util/cookie';

const changeUser = (prev, newUser) => {
  return { ...prev, ...newUser };
};

const Router = () => {
  const { jwt: jwtToken } = parseCookies();

  let userInitial = new User();
  if (jwtToken) {
    const { id, nickname } = jwt.decode(jwtToken);
    userInitial = new User(nickname, null, id);
  }
  const [room, setRoom] = useState(new Room());
  const [user, setUser] = useReducer(changeUser, userInitial);
  const [onlineSocket, setOnlineSocket] = useState(null);

  const [userList, setUserList] = useState([]);
  const [painter, setPainter] = useState(null);

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
              setOnlineSocket,
              io,
              user,
              setUser,
              room,
              setRoom,
            }}
          >
            <Route path="/gameplay">
              <GamePlay />
            </Route>
            <Route path="/mypage">
              <MyPage />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <GamePlayContext.Provider
              value={{ userList, setUserList, painter, setPainter }}
            >
              <Route path="/gameplay">
                <GamePlay />
              </Route>
              <Route path="/secret:hash">
                <SecretGame />
              </Route>
            </GamePlayContext.Provider>
          </GlobalContext.Provider>
        </Switch>
      </HashRouter>
    </RouterStyle>
  );
};

export default Router;
