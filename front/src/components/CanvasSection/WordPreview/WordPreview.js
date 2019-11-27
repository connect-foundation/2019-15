import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import WordPreviewStyle from './WordPreview.style';

WordPreview.propTypes = {
  wordLength: PropTypes.number.isRequired,
  openIndex: PropTypes.number.isRequired,
  openLetter: PropTypes.string.isRequired,
};

function WordPreview({ wordLength, openIndex, openLetter }) {
  function makeEmptyArray(length) {
    return new Array(length).fill('_');
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'makeNewArr': {
        return makeEmptyArray(action.arg);
      }
      case 'openLetter': {
        const copied = [...state];
        copied[openIndex] = openLetter;
        return copied;
      }
      default: {
        return state;
      }
    }
  }
  const [letters, dispatch] = useReducer(reducer, makeEmptyArray(wordLength));

  useEffect(() => {
    dispatch({ type: 'makeNewArr', arg: wordLength });
  }, [wordLength, openIndex, openLetter]);

  function openLetterTrigger() {
    dispatch({ type: 'openLetter' });
  }

  return (
    <WordPreviewStyle>
      {letters}
      <button onClick={openLetterTrigger}>open</button>
    </WordPreviewStyle>
  );
}

export default WordPreview;
