import React from 'react';
import PropTypes from 'prop-types';
import UserRankingStyle from './UserRanking.style';

const UserRanking = ({ rank, nickname, score }) => (
  <UserRankingStyle>
    <h3>{rank}</h3>
    <div>
      <p>{nickname}</p>
      <p>{score}</p>
    </div>
  </UserRankingStyle>
);

UserRanking.propTypes = {
  rank: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default UserRanking;
