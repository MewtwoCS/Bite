import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AppContext } from '../../AppContext';

// ADD LOGIC TO BUTTON?

const WaitingRoom = () => {
  const history = useHistory();
  const {
    // setLocation,
    // setRoomName,
    setRestData,
    location,
    // roomName,
    restData,
  } = useContext(AppContext);

  const handleClick = () => {
    fetch('http://localhost:5000/yelp/Koreatown')
      .then((res) => res.json())
      .then((data) => {
        // console.log('resJSON', data);
        setRestData(data);
        console.log(restData);
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
      <div>{location}</div>
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
