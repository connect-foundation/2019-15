import React from 'react';
import PropTypes from 'prop-types';
import makeModal from 'components/globalComponents/Modal/Modal';
import sortScores from 'utils/catchmymind/sorting';

QuestionResult.propTypes = {
  answer: PropTypes.string.isRequired,
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      socketId: PropTypes.string,
      nickname: PropTypes.string,
      score: PropTypes.number,
    }),
  ).isRequired,
};

export default function QuestionResult({ answer, scores }) {
  const Header = () => <h1>{answer}</h1>;
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
