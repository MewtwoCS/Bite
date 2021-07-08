import React, { useState, useContext } from 'react';
// import restaurants from '../../restaurants.json';
import './styles.css';
import AppContext from '../../AppContext';

// Conditionally render this component based on start-button click in
// WaitingRoom.

// Pass in restaurants array as props.restaurants
const GameManager = (props) => {
  // console.log(JSON.parse(restaurants));

  const {
    setLocation,
    setRoomName,
    setRestData,
    location,
    roomName,
    restData,
  } = useContext(AppContext);

  const [currIndex, setCurrIndex] = useState(0);
  const [restaurant, setRestaurant] = useState(props.restaurants?.[0]);

  const handleClick = (e) => {
    console.log('CURRINDEXS: ', currIndex);
    if (e.target.id === 'next-button' && currIndex <= 10) {
      setCurrIndex((prev) => prev + 1);
      // setRestaurant(props.restaurants[currIndex + 1]);
    }

    if (e.target.id === 'prev-button' && currIndex) {
      setCurrIndex((prev) => prev - 1);
      // setRestaurant(props.restaurants[currIndex - 1]);
    }
  };

  return (
    <div id="game-container">
      <button id="prev-button" onClick={handleClick}>
        {'<'}
      </button>
      <img
        id="restaurant-img"
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg"
      />
      <button id="next-button" onClick={handleClick}>
        {'>'}
      </button>
    </div>
  );
};

export default GameManager;
