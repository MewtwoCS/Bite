/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppContext } from '../../AppContext';

import Login from '../Login/Login.jsx';
import MainMenu from '../MainMenu/MainMenu.jsx';
import CreateRoom from '../CreateRoom/CreateRoom.jsx';
import PrevRounds from '../PrevRounds/PrevRounds.jsx';
import WaitingRoom from '../WaitingRoom/WaitingRoom.jsx';
import GameManager from '../GameManager/GameManager.jsx';
import './styles.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [roomName, setRoomName] = useState('');
  const [restData, setRestData] = useState([]);

  const value = {
    location,
    setLocation,
    roomName,
    setRoomName,
    restData,
    setRestData,
  };

  return (
    <div className="app">
      <AppContext.Provider value={value}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/main" component={MainMenu} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/prev" component={PrevRounds} />
          {/* <Route path="/wait" component={WaitingRoom} /> */}
          <Route path="/game" component={GameManager} />
          <Route path="/wait:roomId" component={WaitingRoom} />
        </Switch>
      </AppContext.Provider>
    </div>
  );
};

export default App;
