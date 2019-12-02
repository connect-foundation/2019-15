import React from 'react';
import PropTypes from 'prop-types';
import UserRankingStyle from './UserRanking.style';

UserRanking.propTypes = {
  rank: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default function UserRanking({ rank, nickname, score }) {
  return (
    <UserRankingStyle>
      <h3>{rank}</h3>
      <div>
        <p>{nickname}</p>
        <p>{score}</p>
      </div>
    </UserRankingStyle>
  );
}
