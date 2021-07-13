import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';
import { Button, TextField, Checkbox } from '@material-ui/core';
import './styles.css';

const CreateRoom = () => {
	const history = useHistory();
	const socket = useContext(SocketContext);

	const {
		setLocation,
		setRoomName,
		setRoomId,
		location,
		roomName,
		roomId,
		usernameVal,
		isHost,
		setIsHost,
	} = useContext(AppContext);

	const [preferences, setPreferences] = useState({
		fastFood: false,
		korean: false,
		chinese: false,
		medi: false,
		mexican: false,
	});

	useEffect(() => {
		if (roomId && isHost) {
			socket.emit(
				'create',
				socket.id,
				usernameVal,
				'room'.concat(` ${roomId}`),
				location
			);
			history.push('/wait'.concat(`${roomId}`));
		}
	});

	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	};

	const handleRoomChange = (e) => {
		setRoomName(e.target.value);
	};

	const handlePrefChange = (e) => {
		const { name } = e.target;
		const value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		setPreferences((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleClick = () => {
		if (location.length > 0) {
			const roomVar = Math.random() * 100;
			setRoomId(Math.ceil(roomVar));
			setIsHost(true);
		}
	};

	return (
		<div id='create-container'>
			<div id='location-input' className='create'>
				LOCATION:
				<TextField
					type='text'
					value={location}
					onChange={handleLocationChange}
				/>
			</div>
			<fieldset id='preferences' className='create'>
				<legend>
					<b>Preferences</b>
				</legend>
				<Checkbox
					name='fastFood'
					type='checkbox'
					checked={preferences.fastFood}
					onChange={handlePrefChange}
				/>
				Fast Food
				{/* <Checkbox
					name='korean'
					type='checkbox'
					checked={preferences.korean}
					onChange={handlePrefChange}
				/> */}
				{/* Korean */}
				<Checkbox
					name='chinese'
					type='checkbox'
					checked={preferences.chinese}
					onChange={handlePrefChange}
				/>
				Chinese
				<Checkbox
					name='medi'
					type='checkbox'
					checked={preferences.medi}
					onChange={handlePrefChange}
				/>
				Mediterannean
				<Checkbox
					name='mexican'
					type='checkbox'
					checked={preferences.mexican}
					onChange={handlePrefChange}
				/>
				Mexican
			</fieldset>
			<Button color='primary' onClick={handleClick} className='create'>
				Create Room
			</Button>
		</div>
	);
};

export default CreateRoom;
