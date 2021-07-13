import React, { useEffect, useContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';

const Purgatory = () => {
	const history = useHistory();
	const socket = useContext(SocketContext);
	const { setResults } = useContext(AppContext);
	socket.on('all-votes-in', (allVotes) => {
		console.log('VOTING COMPLETE:', allVotes);
		setResults(allVotes);
		history.push('/results');
	});

	return <>Waiting for other voters...</>;
};

export default Purgatory;
