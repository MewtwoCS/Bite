import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateRoom = () => {
  const history = useHistory();
  const [location, setLocation] = useState('');
  const [roomName, setRoomName] = useState('');
  const [preferences, setPreferences] = useState({
    fastFood: false,
    korean: false,
    chinese: false,
    medi: false,
    mexican: false,
  });

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  const handlePrefChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    history.push('/wait');
  };

  return (
    <div>
      Location:{' '}
      <input
        id="location-input"
        type="text"
        value={location}
        onChange={handleLocationChange}
      />
      <fieldset>
        <legend>Preferences</legend>
        <input
          name="fastFood"
          type="checkbox"
          checked={preferences.fastFood}
          onChange={handlePrefChange}
        />
        Fast Food
        <input
          name="korean"
          type="checkbox"
          checked={preferences.korean}
          onChange={handlePrefChange}
        />
        Korean
        <input
          name="chinese"
          type="checkbox"
          checked={preferences.chinese}
          onChange={handlePrefChange}
        />
        Chinese
        <input
          name="medi"
          type="checkbox"
          checked={preferences.medi}
          onChange={handlePrefChange}
        />
        Mediterannean
        <input
          name="mexican"
          type="checkbox"
          checked={preferences.mexican}
          onChange={handlePrefChange}
        />
        Mexican
      </fieldset>
      Room Name:{' '}
      <input type="text" value={roomName} onChange={handleRoomChange} />
      <button onClick={handleClick}>Create Room</button>
    </div>
  );
};

export default CreateRoom;
