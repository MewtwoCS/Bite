import React, { useState, useEffect, useContext, useCallback } from 'react';
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
	const { roomId, restData, usernameVal, setResults } = useContext(AppContext);
	const socket = useContext(SocketContext);

	const [currIndex, setCurrIndex] = useState(0);
	const [restaurant, setRestaurant] = useState(restData?.[0]);
	const [voteArr, setVoteArr] = useState([]);

	useEffect(() => {}, []);

	if (!restaurant) {
		socket.emit('submit-vote', 'room'.concat(` ${roomId}`), socket.id, voteArr);
		socket.on('submitted', (voter) => {
			console.log(voter.username, 'has finished voting');
			if (voter.username === usernameVal) history.push('/purg');
		});
		return <div>Loading...</div>;
	}
	socket.on('all-votes-in', (allVotes) => {
		console.log('VOTING COMPLETE:', allVotes);
		setResults(allVotes);
		history.push('/results');
	});

	const handleVote = (e) => {
		console.log('CURRINDEXS: ', currIndex);
		if (e.target.id === 'yes-button' && currIndex < 10) {
			console.log('in yes');
			setVoteArr([...voteArr, 1]);
		} else if (e.target.id === 'no-button' && currIndex < 10) {
			console.log('in no');
			setVoteArr([...voteArr, 0]);
		}

		if (currIndex < 10) {
			setRestaurant(restData[currIndex + 1]);
			setCurrIndex(currIndex + 1);
		}
	};

	const { transactions } = restaurant;
	return (
		<div id='game-container'>
			<div id='rest-info'>
				<img id='restaurant-img' src={restaurant?.image_url} alt='restaurant' />
				<div id='restaurant-name'>{restaurant?.name}</div>
				<div id='restaurant-price'>{restaurant?.price}</div>

				<div id='restaurant-options'>
					{'Available for '}
					{transactions?.[0] !== undefined && transactions[0].toUpperCase()}
					{transactions?.[1] !== undefined &&
						` & ${transactions[1].toUpperCase()}`}
				</div>
				<div id='yesnobuttons'>
					<input
						type='image'
						src='https://i.ibb.co/v4x3F44/bluex.png'
						name='nay'
						className='btn'
						id='no-button'
						onClick={handleVote}
					/>
					<input
						type='image'
						src='https://i.ibb.co/9HMMN3s/redheart.png'
						name='yay'
						className='btn'
						id='yes-button'
						onClick={handleVote}
					/>
				</div>
			</div>
		</div>
	);
};

export default GameManager;
