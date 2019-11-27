import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import WordPreviewStyle from './WordPreview.style';

WordPreview.propTypes = {
  wordLength: PropTypes.number.isRequired,
  openIndex: PropTypes.number.isRequired,
  openLetter: PropTypes.string.isRequired,
};

function WordPreview({ wordLength, openIndex, openLetter }) {
  function makeEmptyArr(length) {
    return new Array(length).fill('_');
  }

  function reducer(state, action) {
    // 원소는 primitive(string)이므로 딥카피
    const copiedState = [...state];
    copiedState[action] = openLetter;
    return copiedState;
  }

  const [letters, dispatch] = useReducer(reducer, makeEmptyArr(wordLength));

  return (
    <WordPreviewStyle>
      {letters.reduce((acc, val) => acc.concat(' ', val))}
      <button onClick={() => dispatch(openIndex)}>open letter</button>
    </WordPreviewStyle>
  );
}

export default WordPreview;
