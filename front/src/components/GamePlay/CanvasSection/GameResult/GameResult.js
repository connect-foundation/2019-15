import React from 'react';
import PropTypes from 'prop-types';
import makeModal from '../../../globalComponents/Modal/Modal';

GameResult.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

export default function GameResult({ scores }) {
  const Header = () => <h1>Game Result</h1>;
  const Body = () =>
    scores.map((score, idx) => {
      const order = idx + 1;
      return (
        <div key={order}>
          {score[0]} : {score[1]}
        </div>
      );
    });

  const Modal = makeModal(Header, Body);

  return <Modal />;
}
