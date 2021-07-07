import React from 'react';
import { io } from 'socket.io-client';
import { Switch, Route } from 'react-router-dom';

import Login from '../Login/Login.jsx';
import MainMenu from '../MainMenu/MainMenu.jsx';
import CreateRoom from '../CreateRoom/CreateRoom.jsx';
import PrevRounds from '../PrevRounds/PrevRounds.jsx';
import WaitingRoom from '../WaitingRoom/WaitingRoom.jsx';
import './styles.css';

const App = () => {
  const socket = io('http://localhost:5001');

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={MainMenu} />
      <Route path="/create" component={CreateRoom} />
      <Route path="/prev" component={PrevRounds} />
      <Route path="/wait" component={WaitingRoom} />
    </Switch>
  );
};

export default App;
