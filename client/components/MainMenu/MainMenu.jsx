import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const MainMenu = () => {
  const history = useHistory();
  const [form, setForm] = useState();
  const [room, setRoom] = useState('');
  const [joinIsOpen, setJoinIsOpen] = useState(false);

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const toggleJoin = () => {
    setJoinIsOpen(!joinIsOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push('/create');
        }}
        disableElevation
      >
        Create Room
      </Button>

      <Button variant="contained" onClick={toggleJoin} disableElevation>
        Join Room
      </Button>
      {joinIsOpen && (
        <>
          <TextField
            id="outlined-basic"
            label="Room Name"
            value={room}
            onChange={handleRoomChange}
            variant="outlined"
          />
          <Button disableElevation>Join</Button>
        </>
      )}

      <Button
        onClick={() => {
          history.push('/prev');
        }}
        disableElevation
      >
        Previous Rounds
      </Button>
    </>
  );
};

export default MainMenu;
