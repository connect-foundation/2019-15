import React from 'react';
import PropTypes from 'prop-types';
import makeModal from '../../../globalComponents/Modal/Modal';

QuestionResult.propTypes = {
  answer: PropTypes.string.isRequired,
  scores: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

function QuestionResult({ answer, scores }) {
  const Header = () => <h1>{answer}</h1>;
  const Body = () =>
    scores.map((score) => (
      <div key={score[0]}>
        {score[0]} : {score[1]}
      </div>
    ));

  const Modal = makeModal(Header, Body);

  return <Modal />;
}

export default QuestionResult;
