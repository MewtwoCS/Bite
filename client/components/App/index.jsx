import React from 'react';
import { io } from 'socket.io-client';
import Login from './Login.jsx';
import './styles.css';

const App = () => {
  const socket = io('http://localhost:5001');

  return (
    <>
      <div id="test-id">Hello from the App component</div>
      <Login></Login>
    </>
  );
};

export default App;
