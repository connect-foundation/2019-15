import React from 'react';
import PropTypes from 'prop-types';
import makeModal from '../../../globalComponents/Modal/Modal';
import sortScores from 'utils/catchmymind/sorting';

GameResult.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      socketId: PropTypes.string,
      nickname: PropTypes.string,
      score: PropTypes.number,
    }),
  ).isRequired,
};

export default function GameResult({ scores }) {
  const Header = () => <h1>Game Result</h1>;
  const Body = () =>
    sortScores(scores).map(({ nickname, score }, idx) => {
      const order = idx + 1;
      return (
        <div key={order}>
          {nickname} : {score}
        </div>
      );
    });

  const Modal = makeModal(Header, Body);

  return <Modal />;
}
