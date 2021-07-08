import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { io } from 'socket.io-client';

// ADD LOGIC TO BUTTON?

const WaitingRoom = () => {
  const {
    setLocation,
    setRoomName,
    setRestData,
    location,
    roomName,
    restData,
  } = useContext(AppContext);

  const handleClick = () => {
    fetch('http://localhost:5000/yelp')
      .then((res) => res.json())
      .then((data) => {
        console.log('resJSON', data);
        setRestData(data);
      });

    const socket = io('http://localhost:5001');
    socket.on('connect', () => {
      console.log(`Socket ${socket.id} connected`);
      socket.emit('send-restaruants', 'Biergarten');
    });

    history.push('/game');
  };

  return (
    <div id="waiting-container">
      <div className="waiting-room-pane">User1</div>
      <div className="waiting-room-pane">User2</div>
      <div className="waiting-room-pane">User3</div>

      <button id="start-vote" onClick={handleClick}>
        Start
      </button>
    </div>
  );
};

export default WaitingRoom;
