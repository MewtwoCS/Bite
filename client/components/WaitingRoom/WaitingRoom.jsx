import React from 'react';

const WaitingRoom = () => {
  // If everyone is ready then button should appear and navigate to the game

  return (
    <div id="waiting-container">
      <div class="waiting-room-pane">User1</div>
      <div class="waiting-room-pane">User2</div>
      <div class="waiting-room-pane">User3</div>

      <button id="start-vote">Start</button>
    </div>
  );
};

export default WaitingRoom;
