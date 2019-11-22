import React from 'react';
import PropTypes from 'prop-types';
import UserRankingListStyle from './UserRankingList.style';
import UserRanking from './UserRanking/UserRanking';

const UserRankingList = ({ users }) => {
  return (
    <UserRankingListStyle>
      {users.map((user, idx) => {
        return (
          <UserRanking
            key={user.nickname}
            rank={idx + 1}
            nickname={user.nickname}
            score={user.score}
          />
        );
      })}
    </UserRankingListStyle>
  );
};

UserRankingList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number,
      nickname: PropTypes.string,
    }),
  ),
};

UserRankingList.defaultProps = {
  users: [],
};

export default UserRankingList;
