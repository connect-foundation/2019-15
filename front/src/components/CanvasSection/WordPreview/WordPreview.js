import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import WordPreviewStyle from './WordPreview.style';
import makeEmptyArray from '../../../logics/wordPreview/makeEmptyArray';

WordPreview.propTypes = {
  wordLength: PropTypes.number.isRequired,
  openIndex: PropTypes.number.isRequired,
  openLetter: PropTypes.string.isRequired,
};

function lettersReducer(state, action) {
  switch (action.type) {
    case 'makeNewArray': {
      return makeEmptyArray(action.arg);
    }
    case 'openLetter': {
      const copied = [...state];
      copied[action.arg.openIndex] = action.arg.openLetter;
      return copied;
    }
    default: {
      return state;
    }
  }
}

function WordPreview({ wordLength, openIndex, openLetter }) {
  const [letters, dispatch] = useReducer(
    lettersReducer,
    makeEmptyArray(wordLength),
  );

  useEffect(() => {
    dispatch({ type: 'makeNewArray', arg: wordLength });
  }, [wordLength, openIndex, openLetter]);

  function openLetterTrigger() {
    dispatch({
      type: 'openLetter',
      arg: {
        openIndex,
        openLetter,
      },
    });
  }

  return (
    <WordPreviewStyle>
      {letters}
      <button onClick={openLetterTrigger}>open</button>
    </WordPreviewStyle>
  );
}

export default WordPreview;
