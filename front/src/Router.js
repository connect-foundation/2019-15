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
  const [userlist, setUserlist] = useState([]);
  const [room, setRoom] = useState(Room());
  const [user, setUser] = useState(User());
  const [painter, setPainter] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <GlobalContext.Provider
          value={{
            io,
            userlist,
            setUserlist,
            room,
            setRoom,
            user,
            setUser,
            painter,
            setPainter,
          }}
        >
          <Route path="/main">
            <Main />
          </Route>
        </GlobalContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
