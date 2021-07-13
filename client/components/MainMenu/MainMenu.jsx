import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { io } from 'socket.io-client';
import { AppContext } from '../../AppContext';
import './styles.css';

const MainMenu = () => {
	const history = useHistory();
	const [form, setForm] = useState();
	const [room, setRoom] = useState('');
	const [joinIsOpen, setJoinIsOpen] = useState(false);

	const { setRoomId, roomId } = useContext(AppContext);

	useEffect(() => {
		if (roomId) {
			history.push('/wait'.concat(`${room}`));
		}
	});

	const handleRoomChange = (e) => {
		setRoom(e.target.value);
	};

	const toggleJoin = () => {
		setJoinIsOpen(!joinIsOpen);
	};

	const handleRoomJoin = (e) => {
		setRoomId(room);
	};

	return (
		<div id='menu-container'>
			<Button
				variant='contained'
				color='primary'
				onClick={() => {
					history.push('/create');
				}}
				disableElevation
			>
				Create Room
			</Button>

			<div id='join-container'>
				<Button
					color='secondary'
					variant='contained'
					onClick={toggleJoin}
					disableElevation
				>
					Join Room
				</Button>
				{joinIsOpen && (
					<>
						<TextField
							id='outlined-basic'
							label='Room Name'
							value={room}
							onChange={handleRoomChange}
							variant='outlined'
						/>
						<Button color='secondary' onClick={handleRoomJoin} disableElevation>
							Join
						</Button>
					</>
				)}
			</div>

			<Button
				onClick={() => {
					history.push('/prev');
				}}
				disableElevation
			>
				Previous Rounds
			</Button>
		</div>
	);
};

export default MainMenu;
