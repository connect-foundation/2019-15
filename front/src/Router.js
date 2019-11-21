import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import io from './logics/socketLogic';
import MainContext from './Main.context';

import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';

import Room from './logics/room';
import RouterStyle from './Router.style';

const Router = () => {
  const [userlist, setUserlist] = useState([]);
  const [room, setRoom] = useState(Room());

  return (
    <RouterStyle id={'Router'}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <MainContext.Provider
            value={{ io, userlist, setUserlist, room, setRoom }}
          >
            <Route path="/main">
              <Main />
            </Route>
          </MainContext.Provider>
        </Switch>
      </BrowserRouter>
    </RouterStyle>
  );
};

export default Router;
