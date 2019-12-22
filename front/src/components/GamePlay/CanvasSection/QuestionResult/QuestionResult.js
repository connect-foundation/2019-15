import React from 'react';
import PropTypes from 'prop-types';
import makeModal from 'components/globalComponents/Modal/Modal';
import sortScores from 'utils/catchmymind/sorting';

QuestionResult.propTypes = {
  answer: PropTypes.string.isRequired,
  scores: PropTypes.arrayOf((propValue, key) => {
    if (typeof propValue[key][0] !== 'string')
      return new Error(`propValue[key][0] must be string`);
    if (typeof propValue[key][1] !== 'number')
      return new Error(`propValue[key][1] must be number`);
  }).isRequired,
};

export default function QuestionResult({ answer, scores }) {
  const Header = () => <h1>{answer}</h1>;
  const Body = () =>
    sortScores(scores).map((score, idx) => {
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
