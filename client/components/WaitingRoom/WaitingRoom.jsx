import React, { useEffect, useContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';
import { Button } from '@material-ui/core';
import './styles.css';
// ADD LOGIC TO BUTTON?

const WaitingRoom = () => {
	const history = useHistory();
	const [usersName, setUsersName] = useState([]);

	const [joined, setJoined] = useState(false);
	const {
		setLocation,
		// setRoomN,
		setRestData,
		location,
		roomId,
		restData,
		usernameVal,
		isHost,
	} = useContext(AppContext);
	const socket = useContext(SocketContext);

	const handleInviteAccepted = useCallback(() => {
		setJoined(true);
	}, []);

	socket.on('roomData', (users, newLocation) => {
		setUsersName(users);
		if (!isHost) setLocation(newLocation);
		console.log(newLocation);
		fetch(`http://localhost:5000/yelp/${newLocation}`)
			.then((res) => res.json())
			.then((data) => {
				console.log('resJSON', data);
				setRestData(data);
			});
	});

	useEffect(() => {
		if (!isHost) {
			socket.emit('join', socket.id, usernameVal, 'room'.concat(` ${roomId}`));
		}
		socket.on('begin-game', () => {
			history.push('/game');
		});
		return () => {
			socket.off('server->client', handleInviteAccepted);
		};
	}, [socket, handleInviteAccepted]);

	const handleClick = () => {
		socket.emit('start-game', 'room'.concat(` ${roomId}`));

		setTimeout(() => history.push('/game'), 1000);
	};

	const renderUsersName = [];
	for (let i = 0; i < usersName.length; i++) {
		renderUsersName.push(<div>{usersName[i].username}</div>);
	}

	return (
		<div id='waiting-container'>
			<div id='wait-location'>
				<span>
					<b>LOCATION</b>
				</span>
				{location.toUpperCase()}
			</div>
			<div id='wait-players'>
				<span>
					<b>PLAYERS</b>
				</span>
				{renderUsersName}
			</div>

			<Button id='start-vote' onClick={handleClick}>
				Start
			</Button>
		</div>
	);
};

export default WaitingRoom;
