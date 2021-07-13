import React, { useEffect, useContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';
import './Results.css';

const Results = () => {
	const { results, restData } = useContext(AppContext);

	const winner = results.indexOf(Math.max(...results));
	const { transactions, display_phone, location } = restData[winner];

	return (
		<div id='results-container'>
			<div id='result-items'>
				<div id='winner-info'>
					<img
						id='restaurant-img'
						src={restData[winner].image_url}
						alt='restaurant'
					/>
					<div id='winner-name'>{restData[winner]?.name}</div>
					<div id='secondary-text'>
						<div id='restaurant-options'>
							{'Available for '}
							{transactions?.[0] !== undefined && transactions[0].toUpperCase()}
							{transactions?.[1] !== undefined &&
								` & ${transactions[1].toUpperCase()}`}
						</div>
						<div id='restaurant-phone'>{display_phone}</div>
						<div id='restaurant-phone'>{location.display_address[0]}</div>
						<div id='restaurant-phone'>{location.display_address[1]}</div>
					</div>
				</div>
				<div id='imgwrapper'>
					<img
						id='winner-img'
						src='https://i.ibb.co/qYspZVy/winner-logo.png'
						alt='winner-logo'
						border='0'
					/>
					{/* {restData[winner].name} */}
				</div>
			</div>
		</div>
	);
};

export default Results;
