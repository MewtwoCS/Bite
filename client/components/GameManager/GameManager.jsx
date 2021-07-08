import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
// import restaurants from '../../restaurants.json';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';

// Conditionally render this component based on start-button click in
// WaitingRoom.

// Pass in restaurants array as props.restaurants
const GameManager = () => {
  const history = useHistory();
  const {
    roomId,
    restData,
    usernameVal,
    setResults,
  } = useContext(AppContext);
  const socket = useContext(SocketContext);

  const handleInviteAccepted = useCallback(() => {
    setJoined(true);
  }, []);

  // console.log(JSON.parse(restaurants));

  /*
    0:
alias: "slurpin-ramen-bar-los-angeles-los-angeles"
categories: (2) [{…}, {…}]
coordinates: {latitude: 34.0573614429986, longitude: -118.306769744705}
display_phone: "(213) 388-8607"
distance: 701.9702959148651
id: "MlmcOkwaNnxl3Zuk6HsPCQ"
image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/axO_FH4VwDYcPQOuabFi6g/o.jpg"
is_closed: false
location: {address1: "3500 W 8th St", address2: null, address3: "", city: "Los Angeles", zip_code: "90005", …}
name: "Slurpin' Ramen Bar - Los Angeles"
phone: "+12133888607"
price: "$$"
rating: 4.5
review_count: 4731
transactions: (2) ["delivery", "pickup"]
  */

  const [currIndex, setCurrIndex] = useState(0);
  const [restaurant, setRestaurant] = useState(restData?.[0]);
  const [voteArr, setVoteArr] = useState([]);

  useEffect(() => {
    if (currIndex >= restData.length - 1) {
      socket.emit('submit-vote', 'room'.concat(` ${roomId}`), socket.id, voteArr);
    }
    socket.on('submitted', (voter) => {
      console.log(voter.username, 'has finished voting');
      if (voter.username === usernameVal) history.push('/purg');
    });
  });

  socket.on('all-votes-in', (allVotes) => {
    console.log('VOTING COMPLETE:', allVotes);
    setResults(allVotes);
    history.push('/results');
  });

  const handleVote = (e) => {
    console.log('CURRINDEXS: ', currIndex);
    if (e.target.id === 'next-button' && currIndex < 9) {
      console.log('in yes');
      setVoteArr([...voteArr, 1]);
    } else if (e.target.id === 'prev-button' && currIndex < 9) {
      console.log('in no');
      setVoteArr([...voteArr, 0]);
    }

    if (currIndex < 9) {
      setCurrIndex(currIndex + 1);
      setRestaurant(restData[currIndex]);
    }
  };

  console.log('vote array', voteArr);

  const { transactions } = restaurant;
  return (
    <div id="game-container">
      <button id="prev-button" onClick={handleVote}>
        X
      </button>
      <div id="rest-info">
        <img
          id="restaurant-img"
          src={restaurant?.image_url}
          alt="restaurant"
        />
        <div id="restaurant-name">{restaurant?.name}</div>
        <div id="restaurant-price">{restaurant?.price}</div>
        {'Available for '}
        {transactions?.[0] !== undefined && transactions[0].toUpperCase()}
        {transactions?.[1] !== undefined && ` & ${transactions[1].toUpperCase()}`}
      </div>
      <button id="next-button" onClick={handleVote}>
        O
      </button>
    </div>
  );
};

export default GameManager;
