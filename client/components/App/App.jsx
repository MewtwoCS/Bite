/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext, socket } from '../../SocketContext';

import Login from '../Login/Login.jsx';
import MainMenu from '../MainMenu/MainMenu.jsx';
import CreateRoom from '../CreateRoom/CreateRoom.jsx';
import PrevRounds from '../PrevRounds/PrevRounds.jsx';
import WaitingRoom from '../WaitingRoom/WaitingRoom.jsx';
import GameManager from '../GameManager/GameManager.jsx';
import Purgatory from '../Purgatory/Purgatory.jsx';
import Results from '../Results/Results.jsx'
import './styles.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [roomName, setRoomName] = useState('');
  const [restData, setRestData] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [usernameVal, setUsernameVal] = useState('');
  const [results, setResults] = useState([]);

  const value = {
    location,
    setLocation,
    roomName,
    setRoomName,
    restData,
    setRestData,
    roomId,
    setRoomId,
    usernameVal,
    setUsernameVal,
    results,
    setResults,
  };

  let waitingRoom = '';
  

  // if (roomId) {
  //     waitingRoom = <Route path="/wait:roomId" component={WaitingRoom} />
  // } else {
  //     waitingRoom = <Route path="/create" component={CreateRoom} />
  // }
  

  return (
    <div className="app">
      <AppContext.Provider value={value}>
        <SocketContext.Provider value={socket}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/main" component={MainMenu} />
            <Route path="/create" component={CreateRoom} />
            <Route path="/prev" component={PrevRounds} />
            <Route path="/game" component={GameManager} />
            <Route path="/wait:roomId" component={WaitingRoom} />
            <Route path='/purg' component={Purgatory} />
            <Route path='/results' component={Results} />
          </Switch>
        </SocketContext.Provider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
