import React, {
  useEffect, useContext, useCallback, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { SocketContext } from '../../SocketContext';

const Results = () => {
  const { results, restData } = useContext(AppContext);

  const winner = results.indexOf(Math.max(...results));

  return (
    <div id="results">

      {restData[winner].name}
      <img
        id="restaurant-img"
        src={restData[winner].image_url}
        alt="restaurant"
      />

    </div>

  );
};

export default Results;
